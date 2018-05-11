# 数据可视化大屏

## api定义

### 接口描述及参数解释
ret_code : 接口的执行的状态，1000表示成功, 1001表示有异常
data : 接口的主数据
msg : 当ret_code!=1000 都应该有错误信息

城市：城市首字母(有对应表） 如：北京=bj 全国=china
时间：秒级时间戳


### 地图-中国行政区_创建订单坐标点数据 
必传参数：城市(city)、时间(timestamp) 

接口地址：http://rap2api.taobao.org/app/mock/12662/map/create_order_location?city=bj&timestamp=1525747088
返回示例：
{
    "ret_code": 1000,
    "msg": "",
    "data": [
        {
            "lat": 40.075240,
            "lng": 116.412878
        },
        {
            "lat": 40.075240,
            "lng": 116.412878
        },
        {".....":"...."}
    ]
}


### 平台当前里程数（累计）

必传参数：城市(city)、时间(timestamp) 

接口地址：http://rap2api.taobao.org/app/mock/12662/map/mileage_sum?city=bj&timestamp=1525747088

返回示例：
{
    "ret_code": 1000,
    "msg": "",
    "data":{
    	"mileage_sum":2019345
    }
}


### 平台服务时长（累计）
必传参数：城市(city)、时间(timestamp) 

接口地址：http://rap2api.taobao.org/app/mock/12662/map/service_sum?city=bj&timestamp=1525747088

返回示例：
{
    "ret_code": 1000,
    "msg": "",
    "data":{
    	"service_time_sum":879345
    }
}

### 平台当前服务量

必传参数：城市(city)、时间(timestamp) 

接口地址：http://rap2api.taobao.org/app/mock/12662/map/service_count_current?city=bj&timestamp=1525747088

返回示例：
{
    "ret_code": 1000,
    "msg": "",
    "data":{
    	"service_count_current":69345
    }
}

### 平台创建订单量（当前）

必传参数：城市(city)、时间(timestamp) 

接口地址：http://rap2api.taobao.org/app/mock/12662/map/order_count_current?city=bj&timestamp=1525747088

返回示例：
{
    "ret_code": 1000,
    "msg": "",
    "data":{
    	"order_count_current":109345
    }
}


### 平台当前运力
必传参数：城市(city)、时间(timestamp) 

接口地址：http://rap2api.taobao.org/app/mock/12662/map/supply_current?city=bj&timestamp=1525747088

返回示例：
{
    "ret_code": 1000,
    "msg": "",
    "data":{
    	"supply_current":109345
    }
}

### 平台当前需求量

必传参数：城市(city)、时间(timestamp) 

接口地址：http://rap2api.taobao.org/app/mock/12662/map/demand_current?city=bj&timestamp=1525747088

返回示例：
{
    "ret_code": 1000,
    "msg": "",
    "data":{
    	"demand_current":99345
    }
}
### 平台运力分布（按照车型分布）

必传参数：城市(city)、时间(timestamp) 

接口地址：http://rap2api.taobao.org/app/mock/12662/map/supply_group?city=bj&timestamp=1525747088

返回示例：
{
    "ret_code": 1000,
    "msg": "",
    "data":{
    	"yida":99345,
    	"shushi":99345,
    	"shangwu":99345,
    	"haohau":99345,
    	"other":99345
    }
}

### 平台服务top8城市（订单量前8的城市）

必传参数：时间(timestamp) 

接口地址：http://rap2api.taobao.org/app/mock/12662/map/service_count_top?timestamp=1525747088

返回示例：
{
    "ret_code": 1000,
    "msg": "",
    "data":{
    	"bj":11000,
    	"wz":9000,
    	"tj":7000,
    	"nj":6000,
    	"sh":5000,
    	"sy":4000,
    	"cc":3000,
    	"km":2000
    }
}

### 平台实时供需状态

必传参数：城市(city)、时间(timestamp) 

接口地址：http://rap2api.taobao.org/app/mock/12662/map/supply_demand_group?city=bj&timestamp=1525747088

返回示例：
{
    "ret_code": 1000,
    "msg": "",
    "data":{
    	"demand_current":99345,
    	"supply_current":109345
    }
}


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
	首页的期望数据格式：
	"data":	[
            {value:335, name:'易达'},
            {value:310, name:'舒适'},
            {value:234, name:'商务'},
            {value:135, name:'豪华'},
            {value:548, name:'其他'}
        ]
	城市页的期望数据格式：
	"data":{
		"yida":[120, 132, 101, 134, 90, 230, 210...],   //12小时数据或者24小时数据
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
    

5\地图数据
  	首页 ：已提供
  	城市页：4个，未提供

右侧刷新1小时
"lat": 40.075240,
            "lng": 116.412878
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
		{
            geometry: {
                type: 'Point',
                coordinates: [116.412878, 40.075240]
            }
       },
       {
            geometry: {
                type: 'Point',
                coordinates: [116.412878, 40.075240]
            }
        }
            
    ],
    
    line:[
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
    

1\四个角的去掉
2、右侧3个部分的高度做成自适应的
3、返回的图标换一下
4、左侧的6个数据也改成自适应