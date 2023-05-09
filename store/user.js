export default {
  namespaced: true,
  //  数据节点
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),

  // 方法节点
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },

    // 存储到本地
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
  
  },
  
  getters:{
    // 拼接地址
    addstr(state) {
      if (!state.address.provinceName) {
        return ''
      }
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}