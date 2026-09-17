'use strict';
const bcrypt = require('bcryptjs');

const DEFAULT_EMAIL = 'admin@middlewares.com';
const DEFAULT_PASSWORD = 'Admin123!';

module.exports = {
  up: async (queryInterface) => {
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    await queryInterface.bulkInsert('users', [
      {
        email: DEFAULT_EMAIL,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', { email: DEFAULT_EMAIL });
  },
};
