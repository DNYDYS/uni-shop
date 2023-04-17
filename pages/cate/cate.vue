<template>
  <view>
    <view class="scorll-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
       <block v-for="(item, i) in cateList" :key="i">
          <view :class="['left-scroll-view-item', i === active?'active':'' ]" @click="activeChanged(i)">
          {{item.cat_name}}
          </view>
       </block>
       
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
       
        <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
          <!-- 二级分类标题 -->
        <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
        <!-- 当前二级分类下的三级分类列表 -->
        <view class="cate-lv3-list">
          <!-- 三级分类的item项 -->
          <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGppdsList(item3)">
            <!-- 三级分类的图片 -->
            <!-- 原黑马图片路径已失效 -->
            <!-- <image :src="item3.cat_icon" ></image> -->
           <image :src="item3.cat_icon.replace('dev','web')" mode="widthFix"/>
            <!-- 三级分类名字 -->
            <text>{{item3.cat_name}}</text>
          </view>
        </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 当前设备可用高度
        wh: 0,
        cateList: [],
        active: 0,
        // 二级分类的列表
        cateLevel2: [],
        scrollTop: 0
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
      
      // 获取分类列表数据
      this.getCateList()
    },
    methods:{
      //获取分类列表数据
      async getCateList(){
        const {data: res}= await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !==200){
           return uni.$showMsg("数据请求失败")
        }
        // 左侧菜单赋值
        this.cateList = res.message
       
        // 二级分类赋值
        this.cateLevel2 = res.message[0].children
        console.log(res.message[0].children)
      },
      
      // 选中左侧菜单并展示右侧二级分类
      activeChanged(i){
        // 为选中的左侧下单添加active标识
        this.active = i
        // 重新为二级分类赋值
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 点击三级分类跳转到商品列表页面
      gotoGppdsList(item){
        uni.navigateTo({
          url:"/subpkg/goods_list/goods_list?cid="+ item.cat_id
        })
      }
    }
    
  }
</script>

<style lang="scss">
.scorll-view-container{
  display: flex;
  .left-scroll-view{
    width: 120px;
    
    .left-scroll-view-item{
      background-color: #F7F7F7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      
      &.active{
        background-color: floralwhite;
        position: relative;
        
        &::before{
          content: " ";
          display: block;
          width: 3px;
          height: 30px;
          background-color: darkred;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .cate-lv2-title{
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px;
  }
 .cate-lv3-list{
   display: flex;
   flex-wrap: wrap;
   .cate-lv3-item{
     width: 33.33%;
     display: flex;
     flex-direction: column;
     // 纵向剧中
     justify-content: center;
     // 横向剧中
     align-items: center;
     margin-bottom: 10px;
     
     image{
       width: 60px;
       height: 60px;
     }
     text{
       font-size: 12px;
     }
   }
 }
}
</style>
