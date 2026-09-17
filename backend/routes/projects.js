const express = require('express');
const { Project, License } = require('../models');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const projects = await Project.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: License, as: 'licenses', attributes: ['id', 'status', 'expiresAt'] }],
  });
  res.json({ projects });
});

router.post('/', async (req, res) => {
  const { name, description, website } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Project name is required' });
  }

  const project = await Project.create({
    name: name.trim(),
    description: description || null,
    website: website || null,
  });

  res.status(201).json({ project });
});

router.get('/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id, {
    include: [{ model: License, as: 'licenses' }],
  });

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  res.json({ project });
});

module.exports = router;
