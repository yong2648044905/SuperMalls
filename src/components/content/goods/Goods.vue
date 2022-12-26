<template>
    <div class="goods-list">
        <goodsitem v-for="(item, index) in goods " :key="index" :goodsitem="item" />
    </div>
</template>

<script>

import Goodsitem from './Goodsitem.vue';

export default {
    name: 'Goods',
    components: {
        Goodsitem
    },
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script >

<style scoped>
.goods-list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>