var LoopImages=function (ImgArr,container) {
	if (!ImgArr||!container) return;

	this.imagesArray=ImgArr;//图片数据
	this.container=container;//容器
	this._time=null;//计时器
	this.i=1;//当前图片位置
	this.status=1;//轮播图状态
}
LoopImages.prototype = {
	// 创建方法
	init:function () {
		this.createImage().createTab().changeImg();
	},
	createImage:function () {
		var $Tab=$("<div id='s-list'>").appendTo(this.container);
		var $ul=$('<ul>').appendTo($Tab);
		for (var i = 0; i < this.imagesArray.length; i++) {
			var $li=$('<li>').appendTo($ul);
			var $a=$('<a>').appendTo($li);
			var $img=$('<img>').appendTo($a);
			$a.attr('href',this.imagesArray[i].href);
			$img.attr('src',this.imagesArray[i].src);
		}
		return this;
	},
	createTab:function () {
		var $Tab=$("<div id='s-tab'>").appendTo(this.container);
		var $ul=$('<ul>').appendTo($Tab);
		var that=this;

		// Tab 类
		var Tab=function (parent,a,description,i) {
			this.$li=$('<li>').appendTo(parent);
			var $img=$('<img>').appendTo(this.$li);
			$img.attr('src',a);
			var $div=$("<div class='text'>").appendTo(this.$li);
			$("<p>").appendTo($div).text(description);
			this.n=i;
			this.bindEvent();
		}
		Tab.prototype={
			bindEvent:function () {
				var that1=this;
				function tabHaddle1() {
					if (that.status) {
						clearTimeout(that._time);
						that.status=0;
					}
					if (!$(this).hasClass('cur')) {
						that.changeImgDom(that1.n)
					}
					that.i=(that1.n==that.imagesArray.length-1)? 0:that1.n+1;
				}
				function tabHaddle2() {
					if ($(this).hasClass('cur')) {
						if (!that.status) {
							that.setTime();
							that.status=1;
						}
					}
				}
				this.$li.on('mouseover',function (e) {
					var thatcon=this;
					throttle(true,tabHaddle2);
					throttle(tabHaddle1,{context:thatcon,time:400});
				});
				this.$li.on('mouseout',function (e) {
					var thatcon=this;
					throttle(tabHaddle2,{context:thatcon,time:400});
					throttle(true,tabHaddle1);
				});
			}
		}// Tab类 end

		for (var i = 0; i < this.imagesArray.length; i++) {
			(function (a) {
				new Tab($ul,that.imagesArray[a].tabsrc,that.imagesArray[a].description,a);
			})(i)
		}
		return this;
	},
	changeImg:function (){
		$('#s-list>ul>li').css('display','none');
		$('#s-tab>ul>li').eq(0).addClass('cur');
		$('#s-list>ul>li').eq(0).fadeToggle("slow", "linear");

		var that=this;
		this.setTime();
		function listHaddle1() {
			if (that.status) {
				clearTimeout(that._time);
				that.status=0;
			}
		}
		function listHaddle2() {
			if (!that.status) {
				that.setTime();
				that.status=1;
			}
		}
		$('#s-list>ul>li').mouseover(function () {
			throttle(true,listHaddle2);
			throttle(listHaddle1,{time:200});
		});
		$('#s-list>ul>li').mouseout(function () {
			throttle(listHaddle2,{time:200});
			throttle(true,listHaddle1);
		});

		return this;
	},
	setTime:function () {
		var that=this;
		this._time=setTimeout(function () {
			that.changeImgDom(that.i);
			that.i=(that.i>=that.imagesArray.length-1)? 0:that.i+1;
			that._time=setTimeout(arguments.callee,3500);
		},3500);
	},
	changeImgDom:function (i) {
		$('#s-list>ul>li').css('display','none');
		$('#s-tab>ul>li').removeClass();
		$('#s-tab>ul>li').eq(i).addClass('cur');
		$('#s-list>ul>li').eq(i).fadeToggle("slow", "linear");
	}
};
var imgs=[{src:'images/loopimages/1.jpg',href:'#',tabsrc:"images/loopimages/1-1.jpg",description:'篮球经典录像回放'},
					{src:'images/loopimages/2.jpg',href:'#',tabsrc:"images/loopimages/2-2.jpg",description:'篮球经典录像回放'},
					{src:'images/loopimages/3.jpg',href:'#',tabsrc:"images/loopimages/3-3.jpg",description:'篮球经典录像回放'},
					{src:'images/loopimages/4.jpg',href:'#',tabsrc:"images/loopimages/4-4.jpg",description:'篮球经典录像回放'},
					{src:'images/loopimages/5.jpg',href:'#',tabsrc:"images/loopimages/5-5.jpg",description:'篮球经典录像回放'},
					{src:'images/loopimages/6.jpg',href:'#',tabsrc:"images/loopimages/6-6.jpg",description:'篮球经典录像回放'}];


new LoopImages(imgs,$('#container')).init();