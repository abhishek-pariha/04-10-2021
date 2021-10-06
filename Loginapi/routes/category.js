var express = require('express');
var router = express.Router();

var CategoryModel = require('../model/category-details');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource'); 
});

router.get('/categoryget', function(req, res, next) {
  CategoryModel.find(function(err,data){
    if(err){
      res.send(JSON.stringify({'flag':0,'message':'Error in get','err':err}));
    }else{
      res.send(JSON.stringify({'flag' : 1,'message':'data get successfully','data':data}))
    }
  })
});



router.post('/categoryadd', function(req, res, next) {
  console.log(req.body);
  const mybodydata = {
    category_name: req.body.name
}
var data = CategoryModel(mybodydata);
data.save(function(err) {
    if (err) {
       res.send(JSON.stringify({'flag': 0,'error in api':err,'err':err}));
    } else {
        res.send(JSON.stringify({'flag':1,'message':'Data Successfully addes','data':data}));
    }
  })
});

// router.get('/display', function(req, res, next) {

//     CategoryModel.find(function(err, db_users_array) {
//     if (err) {
//         console.log("Error in Fetch Data " + err);
//       } else {
//         //Print Data in Console
//         console.log(db_users_array);
//         //Render User Array in HTML Table
//         res.render('category/display-category', { user_array : db_users_array });
        
//       }
//   }).lean();
 
// });




//Get Single User By ID
router.get('/show/:id', function(req, res) {
  console.log(req.params.id);
  CategoryModel.findById(req.params.id, function(err, db_categor_array) {
      if (err) {
          console.log("Error in Single Record Fetch" + err);
      } else {
          console.log(db_categor_array);

          res.render('category/single-category-record', { category_array: db_categor_array });
      }
  }).lean();
});



router.delete('/categorydelete/:id', function(req, res, next){
    CategoryModel.remove({
      _id: req.params.id
    }, function(err, blog){
      if (err) return res.send(err);
          res.json({message:'blog successfully deleted'});
      
  });
});



router.get('/edit/:id', function(req, res) {

  console.log(req.params.id);
  
  CategoryModel.findById(req.params.id, function(err, db_category_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_category_array);

          res.render('category/edit-category-form', { category_array: db_category_array });
      }
  }).lean();
});


router.put('/categoryupdate/:id', function(req, res) {

  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    category_name: req.body.name 
  }

  CategoryModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) throw err
        res.send('Successfully updated');
      
  });
});

module.exports = router;
