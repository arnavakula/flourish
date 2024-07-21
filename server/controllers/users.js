const User = require('../models/user');

module.exports.register = async (req, res) => {
    try {
        
        const { first, last, email, username, password } = req.body;
        const user = new User(req.body);
        const registeredUser = await User.register(first, last, );


        req.login(registeredUser, err => {
            if(err){
                console.log(err);
                return next(err);
            }
            res.json({ username, password })
        })

    } catch(e) {
        res.status(400).send(e);
    }
}

//register
//login
//logout
