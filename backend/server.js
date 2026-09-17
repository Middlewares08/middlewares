const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const licenseRoutes = require('./routes/licenses');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send("Server is running!"));
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/licenses', licenseRoutes);

sequelize.authenticate()
  .then(() => {
    console.log("PostgreSQL Connected");
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  })
  .catch(err => console.error("Unable to connect to the database:", err));
