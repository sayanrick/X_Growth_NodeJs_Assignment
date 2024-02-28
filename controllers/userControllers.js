const path = require('path');

const User = require('../models/user');
const UserInformation = require('../models/userInformation');

const readDataFromFileAndInsert = async (req, res) => {
  try {
    // Read data from JSON file with correct path
    const dataPath = path.join(__dirname, '../', 'data', 'data.json');
    const data = require(dataPath); 

    console.log(data);
    
    const usersData = data.map(user => ({ email: user.email, name: user.name }));
    const userInformationData = data.map(user => ({ user_id: user.id, phone: user.phone, address: user.address }));
  
    // Creating users and user information using models
    await User.bulkCreate(usersData, { validate: true }); // Validate data
    await UserInformation.bulkCreate(userInformationData, { validate: true });
  
    res.send('Data imported successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error importing data!');
  }
};

const getUserDetailsByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: [{ model: UserInformation, attributes: ['address', 'phone'] }],
    });

    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { readDataFromFileAndInsert, getUserDetailsByEmail };
