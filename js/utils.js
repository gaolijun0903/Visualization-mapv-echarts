var Utils = {
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









