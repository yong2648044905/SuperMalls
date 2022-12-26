<template>
    <!-- 推荐商品 -->
    <div class="detail-recommend">
      <goods
         :goods="recommendList"
      />    
    </div>
</template>

<script>
import goods from '@/components/content/goods/goods';

export default {
    name: 'DetailRecommend',
    props:{
        recommendList: {
            type: Array,
            default(){
                return [];
            }
        }
    },
    components: {
        goods
    }
}
</script>
<style scoped>
.detail-recommend {
    /* padding: 20px 8px 10px; */
}
</style>
