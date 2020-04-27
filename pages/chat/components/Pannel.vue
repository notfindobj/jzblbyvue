<template>
    <ul v-if="isPannel" :class="`menuPanel menulist ${classs}`" ref="menuPanel" :style="`left: ${Client.x}px;top: ${Client.y}px;`">
       <slot></slot>
    </ul>
</template>
<script>
export default {
    props: {
        classs: {
            type: String,
            default: ""
        },
        Client: {
            type: Object,
            default: () => {}
        },
        isPannel: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        let taht = this
        document.addEventListener('click',e => {
            if(this.$refs.menuPanel && !this.$refs.menuPanel.contains(e.target)){
                this.$emit("Pannel", false)
            }
        })
    }
}
</script>
<style lang="less" scoped>
 .menulist{
        background: #fff;
        border: 1px solid #f2f2f5;
        border-bottom: none;
        border-radius: 2px;
        box-shadow: 0 2px 8px 1px rgba(0,0,0,.2);
        padding: 2px;
        li {
            font-size: 12px;
            cursor: pointer;
            line-height: 12px;
            position: relative;
            display: block;
            white-space: nowrap;
            min-width: 50px;
            padding: 14px 35px 14px 16px;
            color: #333;
            &:hover {
                background: #f2f2f5;
                color: #f5846c;
            }
        }

    }
</style>