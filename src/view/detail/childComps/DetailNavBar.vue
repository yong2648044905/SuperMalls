<template>
    <nav-bar>
        <!-- 导航栏左边的返回按钮 -->
        <div slot="left" class="back" @click="backHome">
            <img src="@/assets/img/common/back.svg" alt="">

        </div>
        <!-- 导航栏中间的按钮 -->
        <div slot="center" class="titles">
            <div v-for="(item, index) in titles" :key="index" class="title-item"
                :class="{ active: curretindex === index }" @click="titleClick(index)">
                {{ item }}</div>
        </div>
    </nav-bar>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';

export default {
    name: 'DetailNavBar',
    data() {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            curretindex: 0
        }

    },
    components: {
        NavBar,
    },
    methods: {
        titleClick(index) {
            this.curretindex = index
            this.$emit('tabClick',index,500)
        },
        backHome() {
            this.$router.push('/home');
        }
    }
}

</script>

<style scoped>
.back img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
}

.titles {
    display: flex;
    font-size: 15px;
}

.titles .title-item {
    flex: 1;
}

.active {
    color: var(--color-tint);
}
</style>