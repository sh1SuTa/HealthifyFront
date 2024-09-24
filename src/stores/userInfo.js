import { defineStore } from "pinia";
import {ref} from 'vue'

const info = ref({})


const useUserInfoStore = defineStore('userInfo',()=>{
        //定义状态相关的内容
        
        const setInfo = (newInfo)=>{
            info.value = newInfo
        
        }
        const removeInfo = ()=>{
            info.value = {}
        }
        return {info,setInfo,removeInfo};
    },
    {persist:true}
)

export default useUserInfoStore;
export {info}