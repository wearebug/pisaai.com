import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: 'https://payapi.fangtangtv.com/photo/login',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function fileDownload(mdf) {
  return request({
    url: `https://sdkphoto.fangtangtv.com/api/toc/download/${mdf}`,
    method: 'get',
  })
}

export function getFileStatus(params) {
  return request({
    url: 'https://sdkphoto.fangtangtv.com/api/toc/status',
    method: 'get',
    params,
  })
}

export function wechatPay(data) {
  return request({
    url: 'https://sdkphoto.fangtangtv.com/api/toc/wechatpay',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function getOrderStataus(params) {
  return request({
    url: 'https://sdkphoto.fangtangtv.com/api/toc/checkorder',
    method: 'get',
    params,
  })
}

export function wechatLogin(data) {
  return request({
    url: 'https://payapi.fangtangtv.com/photo/login/wechat',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function packagePay(data) {
  return request({
    url: 'https://payapi.fangtangtv.com/photo/order/pay2',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function packageStatus(data) {
  return request({
    url: 'https://payapi.fangtangtv.com/photo/order/info',
    method: 'post',
    data: qs.stringify(data),
  })
}
