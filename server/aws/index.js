const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const s3 = new AWS.S3();
const myBucket = process.env.S3_BUCKET;

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: myBucket,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
})

module.exports = upload;

