<template>
    <div class="mapOPen">
        <div class="mapOPen-box">
            <i class="icon iconfont icon-chahao3" @click="closeMap"></i>
            <div id="openMap" ref="openMap"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
       keywords: {
           type: String,
           default: "上海市虹口区花园坊"
       } 
    },
    data () {
        return {
            aMap: {}
        }
    },
    mounted () {
        this.initMap(this.keywords);
    },
    methods: {
        closeMap () {
            this.$emit('closeMap')
        },
        initMap (keywords) {
            let _this = this;
            _this.aMap = new AMap.Map('openMap', {
            center: [116.397428, 39.90923],//中心点坐标
            zoom: 11
            });
            this.geoCode(keywords)
        },
        geoCode(keywords) {
            let _this = this;
            let geocoder = new AMap.Geocoder({
                city: "010", //城市设为北京，默认：“全国”
            });
            let marker = new AMap.Marker();
            _this.aMap.plugin('AMap.Autocomplete', function(){
                // 实例化Autocomplete
                let autoOptions = {
                    city: '全国'
                }
                let autoComplete = new AMap.Autocomplete(autoOptions);
                autoComplete.search(keywords, function(status, result) {
                    if (status === 'complete' && result.tips.length) {
                        let [lng, lat] = [result.tips[0].location.lng, result.tips[0].location.lat];
                        _this.addMarker(lng, lat)
                        _this.aMap.setZoomAndCenter(10, [lng, lat]);
                        
                    }
                })
            })
        },
        // 实例化点标记
        addMarker(g, l) {
            let marker = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [g,l],
                offset: new AMap.Pixel(-13, -30)
            });
            marker.setMap(this.aMap);
        }
    }
}
</script>
<style lang="less" scoped>
    .icon-chahao3 {
        position: absolute;
        background: #fff;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        top: -19px;
        z-index: 999;
        right: -15px;
        cursor: pointer;
    }
    .mapOPen-box {
        position: absolute;
        display: inline-block;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    #openMap {
        width: 1200px;
        height: 600px;
    }
    .mapOPen {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.6);
    }
</style>