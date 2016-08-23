var User=require('../models/users');

exports.logout=function(req, res){
  req.session.user=null;
  res.redirect('/');
};


//userlist page
exports.userlist=function (req,res) {
	User.find(function (err,users) {
		if(err) console.log(err);

		res.render('admin/userlist',{
			users:users
		})
	})
}
exports.del=function (req,res) {
	var id=req.query.id;
	if (id) {
		User.remove({_id:id},function (err,user) {
			if (err) {
				console.log(err);
			}else{
				res.json({success:1});
			}
		})
	}
}

exports.showSignup=function(req, res){
  res.render('signup',{title:'注册'});
};
exports.signup=function(req, res,next){
  
  User.findOne({email:req.body.user.email},function (err,user) {
  	if(err) {console.log(err);}

  	if(user){
  		return res.redirect('/login');
  	}else{
  		var user=new User(req.body.user);
  		user.save(function (err,_user) {
		  	if (err) return next(err);
		  	res.redirect('/');
		  })
  	}
  })
  
}
exports.showLogin=function(req, res){
  res.render('login',{title:'登陆'});
};

exports.login=function(req, res){
	User.findOne({email:req.body.user.email},
	function (err,doc) {
		if(err) return next(err);
		if(!doc) return res.redirect('/signup');

		doc.comparePassword(req.body.user.password,function (err,isMatch) {
			if(err) console.log(err);

			if(isMatch){
				req.session.user=doc;
				res.redirect('/');
			}else{
				res.redirect('/login');
			}
		})
		
	})
}

//userlist中间件
exports.loginRequired=function (req,res,next) {
	var user=req.session.user;
	if (!user) {
		return res.redirect('/login');
	}
	next();
}
exports.adminRequired=function (req,res,next) {
	var user=req.session.user;
	if (user.role<=10) {
		return res.send('你没有权限');
	}
	next();
}