<template>
    <div>
        <div>
            <Scroll :on-reach-bottom="handleReachBottom">
            <Card dis-hover v-for="(item, index) in list1" :key="index" style="margin: 32px 0">
                Content {{ item }}
            </Card>
        </Scroll>
        </div>
        <Page
            show-elevator
            show-total
            @on-change="onChange"
            @on-page-size-change="onPageSizeChange"
            :total="pageConfig.total"
            :current="pageConfig.current"
        />
    </div>
</template>
<script>
    export default {
        data () {
            return {
                list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                pageConfig: {
                    total: 100,
                    pageSize: 8,
                    current:1
                }
            }
        },
        methods: {
            handleReachBottom () {
                this.pageConfig.current++
                return new Promise(resolve => {
                    setTimeout(() => {
                        const last = this.list1[this.list1.length - 1];
                        for (let i = 1; i < 11; i++) {
                            this.list1.push(last + i);
                        }
                        resolve();
                    }, 2000);
                });
            },
            onChange (current) {
                console.log(current)
            },
            onPageSizeChange (pageSize) {
                console.log(pageSize)
            }
        }
    }
</script>
