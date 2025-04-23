// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

export function fetchList (query) {
  return httpRequest({
    url: `/exam/examPool/list`,
    method: 'get',
    params: query
  })
}

export function addObj (query) {
  return httpRequest({
    url: `/exam/examPool/save`,
    method: 'post',
    data: query
  })
}

export function updateObj (query) {
  return httpRequest({
    url: `/exam/examPool/update`,
    method: 'post',
    data: query
  })
}

export function deleteObj (query) {
  return httpRequest({
    url: `/exam/examPool/delete`,
    method: 'post',
    data: query
  })
}

// 关联考题和考题库
export function saveExamination (query) {
  return httpRequest({
    url: `/exam/examPool/saveExamination`,
    method: 'post',
    data: query
  })
}

// 删除关联考题和考题库
export function deleteExamination (query) {
  return httpRequest({
    url: `/exam/examPool/deleteExamination`,
    method: 'post',
    data: query
  })
}

// 查询关联考题和考题库
export function examPoolList (query) {
  return httpRequest({
    url: `/exam/examPool/list`,
    method: 'get',
    params: query
  })
}

// 检查关联考题和考题库
export function examinationListCheck (query) {
  return httpRequest({
    url: `/exam/examination/listCheck`,
    method: 'get',
    params: query
  })
}

// 查看已经绑定的考题
export function examinationList (query) {
  return httpRequest({
    url: `/exam/examination/list`,
    method: 'get',
    params: query
  })
}
