// 基于准备好的dom，初始化echarts实例
var yunliChart = echarts.init(document.getElementById('yunli'));
var gongxuChart = echarts.init(document.getElementById('gongxu'));

// 指定图表的配置项和数据
var yunliOption = option = {
    title: {
        text: '堆叠区域图',
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
            data : (function(){
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
            data:[120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'舒适',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'商务',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'豪华',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'其他',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320]
        }
    ],
    color:['#E1C667','#EE4A6E','#56A1D5','#D16BAB','#87DDE1']
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
//      top: '20%',
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


// 使用刚指定的配置项和数据显示图表。
yunliChart.setOption(yunliOption);
gongxuChart.setOption(gongxuOption);


setTimeout(function(){
	var option = {
		series: [
		    {
		        data: [820, 932, 901, 934, 1290, 1330, 1320,920, 632, 701, 834, 1290, 1530, 1120, 932, 901, 934, 1290, 1330, 1320,920, 632, 701, 834, 1290, 1530, 1120]
		        
		    },
		    {
		        data: [920, 632, 701, 834, 1290, 1530, 1120,820, 932, 901, 934, 1290, 1330, 1320,632, 701, 834, 1290, 1530, 1120,820, 932, 901, 934, 1290, 1330, 1320,1545]
		    }
	    ]
	}
	gongxuChart.setOption(option);
},2000)
