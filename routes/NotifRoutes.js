


const express = require('express');
const { createNotification ,getNotifications,deleteNotification,sendToken} = require('../controllers/NotifController');

const router = express.Router();
router.get('/all', getNotifications)
router.post('/create', createNotification)
router.post('/send-token', sendToken)
router.delete('/:id', deleteNotification)

module.exports = router







