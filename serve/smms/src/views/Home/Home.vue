<template>
  <div class="home">
      <!-- 类容布局 -->
    <el-container>
        <!-- 左边栏 -->
      <el-aside width="300px">
          <!-- 使用组件 -->
          <LeftNav></LeftNav>
      </el-aside>
      <!-- 右边 -->
      <el-container>
          <!-- 头部 -->
        <el-header>
          <!-- 使用组件 -->
          <RightHeader ref="rigthHeader"></RightHeader>
          
        </el-header>
        <!-- 中间内容 -->
        <el-main>
            <router-view @自定义事件="fn"></router-view>
        </el-main>
        <!-- 脚部 -->
        <el-footer>
          <RightFooter></RightFooter>
        
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
 // 引入左边栏组件
    import LeftNav from '@/components/LeftNav/LeftNav.vue'
    import RightHeader from '@/components/RightHeader/RightHeader.vue'
    import RightFooter from '@/components/RightFooter/RightFooter.vue'


    export default {
    // 注册组件
    components: {
        LeftNav,
        RightHeader,
        RightFooter

    },
    methods:{
      fn() {
        this.$refs.rigthHeader.getUserInfo()
      }
    }
   
};
</script>

<style lang="less">
  .home{
      height: 100%;
    
    // 右侧、
    .el-container{
        height: 100%;
        
        //   左边栏样式
        .el-aside {
        background-color: rgba(2, 41, 43, 0.4);
          border-right:1px solid rgba(2, 41, 43, 0.4);
          border-radius: 3px;
        }
        // 头部
        .el-header{
            padding-left: 30px;
            background-color: rgba(2, 41, 43, 0.4);
            border-bottom:1px solid rgba(2, 41, 43, 0.4);
            border-radius: 3px;


            
        }
        // 中间
        .el-main{
            background-color:#ccc;
        }
        // 页脚
        .el-footer{
            background-color: rgba(2, 41, 43, 0.4);
            border-top:1px solid rgba(2, 41, 43, 0.4);
            border-radius: 3px;
        }
    }
  
  
  }
  
  
</style>
