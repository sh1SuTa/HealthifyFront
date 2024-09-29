<script setup>  
import {resetPasswordF} from '@/stores/resetPassword.js'
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { useTokenStore } from '@/stores/token.js'
import useUserInfoStore from '@/stores/userInfo.js'
import { useRouter } from 'vue-router'


const tokenStore = useTokenStore();
const router = useRouter();
const userInfoStore = useUserInfoStore();

const formRef = ref(null); // 创建响应式引用以获取表单元素 

const restPassword = ref({  
  old_pwd: '',  
  new_pwd: '',  
  re_pwd: ''  
}); 

// 验证规则 
const rules = {  
  old_pwd: [  
    { required: true, message: '请输入旧密码', trigger: 'blur' }  
  ],  
  new_pwd: [  
    { required: true, message: '请输入新密码', trigger: 'blur' },  
    { min: 5, max: 16, message: '密码长度在 5 到 16 个字符', trigger: 'blur' }  
  ],  
  re_pwd: [  
    { required: true, message: '请再次输入新密码', trigger: 'blur' },  
    { validator: (rule, value, callback) => {  
      if (value === '') {  
        callback(new Error('请再次输入新密码'));  
      } else if (value !== restPassword.value.new_pwd) {  
        callback(new Error('两次输入的新密码不一致!'));  
      } else {  
        callback();  
      }  
    }, trigger: 'blur' }  
  ]  
};

//修改密码
const updatePassword = async ()=>{

  try {  
    // 首先验证表单  
    if (!formRef.value.validate()) {  
      return;  
    }  

    // 调用 resetPasswordF 函数更新密码  
    // 假设 resetPasswordF 函数接受一个对象作为参数，并返回一个 Promise  
    const response = await resetPasswordF(restPassword.value);  
  
    // 根据返回结果处理  
    if (response.code === 0) {  
      ElMessage({  
        type: 'success',  
        message: '密码更新成功！'  
      });  
      //退出登录，清除pinia中存储的token和个人信息
      tokenStore.removeToken()
                userInfoStore.removeInfo()
                //跳转登录页面
                router.push('/login')
    } else {  
      ElMessage.error('密码更新失败：' + response.message);  
      // 可以在这里添加密码更新失败后的逻辑，比如显示错误信息  
    }  
  } catch (error) {  
    // 处理可能出现的错误  
    ElMessage.error('密码更新过程中发生错误：' + error.message);  
  } 

}


</script>

<template>  
    <el-card class="page-container">  
      <template #header>  
        <div class="header">  
          <span>重置密码</span>  
        </div>  
      </template>  
      <el-row>  
        <el-col :span="12" :xs="22">  
          <el-form :model="restPassword" :rules="rules" ref="formRef" label-width="100px" size="large">  
            <el-form-item label="旧密码" prop="old_pwd">  
              <el-input v-model="restPassword.old_pwd" ></el-input>  
            </el-form-item>  
            <el-form-item label="新密码" prop="new_pwd">  
              <el-input v-model="restPassword.new_pwd"></el-input>  
            </el-form-item>  
            <el-form-item label="确认新密码" prop="re_pwd">  
              <el-input v-model="restPassword.re_pwd"></el-input>  
            </el-form-item>  
            <el-form-item>  
              <el-button type="primary" @click="updatePassword">修改密码</el-button>  
            </el-form-item>  
          </el-form>  
        </el-col>  
      </el-row>  
    </el-card>  
</template>  
    
