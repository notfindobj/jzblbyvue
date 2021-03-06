import request from '~/service'
export const serverCourse = {
    // 获取讲师详情
    async getLecturerDetail({ commit, state }, params) {
      return await request.get('Course/GetLecturerDetail', params)
    },
    // 获取课程大纲
    async getCourseOutline({ commit, state }, params) {
      return await request.get('Course/GetCourseOutline', params)
    },
    // 获取课程详情
    async getCourseDetail({ commit, state }, params) {
      return await request.get('Course/GetCourseDetail', params)
    },
    // 获取课程评价
    async getCourseEvaluation({ commit, state }, params) {
      return await request.get('Course/GetCourseEvaluation', params)
    },
    // 获取课程评价
    async getSlid({ commit, state }, params) {
      return await request.get('CourseIndex/SlideShow', params)
    },
    // 获取首页课程分类
    async getHomeCourseType({ commit, state }, params) {
      return await request.get('CourseIndex/GetIndexCourseType', params)
    },
    // 获取推荐讲师列表
    async GetLecturerList({ commit, state }, params) {
      return await request.get('CourseIndex/GetLecturerList', params)
    },
    // 获取采集列表
    async getPicturelist({ commit, state }, params) {
      return await request.post('Picture/GetPicturelist', params)
    },
    // 获取取图板列表
    async getAlbumList({ commit, state }, params) {
      return await request.post('Picture/GetAlbumList', params)
    }
}
