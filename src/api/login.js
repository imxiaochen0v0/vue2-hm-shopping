// 登录接口请求
import request from '@/utils/request'
/**
 * @param 获取图形验证码
 * @returns promise
 */
export const getPicCode = () => {
  return request.get('/captcha/image')
}

/**
 * @param 获取短信验证码
 * @returns promise
 */
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

/**
 * @param 登录
 * @returns promise
 */
export const login = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
