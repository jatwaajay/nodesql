var express = require('express');
var router = express.Router();
const conn = require('../config/config');
const bcrypt = require("bcrypt")
const bodyparser = require('body-parser')
const multer = require('multer')
const path = require('path')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/get', async (req, res) => {
  try {
    var sql = "SELECT * FROM student";
    await conn.query(sql, (error, results) => {
      console.log(results,error)
        res.status(200).json(results);
      });
  } catch (error) {
    console.log(error);
  }
});

router.get('/createdbtable',(req,res)=>{
  let sql = 'create table products(id int primary key auto_increment,product_name varchar(20), price varchar(100), discretion varchar(225),image varchar(225))';
  conn.query(sql,(err,result)=>{
      if(err) throw err;
      console.log("Table Created...");
  });
});


var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/') 
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
});


router.post("/register",upload.single('image'), async(req, resp) => {    
  const { name, email, password, password_confirm } = req.body
  console.log(req.file,"req.body",req.body)
  var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
  var result = conn.query('INSERT INTO Users SET?', {name: name, email: email, password: password,image:imgsrc}, (err, res) => {
          if(err){
            console.log("Error IS :-",err)
          }else{
            resp.status(200).json({status:true,message:"User Create successfully"});
          }
  })
})

router.get('/get', async (req, res) => {
  try {
    var sql = "SELECT * FROM student";
    await conn.query(sql, (error, results) => {
      console.log(results,error)
        res.status(200).json(results);
      });
  } catch (error) {
    console.log(error);
  }
});
router.get('/register', async(req,res)=>{
  try{
    let Data = "SELECT * FROM Users";
    await conn.query(Data,(err,results)=>{
     console.log(err,"fffff",results);
     res.status(200).json({status:true,message:"User get successfully", data:results});
    })
  }catch (error) {
    console.log(error);
  }

})


router.post("/companies", async(req, res) => {
  const { company, email, website, phone } = req.body
  conn.query('INSERT INTO companies SET?', {company: company, email: email, website: website,phone:phone}, (err, res) => {
          if(err){
            console.log("Error IS :-",err)
          }else{
            resp.status(200).json({status:true,message:"company Create successfully"});
          }
  })
})
router.get("/companies", async(req, resp) => {  
  let sql = " ";
  if(req.query.user_id){
    sql = `select * from companies WHERE id =${req.query.user_id}`
  }else{
    sql = 'select * from companies'
  } 
conn.query(sql, (err, results) => {
          if(err){
            console.log("Error IS :-",err)
          }else{
            resp.status(200).json({status:true,message:"company get successfully",data:results});
          }
  })
})

router.delete('/companies',(req,resp)=>{
  let sql = 'DELETE * FROM companies WHERE id ='+id+
  conn.query(sql , (err,result)=>{
    if(err) throw err
    resp.status(200).json({status:true,message:"companies delete success"})
  })
})

router.get('/companies/:id', function(req, res, next) {
  var id= req.params;
  console.log(id,"id7777")
    var sql = 'DELETE FROM companies WHERE id = ?';
    conn.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
    res.status(200).json({starus:true,message:"Delete id success"})
  });
  
});

////////////////////////////////////////////
router.post("/upload-product",upload.single('image'), async(req, resp) => {    
  const { name, price, discretion, password_confirm } = req.body
  console.log(req.file,"req.body",req.body)
  var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
  // let hashedPassword = await bcrypt.hash(password, 8)

  var result = conn.query('INSERT INTO Users SET?', {product_name: name, price: price,discretion: discretion,image:req.file.filename}, (err, res) => {
          if(err){
            console.log("Error IS :-",err)
          }else{
            resp.status(200).json({status:true,message:"User Create successfully"});
          }
  })
})
router.post("/add-product-details",upload.single('product_image'), async(req, resp) => {    
  const {product_name, product_description, product_price, product_image} = req.body
  console.log(req.file,"req.body",req.body)
  var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
 conn.query('INSERT INTO productsDetails SET?', {product_name: product_name, product_description: product_description,product_price: product_price,product_image:imgsrc}, (err, res) => {
          if(err){
            console.log("Error IS :-",err)
          }else{
            resp.status(200).json({status:true,message:"Add Product successfully"});
          }
  })
})
router.get("/add-product-details", async(req, resp) => {    
 conn.query('SELECT * FROM productsDetails', (err, res) => {
          if(err){
            console.log("Error IS :-",err)
          }else{
            console.log(resp,"ooo",res)
            resp.status(200).json({status:true,message:"Get all Products successfully", data: res});
          }
  })
})




module.exports = router;
