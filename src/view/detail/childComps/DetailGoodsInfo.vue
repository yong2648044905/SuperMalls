<template>
    <!-- 详情页面图片 -->
    <div class="goods-info"  v-if="Object.keys(goodsInfo).length !== 0">
        <div class="info-desc">
            <div class="desc">{{ goodsInfo.desc }}</div>
        </div>
        <div class="info-key">
            {{goodsInfo.detailImage[0].key }}
        </div>

        <div   class="info-list">
            <img v-for="(item,index) in goodsInfo.detailImage[0].list" :key="index" :src="item" alt="goods-img" @load="goodsInfoImgLoad">
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailGoodsInfo',
    props: {
        goodsInfo: {
            type: Object,
            default: {
                return: {}
            }
        }
    },
    methods:{
        // 监听图片加载完毕从而刷新才不会卡顿
        goodsInfoImgLoad(){
            this.$emit('goodsInfoImgLoad')
        }
    }
}
</script>

<style scoped>

.goods-info {
    padding: 30px 8px 0;
    border-bottom: solid 4px rgba(100, 100, 100, .1);
}
.info-desc {
    padding: 0 8px 0;
    font-size: 14px;
}
.info-desc .desc {
    text-indent: 2em;
}
.info-key {
    padding: 8px;
}
.info-list img{
    width: 100%;
}

</style>