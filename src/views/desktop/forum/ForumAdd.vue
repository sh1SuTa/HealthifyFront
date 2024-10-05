<script setup>
import { ref } from 'vue';
//导入富文本
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const newPost = ref({
  title: '',
  type: '',
  content: '',
});
const options = [
  {
    value: 'question',
    label: '提问帖',
  },
  {
    value: 'knowledge',
    label: '知识帖',
  },
  {
    value: 'other',
    label: '其他帖',
  }
]

const submitPost = () => {
  console.log('新帖已发布:', newPost.value);
};
</script>

<template>
    <el-form :model="newPost"  >
        
        <el-form-item label="帖子标题">
            <el-input style="width: 50%;" v-model="newPost.title"></el-input>
        </el-form-item>
        <el-form-item label="帖子类型">
            <el-select    v-model="newPost.type"  placeholder="请选择"    style="width: 240px">
                <el-option  v-for="item in options" :key="item.value"  :label="item.label"  :value="item.value"/>
            </el-select>
        </el-form-item>
        <el-form-item label="帖子内容" class="custom-form-item">
            <div>
                <QuillEditor v-model="newPost.content" theme="snow" class="quill-editor" />
            </div>
        </el-form-item>
        <el-form-item label="发布帖子">
            <el-button type="primary" @click="submitPost">发布</el-button>
        </el-form-item>
    </el-form>

  
    
</template>
<style lang="scss" scoped>

.quill-editor {
  width: 100%; /* 设置编辑器宽度为100% */
}

:deep(.ql-editor) {
  min-height: 600px; /* 设置 Quill 编辑器内容区域的最小高度 */
  min-width: 1500px;
}



</style>

  