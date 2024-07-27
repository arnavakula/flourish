const Comment = require('../models/comment');

//upload comment
//delete comment
module.exports.uploadComment = async (req, res) => {
    const user = await User.findById(req.body.user);

    
}