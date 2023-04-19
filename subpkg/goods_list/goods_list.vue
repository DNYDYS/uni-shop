<template>
  <view class="goous-list">
    <view v-for="(goods,i) in goodsList" :key="i" @click="gotoDeatial(goods)">
      <my-goods :goods="goods"></my-goods>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goodsList:[],
        total:0,
        isLoading: false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      
      this.getGoodsList()
    },
    methods:{
      // 获取商品列表数据
      async getGoodsList(cb){
        // 打开节流阀
        this.isLoading = true
        const {data:res} = await uni.$http.get("/api/public/v1/goods/search",this.queryObj)
        // 关闭节流阀
        this.isLoading = false
        if(cb){
          console.log("111");
          () => uni.stopPullDownRefresh()
        }
        if(res.meta.status !== 200){
          return uni.$shouMsg()
        }
      
        // 新旧数据拼接
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
        
      },
      
      gotoDeatial(goods){
        uni.navigateTo({
          url:"/subpkg/goods_detail/goods_detail?goods_id="+goods.goods_id
        })
      }
    },
    // 上拉触底事件
    onReachBottom() {
      if(this.queryObj.pagesize * this.queryObj.pagenum>=this.total){
        return uni.$showMsg("数据加载完毕")
      }
      
      if(this.isLoading){
        return
      }
      //  让页码值自增加1
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    // 下拉刷新事件
    onPullDownRefresh() {
      //  重置关键数据
      this.queryObj.pagenum=1
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      
      // 重新发起请求
      this.getGoodsList(true)
    }
  }
</script>

<style lang="scss">
 
</style>
