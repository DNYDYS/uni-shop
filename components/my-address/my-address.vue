<template>
  <view>
    <!-- 选择收货地址的合资 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>

    <!-- 渲染收货信息盒子 -->
    <view class="address-info-box" @click="chooseAddress" v-else>
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人： {{address.userName}}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="right" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">
          <view class="address">收货地址：</view>
        </view>
        <view class="row2-right">
          {{addstr}}
        </view>
      </view>
    </view>

    <!-- 底部边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {
        // 收货地址
        // address: {}
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      async chooseAddress() {
        // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
        // 返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        const res = await uni.chooseAddress()
        // 2. 用户成功的选择了收货地址
        if (res.errMsg === 'chooseAddress:ok') {
          // 为 data 里面的收货地址对象赋值
          this.updateAddress(res)
        }
      }
    },
    // 计算属性
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user',['addstr'])
    }
  }
</script>

<style lang="scss">
  .address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .address-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;

    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-left {
        .username {}
      }

      .row1-right {
        display: flex;
        justify-content: space-between;

        .phone {}
      }
    }

    .row2 {
      display: flex;
      // justify-content: space-between;
      // align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }

      .row2-right {}
    }
  }

  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }
</style>