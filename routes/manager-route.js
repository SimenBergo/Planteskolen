const express = require('express');
const UserCtrl = require('../controllers/user-ctrl');
const router = express.Router();

//router.post('/user', UserCtrl.createUser);
router.delete('/user/:id', UserCtrl.deleteUser);
router.get('/users', UserCtrl.getUsers);
router.post('/plant', UserCtrl.createPlant);
router.delete('/plant/:id', UserCtrl.deletePlant);


module.exports = router;