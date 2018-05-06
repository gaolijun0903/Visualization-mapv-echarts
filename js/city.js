var cityshort = window.location.search.split("=")[1];
console.log(cityshort);
var cityInfo = {
	'bj':{lng:116.4136103013,lat:39.9110666857},
	'sh':{lng:121.4803295328,lat:31.2363429624},
	'gz':{lng:113.2708136740,lat:23.1351666766},
	'sz':{lng:114.0661345267,lat:22.5485544122},
	'wz':{lng:120.7058617854,lat:28.0011792279},
	'fj':{lng:119.3030722518,lat:26.1059198357},
	'heb':{lng:126.5424184340,lat:45.8077839548},
	'zz':{lng:113.6313915479,lat:34.7533581487}
}
//用于初始化地图的中心点坐标
var citylng = cityInfo[cityshort].lng;
var citylat = cityInfo[cityshort].lat;


$('.tab-item').click(function(p){
	$(this).addClass('tab-item-active').siblings().removeClass('tab-item-active');
	if($(this)[0].id=='tab-gongxu'){
		$('#subtab-list-xingyun').hide();
		$('#subtab-list-gongxu').show();
		getGongxuApi(cityshort);
	}else if($(this)[0].id=='tab-xingyun'){
		$('#subtab-list-gongxu').hide();
		$('#subtab-list-xingyun').show();
		getXingyunApi(cityshort);
	}else if($(this)[0].id=='tab-yunli'){
		$('#subtab-list-gongxu').hide();
		$('#subtab-list-xingyun').hide();
		getYunliApi(cityshort);
	}else if($(this)[0].id=='tab-lujing'){
		$('#subtab-list-gongxu').hide();
		$('#subtab-list-xingyun').hide();
		getLujingApi(cityshort);
	} 
})
//头部时间的动态显示
//minuteTimer($('#time-show'));
//左侧数据的动态变化效果
//updateLeftDatas(cityshort);
function updateLeftDatas(cityshort){
	var countUpOptions = {
		useEasing: false, 
		useGrouping: true, 
		separator: ',', 
		decimal: '.', 
	};
	var startArr =[1000, 1000, 1000, 1000, 1000, 1000] ;  //虚拟数据
	var endArr =[1005, 1005, 1005, 1005, 1005, 1005] ;  //虚拟数据
	//  0--创建订单量, 1--当前服务量, 2--当前里程数, 3--服务时长, 4--需求量, 5--当前运力
	var countUpIdArr = ['create-order','current-service','current-mileage','service-duration','quantity-demand','current-transport']
	
	for(var i=0; i<countUpIdArr.length; i++){
		var item = endArr[i];
		var demoName = new CountUp(countUpIdArr[i], startArr[i], endArr[i], 0, 5, countUpOptions);
		if (!demoName.error) {
			(function(i){
				demoName.start(function(){
					endArr[i] += 200;
					this.update(endArr[i]);
				})
			})(i);
		} else {
			console.error(demoName.error);
		}
	}
}


