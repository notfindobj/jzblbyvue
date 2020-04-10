<template>
    <div class="det">
        <Breadcrumb separator=">">
            <BreadcrumbItem>当前位置：</BreadcrumbItem>
            <BreadcrumbItem to="/">建筑部落</BreadcrumbItem>
            <BreadcrumbItem to="/website">{{Bread.Value}}</BreadcrumbItem>
            <BreadcrumbItem>{{detail.Title}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="det-con">
            <div class="det-con-left" >
                <h3 class="det-con-left-h3">{{detail.Title}}</h3>
                <div v-html="detail.Content"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    layout: "main",
    async asyncData({route, store}) {
        try {
            let q ={
                itemDetailId: route.params.id
            }
            const msg = await store.dispatch('getMenuDetail', q);
            let Bread = {}
            msg.BreadCrumbs.forEach(ele => {
                if(ele.Key !== route.params.id) {
                    Bread = ele
                }
            })
            return{
                detail: msg,
                Bread
            }
        } catch (error) {
            return{
                detail: ""
            }
        }
        
    },
}
</script>
<style lang="less" scoped>
/deep/table {
    width: 100%;
    border-collapse: collapse;
    tbody {
        tr{
            margin-top: -1px;
           td {
               border: 1px solid #ddd;
               padding-left: 10px;
           }
        }
        tr.firstRow {
            background: #ddd;
        }
    }
}

.det {
    width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
    &-con {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        &-left {
            background: #fff;
            width: 100%;
            padding: 15px;
            line-height: 30px;
            text-align: justify;
            font-size: 14px;
            &-h3 {
                text-align: center;
                line-height: 50px;
            }
        }
        &-right {
            width: 200px;
        }
    }
}
</style>