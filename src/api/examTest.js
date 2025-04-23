// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

export function fetchList (query) {
  return httpRequest({
    url: `/exam/records/listTabulation`,
    method: 'get',
    params: query
  })
}

export function saveRecordsFirst (query) {
  return httpRequest({
    url: `/exam/records/saveRecordsAndDate`,
    method: 'post',
    data: query
  })
}

export function updateRecordsFirst (query) {
  return httpRequest({
    url: `/exam/records/updateRecordsAndDate`,
    method: 'post',
    data: query
  })
}

export function recordsDetail (query) {
  return httpRequest({
    url: `/exam/records/listAll`,
    method: 'get',
    params: query
  })
}

export function recordsDelete (query) {
  return httpRequest({
    url: `/exam/records/delete`,
    method: 'post',
    data: query
  })
}

// 删除预计考试时间
export function recordsDateDelete (query) {
  return httpRequest({
    url: `/exam/recordsDate/delete`,
    method: 'post',
    data: query
  })
}

// 删除 考站 考官 试题
export function recordsstationDelete (query) {
  return httpRequest({
    url: `/exam/recordsstation/delete`,
    method: 'post',
    data: query
  })
}

// 第二步保存
export function saveStationAndTeacher (query) {
  return httpRequest({
    url: `/exam/recordsstation/saveStationAndTeacher`,
    method: 'post',
    data: query
  })
}

//  A类考试查看
export function listByDateId (query) {
  return httpRequest({
    url: `/exam/recordsstationstudent/listByDateId`,
    method: 'get',
    params: query
  })
}

// 第二步详情
export function recordsstationList (query) {
  return httpRequest({
    url: `/exam/recordsstation/listAll`,
    method: 'get',
    params: query
  })
}

// 删除第二步时间范围的数据

// 第二步详情
export function deleteByRecordsDateId (query) {
  return httpRequest({
    url: `/exam/recordsstation/deleteByRecordsDateId`,
    method: 'get',
    params: query
  })
}

// 考生随机分组
export function studentRandomization (query) {
  return httpRequest({
    url: `/exam/recordsstationstudent/randomization`,
    method: 'post',
    data: query
  })
}
// 考生随机分组 新的 2024年10月9日17:16:11
export function studentRandomizationB (query) {
  return httpRequest({
    url: `/exam/recordsstationstudent/randomizationB`,
    method: 'post',
    data: query
  })
}

// 第三步保存
export function recordsstationstudentSaveList (query) {
  return httpRequest({
    url: `/exam/recordsstationstudent/saveList`,
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

// 查看添加的考生列表
export function recordsstationstudentList (query) {
  return httpRequest({
    url: `/exam/recordsstationstudent/list`,
    method: 'get',
    params: query
  })
}

// 查看添加的考生列表  树状结构
export function recordsstationstudentTreeList (query) {
  return httpRequest({
    url: `/exam/recordsstationstudent/treeList`,
    method: 'get',
    params: query
  })
}

// 新增习题题干及详情 全部
export function examinationSaveAll (query) {
  return httpRequest({
    url: `/exam/examination/saveAll`,
    method: 'post',
    data: query
  })
}

// 新增习题题干及详情 全部
export function examinationUpdateAll (query) {
  return httpRequest({
    url: `/exam/examination/updateAll`,
    method: 'post',
    data: query
  })
}

// 查看习题题干及详情 全部
export function examinationQueryDetails (query) {
  return httpRequest({
    url: `/exam/examination/queryDetails`,
    method: 'post',
    data: query
  })
}

// 校验 考站
export function checkStation (query) {
  return httpRequest({
    url: `/exam/recordsstation/checkStation`,
    method: 'post',
    data: query
  })
}

//  验证是否有学生
export function checkStudent (query) {
  return httpRequest({
    url: `/excel/student/checkStudent`,
    method: 'post',
    params: query
  })
}
// 导出考生排序
export function recordsOrder (query) {
  return httpRequest({
    url: `/excel/student/recordsOrder`,
    method: 'post',
    data: query
  })
}

// 获取考试二维码
export function getQrCode (query) {
  return httpRequest({
    url: `/tool/upload/getQrCode`,
    method: 'get',
    params: query
  })
}

// 查看需要审核修改成绩列表
export function recordsstudentexamination (query) {
  return httpRequest({
    url: `/exam/recordsstudentexamination/list`,
    method: 'get',
    params: query
  })
}

// 修改状态
export function recordsstudentexaminationPermission (query) {
  return httpRequest({
    url: `/exam/recordsstudentexamination/permission`,
    method: 'post',
    data: query
  })
}

// 修改状态
export function examResultPageDate (query) {
  return httpRequest({
    url: `/exam/records/examResultPageDate`,
    method: 'get',
    params: query
  })
}

// 查看修改记录列表
export function recordsstudentexaminationpermission (query) {
  return httpRequest({
    url: `/exam/recordsstudentexaminationpermission/list`,
    method: 'get',
    params: query
  })
}

// 查看修改记录详情 （id）
export function recordsstudentexaminationpermissionListDetails (query) {
  return httpRequest({
    url: `/exam/recordsstudentexaminationpermission/listDetails`,
    method: 'get',
    params: query
  })
}
