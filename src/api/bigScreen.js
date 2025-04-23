// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

export function fetchList (query) {
  return httpRequest({
    url: `/exam/records/realTimeExam`,
    method: 'get',
    loading: false,
    params: query
  })
}

// 开始考试
export function submitStart (query) {
  return httpRequest({
    url: `/exam/records/submitStart`,
    method: 'post',
    data: query
  })
}

// 抽号
export function getNumber (query) {
  return httpRequest({
    url: `/exam/records/getNumber`,
    method: 'get',
    params: query
  })
}
