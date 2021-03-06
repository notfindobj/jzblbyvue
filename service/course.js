import request from './index'

// 获取课程分类
export const getCourseType = async (params) => {
  return await request.get('Course/GetCourseType', params)
}
// 获取课程列表
export const getCourseList = async (params) => {
    return await request.get('Course/GetCourseList', params)
}
// 讲师入驻申请
export const LecturerApply = async (params) => {
    return await request.post('Course/LecturerApply', params)
}
// 提交课程评价
export const PublishEvaluation = async (params) => {
    return await request.post('Course/PublishEvaluation', params)
}
// 获取课程评价
export const getCourseEvaluation = async (params) => {
    return await request.post('Course/GetCourseEvaluation', params)
}
// 获取推荐
export const getHomeSelectCourse = async (params) => {
    return await request.get('CourseIndex/BySelectRecommend', params)
}
// 购买课程
export const allPayCourseOrder = async (params) => {
    return await request.post('AllPay/BoughtCourse', params)
}
// 记录学习时长
export const CourseLearn = async (params) => {
    return await request.get('CourseLearn/StartPlayLearn', params)
}
// 获取课程订单
export const getCourseOrder = async (params) => {
    return await request.get('Course/GetCourseOrder', params)
}
// 获取课程订单
export const getStudyCourseList = async (params) => {
    return await request.get('CourseLearn/GetMyLearnCourse', params)
}
// 获取课程订单
export const getMyEvaluation = async (params) => {
    return await request.get('Course/GetMyEvaluation', params)
}
// 提交课程大纲
export const addCourseOutline = async (params) => {
    return await request.post('Course/PostCourseOutline', params)
}
// 提交课程数据
export const addCourseData = async (params) => {
    return await request.post('Course/PostCourseData', params)
}
// 删除课程数据
export const delCourseData = async (params) => {
    return await request.post('Course/DeleteCourse', params)
}
// 删除课程大纲
export const delCourseOutline = async (params) => {
    return await request.post('Course/DeleteCourseOutline', params)
}