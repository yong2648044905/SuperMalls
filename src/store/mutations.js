
import {
    ADD_TO_CART,
    ADD_TO_COUNTER
} from './constant';

export default {
    // //修改和添加商品
    addCounter(state, payload) {
        payload.count++;
      },
      addToCart(state, payload) {
        payload.checked = true
        state.cartList.push(payload);
      }
}