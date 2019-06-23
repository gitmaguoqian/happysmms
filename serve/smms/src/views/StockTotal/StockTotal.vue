<template>
    <div class="selltotal">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售统计</span>
            </div>
            <div id="sellCharts" style="height:400px; width:100%;"></div>
               

        </el-card>
    </div>
</template>

<script>
//引入请求数据函数
    export default {
         mounted() {
             let selltotal = this.echarts.init(document.getElementById("sellCharts"));
             //配置值
              let option = {
                  title: {
                        text: "进价和售价"
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["进价", "售价"]
                    },
                    toolbox: {
                        show: true,
                        feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ["line", "bar"] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                        }
                    },
                    calculable: true,
                xAxis: {
                    type: 'category',
                    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
                },
                yAxis: {
                    type: 'value'
                },
                 series: [
                    {
                    name: "售价",
                    type: "bar",
                    data: [3091, 2412, 5542, 4923, 4396, 6914, 4923],
                    markPoint: {
                        data: [
                        { type: "max", name: "最大值" },
                        { type: "min", name: "最小值" }
                        ]
                    },
                    markLine: {
                        data: [{ type: "average", name: "平均值" }]
                    }
                    },
                    {
                    name: "进价",
                    type: "bar",
                    data: [1221, 998, 2478, 2265, 2134, 2899, 1859],
                    markPoint: {
                        data: [
                        { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                        { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
                        ]
                    },
                    markLine: {
                        data: [{ type: "average", name: "平均值" }]
                    }
                    }
                ]
             };
            //使用
            selltotal.setOption(option);
         }
    }
</script>

<style lang="less">
   .selltotal{
        .el-card{
        
            height: 600px;
        }
        .el-card__header{
          background-color: #ebeef5;
          font-size: 20px;
        }  
   }
</style>
