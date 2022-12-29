<template>
    <div id="detail">
        <detail-nav-bar class="detail-bar" @tabClick="tabClick" ref="nav" />
        <scroll class="content" ref="scroll" :probeType="3" @scroll="handleScrollContent">
            <detail-swiper :topImages="topImages" />
            <detail-base-info :baseInfo="baseInfo" />
            <detail-shop-info :shopInfo="shopInfo" />
            <detail-goods-info :goodsInfo="goodsInfo" @goodsInfoImgLoad="goodsInfoImgLoad" />
            <detail-goods-params :goodsParams="goodsParams" ref="goodsParams" />
            <detail-comment-info :commentInfo="commentInfo" ref="goodsComment" />
            <detail-recommend :recommendList="recommendList" ref="goodsRecommend" />
        </scroll>
        <detail-bottom-bar @addCart="addCart" />
        <back-top @click.native="backClick" v-show="isShowBackTop" />

    </div>

</template>

<script>
import BackTop from '@/components/common/backTop/BackTop.vue';


import Scroll from '@/components/common/scroll/Scroll';
import { getGoodsDetail, getGoodsRecommend, Goods, Shop } from '@/network/detail'//数据的请求

import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailGoodsParams from './childComps/DetailGoodsParams.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailRecommend from './childComps/DetailRecommend.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'



import { debounce } from '@/common/utils';//防抖
import { itemListenerMixin, backTopMixin } from '@/common/mixin';//混入


export default {
    name: 'Detail',
    components: {
        DetailBottomBar,
        DetailRecommend,
        DetailCommentInfo,
        DetailGoodsParams,
        DetailGoodsInfo,
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,

        Scroll,
        BackTop
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
        return {
            iid: null,
            topImages: [],
            baseInfo: {},
            shopInfo: {},
            goodsInfo: {},
            goodsParams: {},
            commentInfo: {},
            recommendList: [],
            themeTopYs: [0],    //记录商品,参数，评论，推荐的offsetTop
            imgItemListener: null,
            currentIndex: 0,

        }
    },
    mounted() {
        // 已经在上面进行了混入，
        // const refresh = debounce(this.$refs.scroll.refresh, 50)
        // this.imgItemListener = () => {
        //     refresh()

        // }
        // this.$bus.$on('itemImgLoad', this.imgItemListener);
    },
    destroyed() {
        // 取消详情页推荐商品事件总线的监听，与首页商品列表区分开
        this.$bus.$off('itemImgLoad', this.imgItemListener);
    },
    created() {
        // 保存存入的iid
        this.iid = this.$route.params.iid
        // 获取商品信息
        this.getGoodsDetail();
        //商品推荐数据请求
        this.getGoodsRecommend();
        // 3.给getThemeTopY赋值(防抖)
        this.getThemeTopY();
    },

    methods: {
        // 监听图片加载完毕，刷新列表高度
        goodsInfoImgLoad() {
            //在图片加载完成以后监听高度            // 需要在商品详情图片加载完成再获取各个部分的offsetTop
            // 需要在商品详情图片加载完成再获取各个部分的offsetTop  
            this.getThemeTopY()
            // 刷新
            this.refresh()

        },
        // 顶部导航的点击
        tabClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
        },
        // 3.给getThemeTopY赋值(防抖)
        getThemeTopY() {
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = [];
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.goodsParams.$el.offsetTop, this.$refs.goodsComment.$el.offsetTop, this.$refs.goodsRecommend.$el.offsetTop);
                this.themeTopYs.push(Number.MAX_VALUE);
                // console.log(this.themeTopYs);
            })

        },
        //处理滚动事件
        handleScrollContent(position) {
            // 获取到y值
            let positionY = -position.y;
            //获取到对应的长度
            let length = this.themeTopYs.length;
            //遍历出对应的index值
            for (let i = 0; i < length; i++) {
                if (this.currentIndex !== i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
                    this.currentIndex = i;  //记录滚动到某个具体的栏目参
                    this.$refs.nav.curretindex = i;// 对应的index值和组件中的一样

                }
            }
            // 混入的使用
            // 当滑动的位置大于负1000的时候就是true 显示回到顶部的组件
            this.isShowBackTop = (-position.y) > 1000
        },
        // // 回到顶部
        // backClick() {
        //     this.$refs.scroll.scrollTo(0, 0, 500)
        // },

        // 商品的请求
        getGoodsDetail() {
            getGoodsDetail(this.iid).then(res => {
                // console.log(res)
                let data = res.result;
                //请求轮播图的数据
                this.topImages = data.itemInfo.topImages;
                // 获取商品的基本信息
                this.baseInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                // 获取店铺的信息
                this.shopInfo = new Shop(data.shopInfo)
                //获取商品图片的信息
                this.goodsInfo = data.detailInfo
                //商品的详情尺码
                this.goodsParams = data.itemParams
                // 商品评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0];
                }

            })
        },
        //加入购物车 ， 截取上面的数据给vuex进行同意的管理来实现
        //监听加入购物车的点击事件
        addCart() {
            // 把需要的数据存进product 中
            const product = {};
            product.image = this.topImages[0];
            product.title = this.baseInfo.title;
            product.desc = this.baseInfo.desc;
            product.price = this.baseInfo.newPrice;
            product.iid = this.baseInfo.iid;
            product.realPrice = this.baseInfo.realPrice;
            // 通过commit来改变vuex的数组   
            //dispatch 派发事件
            this.$store.dispatch('addCart', product)
        },




        // 推荐数据的请求
        getGoodsRecommend() {
            getGoodsRecommend().then(ref => {
                this.recommendList = ref.data.list
                // console.log(this.recommendList)
            })
        }
    },
}
</script>

<style scoped>
#detail {
    height: 115vh;
    position: relative;
    background: #fff;
    z-index: 9;
}

.detail-bar {
    position: relative;
    /* z-index: 9; */
}

.content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 58px;
    /* overflow: hidden; */
    /* height: 400px; */
    /* height: calc(100% - 44px - 58px);  */
    overflow: hidden;
}
</style>