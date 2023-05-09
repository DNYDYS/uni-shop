<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <my-address></my-address>
    <!-- 商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧的文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <!-- 循环 渲染购物车中商品信息-->
  <!--  <block v-for="(goods,i) in cart" :key="i">
      <my-goods :goods="goods" :showRadio="true" :show-num="true" @redio-change="radioChangeHandler"
        @num-change="numberChangeHandle"></my-goods>
    </block> -->
<!-- 循环 渲染购物车中商品信息 并添加滑动删除-->
    <uni-swipe-action>
      <block v-for="(goods,i) in cart" :key="i">
        <uni-swipe-action-item :right-options="right_options" @click="swipeItemClickHandler(goods)">
          <my-goods :goods="goods" :showRadio="true" :show-num="true" @redio-change="radioChangeHandler"
            @num-change="numberChangeHandle"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 使用自定义结算组件 -->
    <my-settle></my-settle>

  </view>
  
  <view class="empty-cart" v-else>
    <image src="../../static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
  
</template>

<script>
  import badgeMix from '../../mixin/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },

    data() {
      return {
        right_options: [{
          text: '删除',
          style:{
            backgroundColor: '#C00000'
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      numberChangeHandle(e) {
        this.updateGoodsCount(e)
      },
      swipeItemClickHandler(goods){
        this.removeGoodsById(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container{
    padding-bottom: 50px;
  }
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #EFEFEF;

    .cart-title-text {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .empty-cart{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
      
    .empty-img{
      height: 90px;
      width: 90px;
    }
    .tip-text{
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
    
  }
</style>