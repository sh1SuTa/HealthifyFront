import request from '@/utils/request.js'
//存放token的地方
import { useTokenStore } from '@/stores/token.js'

export const drugsUpload = (formData)=>{
    return request.post('/uploadUrl', formData, {
        headers: {
          'Authorization': tokenStore.value.token
        }
      });
} 


//文章分类列表查询
export const articleCategoryListService = ()=>{
    // const tokenStore = useTokenStore();
    
    //在pinia中定义的响应式数据不需要.value
    // return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    return request.get('/category')
}

//文章分类添加接口
export const articleCategoryAddService = (categoryData)=>{
    return request.post('/category',categoryData)
}

//文章分类修改
export const articleCategoryUpdateService = (categoryData)=>{
    return request.put('/category',categoryData)
}

//文章分类删除
export const articleCategoryDeleteService = (id)=>{
    return request.delete('/category?id='+id)
}

//文章列表查询
export const articleListService = (params)=>{
    return request.get('/article',{params:params})
}

//药物列表查询
export const drugsListService = (params)=>{
    return request.get('/drugs/list',{params:params})
}
export const drugsDetailService = (id)=>{
    return request.get('/drugs/list/'+id)
}

//添加药物
export const drugsAddService = (drugsModel)=>{
    return request.post('/drugs/add',drugsModel)
}

//文章修改
export const articleUpdateService = (articleData)=>{
    return request.put('/article',articleData)
}