import request from '@/utils/request.js'

export const postListService = (params)=> {
    return request.get('/forum/post',{params:params})
}
export const postAddService = (id)=> {
    return request.post('/forum/add/'+id)
}