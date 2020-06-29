const path = require('path');
const express = require('express');
const multer = require('multer');

const router = express.Router();

var storage =   multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  });
  
var upload = multer({ 
    storage : storage
}).single('upload_file');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'uploader.html'));
});

router.post('/uploadfile', (req, res, next) => {
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            
            return res.send("Error uploading file.");
        } else {
            console.log(req.file);
            return res.send("File is uploaded");
        }
        
    });
});

module.exports = router;