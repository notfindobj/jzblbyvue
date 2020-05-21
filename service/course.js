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
// 获取首页课程分类
export const getHomeCourseType = async (params) => {
    return await request.get('CourseIndex/GetIndexCourseType', params)
}
// 获取推荐
export const getHomeSelectCourse = async (params) => {
    return await request.get('CourseIndex/BySelectRecommend', params)
}
// 购买课程
export const getCourseOrder = async (params) => {
    return await request.post('AllPay/BoughtCourse', params)
}
// 记录学习时长
export const CourseLearn = async (params) => {
    return await request.get('CourseLearn/StartPlayLearn', params)
}