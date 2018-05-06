function minuteTimer($dom){
	var str = timeFormater();
	$dom.html(str);
	var headerTimer  = setInterval(function(){
		var str = timeFormater();
		$dom.html(str);
	},60000);
}

function timeFormater(){
	var t = new Date();
	var timeStr = '', y, n, d, h, M, s;
	y = t.getFullYear();
	m = t.getMonth()+1 ;
	d = t.getDate();
	h = pad0(t.getHours());
	M = pad0(t.getMinutes());
	s = t.getSeconds();
	timeStr = y + "年" + m + "月" + d + "日   " +h + ":" + M;
	return timeStr;
}

function pad0 (n){
	return n<10? '0'+n : n;
}


function scrollNum(n1,n2){
	var delta = n2 - n1;
	
}
