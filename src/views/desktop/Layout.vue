<script setup>
import {Management,Promotion,UserFilled,User,Crop,EditPen,SwitchButton,CaretBottom,Sort,Reading,
    Message
} from '@element-plus/icons-vue'

import avatar from '@/assets/image/favicon.ico'
import { userInfoService } from '@/api/user.js'
import useUserInfoStore from '@/stores/userInfo.js'

import { useRouter,useRoute } from 'vue-router'
import {ElMessage,ElMessageBox} from 'element-plus'
import { useTokenStore } from '@/stores/token.js'

import { ref,h,watch } from 'vue';






const tokenStore = useTokenStore();
const router = useRouter();
const route = useRoute();
const userInfoStore = useUserInfoStore();

const userInfo = ref(null);


const getUserInfo = async () => {
  try {
    // 调用用户信息接口
    let result = await userInfoService();
    userInfo.value = result.data;

    

    // 更新数据存储
    userInfoStore.setInfo({ ...result.data, nickname: result.data.nickname });
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
};
getUserInfo();

const handleCommand = (command)=>{
    //先判断登录状态
    if(!tokenStore.token){
        ElMessage.warning('请先登录')
        router.push('/login')
        return;
    }
    switch(command){
        case 'mobileDose':
            router.push('/drugs')
            break;
        case 'info':
            router.push('/user/info')
            break;
        case 'avatar':
            router.push('/user/avatar')
            break;
        case 'resetPassword':
            router.push('/user/resetPassword')
            break;
        case 'logout':
            ElMessageBox.confirm(
               '您确认要退出吗?',
               '温馨提示',
               {
                 confirmButtonText: '确认',
                 cancelButtonText: '取消',
                 type: 'warning',
               }
            )
            .then(async () => {
                   //退出登录，清除pinia中存储的token和个人信息
                    tokenStore.removeToken()
                    userInfoStore.removeInfo()
                    //跳转登录页面
                    router.push('/login')
                 ElMessage({
                   type: 'success',
                   message: '已退出登录',
                 })
            })
            .catch(() => {
                 ElMessage({
                   type: 'info',
                   message: '不退出登录',
                 })
            })
    }
}
// 设置 activeIndex 为当前路径
const activeIndex = ref(route.path);

// 监听路由变化，动态更新 activeIndex
watch(route, (newRoute) => {
  activeIndex.value = newRoute.path;
});
const scrollToBottom = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  
};
</script>

<template>
    <el-container class="mainStyle">
      <el-header>
        <!-- <div class="member-label"><strong class="nickname" v-html="userInfoStore.info.nickname"></strong></div> -->

        <el-menu :default-active="activeIndex"  mode="horizontal"  :ellipsis="false" @select="handleSelect" router>
          <el-menu-item @click="scrollToBottom" >
            <img src="@/assets/image/HealthifyLoGo.png"  width="120px" alt="Element logo"  />  
          </el-menu-item>
          <el-menu-item index="/home">主页</el-menu-item>
          <el-menu-item index="/forum">论坛</el-menu-item>
          <el-menu-item index="3">计算工具</el-menu-item>
          <el-menu-item index="/drugs">药物查询</el-menu-item>
          <el-menu-item index="5">个人中心</el-menu-item>
    
        </el-menu>
  
  
                <!-- 下拉菜单 command被点击后触发，可以在事件函数上可以声明一个参数接收条目对应的指令-->
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.userPic ? userInfoStore.info.userPic : avatar" shape='square'/>
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

      </el-header>
      <el-main >
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
</template>
<style lang="scss" scoped>
.mainStyle {
  margin-bottom: 20px;
  background: linear-gradient(90deg, #f8f8f8,#f1f5d4,  #dff7b9,#fad0c4,#f8f8f8); /* 定义渐变填充 */
  border-radius: 8px; /* 可选：让边角圆润 */
  
}


.el-header {
  
         background-color: rgba(255, 255, 255, 1);

        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
}
</style>