const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");

const db = require('./db/database');

require('./auth');
const userRouter = require('./routes/user-router');
const gardener = require('./routes/gardener-route');
const manager = require('./routes/manager-route');

const passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'Mongodb connection error:'));

//Checking role
async function managerAuth(req, res, next) {
    if (req.user && req.user.role === 'manager') {
        next();
    } else {
        return res.status(401).json({
            message: 'Unauthorized, not a manager'
        });
    }
}

app.use('/all', userRouter);
//adding authentication with passport
app.use('/gardener', passport.authenticate('jwt', { session: false }), gardener);
app.use('/manager', passport.authenticate('jwt', { session: false }), managerAuth, manager);


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err });
});
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(port, () => console.log(`Server is up and running on port ${port}`));