var mongoose=require('mongoose');

var ZhiboSchema=new mongoose.Schema({
	stream:{type:String,unique:true},
	owner:{type:String},
	ison:{type:Boolean,default:false},
	description:{
		type:String
	},
	attention:{type:Number,default:0},
	award:{type:Number,default:0},
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


module.exports=ZhiboSchema;