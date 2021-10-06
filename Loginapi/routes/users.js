var express = require('express');
var router = express.Router();

var CountryModel = require('../model/country');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource'); 
});
 
router.get('/getcountry',function(req,res,next){
  CountryModel.find({},function(err, mydata){
      if(err){
          res.send(JSON.stringify({'flag':0,'message':'error in api','err':err}))
      }else{
          res.send(JSON.stringify({'flag':1,'message':'Data Listing','data':mydata}))
      }
  })
});

router.post('/countryadd',function(req, res, next){
  console.log(req.body);
  const mybodydata ={
      country_name : req.body.name,
  }
  var data = CountryModel(mybodydata)
  data.save(function(err){
      if(err){
          res.send(JSON.stringify({'flag':0,'message':'error in api','err':err}))
      }else{
          res.send(JSON.stringify({'flag':1,
          'message':"Api Created"
      }))
      }
  })
})

router.put('/countryupdate/:id', function(req, res) {
  // create mongose method to update a existing record into collection
  let id = req.params.id;
  var data = {
      country_name : req.body.name
  }

// save the user
CountryModel.findByIdAndUpdate(id, data, function(err, data) {
if (err) throw err;

res.send('Successfully! updated');
});
});


router.delete('/countrydelete/:id',function(req,res,next){
CountryModel.remove({
  _id: req.params.id
}, function (err, blog) {
  if (err) return res.send(err);
  res.json({ message: 'Blog Post Deleted'});
});

});

module.exports = router;
