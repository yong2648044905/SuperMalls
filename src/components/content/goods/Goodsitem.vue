<template>
    <div class="goods-item" @click="itmeClick">
        <img :src="(goodsitem.show && goodsitem.show.img) || goodsitem.image" alt="" @load="imgload">
        <div class="goods-info">
            <p class="title">{{ goodsitem.title }}</p>
            <span class="price">{{ goodsitem.price }}</span>
            <span class="collect">{{ goodsitem.cfav }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Goodsitem',
    props: {
        goodsitem: {
            type: Object,
            default() {
                return {}
            }
        }

    },
    methods: {
        // 监听图片加载完毕
        imgload() {
            this.$bus.$emit('itemImgLoad')
        },
        itmeClick() {
            // 通过路由跳转到相应的iid
            this.$router.push('/detail/' + this.goodsitem.iid)
        }
    }
}
</script>

<style scoped>
.goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
}

.goods-item img {
    width: 100%;
    border-radius: 8px;
}

.goods-info {
    text-align: center;
    padding: 3px;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    overflow: hidden;
    font-size: 14px;
}

.goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.goods-info .price {
    color: var(--color-high-text);
    margin-right: 24px;
}

.goods-info .collect {
    position: relative;
}

.goods-info .collect::before {
    content: '';
    position: absolute;
    top: 0;
    left: -16px;
    width: 14px;
    height: 14px;
    background: url('~@/assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>