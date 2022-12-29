<template>
    <div class="button-bar">
        <div class="check-content">
            <CheckGoodsBtn :isChecked="isChecked" @click.native="checkClick"></CheckGoodsBtn>
            <span>全选</span>
        </div>
        <div class="price">
            合计：{{ totalPrice }}
        </div>

        <div class="pay">结算:({{ checkLength }})</div>
    </div>
</template>
  
<script>
import CheckGoodsBtn from '@/components/content/checkGoodsBtn/CheckGoodsBtn';
import { mapGetters } from 'vuex'


export default {
    name: 'CartButtonBar',
    components: {
        CheckGoodsBtn
    },
    computed: {
        // 合计判断
        totalPrice() {
            return '$' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.realPrice * item.count
            }, 0)
        },
        //结算判断长度就行
        checkLength() {
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        // 全选状态
        isChecked() {
            // 遍历里面的checked 
            //      if (this.$store.state.cartList.length === 0) return false; 当没有选中状态的时候默认不选中
            if (this.$store.state.cartList.length === 0) return false;
            // 全部选中才是选中状态
            return !this.$store.state.cartList.find(item => !item.checked);
        }


    },

    methods: {
        //isChecked 全选的点击事件
        checkClick() {
            if (this.isChecked) {
                this.$store.state.cartList.forEach(element => {
                    element.checked = false
                });
            } else {
                this.$store.state.cartList.forEach(element => {
                    element.checked = true
                });
            }
        }
    }
}
</script>
  
<style scoped>
.button-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
}

.check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.check-button {
    line-height: 20px;
}

.pay {
    width: 100px;
    text-align: center;
    background-color: var(--color-tint);
    color: #fff;
    padding-left: 5px;
}
</style>