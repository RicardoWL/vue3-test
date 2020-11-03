import request from '../utils/request'

function getDepartmentList(data) {
  return request.post('?service=App.Hrm.GetDepartmentUserList', data)
}

function getPendingList(data) {
  return request.post('?service=App.Hrm.GetExamineListByExaminer', data)
}

function getDepartmentRankList(data) {
  return request.post('?service=App.Hrm.GetExamineRankByDepartment', data)
}

/**
 * 获取指标类别列表
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function getIndicatorClassList(data) {
  return request.post('?service=App.Hrm.GetPerformanceClassList', data)
}

/**
 * 获取指标列表
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function getIndicatorItemList(data) {
  return request.post('?service=App.Hrm.GetPerformanceIndicatorList', data)
}

/**
 * 更新指标(新增或编辑)
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function updateIndicator(data) {
  return request.post('?service=App.Hrm.UpdatePerformanceIndicator', data)
}

/**
 * 删除指标
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function deleteIndicator(data) {
  return request.post('?service=App.Hrm.DelPerformanceIndicator', data)
}

/**
 * 获取工作类别列表
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function getWorkClassList(data) {
  return request.post('?service=App.Hrm.GetPerformanceClassList', data)
}

/**
 * 修改工作类别
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function updateWorkClass(data) {
  return request.post('?service=App.Hrm.UpdatePerformanceClass', data)
}

/**
 * 删除工作类别
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function deleteWorkClass(data) {
  return request.post('?service=App.Hrm.DelPerformanceClass', data)
}

/**
 * 获取不良事故列表
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function getAccidentList(data) {
  return request.post('?service=App.Hrm.GetPerformanceAccidentList', data)
}

/**
 * 获取不良事故详情
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function getAccidentItem(data) {
  return request.post('?service=App.Hrm.GetPerformanceAccidentDetail', data)
}

/**
 * 更新不良事故
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function updateAccident(data) {
  return request.post('?service=App.Hrm.UpdatePerformanceAccident', data)
}

/**
 * 删除不良事故
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function deleteAccident(data) {
  return request.post('?service=App.Hrm.DelPerformanceAccident', data)
}

export {
  getDepartmentList,
  getPendingList,
  getDepartmentRankList,
  getIndicatorClassList,
  getIndicatorItemList,
  updateIndicator,
  deleteIndicator,
  getWorkClassList,
  updateWorkClass,
  deleteWorkClass,
  getAccidentList,
  getAccidentItem,
  updateAccident,
  deleteAccident
}