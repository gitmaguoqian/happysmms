<template>
  <div class="manage">
    <el-card class="box-card">
      <!-- 卡片头 -->
      <div slot="header" class="clearfix header">
        <span>账号管理</span>
      </div>
      <!-- 中间表单 -->
      <template>
        <el-table
          ref="accountTableData"
          :data="accountTableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <!-- 用户名 -->
          <el-table-column label="用户名称" width="200" prop="account"></el-table-column>

          <!-- 用户组 -->
          <el-table-column label="用户组" width="200" prop="user_group"></el-table-column>

          <el-table-column label="创建时间" width="200">
            <template slot-scope="scope">{{ scope.row.create_date | filtersCtime}}</template>
          </el-table-column>
          <!-- 管理 -->
          <el-table-column label="管理">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>

        <!-- 批量选择框 -->
        <div style="margin-top: 30px">
          <el-button type="primary" @click="batchRemove">批量删除</el-button>
          <el-button type="danger" @click="undelete">取消选择</el-button>
        </div>

        <!-- 修改表单模态框 -->
        <el-dialog title="修改账号" :visible.sync="Visible" width="420px">
          <!-- 修改表单 -->
          <el-form :model="deitForm" ref="deitForm" style="width:316px" :rules="rules">
            <!-- 修改表单 -->
            <el-form-item label="用户名称" label-width="120px" prop="account">
              <el-input v-model="deitForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户组" label-width="120px">
              <el-select v-model="deitForm.user_group" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="Visible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </el-card>
  </div>
</template>

<script>
// 引入事件格式化模块
import moment from "moment";
//引入批量删除函数
import {batchDelete,accountedeet,saveedit,accountdel,getDataByPage} from '@/api/account'
export default {
  data() {
    return {
      accountTableData: [], //获取表格数据
      currentPage: 1, //当前页
      total: 13, //数据总条数
      pageSize: 3, //每页条数
      Visible: false, // 修改模态框的显示和隐藏状态
      dialogFormVisible: false,
      deitForm: {
        //修改表单
        account: "",
        user_group: ""
      },
      editId: "",
      rules: {
        //验证规则
        account: [
          { required: true, message: "账号不能为空", trigger: "change" },
          { min: 3, max: 6, message: "长度在3~5位", trigger: "change" }
        ]
      },
      // 批量删除id数组函数
      delIdArr: []
    };
  },
  methods: {
    //批量删除按钮
     batchRemove() {
      //如果没有选中
      // console.log(this.delIdArr);
      if (!this.delIdArr.length) {
        this.$message.error("请选择以后再操作！");
        return;
      }

      // 优化方案，提高用户体验
      this.$confirm("确认执行批量删除用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //收集参数
          let params = { idArr:this.delIdArr }
          // 前端发送请求
          batchDelete(params)
            .then(res => {
              //  console.log(response.data);
              //前端接受数据
              let { code, reason } = res;
              //判断
              if (code === 0) {
                //弹出成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                //刷新列表
                 this.getAccountByPage()
              } else if (code === 1) {
                //弹出失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
              
            })
        })
        .catch(() => {
          this.$message({
            type:'info',
            message:'已取消批量删除'
          })
        })
    },
    // 表格选中状态改变事件
    handleSelectionChange(val) {
      //循环选中的数组，把每一项的id取出来。放入一个数组中
      this.delIdArr = val.map(v => v.id);
    },
    //批量取消按钮
    undelete() {
      this.$refs.accountTableData.clearSelection();
    },
    // 编辑
    handleEdit(id) {
      // 弹出模态框
      this.Visible = true;
      // 保留id  修改id
      this.editId = id;
      //前端发送连接数据库
      accountedeet({id})
        .then(res => {
          // console.log(response.data);

          //接受后端响应数据
          let { data } = res;
          //回填表单
          this.deitForm.account = data[0].account;
          this.deitForm.user_group = data[0].user_group;
        })
        .catch(err => {
          console.log(err);
        });
      //  接收后端响应数据
      //  console.log( params);
    },
    // 删除
    handleDelete(id) {
      //优化删除体验
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确定走这里
          // 前端发送连接数据库
          accountdel({id})
            .then(res => {
              //接受后端响应数据
              let { code, reason } = res;
              //  console.log(params);
              //判断
              if (code === 0) {
                //成功，弹出成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                //  重新刷新页面
                // this.getAccounts();
                this.getAccountByPage();//调用刷新列表
              } else if (code === 1) {
                //失败 弹出失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 保存修改
    saveEdit() {
      // alert('1')
      // 调用表单的前端验证
      this.$refs.deitForm.validate(valid => {
        if (valid) {
          //隐藏模态框
          this.Visible = false;
          //收集数据
          let params = {
            account: this.deitForm.account,
            user_group: this.deitForm.user_group,
            id: this.editId
          };
          // 发送数据给后端
          saveedit (params)
            .then(res=> {
              // console.log(response);
              //接受后端响应数据
              let { code, reason } = res;
              //判断
              if (code === 0) {
                //成功，弹出修改成功提示
                this.$message({
                  type: "success",
                  message: "用户名修改成功"
                });

                // 调用刷星页面函数
                // this.getAccounts();
                this.getAccountByPage();
              } else if (code === 1) {
                //失败， 弹出修改失败提示
                this.$message.error("用户名修改失败");
              }
            });
        }
      });
    },
    //每页条数
    handleSizeChange(pageSize) {
      // 把用户选择的每页条数获取，复制给data中的pageSize
      this.pageSize = pageSize;
      this.getAccountByPage(); //调用分页请求数据

    },
    //当前页
    handleCurrentChange(currentPage) {
      // 把用户选择的当前页获取，复制给data中的currentPage
      this.currentPage = currentPage;
      this.getAccountByPage(); //调用分页请求数据

    },

    //按照分页请求数据
    getAccountByPage() {
         //收集每条数据和当前页的数据
         let params ={
           pageSize:this.pageSize, //这是用户选择的每条数据
           currentPage:this.currentPage  //用户选择的当前页数的数据
         }
        //发送请求
        getDataByPage(params)
        // this.req.get("http://127.0.0.1:888/account/getAccountByPage", {
        //   params
        // })
        .then(res => {
             //接受后端响应的数据
             let { total, data} = res;
             //渲染前端页面
             this.total  = total;
             this.accountTableData = data;
             //边界判断
             if (!data.length && this.currentPage !== 1) {
               this.currentPage -= 1;
               this.getAccountByPage();
             }
        })
        .catch(err => {
          console.log(err);
          
        })
        
    },
  },
  created() {
    // this.getAccounts(); //调用请求数据函数
    this.getAccountByPage(); //调用分页函数

    
  },
  filters: {
    filtersCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD hh:mm:ss");
    }
  }
};
</script>

<style lang="less">
.manage {
  .el-card {
    height: 600px;
  }
  .el-card__header {
    background-color: #ebeef5;
    font-size: 20px;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>
