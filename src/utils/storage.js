const INFO_KEY = 'hm_shopping_info' // 个人信息
const HISTORY_KEY = 'hm_shopping_history' // 历史记录

/**
 * 获取个人信息
 */
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : { token: '', userId: '' }
}

/**
 * 设置个人信息
 * @param {object} obj
 */
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

/**
 * 删除个人信息
 */
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

/**
 * 获取搜索历史
 */
export const getHistory = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

/**
 * 设置搜索历史
 * @param {Array} arr
 */
export const setHistory = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
