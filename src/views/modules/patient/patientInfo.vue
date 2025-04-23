<template>
  <div class="patientInfo">
    <div style="width: auto;overflow: auto;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="item.label" :name="item.value" v-for="(item,index) in tabsList" :key='index'></el-tab-pane>
    </el-tabs>
    </div>
    <div class="chartsBoxInner">
      <div>
        <beforeOperation ref='beforeOperation' v-if="activeName === '0'"></beforeOperation>
        <identification ref='identification' v-if="activeName === '1'"></identification>
        <safeOperationCheck ref='safeOperationCheck' v-if="activeName === '2'"></safeOperationCheck>
        <CORNOperation ref='CORNOperation' v-if="activeName === '3'"></CORNOperation>
        <fuLiaoClean ref='fuLiaoClean' v-if="activeName === '4'"></fuLiaoClean>
      </div>
    </div>
  </div>
</template>
<script>
import beforeOperation from '@/views/modules/patient/charts/beforeOperation'
import identification from '@/views/modules/patient/charts/identification'
import safeOperationCheck from '@/views/modules/patient/charts/safeOperationCheck'
import CORNOperation from '@/views/modules/patient/charts/CORNOperation'
import fuLiaoClean from '@/views/modules/patient/charts/fuLiaoClean'

export default{
  props: ['activePatientInfo'],
  data () {
    return {
      activeName: '0',
      // 切换使用
      activeNameBak: '0',
      tabsList: [
        {
          label: '手术患者交接表(术前)',
          value: '0'
        },
        {
          label: '手术患者辨识单',
          value: '1'
        },
        {
          label: '手术安全核查表',
          value: '2'
        },
        {
          label: 'CORN术中获得压力性损伤风险评估表',
          value: '3'
        },
        {
          label: '手术室感染手术敷料清洗统计表',
          value: '4'
        },
        {
          label: '手术患者交接表(术后)',
          value: '5'
        }
      ]
    }
  },
  components: {
    // 手术患者交接表(术前)
    beforeOperation,
    // 手术患者辨识单
    identification,
    // 手术安全核查表
    safeOperationCheck,
    // CORN术中获得压力性损伤风险评估表
    CORNOperation,
    // 手术室感染手术辅料清洗统计表
    fuLiaoClean

  },
  methods: {
    handleClick (val) {
      if (this.activeName !== this.activeNameBak) {
        if (this.activeName === '0') {
          // 手术患者交接表(术前)
          this.activeNameBak = '0'
          this.$nextTick(() => {
            this.$refs.beforeOperation.getDetails(this.activePatientInfo)
          })

          //
        } else if (this.activeName === '1') {
          // 手术患者辨识单
          this.activeNameBak = '1'
          this.$nextTick(() => {
            this.$refs.identification.getDetails(this.activePatientInfo)
          })

          //
        } else if (this.activeName === '2') {
          // 手术安全核查表
          this.activeNameBak = '2'
          this.$nextTick(() => {
            this.$refs.safeOperationCheck.getDetails(this.activePatientInfo)
          })

          //
        } else if (this.activeName === '3') {
          // CORN术中获得压力性损伤风险评估表
          this.activeNameBak = '3'
          this.$nextTick(() => {
            this.$refs.CORNOperation.getDetails(this.activePatientInfo)
          })

          //
        } else if (this.activeName === '4') {
          // 手术室感染手术敷料清洗统计表
          this.activeNameBak = '4'
          this.$nextTick(() => {
            this.$refs.fuLiaoClean.getDetails(this.activePatientInfo)
          })

          //
        } else if (this.activeName === '5') {
          // 手术患者交接表(术后)
          this.activeNameBak = '5'
          this.$nextTick(() => {
            this.$refs.beforeOperation.getDetails(this.activePatientInfo)
          })

          //
        }
      }
    },
    changePatient () {
      // 手术患者交接表(术前)
      this.activeNameBak = '0'
      this.$nextTick(() => {
        this.$refs.beforeOperation.getDetails(this.activePatientInfo)
      })
    }

  }
}
</script>
<style lang='scss'>
.patientInfo{
  height: 100%;
  background: #fff;
  padding: 10px 10px 0;
  border-radius: 4px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .chartsBoxInner{
    flex: 1;
    overflow: auto;
  }
}
//  单选 选中和禁选按钮样式 start
.el-radio__input{
  height: 16px;
  width: 16px;
}
.el-radio.is-disabled.is-checked .el-radio__input.is-checked{
  background: url(~@/assets/img/uview_isChoosed_unabled.png);
  background-size: 100% 100%;
  cursor: not-allowed;
}
.el-radio.is-disabled .el-radio__input{
  background: url(~@/assets/img/uview_choose_unabled.png);
  background-size: 100% 100%;
  cursor: not-allowed;
}
.el-radio.is-checked .el-radio__input.is-checked{
  background: url(~@/assets/img/uview_isChoosed.png);
  background-size: 100% 100%;
}
.el-radio .el-radio__input{
  background: url(~@/assets/img/uview_choose_unabled.png);
  background-size: 100% 100%;
}
.el-radio__inner{
  display: none;
}
//  单选 选中和禁选按钮样式 end

// 多选 选中和禁选按钮样式 strat
.el-checkbox__input{
  height: 16px;
  width: 16px;
}


.el-checkbox__input{
  height: 16px;
  width: 16px;
  background: url(~@/assets/img/uview_choose_unabled.png);
  background-size: 100% 100%;
}
.el-checkbox__input.is-checked {
  height: 16px;
  width: 16px;
  background: url(~@/assets/img/uview_isChoosed.png);
  background-size: 100% 100%;
}


.el-checkbox__input.is-disabled{
  height: 16px;
  width: 16px;
  background: url(~@/assets/img/uview_choose_unabled.png);
  background-size: 100% 100%;
  cursor: not-allowed;
}
.el-checkbox__input.is-disabled.is-checked {
  height: 16px;
  width: 16px;
  background: url(~@/assets/img/uview_isChoosed_unabled.png);
  background-size: 100% 100%;
  cursor: not-allowed;
}
.el-checkbox.is-disabled .el-checkbox__label{
  color: #606266 !important;
}
.el-checkbox__inner{
  display: none;
}

.el-input.is-disabled .el-input__inner{
  background: #f5f5f5 !important;
  color: #606266 !important;
}
</style>
