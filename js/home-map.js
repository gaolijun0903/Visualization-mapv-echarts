// 百度地图API功能
var map = new BMap.Map("map", {
    enableMapClick: false
});    // 创建Map实例
map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5);  // 初始化地图,设置中心点坐标和地图级别
map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
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
map.setMapStyle(MapStyle);  // 设置地图的自定义样式 

var options = {
    fillStyle: 'rgba(255, 250, 50, 0.6)',
    updateCallback: function (time) {
        time = time.toFixed(2);
        $('#time').html('时间' + time);
    },
    size: 2,
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
var data = [];
var dataSet = new mapv.DataSet(data);
var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

function setMapData(){
	var tmp = Date.parse( new Date() ).toString();
  	var timestamp = tmp.substr(0,10);
	$.get(Utils.urlDomain+'/visual/starChart/china/'+timestamp, function (rs) {
	    var _length = rs.data.length;
	    for (var i = 0; i < _length; i++) {
	        var geoCoord = rs.data[i].geometry;
	        data.push({
	            geometry: geoCoord,
	            time: Math.random() * 10
	        });
	    }
        mapvLayer.dataSet.set(data);
	});
}

	
