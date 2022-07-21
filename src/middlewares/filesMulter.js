const multer = require('multer');

var routeImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/img/products/')
    },
    filename: function (req, file, cb) {
       // console.log(file.originalname);
        cb(null, file.originalname)
    }
})

var upload_file = multer({ storage: routeImage });

module.exports = upload_file;