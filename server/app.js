const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const session = require('express-session');

const userRoutes = require('./routes/userRoutes');

const dbUrl ='mongodb://127.0.0.1:27017/plantDisease';
const port = 3000;

app = express();

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(session({
    secret: 'replacethissecret',
    name: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7 
    }
  }))

//init passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/user', userRoutes);

app.all('*', (req, res, next) => {
    console.log('FALLBACK ERROR');
    next();
})

app.listen(port, () => {
    console.log(`express app serving on port ${port}`);
})