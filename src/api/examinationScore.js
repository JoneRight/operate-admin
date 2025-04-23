// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

// 考站维度
export function recordsExamResultStation (query) {
  return httpRequest({
    url: `/exam/records/examResultStation`,
    method: 'post',
    data: query
  })
}

// 获取考站维度的学生列表
export function examResultPageStation (query) {
  return httpRequest({
    url: `/exam/records/examResultPageStation`,
    method: 'post',
    data: query
  })
}

// 考题维度
export function recordsExamResultExam (query) {
  return httpRequest({
    url: `/exam/records/examResultExam`,
    method: 'post',
    data: query
  })
}

// 获取考站维度的学生列表
export function examResultPageExamination (query) {
  return httpRequest({
    url: `/exam/records/examResultPageExamination`,
    method: 'post',
    data: query
  })
}

// 获取考站维度的学生列表(不及格的studentType为0，区分大分项和小分项)
export function examResultPageItem (query) {
  return httpRequest({
    url: `/exam/records/examResultPageItem`,
    method: 'post',
    data: query
  })
}

// 得分项维度
export function examExaminationList (query) {
  return httpRequest({
    url: `/exam/records/examExaminationList`,
    method: 'post',
    data: query
  })
}

// 得分项维度明细
export function examResultScore (query) {
  return httpRequest({
    url: `/exam/records/examResultScore`,
    method: 'post',
    data: query
  })
}

// 考生维度
export function recordsExamResultPage (query) {
  return httpRequest({
    url: `/exam/records/examResultPage`,
    method: 'post',
    data: query
  })
}

// 获取系数
export function listByRecordsId (query) {
  return httpRequest({
    url: `/exam/recordsxishu/listByRecordsId`,
    method: 'get',
    params: query
  })
}

// 保存系数
export function recordsxishuSave (query) {
  return httpRequest({
    url: `/exam/recordsxishu/save`,
    method: 'post',
    data: query
  })
}

// 保存系数 B
export function recordsxishuSaveB (query) {
  return httpRequest({
    url: `/exam/records/update`,
    method: 'post',
    data: query
  })
}
