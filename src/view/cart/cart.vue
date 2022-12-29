<template>
    <div id="cart">
        <nav-bar class="cart-nav">
            <div slot="center">购物车({{ cartLength }})</div>
        </nav-bar>
        <scroll class="cart-scroll" ref="scroll" :probeType="3">
            <cart-list></cart-list>
        </scroll>
        <cart-button-bar></cart-button-bar>
    </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll';
import NavBar from '@/components/common/navbar/NavBar';
import CartList from './childComps/CartList.vue';
import CartButtonBar from './childComps/CartButtonBar.vue';

import { mapGetters } from 'vuex';

export default {
    name: 'Cart',
    components: {
        NavBar,
        Scroll,
        CartList,
        CartButtonBar,
    },
    computed: {
        ...mapGetters([, 'cartLength']),

    },
    activated() {
        //刷新一下高度,调用一下refresh 刷新一下高度这样才可以滚动
        this.$refs.scroll.refresh()
    }

}
</script>

<style scoped>
#cart {
    height: 100vh;
}

.cart-nav {
    background: var(--color-tint);
    color: #fff;
}

.cart-scroll {
    height: calc(100% - 49px - 44px - 40px);
    overflow: hidden;
}
</style>
