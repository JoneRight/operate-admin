
// import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

export function jiashicangQueryF (query) {
  return httpRequest({
    url: `/exam/jiashicang/queryF`,
    method: 'get',
    params: query
  })
}

// 专业
export function queryDeptPercent (query) {
  return httpRequest({
    url: `/exam/jiashicang/queryDeptPercent`,
    method: 'get',
    params: query
  })
}

// 年龄
export function queryAgePercent (query) {
  return httpRequest({
    url: `/exam/jiashicang/agePercent`,
    method: 'get',
    params: query
  })
}

// 培训基地考生占比
export function queryTrainingBase (query) {
  return httpRequest({
    url: `/exam/jiashicang/queryTrainingBase`,
    method: 'get',
    params: query
  })
}

// A类 培训基地通过率排名
export function queryTrainingBasePassPercent (query) {
  return httpRequest({
    url: `/exam/jiashicang/queryTrainingBasePassPercent`,
    method: 'get',
    params: query
  })
}

// B类 培训基地及格率排名
export function queryTrainingBasePassPercentB (query) {
  return httpRequest({
    url: `/exam/jiashicang/queryTrainingBasePassPercentB`,
    method: 'get',
    params: query
  })
}

// 🌟🌟🌟🌟🌟🌟 B类 OR A类 培训基地及格率排名 🌟🌟🌟🌟🌟🌟
export function queryTrainingBasePassPercentAorB (query) {
  return httpRequest({
    url: query.type === 'A类' ? `/exam/jiashicang/queryTrainingBasePassPercent` : `/exam/jiashicang/queryTrainingBasePassPercentB`,
    method: 'get',
    params: query
  })
}

// 考题通过率排名
export function examinationPercent (query) {
  return httpRequest({
    url: `/exam/jiashicang/examinationPercent`,
    method: 'get',
    params: query
  })
}

// A类考试通过率
export function queryRecordsPassPercent (query) {
  return httpRequest({
    url: `/exam/jiashicang/queryRecordsPassPercent`,
    method: 'get',
    params: query
  })
}

// B类考试及格率
export function queryRecordsPassPercentB (query) {
  return httpRequest({
    url: `/exam/jiashicang/queryRecordsPassPercentB`,
    method: 'get',
    params: query
  })
}

// 本次考试顶部数据
export function examResultRecordsCount (query) {
  return httpRequest({
    url: `/exam/records/examResultRecordsCount`,
    method: 'get',
    params: query
  })
}

// 本次考试考站通过率
export function stationPercent (query) {
  return httpRequest({
    url: `/exam/jiashicang/stationPercent`,
    method: 'get',
    params: query
  })
}

// 查询字段未通过人数和通过率 本次考试驾驶舱
export function unPassCountAndPercent (query) {
  return httpRequest({
    url: `/exam/jiashicang/unPassCountAndPercent`,
    method: 'get',
    params: query
  })
}
