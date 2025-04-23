// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

export function fetchList (query) {
  return httpRequest({
    url: `/exam/station/list`,
    method: 'get',
    params: query
  })
}

export function addObj (query) {
  return httpRequest({
    url: `/exam/station/save`,
    method: 'post',
    data: query
  })
}

export function updateObj (query) {
  return httpRequest({
    url: `/exam/station/update`,
    method: 'post',
    data: query
  })
}

export function deleteObj (query) {
  return httpRequest({
    url: `/exam/station/delete`,
    method: 'post',
    data: query
  })
}
