<template>
    <Scroll :on-reach-bottom="handleReachBottom" class="board">
        <div v-masonry transition-duration="3s" item-selector=".item" class="masonry-container" gutter="5">
            <div v-masonry-tile class="item" :key="index" v-for="(item, index) in albumList">
                <div class="find-box">
                    <div class="find-box-tit">
                        <img v-lazy="item.PicInfos.smallImgUrl" referrer="no-referrer|origin|unsafe-url" alt="" :data-original="item.PicInfos.smallImgUrl" :style="`width: 76px;height: ${calculatedH(item.PicInfos)}`"/>
                        <div class="find-box-tit-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    </Scroll>
</template>
<script>
export default {
    props: {
        albumList: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            blocks:[
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 800
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 1200
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 1200
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
                {
                    url: "https://img.kinpan.com/Files/design/detailimages/20200506/6372438319150749783830911.png",
                    width: 753,
                    height: 420
                },
            ],
        }
    },
    mounted () {   
        if (typeof this.$redrawVueMasonry === 'function') {
            this.$redrawVueMasonry()
        }
    },
    methods: {
        calculatedH (imgInfo, w=256) {
            var file = {
                w: w,
                h: 0
            }
            file.h = parseInt(imgInfo.height * w / imgInfo.width)
            return file.h+"px"
        },
        handleReachBottom () {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.blocks.push(...this.blocks);
                    resolve();
                }, 2000);
            });
        }
    }
}
</script>
<style lang="less" scoped>
.find {
    &-box {
        cursor: pointer;
        &-tit {
            position: relative;
            overflow: hidden;
            &-footer {
                position: absolute;
                width: 73px;
                height: 17px;
                left: 0;
                bottom: 0;
                background: url(../../../assets/images/image_shadow.png) repeat-x left top;
            }
        }
    }
}
/deep/::-webkit-scrollbar {
    width: 6px;
    background-color: #fff;
}
/* 滚动槽 */
/deep/::-webkit-scrollbar-track {
    border-radius:10px;
}
 
/deep/::-webkit-scrollbar-thumb {
    background-color: #fbfbfb;
    border-radius:10px;
}
.board:hover {
    /deep/::-webkit-scrollbar-thumb {
        background-color: #333;
        border-radius:10px;
    }
}
</style>
