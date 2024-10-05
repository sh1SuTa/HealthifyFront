<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'



const searchQuery = ref('');
const posts = ref([
  { id: 1, title: '帖子标题1', summary: '强大的 CRUD 操作：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求。损耗小：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作强大的 CRUD 操作：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求' },
  { id: 2, title: '帖子标题2', summary: '这是第二个帖子摘要...' },
  { id: 2, title: '帖子标题3', summary: '这是第san个帖子摘要...' },
  { id: 2, title: '减肥攻略', summary: '减肥是一个涉及饮食、运动和生活方式的综合过程...' },
  // 模拟帖子数据
]);
const totalPosts = 100;

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
</script>
<template>
    
    <el-container>
    <!-- 导航栏 -->
    <el-header>
      <el-row justify="space-between" >
        
        <el-col :span="18">
          <el-input v-model="searchQuery" placeholder="搜索帖子" />
        </el-col>
        <el-col :span="6">
            <el-button type="primary" @click="dialogVisible = true" style="margin-left: 10px;">搜索</el-button>
        </el-col>
      </el-row>
    </el-header>
    <br>

    <!-- 侧边分类栏 + 帖子列表 -->
    <el-main>
      <el-row>
        <el-col :span="4" >
          <el-menu router  class="custom-menu">
            <el-menu-item index="">健康帖</el-menu-item>
            <el-menu-item index="1">美容帖</el-menu-item>
            <el-menu-item index="2">问答帖</el-menu-item>
            <el-menu-item index="3">其他帖</el-menu-item>
          </el-menu>
        </el-col>

        <el-col :span="19"  style="margin-left: 10px;">
          <el-card v-for="post in posts" :key="post.id" class="post-card">
            <router-link :to="'/post/' + post.id" class="no-underline">
                <div class="header">
                    <h3>{{ post.title }}</h3>
                    <p class="timestamp" >{{post.updateTime}}</p>
                </div>
              <p class="summary" v-html="truncateRichText(post.summary, 40)"></p>
            </router-link>
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