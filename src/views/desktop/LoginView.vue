<script setup>

import { ref,onMounted, onUnmounted, nextTick } from 'vue'



//这一块是判断移动设备
const isMobile = ref(false);
const checkIfMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iPad|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
};
const redirectIfMobile = () => {
  isMobile.value = checkIfMobile();

  if (isMobile.value) {
    router.push('/');
  }
};
onMounted(() => {
  redirectIfMobile();
});

//导入elementplusUi
import { ElMessage} from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';

//导入接口
import {userRegisterService,userLoginService,userMailCodeService,useCodeRestPasswordService} from '@/api/user.js'

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

//表单数据校验

//导入
import { useRouter } from 'vue-router'
import {useTokenStore} from '@/stores/token.js'



const router = useRouter();
const tokenStore = useTokenStore();

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
    router.push('/')
}

//定义函数用来清空数据模型
const clearRegisterData = ()=>{
    registerData.value={
        username: '',
        password: '',
        rePassword: ''
    }
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

const isCounting = ref(false);
const remainingTime = ref(60);

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
};

const useCodeRestPassword = async ()=>{
    let result = await useCodeRestPasswordService(forgetData.value);

}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">

            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister === 0" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword"></el-input>
                </el-form-item>

                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = 1;clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>

            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else-if="isRegister === 1" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false" @click="isRegister = 2">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = 0;clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>

            <!-- 忘记密码？ -->
            <el-form ref="form" size="large" autocomplete="off" v-else-if="isRegister === 2" :model="forgetData" :rules="rules">
                <el-form-item>
                    <h1>重置密码</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="forgetData.username"></el-input>
                </el-form-item>
                <el-form-item prop="newPwd">
                    <el-input name="newPwd" :prefix-icon="Lock" type="password" placeholder="请输入新密码" v-model="forgetData.newPwd"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input show-word-limit maxlength="4" :prefix-icon="ChatDotSquare"  placeholder="请输入验证码" v-model="forgetData.code"></el-input>
                    <!-- {{forgetData.username}} -->
                </el-form-item>
                <el-form-item class="flex">
                    <div v-if=forgetData.username>
                        <button v-if="!isCounting" @click="useMailSendCode">发送验证码</button>
                        <span v-else>{{ remainingTime }} 秒后重新发送</span>
                        
                    </div>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="useCodeRestPassword">重置密码</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = 1;clearRegisterData()">
                        返回 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        // 中间的图片
        background: 
        // url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
        //大图片
            url('@/assets/image/chenmoyu.png') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }


    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>