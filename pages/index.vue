<template>
  <div @click.capture="showLogin">
    <div :class="[!isLogin?'onlyRead':'']">
      <div class="banner-box">
        <div class="swiper-box">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(banner, index) in SlideList" :key="index">
              <a v-if="banner.ItemUrl" :href="banner.ItemUrl" target="_blank">
                <img :src="banner.CoverImgUrl" alt style="width: 100%;height: 100%;" />
              </a>
              <img v-else :src="banner.CoverImgUrl" alt style="width: 100%;height: 100%;" />
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
      </div>
      <div class="main-box">
        <div class="editor-jzbl">
          <proRele :editorName="editorName" @clickEditor="clickEditor" />
        </div>
        <div class="hot-item">
          <div class="main-conment">
            <div class="main-conment-top">
              <ul class="main-conment-sub">
                <li @click="enterBuildMore">建筑圈</li>
                <li @click="enterBuildMore">图文</li>
                <li @click="enterBuildMore">问答</li>
                <li @click="enterBuildMore">文章</li>
                <li @click="enterBuildMore">项目</li>
              </ul>
              <div class="main-conment-more" @click="enterBuildMore">
                查看更多
                <i class="iconfont icon-jiantou jiantou-clolr"></i>
              </div>
            </div>
          </div>
          <div class="hot-item-content">
            <div class="hot-item-left">
              <template v-if="hotPro">
                <hotCard
                  v-for="(items, index) in hotPro"
                  v-if="index < 4"
                  :hotCard="items"
                  :key="index"
                  @enterBuild="enterBuild"
                />
              </template>
            </div>
            <div>
              <template v-if="hotVideo">
                <hotVideo
                  v-if="hotVideo.length > 0"
                  :hotVideo="hotVideo[0]"
                  @enterVideo="enterVideo"
                />
              </template>
              <ul class="Questions" v-if="hotQue.length > 0">
                <li v-for="(item, index) in hotQue" :key="index">
                  <nuxt-link
                    target="_blank"
                    :to="{name: 'QuestionsAndAnswers', params: {id:item.ItemId}}"
                  >
                    <span v-html="item.Title"></span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 示范区景观 -->
        <div>
          <div class="main-conment">
            <div class="main-conment-top">
              <ul class="main-conment-sub">
                <li @click="viewProperties(sfq, {}, 'sfqList')">{{sfq.ItemAttributesFullName}}</li>
                <template>
                  <li
                    v-for="(item, index) in sfq.ChildNode"
                    @click="viewProperties(sfq, item, 'sfqList')"
                    :key="index"
                  >{{item.ItemAttributesFullName}}</li>
                </template>
              </ul>
              <div class="main-conment-more" @click="viewProperties(sfq, {}, 'sfqList')">
                查看更多
                <i class="iconfont icon-jiantou jiantou-clolr"></i>
              </div>
            </div>
          </div>
          <Row>
            <template v-for="(items, index) in sfqList" v-if="index < 8">
              <i-col span="6" :key="index">
                <Small-Cards @viewItem="viewItem(sfq,items, 'sfqList')" :smallCardsDate="items" />
              </i-col>
            </template>
          </Row>
        </div>
        <!-- 楼盘 -->
        <div>
          <div class="main-conment">
            <div class="main-conment-top">
              <ul class="main-conment-sub">
                <li @click="viewProperties(lps, {}, 'lpList')">{{lps.ItemAttributesFullName}}</li>
                <template>
                  <li
                    v-for="(item, index) in lps.ChildNode"
                    @click="viewProperties(lps, item, 'lpList')"
                    :key="index"
                  >{{item.ItemAttributesFullName}}</li>
                </template>
              </ul>
              <div class="main-conment-more" @click="viewProperties(lps, {}, 'lpList')">
                查看更多
                <i class="iconfont icon-jiantou jiantou-clolr"></i>
              </div>
            </div>
          </div>
          <Row>
            <template v-for="(items, index) in lpList">
              <template v-if="index === 0">
                <i-col span="12" :key="index">
                  <Big-Cards @viewItem="viewItem(lps, items, 'lpList')" :bigCardsDate="items" />
                </i-col>
              </template>
              <i-col span="6" v-if="index >0 && index<5" :key="index">
                <Small-Cards @viewItem="viewItem(lps, items, 'lpList')" :smallCardsDate="items" />
              </i-col>
            </template>
          </Row>
        </div>
        <!-- 效果图 -->
        <div>
          <div class="main-conment">
            <div class="main-conment-top">
              <ul class="main-conment-sub">
                <li @click="viewProperties(xgts, {}, 'xgtList')">{{xgts.ItemAttributesFullName}}</li>
                <template>
                  <li
                    v-for="(item, index) in xgts.ChildNode"
                    @click="viewProperties(xgts, item, 'xgtList')"
                    :key="index"
                  >{{item.ItemAttributesFullName}}</li>
                </template>
              </ul>
              <div class="main-conment-more" @click="viewProperties(xgts, {}, 'xgtList')">
                查看更多
                <i class="iconfont icon-jiantou jiantou-clolr"></i>
              </div>
            </div>
          </div>
          <Row>
            <i-col span="12">
              <div class="left-items">
                <template v-for="(items, lp) in xgtList">
                  <Small-Cards
                    v-if="lp < 2"
                    @viewItem="viewItem(xgts, items, 'xgtList')"
                    :smallCardsDate="items"
                    :key="lp"
                  />
                </template>
              </div>
              <div class="left-items">
                <template v-for="(items, lp) in xgtList">
                  <Small-Cards
                    v-if="lp > 1 && lp < 4"
                    @viewItem="viewItem(xgts, items, 'xgtList')"
                    :smallCardsDate="items"
                    :key="lp"
                  />
                </template>
              </div>
            </i-col>
            <i-col span="12" v-for="(items, lp) in xgtList" v-if="lp === 4" :key="lp">
              <Big-Cards @viewItem="viewItem(xgts, items, 'xgtList')" :bigCardsDate="items" />
            </i-col>
          </Row>
        </div>
        <!-- SU模型 -->
        <div>
          <div class="main-conment">
            <div class="main-conment-top">
              <ul class="main-conment-sub">
                <li @click="viewProperties(sus, {}, 'suList')">{{sus.ItemAttributesFullName}}</li>
                <template>
                  <li
                    v-for="(item, index) in sus.ChildNode"
                    @click="viewProperties(sus, item, 'suList')"
                    :key="index"
                  >{{item.ItemAttributesFullName}}</li>
                </template>
              </ul>
              <div class="main-conment-more" @click="viewProperties(sus, {}, 'suList')">
                查看更多
                <i class="iconfont icon-jiantou jiantou-clolr"></i>
              </div>
            </div>
          </div>
          <Row>
            <template v-for="(items, index) in suList">
              <template v-if="index === 0">
                <i-col span="12" :key="index">
                  <Big-Cards @viewItem="viewItem(sus, items, 'suList')" :bigCardsDate="items" />
                </i-col>
              </template>
              <i-col span="6" v-if="index >0 && index<5" :key="index">
                <Small-Cards @viewItem="viewItem(sus, items, 'suList')" :smallCardsDate="items" />
              </i-col>
            </template>
          </Row>
        </div>
        <!-- 总图 -->
        <div>
          <div class="main-conment">
            <div class="main-conment-top">
              <ul class="main-conment-sub">
                <li @click="viewProperties(zts, {}, 'ztList')">{{zts.ItemAttributesFullName}}</li>
                <template>
                  <li
                    v-for="(item, index) in zts.ChildNode"
                    @click="viewProperties(zts, item, 'ztList')"
                    :key="index"
                  >{{item.ItemAttributesFullName}}</li>
                </template>
              </ul>
              <div class="main-conment-more" @click="viewProperties(zts, {}, 'ztList')">
                查看更多
                <i class="iconfont icon-jiantou jiantou-clolr"></i>
              </div>
            </div>
          </div>
          <Row>
            <i-col span="12">
              <div class="left-items">
                <template v-for="(items, lp) in ztList">
                  <Small-Cards
                    v-if="lp < 2"
                    @viewItem="viewItem(zts, items, 'ztList')"
                    :smallCardsDate="items"
                    :key="lp"
                  />
                </template>
              </div>
              <div class="left-items">
                <template v-for="(items, lp) in ztList">
                  <Small-Cards
                    v-if="lp > 1 && lp < 4"
                    @viewItem="viewItem(zts, items, 'ztList')"
                    :smallCardsDate="items"
                    :key="lp"
                  />
                </template>
              </div>
            </i-col>
            <i-col span="12" v-for="(items, lp) in ztList" v-if="lp === 4" :key="lp">
              <Big-Cards @viewItem="viewItem(zts, items, 'ztList')" :bigCardsDate="items" />
            </i-col>
          </Row>
        </div>
        <!-- 平面 -->
        <div>
          <div class="main-conment">
            <div class="main-conment-top">
              <ul class="main-conment-sub">
                <li @click="viewProperties(pms, {}, 'pmList')">{{pms.ItemAttributesFullName}}</li>
                <template>
                  <li
                    v-for="(item, index) in pms.ChildNode"
                    @click="viewProperties(pms, item, 'pmList')"
                    :key="index"
                  >{{item.ItemAttributesFullName}}</li>
                </template>
              </ul>
              <div class="main-conment-more" @click="viewProperties(pms, {}, 'pmList')">
                查看更多
                <i class="iconfont icon-jiantou jiantou-clolr"></i>
              </div>
            </div>
          </div>
          <Row>
            <template v-for="(items, index) in pmList">
              <template v-if="index === 0">
                <i-col span="12" :key="index">
                  <Big-Cards @viewItem="viewItem(pms, items, 'pmList')" :bigCardsDate="items" />
                </i-col>
              </template>
              <i-col span="6" v-if="index >0 && index<5" :key="index">
                <Small-Cards @viewItem="viewItem(pms, items, 'pmList')" :smallCardsDate="items" />
              </i-col>
            </template>
          </Row>
        </div>
        <!-- 文本 -->
        <div>
          <div class="main-conment" v-if="wbList.length > 0">
            <div class="main-conment-top">
              <ul class="main-conment-sub">
                <li @click="viewProperties(webs, {}, 'wbList')">{{webs.ItemAttributesFullName}}</li>
                <template>
                  <li
                    v-for="(item, index) in webs.ChildNode"
                    @click="viewProperties(webs, item, 'wbList')"
                    :key="index"
                  >{{item.ItemAttributesFullName}}</li>
                </template>
              </ul>
              <div class="main-conment-more" @click="viewProperties(webs, {}, 'wbList')">
                查看更多
                <i class="iconfont icon-jiantou jiantou-clolr"></i>
              </div>
            </div>
          </div>
          <Row>
            <Col span="8" v-for="(item, index) in wbList" v-if="index < 3" :key="index">
              <div class="text-box">
                <div class="text-box-img" @click="viewItem(webs, item, 'wbList')">
                  <img :src="item.ItemTitleImg" alt />
                </div>
                <div class="text-box-content">
                  <div class="text-box-content-had">
                    <span class="text-box-content-had-img" @click="jumpRoute(item)">
                      <img :src="item.HeadIcon " alt />
                    </span>
                  </div>
                  <div class="text-box-content-name">{{item.NickName}}</div>
                  <div class="text-box-content-sub-cpntent">{{item.ItemName}}</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <!-- 建筑游学 -->
        <!--            <div>-->
        <!--                <div class="main-conment">-->
        <!--                    <div class="main-conment-top">-->
        <!--                        <ul class="main-conment-sub">-->
        <!--                            <li>建筑游学</li>-->
        <!--                            <li>新亚洲/</li>-->
        <!--                            <li>（新）古典/</li>-->
        <!--                            <li>现代/</li>-->
        <!--                            <li>英式/</li>-->
        <!--                            <li>地中海</li>-->
        <!--                        </ul>-->
        <!--                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--                <Row>-->
        <!--                    <i-col span="12">-->
        <!--                        <Big-Cards/>-->
        <!--                    </i-col>-->
        <!--                    <i-col span="12">-->
        <!--                        <Small-Cards/>-->
        <!--                        <Small-Cards/>-->
        <!--                        <Small-Cards/>-->
        <!--                        <Small-Cards/>-->
        <!--                    </i-col>-->
        <!--                </Row>-->
        <!--            </div>-->
        <!--            &lt;!&ndash; 优秀设计师 &ndash;&gt;-->
        <!--            <div>-->
        <!--                <div class="main-conment">-->
        <!--                    <div class="main-conment-top">-->
        <!--                        <ul class="main-conment-sub">-->
        <!--                            <li>优秀设计师</li>-->
        <!--                        </ul>-->
        <!--                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--                <Row>-->
        <!--                    <i-col span="24">-->
        <!--                        <div id="excellent">-->
        <!--                            <div v-swiper:mySwipers="excellent">-->
        <!--                                <div class="swiper-wrapper excellent">-->
        <!--                                    <div class="swiper-slide excellent-slide" v-for="(banner, index) in banners"-->
        <!--                                         :key="index">-->
        <!--                                        <div class="excellent-slide-title">-->
        <!--                                            <img src="../assets/images/smail.png" alt="">-->
        <!--                                        </div>-->
        <!--                                        <div class="excellent-slide-content">-->
        <!--                                            <div class="excellent-slide-content-name">张小杰</div>-->
        <!--                                            <div class="excellent-slide-content-subdel">一个有态度的设计师，给你精彩</div>-->
        <!--                                        </div>-->
        <!--                                    </div>-->
        <!--                                </div>-->
        <!--                                <div class="swiper-pagination swiper-pagination-bullets"></div>-->
        <!--                            </div>-->
        <!--                            <div class="swiper-button-next"></div>-->
        <!--                            <div class="swiper-button-prev"></div>-->
        <!--                        </div>-->
        <!--                    </i-col>-->
        <!--                </Row>-->
        <!--            </div>-->
        <!--            &lt;!&ndash; 优秀品牌商 &ndash;&gt;-->
        <!--            <div>-->
        <!--                <div class="main-conment">-->
        <!--                    <div class="main-conment-top">-->
        <!--                        <ul class="main-conment-sub">-->
        <!--                            <li>优秀品牌商</li>-->
        <!--                        </ul>-->
        <!--                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--                <div>-->
        <!--                    <div v-for="i in 12" :key="'2'+i " class="matrix">-->
        <!--                        <div class="matrix-img">-->
        <!--                            <img src="../assets/images/matrix.png" alt="">-->
        <!--                        </div>-->
        <!--                        <div class="matrix-text">matrix</div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import LevelMenu from "../components/home/LevelMenu";
import proRele from "../components/proRele";
import hotCard from "../components/hotCard";
import hotVideo from "../components/hotVideo";
import { setDemo } from "../LocalAPI";
import { analogJump } from "../plugins/untils/public";
import { mapGetters } from "vuex";
import { getRecommend } from "../service/clientAPI";
import Swiper from "swiper";
//   import 'swiper/dist/css/swiper.min.css'
export default {
  head: {
    title: "建筑部落",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "建筑部落（jzbl.com）汇聚地产界著名建筑、景观、室内设计服务商、建筑材料商。专业提供建筑设计、景观设计、室内设计、建筑材料、建材采购、房地产招投标服务的房地产开发设计、房地产设计网站；加快信息传播速度,降低运营成本"
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "建筑部落（jzbl.com）汇聚地产界著名建筑、景观、室内设计服务商、建筑材料商。专业提供建筑设计、景观设计、室内设计、建筑材料、建材采购、房地产招投标服务的房地产开发设计、房地产设计网站；加快信息传播速度,降低运营成本"
      }
    ]
  },
  data() {
    return {
      editorName: "tw"
    };
  },
  // props:{
  //     isLogin:this.isLogin
  // },
  computed: {
    ...mapGetters(["isLogin"])
  },
  components: {
    LevelMenu,
    proRele,
    hotCard,
    hotVideo
  },
  async asyncData({ app, store }) {
    let [getRec, menuData, homeData] = await Promise.all([
      store.dispatch("getRec", { ids: "1,2,3,4", pages: 4 }),
      store.dispatch("getMenu"),
      store.dispatch("getHomeData")
    ]);
    let hotPro = [];
    let hotVideo = [];
    let hotQue = [];
    // 热门推荐
    getRec.forEach(ele => {
      if (ele.TypeId === 1) {
        hotPro.push(ele);
      }
      if (ele.TypeId === 2) {
        hotVideo.push(ele);
      }
      if (ele.TypeId === 3) {
        hotQue.push(ele);
      }
    });
    let sfq = {};
    let lps = {};
    let xgts = {};
    let sus = {};
    let zts = {};
    let pms = {};
    let webs = {};
    menuData.RetMenuData.forEach(element => {
      if (element.ItemAttributesFullName === "示范区") {
        sfq = element;
      }
      if (element.ItemAttributesFullName === "楼盘") {
        lps = element;
      }
      if (element.ItemAttributesFullName === "效果图") {
        xgts = element;
      }
      if (element.ItemAttributesFullName === "SU模型") {
        sus = element;
      }
      if (element.ItemAttributesFullName === "总图") {
        zts = element;
      }
      if (element.ItemAttributesFullName === "平面") {
        pms = element;
      }
      if (element.ItemAttributesFullName === "文本") {
        webs = element;
      }
    });
    return {
      getRec,
      hotPro,
      hotVideo,
      hotQue,
      sfq,
      lps,
      xgts,
      sus,
      zts,
      pms,
      webs,
      menuData,
      homeData: homeData,
      SlideList: homeData.SlideList,
      sfqList: homeData.ItemList.Sfq.RecommendedItemModels || [], // 示范区
      lpList: homeData.ItemList.Lp.RecommendedItemModels || [], // 楼盘
      xgtList: homeData.ItemList.Xgt.RecommendedItemModels || [], // 效果图
      suList: homeData.ItemList.Sumx.RecommendedItemModels || [], // SU模型
      ztList: homeData.ItemList.Zt.RecommendedItemModels || [], // 总图
      pmList: homeData.ItemList.Pm.RecommendedItemModels || [], // 平面
      wbList: homeData.ItemList.Wb.RecommendedItemModels || [], // 文本
      jzList: homeData.ItemList.Jzgf.RecommendedItemModels || [], // 建筑规范
      snList: homeData.ItemList.Snal.RecommendedItemModels || [] // 室内案例
    };
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    enterBuild(row) {
      this.$router.push({
        name: "BuildingCircle-id",
        params: { id: row.ItemId }
      });
    },
    enterBuildMore() {
      this.$router.push({ name: "BuildingCircle-id" });
    },
    enterVideo(row) {
      this.$router.push({
        name: "BuildingCircle-id",
        params: { id: row.ItemId }
      });
    },
    showLogin() {
      if (!this.isLogin) {
        // alert("请登录"+!this.isLogin)
        debugger;
        let LOGGEDTome = setInterval(() => {
                if (!this.isLogin && !this.showSign) {
                    this.$store.dispatch('SETUP', true);
                    this.$store.dispatch('LOGGEDIN', 'signIn');
                } else {
                    clearInterval(LOGGEDTome)
                }
            }, 100)
        return false;
      }
    },
    initSwiper() {
      let swiper = new Swiper(".swiper-box", {
        direction: "horizontal",
        loop: true, //循环
        loopFillGroupWithBlank: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        //使用分页器
        paginationClickable: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom">${index +
              1}</span>`;
          }
        },
        autoplay: {
          disableOnInteraction: false //触碰后自动切换停止
        }
      });
    },
    clickEditor(val) {
      this.editorName = val;
    },
    async viewProperties(data, row, name) {
      // 搜索页导航数据
      let baseSearchNav = {
        key: "baseSearchNav",
        value: {
          ClassTypeArrList: [
            {
              AttrKey: data.ItemAttributesId,
              AttrValue: data.ItemSubAttributeCode
            }
          ],
          title: data.ItemAttributesFullName
        }
      };
      this.$store.dispatch("Serverstorage", baseSearchNav);
      let msgs = await setDemo("baseSearchNav", baseSearchNav);
      // 搜索页项目数据
      let baseSearchItem = {
        key: "baseSearchItem",
        value: {
          Pagination: {
            SortType: "1",
            KeyWords: "",
            Order: true,
            Page: 1,
            Rows: 32
          }
        }
      };
      this.$store.dispatch("Serverstorage", baseSearchItem);
      let msgss = await setDemo("baseSearchItem", baseSearchItem);
      let routeData = this.$router.resolve({ name: "dataBase" });
      if (this.isLogin) {
        analogJump(routeData.href);
      }
    },
    async viewItem(row, item, val) {
      // 搜索页导航数据
      let baseSearchNav = {
        key: "baseSearchNav",
        value: {
          ClassTypeArrList: [
            {
              AttrKey: row.ItemAttributesId,
              AttrValue: row.ItemSubAttributeCode
            }
          ],
          title: row.ItemAttributesFullName
        }
      };
      this.$store.dispatch("Serverstorage", baseSearchNav);
      let msgs = await setDemo("baseSearchNav", baseSearchNav);
      // 搜索页项目数据
      let baseSearchItem = {
        key: "baseSearchItem",
        value: {
          Pagination: {
            SortType: "1",
            KeyWords: "",
            Order: true,
            Page: 1,
            Rows: 32
          }
        }
      };
      this.$store.dispatch("Serverstorage", baseSearchItem);
      let msgss = await setDemo("baseSearchItem", baseSearchItem);
      let routeData = this.$router.resolve({
        name: "DataDetails",
        query: {
          id: item.ItemId,
          layout: val === "jzList" || val === "wbList" ? false : true
        }
      });
      analogJump(routeData.href);
    },
    // 路由跳转
    jumpRoute(items) {
      this.$router.push({
        name: "HeAndITribal-id",
        query: { id: items.UserId }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.onlyRead {
  pointer-events: none;
}

.Questions {
  font-size: 16px;
  line-height: 25px;
  margin-top: 10px;
  background: #fff;
  padding: 5px 10px;
  li a {
    display: inline-block;
    line-height: 25px;
    &:hover {
      color: #ff3c00;
      text-decoration: underline;
    }
  }
}
.hot-item {
  &-title {
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: #ff3c00;
  }
  &-content {
    display: flex;
    justify-content: space-between;
  }
  &-left {
    display: flex;
    width: 49%;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
.editor-jzbl {
  background: #fff;
}
/deep/.swiper-pagination {
  width: 1057px;
  bottom: 12px;
}
/deep/.swiper-pagination-bullet {
  width: 18px;
  height: 18px;
  color: #fff;
}
.left-items {
  display: flex;
  justify-content: space-around;
}

/deep/.swiper-pagination-bullet-active {
  background: #ff3c00;
}

.ivu-col-span-12 {
  text-align: center;
}

.ivu-col-span-8 {
  text-align: center;
}

.banner-box {
  position: relative;
  width: 1200px;
  margin: 0 auto;
}

.swiper-box {
  width: 1200 - 143px;
  margin: 0 143px auto;
  height: 400px;
  overflow: hidden;
}

.nav-atvite {
  background: #ff3c00;
}

.main-conment {
  margin-top: 20px;
  border-top: 1px solid #999999;
  &-top {
    display: flex;
    justify-content: space-between;
    padding: 3px 0;
  }

  &-sub {
    display: flex;
    > li {
      padding: 0 8px 0 0;
      line-height: 42px;
      color: #333333;
      cursor: pointer;
      &:first-child {
        padding-right: 10px;
        font-size: 24px;
      }
      &:not(:first-child, :last-child)::after {
        position: relative;
        content: "/";
        display: inline-block;
        left: 5px;
      }
      &:hover {
        color: #ff3c00;
      }
    }
  }

  &-more {
    line-height: 42px;
    cursor: pointer;
    &:hover {
      color: #ff3c00;
    }
  }
}

.jiantou-clolr {
  color: #ff3c00;
}

.text-box {
  width: 384px;
  display: inline-block;
  height: 394px;
  padding-top: 10px;
  border: 1px solid #ccc;

  &-img {
    height: 266px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }

  &-content {
    width: 100%;
    height: 128px;
    &-had {
      position: relative;
      height: 35px;
      &-img {
        display: inline-block;
        position: absolute;
        left: 50%;
        top: -30px;
        transform: translateX(-50%);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #ff0;
        overflow: hidden;
        cursor: pointer;
        img {
          height: 100%;
          width: 100%;
        }
      }

      // height: 60px;
    }

    &-name {
      text-align: center;
      font-size: 18px;
      color: #333333;
    }

    &-sub-cpntent {
      padding: 5px 15px;
      font-size: 14px;
      color: #666666;
      height: 45px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      line-clamp: 2;
    }
  }
  &:hover {
    box-shadow: 0 2px 15px #999999;
  }
}

.excellent-slide {
  width: 282px;
  height: 383px;
  text-align: center;

  &-title {
    width: 282px;
    height: 300px;
    display: inline-block;

    > img {
      width: 100%;
      height: 300px;
    }
  }

  &-content {
    text-align: left;
    padding: 10px 15px;
    line-height: 30px;

    &-name {
      font-size: 18px;
      color: #333333;
    }

    &-subdel {
      font-size: 14px;
      color: #666666;
    }
  }
  &:hover {
    box-shadow: 0 2px 15px #999999;
  }
}

//
#excellent .swiper-button-prev {
  top: 145px;
  background: url(../assets/images/left.png) center center no-repeat;
  background-size: 48px 141px;
}

#excellent .swiper-button-next {
  top: 145px;
  background: url(../assets/images/right.png) center center no-repeat;
  background-size: 48px 141px;
}

.matrix {
  width: 191px;
  height: 70px;
  margin-top: 10px;
  display: inline-block;
  line-height: 70px;
  text-align: center;
  font-size: 24px;
  color: #ff3c00;
  letter-spacing: 0.8px;
  margin-right: 10px;
  cursor: pointer;
  text-align: center;
  &:nth-child(6n) {
    margin-right: 0;
  }
  .matrix-img {
    width: 191px;
    height: 70px;
    display: inline-block;
    border: 1px solid transparent;

    > img {
      vertical-align: middle;
    }
  }

  .matrix-text {
    box-sizing: content-box;
    width: 100%;
    height: 100%;
    border: 1px solid #ff3c00;
    display: none;
  }

  &:hover .matrix-img {
    display: none;
  }

  &:hover .matrix-text {
    display: inline-block;
  }
}
</style>
