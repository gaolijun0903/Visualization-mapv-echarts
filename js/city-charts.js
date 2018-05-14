// 指定图表的配置项和数据
var OrderOption = {
    title: {
        text: '城市订单分布',
        textStyle: {
        	color:'#0ED7F9',
        	fontSize:'18'
        }
    },
    legend: {
		width:185,
		x:'right',
        y:'top',
        itemWidth:14,
        itemHeight:10,
        textStyle: {
        	color:'#96DCFA',
        	fontSize:'14'
        },
        data:['易达','舒适','商务','豪华','其他']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            axisLine: {
	            lineStyle: {
	                color: 'rgba(255,255,255,0.50)'
	            }
	        },
	        axisLabel:{
        		color: '#99E1FF'
	        },
            data : Utils.timeArr12()
        }
    ],
    yAxis : [
        {
            type : 'value',
	        axisLine: {
	            lineStyle: {
	                color: 'rgba(255,255,255,0.50)'
	            }
	        },
	        axisLabel:{
        		color: '#99E1FF',
        		formatter: '{value} K'
	        }
        }
    ],
    series : [   
        {
            name:'易达',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[]
        },
        {
            name:'舒适',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[]
        },
        {
            name:'商务',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[]
        },
        {
            name:'豪华',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[]
        },
        {
            name:'其他',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[]
        }
    ],
    color:['#E1C667','#D16BAB','#56A1D5','#EE4A6E','#87DDE1']
};

var GongxuOption = {
    title: {
        text: '平台实时供需状态',
        textStyle: {
        	color:'#0ED7F9',
        	fontSize:'18'
        }
    },
    tooltip: {},
    legend: {
        width:145,
    		x:'right',
        y:'top',
        itemWidth:14,
        itemHeight:10,
        textStyle: {
        	color:'#96DCFA',
        	fontSize:'14'
        },
        data:['需求','运力']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.50)'
            }
        },
        axisLabel:{
    		color: '#99E1FF'
        },
        data: Utils.timeArr12()
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.50)'
            }
        },
        axisLabel:{
    		color: '#99E1FF',
    		formatter: '{value} K'
        }
    },
    series: [
	    {
    		name: '需求',
	        data: [],
	        type: 'line',
	        smooth: true
	    },
	    {
    		name: '运力',
	        data: [],
	        type: 'line',
	        smooth: true
	    }
    ],
    color:['#EE4A6E','#56A1D5']
};

//图表管理对象
function CityCharts(cityshort,dom1,dom2){//0--城市英文缩写，2--订单分布图表的Dom元素的Id，3--供需图表的Dom元素的Id，
	this.cityshort = cityshort; //城市英文缩写
	this.dom1 = document.getElementById(dom1);  //订单分布图表的Dom元素
	this.dom2 = document.getElementById(dom2);  //供需图表的Dom元素
	this.urlDomain = 'http://rap2api.taobao.org/app/mock/12662/map';
	this.urlQuery = '?city='+this.cityshort+'&timestamp='+new Date().getTime();
	this.urlApi = {//两个图表数据接口地址
		url_order : this.urlDomain+'/order_group'+this.urlQuery,
		url_gongxu : this.urlDomain+'/supply_demand_group'+this.urlQuery
	};
	this.charts = { //定义两个图表对象
		orderChart:'',
		gongxuChart:''
	};
	this.options = {  // 指定图表的配置项和数据
		orderOption:OrderOption,
		gongxuOption:GongxuOption
	};
}
CityCharts.prototype.init = function(){// 基于准备好的dom，初始化echarts实例
	this.charts.orderChart = echarts.init(this.dom1);
	this.charts.gongxuChart = echarts.init(this.dom2);
	this.setOption();
	this.updateData();
};
CityCharts.prototype.setOption = function(){// 使用刚指定的配置项和数据显示图表。
	this.charts.orderChart.setOption(this.options.orderOption);
	this.charts.gongxuChart.setOption(this.options.gongxuOption);
};
CityCharts.prototype.updateData = function(){//更新数据
	this.updateOrder();
	this.updateGongxu();
};
CityCharts.prototype.updateOrder = function(){//订单分布获取数据接口
	var self = this;
	$.get(this.urlApi.url_order, function (rs) {
		if(rs.ret_code==1000){
			var data = rs.data;
			var option = {
				series: [
				    {data: data.yida},
			        {data: data.shushi},
			        {data: data.shangwu},
			        {data: data.haohua},
			        {data: data.other}
			    ]
			}
			//设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过setOption完成，ECharts 会合并新的参数和数据，然后刷新图表
			self.charts.orderChart.setOption(option);
		}else{
			console.log(rs.msg)
		}
	})
};
CityCharts.prototype.updateGongxu = function(){//实时供需获取数据接口
	var self = this;
	$.get(this.urlApi.url_gongxu, function (rs) {
		if(rs.ret_code==1000){
			var data = rs.data;
			var option = {
				series: [
				    {data: data.demand_current},
				    {data: data.supply_current}
			    ]
			}
			//设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过setOption完成，ECharts 会合并新的参数和数据，然后刷新图表
			self.charts.gongxuChart.setOption(option);
		}else{
			console.log(rs.msg)
		}
	})
};
