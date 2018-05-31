
//头部时间的动态显示
Utils.minuteTimer($('#time-show'));
//左侧数据的动态变化效果
function updateLeftDatas(){
	var tmp = Date.parse( new Date() ).toString();
  	var timestamp = tmp.substr(0,10);
	var url = Utils.urlDomain+"/visual/bignum/china/"+timestamp
	var countUpOptions = {
		useEasing: false,  
		useGrouping: true, 
		separator: ',' 
	};
	
	var countUpDomArr = $('.data-number'); //左侧六个数据的Dom容器数组
	var countUpObjArr = []; //用于存放6个countUp对象的数组
	getSixNums(url,countUpDomArr, countUpOptions,countUpObjArr);
}
//左侧6个数的，请求接口
function getSixNums(url,countUpDomArr, countUpOptions,countUpObjArr){
	$.ajax({
		type:"get",
		url:url,
		async:true,
		success:function(res){
			if(res.ret_code==1000){
                $('.left-container').fadeIn(100);
				var startArr = res.data.before;
				var endArr = res.data.current;
				if(countUpObjArr.length==0){//第一次,需创建CountUp对象
					$.each(countUpDomArr,function(idx,val,arr){
						var countUpObj = new CountUp(val.id, startArr[idx], endArr[idx], 0, 60, countUpOptions);
						if (!countUpObj.error) {
                            countUpObj.start();
							countUpObjArr.push(countUpObj);
						} else {
							console.error(countUpObj.error);
						}
					})
				}else if(countUpObjArr.length==6){//后续定时更新数据
					$.each(countUpDomArr,function(idx,val,arr){
						countUpObjArr[idx].update(endArr[idx])
					})
				}else{
					console.log('创建CountUp对象异常');
				}
			}else{
				console.log(res.ret_code)
			}
		},
		error:function(err){
			console.log(err)	
		}
	});
}
var mainCharts = new mainCharts("china","yunli","gongxu","fuwu");
mainCharts.init();


var _time = 0;
function exec(){
    window.clearTimeout(_time);
    setMapData();
    updateLeftDatas();
    mainCharts.updateData();
    _time=window.setTimeout(exec,60000);
}
exec();
mainCharts.fuwuChart.on('click', function (params) {
    console.log(params.dataIndex)
    var city = JSON.parse(localStorage.getItem("city"));
    var cityshort = city[params.dataIndex];
    console.log(city)
    window.location.href = './city.html?cityshort='+cityshort;
});