// 基于准备好的dom，初始化echarts实例
var yunliChart = echarts.init(document.getElementById('yunli'));
var fuwuChart = echarts.init(document.getElementById('fuwu'));
var gongxuChart = echarts.init(document.getElementById('gongxu'));

// 指定图表的配置项和数据
var yunliOption = {
    title : {
        text: '平台运力分布',
        textStyle: {
        	color:'#0ED7F9',
        	fontSize:'18'
        },
        x:'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x:'right',
        y:'middle',
        //right: 10,
        //top: 20,
        //bottom: 20,
        textStyle: {
        	color:'#96DCFA',
        	fontSize:'14'
        },
        data:['易达','舒适','商务','豪华','其他']
    },
    series: [
        {
            name:'平台运力分布',
            type:'pie',
            center: ['45%', '50%'],
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    formatter: '{d}%'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                }
            },
            data:[
                {value:335, name:'易达'},
                {value:310, name:'舒适'},
                {value:234, name:'商务'},
                {value:135, name:'豪华'},
                {value:548, name:'其他'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ],
    color:['#E1C667','#EE4A6E','#56A1D5','#D16BAB','#87DDE1']
};


var fuwuOption = {
    title: {
        text: '平台服务Top8城市',
        textStyle: {
        	color:'#0ED7F9',
        	fontSize:'18'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        type: 'value',
        name:'K',
        axisLine: {
            lineStyle: {
                color: '#99E1FF'
            }
        },
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        axisLine: {
            lineStyle: {
                color: '#0ED7F9'
            }
        },
        data: ['北京','上海','广州','深圳','温州','福建','哈尔滨','郑州']
    },
    series: [
        {
            name: '2012年',
            type: 'bar',
            data:(function(){
            	var data = [59325, 50438, 31000, 22194, 20411, 19807,16778,15897];
            	var len = data.length;
            	var res = [];
            	while(len--){
            		res.push(data[len]/1000) ;
            	}
            	return res;
            })()
            //data: [59325, 50438, 31000, 22194, 20411, 19807,16778,15897]
        }
    ]
};



var gongxuOption = {
    title: {
        text: '平台实时供需状态',
        textStyle: {
        	color:'#0ED7F9',
        	fontSize:'18'
        }
    },
    tooltip: {},
    legend: {
        data:['需求','运力']
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
	    {
	        data: [820, 932, 901, 934, 1290, 1330, 1320],
	        type: 'line',
	        smooth: true
	    },
	    {
	        data: [920, 632, 701, 834, 1290, 1530, 1120],
	        type: 'line',
	        smooth: true
	    }
    ]
};


// 使用刚指定的配置项和数据显示图表。
yunliChart.setOption(yunliOption);
fuwuChart.setOption(fuwuOption);
gongxuChart.setOption(gongxuOption);




 // 百度地图API功能
var map = new BMap.Map("map", {
    enableMapClick: false
});    // 创建Map实例
map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5);  // 初始化地图,设置中心点坐标和地图级别
map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

// 地图自定义样式
map.setMapStyle({
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

var data = [];

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
            time = time.toFixed(2);
            $('#time').html('时间' + time);
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