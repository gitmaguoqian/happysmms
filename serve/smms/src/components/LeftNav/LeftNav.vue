<template>
  <div class="leftnav">
    <!-- 标题 -->
    <h3 class="title">
      <i class="el-icon-s-platform"></i>
      华联超市系统
    </h3>

    <el-menu
      :default-active="$route.path"
      unique-opened
      active-text-color="rgb(13, 13, 14)"
      background-color="rgba(61, 151, 154)"
      router
    >
      <!--导航1 -->
      <el-submenu :index="(i+1) + ''" v-for="(nav, i) in leftNav" :key="i">
        <template slot="title">
          <i :class="nav.iconCls"></i>
          <span>{{ nav.navTitle }}</span>
        </template>
        <el-menu-item
          v-for="(subNav, i) in nav.children"
          :key="i"
          :index="subNav.path"
        >{{ subNav.navSubTitle }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getRole } from "@/api/account";
export default {
  data() {
    return {
      leftNav: [] //左侧导航栏数据
    };
  }, 
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    // console.log(getRole)
    getRole()
      .then(res => {
        //  console.log(res);
        let { role } = res;
        // console.log(role);
        
        //定义导航数据
        let nav = [
          //左侧导航数据
          //导航一
          {
            iconCls: "el-icon-s-tools",
            navTitle: "系统信息",
            role: ["超级管理员", "普通用户"],
            children: [{ path: "/home/systeminfo", navSubTitle: "系统信息" }]
          },
          // 导航2
          {
            iconCls: "el-icon-s-goods",
            navTitle: "账号管理",
            role: ["超级管理员"],
            children: [
              { path: "/home/accountmanage", navSubTitle: "账号管理" },
              { path: "/home/accountadd", navSubTitle: "账号添加" },
              { path: "/home/passwordmodify", navSubTitle: "密码修改" }
            ]
          },
          // 导航3
          {
            iconCls: "el-icon-edit",
            navTitle: "商品管理",
            role: ["超级管理员", "普通用户"],
            children: [
              { path: "/home/goodsmanage", navSubTitle: "商品管理" },
              { path: "/home/goodsadd", navSubTitle: "商品添加" }
            ]
          },
          // 导航4
          {
            iconCls: "el-icon-notebook-1",
            navTitle: "统计管理",
            role: ["超级管理员"],
            children: [
              { path: "/home/selltotal", navSubTitle: "销售统计" },
              { path: "/home/stocktotal", navSubTitle: "进货统计" }
            ]
          },
          //导航5
          {
            iconCls: "el-icon-circle-plus",
            navTitle: "进货管理",
            role: ["超级管理员", "普通用户"],
            children: [
              { path: "/home/stockcontrol", navSubTitle: "库存管理" },
              { path: "/home/stockadd", navSubTitle: "库存添加" }
            ]
          }
        ];

        //过滤导航
        this.leftNav = nav.filter(v => v.role.includes(role));
      })
      .catch(err => {
        console.log(err);
      });
  },
};
</script>

<style lang="less">
.leftnav {
  .title {
    color: rgb(26, 43, 53);
    font-size: 22px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .el-menu {
    border-right: none;

    .el-submenu {
      .template {
        color: #fff;
        font-size: 20px;
      }

      .el-submenu__title {
        color: #fff;
      }
      i {
        color: rgb(234, 246, 242);
      }
    }
    .el-menu-item {
      color: #fff;
    }
  }
}
</style>
