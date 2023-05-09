export default {
  // 为当前模块开启命名空间
  namespaced: true,
  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  // 模块的 mutations 方法
  mutations: {
    addToCart(state,goods){
      // 根据提交的商品的Id，查询购物车中是否存在这件商品
      // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
      const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
      // 如果findResult为undefind的话为false
      if(!findResult){
        state.cart.push(goods)
      }else{
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    // 存储到本地
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    // 更新购物车中的商品勾选状态
    updateGoodsState(state,goods){
      const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
      if(findResult){
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新购物车中的商品数量
    updateGoodsCount(state,goods){
      const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
      if(findResult){
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    // 根据Id删除购物车中的商品
    removeGoodsById(state,goods_id){
      // 过滤获取到 id不等于 要删除的商品
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('m_cart/saveToStorage')
    },
    // 更新购物车中所有商品选中状态
    updateAllGoodsState(state,newState){
      state.cart.forEach( x=> x.goods_state = newState)
      this.commit('m_cart/saveToStorage')
    }
  },

  // 模块的 getters 属性
  getters: {
    // 购物车中总商品的数量
    total(state){
      // let c = 0
      // state.cart.forEach(x=> c+= x.goods_count)
      // return c
      
      return state.cart.reduce((total,item) => total += item.goods_count ,0)
    },
    // 购物车中已勾选的商品数量
    checkedCount(state){
       return state.cart.filter(x=> x.goods_state).reduce((total,item) => {return total+= item.goods_count}, 0)
    },
    // 已勾选商品的价格
    checkedGoodsAmout(state){
      //  toFixed 保留两位小数
      return state.cart.filter(x=> x.goods_state).reduce((tatalPrice,item)=>tatalPrice+= item.goods_count * item.goods_price ,0).toFixed(2)
    }
  },
}