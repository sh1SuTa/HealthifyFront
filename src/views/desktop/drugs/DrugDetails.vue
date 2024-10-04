<script setup>
import { ref, reactive, onMounted } from 'vue'
import {drugsDetailService} from '@/api/drugs.js'
import {Warning} from '@element-plus/icons-vue'
// 获取 URL 中的查询字符串
const queryString = window.location.search;

// 解析查询字符串
const params = new URLSearchParams(queryString);

// 获取参数值
const id = params.get('id');



const drugDetails = ref({})
const getDrugDetails = async () => {
  const res = await drugsDetailService(id)
  drugDetails.value = res.data
}
getDrugDetails()
</script>



<template>
    <div>
      <h2> {{ drugDetails.name }}</h2>
      <div class="warning-container">
        <el-icon ><Warning  class="yellow"/></el-icon>
        <div class="warning-text" >用药安全提示</div> 
      </div>
      <div class="notices warning" >请仔细阅读说明书并在医师指导下使用药物。</div>
      
      
      <p v-html="drugDetails.description"></p>
      
      
    </div>
  </template>
  <style lang="scss" scoped>
    .yellow {
      color: red;
    }
    .warning-container {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            border-radius: 5px;
            
            
        }

        .warning-text {
            font-weight: bold;
            background-color: #e6a23c;
        }
  </style>
  

  