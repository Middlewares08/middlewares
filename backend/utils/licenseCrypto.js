const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

function getKey() {
  const hexKey = process.env.LICENSE_ENCRYPTION_KEY;
  if (!hexKey || hexKey.length !== 64) {
    throw new Error('LICENSE_ENCRYPTION_KEY must be set to a 64-character hex string (32 bytes)');
  }
  return Buffer.from(hexKey, 'hex');
}

// Output layout (all concatenated, then base64-encoded): iv (12 bytes) + authTag (16 bytes) + ciphertext
function encryptPayload(data) {
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const plaintext = Buffer.from(JSON.stringify(data), 'utf8');
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, ciphertext]).toString('base64');
}

module.exports = { encryptPayload };
