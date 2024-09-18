require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const session = require('express-session');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cropRoutes = require('./routes/cropRoutes');

const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

app = express();

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
});

app.use(express.static('public'));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    name: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7, 
        secure: process.env.NODE_ENV === 'production',
    }    
  }))

//init passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/crop', cropRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({ message: 'successfully found home route!'})
})

app.all('*', (req, res, next) => {
    console.log('FALLBACK ERROR');
    next();
})

app.listen(port, () => {
    console.log(`express app serving on port ${port}`);
})