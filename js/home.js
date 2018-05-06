
//头部时间的动态显示
minuteTimer($('#time-show'));


//左侧数据的动态变化效果
updateLeftDatas();
function updateLeftDatas(){
	var countUpOptions = {
		useEasing: false, 
		useGrouping: true, 
		separator: ',', 
		decimal: '.', 
	};
	var startArr =[1000, 1000, 1000, 1000, 1000, 1000] ;  //虚拟数据
	var endArr =[1055, 1055, 1055, 1055, 1055, 1055] ;  //虚拟数据
	//  0--创建订单量, 1--当前服务量, 2--当前里程数, 3--服务时长, 4--需求量, 5--当前运力
	var countUpIdArr = ['create-order','current-service','current-mileage','service-duration','quantity-demand','current-transport']
	
	for(var i=0; i<countUpIdArr.length; i++){
		var item = endArr[i];
		var demoName = new CountUp(countUpIdArr[i], startArr[i], endArr[i], 0, 60, countUpOptions);
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


