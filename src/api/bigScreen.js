// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

// 病房大屏 数据
export function getDpBF (query) {
  return httpRequest({
    url: `/ss/patientoperate/getDpBS`,
    method: 'get',
    loading: false,
    params: query
  })
}

// 手术间大屏 数据
export function getDpSSJ (query) {
  return httpRequest({
    url: `/ss/patientoperate/getDpS`,
    method: 'get',
    loading: false,
    params: query
  })
}
