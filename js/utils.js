var Utils = {
	urlDomain:'https://',  //线下测试接口域名
	timestamp:function(){
		return Date.parse(new Date())/1000;
	},
	timeArr12:function(){//生成当前时间的前十二个小时的数组，用于图表的时间坐标轴
		var res = [];
		var d = new Date().getHours();
		if(d>=12){
			for (var i=d-11; i<=d; i++){
    			res.push(i);
    		}
		}else{
			for (var i=d+13; i<24; i++){
    			res.push(i);
    		}
    		for(var i=0; i<=d; i++){
    			res.push(i);
    		}
		}
		return res;
    },
	minuteTimer:function($dom){
		var str = this.timeFormater();
		$dom.html(str);
		var self = this;
		var headerTimer  = setInterval(function(){
			var str = self.timeFormater();
			$dom.html(str);
		},1000);
	},
	timeFormater:function (){
		var t = new Date();
		var timeStr = '', y, n, d, h, M, s;
		y = t.getFullYear();
		m = t.getMonth()+1 ;
		d = t.getDate();
		h = this.pad0(t.getHours());
		M = this.pad0(t.getMinutes());
		s = this.pad0(t.getSeconds());
		timeStr = y + "年" + m + "月" + d + "日   " +h + ":" + M + ":" +s;
		return timeStr;
	},
	pad0:function  (n){
		return n<10? '0'+n : n;
	},
	getQueryString:function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}









