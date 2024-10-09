<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

const carouselItems = ref(
  'http://nfk.putileaf.top/wp-content/uploads/2024/10/sport-e1728282861384.jpg' 
  );
</script>

<template>
  <el-row type="flex" justify="center"  style="margin-top: 100px;">
    <el-col :span="8" style="margin-left: 300px;">
      <h2  class="text item" style="font-size: 48px;margin-top: 90px;">简洁、美观、实用的、<br>健康管理平台。</h2>
      <p class="text item" style="font-size: 24px;">
      一个简单、易用的健康管理平台，<br>
      让用户能够轻松地记录和分享自己的健康信息。<br>
      通过分析用户的健康数据，<br>
      为用户提供更准确的健康建议和健康指导。<br>

      </p>
      <el-button index="/login" type="success" style="width: 250px;height: 50px;">登录</el-button>
      <el-button  style="width: 200px;height: 52px;">注册</el-button>
    </el-col>
    <el-col :span="11">
      <el-image :src=carouselItems alt="Carousel Image" style="margin-top: 90px;width: 80%; height: 80%; opacity: 0.5;margin-right: 150px;border-radius: 15px;" />
    </el-col>
    
    
    
    
  </el-row>
  <el-row justify="center" style="margin-top: 90px;">
    <h2 style="font-size: 20px;color: green">功能</h2>
  </el-row>
  <el-row justify="center" style="">
    <h2 style="font-size: 40px;color: ">化繁为简</h2>
  </el-row>
  <el-row style="">
    
    <div class="featuresList">
			<div class="featureItem">
				
				<div>
          <div style="display: flex; align-items: center;">
            <el-icon color="green"><Search /></el-icon>
            <h4 style="margin-left: 10px;">搜索</h4>
          </div>
					<p>强大的搜索功能，寻找你需要的文章。</p>
				</div>
			</div>
			<div class="featureItem">
				<div><i>&#xe733;</i></div>
				<div>
					<h4>网站捷径</h4>
					<p>添加您的常用网站，一键快捷访问。</p>
				</div>
			</div>
			<div class="featureItem">
				<div><i>&#xe75d;</i></div>
				<div>
					<h4>便笺</h4>
					<p>随时记录您的灵感、待办事项和备忘清单。</p>
				</div>
			</div>
			<div class="featureItem">
				<div><i>&#xe74e;</i></div>
				<div>
					<h4>壁纸</h4>
					<p>将您喜爱的任意图片或视频设为壁纸，或使用精选的动态壁纸和每日壁纸。</p>
				</div>
			</div>
			<div class="featureItem">
				<div><i>&#xe75c;</i></div>
				<div>
					<h4>随心自定义</h4>
					<p>30+ 个性化设置，打造专属于您的起始页。</p>
				</div>
			</div>
		</div>
  </el-row>
          
      
  
</template>
<style lang="scss" scoped>
.featuresList{
  margin-left: 100px;
}

</style>