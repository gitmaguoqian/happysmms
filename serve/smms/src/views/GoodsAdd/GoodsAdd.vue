<template>
  <div class="add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品添加</span>
      </div>
      <!-- 中间商品添加表单 -->
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="goodsForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 所属分类 -->
        <el-form-item label="所属分类:" prop="region">
          <el-select v-model="goodsForm.region" placeholder="--选择分类--">
            <el-option label="干鲜" value="干鲜"></el-option>
            <el-option label="水果" value="水果"></el-option>
            <el-option label="烟酒类" value="烟酒类"></el-option>
            <el-option label="粮油" value="粮油"></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品条形码 -->
        <el-form-item label="商品条形码:" prop="barCode">
          <el-input v-model="goodsForm.barCode"></el-input>
          <el-button type="primary">生成条形码</el-button>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称:" prop="name">
          <el-input v-model="goodsForm.name"></el-input>
        </el-form-item>
        <!-- 商品进价 -->
        <el-form-item label="商品进价:" prop="price">
          <el-input @blur = "autoPrice" v-model="goodsForm.price"></el-input>
          <span>元</span>
        </el-form-item>
        <!-- 商品售价 -->
        <el-form-item label="商品售价:" prop="market">
          <el-input v-model="goodsForm.market"></el-input>
          <span>元</span>
        </el-form-item>
        <!-- 市场价 -->
        <el-form-item label="市场价:" prop="purchasing">
          <el-input v-model="goodsForm.purchasing"></el-input>
          <span>元</span>
        </el-form-item>
        <!-- 入库数量 -->
        <el-form-item label="入库数量:" prop="quantity">
          <el-input v-model="goodsForm.quantity"></el-input>
        </el-form-item>
        <!-- 商品重量 -->
        <el-form-item label="商品重量:" prop="weight">
          <el-input v-model="goodsForm.weight"></el-input>
        </el-form-item>
        <!-- 商品单位 -->
        <el-form-item label="商品单位:" prop="unit">
          <el-input v-model="goodsForm.unit"></el-input>
        </el-form-item>
        <!-- 会员优惠 -->
        <el-form-item label="会员优惠:" prop="discounts">
          <el-radio-group v-model="goodsForm.discounts">
            <el-radio label="享受"></el-radio>
            <el-radio label="不享受"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 是否促销 -->
        <el-form-item label="是否促销:" prop="promotion">
          <el-radio-group v-model="goodsForm.promotion">
            <el-radio label="启用"></el-radio>
            <el-radio label="不启用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 商品简介 -->
        <el-form-item label="商品简介：" prop="textarea">
          <el-input type="textarea" v-model="goodsForm.textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即创建</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入企业级封装
import { goodsadd } from "@/api/goosAdd";
export default {
  data() {
    return {
      goodsForm: {
        region: "", //所属分类
        barCode: "", //条形码
        name: "", //商品名称
        price: "", //商品进价
        market: "", //市场价
        purchasing: "", //售价价
        quantity: "", //入库数量
        weight: "", //商品重量
        unit: "", //商品单位
        discounts: "", //会员优惠
        promotion: "", //是否促销
        textarea: "", //商品简介
        delivery: false
      },
      rules: {
        //所属分类
        region: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        //条形码
        barCode: [
          { required: true, message: "请输入商品条形码", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20个字符", trigger: "blur" }
        ],
        //商品名称
        name: [
          { required: true, message: "请输入商品商品名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20个字符", trigger: "blur" }
        ],
        //商品售价
        price: [
          { required: true, message: "请输入商品商品售价", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20个字符", trigger: "blur" }
        ],
        //市场价
        market: [
          { required: true, message: "请输入商品商品市场价", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20个字符", trigger: "blur" }
        ],
        //商品进价
        purchasing: [
          { required: true, message: "请输入商品进价", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20个字符", trigger: "blur" }
        ],
        //入库数量
        quantity: [
          { required: true, message: "请输入商品入库数量", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20个字符", trigger: "blur" }
        ],
        //商品重量
        weight: [
          { required: true, message: "请输入商品入库数量", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20个字符", trigger: "blur" }
        ],
        //商品单位
        unit: [
          { required: true, message: "请输入商品单位", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20个字符", trigger: "blur" }
        ],
        //会员优惠
        discounts: [
          { required: true, message: "请选择会员优惠方式", trigger: "change" }
        ],
        //是否促销
        promotion: [
          { required: true, message: "请选择是否促销", trigger: "change" }
        ],
        //商品简介
        textarea: [
          { required: true, message: "请输入商品简介", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //自动补全售价和职场价
    autoPrice() {
      this.goodsForm.market = (parseFloat(this.goodsForm.price) * 1.5).toFixed(2)
      
    },
    //提交函数
    submitForm() {
      this.$refs.goodsForm.validate(valid => {
        if (valid) {
          //收集表单参数
          let params = {
            region: this.goodsForm.region, //所属分类
            barCode: this.goodsForm.barCode, //条形码
            name: this.goodsForm.name, //商品名称
            price: this.goodsForm.price, //商品售价
            market: this.goodsForm.market, //市场价
            purchasing: this.goodsForm.purchasing, //商品进价
            quantity: this.goodsForm.quantity, //入库数量
            weight: this.goodsForm.weight, //商品重量
            unit: this.goodsForm.unit, //商品单位
            discounts: this.goodsForm.discounts, //会员优惠
            promotion: this.goodsForm.promotion, //是否促销
            textarea: this.goodsForm.textarea //商品简介
          };
          //前端发送请求
          goodsadd(params).then(res => {
            //接受后端响应数据
            let {code, reason} = res;
            //判断
            if (code === 0) {
              this.$message({
                //成功 弹出成功提示
                message: reason,
                type: "success"
              });
              this.$router.push("/home/goodsmanage"); //跳转到商品管理页面
            } else if (code === 1) {
              this.$message.error(reason); //失败，弹出失败提示
            }
          })
          .catch(err => {
            console.log(err);
            
          })
        } else {
          console.log("验证不通过，不能提交");
          return false;
        }
      });
    },

    resetForm() {
      this.$refs.goodsForm.resetFields();
    }
  }
};
</script>

<style lang="less">
.add {
  .el-card {
  }
  .el-card__header {
    background-color: #ebeef5;
    font-size: 20px;
  }
  //  中间添加商品样式
  .el-form {
    // 输入框的样式
    .el-input {
      width: 200px;
    }
    .el-input--suffix {
      .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
