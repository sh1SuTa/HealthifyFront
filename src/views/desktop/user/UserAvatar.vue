<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import {ref,onMounted} from 'vue'
import avatar from '@/assets/image/favicon.ico'

import useUserInfoStore from '@/stores/userInfo.js'
import { useTokenStore } from '@/stores/token.js'
import {userAvatarUpdateService} from '@/api/user.js'
import { ElMessage } from 'element-plus'


const userInfoStore = useUserInfoStore();
const tokenStore = useTokenStore();


const uploadRef = ref()

//用户头像地址
const imgUrl= ref(userInfoStore.info.userPic)
//图片上传成功的回调函数
const uploadSuccess = (result)=>{
    imgUrl.value = result.data;
}
//头像修改
const updateAvatar = async ()=>{
    //调用接口
    let result = await userAvatarUpdateService(imgUrl.value);
    ElMessage.success(result.message ? result.message : '前端：修改头像成功')
    //修改pinia中的数据
    userInfoStore.Info.userPic = imgUrl.value
}


//默认不是移动设备
const isMobile = ref(false);
const checkIfMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iPad|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
};
const redirectIfMobile = () => {
  isMobile.value = checkIfMobile();
  if (isMobile.value) {
    router.push('/mobile/user/avatar');
  }
};
onMounted(() => {
  redirectIfMobile();
});

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>更换头像</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-upload 
                    ref="uploadRef"
                    class="avatar-uploader" 
                    :show-file-list="false" :on-success="uploadSuccess"
                    :auto-upload="true" action="/api/upload" name="file" :headers="{'Authorization':tokenStore.token}">
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <img v-else :src="avatar" width="278" />
                </el-upload>
                <br />
                <el-button type="primary" :icon="Plus" size="large"  @click="uploadRef.$el.querySelector('input').click()">
                    选择图片
                </el-button>
                <el-button type="success" :icon="Upload" size="large" @click="updateAvatar">
                    上传头像
                </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
        .avatar {
            width: 278px;
            height: 278px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 278px;
            height: 278px;
            text-align: center;
        }
    }
}
</style>