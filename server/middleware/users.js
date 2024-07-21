module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.status(403).json({ message: 'Error logging in'});
    }

    next();
}