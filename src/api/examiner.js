// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

export function fetchList (query) {
  return httpRequest({
    url: `/exam/teacherPool/list`,
    method: 'get',
    params: query
  })
}

export function addObj (query) {
  return httpRequest({
    url: `/exam/teacherPool/save`,
    method: 'post',
    data: query
  })
}

export function updateObj (query) {
  return httpRequest({
    url: `/exam/teacherPool/update`,
    method: 'post',
    data: query
  })
}

export function deleteObj (query) {
  return httpRequest({
    url: `/exam/teacherPool/delete`,
    method: 'post',
    data: query
  })
}

export function importObj (query) {
  return httpRequest({
    url: `/exam/teacher/saveAdd`,
    method: 'post',
    data: query
  })
}

export function studentList (query) {
  return httpRequest({
    url: `/exam/teacher/list`,
    method: 'get',
    params: query
  })
}

// 学生库删除学生
export function deletePoolStudent (query) {
  return httpRequest({
    url: `/exam/teacher/deleteTeacherPool`,
    method: 'post',
    data: query
  })
}
