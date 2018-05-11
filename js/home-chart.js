

// 基于准备好的dom，初始化echarts实例
var yunliChart = echarts.init(document.getElementById('yunli'));
var fuwuChart = echarts.init(document.getElementById('fuwu'));
var gongxuChart = echarts.init(document.getElementById('gongxu'));

// 指定图表的配置项和数据
var yunliOption = {
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
    grid: {
        left: '3%',
        right: '4%',
        top: '15%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        //name:'K',
        axisLine: {//坐标轴轴线相关设置。
            lineStyle: {
                color: 'rgba(255,255,255,0.50)'
            }
        },
        axisLabel:{//坐标轴刻度标签的相关设置。
        		color: '#99E1FF',
        		formatter: '{value} K'
        },
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.50)'
            }
        },
        axisLabel:{
        		color: '#99E1FF'
        },
        data: ['郑州','哈尔滨','福建','温州','深圳','广州','上海','北京']
    },
    series: [
        {
            name: '服务',
            type: 'bar',
            barWidth: '50%',
            itemStyle:{//柱条颜色
            		color:'#56A1D5'
            },
            data: [11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000]
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
        data: (function(){
        		var res = [];
        		var d = new Date().getHours();
        		console.log(d);
        		for (var i=d; i<24; i++){
        			res.push(i);
        		}
        		for(var i=0; i<d; i++){
        			res.push(i);
        		}
        		return res;
        })()
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
	        data: [820, 932, 901, 934, 1290, 1330, 1320,920, 632, 701, 834, 1290, 1530, 1120, 932, 901, 934, 1290, 1330, 1320,920, 632, 701, 834, 1290, 1530, 1120],
	        type: 'line',
	        smooth: true
	    },
	    {
	    		name: '运力',
	        data: [920, 632, 701, 834, 1290, 1530, 1120,820, 932, 901, 934, 1290, 1330, 1320,632, 701, 834, 1290, 1530, 1120,820, 932, 901, 934, 1290, 1330, 1320,1545],
	        type: 'line',
	        smooth: true
	    }
    ],
    color:['#EE4A6E','#56A1D5']
};


// 使用刚指定的配置项和数据显示图表。
yunliChart.setOption(yunliOption);
fuwuChart.setOption(fuwuOption);
gongxuChart.setOption(gongxuOption);

var cityRankArr = [
	{id:8,name:'郑州',short:'zz',lng:113.6313915479,lat:34.7533581487},
	{id:7,name:'哈尔滨',short:'heb',lng:126.5424184340,lat:45.8077839548},
	{id:6,name:'福建',short:'fj',lng:119.3030722518,lat:26.1059198357},
	{id:5,name:'温州',short:'wz',lng:120.7058617854,lat:28.0011792279},
	{id:4,name:'深圳',short:'sz',lng:114.0661345267,lat:22.5485544122},
	{id:3,name:'广州',short:'gz',lng:113.2708136740,lat:23.1351666766},
	{id:2,name:'上海',short:'sh',lng:121.4803295328,lat:31.2363429624},
	{id:1,name:'北京',short:'bj',lng:116.4136103013,lat:39.9110666857}
]
fuwuChart.on('click', function (params) {
	console.log(params.dataIndex)
	var cityshort = cityRankArr[params.dataIndex]['short'] ;
	window.location.href = './city.html?cityshort='+cityshort;
});


