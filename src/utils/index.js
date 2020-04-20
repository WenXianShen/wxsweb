import { resetRouter } from '@/router'
export function resetTokenAndClearUser () {
  // 退出登陆 清除用户资料
  sessionStorage.setItem('token', '')
  sessionStorage.setItem('userImg', '')
  sessionStorage.setItem('users', '')
  // 重设路由
  resetRouter()
}

export const defaultDocumentTitle = 'wxs-web'
export function getDocumentTitle (pageTitle) {
  if (pageTitle) return `${defaultDocumentTitle} - ${pageTitle}`
  return `${defaultDocumentTitle}`
}
