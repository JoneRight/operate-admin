<template>
  <div class="followup-box inner-content">
    <div class="inner inner-content-box">
      <el-form :inline="true" :model="searchForm" @keyup.enter.native="getDataList(1)">
        <el-form-item>
          <el-input v-model="searchForm.patientName" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm.mobile" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-select v-model="searchForm.type" clearable placeholder="随访类型">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-select v-model="searchForm.status" clearable placeholder="状态">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="flex-start" style="align-items: flex-start;">
            <el-button type="primary" @click="getDataList(1)">查询</el-button>
          <p class="flex-start" style="align-items: flex-start;margin: 2px 0 0 10px; cursor: pointer;" @click="waitingChange"><el-tag type="danger" effect="dark" size="large">脱落待随访：{{ waitingCount }}</el-tag></p>
          </div>
        </el-form-item>
      </el-form>
      <div class="table-box" ref="tableBox">
        <el-table
          :data="dataList"
          :height="tableHeight"
          border
          size="small"
          @selection-change="selectionChangeHandle"
          @cell-dblclick="cellclick"
          style="width: 100%;">
          <el-table-column
            label="序号"
            type="index"
            fixed="left"
            header-align="center"
            align="center"
            width="70">
          </el-table-column>
          <el-table-column
            minWidth="90"
            prop="patientName"
            header-align="center"
            align="center"
            label="用户名">
          </el-table-column>
          <el-table-column
            minWidth="130"
            prop="mobile"
            header-align="center"
            align="center"
            label="手机号">
          </el-table-column>
            <el-table-column
            minWidth="160"
            prop="contactsMobile"
            header-align="center"
            align="center"
            label="性别">
          </el-table-column>
          <el-table-column
            minWidth="90"
            prop="userName"
            header-align="center"
            align="center"
            label="真实姓名">
          </el-table-column>
          <el-table-column
            minWidth="90"
            prop="status"
            header-align="center"
            align="center"
            label="用户类型">
            <template slot-scope="scope">
              <div> {{ computedStatus(scope.row.status) }}</div>
            </template>
          </el-table-column>
          <el-table-column
            minWidth="110"
            prop="type"
            header-align="center"
            align="center"
            label="所属院校">
            <template slot-scope="scope">
              <div> {{ computedType(scope.row.type) }}</div>
            </template>
          </el-table-column>
          <el-table-column
            minWidth="160"
            prop="shouldDate"
            sortable
            header-align="center"
            align="center"
            label="用户版本">
          </el-table-column>
          <el-table-column
            minWidth="160"
            prop="endDate"
            header-align="center"
            align="center"
            label="创建时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            minWidth="100">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status === 1" @click="showClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button v-if="scope.row.status === 0 || scope.row.status === 2" @click="handleClick(scope.row)" type="text" size="small">去随访</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-end">
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import jsonData from '@/assets/json/data.json'
export default {
  data () {
    return {
      typeList: jsonData.typeList,
      statusList: jsonData.statusList,
      searchForm: {
        type: '2'
      },
      // 带随访数目
      waitingCount: '',
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      addOrUpdateVisible: false,
      updateValue: '',
      tableHeight: 0,
      historyVisible: false,
      submitVisible: false,
      patientDetails: {}
    }
  },
  created () {
    setTimeout(() => {
      this.tableHeight = this.$refs.tableBox.scrollHeight
    }, 100)
    this.getDataList()
    // 获取带随访数量
    // this.getaaa()
  },
  methods: {
    waitingChange () {
      this.searchForm = {
        type: '2',
        status: '0'
      }
      this.getDataList(1)
    },
    computedType (val) {
      let Arr = this.typeList.filter(item => {
        return item.value === String(val)
      })
      if (Arr.length > 0) {
        return Arr[0].label
      } else {
        return '暂无'
      }
    },
    computedStatus (val) {
      let Arr = this.statusList.filter(item => {
        return item.value === String(val)
      })
      if (Arr.length > 0) {
        return Arr[0].label
      } else {
        return '暂无'
      }
    },
    cellclick (row, column) {
      if (this.isAuth('sys:config:update')) {
        if (column.label === '参数名') {
          this.$set(row, 'isOK', true)
        }
        if (column.label === '参数值') {
          this.$set(row, 'isOK1', true)
        }
        if (column.label === '备注') {
          this.$set(row, 'isOK2', true)
        }
        this.updateValue = row[column.property]
        this.$nextTick(() => {
          this.$refs.gain.focus()
        })
      }
    },
    blurClick ({row, column}) {
      if (column.label === '参数名') {
        this.$set(row, 'isOK', false)
      }
      if (column.label === '参数值') {
        this.$set(row, 'isOK1', false)
      }
      if (column.label === '备注') {
        this.$set(row, 'isOK2', false)
      }
      if (this.updateValue !== row[column.property]) {
        this.$http({
          url: '/sys/config/update',
          method: 'post',
          data: {
            'id': row.id || undefined,
            'paramKey': row.paramKey,
            'paramValue': row.paramValue,
            'remark': row.remark
          }
        }).then(({data}) => {
          this.getDataList()
          if (data && data.code === 0) {
            this.$message({
              message: '更新成功',
              type: 'success',
              duration: 1500
            })
          }
        })
      }
    },
    // 获取数据列表
    getDataList (page) {
      console.log(jsonData)
      if (page) {
        this.pageIndex = page
      }
      this.$http({
        url: '/drugstore/visit/list',
        method: 'get',
        params: {
          'page': this.pageIndex,
          'limit': this.pageSize,
          'patientName': this.searchForm.patientName,
          'mobile': this.searchForm.mobile,
          'type': this.searchForm.type,
          'status': this.searchForm.status
        }
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.page.records
          this.totalPage = data.page.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
      let ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm('确定对所选项进行[删除]操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: '/sys/config/delete',
          method: 'post',
          data: ids
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500
            })
            this.getDataList()
          }
        })
      }).catch(() => {
      })
    },
    handleClick (val) {
      this.submitVisible = true
      this.patientDetails = val
      this.$refs.submitChildren.getPatientInfo(this.patientDetails.patientId)
      this.$refs.submitChildren.getAnswer()
    },
    showClick (val) {
      // 如果失访的话，直接提示
      if (val.status === 2) {
        this.$message({
          message: '此任务的患者已失访',
          type: 'warning'
        })
      } else {
        this.historyVisible = true
        this.patientDetails = val
        this.$refs.children.getPatientInfo(this.patientDetails.patientId)
      }
    },
    closeHistory () {
      this.historyVisible = false
    },
    closeSubmit () {
      this.submitVisible = false
    },
    closeSubmitSearch () {
      this.submitVisible = false
      this.getDataList()
    }
  }
}
</script>
<style lang="scss">
  .followup-box{
    .inner{
      .table-box{
        flex: 1;
        width: 100%;
      }
    }
  }
</style>
