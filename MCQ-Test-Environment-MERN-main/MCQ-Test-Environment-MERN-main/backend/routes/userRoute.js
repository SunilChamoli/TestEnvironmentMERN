const express = require('express');
const userController = require('../controllers/User');

const router = express.Router();

// Route for user registration
router.post('/register', userController.Register);

router.post('/login', userController.Login)

router.get('/logout',userController.Logout)

module.exports = router;
