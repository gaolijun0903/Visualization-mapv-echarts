//获取城市简码
var cityshort = Utils.getQueryString('cityshort') || 'bj';

var cityInfo = {
	'bj':{name:'北京',lng:116.4136103013,lat:39.9110666857},
	'sh':{name:'上海',lng:121.4803295328,lat:31.2363429624},
	'gz':{name:'广州',lng:113.2708136740,lat:23.1351666766},
	'sz':{name:'深圳',lng:114.0661345267,lat:22.5485544122},
	'wz':{name:'温州',lng:120.7058617854,lat:28.0011792279},
	'fj':{name:'福建',lng:119.3030722518,lat:26.1059198357},
	'heb':{name:'哈尔滨',lng:126.5424184340,lat:45.8077839548},
	'zz':{name:'郑州',lng:113.6313915479,lat:34.7533581487}
}
var name = cityInfo[cityshort].name;
$('#city-name').html(name);
var citylng = cityInfo[cityshort].lng; //获取城市经度
var citylat = cityInfo[cityshort].lat; //获取城市纬度
console.log(cityshort,citylng,citylat);
//初始化地图及图层
CityMaps.init(citylng,citylat);

//右上方的一级切换按钮点击事件
$('.tab-item').click(function(p){
	$(this).addClass('tab-item-active').siblings().removeClass('tab-item-active');
	var thisId = $(this)[0].id;
	if(thisId=='tab-xingyun'){ //1--星云图
		$('#subtab-list-gongxu').hide();   //供需热力图的 二级切换按钮
		$('#subtab-list-xingyun').show();	//星云图的 二级切换按钮
		CityMaps.layerTag = layerTag.XINGYUN;
	}else if(thisId=='tab-yunli'){  //2--运力状态   //该效果需要两个图层（点、路线）
		$('#subtab-list-gongxu').hide();
		$('#subtab-list-xingyun').hide();
		CityMaps.layerTag = layerTag.YUNLI;
	}else if(thisId=='tab-gongxu'){  //3--供需热力
		$('#subtab-list-xingyun').hide();
		$('#subtab-list-gongxu').show();  //供需热力图的 二级切换按钮
		CityMaps.layerTag = layerTag.GONGXU;
	}else if(thisId=='tab-lujing'){ //4--路径经脉
		$('#subtab-list-gongxu').hide();
		$('#subtab-list-xingyun').hide();
		CityMaps.layerTag = layerTag.LUJING;
	} 
	setDataFn();
})

//星云图的二级切换按钮点击事件
$('#subtab-list-xingyun .subtab-item').click(function(p){
	$(this).addClass('subtab-item-active').siblings().removeClass('subtab-item-active');
	var thisId = $(this)[0].id;
	if(thisId=='subtab-location'){ //1--星云图
		
		
	}else if(thisId=='subtab-search'){  //2--运力状态   //该效果需要两个图层（点、路线）
		
		CityMaps.layerTag = layerTag.YUNLI;
	}else if(thisId=='subtab-create'){  //3--供需热力
		
		CityMaps.layerTag = layerTag.GONGXU;
	}else if(thisId=='subtab-qiang'){ //4--路径经脉
		
		CityMaps.layerTag = layerTag.LUJING;
	} 
	
	CityMaps.layerTag = layerTag.XINGYUN;
	setDataFn();
})

//供需热力图的二级切换按钮点击事件
$('#subtab-list-gongxu .subtab-item').click(function(p){
	$(this).addClass('subtab-item-active').siblings().removeClass('subtab-item-active');
	var thisId = $(this)[0].id;
	if(thisId=='subtab-demand'){ //1--星云图
		
		
	}else if(thisId=='subtab-supply'){  //2--运力状态   //该效果需要两个图层（点、路线）
		
	}
	
	CityMaps.layerTag = layerTag.GONGXU;
	setDataFn();
})



// 四个接口
var apiUrl = {
	'XINGYUN': 'static/car.json', //蓝点--自己构造
	'YUNLI1': 'static/wuhan-car.js',
	'YUNLI2': 'static/wuhan-car.js',
	'GONGXU': 'static/car.json',  //热力图---构造
	'LUJING': 'static/car.json'   //直接可用
}


//setInterval(setDataFn, 3000)
setDataFn();
function setDataFn(){
	var layerTag = CityMaps.layerTag;
	console.log('layerTag'+layerTag);
	var url = '';
	var mapOption1 = null;
	var mapOption2 = null;
	switch(layerTag){
		case 'xingyun':
			url = apiUrl.XINGYUN;
			mapOption1 = MapOptions.XINGYUN;
			CityMaps.mapLayers[0].mapvLayer.show();
			CityMaps.mapLayers[1].mapvLayer.hide();
			break;
		case 'yunli':
			url = apiUrl.YUNLI1;
			mapOption1 = MapOptions.YUNLI1;
			mapOption2 = MapOptions.YUNLI2;
			CityMaps.mapLayers[0].mapvLayer.show();  
			CityMaps.mapLayers[1].mapvLayer.show();
			break;
		case 'gongxu':
			url = apiUrl.GONGXU;
			mapOption1 = MapOptions.GONGXU;
			CityMaps.mapLayers[0].mapvLayer.show();
			CityMaps.mapLayers[1].mapvLayer.hide();
			break;
		case 'lujing':
			url = apiUrl.LUJING;
			mapOption1 = MapOptions.LUJING;
			CityMaps.mapLayers[0].mapvLayer.show();
			CityMaps.mapLayers[1].mapvLayer.hide();
			break;
	}
	
	if(layerTag=='xingyun'){
		xingyunFn(mapOption1,mapOption2);
		
	}else if(layerTag=='yunli'){
		$.ajax({
			type:"get",
			url:url,
			async:true,
			success: function(data){
				yunliFn(data,mapOption1,mapOption2);
				
			},
			error: function(){
				
			}
		});
		
	}else if(layerTag=='gongxu'){
		gongxuFn(mapOption1,mapOption2);
		
	}else if(layerTag=='lujing'){
		$.ajax({
			type:"get",
			url:url,
			async:true,
			success: function(data){
				CityMaps.updateLayerData(data,'',mapOption1,mapOption2)
			},
			error: function(){}
		});
		
	}

}


//临时构造数据
function xingyunFn(mapOption1,mapOption2){
	var data = [];
	var randomCount = 300;
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
    }
    CityMaps.updateLayerData(data,'',mapOption1,mapOption2)
}
function gongxuFn(mapOption1,mapOption2){
	var randomCount = 1000;
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
    }
    CityMaps.updateLayerData(data,'',mapOption1,mapOption2)
}

function  yunliFn(rs,mapOption1,mapOption2){
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
    CityMaps.updateLayerData(data,timeData,mapOption1,mapOption2)
    
}



//头部时间的动态显示
//Utils.minuteTimer($('#time-show'));
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


