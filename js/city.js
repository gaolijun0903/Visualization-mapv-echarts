//获取城市简码
var cityshort = Utils.getQueryString('cityshort') || 'sh';
var cityInfo = {  //简码与坐标对应关系
	'bj':{lng:116.4136103013,lat:39.9110666857,name:'北京'},
	'sh':{lng:121.4803295328,lat:31.2363429624,name:'上海'},
	'gz':{lng:113.2708136740,lat:23.1351666766,name:'广州'},
	'sz':{lng:114.0661345267,lat:22.5485544122,name:'深圳'},
	'wz':{lng:120.7058617854,lat:28.0011792279,name:'温州'},
	'fj':{lng:119.3030722518,lat:26.1059198357,name:'福建'},
	'hrb':{lng:126.5424184340,lat:45.8077839548,name:'哈尔滨'},
	'zz':{lng:113.6313915479,lat:34.7533581487,name:'郑州'}
}

var citylng = cityInfo[cityshort].lng; //获取城市经度
var citylat = cityInfo[cityshort].lat; //获取城市纬度
var cityname = cityInfo[cityshort].name; //获取城市纬度
//console.log(cityshort,citylng,citylat,cityname);
//修改城市名称
$('.header-text').text(cityname+'实时数据'); 
//初始化地图及图层
var cityMaps = new CityMaps(cityshort,citylng,citylat);
cityMaps.init(function(){
	console.log('地图及所有图层初始化完成')
	$('.tab-list').removeClass('disable');//去掉切换按钮的“不可用”状态
	$('.tab-item').first().addClass('tab-item-active'); //默认第一个切换项是激活状态
});

//初始化图表数据
var cityCharts = new CityCharts(cityshort,'yunli','gongxu');
cityCharts.init();

//右上方的切换按钮点击事件
$('.tab-item').click(function(p){
	if(!cityMaps.allDataOver){return}  //是否图层全部数据加载完毕
	$(this).addClass('tab-item-active').siblings().removeClass('tab-item-active');
	var thisId = $(this)[0].id;
	if(thisId=='tab-xingyun'){ //1--星云图
		cityMaps.switchLayer('xingyun'); //切换图层
	}else if(thisId=='tab-yunli'){  //2--运力状态  
		cityMaps.switchLayer('yunli');
	}else if(thisId=='tab-gongxu'){  //3--供需热力
		cityMaps.switchLayer('gongxu');
	}else if(thisId=='tab-lujing'){ //4--路径经脉
		cityMaps.switchLayer('lujing');
	} 
})


//setInterval(setDataFn, 3000)
function setDataFn(){  //定时刷新数据
	cityMaps.updateLayerData();
	cityCharts.updateData();
}


//头部时间的动态显示
//Utils.minuteTimer($('#time-show'));
//左侧数据的动态变化效果
updateLeftDatas(cityshort);
function updateLeftDatas(cityshort){
	
	var countUpOptions = {
		useEasing: false, 
		useGrouping: true, 
		separator: ',' 
	};
	
	var countUpDomArr = $('.data-number'); //左侧六个数据的Dom容器数组
	var countUpObjArr = []; //用于存放6个countUp对象的数组
		var url = "https://10.0.11.41:9999/visual/bignum/"+ cityshort +"/"+Utils.timestamp();
		getSixNums(url,countUpDomArr, countUpOptions,countUpObjArr);
	},3000)
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
						var countUpObj = new CountUp(val.id, startArr[idx], endArr[idx], 0, 4, countUpOptions);
						if (!countUpObj.error) {
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