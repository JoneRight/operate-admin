// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

// 获取签名
export function getSignProd (data) {
  return httpRequest({
    url: `/his/getSign`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 获取排台
export function fetchList (query) {
  return httpRequest({
    url: `/ss/patientoperate/getPaiTai`,
    method: 'get',
    params: query
  })
}

// 获取患者手术交接表
export function getDetail (data) {
  return httpRequest({
    url: `/ss/patientoperate/getDetail`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 获取手术间科室
export function hospitaldept (data) {
  return httpRequest({
    url: `/ss/hospitaldept/queryAll`,
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    data
  })
}

// 获取手术间号码
export function hospitalroom (data) {
  return httpRequest({
    url: `/ss/hospitalroom/queryAll`,
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    data
  })
}

// 获取患者手术交接表
export function patientoperateSaveOrUpdate (data) {
  return httpRequest({
    url: `/ss/patientoperate/saveOrUpdate`,
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    data
  })
}

// 获取患者手术交接表
export function getBs (data) {
  return httpRequest({
    url: `/ss/patientbs/getBs`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 获取手术安全核查表
export function getCheck (data) {
  return httpRequest({
    url: `/ss/patientcheckanesthesia/getCheck`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 获取CORN
export function getCorn (data) {
  return httpRequest({
    url: `/ss/patientcorn/getCorn`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 获取CORN
export function getFuLiao (data) {
  return httpRequest({
    url: `/ss/patientfuliao/getFuLiao`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 长连接数据推送
export function sseBfConnect (data) {
  return httpRequest({
    url: `/ss/sse/connect/${data}`,
    method: 'get'
  })
}
