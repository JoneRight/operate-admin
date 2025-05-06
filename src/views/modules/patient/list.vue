<template>
  <div class="searchListBox">
    <div class="search-container">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-row>
          <!-- 遍历搜索字段 -->
          <el-col :span='6'>
            <el-form-item label="日期：">
              <el-date-picker
                size='small'
                v-model="searchForm.operateDate"
                style='min-width: 10px'
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :clearable="true"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item label="状态：">
              <el-select v-model="searchForm.status" :clearable="true" placeholder="请选择状态" size='small' style="width: 100%;">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item label="手术间科室：">
              <el-select v-model="searchForm.operateRoom" :clearable="true" placeholder="请选择手术间科室" size='small' style="width: 100%;">
                <el-option
                  v-for="item in deptColumns"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='6' v-if="isExpanded">
            <el-form-item label="手术间号码：">
              <el-select v-model="searchForm.roomNo" :clearable="true" placeholder="请选择手术间号码" size='small' style="width: 100%;">
                <el-option
                  v-for="item in roomColumns"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='6' v-if="isExpanded">
            <el-form-item label="病人信息：">
              <el-input v-model="searchForm.patientInfo" :clearable="true" placeholder="病人信息" size='small' style="width: 100%;" />
            </el-form-item>
          </el-col>
          <!-- 搜索 & 重置按钮 也占据一个框的位置 -->
          <el-col :span="6">
            <el-form-item>
              <div style="display: flex; justify-content: center; align-items: center;">
                <el-button type="primary" @click="search" size='small'>搜索</el-button>
                <el-button @click="reset" size='small'>重置</el-button>
                <el-button type="text" @click="toggleExpand" size='small'>
                  {{ isExpanded ? '收起' : '展开' }}
                  <i :class="isExpanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                </el-button>
              </div>

            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="conBox-z">
      <div class="conBoxLeft">
        <listBox ref='listBox' :patientList="patientList" :activePatientId='activePatientId' @choosePat='choosePat' ></listBox>
      </div>
      <div class="conBoxRight">
        <patientInfo ref='patientInfo' :activePatientInfo="activePatientInfo"></patientInfo>
      </div>
    </div>
  </div>
</template>

<script>
import listBox from '@/views/modules/patient/listBox'
import patientInfo from '@/views/modules/patient/patientInfo'
import { fetchList, hospitaldept, hospitalroom } from '@/api/patient.js'
export default {

  data () {
    return {
      stateOptions: [
        {
          label: '2',
          value: '0'
        },
        {
          label: '2',
          value: '1'
        }
      ],
      statusOptions: [
        {
          text: '待送房送患者',
          value: '0'
        },
        {
          text: '待手术间送患者',
          value: '1'
        },
        {
          text: '手术结束待归档',
          value: '2'
        },
        {
          text: '已经完成归档',
          value: '100'
        }
      ],
      isExpanded: false,
      searchForm: {

        operateDate: '',
        status: '',
        operateRoom: '',
        roomNo: ''

      },
      patientInfoDes: {

      },
      activePatientId: '',
      activePatientInfo: {},
      // 患者列表
      patientList: [],

      // 手术间科室
      deptColumns: [],

      // 手术间号码
      roomColumns: []
    }
  },

  created () {
    this.getHospitaldept()
    setTimeout(() => {
      this.getList()
    }, 10)
  },
  components: {
    listBox,
    patientInfo
  },
  methods: {
    // 获取科室
    getHospitaldept () {
      hospitaldept().then(res => {
        console.log(res.data.list)
        res.data.list.map(v => {
          v.text = v.deptName
          v.value = v.deptCode
        })
        this.deptColumns = res.data.list
        this.searchForm.operateRoom = res.data.list[1].deptCode
        this.getHospitalroom(this.searchForm.operateRoom)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取手术间号码
    getHospitalroom (deptCode) {
      hospitalroom({deptCode}).then(res => {
        res.data.list.map(v => {
          v.text = v.roomNo
          v.value = v.roomNo
        })
        this.roomColumns = res.data.list
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取患者列表
    getList () {
      let operateRoom = ''
      if (this.searchForm.operateRoom) {
        operateRoom = this.deptColumns.filter(v => {
          return v.value === this.searchForm.operateRoom
        })[0].text
      }
      let params = {
        page: 1,
        limit: 100000,
        operateDate: this.searchForm.operateDate,
        status: this.searchForm.status,
        patientInfo: this.searchForm.patientInfo,
        operateRoom: operateRoom,
        roomNo: this.searchForm.roomNo,
        orderSql: 'status asc'
      }
      fetchList(params).then(res => {
        if (res.data.page.records.length > 0) {
          this.patientList = res.data.page.records
          if (this.patientList.length > 0) {
            this.activePatientId = this.patientList[0].id
            this.activePatientInfo = this.patientList[0]
            // 进来后接着获取患者详情
            this.$refs.listBox.changePatientList(this.patientList)
            // 进来后接着获取患者详情
            this.$refs.patientInfo.changePatient()
          } else {
            this.$refs.listBox.changePatientList([])
          }
        }
      })
    },
    // 获取患者信息
    search () {
      console.log('搜索条件:', this.searchForm)
      this.getList()
    },
    reset () {
      // Object.keys(this.searchForm).forEach(key => this.searchForm[key] = "");
    },
    toggleExpand () {
      this.isExpanded = !this.isExpanded
    },
    choosePat (val) {
      // 选择患者
      this.activePatientId = val.id
      this.activePatientInfo = JSON.parse(JSON.stringify(val))
      this.$refs.patientInfo.changePatient()
    }
  }
}
</script>
<style lang='scss'>

.searchListBox{
  height: calc(100vh - 92px);
  background: #F8FAFA;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .el-form-item {
    margin-bottom: 2px !important;
    display: flex !important;
    .el-form-item__content{
      flex: 1 !important;
      margin-right: 10px !important;
    }
    .el-form-item__label{
      padding-right: 2px !important;
    }
  }
  .search-container {
    background: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .conBox-z{
    flex: 1;
    width: 100%;
    background: #fff;
    margin-top: 16px;
    border-radius: 8px;
    display: flex;
    overflow: auto;
    .conBoxLeft{
      width: 260px;
      min-width: 260px;
      max-width: 260px;
      border-right: 1px dotted rgba(0, 0, 0, 0.5);
      height: 100%;
    }
    .conBoxRight{
      // padding: 10px;
      flex: 1;
      background: #f5f5f5;
      padding: 10px;
      height: 100%;
      box-sizing: border-box;
      overflow: auto;
    }
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: auto !important;
  }
}
</style>
