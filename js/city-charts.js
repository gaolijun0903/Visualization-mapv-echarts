// 指定图表的配置项和数据
var OrderOption = {
    title: {
        text: '订单分布',
        textStyle: {
        	color:'#0ED7F9',
        	fontSize:'16'
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
    tooltip: {
        trigger: 'axis',
        formatter:function(data){
        	var total = 0;
            data.forEach(function(item,idx){
            	total+=item.value;
            })
            var tipStr='';
            data.forEach(function(item,idx){
            	var per = ( item.value/total*100).toFixed(2)+"%";
            	tipStr += item.seriesName+': '+ per +'<br />';
            })
            return tipStr;
        }

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
        		formatter: function (value, index) {
                    return value / 1000 + "K";
                }
	        },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(80 105 120)'
                }
            }
        }
    ],
    series : [   
        {
            name:'易达',
            showSymbol:false,
            type:'line',
            stack: '总量',
            symbol :'circle',
            areaStyle: {normal: {}},
            data:[]
        },
        {
            name:'舒适',
            showSymbol:false,
            type:'line',
            stack: '总量',
            symbol :'circle',
            areaStyle: {normal: {}},
            data:[]
        },
        {
            name:'商务',
            showSymbol:false,
            type:'line',
            stack: '总量',
            symbol :'circle',
            areaStyle: {normal: {}},
            data:[]
        },
        {
            name:'豪华',
            showSymbol:false,
            type:'line',
            stack: '总量',
            symbol :'circle',
            areaStyle: {normal: {}},
            data:[]
        },
        {
            name:'其他',
            showSymbol:false,
            type:'line',
            stack: '总量',
            symbol :'circle',
            areaStyle: {normal: {}},
            data:[]
        }
    ],
    color:['#E1C667','#D16BAB','#56A1D5','#EE4A6E','#87DDE1']
};

var GongxuOption = {
    title: {
        text: '实时供需状态',
        textStyle: {
        	color:'#0ED7F9',
        	fontSize:'16'
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
    		formatter: function (value,index) {
                return value/1000+"K";
            }
        },
        splitLine: {
            show: true,
            lineStyle:{
                color:'rgba(80 105 120)'
            }
        }
    },
    series: [
	    {
    		name: '需求',
            showSymbol:false,
	        data: [],
	        type: 'line',
            symbol :'circle',
	        smooth: true,
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:3,//折线宽度
                    }
                }
            }
	    },
	    {
    		name: '运力',
            showSymbol:false,
	        data: [],
	        type: 'line',
            symbol :'circle',
	        smooth: true,
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:3,//折线宽度
                    }
                }
            }
	    }
    ],
    color:['#EE4A6E','#56A1D5']
};

//图表管理对象
function CityCharts(cityshort,dom1,dom2){//0--城市英文缩写，2--订单分布图表的Dom元素的Id，3--供需图表的Dom元素的Id，
	this.cityshort = cityshort; //城市英文缩写
	this.dom1 = document.getElementById(dom1);  //订单分布图表的Dom元素
	this.dom2 = document.getElementById(dom2);  //供需图表的Dom元素
	this.urlDomain = Utils.urlDomain+'/visual';
	this.urlQuery = '/'+this.cityshort+'/';
	this.urlApi = {//两个图表数据接口地址
		url_order : this.urlDomain+'/carDistribution'+this.urlQuery,
		url_gongxu : this.urlDomain+'/supplyDemandStatus'+this.urlQuery
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
	$.get(this.urlApi.url_order+Utils.timestamp(), function (rs) {
		if(rs.ret_code==1000){
			var data = rs.data;
			var option = {
            	xAxis:{
            		data: Utils.timeArr12()
            	},
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
	$.get(this.urlApi.url_gongxu+Utils.timestamp(), function (rs) {
		if(rs.ret_code==1000){
			var data = rs.data;
			var option = {
            	xAxis:{
            		data: Utils.timeArr12()
            	},
				series: [
				    {data: data.demand},
				    {data: data.supply}
			    ]
			}
			//设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过setOption完成，ECharts 会合并新的参数和数据，然后刷新图表
			self.charts.gongxuChart.setOption(option);
		}else{
			console.log(rs.msg)
		}
	})
};
