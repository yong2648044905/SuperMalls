import Vue from "vue";
import Vuex from 'vuex'


// 挂载vuex实例
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 数组保存商品
        cartList: []
    },
    mutations: {
        //修改和添加商品
        addCart(state, payload) {
            //首先查找之前数组中是否有该商品       //item => item.iid === payload.iid 对比iid是否相同
            let oldProduct = state.cartList.find(item => item.iid === payload.iid)

            //拿到数组后进行判断
            if (oldProduct)//如果有相同商品的时候直接给count加1
            {
                oldProduct.count += 1
            } else {//如果不相同就push一个新的商品
                payload.count = 1
                state.cartList.push(payload)

            }

        }
    }
})

// 挂载到mian实例上面
export default store
