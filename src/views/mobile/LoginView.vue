<script setup>

import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import {userRegisterService,userLoginService,userMailCodeService,useCodeRestPasswordService} from '@/api/user.js'
import { useRouter } from 'vue-router'
import {useTokenStore} from '@/stores/token.js'

const router = useRouter();
const tokenStore = useTokenStore();
const isCounting = ref(false);
const remainingTime = ref(60);

//控制注册与登录表单的显示， 默认显示0注册，1登录，2重置密码
const isRegister = ref(1)

//定义数据模型
const registerData = ref({
    username: '',
    password: '',
    rePassword: ''
}) 
//定义忘记密码模型
const forgetData = ref({
    username: '',
    newPwd: '',
    code: ''
})
//定义函数用来清空数据模型
const clearRegisterData = ()=>{
    registerData.value={
        username: '',
        password: '',
        rePassword: ''
    }
}
//校验密码的函数
const checkRePassword = (rule,value,callback)=>{
    if(value === '' ){
        callback(new Error('请输入确认密码'))
    }else if(value !== registerData.value.password){
        callback(new Error('两次输入的密码不一致'))
    }else{
        callback()
    }
}
//定义表单校验规则
const rules = {
    username: [
        {required: true,message: '请输入用户名',trigger: 'blur'},
        {min: 5,max: 16,message: '长度5-16',trigger: 'blur'}
    ],
    password: [
        {required: true,message: '请输入密码',trigger: 'blur'},
        {min: 5,max: 16,message: '长度5-16',trigger: 'blur'}
    ],
    rePassword: [
        {validator: checkRePassword,trigger: 'blur'}
    ]
}
//调用后台接口完成注册
const register = async ()=>{
    //registerData是一个响应式对象，获取值要.value
    let result = await userRegisterService(registerData.value);
    
    ElMessage.success(result.msg ? result.msg : '注册成功');
}

//登录函数
const login = async ()=>{
    //调用接口，完成登录
    let result = await userLoginService(registerData.value);
    if (result.code === 1 ){
        ElMessage.error(result.message ? result.message : '前端：账号或密码错误');
    }
    ElMessage.success(result.msg ? result.msg : '登录成功');
    //把得到的token存储在pinia中
    tokenStore.setToken(result.data)
    //登录成功进行跳转
    router.push('/m')
}
//发送验证码
const useMailSendCode = async ()=>{
    startCountdown()
    let result = await userMailCodeService(forgetData.value.username);
    if (result.code === 1 ){
        ElMessage.error(result.message ? result.message : '前端：用户不存在');
    }else{
        ElMessage.success(result.message ? result.message : '发送成功');
    }
}
const startCountdown = () => {
  if (!isCounting.value) {
    isCounting.value = true;
    let timer = setInterval(() => {
      remainingTime.value--;
      if (remainingTime.value <= 0) {
        clearInterval(timer);
        isCounting.value = false;
        remainingTime.value = 60; // 重置时间
      }
    }, 1000);
  }
}
//点击重置按钮后调用后端接口
const useCodeRestPassword = async ()=>{
    let result = await useCodeRestPasswordService(forgetData.value);
    if(result.code === 1){
        ElMessage.error(result.message ? result.message : '前端：验证码错误');

    }else{
        ElMessage.success(result.message ? result.message : '重置成功');
        clearRegisterData();
    }
}

</script>
<template>
    




    <el-col :span="24" class="form-container">
        <!-- 注册表单 -->
        <el-form ref="form" size="large" autocomplete="off" v-if="isRegister === 0" :model="registerData" :rules="rules"
            class="form">
            <el-form-item>
                <h1 class="form-title">注册</h1>
            </el-form-item>
            <el-form-item prop="username">
                <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="registerData.password"></el-input>
            </el-form-item>
            <el-form-item prop="rePassword">
                <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                    v-model="registerData.rePassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="button" type="primary" @click="register">注册</el-button>
            </el-form-item>
            <el-form-item class="link-item">
                <el-link type="info" :underline="false" @click="isRegister = 1; clearRegisterData()">← 返回</el-link>
            </el-form-item>
        </el-form>

        <!-- 登录表单 -->
        <el-form ref="form" size="large" autocomplete="off" v-else-if="isRegister === 1" :model="registerData"
            :rules="rules" class="form">
            <el-form-item>
                <h1 class="form-title">登录</h1>
            </el-form-item>
            <el-form-item prop="username">
                <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="registerData.password"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="flex items-center">
                    <el-checkbox>记住我</el-checkbox>
                    <el-link type="primary" :underline="false" @click="isRegister = 2">忘记密码？</el-link>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button class="button" type="primary" @click="login">登录</el-button>
            </el-form-item>
            <el-form-item class="link-item">
                <el-link type="info" :underline="false" @click="isRegister = 0; clearRegisterData()">注册 →</el-link>
            </el-form-item>
        </el-form>

        <!-- 忘记密码 -->
        <el-form ref="form" size="large" autocomplete="off" v-else-if="isRegister === 2" :model="forgetData" :rules="rules"
            class="form">
            <el-form-item>
                <h1 class="form-title">重置密码</h1>
            </el-form-item>
            <el-form-item prop="username">
                <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="forgetData.username"></el-input>
            </el-form-item>
            <el-form-item prop="newPwd">
                <el-input :prefix-icon="Lock" type="password" placeholder="请输入新密码"
                    v-model="forgetData.newPwd"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input show-word-limit maxlength="4" :prefix-icon="ChatDotSquare" placeholder="请输入验证码"
                    v-model="forgetData.code"></el-input>
            </el-form-item>
            <el-form-item>
                <div v-if="forgetData.username" class="flex items-center">
                    <el-button v-if="!isCounting" @click="useMailSendCode" color="#626aef" round class="custom-size-button">发送验证码</el-button>
                    <span v-else>{{ remainingTime }} 秒后重新发送</span>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button class="button" type="primary" @click="useCodeRestPassword">重置密码</el-button>
            </el-form-item>
            <el-form-item class="link-item">
                <el-link type="info" :underline="false" @click="isRegister = 1; clearRegisterData()">返回 →</el-link>
            </el-form-item>
        </el-form>
    </el-col>

</template>
<style scoped>
  .custom-size-button {  
  /* 设置你想要的宽度和高度，或者其他样式 */  
  width: 80px; /* 举例 */  
  height: 30px; /* 举例，但通常按钮的高度不需要显式设置，因为 Element UI 会处理它 */  
  /* 如果需要，可以覆盖 Element UI 的内边距、字体大小等 */  
  padding: 0 20px; /* 举例 */  
  font-size: 12px; /* 按钮内文字大小 */  
}
  .form-container {
    background-image: url(@/assets/image/loginM.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 20px;
    
    border-radius: 8px;
    
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
}



  
.form {
    background-color: rgba(255, 255, 255, 0.7); /* 半透明白色背景 */
    padding: 20px;
    border-radius: 8px;
    width: 90%; /* 宽度设置为屏幕的 90% */
    max-width: 500px; /* 最大宽度，防止在大屏设备上过宽 */
    margin: 0 auto; /* 居中显示 */
}


  
  .form-title {
    font-size: 20px;
    margin-bottom: 15px;
  }
  
  .button {
    width: 100%;
  }
  
  .link-item {
    text-align: center;
  }
  
  .flex {
    display: flex;
    align-items: center;
    flex-direction: column; /* Arrange children in a vertical column */
    gap: 10px;
    justify-content: space-between;
  }
  
  .items-center {
    align-items: center;
  }
  
  /* 响应式样式 */
  @media (max-width: 600px) {
    .form-container {
      padding: 15px;
    }
  
    .form {
      padding: 15px;
    }
  
    .form-title {
      font-size: 18px;
    }
  
    .button {
      width: 100%;
      padding: 10px;
    }
  
    .link-item {
      font-size: 14px;
    }
  }
  </style>