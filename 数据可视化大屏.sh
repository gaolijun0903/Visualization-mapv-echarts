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

返回示例：
{
    "ret_code": 1000,
    "msg": null,
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

返回示例：
{
    "ret_code": 1000,
    "msg": null,
    "data":{
    	"mileage_sum":2019345
    }
}


### 平台服务时长（累计）
必传参数：城市(city)、时间(timestamp) 

返回示例：
{
    "ret_code": 1000,
    "msg": null,
    "data":{
    	"service_sum":879345
    }
}

### 平台当前服务量

必传参数：城市(city)、时间(timestamp) 

返回示例：
{
    "ret_code": 1000,
    "msg": null,
    "data":{
    	"service_current":69345
    }
}

### 平台创建订单量（当前）

必传参数：城市(city)、时间(timestamp) 

返回示例：
{
    "ret_code": 1000,
    "msg": null,
    "data":{
    	"order_current":109345
    }
}

### 平台当前需求量
必传参数：城市(city)、时间(timestamp) 

返回示例：
{
    "ret_code": 1000,
    "msg": null,
    "data":{
    	"supply_current":109345
    }
}

### 平台当前运力

必传参数：城市(city)、时间(timestamp) 

返回示例：
{
    "ret_code": 1000,
    "msg": null,
    "data":{
    	"demand_current":99345
    }
}
### 平台运力分布（按照车型分布）

必传参数：城市(city)、时间(timestamp) 

返回示例：
{
    "ret_code": 1000,
    "msg": null,
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

返回示例：
{
    "ret_code": 1000,
    "msg": null,
    "data":{
    	"bj":11000,
    	"":9000,
    	"":7000,
    	"":6000,
    	"":5000,
    	"":4000,
    	"":3000,
    	"":2000
    }
}

### 平台实时供需状态

必传参数：城市(city)、时间(timestamp) 

返回示例：
{
    "ret_code": 1000,
    "msg": null,
    "data":{
    	"demand_current":99345,
    	"supply_current":109345
    }
}




