import { debounce } from '@/common/utils';
// 混入的使用
export const itemListenerMixin = {
    data() {
        return {
            imgItemListener: null, //控制首页商品图片以及详情页商品推荐列表加载显示的listener
            refresh: null
        }
    },
    mounted() {
        //监听图片加载完毕
        this.refresh = debounce(this.$refs.scroll.refresh, 50)
        this.imgItemListener = () => {
            this.refresh()

        }
        this.$bus.$on('itemImgLoad', this.imgItemListener)
    },
}