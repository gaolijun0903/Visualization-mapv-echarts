//图表管理对象
var CityCharts = {
	charts:{
		orderChart:'',
		gongxuChart:''
	},
	cityshort:'bj',
	urlDomain:'http://rap2api.taobao.org/app/mock/12662/map',
	urlQuery:'?city='+this.cityshort+'&timestamp='+new Date().getTime(),
	urlApi:{
		url_order : this.urlDomain+'/order_group'+this.urlQuery,
		url_gognxu : this.urlDomain+'/supply_demand_group'+this.urlQuery
	},
	init:function(cityshort,dom1,dom2){
		this.cityshort = cityshort;
		// 基于准备好的dom，初始化echarts实例
		this.charts.orderChart = echarts.init(dom1);
		this.charts.gongxuChart = echarts.init(dom2);

	},
	
}
