<template>
    <div class="detail">
        <detail-nav-bar class="detail-bar" />
        <scroll class="content" ref="scroll">
            <detail-swiper :topImages="topImages" />
            <detail-base-info :baseInfo="baseInfo" />
            <detail-shop-info :shopInfo="shopInfo" />
            <detail-goods-info :goodsInfo="goodsInfo" @goodsInfoImgLoad="goodsInfoImgLoad" />
            <detail-goods-params :goodsParams="goodsParams" />
            <detail-comment-info :commentInfo="commentInfo" />
        </scroll>

    </div>

</template>

<script>
import Scroll from '@/components/common/scroll/Scroll';
import { getGoodsDetail, Goods, Shop } from '@/network/detail'

import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailGoodsParams from './childComps/DetailGoodsParams.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'




export default {
    name: 'Detail',
    components: {
        DetailCommentInfo,
        DetailGoodsParams,
        DetailGoodsInfo,
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,

        Scroll,
    },
    data() {
        return {
            iid: null,
            topImages: [],
            baseInfo: {},
            shopInfo: {},
            goodsInfo: {},
            goodsParams: {},
            commentInfo: {}
        }
    },
    created() {
        // 保存存入的iid
        this.iid = this.$route.params.iid
        // 获取商品信息
        this.getGoodsDetail()
    },
    methods: {
        getGoodsDetail() {
            getGoodsDetail(this.iid).then(res => {
                console.log(res)
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
        // 监听图片加载完毕，刷新列表高度
        goodsInfoImgLoad() {
            this.$refs.scroll.refresh()
        }
    }
}
</script>

<style scoped>
.detail {
    height: 100vh;
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