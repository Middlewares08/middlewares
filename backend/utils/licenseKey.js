const crypto = require('crypto');

// Excludes ambiguous characters (0/O, 1/I) to keep keys easy to read and retype.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const GROUP_COUNT = 4;
const GROUP_LENGTH = 5;

function generateLicenseKey() {
  const groups = [];
  for (let g = 0; g < GROUP_COUNT; g++) {
    const bytes = crypto.randomBytes(GROUP_LENGTH);
    let group = '';
    for (let i = 0; i < GROUP_LENGTH; i++) {
      group += ALPHABET[bytes[i] % ALPHABET.length];
    }
    groups.push(group);
  }
  return groups.join('-');
}

// Deterministic (unsalted) by design: license keys are high-entropy random
// strings, not human passwords, so we need equality lookups (WHERE hash = ?)
// rather than bcrypt-style per-hash salting, which would make lookup impossible.
function hashLicenseKey(key) {
  return crypto.createHash('sha256').update(key).digest('hex');
}

module.exports = { generateLicenseKey, hashLicenseKey };
