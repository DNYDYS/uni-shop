<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed:{
      ...mapState('m_user',['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo','updateToken','updateRedirectInfo']),
      //  用户授权后 获取用户信息
      getUserInfo(e) {
        console.log(e.detail)
        // 判断是否获取用户信息成功
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
        console.log(e.detail.userInfo)
        this.updateUserInfo(e.detail.userInfo)
        this.getToken(e.detail)
      },
      async getToken(e) {
        // 获取code值
        const res = await uni.login().catch(err => err)
        if (res.errMsg !== 'login:ok') return uni.$showMsg('登陆失败！')
        console.log(res)

        // 准备参数
        const query = {
          code: res.code,
          encryptedData: e.encryptedData,
          iv: e.iv,
          rawData: e.rawData,
          signature: e.signature
        }
        const {data: loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
        console.log(loginResult)
        // 该接口已经失效，为了实现登录效果，不判断状态码
        // if(loginResult.meta.status !== 200){
        //   return uni.$showMsg('登录失败！')
        // }
        uni.$showMsg('登录成功！')
        // 直接把token保存到vuex中
        // this.updateToken(loginResult.message.token)
        this.updateToken("token")
        this.navigateBack()
        
      },
      navigateBack(){
        if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: ()=>{
              this.updateRedirectInfo(null)
            }
          })
        }
        
      }
      
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: #F8F8F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    // 半圆造型 个人感觉巨丑
    // &::after{
    //   content: ' ';
    //   display: flex;
    //   width: 100%;
    //   height: 40px;
    //   background-color: white;
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   border-radius: 100%;
    //   transform: translateY(50%);
    // }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #C00000;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }

  }
</style>