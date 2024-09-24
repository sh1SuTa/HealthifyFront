<script setup>
import {Management,Promotion,UserFilled,User,Crop,EditPen,SwitchButton,CaretBottom,Sort,Reading,
    Message
} from '@element-plus/icons-vue'

import avatar from '@/assets/image/favicon.ico'
import { userInfoService } from '@/api/user.js'
import useUserInfoStore from '@/stores/userInfo.js'

import { useRouter } from 'vue-router'
import {ElMessage,ElMessageBox} from 'element-plus'
import { useTokenStore } from '@/stores/token.js'

import { ref,h,render } from 'vue';





const tokenStore = useTokenStore();
const router = useRouter();
const userInfoStore = useUserInfoStore();
const userInfo = ref(null);


</script>

<template>
<div class="common-layout">
    <el-container>
      <el-header>
        <div class="member-label"><strong class="nickname" v-html="userInfoStore.info.nickname"></strong></div>

        <el-menu
          :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
          :ellipsis="false" @select="handleSelect" router>
          <!-- <el-menu-item index="0">
            <img
              style="width: 100px"
              src="/images/element-plus-logo.svg"
              alt="Element logo"
            />
          </el-menu-item> -->
          <el-menu-item index="1">主页</el-menu-item>
          <el-menu-item index="2">论坛</el-menu-item>
          <el-menu-item index="3">计算工具</el-menu-item>
          <el-menu-item index="4">个人中心</el-menu-item>
    
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
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>

    




    
    
</div>
</template>
<style lang="scss" scoped>
  .el-header {
        background-color: rgba(255, 255, 255, 0.5);

        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }
</style>