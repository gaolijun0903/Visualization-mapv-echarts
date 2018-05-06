var cityshort = window.location.search.split("=")[1];
console.log(cityshort);
CityMaps.init(cityshort);
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


//$('.tab-item').click(function(p){
//	$(this).addClass('tab-item-active').siblings().removeClass('tab-item-active');
//	if($(this)[0].id=='tab-gongxu'){
//		$('#subtab-list-xingyun').hide();
//		$('#subtab-list-gongxu').show();
//		getGongxuApi(cityshort);
//	}else if($(this)[0].id=='tab-xingyun'){
//		$('#subtab-list-gongxu').hide();
//		$('#subtab-list-xingyun').show();
//		getXingyunApi(cityshort);
//	}else if($(this)[0].id=='tab-yunli'){
//		$('#subtab-list-gongxu').hide();
//		$('#subtab-list-xingyun').hide();
//		getYunliApi(cityshort);
//	}else if($(this)[0].id=='tab-lujing'){
//		$('#subtab-list-gongxu').hide();
//		$('#subtab-list-xingyun').hide();
//		getLujingApi(cityshort);
//	} 
//})
$('.tab-item').click(function(p){
	$(this).addClass('tab-item-active').siblings().removeClass('tab-item-active');
	if($(this)[0].id=='tab-xingyun'){
		$('#subtab-list-gongxu').hide();
		$('#subtab-list-xingyun').show();	
		CityMaps.mapLayers[0].mapvLayer.show();
		CityMaps.mapLayers[1].mapvLayer.hide();
		CityMaps.layerTag = layerTag.XINGYUN;
	}else if($(this)[0].id=='tab-yunli'){
		$('#subtab-list-gongxu').hide();
		$('#subtab-list-xingyun').hide();
		CityMaps.mapLayers[0].mapvLayer.show();
		CityMaps.mapLayers[1].mapvLayer.show();
		CityMaps.layerTag = layerTag.YUNLI;
	}else if($(this)[0].id=='tab-gongxu'){
		$('#subtab-list-xingyun').hide();
		$('#subtab-list-gongxu').show();
		CityMaps.mapLayers[0].mapvLayer.show();
		CityMaps.mapLayers[1].mapvLayer.hide();
		CityMaps.layerTag = layerTag.GONGXU;
	}else if($(this)[0].id=='tab-lujing'){
		$('#subtab-list-gongxu').hide();
		$('#subtab-list-xingyun').hide();
		CityMaps.mapLayers[0].mapvLayer.show();
		CityMaps.mapLayers[1].mapvLayer.hide();
		CityMaps.layerTag = layerTag.LUJING;
	} 
})

// 四个接口
var apiUrl = {
	'XINGYUN': 'static/china-point.json',
	'YUNLI1': 'static/china-point.json',
	'YUNLI2': 'static/wuhan-car.js',
	'GONGXU': 'static/china-point.json',
	'LUJING': 'static/car.csv'
}

var mapOptions = {
	'XINGYUN':{
        fillStyle: 'rgba(55, 50, 250, 0.2)',
        globalCompositeOperation: "lighter",
        size: 15,
        animation: {
            type: 'time',
            stepsRange: {
                start: 0,
                end: 100
            },
            trails: 10,
            duration: 5,
        },
        draw: 'simple'
   },
   'YUNLI1':{
        strokeStyle: 'rgba(53,57,255,0.5)',
        coordType: 'bd09mc',
        shadowColor: 'rgba(53,57,255,0.2)',
        shadowBlur: 3,
        lineWidth: 3.0,
        draw: 'simple'
   },
   'YUNLI2': {
        fillStyle: 'rgba(255, 250, 250, 0.2)',
        coordType: 'bd09mc',
        globalCompositeOperation: "lighter",
        size: 1.5,
        animation: {
            stepsRange: {
                start: 0,
                end: 100 
            },
            trails: 3,
            duration: 5,
        },
        draw: 'simple'
   },
   'GONFXU':{
		fillStyle: 'rgba(255, 250, 50, 0.6)',
        size: 3,
        draw: 'simple',
        animation: {
            type: 'time',
            stepsRange: {
                start: 0,
                end: 10
            },
            trails: 1,
            duration: 6,
        }
   },
   'LUJING': {
        strokeStyle: 'rgba(50, 50, 255, 0.8)',
        lineWidth: 0.05,
        globalCompositeOperation: 'lighter',
        draw: 'simple'
    }
};

setInterval(function(){
	var layerTag = CityMaps.layerTag;
	console.log(layerTag);
	var url1 = '';
	var url2 = '';
	var mapOption1 = null;
	var mapOption2 = mapOptions.YUNLI2;
	switch(layerTag){
		case 'xingyun':
		url1 = apiUrl.XINGYUN;
		url2 = '';
		mapOption1 = mapOptions.XINGYUN;
		break;
		case 'yunli':
		url1 = apiUrl.YUNLI1;
		url2 = apiUrl.YUNLI2;
		mapOption1 = mapOptions.YUNLI1;
		break;
		case 'gongxu':
		url1 = apiUrl.GONGXU;
		url2 = '';
		mapOption1 = mapOptions.GONGXU;
		break;
		case 'lujing':
		url1 = apiUrl.LUJING;
		url2 = '';
		mapOption1 = mapOptions.LUJING;
		break;
	}
	if(url1 != ''){
		$.ajax({
			type:"get",
			url:url1,
			async:true,
			success: function(rs){
				var randomCount = 500;
		        var data = [];
		        var citys = ["北京","天津","上海","重庆","石家庄","太原","呼和浩特","哈尔滨","长春","沈阳","济南","南京","合肥","杭州","南昌","福州","郑州","武汉","长沙","广州","南宁","西安","银川","兰州","西宁","乌鲁木齐","成都","贵阳","昆明","拉萨","海口"];
		        // 构造数据
		        while (randomCount--) {
		            var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
		            data.push({
		                geometry: {
		                    type: 'Point',
		                    coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
		                },
		                count: 30 * Math.random(),
		                time: 100 * Math.random()
		            });
		        };
			    
		        CityMaps.mapLayers[0].dataSet.set(data);
		        // 更新options
		        //CityMaps.mapLayers[0].mapvLayer.setOptions(mapOption1);
			},
			error: function(){
				
			}
		});
	}
	if(url2 != ''){
		$.ajax({
			type:"get",
			url:url2,
			async:true,
			success: function(rs){
				var data = [];
            		var timeData = [];
				rs = rs.split("\n");
	            console.log(rs.length);
	            var maxLength = 0;
	            for (var i = 0; i < rs.length; i++) {
	                var item = rs[i].split(',');
	                var coordinates = [];
	                if (item.length > maxLength) {
	                    maxLength = item.length;
	                }
	                for (j = 0; j < item.length; j += 2) {
	                    coordinates.push([item[j], item[j + 1]]);
	                    timeData.push({
	                        geometry: {
	                            type: 'Point',
	                            coordinates: [item[j], item[j + 1]]
	                        },
	                        count: 1,
	                        time: j
	                    });
	                }
	                data.push({
	                    geometry: {
	                        type: 'LineString',
	                        coordinates: coordinates
	                    }
	                });
	                
	            }
			    
		        CityMaps.mapLayers[1].dataSet.set(timeData);
		        // 更新options
		        CityMaps.mapLayers[1].mapvLayer.update({
					options: mapOption2
				});
			},
			error: function(){
				
			}
		});
	}
	
	
}, 3000)


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


