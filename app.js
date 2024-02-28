require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./db');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

sequelize.sync({ force: true }).then(() => {
  console.log('Database synchronized');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

