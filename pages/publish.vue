<template>
    <div class="page">
        <div class="container">
            <proRele :editorName="editorName" @clickEditor="clickEditor" @relSuccessfully="relSuccessfully"/>
            <!-- <div class="publish-tabs">
                <nuxt-link class="publish-tab" :to="{name: 'publish-imageText'}">发布图文</nuxt-link>
                <nuxt-link class="publish-tab" :to="{name: 'publish-project'}">发布项目</nuxt-link>
                <nuxt-link class="publish-tab" :to="{name: 'publish-video'}">发布视频</nuxt-link>
                <nuxt-link class="publish-tab" :to="{name: 'publish-questionsAndAnswers'}">发布问答</nuxt-link>
            </div> -->
            <!-- <nuxt-child/> -->
        </div>
    </div>
</template>

<script>
import proRele from "../components/proRele"
export default {
    layout: 'main',
    middleware: 'authenticated',
    data() {
      return {
          editorName: 'tw',
      }  
    },components: {
        proRele
    },
    methods: {
        clickEditor (val) {
            this.editorName = val
        },
        relSuccessfully () {

        }
    }
}
</script>

<style lang="less" scoped>
    .page {
        background-color: #F5F6F5;
        .container {
            width: 1000px;
            margin: 0 auto;
            padding-top: 30px;
            background: #fff;
            padding: 0 10px;
        }
        .publish-tabs {
            width: 100%;
            height: 58px;
            margin-bottom: 20px;
            padding: 0 30px;
            background-color: #fff;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10);
            overflow: hidden;
            .publish-tab {
                float: left;
                margin-right: 70px;
                line-height: 56px;
                color: #666;
                font-size: 16px;
            }
            .nuxt-link-exact-active {
                color: #ff3c00;
                border-bottom: 2px solid #ff3c00;
            }
        }
    }
</style>
