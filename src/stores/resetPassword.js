import request from '@/utils/request.js'

//修改个人信息
export const resetPasswordF = (restPasswordData)=>{
  return request.patch('/user/updatePwd',restPasswordData)
}