<template>
    <span v-html="value.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, emotion)"></span>
</template>
<script>
import {getEmotionList} from '../../plugins/untils/public'
export default {
    props: {
        value: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            list: []
        }
    },
    async mounted () {
        this.list = await getEmotionList();
    },
    methods: {
        emotion (res="") {
           try {
                let word = res.replace(/\[|\]/gi,'');
                let wordShow = true
                let wordContent = ''
                let wordContentHtml = ''
                this.list.forEach(ele => {
                if (wordShow) {
                    if (ele.content === word) {
                        wordContent = ele.title
                        wordContentHtml = `<img style="width: 25px;vertical-align: middle; " src=" http://www.pic.jzbl.com/ItemFiles/Emoticon/QQ/${wordContent}_QQ.gif">`
                        wordShow = false
                    }
                }
                })
                return wordContentHtml
           } catch (error) {
               
           }
        }
    }
}
</script>
<style>
    
</style>