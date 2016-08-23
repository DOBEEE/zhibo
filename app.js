var express = require('express');
var app = express();
var router=require('./routes/index');

var mongoose=require('mongoose');
var logger=require('morgan');
var dbUrl="mongodb://127.0.0.1:27017/test";
var db = mongoose.connect(dbUrl);

var port=process.env.PORT||3000;
// var router = express.Router();

var cookieParser=require('cookie-parser');
var session = require('express-session');
var mongoStore=require('connect-mongo')(session);
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var server=require('http').Server(app);
server.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(serveStatic('public'))
app.use(serveStatic('node_modules'))
app.use(cookieParser())
app.use(session({
  secret: 'xiaoxueseng',
  resave: false,
  saveUninitialized: true,
  store:new mongoStore({
  	url:dbUrl,
  	collection:'session'
  })
}))

app.set('views','./app/views/pages/');
app.set('view engine','jade');
// app.use(multer());

console.log('start on'+port);
db.connection.on('error',function(error) {
	console.log("数据库连接失败"+error);
})
db.connection.on('open',function() {
	console.log("数据库连接成功");
})
if ('development'===app.get('env')) {
	app.set('showStackError',true);
	app.use(logger(':method :url :status'))
	app.locals.pretty=true;
	mongoose.set('debug',true);
}
app.use('/',router);
