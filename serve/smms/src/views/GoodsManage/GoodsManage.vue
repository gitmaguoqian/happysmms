<template>
  <div class="GoodsManage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <!-- 中间商品管理 -->
      <!-- 头部查询 -->
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="分类">
          <el-select v-model="searchForm.region" placeholder="--选择分类--">
            <el-option label="全部分类" value="全部分类"></el-option>
            <el-option label="烟酒" value="烟酒"></el-option>
            <el-option label="干鲜" value="干鲜"></el-option>
            <el-option label="粮油" value="粮油"></el-option>
            <el-option label="水果" value="水果"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="关键字">
          <el-input v-model="searchForm.keyWord" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 商品管理表格 -->
      <template>
        <el-table
          ref="goodsTableData"
          :data="goodsTableData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 条形码 -->
          <el-table-column prop="barCode" label="商品条形码" width="120"></el-table-column>
          <!-- 商品名称 -->
          <el-table-column prop="name" label="商品名称" width="120"></el-table-column>
          <!-- 所属分类 -->
          <el-table-column prop="region" label="所属分类" show-overflow-tooltip></el-table-column>
          <!-- 售价 -->
          <el-table-column prop="market" label="售价（元）" show-overflow-tooltip></el-table-column>
          <!-- 是否促销 -->
          <el-table-column prop="promotion" label="是否促销"></el-table-column>
          <!-- 日期 -->
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
          </el-table-column>
          <!-- 管理 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>
              </el-button>
              <!-- 删除按钮 -->
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 分页 -->
      <div style="margin-top:20px">
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

      <!-- 批量删除 -->
      <div style="margin-top: 20px">
        <el-button size="small" type="danger" @click="batchRemove">批量删除</el-button>
        <el-button size="small" type="primary" @click="undelete">取消选择</el-button>
      </div>
      <!-- 修改表单模块按钮 -->
      <el-dialog title="修改账号" width="420px" :visible.sync="visible">
        <!-- 修改表单 -->
        <el-form ref="editForm" :model="editForm" style="width: 316px" :rules="rules">
          <!-- 条形码 -->
          <el-form-item label="条形码" prop="barCode" label-width="120px">
            <el-input v-model="editForm.barCode" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="name" label-width="120px">
            <el-input v-model="editForm.name" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 所属分类-->
          <el-form-item label="所属分类" label-width="120px">
            <el-select v-model="editForm.region" placeholder="请选择分类">
              <el-option label="干鲜" value="干鲜"></el-option>
              <el-option label="水果" value="水果"></el-option>
              <el-option label="烟酒" value="烟酒"></el-option>
              <el-option label="粮油" value="粮油"></el-option>
            </el-select>
          </el-form-item>

          <!-- 售价 -->
          <el-form-item label="售价" prop="market" label-width="120px">
            <el-input v-model="editForm.market" autocomplete="off"></el-input>
          </el-form-item>

          <!--  是否促销-->
          <el-form-item label="是否促销:" prop="promotion" style="margin-left:50px">
            <el-radio-group v-model="editForm.promotion">
              <el-radio label="启用"></el-radio>
              <el-radio label="不启用"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!-- 修改表单按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
//引入时间格式化模块
import moment from "moment";
// 引入企业级封装路由
import {
  goodslistBypage,
  singledataDelete,
  goodsaddedeet,
  saveedit,
  goodsDelete
} from "@/api/goosAdd";
export default {
  data() {
    return {
      goodsTableData: [], //商品表格
      editForm: {}, //修改表格
      visible: false, // 修改模态框是否显示
      searchForm: {//查询表单
         region:'',
         keyWord:''
      }, 
      region: "",
      rules: {
        //  条形码
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" }
        ],
        //  商品名称
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        //所属分类
        region: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ],
        // 售价
        market: [
          { required: true, message: "商品售价不能为空", trigger: "blur" }
        ],
        // 是否促销
        promotion: [
          { required: true, message: "请选择商品是否促销", trigger: "blur" }
        ]
      }, //验证规则
      input: "",
      currentPage: 1, // 当前页
      total: 13, // 数据总条数
      pageSize: 3, // 每页条数
      editId: "", //保留id
      delIdArr: [] //批量删除数组函数
    }
  },
  methods: {
    //模糊查询
    search() {
      //调用分页函数
      this.getData();
      //收集参数
      // let params = {
      //   category:this.searchForm.category,
      //   keyWord:this.searchForm.keyWord
      // }
      // //发送给后端
      // searchGoods(params)
    },
    // 每页条数
    handleSizeChange(pageSize) {
      //每页条数改变
      this.pageSize = pageSize;
      this.getData(); //调用分页函数
    },
    // 当前页改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    },
    //单条数据删除
    handleDelete(id) {
      //优化删除体验
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          singledataDelete({ id })
            .then(res => {
              //接受后端数据
              let { code, reason } = res;
              //判断
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                //调用刷新页面
                this.getData();
              } else if (code === 1) {
                this.$message.eror(reason);
              }
            })
            .catch(() => {
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
    // 保存编辑修改
    handleEdit(id) {
      //弹出模态框
      this.visible = true;
      //保留id 修改id
      this.editId = id;
      //前端发送连接数据库
      goodsaddedeet({ id })
        .then(res => {
          //接受后端得数据
          let { data } = res;
          //回填表单
          this.editForm = data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存修改
    saveEdit() {
      //调用表单得前端验证
      this.$refs.editForm.validate(valid => {
        if (valid) {
          //隐藏模态框
          this.visible = false;
          //收集表单参数
          let params = {
            barCode: this.editForm.barCode,
            name: this.editForm.name,
            region: this.editForm.region,
            market: this.editForm.market,
            promotion: this.editForm.promotion,
            id: this.editId
          };
          //发送数据给后端
          saveedit(params).then(res => {
            //接受后端响应数据
            let { code, reason } = res;
            //判断
            if (code === 0) {
              //成功
              this.$message({
                type: "success",
                message: reason
              });
              //调用刷新页面
              this.getData();
            } else if (code === 1) {
              // 失败
              this.$message.error(err);
            }
          });
        }
      });
    },
    // 表格选中状态改变事件
    handleSelectionChange(val) {
      //循环选中得数组，把每一项得id取出来，放入一个数组
      this.delIdArr = val.map(v => v.id);
    },
    // 批量删除
    batchRemove() {
      // 如果没有选中
      if (!this.delIdArr.length) {
        this.$message.error("请选择以后再操作！");
        return;
      }
      //优化方案
      this.$confirm("请确认执行批量删除商品吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //收集参数
          let params = { idArr: this.delIdArr };
          goodsDelete(params)
            .then(res => {
              //接受后端数据
              let { code, reason } = res;
              //判断
              if (code === 0) {
                //成功
                this.$message({
                  type: "success",
                  message: reason
                });
                //刷新列表
                this.getData();
              } else if (code === 1) {
                //弹出失败提示
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
            message: "已取消批量删除"
          });
        });
    },
    // 取消选择
    undelete() {
      this.$refs.goodsTableData.clearSelection();
    },
     //分页函数
    getData() {
      //分页函数
      //收集参数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        region: this.searchForm.region, //查询分类
        keyWord: this.searchForm.keyWord
      };
      //前端发送请求
      goodslistBypage(params)
        .then(res => {
          //接受数据
          let { data, total } = res;
          //渲染数据
          this.goodsTableData = data;
          this.total = total;
          //  //边界判断
          //  if(!data.length && this.currentPage !==1){
          //    this.currentPage -=1;
          //    this.getData();//调用分页函数
          //  }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //分页函数
    this.getData();
  },
  filters: {
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang="less">
.GoodsManage {
  .el-card {
    height: 600px;
  }
  .el-card__header {
    background-color: #ebeef5;
    font-size: 20px;
  }
  .el-row {
    font-size: 16px;
    border-bottom: 2px solid #ccc;
    padding-bottom: 20px;
    border .el-col {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
