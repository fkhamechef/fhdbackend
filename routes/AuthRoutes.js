const express = require('express');
const { loginUser, registerUser,resetUser } = require('../controllers/AuthController.js');

const router = express.Router();
router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/reset', resetUser)

module.exports = router