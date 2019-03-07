var express = require('express');
var router = express.Router();
var {Product}=require('../model/product');
var csrf= require('csurf');
var passport=require('passport');

var csrfProtection= csrf();
router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {

  var products=Product.find((err, docs)=>{
    var productChunk=[];
    var chunkSize=3;
    console.log(docs.length)
    for(var i=0;i<docs.length;i+=chunkSize){
      productChunk.push(docs.slice(i, i+chunkSize));
      
    }
    console.log("Product Chunk Length  **********"+productChunk.length)
    res.render('shop/index', { title: 'Express', products:productChunk });
  });
});

router.get('/user/signup', (req, res,next)=>{
  var messages= req.flash('error');
  res.render('user/signup', {csrfToken:req.csrfToken(), messages:messages, hasErrors:messages.length>0});
})

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect:'/user/profile',
  failureRedirect:'/user/signup',
  failureFlash:true
}))

router.get('/user/signin', (req, res,next)=>{
  var messages= req.flash('error');
  res.render('user/signin', {csrfToken:req.csrfToken(), messages:messages, hasErrors:messages.length>0});
})

router.post('/user/signin', passport.authenticate('local.signin', {
  successRedirect:'/user/profile',
  failureRedirect:'/user/signup',
  failureFlash:true
}))

router.get('/user/profile', (req, res, next)=>{
  res.render('user/profile');
})

module.exports = router;
