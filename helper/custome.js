const multer = require('multer')
const path = require('path')
const bcrypt = require('bcrypt')
  
  function imageUpload(imagePath){
        var storage = multer.diskStorage({
            destination: (req, file, callBack) => {
                callBack(null, imagePath) 
            },
            filename: (req, file, callBack) => {
                callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
          })
          
          return multer({
            storage: storage
          });
    }
   

      module.exports ={imageUpload}