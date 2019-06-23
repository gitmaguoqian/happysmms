<template>
  <div class="info">
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <!-- 头部名称 -->
      <div slot="header" class="header clearfix">
        <span>系统信息</span>
      </div>
      <!-- 中间信息 -->
      <div class="item">
        <!-- 提示信息 -->
        <el-alert title="成功提示的文案" type="success" show-icon></el-alert>
        <el-alert title="消息提示的文案" type="info" show-icon></el-alert>

        <!-- 左右表格 -->
        <el-row>
          <el-col :span="11" class="left-table">
              <el-card class="box-card">
              <div slot="header" class="clearfix">
                  <h3>销售排行</h3>
              </div>
            <!-- 左边表格 -->
            <div class="grid-content bg-purple">
                <el-table :data="tableData" height="250" border style="width: 100%">
                  <el-table-column prop="date" label="日期" width="180"></el-table-column>
                  <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
                  <el-table-column prop="address" label="销量"></el-table-column>
                </el-table>
            </div>
            </el-card>
          </el-col>
          <!-- 右边表格 -->
          <el-col :span="11">
              <el-card class="box-card">
              <div slot="header" class="clearfix">
                  <h3>缺货的商品</h3>
              </div>
            <div class="grid-content bg-purple-light">
                <el-table :data="stockoutTable" border stripe style="width: 100%">
                  <el-table-column prop="date" label="日期" width="180"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                  <el-table-column prop="address" label="操作"></el-table-column>
                </el-table>
            </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2019-05-03",
          name: "春素洗发水",
          address: "100"
        },
        {
          date: "2019-05-02",
          name: "五粮液酒",
          address: "200"
        },
        {
          date: "2016-05-04",
          name: "猪儿粑",
          address: "10"
        },
        {
          date: "2019-05-01",
          name: "哇哈哈",
          address: "30"
        },
        {
          date: "2019-05-08",
          name: "中华",
          address: "10"
        },
        {
          date: "2019-05-06",
          name: "荷花",
          address: "90"
        },
        {
          date: "2019-05-07",
          name: "牙膏",
          address: "20"
        }
      ],
      stockoutTable: [
        {
          date: "2016-05-02",
          name: "葡萄干",
          address: "入库"
        },
        {
          date: "2016-05-02",
          name: "夏威夷果",
          address: "入库"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.info {
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    .el-alert{
        margin-top: 10px;
    }
  }

  .clearfix:before
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 100%;

    .el-card__header {
      background-color: #ebeef5;
    }
    .header {
      font-size: 20px;
      color: #000;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .el-row {
      margin-top: 30px;
    }
    .left-table {
      margin-right: 30px;
    }
  }
}
</style>
