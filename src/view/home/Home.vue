<template>
    <div class="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners" />
        <recommend-view :recommends="recommends"/>
    </div>

</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import { getHomeMultidata } from '../../network/home'
export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView

    },

    data() {
        return {
            banners: [],
            recommends: []
        }
    },
    created() {
        getHomeMultidata().then(res => {
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
        })
    }
}

</script>

<style scoped>
.home-nav {
    background: var(--color-tint);
    color: #fff;
    font-size: 25px;
}
</style>