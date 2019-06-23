<template>
    <div class="stockcon">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>库存管理</span>
            </div>
            <!-- 中间商品管理表格 -->
             <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
              分类:
            <el-select v-model="region" placeholder="--选择分类--">
              <el-option label="生活用品" value="生活用品i"></el-option>
              <el-option label="干鲜" value="干鲜"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple-light">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
          <el-col :span="5">
          <div class="grid-content bg-purple-light">
            <p>  
              <span>（商品名称，条形码）</span>
              <el-button type="info" size="mini">查询</el-button>
            </p>
          </div>
        </el-col>
      </el-row>
      <!-- 商品管理表格 -->
            <el-table
                ref="multipleTable"
                :data="management"
                stripe
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >


                <el-table-column
                prop="code"
                label="商品条形码"
                width="120">
                </el-table-column>

                <el-table-column
                prop="name"
                label="商品名称"
                width="120">
                </el-table-column>

                <el-table-column
                prop="classify"
                label="进价（元）"
                show-overflow-tooltip>
                </el-table-column>

               <el-table-column
                prop="sellprice"
                label="入库"
                show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                prop="promotion"
                label="库存"
                show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                prop="marketPrice"
                label="已售"
                show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                prop="management"
                label="管理"
                show-overflow-tooltip>
                <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                </el-table-column>

            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
       data() {
        return {
            region:'',
            input: "",
            management: [{
                code: '12324453656',
                name: '洗发水',
                classify: '20',
                sellprice:'5',
                promotion:'4',
                marketPrice:'2',
                inventory:'80',
                address:'48347',
                gross:'567',
                management:'',


                },{
                code: '12324453656',
                name: '洗发水',
                classify: '90',
                sellprice:'5',
                promotion:'4',
                marketPrice:'2',
                inventory:'80',
                gross:'567',
                management:'',


                },
            ],
            currentPage: 1,  // 当前页
            total: 13, // 数据总条数
            pageSize: 3,// 每页条数
            multipleSelection: []
        }
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 每页条数 改变
            handleSizeChange() {
            
            },
            //当前页 改变
            handleCurrentChange() {

            }
        }
    }
</script>

<style lang="less">
   .stockcon{
        .el-card{
        
            height: 600px;
         }
        .el-card__header{
          background-color: #ebeef5;
          font-size: 20px;
        } 
         .el-row {
            font-size: 16px;
            border-bottom: 2px solid #ccc;
            padding-bottom: 20px;
            border
            .el-col{
                height: 40px;
                line-height: 40px;
            }
        }
   }
</style>
