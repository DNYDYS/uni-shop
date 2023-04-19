<template>
  <view>
    
    <view class="search-box">
      <!-- 使用自定义搜索组件 -->
      <my-search @click="gotoSearch"></my-search>
    </view>
   
    
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>

    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}"
              mode="widthFix"></image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" :url="item2.url">
              <image v-if="i2 !== 0" :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width + 'rpx'}">
              </image>
            </navigator>
          </view>
        </view>

      </view>
    </view>

  </view>

  <view>

    <mp-html :content="html" />

  </view>

</template>


<script>
  export default {
    data() {
      return {
        // 轮播图的数据列表
        swiperList: [],
        // 分类导航数据列表
        navList: [],
        // 楼层数据列表
        floorList: [],
        html: "",
      };
    },
    onLoad() {
      // 调用方法 获取轮播图的数据
      this.getSwiperList()
      // 获取分类导航列表
      this.getNavList()
      this.getFloorList()
      this.getRichText()
      
    },
    methods: {
      // 获取轮播图数据
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // 请求失败
        if (res.meta.status !== 200) {
          return uni.$showMsg("数据请求失败")
        }
        // 3.3 请求成功，为 data 中的数据赋值
        this.swiperList = res.message;
      },

      // 获取分类导航列表
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) {
          return uni.$showMsg("数据请求失败")
        }
        this.navList = res.message
      },

      // 分类导航区域点击事件
      navClickHandler(item) {
        if (item.name === "分类") {
          uni.switchTab({
            url: "/pages/cate/cate"
          })
        }
      },
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) {
          return uni.$showMsg("数据请求失败")
        }
        console.log(res)
        // 对数据进行处理
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      // 获取分类导航列表
     async getRichText() {
       const {data: res} = await  uni.$http.get('/api/0/getRichText')
       console.log(res)
       console.log(res.richRext)
       // if (res.meta.status !== 200) {
       //   return uni.$showMsg("数据请求失败")
       // }
       this.html = res.richRext
     },
      
      // //解析富文本方法
      // 解析富文本后显示数据
      
      richText() {
        var richtext = this.html;
        if (richtext) {
          const regex = new RegExp('<img', 'gi');
          const regex2 = new RegExp('src="/api', 'gi');
          richtext = richtext.replace(regex2, `src="${this.$ServerBaseUrl}/api`);
          richtext = richtext.replace(regex, `<img style="max-width: 100%;"`);
          console.log("---------")
          console.log(richtext)
          this.html = richtext;
        } else {
          console.log("++++++++++")
          this.html = richtext;
          console.log(richtext)
        }
      },
      
      // 自定义组件绑定点击事件
      gotoSearch(){
        // 跳转到分包下的查询页面
        uni.navigateTo({
          url:"/subpkg/search/search"
        })
      }

    },

  }
</script>

<style lang="scss">
  // 轮播图区域
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  // 分类导航区域
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  // 楼层区域样式
  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
  
  .search-box{
    // 设置定位效果为“吸顶”
    position: sticky;
    // 吸顶的“位置”
    top: 0;
    // 提高层级，防止被轮播图覆盖
    z-index: 999;
  }
</style>