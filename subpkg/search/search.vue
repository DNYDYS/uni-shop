<template>
  <view class="search-box">
    <uni-search-bar :radius="100" @input="input" cancelButton="none" focus="true" />
  </view>

  <!-- 搜索建议列表 -->
  <view class="sugg-list">
    <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
      <view class="goods-name">{{item.goods_name}}</view>
      <uni-icons type="forward" size="16"></uni-icons>
    </view>
  </view>

  <!-- 搜索历史 -->
  <view class="history-box" v-if="kw.length === 0">
    <!-- 标题区域 -->
    <view class="history-title">
      <text>搜索历史</text>
      <uni-icons type="trash" size="16" @click="clean"></uni-icons>
    </view>
    <!-- 列表区域 -->
    <view class="history-list" >
    <uni-tag :inverted="true" :text="item" v-for="(item,i) in histories" :key="i"
    custom-style=" margin-top: 5px;margin-right: 5px;" @click="gotoGoodsLists(item)"/>
    </view>
  </view>
  
  

</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchResults: [],
        // 搜索历史数组
        historyList: []
      };
    },
    computed:{
      histories(){
       return [...this.historyList].reverse()
      }
    },
    onLoad() {
      // 从本地获取历史记录
      this.historyList =  JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(e) {
        // console.log(e)
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchList()
        }, 500)
      },
      // 获取查询列表
      async getSearchList() {
        // 判断用户输入的关键词是否为空
        if (this.kw.length === 0) {
          this.searchResults = []
          return
        }
        const {
          data: res
        } = await uni.$http.get("/api/public/v1/goods/qsearch", {
          query: this.kw
        })
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.searchResults = res.message
        this.saveSearchHistory()
      },
      saveSearchHistory(){
        // this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        // 存储在本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },

      gotoDetail(item) {
        console.log(item.goods_id)
        uni.navigateTo({
          url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
        })
      },
      // 清空历史记录
      clean(){
        this.historyList = []
        uni.setStorageSync('kw',[])
      },
      
      gotoGoodsLists(kw){
        uni.navigateTo({
          url:"/subpkg/goods_list/goods_list?query="+kw
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    background-color: #C00000;
    // 设置定位效果为“吸顶”
    position: sticky;
    // 吸顶的“位置”
    top: 0;
    // 提高层级，防止被轮播图覆盖
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;

      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
      }

    }

    .history-box {
      padding: 0 5px;

      .history-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        font-size: 13px;
        border-bottom: 1px solid #efefef;
      }

      .history-list {
        display: flex;
        flex-wrap: wrap;

        .uni-tag {
          margin-top: 5px;
          margin-right: 5px;
          background-color: #efefef;
        }
      }
    }

  }
</style>