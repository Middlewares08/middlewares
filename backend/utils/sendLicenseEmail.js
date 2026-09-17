const { getTransporter } = require('../config/mailer');

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function sendLicenseEmail(licenseKey, license, project) {
  const transporter = getTransporter();

  const subject = `Your ${license.licenseType} license for ${project.name}`;
  const greeting = license.recipientName ? `Hi ${license.recipientName},` : 'Hi,';

  const text = [
    greeting,
    '',
    `Here is your license for ${project.name}:`,
    '',
    `License key: ${licenseKey}`,
    `License type: ${license.licenseType}`,
    `Issued: ${formatDate(license.issuedAt)}`,
    `Expires: ${formatDate(license.expiresAt)}`,
    '',
    'Please keep this key safe. We do not store it and cannot resend it if lost — a new license would need to be issued.',
  ].join('\n');

  const html = `
    <p>${greeting}</p>
    <p>Here is your license for <strong>${project.name}</strong>:</p>
    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      <tr><td><strong>License key</strong></td><td><code>${licenseKey}</code></td></tr>
      <tr><td><strong>License type</strong></td><td>${license.licenseType}</td></tr>
      <tr><td><strong>Issued</strong></td><td>${formatDate(license.issuedAt)}</td></tr>
      <tr><td><strong>Expires</strong></td><td>${formatDate(license.expiresAt)}</td></tr>
    </table>
    <p>Please keep this key safe. We do not store it and cannot resend it if lost &mdash; a new license would need to be issued.</p>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: license.recipientEmail,
    subject,
    text,
    html,
  });
}

module.exports = { sendLicenseEmail };
