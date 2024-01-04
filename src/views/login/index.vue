<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <!-- 主体 -->
      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode" >
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
          {{ second === totalSeconds ? '获取验证码' : `${second}s后重新获取`}}
        </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, login } from '@/api/login'
// import { Toast } from 'vant'

export default {
  name: 'LoginPage',
  data () {
    return {
      picKey: '', // 图形验证码key
      picUrl: '', // 图形验证码图片
      totalSeconds: 60, // 倒计时总秒数
      second: 60, // 倒计时秒数
      timer: null, // 定时器
      mobile: '', // 手机号
      picCode: '', // 用户输入的图形验证码
      msgCode: '' // 短信验证码
    }
  },

  async created () {
    this.getPicCode()
  },

  destroyed () {
    // 离开页面 清除定时器
    clearInterval(this.timer)
  },

  methods: {
    // 获取图形验证码
    async getPicCode () {
      const res = await getPicCode()
      // const { data: { key, base64 } } = await request.get('/captcha/image')
      this.picKey = res.data.key
      this.picUrl = res.data.base64
    },
    // 校验手机号 和 图形验证码 是否合法
    validFn () {
      if (!/^1[3-9]\d{9}/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      // 校验
      if (!this.validFn()) {
        return
      }
      if (this.second === this.totalSeconds && !this.timer) {
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信验证码发送成功(246810)')
        // 开始倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            // 重置倒计时
            this.second = this.totalSeconds
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的短信验证码')
        return
      }
      const res = await login(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}</style>
