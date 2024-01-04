// 登录接口请求
import request from '@/utils/request'
/**
 * @param 获取图形验证码
 * @returns promise
 */
export const getPicCode = () => {
  return request.get('/captcha/image')
}
