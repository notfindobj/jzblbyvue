<template>
    <div class="sys">
        <h2 class="sys-tit">{{content.MsgTitle || "系统消息"}} <span class="">{{content.CreateDate}}</span> </h2>
        <div class="sys-com">
            {{content.MsgContext}}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        content: {
            type: Object,
            default: () => {}   
        }
    },
}
</script>
<style lang="less" scoped>
.sys{
    margin-top: 10px;
    padding: 10px;
    border-bottom: 1px #ddd;
    border-bottom-style: dashed;
    cursor: pointer;
    &-tit {
        span {
            font-size: 14px;
            font-weight: normal;
            color: #aaa;
            padding-left: 20px;
        }
    }
    &-com {
        
    }
}
</style>