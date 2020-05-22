<template>
    <ul class="sys">
        <li class="sys-item">
            <div class="sys-item-comment"><span>土匪与绅士:</span>不错👍</div>
            <div class="sys-item-content">
                <div class="sys-item-content-img">
                    <img src="https://www.pic1.jzbl.com/buildingcircle/13439b33-12ac-4651-9a85-86b03a473h4qw/2020-04-20/i/1587371774137983.jpg?x-oss-process=image/quality,q_90/resize,w_400" alt="">
                </div>
                <div class="sys-item-content-pro">
                    <h4>《VRay4.1极速入门教程》</h4>
                    <p>VRay4.1基础课程介绍</p>
                    <p></p>
                </div>
            </div>
        </li>
        <li class="sys-item">
            <div class="sys-item-comment"><span>土匪与绅士:</span>不错👍</div>
            <div class="sys-item-content">
                <div class="sys-item-content-img">
                    <img src="https://www.pic1.jzbl.com/buildingcircle/13439b33-12ac-4651-9a85-86b03a473h4qw/2020-04-20/i/1587371774137983.jpg?x-oss-process=image/quality,q_90/resize,w_400" alt="">
                </div>
                <div class="sys-item-content-pro">
                    <h4>《VRay4.1极速入门教程》</h4>
                    <p>VRay4.1基础课程介绍</p>
                    <p></p>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.pages {
    text-align: center;
    margin: 30px 0;
}
.sys {
    font-size: 14px;
    &-item {
        padding: 10px 0 20px;
        border-bottom: 1px dashed #ddd;
        &:last-child {
            border-bottom: none;
        }
        &-comment {
            line-height: 24px;
            margin-bottom: 10px;
            span {
                color: #3bc66f;
                margin-right: 10px;
            }
        }
        &-content {
            display: flex;
            background: #f1f1f1;
            &-img {
                width: 100px;
                height: 100px;
                margin-right: 20px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            &-pro {
                h4 {
                    line-height: 30px;
                    margin-top: 10px;
                }
                p {
                    line-height: 30px;
                    color: #999;
                }
            }
        }
    }
}

</style>