const express = require('express');
const UserCtrl = require('../controllers/user-ctrl');
const router = express.Router();

router.patch('/user/:id', UserCtrl.updateUser);
router.get('/user/:id', UserCtrl.getUserById);
router.patch('/plant/:id', UserCtrl.updatePlant);

module.exports = router;