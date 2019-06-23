<template>
  <div class="right-header">
    <el-row>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <i class="el-icon-menu"></i>
          华联超市管理系统
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light name">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ account }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple avatr">
          <img :src="avatarUrl" alt="#">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入本地存储
import local from "@/utils/local";
//引入请求函数
import { getInfo } from "@/api/account";

export default {
  data() {
    return {
      account: "", //账号名
      avatarUrl: "" //头像地址
    };
  },
  methods: {
    handleCommand(command) {
      //获取退出系统
      if (command === "logout") {
        //清楚token
        window.localStorage.removeItem("hhh_token");
        //弹出提示信息
        this.$message({
          type: "success",
          message: "已退出系统，欢迎回来哦"
        });
        //直接跳转到登录页面
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);

        //获取个人中心
      } else if(command === 'personal') {
          //跳转到个人中心
          this.$router.push('/home/personal')
      }
    },
    getUserInfo() {
      //发送请求
      getInfo()
       .then(res => {
           //接收数据
           let { data } =res;
           //获取账号
           let { account, avatarUrl} =data [0]
           this.account = account;//渲染账号
           this.avatarUrl = 'http://127.0.0.1:888' + avatarUrl;//渲染头像地址
       })
       .catch(err => {
           console.log(err);
           
       })
    }
  },
  created() {
      //请求当前登录的用户xinxi
      this.getUserInfo();
  }
 
};
</script>

<style lang="less">
.right-header {
  padding-top: 5px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: #000;
  .el-col {
    .name {
      text-align: right;
      .el-dropdown-link {
        cursor: pointer;
        color: #000;
      }
      .el-dropdown {
        .el-dropdown-menu {
          background-color: aqua;
        }
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
    .avatr {
      margin-left: 30px;
      height: 50px;
      width: 50px;
      background-color: aqua;
      border-radius: 50%;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
