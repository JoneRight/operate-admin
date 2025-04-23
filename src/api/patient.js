// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

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
