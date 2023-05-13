<template>
  <view class="my-settle-comtainer">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>

    <!-- 合计 -->
    <view class="amout-box">
      合计：<text class="amout" rows="10">￥{{checkedGoodsAmout}}</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {
        //  倒计时的秒数
        second: 2,
        // 定时器id
        timmer: null
      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmout']),
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_user', ['token']),
      isFullCheck() {
        return this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      ...mapMutations('m_user',['updateRedirectInfo']),
      changeAllState() {
        this.updateAllGoodsState(!this.isFullCheck)
      },
      //  用户点击了结算按钮
      settlement() {
        if (!this.checkedCount) return uni.$showMsg("请选择要结算的商品！")

        if (!this.addstr) return uni.$showMsg("请选择收货地址！")

        // if(!this.token) return uni.$showMsg("请先登录！")

        if (!this.token) this.delayNavigate()
      },
      // 延时导航到my(登录)页面
      delayNavigate() {
        this.second = 2
        this.showTips(this.second)

        this.timmer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timmer)

            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  openType:'switchTab',
                  from:'/pages/cart/cart'
                })
              }
            })

            return
          }
          this.showTips(this.second)
        }, 1000)
      },
      // 展示倒计时提示消息
      showTips(n) {
        // 调用 uni.showToast() 方法，展示提示消息
        uni.showToast({
          icon: 'none',
          title: '请登录后结算！' + n + '秒之后自动跳转登录页',
          // 为页面添加透明遮罩，防止点击穿透
          mask: true,
          // 1.5 秒后自动消失
          duration: 1500
        })
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-comtainer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amout-box {

      .amout {
        color: #C00000;
        font-weight: bold;
      }
    }

    .btn-settle {
      background-color: #C00000;
      height: 100%;
      color: white;
      line-height: 50px;
      padding: 0 10px;
      min-width: 100px;
      text-align: center;
    }
  }
</style>