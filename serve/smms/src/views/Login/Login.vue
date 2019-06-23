<template>
  <div class="login">
    <div class="login-wrap">
      <h3 class="title">
        <i class="el-icon-s-custom"></i>
        华联超市管理系统
      </h3>
      <!-- 表单框 -->
      <el-form
        class="loginForm"
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        
      >
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  // 引入工具函数
  import { pwdReg } from '@/utils/reg';
  // 引入企业级封装
  import { chenckLogin} from '@/api/login'
  // 引入本地存储封装
  import local from '@/utils/local'
export default {
    data() {
          //  自定义验证函数
           //验证密码
           const checkpwd = (rule, value, callback) => {
             //获取值得长度
             const len = value.length;

             if (value === '') {
               callback(new Error('密码不能为空')) //非空
             } else if (len < 3 || len > 6 ) {   //长度
                  
             } else if (!pwdReg( value )) {
               callback(new Error('只可以输入字母数字')) //正则
             } else {
               //确认密码不能为空 触发一致性验证
               if (this.loginForm.checkPass !== '') {
                 this.$refs.loginForm.validateField('checkPass')  //触发确认密码的一致性
               }
               callback() //成功
             }
           }

          //  验证确认密码
          const confirmPwd = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码')) //验证非空

            } else if (value !== this.loginForm.password) {
              callback(new Error('两次密码不一致'))  //一致性
            } else {
              callback();  //成功
            }
          }

            return {
                // 登录表单数据
                loginForm: {
                    account: '',  // 账号
                    password: '', // 密码
                    checkPass: '' // 确认密码
                },
                // 验证规则
                rules: {
                    /* 
                    1. 内置验证： 复制粘贴，改一下
                        required: true 必填
                        message:  提示信息
                        trigger:  触发方式
                        min:   最小
                        max：  最大

                    2. 自定义验证
                    */

                    // 账号
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' }, //非空验证
                        { min: 3, max:5, message:'长度在4 到 5个字符', trigger: 'blur' } //长度验证          
                        
                    ],
                    // 密码
                    password: [
                        { required: true, validator:checkpwd, trigger: 'blur' }, // 非空验证
                       
                    ],
                    // 确认密码
                    checkPass: [
                        { required: true, validator:confirmPwd, trigger: 'blur' }, // 非空验证
                       
                    ]
                }
            }
        },
        methods: {
            // 登录
            submitForm() {
                // 页面中使用ref属性声明的标签dom，可以使用 this.$refs.ref属性的值 获取
                // element内置了验证方法 validate 传入一个函数 函数中的变量如果是true就验证通过 否则验证不通过

                // 获取el-form组件 调用验证方法
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        //收集参数
                        let params = {
                          account: this.loginForm.account,
                          password:this.loginForm.password
                        }
                        //前端发送请求
                        chenckLogin(params)
                        // this.req.post("http://127.0.0.1:888/login/chenckLogin", this.qs.stringify(params))
                        //前端接受数据
                          .then(res => {                         
                            let {code, reason, token} = res;
                            //判断
                            if (code === 0) {
                              // console.log('我登陆成功了', token)
                              // 把tocken存入本地存储
                              window.localStorage.setItem('hhh_token', token)
                              //成功，
                              this.$message({
                                type:'success',
                                message:reason
                              })
                              this.$router.push('/home')  //跳转到后台
                            } else if (code === 1) {
                              //失败
                              this.$message.error(reason) //弹出失败提示
                            }
                          })
                          .catch(err => {
                            console.log(err);
                            
                          })

          
                        
                    } else {
                        console.log('前端验证不通过！');
                        return false;
                        
                    }
                })
            },
            // 重置
            resetForm() {
                // 获取el-form表单 调用内置重置方法
                this.$refs.loginForm.resetFields();
            }
        }
 
};
</script>

<style lang="less">
//   引入样式
@import "./login.less";
</style>
