var express = require('express')
var router = express.Router();
var apis = require('../controler/api')
var userControler = require('../controler/user')
const { imageUpload } = require("../helper/custome")
const path = require("path")


router.post('/companies', apis.companies)
router.get('/getcompanies', apis.getcompanies)
router.delete('/deleteCompanies', apis.deleteCompanies)
router.put('/putCompanies', apis.putCompanies)
// console.log(path.join(__dirname, "..", "public/images"))


// user modules 
router.post('/create-user', imageUpload("public/images").single('image',{encoding: 'base64'}), userControler.createUser)
router.get('/get-users', userControler.getUsers);
router.delete('/delete-user', userControler.deleteUser)
router.put('/update-user', userControler.updateUser)

module.exports = router;