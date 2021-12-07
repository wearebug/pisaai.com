# 第三方接入文档

## 准备

    1、联系我们注册渠道信息
        * 申请`third_code`和`secret_key`
        * 选择付费模式，我们目前提供以下两种模式
          * 上传时扣点，根据上传次数扣点，上传失败不扣点
          * 下载时扣点，根据下载次数扣点，重复下载不扣点
        * 获取免费点数
    2、根据接口文档，接入服务

## 提示

    1、渠道信息`third_code`和`secret_key`请妥善保管
    2、所有资源，包括上传原图、修复结果图等，本站将在1小时后自动删除，如需持久化请下载至自有存储

## 接口说明

    1、code=200固定为成功，code=9000固定为失败
    2、code=9000时，如需进一步业务判断，可根据errno参数


**接口地址：http://sdkphoto.fangtangtv.com**

1、图片上传接口

* URL `/api/third/uploads`
* Method `POST`
* Header `token: 加密生成的token，加密规则见附1`
* Params

|    field   |  type  | required | commit |
| ---------- | ------ | -------- | ------ |
| third_code | string | Y | 线下申请的第三方标识third_code |
| seq        | str    | Y | 任务参数, 多值以英文逗号连接, 可选参数: repair, colour, sr, bg, scratch, defogging |
| type       | str    | N | 图像类型, 默认 people, 可选参数: people, cortoon, landscape, portrait, text |        
| file       | file   | Y | 图像文件, 可传多次 |
| rate       | int    | N | 超分倍数, 默认 0, 可选参数: 2, 4, 8 |
| rgb        | str    | N | 底色值, bg in seq 时必传, 可选参数: -1, 1, 235,51,35(红), 85,142,213(蓝), 255,255,255(白) |
| dpi        | int    | N | 分辨率, 300DPI则传300 |
| platform   | str    | Y | 平台, 可选参数: pc, h5, mp, ios, baidu, zijie, douyin, alipay |
| clientip   | str    | N | 客户端IP |
| mdf        | str    | N | 再次处理, 必传, 可传多次 |

**参数描述**
```json5
type : people(人物), cortoon(卡通), landscape(景物), portrait(遗像), text(文本)
seq  : repair(优化), colour(上色), sr(超分放大), bg(去背景), scratch(去划痕), defogging(去雾化)
rate : 0(自动超分), 2、4、8(倍)
rgb  : -1(抠图、透明), 1(渐进灰-遗照), 235,51,35(红), 85,142,213(蓝), 255,255,255(白)
```

* Response

正常时

```json5
{
    "code": 200,
    "data": {
        "mdf": [
            "1fbe935269facebfb3edf2fe7e257914"  # 文件唯一标识
        ]
    }
}
```

失败时

|   errno    | commit |
| ---------- | ------ |
| 9999    |  请求参数token不合法|
| 9101    |  剩余下载次数为0|
| 9001    |  传入参数错误|
| 9005    |  文件上传类型不支持|
| 9006    |  上传失败|
| 9009    |  图片异常，处理失败|

```json5
{
    "code": 9000,
    "errno": 9005,
    "msg": "文件上传类型不支持"
}
```

2、图片修复状态查询

* URL `/api/third/status`
* Method `POST`
* Header `token: 加密生成的token，加密规则见附1`
* Params

|   field    |  type  | required | commit |
| ---------- | ------ | -------- | ------ |
| third_code | string | Y        | 线下申请的第三方标识third_code |
| mdf        | str    | Y        | 文件唯一标识, 可传多次 |
| platform   | str    | Y        | 平台, 可选参数: pc, h5, mp, ios, baidu, zijie, douyin, alipay |

* Response

**Task Code**
```json5
    2001 -> 任务正在队列中等待处理
    2002 -> 任务处理完成
    2003 -> 图像超分中
    2004 -> 图像换底色中
    2005 -> 图像抠图中
    2006 -> 图像划痕修复中
    2007 -> 图像去雾化中
    2008 -> 图像修复中
    2009 -> 图像上色中
    2010 -> 任务失败
```

```json5
{
    "code": 200,
    "data": {
        "status": 200,
        "msg": "获取任务状态成功",
        "mdfs": [
            {
                "mdf": "9804b4cb5b4740fb26afde5f2831c0f5",  # 文件唯一标识
                "code": 1,                                  # 任务状态, 0 处理中、1 成功、2 失败
                "task": 2002,
                "state": "任务处理完成",
                "src_url": "http://sdkphoto.fangtangtv.com/api/toc/download/input/9804b4cb5b4740fb26afde5f2831.jpg",         # 原图
                "wmk_url": "http://sdkphoto.fangtangtv.com/api/toc/download/output/wmk_9804b4cb5b4740fb26afde5f2831.jpg",    # 修复水印图
                "icon_url": "http://sdkphoto.fangtangtv.com/api/toc/download/output/icon_9804b4cb5b4740fb26afde5f2831.jpg",  # 修复水印缩略图
                "res_size": "1080x1366px 146KB"
            }
        ]
    }
}
```

失败时

errno说明

|   errno    | commit |
| ---------- | ------ |
| 9002       | 图片不存在 |
| 500        | 其他错误 |

```json5
{
    "code": 9000,
    "errno": 9002,
    "msg": "图片不存在，请确认图片是否上传成功"
}
```

3、图片下载

* URL `/api/third/download`
* Method `POST`
* Header `token: 加密生成的token，加密规则见附1`
* Params

|   field    |  type  | required | commit |
| ---------- | ------ | -------- | ------ |
| third_code | string | Y | 线下申请的第三方标识third_code |
| mdf        | string | Y | 文件唯一标识 |

* Response

正常时

|   field    | commit |
| ---------- | ------ |
| url    |  图片下载地址|

```json5
{
    "code": 200,
    "data": {
        "url": "http://sdkphoto.fangtangtv.com/api/hili/download/res_red_b342067e7719213d0d06a2e835b2ae6c.jpg"
    }
}
```

失败时

errno说明

|   errno    | commit |
| ---------- | ------ |
| 9002       |  图片不存在 |
| 500        | 其他错误 |

```json5
{
    "code": 9000,
    "errno": 9002,
    "msg": "数据已失效，请重新上传"
}
```

4、剩余上传次数查询

* URL `/api/third/company/nums`
* Method `POST`
* Header `token: 加密生成的token，加密规则见附1`
* Params

|   field    |  type  | required | commit |
| ---------- | ------ | -------- | ------ |
| third_code | string | Y | 线下申请的第三方标识third_code |

* Response

正常时

|   field    | commit |
| ---------- | ------ |
| code    |  第三方标识third_code|
| nums    |  剩余上传次数|

```json5
{
    "code": 200,
    "data": {
        "code": "hili",
        "nums": 98
    }
}
```

失败时

errno说明

|   errno    | commit |
| ---------- | ------ |
| 9002       | 数据未找到 |
| 500        | 其他错误 |

```json5
{
    "code": 9000,
    "errno": 9002,
    "msg": "数据未找到"
}
```

附1、token生成规则

    1、拿到服务方提供的secret_key，再生成一个当前时间戳time
        secret_key = 'hili'
        time = '1629962357'
    2、secret_key + time,两字符串拼接，再md5，得到参数mds
        mds = hashlib.md5((secret_key + time).encode("utf8")).hexdigest()
        mds = '5484490c8e797dabe52af90ab8bd1e50'
    3、最终的token等于 mds + ',' + time
        token = '5484490c8e797dabe52af90ab8bd1e50,1629962357'

    注：生成的时间戳会在2分钟后失效，请每次请求接口都重新生成时间戳
