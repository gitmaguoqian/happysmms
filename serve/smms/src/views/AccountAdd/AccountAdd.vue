<template>
  <div class="account-add">
      <!-- 卡片头 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>添加账号</span>
        </div>
            <!-- 中间添加账号表单 -->
        <el-form 
            :model="accountAddForm"
            status-icon
            :rules="rules" 
            ref="accountAddForm" 
            label-width="100px" 
           
            >
            <!-- 账号 -->
            <el-form-item label="账号" prop="account">
                <el-input type="text" v-model="accountAddForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="accountAddForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item label="确认密码" prop="checkPass">
                <el-input v-model="accountAddForm.checkPass"></el-input>
            </el-form-item>
            <!-- 用户组 -->
            <el-form-item label="选择用户组" prop="userGroup">
                <el-select v-model="accountAddForm.userGroup" placeholder="选择用户组">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通用户" value="普通用户"></el-option>
                </el-select>
            </el-form-item>
            <!-- 提交按钮 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  
  </div>
</template>

<script>
    //引入正则表达式工具函数
   import { pwdReg } from '@/utils/reg'

     //引入api中得请求文件
     import {accountAdd} from '@/api/account'
   export default {
        data() {
            // 自定义验证函数
            //密码
            const checkPwd = (rule, value, callback) => {
                //获取密码的长度
                let len = value.length;
                //判断验证规则
                if(value === '') {
                    callback(new Error('密码不能为空'))
                } else if(len < 3 || len > 5) {
                    callback(new Error('密码长度在 3 ~ 5 位'))
                } else if (!pwdReg(value)) {
                    callback( new Error('只可以输入字母数字'))
                } else {
                    if( this.accountAddForm.checkPass !== '') {
                        // 再次触发一致性验证
                        this.$refs.accountAddForm.validateField('checkPass')
                    }
                    callback();
                }
            }
            // 确认密码验证
            const confirmPwd = (rule, value, callback) => {
                //获取输入框的值是否为空
                if( value === '') {
                    callback(new Error('请再次输入密码'))
                } else if( value !== this.accountAddForm.password) {
                    callback(new Error('两次密码不一致'))
                } else{
                    callback();
                }
            }
      return {
        //   添加账号表单数据 （和表单双向绑定）
        accountAddForm: {
          account: '', //账户
          password: '', //密码
          checkPass: '', //确认密码
          userGroup:'' //用户组
        },
        // 自定义验证规则
        rules: {
            // 账号
          account: [
            { required:true, message:'请输入账号', trigger:'blur'}, //验证非空
            {min:3, max:5, message:'长度在3 到 5 个字符', trigger:'blur'} //长度验证
          ],
        //   密码验证
          password: [
            { required:true, validator: checkPwd, trigger: 'blur' } //非空验证
          ],
        //   确认密码验证
          checkPass: [
            { required:true, validator: confirmPwd, trigger: 'change' }, //非空验证
          ],
          //用户组验证
           userGroup:[
                { required:true, message:'请选择用户组', trigger: 'change' }, //非空验证
           ]
        },
      };
    },
    //   提交按钮规则
    methods: {
      submitForm() {
        //   获取整个表单，调用验证方法
        this.$refs.accountAddForm.validate((valid) => {
          if (valid) {
            // 收集参数
            let params = {
                account:this.accountAddForm.account,
                password:this.accountAddForm.password,
                userGroup:this.accountAddForm.userGroup
            }
            // console.log(params);
            
            // 数据发送给后端
            accountAdd( params )
                .then(res => {
                  // console.log(response.data);
                  // 接受后端响应数据
                  let {code, reason} = res;
                  //判断
                  if (code === 0 ) {
                    this.$message({
                      //成功，弹出成功提示
                      message:reason,
                      type:'success',
                    })
                    this.$router.push('/home/accountmanage') //成功跳到账号管理
                  } else if (code === 1 ) {
                    this.$message.error(reason); //失败，弹出失败提示
                  }
                })
                .catch(err => {
                  console.log(err);
                  
                })
            
          } else {
            console.log('验证不通过，不允许提交');
            return false;
          }
        });
      },   
      resetForm() {
        this.$refs.accountAddForm.resetFields();  //调用表单重置方法
      }
    }
  }

</script>

<style lang="less">
.account-add {
    // 卡片样式
  .el-card {
    height: 600px;
    .el-card__header {
      background-color: #ebeef5;
    }
    .header {
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
//   卡片宽度
  .box-card {
    width: 100%;
  }

   //验证表单样式
   .el-form{
       width: 30%;
       margin: 0 auto;
       margin-top: 30px;
   }
}
</style>
