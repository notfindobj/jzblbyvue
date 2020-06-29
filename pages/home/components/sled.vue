<!--  -->
<template>
    <div class='sled'>
      <div class="sled-top" @click="scrollToTop">
          <i class="icon iconfont icon-jiantoushang"></i>
      </div>
      <div class="sled-create">
          <i class="icon iconfont icon-jia"></i>
          <ul>
              <li>创建采集</li>
              <li>创建画板</li>
          </ul>
      </div>
    </div>
</template>

<script>
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        return {

        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        scrollToTop() {
            (function smoothscroll(){
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo (0,currentScroll - (currentScroll/5));
                }
            })();
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.sled {
    position: fixed;
    right: 50px;
    bottom: 200px;
    > div {
        cursor: pointer;
        width: 35px;
        height: 35px;
        background-color: rgba(0,0,0,.6);
        color: #fff;
        text-align: center;
        line-height: 35px;
        border-radius: 3px;
        i {
            font-size: 22px;
        }
    }
    &-top {

    }
    &-create {
        margin-top: 10px;
        position: relative;
    }
}
</style>