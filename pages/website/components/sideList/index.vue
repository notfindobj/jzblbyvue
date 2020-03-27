<template>
    <ul class="list">
        <li>
            <span>
                <span class="roof">顶</span>
                <span class="roof-tit">列表问题？？？？？？？？？？？？</span>
            </span>
            <span class="roof-time">
                2020-3-25
            </span>
        </li>
    </ul>
</template>
<style lang="less" scoped>
    .list{
        li {
            line-height: 35px;
            border-bottom: 1px dotted #ddd;
            display: flex;
            justify-content: space-between;
            padding: 0 15px;
            .roof {
                display: inline-block;
                padding: 0 10px;
                background: #fc4d5a;
                color: #fff;
                font-size: 12px;
                margin-right: 6px;
                margin-top: 3px;
                border-radius: 2px;
                line-height: 25px;
            }
            .roof-tit {
                cursor: pointer;
                font-size: 15px;
                &:hover {
                    color: #ff3c00;
                }
            }
            .roof-time {}
        }
    }
</style>