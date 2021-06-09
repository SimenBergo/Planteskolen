const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

//reffering the urls to the right function in the user-ctrl file

//login function is here because the function did not work properly in user-ctrl
router.post('/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { role: user.role, _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'supersecret');
  
                return res.json({ token, body });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );
router.post('/forgotpassword', UserCtrl.forgotPassword);
router.get('/reset', UserCtrl.resetPassword);
router.patch('/updatePasswordViaEmail', UserCtrl.UpdatePasswordviaEmail);
router.get('/plants', UserCtrl.getPlants);
router.get('/plant/:id', UserCtrl.getPlantById);
router.post('/user', UserCtrl.createUser);
router.patch('/plant/:id', UserCtrl.updatePlant);

module.exports = router;