var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var User=require('../app/models/users');
var Index=require('../app/controllers/index');
var _User=require('../app/controllers/user');
// var multer = require('multer');

router.use(function (req, res,next) {
	res.locals.user=req.session.user;//本地变量
	next();
})

//index
router.get('/', Index.index);

router.get('/zhibo/:id',function (req,res) {
		var id=req.params.id;
		res.render('detail',{uid:id});
})
router.get('/user',function (req,res) {
		res.render('user');
})
//user
router.post('/signup',_User.signup)
router.post('/login', _User.login)
router.get('/admin/userlist',_User.loginRequired,_User.adminRequired,_User.userlist);
router.get('/logout', _User.logout);
router.get('/login',_User.showLogin);
router.get('/signup',_User.showSignup);
router.delete('/admin/userlist',_User.del);
module.exports = router;