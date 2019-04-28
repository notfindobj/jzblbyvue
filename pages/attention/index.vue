<template>
    <div class="container">
        <div class="public-block">
            <div class="block-head">
                <div class="block-head-left">
                    <div class="avatar"></div>
                    <div class="info">
                        <p class="name">杨小幂</p>
                        <p class="time">3分钟前</p>
                    </div>
                </div>
                <div class="block-head-right">
                    <Dropdown placement="bottom-end" trigger="click">
                        <a href="javascript:void(0)">
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>帮上头条</DropdownItem>
                            <DropdownItem>投诉</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div class="content">
                <p>新一季的《最强大脑》，依然汇聚了清华北大海外高校的各路牛人，高智商与高智商的碰撞，让我看得十分过瘾。在这巅峰的碰撞中，我意外捕捉到了比超越脑力还震撼的一幕。初始100强里，不是20几岁的高材生，就是10几岁的神童们，非常意外地，居然还有一个40岁的“大叔”来参赛。要知道，这场顶级脑力的比拼对中年人可一点不友好。</p>
            </div>
            <div class="block-foot"></div>
        </div>
    </div>
</template>

<script>
  export default {
    layout: 'main'
  }
</script>

<style lang="less" scoped>
.container {
    width: 1200px;
    margin: 30px auto;
    .public-block {
        width: 100%;
        background-color: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.10);
        border-radius: 2px;
        padding-top: 30px;
        .block-head {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding: 0 30px;
            .block-head-left {
                display: flex;
                .avatar {
                    width: 50px;
                    height: 50px;
                    background-color: #f5a623;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                .name {
                    margin-top: 3px;
                    font-size: 16px;
                    color: #333;
                    font-weight: 500;
                }
                .time {
                    font-size: 12px;
                    color: #666;
                }
            }
        }
        .content {
            padding: 10px 30px 20px 90px;
            p {
                font-size: 14px;
                color: #333;
            }
        }
        .block-foot {
            height: 36px;
            border-top: 1px solid #d8d8d8;
        }
    }
}
</style>
