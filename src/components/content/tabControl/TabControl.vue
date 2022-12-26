<template>
    <!-- home页面中的流行新款商品栏 -->
    <div class="tab-control">
        <!-- 遍历home页面传过来的titles-->
        <div v-for="(item, index) in titles" :key="index" class="tab-control-item" @click="itemclick(index)">
            <!-- 在data中设置currenindex和index的索引值一样便于点击后的颜色 -->
            <span :class="{ active: currenindex == index }">{{ item }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabControl',
    props: {
        titles: {
            type: Array,
            default: {
                return: []
            }
        }
    },
    data() {
        return {
            currenindex: 0
        }
    },
    methods: {
        itemclick(index) {
            //给上面绑定点击事件和遍历的index值一样
            this.currenindex = index

            //把index传递出去来控制这个的点击
            this.$emit("tabClick", index);
        }
    }
}
</script>

<style scoped>
.tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: #fff;
    z-index: 9;
}

.tab-control-item {
    flex: 1;
}

.tab-control-item span {
    padding: 5px;
}

.tab-control-item span.active {
    border-bottom: 5px solid var(--color-tint);
    color: var(--color-tint);
}

/* .active {
    color: var(--color-tint);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  } */
</style>