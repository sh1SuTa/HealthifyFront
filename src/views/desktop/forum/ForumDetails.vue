<template>
    <el-container>
      <!-- 帖子内容 -->
      <el-card>
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>
      </el-card>
  
      <!-- 回复列表 -->
      <el-card v-for="reply in replies" :key="reply.id" class="reply-card">
        <p>{{ reply.author }}: {{ reply.content }}</p>
      </el-card>
  
      <!-- 回复框 -->
      <el-input
        type="textarea"
        v-model="newReply"
        placeholder="输入回复..."
      ></el-input>
      <el-button type="primary" @click="submitReply">提交回复</el-button>
    </el-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const post = ref({
    id: 1,
    title: '帖子标题',
    content: '这里是帖子内容，详细介绍帖子内容。',
  });
  
  const replies = ref([
    { id: 1, author: '用户1', content: '这是第一个回复内容。' },
    { id: 2, author: '用户2', content: '这是第二个回复内容。' },
  ]);
  
  const newReply = ref('');
  
  const submitReply = () => {
    if (newReply.value) {
      replies.value.push({ id: replies.value.length + 1, author: '你', content: newReply.value });
      newReply.value = '';
    }
  };
  </script>
  
  <style scoped>
  .reply-card {
    margin-top: 20px;
  }
  </style>
  