const express = require('express');
const rateLimit = require('express-rate-limit');
const { License, Project } = require('../models');
const { LICENSE_TYPES } = require('../constants/license');
const requireAuth = require('../middleware/auth');
const requireApiKey = require('../middleware/apiKey');
const { generateLicenseKey, hashLicenseKey } = require('../utils/licenseKey');
const { encryptPayload } = require('../utils/licenseCrypto');
const { sendLicenseEmail } = require('../utils/sendLicenseEmail');

const router = express.Router();

function computeStatus(license) {
  if (license.status === 'revoked') return 'revoked';
  if (new Date(license.expiresAt) < new Date()) return 'expired';
  return 'active';
}

// Never exposes licenseKeyHash to the client; only the masked preview.
function serializeLicense(license) {
  const { licenseKeyHash, ...rest } = license.toJSON();
  return { ...rest, computedStatus: computeStatus(license) };
}

async function createUniqueLicenseKey() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const key = generateLicenseKey();
    const licenseKeyHash = hashLicenseKey(key);
    const existing = await License.findOne({ where: { licenseKeyHash } });
    if (!existing) return { key, licenseKeyHash };
  }
  throw new Error('Could not generate a unique license key');
}

// ── Admin routes (dashboard) ──
router.get('/', requireAuth, async (req, res) => {
  const where = {};
  if (req.query.projectId) where.projectId = req.query.projectId;
  if (req.query.licenseType) where.licenseType = req.query.licenseType;

  const licenses = await License.findAll({
    where,
    include: [{ model: Project, as: 'project', attributes: ['id', 'name'] }],
    order: [['createdAt', 'DESC']],
  });

  let result = licenses.map(serializeLicense);

  if (req.query.status) {
    result = result.filter((l) => l.computedStatus === req.query.status);
  }

  res.json({ licenses: result });
});

router.post('/', requireAuth, async (req, res) => {
  const { projectId, licenseType, expiresAt, recipientEmail, recipientName, notes } = req.body;

  if (!projectId || !licenseType || !expiresAt || !recipientEmail) {
    return res.status(400).json({
      message: 'projectId, licenseType, expiresAt, and recipientEmail are required',
    });
  }

  if (!LICENSE_TYPES.includes(licenseType)) {
    return res.status(400).json({ message: `licenseType must be one of: ${LICENSE_TYPES.join(', ')}` });
  }

  if (new Date(expiresAt) <= new Date()) {
    return res.status(400).json({ message: 'expiresAt must be in the future' });
  }

  const project = await Project.findByPk(projectId);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const { key: licenseKey, licenseKeyHash } = await createUniqueLicenseKey();
  const licenseKeyPreview = licenseKey.split('-').pop();

  const license = await License.create({
    projectId,
    licenseKeyHash,
    licenseKeyPreview,
    licenseType,
    expiresAt,
    recipientEmail,
    recipientName: recipientName || null,
    notes: notes || null,
  });

  try {
    await sendLicenseEmail(licenseKey, license, project);
    license.emailSentAt = new Date();
    license.emailSendError = null;
  } catch (err) {
    license.emailSendError = err.message;
  }
  await license.save();

  // licenseKey (plaintext) is only ever included in this one response — it is
  // never stored, so the dashboard/API cannot show or recover it afterward.
  res.status(201).json({
    license: { ...serializeLicense(license), licenseKey, project },
  });
});

router.get('/:id', requireAuth, async (req, res) => {
  const license = await License.findByPk(req.params.id, {
    include: [{ model: Project, as: 'project' }],
  });

  if (!license) {
    return res.status(404).json({ message: 'License not found' });
  }

  res.json({ license: serializeLicense(license) });
});

router.post('/:id/revoke', requireAuth, async (req, res) => {
  const license = await License.findByPk(req.params.id);
  if (!license) {
    return res.status(404).json({ message: 'License not found' });
  }

  license.status = 'revoked';
  await license.save();

  res.json({ license: serializeLicense(license) });
});

// ── Public verification endpoint (called by other projects) ──
const verifyLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/verify', verifyLimiter, requireApiKey, async (req, res) => {
  const { licenseKey } = req.body;

  if (!licenseKey) {
    return res.status(400).json({ message: 'licenseKey is required' });
  }

  const license = await License.findOne({
    where: { licenseKeyHash: hashLicenseKey(licenseKey) },
    include: [{ model: Project, as: 'project', attributes: ['id', 'name'] }],
  });

  const checkedAt = new Date().toISOString();

  if (!license) {
    return res.json({ data: encryptPayload({ valid: false, status: 'not_found', checkedAt }) });
  }

  const status = computeStatus(license);

  const payload = {
    valid: status === 'active',
    status,
    licenseKey,
    licenseType: license.licenseType,
    project: { id: license.project.id, name: license.project.name },
    issuedAt: license.issuedAt,
    expiresAt: license.expiresAt,
    recipientEmail: license.recipientEmail,
    checkedAt,
  };

  res.json({ data: encryptPayload(payload) });
});

module.exports = router;
