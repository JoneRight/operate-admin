<template>
  <div class="indexBox">
    <div class="indexBox-container">
      <div class="top">
        <div class="topTitle">今日数据</div>
        <div class="topDes">数据时间 2024-02-02</div>
      </div>
      <div class="bottom">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bottomBox">
              <div class="bottomBoxLeft">
                <div>手术台数</div>
                <div class="num">32</div>
                <div class="numDes">较昨日 <span :class="1==1 ? 'redColor':'greenColor'">-2%</span></div>
              </div>
              <div class="bottomBoxRight">
                <div ref="chartRef1"></div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bottomBox">
              <div class="bottomBoxLeft">
                <div>手术医生</div>
                <div class="num">32</div>
                <div class="numDes">较昨日 <span :class="1==1 ? 'redColor':'greenColor'">-2%</span></div>
              </div>
              <div class="bottomBoxRight">
                <div ref="chartRef2"></div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bottomBox">
              <div class="bottomBoxLeft">
                <div>手术科室</div>
                <div class="num">32</div>
                <div class="numDes">较昨日 <span :class="1==2 ? 'redColor':'greenColor'">+2%</span></div>
              </div>
              <div class="bottomBoxRight">
                <div ref="chartRef3"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="indexBox-container">
      <div class="top">
        <div class="topTitle topTitle2">年数据</div>
        <div class="topDes">2024</div>
      </div>
      <div class="bottom2">
        <div class="inner2" id="chartRef4">
          <div ref="chartRef4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from '@antv/g2'
export default {
  data () {
    return {
      chart1: null,
      chart2: null,
      chart3: null,
      chart4: null
    }
  },
  mounted () {
    this.initChart1()
    this.initChart2()
    this.initChart3()
    this.initChart4()
  },
  methods: {
    initChart1 () {
      if (!this.$refs.chartRef1) {
        return
      }

      this.chart1 = new Chart({
        container: this.$refs.chartRef1,
        width: 120,
        height: 130,
        padding: [16, 0, 20, 0]
      })
      const data = [
        { type: '02-02', value: 60 },
        { type: '02-03', value: 55 }
      ]
      this.chart1.data(data)
      this.chart1.scale('value', { nice: true })
      this.chart1
        .interval()
        .position('type*value')
        .color('type', ['#8FEBE3', '#00BEAE'])
        .style({
          fillOpacity: 0.8
        })
        .label('value', {
          position: 'top',
          offset: 0,
          style: {
            fill: '#666',
            fontSize: 12
          }
        })
        .tooltip('type*value', (type, value) => {
          return { name: '台数', value }
        })
      this.chart1.data(data)
      this.chart1.axis('value', {
        label: null,
        grid: {
          line: {
            style: {
              lineDash: [2, 2],
              stroke: '#00001A25'
            }
          }
        }
      })
      this.chart1.legend(false)
      this.chart1.render()
    },
    initChart2 () {
      if (!this.$refs.chartRef2) {
        return
      }

      this.chart2 = new Chart({
        container: this.$refs.chartRef2,
        width: 120,
        height: 130,
        padding: [16, 0, 20, 0]
      })
      const data = [
        { type: '02-02', value: 40 },
        { type: '02-03', value: 38 }
      ]
      this.chart2.data(data)
      this.chart2.scale('value', { nice: true })
      this.chart2
        .interval()
        .position('type*value')
        .color('type', ['#C4BDFC', '#6859ED'])
        .style({
          fillOpacity: 0.8
        })
        .label('value', {
          position: 'top',
          offset: 0,
          style: {
            fill: '#666',
            fontSize: 12
          }
        })
        .tooltip('type*value', (type, value) => {
          return { name: '医生', value }
        })
      this.chart2.data(data)
      this.chart2.axis('value', {
        label: null,
        grid: {
          line: {
            style: {
              lineDash: [2, 2],
              stroke: '#00001A25'
            }
          }
        }
      })
      this.chart2.legend(false)
      this.chart2.render()
    },
    initChart3 () {
      if (!this.$refs.chartRef3) {
        return
      }

      this.chart3 = new Chart({
        container: this.$refs.chartRef3,
        width: 120,
        height: 130,
        padding: [16, 0, 20, 0]
      })
      const data = [
        { type: '02-02', value: 0 },
        { type: '02-03', value: 1 }
      ]
      this.chart3.data(data)
      this.chart3.scale('value', { nice: true })
      this.chart3
        .interval()
        .position('type*value')
        .color('type', ['#FFD588', '#F8A713'])
        .style({
          fillOpacity: 0.8
        })
        .label('value', {
          position: 'top',
          offset: 0,
          style: {
            fill: '#666',
            fontSize: 12
          }
        })
        .tooltip('type*value', (type, value) => {
          return { name: '科室', value }
        })
      this.chart3.data(data)
      this.chart3.axis('value', {
        label: null,
        grid: {
          line: {
            style: {
              lineDash: [2, 2],
              stroke: '#00001A25'
            }
          }
        }
      })
      this.chart3.legend(false)
      this.chart3.render()
    },
    initChart4 () {
      if (!this.$refs.chartRef4) {
        return
      }

      this.chart4 = new Chart({
        container: this.$refs.chartRef4,
        width: document.getElementById('chartRef4').clientWidth,
        height: 240,
        padding: [10, 20, 60, 40]
      })
      const data = [
        { date: '一月', type: '手术台数', value: 30 },
        { date: '二月', type: '手术台数', value: 80 },
        { date: '三月', type: '手术台数', value: 45 },
        { date: '四月', type: '手术台数', value: 45 },
        { date: '五月', type: '手术台数', value: 45 },
        { date: '六月', type: '手术台数', value: 45 },
        { date: '七月', type: '手术台数', value: 45 },
        { date: '八月', type: '手术台数', value: 45 },
        { date: '九月', type: '手术台数', value: 45 },
        { date: '十月', type: '手术台数', value: 45 },
        { date: '十一月', type: '手术台数', value: 45 },
        { date: '十二月', type: '手术台数', value: 45 },
        { date: '一月', type: '手术医生', value: 40 },
        { date: '二月', type: '手术医生', value: 60 },
        { date: '三月', type: '手术医生', value: 70 },
        { date: '四月', type: '手术医生', value: 40 },
        { date: '五月', type: '手术医生', value: 60 },
        { date: '六月', type: '手术医生', value: 70 },
        { date: '七月', type: '手术医生', value: 40 },
        { date: '八月', type: '手术医生', value: 60 },
        { date: '九月', type: '手术医生', value: 70 },
        { date: '十月', type: '手术医生', value: 40 },
        { date: '十一月', type: '手术医生', value: 60 },
        { date: '十二月', type: '手术医生', value: 70 },
        { date: '一月', type: '手术科室', value: 50 },
        { date: '二月', type: '手术科室', value: 90 },
        { date: '三月', type: '手术科室', value: 60 },
        { date: '四月', type: '手术科室', value: 50 },
        { date: '五月', type: '手术科室', value: 90 },
        { date: '六月', type: '手术科室', value: 60 },
        { date: '七月', type: '手术科室', value: 50 },
        { date: '八月', type: '手术科室', value: 90 },
        { date: '九月', type: '手术科室', value: 60 },
        { date: '十月', type: '手术科室', value: 50 },
        { date: '十一月', type: '手术科室', value: 90 },
        { date: '十二月', type: '手术科室', value: 60 }
      ]
      this.chart4.data(data)
      this.chart4.scale('value', { nice: true })
      this.chart4
        .line()
        .position('date*value')
        .color('type', ['#00BEAE', '#FAB73E', '#8979FF'])
        .size(2)
        .style({
          fillOpacity: 0.8
        })
      this.chart4.tooltip({
        showCrosshairs: true,
        shared: true,
        showItemMarker: true
      })
      this.chart4
        .point()
        .position('date*value')
        .color('type', ['#00BEAE', '#FAB73E', '#8979FF'])
        .size(4)
        .shape('hollowCircle')
        .style({
          lineWidth: 2,
          fill: '#fff'
        })
      this.chart4.axis('date', {
        grid: {
          line: {
            style: {
              lineDash: [2, 2],
              stroke: '#00001A25'
            }
          }
        },
        line: {
          style: {
            // stroke: '#00001A',
            lineWidth: 1
          }
        },
        tickLine: {
          style: {
            // stroke: '#00001A',
            lineWidth: 1
          }
        }}
      )
      this.chart4.axis('value', {
        grid: {
          line: {
            style: {
              lineDash: [2, 2],
              stroke: '#00001A25'
            }
          }
        },
        line: {
          style: {
            stroke: '#00001A25',
            lineDash: [2, 2],
            lineWidth: 1
          }
        },
        tickLine: null,
        position: 'left'
      })
      this.chart4.render()
    }
  },
  beforeDestroy () {
    if (this.chart1) {
      this.chart1.destroy()
    }
    if (this.chart2) {
      this.chart2.destroy()
    }
    if (this.chart3) {
      this.chart3.destroy()
    }
    if (this.chart4) {
      this.chart4.destroy()
    }
  }
}
</script>
<style lang='scss'>

.indexBox{
  height: calc(100vh - 92px);
  background: #F8FAFA;
  padding: 20px;
  display: flex;
  flex-direction: column;
  .indexBox-container {
    background: #fff;
    border-radius: 8px;
    margin-bottom: 20px;
    .top{
      padding: 20px 24px;
      border-bottom: 1px solid #F1F3F4;
      .topTitle{
        height: 24px;
        line-height: 24px;
        font-size: 20px;
        color: #333333;
        font-weight: 600;
      }
      .topTitle2{
        height: 24px;
        line-height: 24px;
        padding: 6px 0 0;
        box-sizing: content-box;
      }
      .topDes{
        font-size: 14px;
        color: #757575;
        padding-top: 8px;
      }
    }
    .bottom{
      padding: 16px 20px;
      .bottomBox{
        padding: 20px 20px 20px;
        border-radius: 10px;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
        display: flex;
        .bottomBoxLeft{
          flex: 1;
          height: 130px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #1F1F1F;
          font-weight: 500;
          font-size: 16px;
          .num{
            font-family: 'PingFang SC, PingFang SC';
            font-weight: 600;
            font-size: 36px;
            color: #1F1F1F;
            padding: 12px 0 4px;
          }
          .numDes{
            color: #757575;
            font-size: 14px;
            font-weight: 400;
            .redColor{
              padding-top: 8px;
              color: #FF0000;
            }
            .greenColor{
              color: #00C861;
            }
          }
        }
        .bottomBoxRight{
          width: 122px;
          height: 110px;
          // background: rgb(147, 187, 187);
        }
      }
    }
    .bottom2{
      padding: 20px;
      .inner2{
        // background: rgb(142, 142, 204);
        width: 100%;
        height: 220px;
      }
    }
  }
  .conBox{
    padding: 10px 20px;
    width: 100%;
    background: #fff;
    margin-top: 16px;
    border-radius: 8px;
  }
}
</style>
