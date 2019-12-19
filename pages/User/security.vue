<template>
    <div>
        <Title title="账户安全"/>
       <ul class="security">
           <li>
                <div class="security-txt">
                    <span class="security-txt-title">账户安全:</span>
                    <span>建议您经常修改密码，以保障账号安全</span>
                </div>
                <Button >立即修改</Button>
            </li>
            <li>
                <div class="security-txt">
                    <span class="security-txt-title">手机号码:</span>
                    <span>17601211250</span>
                </div>
                <Button >添加地址</Button>
            </li>
            <li>
                <div class="security-txt">
                    <span class="security-txt-title">微信:</span>
                    <span> 绑定后，可使用微信快捷登录直接登录建筑部落</span>
                </div>
                <Button >绑定</Button>
            </li>
            <li>
                <div class="security-txt">
                    <span class="security-txt-title">QQ:</span>
                    <span> 绑定后，可使用QQ快捷登录直接登录建筑部落</span>
                </div>
                <Button >绑定</Button>
            </li>
            <li>
                <div class="security-txt">
                    <span class="security-txt-title">账户注销:</span>
                    <span>账户注销后，您相关的数据将全部被清除，请谨慎操作！</span>
                </div>
                <Button >注销</Button>
            </li>
       </ul>
    </div>
</template>
<script>
import Title from './components/title'
export default {
    components: {
        Title,
    },
    data () {
        return {}
    }
}
</script>
<style lang="less" scoped>
    .security {
        li {
            border-bottom: 1px solid #eaeaea;
            display: flex;
            justify-content: space-between;
            margin: 10px;
            padding-bottom: 10px;
            .security-txt {
                line-height: 30px;
                &-title {
                    display: inline-block;
                    width: 65px;
                    text-align: left;
                }
            }
        }
    }
</style>