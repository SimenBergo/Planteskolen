const User         = require('../models/user-model');
const Plant        = require('../models/plant-model');
const nodemailer   = require('nodemailer');
const crypto       = require('crypto');
const bcrypt       = require('bcrypt');

require('dotenv').config();

//inserting user to database
createUser = async (req, res) => {
    if(!req.body){
        return res.status(400).json({
            error: 'You need to fill the input fields'
        });
    }    
    
    const { name, surname, email, role, password } = req.body;

    let checkEmail = await User.findOne({ email });

    if (!checkEmail) {
        const user = await User.create({ name, surname, email, role, password });

        return res.status(201).json({
            message: 'User added successfully',
            user: user
        });
    }
    else{
        return res.status(400).json({
            error: 'Email already in use'
        });
    }
}

//inserting plant to database 
createPlant = async (req, res) => {
    if(!req.body){
        return res.status(400).json({
            error: 'You need to fill the input fields'
        });
    }
    
    const { name, building, room, waterschedule, lastwatered, fertilizer, fertilizerschedule, lastfertilized } = req.body;
    const flags = 0;

    let checkName = await Plant.findOne({ name, building, room, waterschedule, lastwatered, fertilizer, fertilizerschedule, lastfertilized });

    const date = lastwatered.split('-');
    const current = new Date(date[0], date[1] - 1, date[2], 0, 0, 0, 0);
    const nextwatering = current.setDate(current.getDate() + parseInt(waterschedule));
    const nextfertilizing = current.setDate(current.getDate() + parseInt(fertilizerschedule));
    if (!checkName) {

        const plant = await Plant.create({ name, building, room, waterschedule, lastwatered, nextwatering, fertilizer, flags, fertilizerschedule, lastfertilized, nextfertilizing });

        return res.status(201).json({
            message: 'Plant added successfully',
            plant: plant
        });
     }
     else{
        return res.status(400).json({
            error: 'Plant already exists in database'
        });
    } 
}

//updating user
updateUser = async (req, res) => {
    const body = req.body;
    const id = req.params.id;    
    const update = { name: body.name, surname: body.surname, email: body.email, role: body.role };  

    if (body) {
        await User.updateOne({ _id: id }, { $set: update}, function (err, user) {
            if(user){
                return res.status(200).json({
                    message: 'User updated successfully!',
                    user: user
                });
            }else if (err) {
                return res.status(400).json({
                    message: 'An error occured'
                });
            }
        });
    }
    else {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }
    
};

//updating plant
updatePlant = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    
    let dateWater = body.lastwatered.split('-');
    let dayWater = dateWater[2].split('T');
    const currentWater = new Date(dateWater[0], dateWater[1] - 1, dayWater[0], 0);
    const nextwaterString = currentWater.setDate(currentWater.getDate() + parseInt(body.waterschedule));
    
    let dateFertilize = body.lastfertilized.split('-');
    let dayFertilize = dateFertilize[2].split('T');
    const currentFertilize = new Date(dateFertilize[0], dateFertilize[1] - 1, dayFertilize[0], 0);
    const nextfertilizingString = currentFertilize.setDate(currentFertilize.getDate() + parseInt(body.fertilizerschedule));

    const update = { name: body.name, building: body.building, room: body.room, waterschedule: body.waterschedule, lastwatered: body.lastwatered, nextwatering: nextwaterString, fertilizer: body.fertilizer, flags: body.flags, fertilizerschedule: body.fertilizerschedule, lastfertilized: body.lastfertilized, nextfertilizing: nextfertilizingString };  

    if (body) {
        await Plant.updateOne({ _id: id }, { $set: update}, function (err, plant) {
            if(plant){
                return res.status(200).json({
                    message: 'Plant updated successfully!',
                    plant: plant
                });
            }else if (err) {
                return res.status(400).json({
                    message: 'An error occured'
                });
            }
        });
    }
    else {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }
};

//deleting user
deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }

        return res.status(200).json({ success: true, data: user });
    }).catch(err => console.log(err));
};

//deleting plant
deletePlant = async (req, res) => {
    await Plant.findOneAndDelete({ _id: req.params.id }, (err, plant) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!plant) {
            return res
                .status(404)
                .json({ success: false, error: `Plant not found` });
        }

        return res.status(200).json({ success: true, data: plant });
    }).catch(err => console.log(err));
};

//retrieving user based on id
getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }
        return res.status(200).json({ success: true, data: user });
    }).catch(err => console.log(err));
};

//retrieving plant based on id
getPlantById = async (req, res) => {
    await Plant.findOne({ _id: req.params.id }, (err, plant) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!plant) {
            return res
                .status(404)
                .json({ success: false, error: `Plant not found` });
        }
        return res.status(200).json({ success: true, data: plant });
    }).catch(err => console.log(err));
};

//retrieving all users
getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }
        return res.status(200).json({ success: true, data: users });
    }).catch(err => console.log(err));
};

//retrieving all plants
getPlants = async (req, res) => {
    
    await Plant.find({}, (err, plants) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!plants.length) {
            return res
                .status(404)
                .json({ success: false, error: `Plant not found` });
        }
        return res.status(200).json({ success: true, data: plants });
    }).catch(err => console.log(err));
};

//sending reset password email with unique link
forgotPassword = async (req, res)=> {
    if (req.body.email === '') {
        res.status(400).send('email required');
    }
        console.error(req.body.email);
        const token = crypto.randomBytes(20).toString('hex');
        await User.findOneAndUpdate({
            email: req.body.email },
            {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 7200000,
            })
            
        .then((user) => {
        if (user === null) {
            console.error('email not in database');
            res.status(403).send('email not in db');
        } else {
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'planteskolenntnu@gmail.com',
                pass: 'Vielskergerardo2021',
            },
            });
    
            const mailOptions = {
            from: 'planteskolenntnu@gmail.com',
            to: `${user.email}`,
            subject: 'Link To Reset Password',
            text:
                'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                + `https://deployment-lol.herokuapp.com/reset/${token}\n\n`
                + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
            };
            console.log('sending mail');
    
            transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('there was an error: ', err);
            } else {
                console.log('here is the res: ', response);
                res.status(200).json(token);
                console.log(token);
                
            }
            });
        }
    });   
};

//Checking if reset password token is valid or invalid
resetPassword = async (req,res) => {
    User.findOne({
          resetPasswordToken: req.query.resetPasswordToken,
          resetPasswordExpires: {
            $gt: Date.now(),
          },
      }).then((user) => {
        if (user == null) {
          res.status(403).send('password reset link is invalid or has expired.');
        } else {
          res.status(200).send({
            email: user.email,
            message: 'password reset link is valid',
          });
        }
    });
}

//updating the password with the new password, after hashing it
UpdatePasswordviaEmail = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ resetPasswordToken: body.token });                
    
    if (user === null) {
          res.status(403).send('password reset link is invalid or has expired');
        } 
        else if (user !== null) {
          const newHashedPassword = await bcrypt.hash(req.body.password, 10);
            await User.findOneAndUpdate({ resetPasswordToken: body.token }, { $set: {
                password: newHashedPassword
              }}, function (err, user) {
                  if(user){
                    res.status(200).json({
                        message: 'password updated',
                        user: user 
                    });
                  }else if(err) {
                    return res.status(400).json({
                        message: 'An error occured'
                    });
                  }
              });
            }
            else {
          res.status(401).json('no user exists in db to update');
        }
}

module.exports = {
    createUser,
    createPlant,
    updateUser,
    updatePlant,
    deleteUser,
    deletePlant,
    getUsers,
    getPlants,
    getUserById,
    getPlantById,
    forgotPassword,
    resetPassword,
    UpdatePasswordviaEmail,
};