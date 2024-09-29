<script setup>
import avatar from '@/assets/image/favicon.ico'
import { userInfoService } from '@/api/user.js'
import useUserInfoStore from '@/stores/userInfo.js'

import { useRouter } from 'vue-router'
import {ElMessage,ElMessageBox} from 'element-plus'
import { useTokenStore } from '@/stores/token.js'

import { ref,h,render } from 'vue';

import { User,CaretBottom,SwitchButton,EditPen,Crop,Menu } from '@element-plus/icons-vue'





const tokenStore = useTokenStore();
const router = useRouter();
const userInfoStore = useUserInfoStore();
const userInfo = ref(null);


const handleCommand = (command)=>{
    switch(command){
        case 'mobileDose':
            router.push('/mobile/dose')
            break;
        case 'info':
            router.push('/mobile/user/info')
            break;
        case 'avatar':
            router.push('/mobile/user/avatar')
            break;
        case 'resetPassword':
            router.push('/mobile/user/resetPassword')
            break;
        case 'logout':
            ElMessageBox.confirm('确定要退出登录吗？', '提示', {
                confirmButtonText: '确定',
            })
    }
}

</script>



<template>

    <el-container>
        <!-- 顶部栏 -->
        <el-header height="80px">
            <div class="member-label"><strong class="nickname" v-html="userInfoStore.info.nickname"></strong></div>

            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                @select="handleSelect" router >
                <!-- LOGO头 -->
                <el-menu-item index="/mobile/home" class="logoHeader">
                    <img src="@/assets/image/Healthify.png" width="150px" alt="Element logo" class="flex-item" />
                </el-menu-item>
                
                <!-- 下拉菜单 -->
                <div class="downMenu">
                    <el-dropdown @command="handleCommand">
                        <span>

                            <el-icon size="50px" color="#409EFF">
                                <Menu />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>主页</el-dropdown-item>
                                <el-dropdown-item>论坛</el-dropdown-item>
                                <el-dropdown-item>计算工具</el-dropdown-item>
                                <el-dropdown-item command="mobileDose">药物查询</el-dropdown-item>
                                <el-dropdown-item >个人中心</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>


            </el-menu>


            <!-- 下拉菜单 command被点击后触发，可以在事件函数上可以声明一个参数接收条目对应的指令-->
            <div class="dropdown-container">
            <el-dropdown placement="bottom-end" @command="handleCommand">
                <span class="el-dropdown__box">
                    <el-avatar :src="userInfoStore.info.userPic ? userInfoStore.info.userPic : avatar" shape='square' />
                    <el-icon>
                        <CaretBottom />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                        <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                        <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>
                        <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            </div>

        </el-header>
        
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>
<style scoped>
.el-menu-demo{
    background-color: rgba(255, 255, 255, 0) ;
    border: none; /* 移除边框，如果有的话 */ 
}

.logoHeader{
    
    left: -20%; /* 根据需要调整这个值，负数表示往左移动 */  
    top: 0%;
}

.downMenu{
    position: absolute; /* 设置divA为绝对定位 */  
    left: 140%; /* 根据需要调整这个值，负数表示往左移动 */  
    top: 10%;
}
.dropdown-container{
    position: relative; /* 设置divB为相对定位 */  
    margin-left: auto; /* 这会将元素推向右侧 */  
}
.el-header {
        background-color: rgba(255, 255, 255, 0);

        display: flex;
        align-items: center;
        justify-content: space-between;

        
    }



.el-menu-item {  
  background-color: transparent !important; /* 可能需要 !important 来覆盖默认样式 */  
  /* 其他可能需要设置为透明的样式，如边框 */  
  border: 1; /* 移除边框，如果有的话 */  
}




































</style>