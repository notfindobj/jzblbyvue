<template>
    <div>
        <div class="cards">
            <div class="cards-top">
                <img src="http://iph.href.lu/283x194?text=[自定义文字]" alt="">
                <div class="cards-eye">
                    <div>
                        <i class="iconfont icon-shangchuan"></i>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            nam: 2.222
        }
    },
}
</script>
<style lang="scss">
    .cards {
        position: relative;
        &-top {
            position: relative;
            height: 194px;
            display: inline-block;
        }
        &-eye {
            position: absolute;
            bottom: 3px;
            left: 6px;
        }
    }
</style>
