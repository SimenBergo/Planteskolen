const express = require('express');
const UserCtrl = require('../controllers/user-ctrl');
const router = express.Router();

//reffering the urls to the right function in the user-ctrl file
router.patch('/user/:id', UserCtrl.updateUser);
router.get('/user/:id', UserCtrl.getUserById);

module.exports = router;