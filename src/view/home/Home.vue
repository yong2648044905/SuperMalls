<template>
    <div class="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners" />
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control :titles="['流行', '新款', '精选']" class="tab-control" />


    </div>

</template>

<script>
import TabControl from '@/components/content/tabControl/TabControl.vue'
import NavBar from '@/components/common/navbar/NavBar.vue';


import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue';

import { getHomeMultidata, getHomeGoods } from '../../network/home'
export default {
    name: 'Home',
    components: {
        TabControl,
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,


    },

    data() {
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': { page: 0, list: [] },
                'new': { page: 0, list: [] },
                'sell': { page: 0, list: [] },
            },
        }
    },
    created() {
        this.getHomeMultidata()
        // 请求'流行', '新款', '精选'三个的数据
        // 2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')


    },
    methods: {
        // 轮播图的请求 
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
        },
        //请求商品的数据
        getHomeGoods(type) {
            // 设置第几页
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res => {
                //把数据解构然后放进准备好的数组中
                this.goods[type].list.push(...res.data.list)
                // 获取页码
                this.goods[type].page += 1;
            })
        }
    }
}

</script>

<style scoped>
.home-nav {
    background: var(--color-tint);
    color: #fff;
    font-size: 25px;
}

.tab-control {
    position: sticky;
    top: 40px;
}
</style>