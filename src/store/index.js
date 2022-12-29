import Vue from "vue";
import Vuex from 'vuex'
import mutations from './mutations';
import actions from './actions';
import getters from './getters';


// 挂载vuex实例
Vue.use(Vuex)
const state = {
    // 数组保存商品

    cartList: []
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})

// 挂载到mian实例上面
export default store
