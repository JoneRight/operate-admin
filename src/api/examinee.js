// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

export function fetchList (query) {
  return httpRequest({
    url: `/exam/studentPool/list`,
    method: 'get',
    params: query
  })
}
export function fetchTeacherList (query) {
  return httpRequest({
    url: `/exam/teacherPool/list`,
    method: 'get',
    params: query
  })
}

export function addObj (query) {
  return httpRequest({
    url: `/exam/studentPool/save`,
    method: 'post',
    data: query
  })
}

export function updateObj (query) {
  return httpRequest({
    url: `/exam/studentPool/update`,
    method: 'post',
    data: query
  })
}

export function deleteObj (query) {
  return httpRequest({
    url: `/exam/studentPool/delete`,
    method: 'post',
    data: query
  })
}

export function importObj (query) {
  return httpRequest({
    url: `/exam/student/saveAdd`,
    method: 'post',
    data: query
  })
}

export function studentList (query) {
  return httpRequest({
    url: `/exam/student/list`,
    method: 'get',
    params: query
  })
}

// 学生库删除学生
export function deletePoolStudent (query) {
  return httpRequest({
    url: `/exam/student/deletePoolStudent`,
    method: 'post',
    data: query
  })
}

// 添加考生
export function recordsstationstudentSave (query) {
  return httpRequest({
    url: `/exam/recordsstationstudent/saveList`,
    method: 'post',
    data: query
  })
}

// 匿名添加考生
export function examRecordsSubmit (query) {
  return httpRequest({
    url: `/exam/records/submit`,
    method: 'post',
    data: query
  })
}

// A类匿名添加考生
export function examRecordsSubmitA (query) {
  return httpRequest({
    url: `/exam/records/submitA`,
    method: 'post',
    data: query
  })
}

// B类匿名添加考生
export function examRecordsSubmitB (query) {
  return httpRequest({
    url: `/exam/records/submitB`,
    method: 'post',
    data: query
  })
}

// B类根据导入的考生进行分组
export function examRecordsSubmitC (query) {
  return httpRequest({
    url: `/exam/records/submitC`,
    method: 'post',
    data: query
  })
}

// 导出考生
export function getZip (query) {
  return httpRequest({
    url: `/excel/student/getZip`,
    method: 'post',
    data: query
  })
}
