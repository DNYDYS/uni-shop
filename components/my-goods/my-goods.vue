<template>
  <view class="goods-item">
    <!-- 左侧盒子 -->
    <view class="goods-item-left">
        <radio :checked = "goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"/>
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
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
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
      },
      showRadio:{
        type:Boolean,
        // 默认不会展示让dio
        default:false
      },
      showNum:{
        type:Boolean,
        // 默认不会展示让dio
        default:false
      }
    },
    data() {
      return {
        // 默认图片
        // defaultPic:"https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
         defaultPic:"https://w.wallhaven.cc/full/7p/wallhaven-7p9vq3.jpg"
      };
    },
    methods:{
      //radio 事件的点击处理函数
      radioClickHandler(){
        this.$emit('redio-change',{
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      numChangeHandler(val){
        this.$emit('num-change',{
          goods_id: this.goods.goods_id,
          // val为计算过后的值，但是我们不能保证永远是个数值，所以使用+val或者 val-0 保证为数值
          goods_count: +val
        })
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
  width: 750rpx;
  box-sizing: border-box;
   display: flex;
   padding: 10px 5px;
   border-bottom: 1px solid #f0f0f0;
   
   .goods-item-left{
     margin-right: 5px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     
     .goods-pic{
       width: 100px;
       height: 100px;
       display: block;
     }
   }
   .goods-item-right{
     display: flex;
     flex: 1;
     // 纵向布局
     flex-direction: column;
     justify-content: space-between;
     .goods-name{
       font-size: 13px;
     }
     .goods-info-box{
       display: flex;
       justify-content: space-between;
       align-items: center;
       .goods-price{
         color: #C00000;
         font-size: 16px;
       }
     }
   }
 }
</style>