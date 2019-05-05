<template>
    <Scroll :on-reach-bottom="handleReachBottom" height="800">
        <div class="container">
            <div
                class="public-block"
                v-for="i in 5"
                :key="i"
            >
                <div class="block-head">
                    <div class="block-head-left">
                        <div class="avatar"></div>
                        <div class="info">
                            <p class="name">杨小幂</p>
                            <p class="time">3分钟前</p>
                        </div>
                    </div>
                    <div class="block-head-right">
                        <Dropdown placement="bottom-end" trigger="click">
                            <a href="javascript:void(0)">
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>帮上头条</DropdownItem>
                                <DropdownItem>投诉</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div class="content">
                    <p>
                        新一季的《最强大脑》，依然汇聚了清华北大海外高校的各路牛人，高智商与高智商的碰撞，让我看得十分过瘾。在这巅峰的碰撞中，我意外捕捉到了比超越脑力还震撼的一幕。初始100强里，不是20几岁的高材生，就是10几岁的神童们，非常意外地，居然还有一个40岁的“大叔”来参赛。要知道，这场顶级脑力的比拼对中年人可一点不友好。</p>
                    <div class="video-wrap">
                        <div class="video">
                            <video controls>
                                <source src="https://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4">
                                <source src="https://www.runoob.com/try/demo_source/movie.ogg" type="video/ogg">
                                您的浏览器不支持Video标签。
                            </video>
                        </div>
                    </div>
                </div>
                <div class="block-foot">
                    <div class="foot-child">
                        <i class="icon iconfont">&#xe696;</i>
                        <span>收藏</span>
                    </div>
                    <div class="foot-child">
                        <i class="icon iconfont">&#xe6be;</i>
                        <span>12</span>
                    </div>
                    <div class="foot-child">
                        <i class="icon iconfont">&#xe664;</i>
                        <span>评论</span>
                    </div>
                    <div class="foot-child">
                        <i class="icon iconfont">&#xe67e;</i>
                        <span>点赞</span>
                    </div>
                </div>
            </div>
        </div>
    </Scroll>

</template>

<script>
  export default {
    layout: 'main',
    methods: {
      handleReachBottom() {
        console.log(1222)
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~assets/css/ModulesStyle/index.less";
</style>
