const { Signup, Login, AddFile } = require('../controllers/userController');
const router = require('express').Router() ;
const path = require('path');

const multer = require('multer') ;
const storageEngine = multer.diskStorage ({
    destination: __dirname,
    filename: function (req, file, callback) {
      callback (
        null,
        file.originalname
        // file.fieldname + '-' + Date.now () + path.extname (file.originalname)
      );
    },
  });

  const fileFilter = (req, file, callback) => {
    let pattern = /jpg|png|svg/; // reqex
  
    if (pattern.test (path.extname (file.originalname))) {
      callback (null, true);
    } else {
      callback ('Error: not a valid file');
    }
  };


  const upload = multer ({
    storage: storageEngine,
    // fileFilter: fileFilter,
  });
  
  // routing
  

router.post("/signup",Signup) ;
router.post("/login",Login) ;
router.put("/addfile",upload.single ('File'),AddFile) ;

module.exports = router ;