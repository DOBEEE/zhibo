//节流器
var throttle=function(){
	//获取第一个参数
	var isClear=arguments[0],fn;
	//如果第一个参数是boolean类型那么第一个参数则表示是否清楚计时器
	if (typeof isClear==='boolean') {
		//第二个参数为函数
		fn=arguments[1];
		//函数的计时器句柄存在，这清楚该计时器
		fn._throttleID&&clearTimeout(fn._throttleID);
		//通过计时器延迟函数的执行
	}else{
		//第一个参数为函数
		fn=isClear;
		//第二个参数为函数执行时的参数
		var param=arguments[1];
		//对执行时的函数适配默认值
		var p=extend({
			context:null,//执行函数执行时的作用域
			args:[],//执行函数执行时的相关参数
			time:200//一秒最多发送5次请求
		},param);
		//清楚执行函数计时器句柄
		arguments.callee(true, fn);
		//为函数绑定计时器句柄，延迟执行函数
		fn._throttleID=setTimeout(function () {
			//执行函数
			fn.apply(p.context,p.args);
		},p.time);
	}

	function extend(){
		var i=1,
		len=arguments.length,
		target=arguments[0],
		j;
		if (i==len) {
			target=this;
			i--;
		}
		for (; i < len; i++) {
			for (j in arguments[i]) {
				target[j]=arguments[i][j];
			}
		}
		return target;
	};
};

