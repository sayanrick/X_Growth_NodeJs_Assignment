const express = require('express');
const userController = require('../controllers/userControllers');

const router = express.Router();

router.get('/read-and-insert', userController.readDataFromFileAndInsert);
router.post('/get-user-details', userController.getUserDetailsByEmail);

module.exports = router;
