const User = require('../models/user');

module.exports.register = async (req, res, next) => {
    try {
        const { first, last, email, username, password } = req.body;
        const user = new User({ first, last, email, username });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, err => {
            if(err){
                res.status(500).json({ message: 'Error registering user', error: err.message });
                return next(err);
            }
            req.session.user = registeredUser._id;
            res.status(201).json({ message: 'User registered successfully', user: registeredUser._id });
        })

    } catch(err) {
        res.status(400).json({ message: 'Error registering user', error: err.message });
    }
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({username: req.body.username });
    req.session.user = user._id;
    res.status(200).json({ message: 'Successfully logged in', user: user._id });
}

module.exports.logout = async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({ success: true });
    });
}

module.exports.status = async (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ authenticated: true, user: req.session.user });
    } else {
        res.status(200).json({ authenticated: false });
    }
};
