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
            res.status(201).json({ message: 'User registered successfully', user: registeredUser });
        })

    } catch(err) {
        res.status(400).json({ message: 'Error registering user', error: err.message });
    }
}

module.exports.login = async (req, res) => {
    res.status(200).json({ message: 'Successfully logged in' })
}

//login
//logout
