<template>
  <view class="goods-item">
    <!-- 左侧盒子 -->
    <view class="goods-item-left">
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 右侧盒子 -->
    <view class="goods-item-right">
      <!-- 商品名字 -->
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-info-box">
        <view class="goods-price">
          ￥{{parseFloat(goods.goods_price).toFixed(2)}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type:Object,
        default: {}
      }
    },
    data() {
      return {
        // 默认图片
        // defaultPic:"https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
         defaultPic:"https://w.wallhaven.cc/full/7p/wallhaven-7p9vq3.jpg"
      };
    }
  }
</script>

<style lang="scss">
.goods-item{
   display: flex;
   padding: 10px 5px;
   border-bottom: 1px solid #f0f0f0;
   
   .goods-item-left{
     margin-right: 5px;
     .goods-pic{
       width: 100px;
       height: 100px;
       display: block;
     }
   }
   .goods-item-right{
     display: flex;
     // 纵向布局
     flex-direction: column;
     justify-content: space-between;
     .goods-name{
       font-size: 13px;
     }
     .goods-info-box{
       .goods-price{
         color: #C00000;
         font-size: 16px;
       }
     }
   }
 }
</style>