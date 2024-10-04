<script  setup>
import { onMounted, ref,nextTick,computed } from 'vue'
import {useTokenStore} from '@/stores/token.js'
import {Plus,View} from '@element-plus/icons-vue'
//导入富文本
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {drugsListService,drugsAddService,drugsUpload} from '@/api/drugs.js'
import { useRouter } from 'vue-router'
const router = useRouter();

const loading = ref(true)

//控制添加分类弹窗
const visibleDrawer = ref(false)
//添加表单数据模型
const drugsModel = ref({
    name: '',
    description: '',
    coverImg:''
})


const setLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

loading.value = false






const tokenStore = useTokenStore();

//上传成功的回调函数
const uploadSuccess = (result)=>{
  drugsModel.value.coverImg = result.data;
}
const searchKeyword=ref('')


const Drug = {
  id: 0,
  name: '',
  description: '',
  coverImg: '',
  createUser: 0,
  createTime: '',
  updateTime: ''
};


// 假设这是你的数据源
const lists = ref([
  // 示例数据
  // { name: "Item 1", coverImg: "https://example.com/image1.jpg"},
  
])
// 分页参数
const pageSize = 15;
//总数量
const totalItems = ref(0);
//当前页
const currentPage = ref(1);
// 计算分页后的列表
const paginatedLists = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return lists.value.slice(start, end);
});

//获取药物列表数据
const drugsList = async ()=>{
    let params = {
        searchKeyword: searchKeyword.value ? searchKeyword.value : null
    }
    let result = await drugsListService(params);
    
    //重新加载数据
    lists.value = result.data;
    console.log('lists的值：',lists)
    totalItems.value = lists.value.length;
    
    
}
// 定义重置方法
const resetForm = async () => {
  
  searchKeyword.value = '';
  await nextTick(); // 等待DOM更新
  drugsList(); // 调用搜索逻辑
};
//添加药物
const addDrugs = async ()=>{
  //调用接口
  let result = await drugsAddService(drugsModel.value);
  ElMessage.success(result.message ? result.message : '前端：添加成功')
  //让抽屉消失
  visibleDrawer.value = false;
  //刷新当前列表
  drugsList()
}
drugsList()


// 分页改变事件
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
};



// 当前日期
const currentDate = ref(new Date().toLocaleDateString());
const uploadData = ref({
  type: 'drugs'
});
const listDrugs = (id) =>{
  console.log('点击查看详情',id)
   // 正确拼接 URL
   const url = `/drugs/details?id=${encodeURIComponent(id)}`;
  window.open(url, '_blank');
}
</script>
<template>

  <el-card class="page-container">

    <div class="header">

      <div class="extra">

      </div>
    </div>

    <!-- 搜索表单 -->
    <el-form inline>


      <el-form-item label="搜索药物：">
        <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 200px"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="drugsList">搜索</el-button>

        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="visibleDrawer=true">添加药物</el-button>
      </el-form-item>
    </el-form>

    <!--添加抽屉 -->
    <el-drawer v-model="visibleDrawer" title="添加药物" direction="rtl" size="50%">
      <!-- 添加文章表单 -->
      <el-form :model="drugsModel" label-width="100px">
        <el-form-item label="药物名称">
          <el-input v-model="drugsModel.name" placeholder="请输入药名"></el-input>
        </el-form-item>
        <el-form-item label="药物封面">
          <!-- auto-upload是否自动上传图片 action设置服务器接口路径 name上传名字 headers上传请求头 onsuccess成功的回调函数-->
          <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
            action="http://localhost:8080/upload" name="file" :headers="{ 'Authorization': tokenStore.token }"
            data="uploadData" :on-success="uploadSuccess"> 
            <img v-if="drugsModel.coverImg" :src="drugsModel.coverImg" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="药物描述">
          <div class="editor">
            <quill-editor theme="snow" v-model:content="drugsModel.description" contentType="html"></quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDrugs()">确定</el-button>

        </el-form-item>
      </el-form>
    </el-drawer>


    <!-- 展示列表 -->
    <el-space style="width: 100%" fill>
      <el-skeleton style="display: flex; gap: 8px; flex-wrap: wrap;" :loading="loading" animated :count="3">
        <template #template>
          <div style="flex: 1">
            <el-skeleton-item variant="image" style="height: 240px" />
            <div style="padding: 14px">
              <el-skeleton-item variant="h3" style="width: 50%" />
              <div
                style=" display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px; ">
                <el-skeleton-item variant="text" style="margin-right: 16px" />
                <el-skeleton-item variant="text" style="width: 30%" />
              </div>
            </div>
          </div>
        </template>
        <template #default>
          <!-- 绑定数据 -->
          <el-card v-for="item in paginatedLists" :key="item.id" :body-style="{ padding: '0px', marginBottom: '1px' }"
            style="flex-basis: calc(33.33% - 8px); margin-bottom: 8px;">
            <img :src="item.coverImg" class="image multi-content" style="max-width: 100%" />
            <div style="padding: 14px">
              <span>{{ item.name }}</span>
              <div class="bottom card-header">
                <div class="time">{{ currentDate }}</div>
                <el-button type="primary"  @click="listDrugs(item.id)">
                    <el-icon >
                      <View />
                    </el-icon>
                </el-button>
              </div>
            </div>
          </el-card>
        </template>
      </el-skeleton>
    </el-space>
    <!-- 分页组件 -->
    <el-pagination background layout="prev, pager, next" :total="totalItems" :page-size="pageSize"
      :current-page="currentPage" @current-change="handleCurrentChange" />

  </el-card>
</template>
<style lang="scss" scoped>
.pagination-container {  
  display: flex;  
  justify-content: flex-end;  
  align-items: center; /* 如果需要垂直居中 */  
  margin-top: 20px; /* 保持之前的上边距 */  
}  
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
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
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style> 
  
 