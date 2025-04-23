// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

// 接口名：数据（考题、考试、学生库、考官库）权限验证
// 参数1: type 1考题、2考试、3学生、4考官
// 参数2: password
// 参数3: passwordType 1
export function authCheck (query) {
  return httpRequest({
    url: `/exam/Auth/check`,
    method: 'get',
    params: query
  })
}

// 接口名：数据（考题、考试、学生库、考官库）权限验证
// 参数1: type 1考题、2考试、3学生、4考官
// 参数2: id
export function initializePwd (query) {
  return httpRequest({
    url: `/exam/Auth/initialize`,
    method: 'get',
    params: query
  })
}

// 接口名：调用地图
export function queryCoordinate (query) {
  return httpRequest({
    url: `/baidu/map/queryCoordinate`,
    method: 'get',
    params: query
  })
}

// 接口名：获取地图
export function queryMap (query) {
  return httpRequest({
    url: `/exam/jiashicang/queryMap`,
    method: 'get',
    params: query
  })
}

// 接口名：获取经纬度
export function latitudelongitudeList (query) {
  return httpRequest({
    url: `/exam/latitudelongitude/list`,
    method: 'get',
    params: query
  })
}
