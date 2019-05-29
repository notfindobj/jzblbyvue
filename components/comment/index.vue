<template>
    <div>
        <div class="comment-box">
            <div class="comment-img" v-if="uPImgList.length > 0">
                <div class="comment-img-items" v-for="(items, index) in uPImgList" :key="index" :style="`height:${width}px;width:${width}px;`">
                    <img :src="items.url" alt="">
                    <i class="iconfont icon-chahao" @click="cleanImg(index)"></i>
                </div>
            </div>
            <Input v-model="commentValue" type="textarea" :rows="emotionRows" :placeholder="placeholder" />
            <div class="comment">
                <div class="comment-smile">
                    <i class="iconfont icon-smile" @click="showEmotion"></i>
                    <input type="file" ref="files" @change="fileSelected" style="display:none">
                    <i class="iconfont icon-tupian" @click="showImg"></i>
                </div>
                <div>
                    <span class="comment-btn" @click="comment">
                        {{btnText}}
                    </span>
                </div>
            </div>
        </div>
        <Emotion
            v-if="isEmotion"
            @emotion="handleEmotion"
            :height="120"
        />
    </div>
</template>
<script>
import Emotion from '../Emotion'
 import { uploadFile } from '../../service/clientAPI'
export default {
    props: {
        placeholder: {
            type: String,
            default: '来说两句吧...',
        },
        emotionRows: {
            type: Number,
            default: 4,
        },
        width: {
            type: Number,
            default: 80,
        },
        btnText: {
            type: String,
            default: '发表评论',
        }
    },
    data() {
        return {
            uPImgList: [],
            commentValue: '',
            isEmotion: false
        }
    },
    created () {
        console.log(this.placeholder)
    },
    components: {
      Emotion
    },
    methods:{
        cleanImg (i) {
            this.uPImgList.splice(i, 1);
        },
        showEmotion () {
            this.isEmotion = !this.isEmotion
        },
        comment () {
            this.$emit('commentValue', this.commentValue);
        },
        showImg () {
            this.$refs.files.click()
        },
        fileSelected(e) {
            let file = e.target.files;
            if (file) {
                let data = new FormData();
                for (let item of file) {
                    data.append('files', item)
                }
                uploadFile(data, this.uploadType).then(res => {
                    this.$emit('uploadSuccess', res);
                }).catch(err => {
                    console.log(err, 'uploadErr')
                })
            }
        },
        handleEmotion (item) {
            // 选择表情
            this.commentValue += `[${item.content}]`
        }
    }
    
}
</script>
<style lang="less" scoped>
    .comment-box {
        // padding: 10px 10px;
    }
    .comment {
        display: flex;
        padding-top: 10px;
        justify-content: space-between;
        line-height: 27px;
        &-img {
            display: flex;
            flex-wrap: wrap;
            width: calc(100%);
            &-items {
                background: #ffffff;
                margin-right: 10px;
                position: relative;
                margin-bottom: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
                .icon-chahao {
                    position: absolute;
                    cursor: pointer;
                    right: -5px;
                    top: -10px;
                    &:hover{
                        -webkit-transform:rotate(180deg) ;
                        transform: rotate(180deg);
                        transform-origin: 50% 49%;
                        transition: all 0.5s ease-in-out;
                    }
                }
            }
        }
        &-smile {
            cursor: pointer;
        }
        &-btn {
            padding: 7px 10px;
            background: #FF3C00;
            color: #ffffff;
            border-radius: 5px;
            cursor: pointer;
        }
    }
    .icon-smile {
        color: #FF3C00;
    }
    .icon-tupian {
        color: #00B358;
    }
    .textarea.ivu-input {
        background:#f2f2f2 !important;
    }
</style>
