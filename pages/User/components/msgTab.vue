<template>
    <ul class="msgTab">
        <template v-for="(item, index) in TabList">
            <li :key="index">
                <nuxt-link :to="item.path">{{item.label}}</nuxt-link>
            </li>
        </template>
    </ul>
</template>
<script>
export default {
    props: {
        TabList: {
            type: Array,
            default: function () {
                return []
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .msgTab {
        display: flex;
        border-bottom: 1px solid #dddddd;
        li {
            display: flex;
            a {
                padding: 10px;
                position: relative;
            }
            .nuxt-link-active {
                color: #ff3c00;
                &::before {
                    position: absolute;
                    content: '';
                    width: 100%;
                    height: 3px;
                    background: #ff3c00;
                    bottom: -1px;
                    left: 0;
                }
            }
        }
    }
</style>