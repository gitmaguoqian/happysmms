<template>
    <div class="stockadd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品入库</span>
            </div>
            <!-- 中间商品入库 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品条形码" prop="stockadd">
                    <el-input type="text" v-model="ruleForm.stockadd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="quantity">
                    <el-input type="text" v-model="ruleForm.quantity" autocomplete="off"></el-input>
                    <p>计重商品单位为千克</p>
                </el-form-item>
                <el-form-item label="进价" prop="price">
                    <el-input type="text" v-model="ruleForm.price"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('')">入库</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
          return {
            ruleForm: {
              stockadd: '', //商品条形码
              quantity: '', //商品数量
              price: '' //商品进价
            },
            rules: {
              stockadd: [
                { requird:true, message:'商品条形不能为空不能为空', trigger: 'blur' }
              ],
              quantity: [
                { requird:true, message:'单位不能为空', trigger: 'blur' }
              ],
              price: [
                { requird:true, message:'进价不能为空', trigger: 'blur' }
              ]
            }
          };
    },
    methods: {
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      }
    }
    }
</script>

<style lang="less">
   .stockadd{
         .el-card{
            
             height: 600px;
         }
        .el-card__header{
          background-color: #ebeef5;
          font-size: 20px;
        } 
        .el-form{
            margin-top: 30px;
            width: 30%;
            .el-form-item {
                
                .el-form-item__content{
                    line-height: 20px;
                }
                p{
                   font-size: 12px;
                }
            }
        }
   }

</style>
