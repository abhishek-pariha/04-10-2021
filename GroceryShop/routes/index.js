var express = require('express');
var router = express.Router();

const UserModel = require('../model/login');
/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/product', function(req, res, next) {
  res.render('product');
});
router.get('/product2', function(req, res, next) {
  res.render('product2');
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout');
});

router.get('/icons', function(req, res, next) {
  res.render('icons');
});

router.get('/help', function(req, res, next) {
  res.render('help');
});

router.get('/faqs', function(req, res, next) {
  res.render('faqs');
});

router.get('/payment', function(req, res, next) {
  res.render('payment');
});

router.get('/privacy', function(req, res, next) {
  res.render('privacy');
});

router.get('/single', function(req, res, next) {
  res.render('single');
});

router.get('/single2', function(req, res, next) {
  res.render('single2');
});

router.get('/terms', function(req, res, next) {
  res.render('terms');
});

router.get('/typography', function(req, res, next) {
  res.render('typography');
});
router.post('/add', function(req, res, next){
  const mybodydata = ({
      user_name : req.body.name,
      user_email : req.body.email,
      user_password : req.body.password,
      user_cpassword : req.body.confirmpassword
  })
  var data = UserModel(mybodydata);

  data.save(function(err){
      if(err){
          console.log("Error in this record"+err)
      }else{
          console.log("data Succesfully added");
          res.redirect('/about');
      }
  })
})

router.post('/login', function (req, res, next) {

  var email = req.body.email;
  var password = req.body.password;

  console.log(req.body);
  UserModel.findOne({ "email":email }, function (err, db_users_array) {

console.log("Find One " + db_users_array);

if (db_users_array) {
  var db_email = db_users_array.email;
  var db_password = db_users_array.password;

}

console.log("db_users_array.email " + db_email);
console.log("db_users_array.password " + db_password);

if (db_email == null) {
  console.log("If");
//swal("Email not found");
    }
    else if (db_email == email && db_password == password) {
     req.session.email = db_email;
      res.redirect('/about');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});
module.exports = router;
