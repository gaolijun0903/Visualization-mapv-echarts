# 数据可视化大屏

### 接口描述及参数解释
ret_code : 接口的执行的状态，1000表示成功, 1001表示有异常
data : 接口的主数据
msg : 当ret_code!=1000 都应该有错误信息

城市：城市首字母(有对应表） 如：北京=bj 全国=china
时间：秒级时间戳

### 地图-中国行政区_创建订单坐标点数据 
必传参数：城市(city)、时间(timestamp) 

接口地址：http://rap2api.taobao.org/app/mock/12662/map/create_order_location?city=bj&timestamp=1525747088

## 接口地址

http://rap2api.taobao.org/app/mock/12662/map/mileage_sum?city=bj&timestamp=1525747088
http://rap2api.taobao.org/app/mock/12662/map/service_sum?city=bj&timestamp=1525747088
http://rap2api.taobao.org/app/mock/12662/map/service_count_current?city=bj&timestamp=1525747088
http://rap2api.taobao.org/app/mock/12662/map/order_count_current?city=bj&timestamp=1525747088
http://rap2api.taobao.org/app/mock/12662/map/supply_current?city=bj&timestamp=1525747088
http://rap2api.taobao.org/app/mock/12662/map/demand_current?city=bj&timestamp=1525747088
http://rap2api.taobao.org/app/mock/12662/map/supply_group?city=bj&timestamp=1525747088
http://rap2api.taobao.org/app/mock/12662/map/service_count_top?timestamp=1525747088
http://rap2api.taobao.org/app/mock/12662/map/supply_demand_group?city=bj&timestamp=1525747088


1、左侧6个数据，期望的数据格式：
	"data":{
		"before"：[1000, 1000, 1000, 1000, 1000, 1000] ,  //1分钟前数据
		"current":[1005, 1005, 1005, 1005, 1005, 1005]   //当前时间数据
	}
	// 顺序   0--创建订单量, 1--当前服务量, 2--当前里程数, 3--服务时长, 4--需求量, 5--当前运力
	
2、运力分布，
	首页的期望数据格式：(全国数据)
	"data":{
		"yida":[120, 132, 101, 134, 90, 230, 210...],   //12小时数据
    	"shushi":[120, 132, 101, 134, 90, 230, 210...],
    	"shangwu":[120, 132, 101, 134, 90, 230, 210...],
    	"haohau":[120, 132, 101, 134, 90, 230, 210...],
    	"other":[120, 132, 101, 134, 90, 230, 210...]
	}
	城市页的期望数据格式：（城市数据）
	"data":{
		"yida":[120, 132, 101, 134, 90, 230, 210...],   //12小时数据
    	"shushi":[120, 132, 101, 134, 90, 230, 210...],
    	"shangwu":[120, 132, 101, 134, 90, 230, 210...],
    	"haohau":[120, 132, 101, 134, 90, 230, 210...],
    	"other":[120, 132, 101, 134, 90, 230, 210...]
	}
	
3\平台服务Top8城市
"data":{
	name: ['郑州','哈尔滨','福建','温州','深圳','广州','上海','北京']，
	data: [11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000]，
	city: [zz, hrb, fj, 。。。。]
}

	"data": [11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000]
	//顺序--- '北京','上海','广州','深圳','温州','福建','哈尔滨','郑州'
	
4、平台实时供需状态
	"data":{
    	"demand_current":[820, 932, 901, 934, 1290, 1330...],  //12小时数据或者24小时数据
    	"supply_current":[820, 932, 901, 934, 1290, 1330...]  //12小时数据或者24小时数据
    }
    

1\星云点图
"data":[
	{
        geometry: {
            type: 'Point',
            coordinates: [116.412878, 40.075240]
        },
        count: 30
   	},
    {
        geometry: {
            type: 'Point',
            coordinates: [116.412878, 40.075240]
        },
        count: 50
   }
]

2\运力图
"data"：{
	point:[
		{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:0},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:1},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:2},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:3},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:4},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:5},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:0},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:1},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:2},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:3},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:4},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:5},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:6},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:7},
       	{geometry: {type: 'Point',coordinates: [116.412878, 40.075240]},time:8}
    ],
    line:[
    	{
	    	geometry: {
	    		type: 'LineString',
                coordinates: [
                	[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240]
                ]
            }
       	},
       	{
            geometry: {
                type: 'LineString',
                coordinates:  [
                	[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240]
                ]
            }
       	}
    ]
}

3\供需热力图
"data"：[
	{
        geometry: {
            type: 'Point',
            coordinates: [116.412878, 40.075240]
        },
        count: 30
   	},
    {
        geometry: {
            type: 'Point',
            coordinates: [116.412878, 40.075240]
        },
        count: 50
   }
]

4、路径脉络
"data"：[
    	{
            geometry: {
                type: 'LineString',
                coordinates: [
                	[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240]
                ]
            }
       	},
       	{
            geometry: {
                type: 'LineString',
                coordinates:  [
                	[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240]
                ]
            }
       	},
       	{
            geometry: {
                type: 'LineString',
                coordinates:  [
                	[116.412878, 40.075240],[116.412878, 40.075240],[116.412878, 40.075240]
                ]
            }
        }
    ]
    

#接口地址
172.17.1.58:9999/visual/
10.0.11.41:9999/visual/
