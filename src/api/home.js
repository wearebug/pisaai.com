import request from '@/utils/request'
import qs from 'qs'

//测试线
// let urlCN = 'https://test-sdkphoto.fangtangtv.com/'
// let urlPay = 'http://test-mp-ser.hiliad.com/'

//正式线
let urlCN = 'https://sdkphoto.fangtangtv.com/'
let urlPay = 'https://payapi.fangtangtv.com/'

export function login(data) {
  return request({
    url: urlPay + 'photo/login',
    method: 'post',
    data: qs.stringify(data),
  })
}

// 获取上传记录
export function getTaskList(data) {
  return request({
    url: urlCN + 'api/getTaskList',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function fileDownload(mdf) {
  return request({
    url: urlCN + `api/toc/download/${mdf}`,
    method: 'get',
  })
}

export function getFileStatus(params) {
  return request({
    url: urlCN + 'api/toc/status',
    method: 'get',
    params,
  })
}

export function wechatPay(data) {
  return request({
    url: urlCN + 'api/toc/wechatpay',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function getOrderStataus(params) {
  return request({
    url: urlCN + 'api/toc/checkorder',
    method: 'get',
    params,
  })
}

export function wechatLogin(data) {
  return request({
    url: urlPay + 'photo/login/wechat',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function packagePay(data) {
  return request({
    url: urlPay + 'photo/order/pay2',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function packageStatus(data) {
  return request({
    url: urlPay + 'photo/order/info',
    method: 'post',
    data: qs.stringify(data),
  })
}

// 查询登陆用户的剩余点数
export function photoUserfinace(data) {
  return request({
    url: urlPay + 'photo/userfinace',
    method: 'post',
    data: qs.stringify(data),
  })
}

// 扣除点数
export function photoPhotopay(data) {
  return request({
    url: urlPay + 'photo/photopay',
    method: 'post',
    data: qs.stringify(data),
  })
}

// 图片下载
export function tocDownload(data) {
  return request({
    url: urlCN + 'api/toc/download/v2/' + data,
    method: 'get',
  })
}

// 登陆状态获取
export function loginGetStatus(data) {
  return request({
    url: urlPay + 'photo/login/getStatus',
    method: 'post',
    data: qs.stringify(data),
  })
}

// 传递标识
export function chaundibs(data) {
  return request({
    url: data,
    method: 'get',
  })
}
