var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');

var SALT_WORK_FACTOR=10;
var UserSchema=new mongoose.Schema({
	name:{type:String},
	age:{type:Number,default:0},
	password:String,
	email:{type:String,unique:true},
	picture:{type:String,default:'default.jpg'},
	//0:nomal user
	//1:VIP
	//2:VIP pro
	//10:admin
	role:{
		type:Number,
		default:0
	},
	attention:{type:Array,default:0},
	isguan:{type:Number,default:0},
	zhiboid:{type:Number,default:0},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

UserSchema.methods={
	comparePassword:function (_password,cb) {
		bcrypt.compare(_password,this.password,function (err,isMatch) {
			if (err) return cb(err);

			cb(null,isMatch);
		})
	}
}
UserSchema.pre('save',function (next) {
	var user=this;
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);

			user.password=hash;
			next();
	  });
	});
})

module.exports=UserSchema;