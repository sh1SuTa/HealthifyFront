<script setup>
import { ref, reactive, onMounted } from 'vue'
import {drugsDetailService} from '@/api/drugs.js'
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
      <h2>Drug Details</h2>
      <p>Name: {{ drugDetails.name }}</p>
      <p v-html="drugDetails.description"></p>
      
      
    </div>
  </template>
  

  