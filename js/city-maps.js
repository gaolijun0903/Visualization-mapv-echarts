var layerTag = {
	'XINGYUN': 'xingyun',
	'YUNLI': 'yunli',
	'GONGXU': 'gongxu',
	'LUJING': 'lujing'
}
//mapv图层配置
var MapOptions = {
	'XINGYUN':{
        fillStyle: 'rgba(255, 250, 50, 0.6)',// 填充颜色-- 点数据时候使用
        size: 3,// 填充点大小值
        draw: 'simple',
        animation: {
            type: 'time',// 按时间展示动画
            stepsRange: {// 动画时间范围,time字段中值
                start: 0,
                end: 10
            },
            trails: 1,// 时间动画的拖尾大小
            duration: 5,// 单个动画的时间，单位秒
        }
    },
	'YUNLI1':{
        strokeStyle: 'rgba(53,57,255,0.5)',// 描边颜色--线数据时候使用
        coordType: 'bd09mc',// 可选百度墨卡托坐标类型bd09mc和百度经纬度坐标类型bd09ll(默认)
        shadowColor: 'rgba(53,57,255,0.2)',
        shadowBlur: 3,
        lineWidth: 3.0,
        draw: 'simple'
    },
	'YUNLI2':{
        fillStyle: 'rgba(255, 250, 250, 0.2)',// 填充颜色
        coordType: 'bd09mc',
        globalCompositeOperation: "lighter",// 颜色叠加方式
        size: 1.5,
        animation: {
            stepsRange: {
                start: 0,
                end: 10
            },
            trails: 1,
            duration: 5,
        },
        draw: 'simple'
    },
	'GONGXU':{
        size: 13, // 每个热力点半径大小
        gradient: { 0.25: "rgb(0,0,255)", 0.35: "rgb(0,255,0)", 0.75: "yellow", 1.0: "rgb(255,0,0)"},// 热力图渐变色
        max: 40,  // 最大权重值，根据上面配置用以计算它的热度
        animation: {
            type: 'time',// 按时间展示动画
            stepsRange: {// 动画时间范围,time字段中值
                start: 0,
                end: 10
            },
            trails: 1,// 时间动画的拖尾大小
            duration: 5,// 单个动画的时间，单位秒
        },
        draw: 'heatmap'
    },
	'LUJING':{
        strokeStyle: 'rgba(50, 50, 255, 0.8)',// 描边颜色
        lineWidth: 0.05,
        globalCompositeOperation: 'lighter',// 颜色叠加方式
        draw: 'simple'
    }
};
//地图的自定义样式 	
var MapStyle = {
    styleJson: [ {"featureType":"water","elementType":"all","stylers":{"color":"#044161"}},
    {"featureType":"land","elementType":"all","stylers":{"color":"#091934"}},
    {"featureType":"boundary","elementType":"geometry","stylers":{"color":"#064f85"}},
    {"featureType":"railway","elementType":"all","stylers":{"visibility":"off"}},
    {"featureType":"highway","elementType":"geometry","stylers":{"color":"#004981"}},
    {"featureType":"highway","elementType":"geometry.fill","stylers":{"color":"#005b96","lightness":1}},
    {"featureType":"highway","elementType":"labels","stylers":{"visibility":"on"}},
    {"featureType":"arterial","elementType":"geometry","stylers":{"color":"#004981","lightness":-39}},
    {"featureType":"arterial","elementType":"geometry.fill","stylers":{"color":"#00508b"}},
    {"featureType":"poi","elementType":"all","stylers":{"visibility":"off"}},
    {"featureType":"green","elementType":"all","stylers":{"color":"#056197","visibility":"off"}},
    {"featureType":"subway","elementType":"all","stylers":{"visibility":"off"}},
    {"featureType":"manmade","elementType":"all","stylers":{"visibility":"off"}},
    {"featureType":"local","elementType":"all","stylers":{"visibility":"off"}},
    {"featureType":"arterial","elementType":"labels","stylers":{"visibility":"off"}},
    {"featureType":"boundary","elementType":"geometry.fill","stylers":{"color":"#029fd4"}},
    {"featureType":"building","elementType":"all","stylers":{"color":"#1a5787"}},
    {"featureType":"label","elementType":"all","stylers":{"visibility":"off"}},
    {"featureType":"poi","elementType":"labels.text.fill","stylers":{"color":"#ffffff"}},
    {"featureType":"poi","elementType":"labels.text.stroke","stylers":{"color":"#1e1c1c"}},
    {"featureType":"administrative","elementType":"labels","stylers":{"visibility":"off"}},
    {"featureType":"road","elementType":"labels","stylers":{"visibility":"off"}} ]
}

var CityMaps = {
	map: null,
	mapLayers:[],
	layerTag: layerTag.XINGYUN,
	init: function(lng,lat){
		this.map = new BMap.Map("map", { enableMapClick: false}); // 创建地图实例  
		this.map.centerAndZoom(new BMap.Point(lng, lat), 6);  // 初始化地图，设置中心点坐标和地图级别  
		this.map.enableScrollWheelZoom(true);  // 开启鼠标滚轮缩放
		this.map.setMapStyle(MapStyle);  // 设置地图的自定义样式 
		this.initLayers();
	},
	initLayers: function(){ //初始化图层
		var layer1 = this.createMapLayer();   // 层1
		var layer2 = this.createMapLayer(true);  // 层2，创建后先隐藏
		this.mapLayers.push(layer1);
		this.mapLayers.push(layer2);
	},
	createMapLayer:function(isHide){ //创建图层，返回图层对象
		var dataSet = new mapv.DataSet([]);
		var options = {};
		var mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options);
		if(isHide){//是否隐藏
			mapvLayer.hide();
		}
		return {
			dataSet: dataSet,
			mapvLayer: mapvLayer
		}
	},
	updateLayerData: function(data1,data2,options1,options2){ //图层切换时，更新数据和配置
		
		// 更新数据
        this.mapLayers[0].dataSet.set(data1);
        if(data2){
        	this.mapLayers[1].dataSet.set(data2);
        }
        // 更新options
        if(options1){
        		//console.log(this.mapLayers[0].mapvLayer.options)
	        this.mapLayers[0].mapvLayer.setOptions(
				 options1
			);
		}
		if(options2){
			this.mapLayers[1].mapvLayer.setOptions( options2
			);
		}
				
	}
}

	