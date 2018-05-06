var CityMaps = {
	map: null,
	mapTags:[],
	init: function(){
		this.map = new BMap.Map("map", {
		    enableMapClick: false
		});
		this.map.centerAndZoom(new BMap.Point(114.321317, 30.598428), 12);  // 初始化地图,设置中心点坐标和地图级别
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
		
		this.initData();
	},
	getXingyunApi: function(short){
		$.get('static/car.csv', function(csvstr) {
	        var options = {
	            strokeStyle: 'rgba(50, 50, 255, 0.8)',
	            lineWidth: 0.05,
	            globalCompositeOperation: 'lighter',
	            draw: 'simple'
	        }
	
	        var dataSet = mapv.csv.getDataSet(csvstr);
	
	        var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
	
	    });
	},
	getYunliApi: function(short){
		$.get('static/wuhan-car.js', function (rs) {

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

            var dataSetLineString = new mapv.DataSet(data);

            var optionsLineString = {
                strokeStyle: 'rgba(53,57,255,0.5)',
                coordType: 'bd09mc',
                // globalCompositeOperation: 'lighter',
                shadowColor: 'rgba(53,57,255,0.2)',
                shadowBlur: 3,
                lineWidth: 3.0,
                draw: 'simple'
            }

            var mapvLayerLineString = new mapv.baiduMapLayer(map, dataSetLineString, optionsLineString);


            var dataSetPoint = new mapv.DataSet(timeData);

            var optionsPoint = {
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
            }

            var mapvLayerPoint = new mapv.baiduMapLayer(map, dataSetPoint, optionsPoint);
        });
	},
	getGongxuApi: function(short){
		var data =[]
		$.get('static/china-point.json', function (rs) {
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
		
		    var dataSet = new mapv.DataSet(data);
		    var options = {
		        fillStyle: 'rgba(255, 250, 50, 0.6)',
		        //shadowColor: 'rgba(255, 250, 50, 0.5)',
		        //shadowBlur: 3,
		        updateCallback: function (time) {
		            console.log('更新完了')
		        },
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
		    var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
		});
	},
	getLujingApi: function(short){
		$.get('static/car.csv', function(csvstr) {
	
	        var options = {
	            strokeStyle: 'rgba(50, 50, 255, 0.8)',
	            lineWidth: 0.05,
	            globalCompositeOperation: 'lighter',
	            draw: 'simple'
	        }
	
	        var dataSet = mapv.csv.getDataSet(csvstr);
	
	        var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
	
	    });
	},
	initData: function(){
		
	}
	
}

	