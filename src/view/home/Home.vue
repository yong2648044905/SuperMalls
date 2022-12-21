<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick" ref="tabcontrol1"
            v-show="istabFixed" />
        <scroll :probeType="3" class="content" ref="scroll" @scroll="scrhandleScrollContentoll" :pullUpLoad="true"
            @loadMore="loadMoreGoods">
            <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
            <recommend-view :recommends="recommends" />
            <feature-view />
            <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabcontrol1" />
            <goods :goods="goods[currentType].list" />
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop" />
    </div>

</template>

<script>
import { debounce } from '@/common/utils'
import BackTop from '@/components/common/backTop/BackTop.vue';
import Scroll from '@/components/common/scroll/Scroll.vue';
import TabControl from '@/components/content/tabControl/TabControl.vue'
import NavBar from '@/components/common/navbar/NavBar.vue';
import Goods from '@/components/content/goods/goods.vue';

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue';

import { getHomeMultidata, getHomeGoods } from '../../network/home'
export default {
    name: 'Home',
    components: {
        BackTop,
        Scroll,
        Goods,
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
            currentType: 'pop',
            isShowBackTop: false,
            tabControlOffsetTop: 0,
            istabFixed: false,
            saveScrollY: 0, //记录页面离开scrollY的距离

        }
    },
    // 创建页面生命周期
    created() {
        this.getHomeMultidata()
        // 请求'流行', '新款', '精选'三个的数据
        // 2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')


    },
    //挂载的生命周期
    mounted() {
        //监听图片加载完毕
        const refresh = this.debounce(this.$refs.scroll.refresh, 50)
        this.$bus.$on('itemImgLoad', () => {
            refresh()

        })
    },
    // 保留页面的滚动位置
    activated() {
        // 判断scroll组件是否有值
        if (this.$refs.scroll) {
            //当返回页面的时候调用scrollTO方法返回到saveScrollY记录的地方
            this.$refs.scroll.scrollTo(0, this.saveScrollY)
            //返回页面的时候调用一次refresh 刷新才不会出现bug
            this.$refs.scroll.refresh();
        }
    },

    deactivated() {
        // 当页面停止滚动的时候记录位置当前的位置
        this.saveScrollY = this.$refs.scroll.getScrollY()
  
    },
    methods: {
        //监听图片加载完毕后刷新解决商品数据请求完毕后下拉刷新不出来的问题。但是现在调用很频繁，每次加载完毕图片就会一直调用很浪费性能
        debounce(func, delay) {
            let timer = null
            return function (...args) {
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => {
                    func.apply(this, args)
                }, delay)
            }

        },
        //当轮播图加载完毕后获取到offsetTop的高度
        swiperImgLoad() {
            this.tabControlOffsetTop = this.$refs.tabcontrol1.$el.offsetTop
            console.log(this.tabControlOffsetTop)
        },

        //下拉加载更多
        loadMoreGoods() {
            this.getHomeGoods(this.currentType)
        },
        // 是否显示backTop图标
        scrhandleScrollContentoll(position) {
            // 当滑动的位置大于负1000的时候就是true 显示回到顶部的组件
            this.isShowBackTop = (-position.y) > 1000
            //判断是否吸顶    tabControlOffsetTop 记录准确的组件位置
            this.istabFixed = (-position.y) > this.tabControlOffsetTop
        },

        // 回到顶部按钮
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },

        //点击切换pop new sell
        tabClick(index) {

            switch (index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
        },






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
                //下拉刷新更多finishPullUp 刷新 scroll中的属性加上这个以后会自动刷新加载
                this.$refs.scroll.scroll.finishPullUp()
            })
        }
    }
}

</script>

<style scoped>
#home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;

}

.home-nav {
    background: var(--color-tint);
    color: #fff;
    font-size: 25px;
}

.tab-control {
    /* position: relative; */
    position: relative;
    z-index: 9;
}

.content {
    /* height: 500px; */
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    /* background: #fff; */
}

/* .fixed {
    position: fixed;
    right: 0;
    left: 0;
    top: 44px;
} */
</style>