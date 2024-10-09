<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import {postListService} from '@/api/forum.js'
import dayjs from 'dayjs';
import {useTokenStore} from '@/stores/token.js'

const searchQuery = ref('');
const category = ref('health');
const posts = ref([
  
]);
const totalPosts = ref(0);
const tokenStore = useTokenStore();

//获取帖子列表数据
const postList = async ()=>{
    let params = {
      searchQuery: searchQuery.value ? searchQuery.value : null,
      category: category.value ? category.value : 'health'
    }
    let result = await postListService(params);
    //重新加载数据
    posts.value = result.data;
    totalPosts = posts.value.length;
}
postList();

const handlePageChange = (page) => {
  console.log('当前页:', page);
};
const truncateRichText = (content, maxLength) => {
  // 创建一个临时 DOM 元素
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content; // 将富文本内容放入临时元素

  let text = tempDiv.innerText || tempDiv.textContent; // 获取纯文本

  if (text.length > maxLength) {
    return content.substring(0, maxLength) + '...'; // 返回截断后的文本并添加省略号
  }
  return content; // 如果文本长度未超过限制，返回原内容
};

const handleClick = (id) => {
  
  const url = `/forum/details?id=${encodeURIComponent(id)}`;
  window.open(url, '_blank'); // 在新标签页中打开
};
const categoryD = (index) => {
  switch (index) {
    case '':
      
      category.value = 'health'
      break;
    case 'beauty':
      
      category.value = 'beauty'
      break;
    case 'qa':
      
      category.value = 'qa'
      break;
    case 'other':
      
      category.value = 'other'
      break;
    default:
      console.log('Unknown command');
  }
  postList(); // 在所有情况下调用 postList()
};
// 格式化时间函数
const formatDate = (updateTime) => {
  if (!updateTime) return '';
  return dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss');
};
const isLogin = ()=>{
    if(!tokenStore.token){
      console.log('未登录')
      return false;
    }else{
      console.log('已登录') 
      return true;
    }
}
const addPostClick = () =>{
   // 正确拼接 URL
   const url = `/forum/add`;
  window.open(url, '_blank');
}
</script>
<template>
    
    <el-container>
    <!-- 导航栏 -->
    <el-header>
      <el-row justify="start" >
        
        <el-col :span="11">
          <el-input v-model="searchQuery" placeholder="搜索帖子" />
        </el-col>
        <el-col :span="1">
            <el-button type="primary" @click="postList()" style="margin-left: 10px;">搜索</el-button>
        </el-col>
        <el-col :span="1">
            <el-button type="primary" @click="searchQuery=null" style="margin-left: 10px;">清空</el-button>
        </el-col>
        <el-col v-if="isLogin()" :span="1">
          <el-button type="primary" @click="addPostClick()" style="margin-left: 10px;">发帖</el-button>
        </el-col>
      </el-row>
    </el-header>
    <br>

    <!-- 侧边分类栏 + 帖子列表 -->
    <el-main>
      <el-row>
        <el-col :span="4" >
          <el-menu   class="custom-menu" @select="categoryD">
            <el-menu-item index="">健康帖</el-menu-item>
            <el-menu-item index="beauty">美容帖</el-menu-item>
            <el-menu-item index="qa">问答帖</el-menu-item>
            <el-menu-item index="other">其他帖</el-menu-item>
          </el-menu>
        </el-col>

        <el-col :span="19"  style="margin-left: 10px;">
          <el-card v-for="post in posts" :key="post.id" class="post-card" @click="handleClick(post.id)">
            <!-- <router-link to="/post"  class="no-underline"> -->
                <div class="header no-underline">
                    <h3>{{ post.title }}</h3>
                    <p class="timestamp no-underline" >{{formatDate(post.updateTime)}}</p>
                </div>
              <p class="summary" v-html="truncateRichText(post.summary, 40)"></p>
            <!-- </router-link> -->
          </el-card>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :total="totalPosts" @current-change="handlePageChange"/>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
.header {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: space-between; /* 在行内元素之间留出空间 */
  align-items: center; /* 垂直居中对齐 */
}

.timestamp {
  margin-left: auto; /* 自动左边距，使时间靠右对齐 */
  color: lightcoral; /* 设置浅红色 */
}
 .no-underline {
  text-decoration: none; /* 去掉下划线 */
 }
h3 {
  background: linear-gradient(45deg, #ff9a9e, #fad0c4);
  -webkit-background-clip: text;
  color: transparent;
  
}
.custom-menu {
  background-image: url('@/assets/image/forum.jpg');
  background-size: cover; /* 根据需要调整图片尺寸 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-position: center; /* 让图片居中 */
  color: rgb(0, 0, 0); /* 调整文字颜色 */
}
.custom-menu .el-menu-item {
  background-color: rgba(255, 254, 254, 0.322); /* 可选：为菜单项设置半透明背景 */
}
.logo {
  font-size: 24px;
  font-weight: bold;
}
.post-card {
  
  margin-bottom: 20px;
//   border: 10px solid; /* 定义边框厚度 */
//   border-image: linear-gradient(180deg, #ff9a9e, #fad0c4,#fa9066) 1; /* 定义渐变作为边框 */
  border-radius: 8px; /* 可选：让边角圆润 */
  
}

</style>