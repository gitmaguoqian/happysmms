<template>
    <div class="modify">
        <el-card class="box-card">
            <!-- 卡片头 -->
            <div slot="header" class="clearfix">
                <span>账号密码修改</span>
            </div>
            <!-- 密码修改表单 -->
             <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码" prop="oldpass">
                    <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpass">
                    <el-input type="password" v-model="ruleForm.newpass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirmPwd">
                    <el-input type="password" v-model="ruleForm.confirmPwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
//  引入正则表达式工具函数
  import { pwdReg } from '@/utils/reg'
  // 引入laocl
  import local from '@/utils/local'
  // 引入封装好的函数
  import {passwordModify, checkoldpass} from '@/api/account'
  export default {
          data() {
            // 自定义验证函数
            const checkOldPwd = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('旧密码不能为空')) 
              } else {
                //把旧密码发送给后端
                checkoldpass({oldPwd:value})
                 .then(res => {
                   //接收数据
                   let {code, reason} =res;
                   if (code === 1) {
                     callback(new Error(reason)) //密码错误提示
                   } else if (code === 0)
                   callback()
                 })
                 .catch (err => {
                   console.log(err);
                   
                 })
              }
            }
              // 新密码的验证规则
              const newpassword = (rule, value, callback) => {
                // 获取密码的长度
                let len = value.length;
                if (value === '') {
                  callback(new Error('密码不能为空'));
                } else if (value === this.ruleForm.oldpass) {
                      callback(new Error('新密码不能与旧密码相同'))
                }else if(len < 3 || len > 5) {
                  callback(new Error('密码长度在3~5位'))
                } else if (!pwdReg(value)) {
                  callback(new Error('只可以输入字母数字'))
                } else {
                  if(this.ruleForm.confirmPwd !== '') {
                    //再次触发一致性验证
                    this.$refs.ruleForm.validateField('confirmPwd')
                  }
                  callback();
                }
              };
              // 确认密码验证
              const checkPassword = (rule, value, callback) => {
                // 获取输入框的值是否为空
                if (value === '') {
                  callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.newpass) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
              };
        
      return {
        // 密码修改表单数据
        ruleForm: {
          oldpass:'', //原密码
          newpass: '', //新密码
          confirmPwd: '', //确认密码
        },
        // 自定义验证规则
        rules: {
          // 原密码
          oldpass: [
            { required:true, validator: checkOldPwd, trigger: 'blur' }, //验证非空
          ],
          // 新密码
          newpass: [
            { required:true, validator: newpassword, trigger: 'blur' }, //长度验证
          ],
          // 确认密码
          confirmPwd: [
            { equired:true, validator: checkPassword, trigger: 'blur' }, //非空验证
          ]
        }
      };
    },
    // 提价按钮规则
    methods: {
      submitForm() {
        // 获取整个表单，调用验证方法
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            // 发送请求数据给后端
            passwordModify({ newpass:this.ruleForm.newpass })
            .then(res=>{
              //接收数据
              let {code, reason} =res;
              //判断
              if (code === 0) {
                //成功
                this.$message({
                  type:'success',
                  message:reason
                })
                //清除token
                local.remove('hhh_token')
                // 跳转 重新登录
                this.$router.push('/login')
             
              } else if (code === 1) {
                //失败
                this.$message.error(reason)
              }
            })
            .catch(err => {
             
              
            })
         
          } else {
            console.log('前端验证不能通过，密码修改不能通过');
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
    .modify{
        .el-card{
          height: 600px;
        }
       .el-card__header{
          background-color: #ebeef5;
          font-size: 20px;
        } 
        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }

        .box-card {
            width:100%;
        }
        .el-form {
            width: 40%;
            margin: 0 auto;
            margin-top: 30px;
        }
    }
</style>
