var layerTag = {
	'XINGYUN': 'xingyun',
	'YUNLI': 'yunli',
	'GONGXU': 'gongxu',
	'LUJING': 'lujing'
}
var CityMaps = {
	map: null,
	mapLayers:[],
	shortcity: '',
	layerTag: layerTag.XINGYUN,
	init: function(shortcity){
		this.shortcity = shortcity;
		this.map = new BMap.Map("map", {
		    enableMapClick: false
		});
		this.map.centerAndZoom(new BMap.Point(114.321317, 30.598428), 8);  // 初始化地图,设置中心点坐标和地图级别
		this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
		this.map.setMapStyle({
		    styleJson: [{
		        "featureType": "water",
		        "elementType": "all",
		        "stylers": {
		            "color": "#044161"
		        }
		    }, {
		        "featureType": "land",
		        "elementType": "all",
		        "stylers": {
		            "color": "#091934"
		        }
		    }, {
		        "featureType": "boundary",
		        "elementType": "geometry",
		        "stylers": {
		            "color": "#064f85"
		        }
		    }, {
		        "featureType": "railway",
		        "elementType": "all",
		        "stylers": {
		            "visibility": "off"
		        }
		    }, {
		        "featureType": "highway",
		        "elementType": "geometry",
		        "stylers": {
		            "color": "#004981"
		        }
		    }, {
		        "featureType": "highway",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#005b96",
		            "lightness": 1
		        }
		    }, {
		        "featureType": "highway",
		        "elementType": "labels",
		        "stylers": {
		            "visibility": "on"
		        }
		    }, {
		        "featureType": "arterial",
		        "elementType": "geometry",
		        "stylers": {
		            "color": "#004981",
		            "lightness": -39
		        }
		    }, {
		        "featureType": "arterial",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#00508b"
		        }
		    }, {
		        "featureType": "poi",
		        "elementType": "all",
		        "stylers": {
		            "visibility": "off"
		        }
		    }, {
		        "featureType": "green",
		        "elementType": "all",
		        "stylers": {
		            "color": "#056197",
		            "visibility": "off"
		        }
		    }, {
		        "featureType": "subway",
		        "elementType": "all",
		        "stylers": {
		            "visibility": "off"
		        }
		    }, {
		        "featureType": "manmade",
		        "elementType": "all",
		        "stylers": {
		            "visibility": "off"
		        }
		    }, {
		        "featureType": "local",
		        "elementType": "all",
		        "stylers": {
		            "visibility": "off"
		        }
		    }, {
		        "featureType": "arterial",
		        "elementType": "labels",
		        "stylers": {
		            "visibility": "off"
		        }
		    }, {
		        "featureType": "boundary",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#029fd4"
		        }
		    }, {
		        "featureType": "building",
		        "elementType": "all",
		        "stylers": {
		            "color": "#1a5787"
		        }
		    }, {
		        "featureType": "label",
		        "elementType": "all",
		        "stylers": {
		            "visibility": "off"
		        }
		    }, {
		        "featureType": "poi",
		        "elementType": "labels.text.fill",
		        "stylers": {
		            "color": "#ffffff"
		        }
		    }, {
		        "featureType": "poi",
		        "elementType": "labels.text.stroke",
		        "stylers": {
		            "color": "#1e1c1c"
		        }
		    }, {
		        "featureType": "administrative",
		        "elementType": "labels",
		        "stylers": {
		            "visibility": "off"
		        }
		    },{
		        "featureType": "road",
		        "elementType": "labels",
		        "stylers": {
		            "visibility": "off"
		        }
		    }]
		});
		this.initLayers();
		this.initLayerData();
	},
	initLayers: function(){
		var layer1 = this.getOneLayer();   // 层1
		var layer2 = this.getTwoLayer(); 	  // 层2
		this.mapLayers.push(layer1);
		this.mapLayers.push(layer2);
	},
	initLayerData: function(){
		var self = this;
		setTimeout(function(){
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
	        };
	        // 初始化第一个层的数据
	        self.mapLayers[0].dataSet.set(data);
	        // 更新options
	        self.mapLayers[0].mapvLayer.update({
				options: {
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
				}
			});
		},1000); 
		
		// 第二个层初始化
		/*$.get('static/china-point.json', function (rs) {
			var data =[]
		    for (var i = 0; i < rs[0].length; i++) {
		        var geoCoord = rs[0][i].geoCoord;
		        data.push({
		            geometry: {
		                type: 'Point',
		                coordinates: geoCoord 
		            },
		            time: Math.random() * 10
		        });
		    }
		    var options = {
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
		    }
		    
		     // 初始化第一个层的数据
	        self.mapLayers[1].dataSet.set(data);
	        // 更新options
	        self.mapLayers[1].mapvLayer.update({
				options: options
			});
		    
		});*/
	},
	getOneLayer: function(){
		var dataSet = new mapv.DataSet([]);
		var options = {};
		var mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options);
		return {
			dataSet: dataSet,
			mapvLayer: mapvLayer
		}
	},
	getTwoLayer: function(){
		var dataSet = new mapv.DataSet([]);
        var optionsLineString = {};
        var mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, optionsLineString);
        // 隐藏第二个层
        mapvLayer.hide();
        return {
			dataSet: dataSet,
			mapvLayer: mapvLayer
		}
	}
}

	