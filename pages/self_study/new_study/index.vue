<template>
<div class="main-box">
    <Breadcrumb separator=">" class="box">
        <BreadcrumbItem>当前位置：</BreadcrumbItem>
        <BreadcrumbItem to="/course">我的自学</BreadcrumbItem>
        <BreadcrumbItem to="/self_study">后台管理</BreadcrumbItem>
        <BreadcrumbItem>新建课程</BreadcrumbItem>
    </Breadcrumb>
    <div class="new">
        <div class="new-from">
            <label>课程封面</label>
            <span>封面</span>
        </div>
        <div class="new-from">
            <label>课程名称</label>
            <input type="text" placeholder="课程名称">
        </div>
        <div class="new-from">
            <label>课程类型</label>
            <select name="" id="">
                <option value="">平面</option>
                <option value="">其他</option>
            </select>
        </div>
        <div class="new-from">
            <label>课程描述</label>
            <textarea type="text" placeholder="课程描述"></textarea>
        </div>
        <div class="new-from">
            <label>难易程度</label>
            <select name="" id="">
                <option value="">初级</option>
                <option value="">入门</option>
            </select>
        </div>
        <div class="new-from">
            <label>原价</label>
            <textarea type="text" placeholder="原价"></textarea>
        </div>
        <div class="new-from">
            <label>折扣价</label>
            <textarea type="text" placeholder="折扣价"></textarea>
        </div>
        <div class="new-from">
            <label>合适人群</label>
            <textarea type="text" placeholder="合适人群"></textarea>
        </div>
        <div class="new-from">
            <label>新建大纲</label>
            <input type="text" placeholder="新建大纲">
        </div>
        <div class="new-from">
            <label>课程介绍</label>
            <textarea type="text" placeholder="合适人群"></textarea>
        </div>
    </div>
</div>
</template>
<script>
export default {
    layout: "course",
}
</script>
<style lang="less" scoped>
.new {
    font-size: 14px;
    width: 1200px;
    margin: 15px auto;
    padding: 15px;
    background: #fff;
    &-from {
        display: flex;
        margin: 8px 0;
        label {
            width: 80px;
        }
        > input, textarea, select{
            font-size: 14px;
            width: 100%;
            outline: none;
            padding: 3px 10px;
            color: #333;
            border-radius: 4px;
            border: 1px solid #d4d4d4;
        }
    }
}
</style>