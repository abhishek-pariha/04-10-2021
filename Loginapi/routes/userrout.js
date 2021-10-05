var express = require('express');
var router = express.Router();

var UserModel = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource'); 
});

router.get('/get-user-api',function(req,res,next){
    UserModel.find({},function(err, mydata){
        if(err){
            res.send(JSON.stringify({'flag':0,'message':'error in api','err':err}))
        }else{
            res.send(JSON.stringify({'flag':1,'message':'Data Listing','data':mydata}))
        }
    })
});

router.post('/add-user-api',function(req, res, next){
    console.log(req.body);
    const mybodydata ={
        user_name : req.body.name,
        user_email : req.body.email,
        user_password : req.body.password
    }
    var data = UserModel(mybodydata)
    data.save(function(err){
        if(err){
            res.send(JSON.stringify({'flag':0,'message':'error in api','err':err}))
        }else{
            res.send(JSON.stringify({'flag':1,
            'message':"Successfully created api"
        }))
        }
    })
})

router.put('/get-update-user/:id', function(req, res) {
    // create mongose method to update a existing record into collection
    let id = req.params.id;
    var data = {
        user_name : req.body.user_name,
        user_email: req.body.user_email,
        user_password : req.body.user_password
    }

// save the user
UserModel.findByIdAndUpdate(id, data, function(err, data) {
if (err) throw err;

res.send('Successfully! updated');
});
});

router.get('/get-users-details-api/:id',function(req,res,next){
    UserModel.find({},function(err, mydata){
        if(err){
            res.send(JSON.stringify({'flag':0,'message':'error in api','err':err}))
        }else{
            res.send(JSON.stringify({'flag':1,'message':'Data Listing','data':mydata}))
        }
    })
});

router.delete('/get-users-delete-api/:id',function(req,res,next){
  UserModel.remove({
    _id: req.params.id
  }, function (err, blog) {
    if (err) return res.send(err);
    res.json({ message: 'Blog Post Deleted'});
  });

});
module.exports = router;
