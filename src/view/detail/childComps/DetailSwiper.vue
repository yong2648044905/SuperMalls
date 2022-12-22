<template>
    <!-- 轮播图 -->
    <swiper class="detail-swiper">
        <SwiperItem v-for="(item, index) in topImages " :key="index">
            <img :src="item" alt="">
        </SwiperItem>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper';

export default {
    name: 'DetailSwiper',
    components: {
        Swiper,
        SwiperItem

    },
    props: {
        topImages: {
            type: Array,
            default: []
        }
    }
}
</script>

<style scoped>
.detail-swiper {
    height: 300px;
}
</style>