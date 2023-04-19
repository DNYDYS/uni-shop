<template>
  <view class="my-search-container" :style="{'background-color' : bgcolor}" @click="searchHandler">
    <view class="my-search-box" :style="{'border-radius': raduis + 'px' }">
      <!-- 使用uni-ui提供的组件 -->
      <uni-icons type="search" size="18"  />
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      // 背景颜色
      bgcolor:{
        type: String,
        default: "#C00000"
      },
      
      // 圆角尺寸
      raduis:{
        type: Number,
        default: 18 // 单位默认为： px
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      searchHandler(){
        console.log("~~~~~~~~~~~")
        // 获取自定组件调用方绑定的点击事件
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  // background-color: #C00000;
  display: flex;
  align-items: center;
  padding: 0 10px;
  
  .my-search-box{
    height: 36px;
    width: 100%;
    background-color: #FFFFFF;
    // border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .placeholder{
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>