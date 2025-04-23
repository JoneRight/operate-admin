<template>
  <div class="addStudent">
    <el-dialog title="考题库导入考题" :lock-scroll="false" :close-on-click-modal="false" :fullscreen="true"
      :visible.sync="editVisable" width="860px" :before-close="close">
      <div class="content">
        <div class="top">
          <p>考题列表</p>
          <div class="base-info">
            <el-form class="search-form" :inline="true" :model="searchForm" @keyup.enter.native="getTestList(1)">
              <el-form-item>
                <el-input v-model="searchForm.examName" placeholder="考题名称" clearable style="width: 160px"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="flex-start" style="align-items: flex-start">
                  <el-button type="primary" @click="getTestList(1)" icon="el-icon-search">查询</el-button>
                  <el-button @click="clearHandle()" icon="el-icon-delete-solid">清空</el-button>
                </div>
              </el-form-item>
              <br/>
              <el-form-item>
                <div class="flex-start" style="align-items: flex-start">
                  <el-button :disabled='selectDataList.length == 0' type="success" @click="bindItem('branch')" icon="icon iconfont icon-daoru">绑定</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="mid">
          <el-table :data="dataList" :height="tableHeight" border size="mini" style="width: 100%;" height='30%'
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="序号" type="index" fixed="left" header-align="center" align="center" width="70">
            </el-table-column>
            <el-table-column minWidth="130" prop="examName" header-align="center" align="center" label="考题名称">
            </el-table-column>
            <el-table-column width="130" prop="deptName" header-align="center" align="center" label="考题类型">
            </el-table-column>
            <el-table-column minWidth="230" prop="examText" header-align="center" align="center" label="考题题干"
              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column width="120" prop="examTime" header-align="center" align="center" label="时长">
            </el-table-column>
            <el-table-column width="120" prop="examTotalScore" header-align="center" align="center" label="分值">
            </el-table-column>
            <el-table-column width="120" prop="createUserName" header-align="center" align="center" label="管理员">
            </el-table-column>
            <el-table-column width="160" prop="creatDate" header-align="center" align="center" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" align="center" label="操作" width="80">
              <template slot-scope="scope">
                <el-button title="绑定" icon="icon iconfont icon-daoru" type="success" circle size="mini"
                  @click='bindItem(scope.row)'></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="bot">
          <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
            :page-sizes="[20, 100, 500]" :page-size="pageSize" :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { saveExamination, examinationListCheck } from '@/api/testLibrary.js'
export default{
  props: {
    editVisable: {
      type: Boolean,
      default: false
    },
    testObj: {
      type: Object,
      default: {}
    },
    tableHeight: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dataList: [],
      selectDataList: [],
      searchForm: {

      },
      pageIndex: 1,
      pageSize: 20,
      totalPage: 0
    }
  },
  methods: {
    // 导出
    exportData () {
      let params = {
        studentPoolId: this.testObj.id
      }
      this.$http({
        url: '/excel/student/getWord',
        method: 'get',
        responseType: 'blob',
        params: params
      }).then(({ data }) => {
        var binaryData = []
        binaryData.push(data)
        let blob = new Blob(binaryData, {
          // type: ' application/vnd.ms-excel '
          type: ' application/msword'
        })
        console.log(blob)
        setTimeout(() => {
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, 'link')
          } else {
            const link = document.createElement('a')
            console.log(window.URL.createObjectURL)
            link.download = this.testObj.studentPool
            link.style.display = 'none'
            link.href = window.URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click()
            URL.revokeObjectURL(link.href)
            document.body.removeChild(link)
            this.$message.success(`${this.testObj.studentPool}导出成功`)
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    close () {
      this.$emit('child-event')
    },
    getTestList (page) {
      if (page) {
        this.pageIndex = page
      }
      console.log(this.testObj.id)
      examinationListCheck({
        page: this.pageIndex,
        limit: this.pageSize,
        examName: this.searchForm.examName,
        examPoolId: this.testObj.id,
        orderSql: 'creat_date desc'
      }).then(res => {
        let aaaa = []
        res.data.page.records.map(item => {
          aaaa.push(item.studentIdcard)
        })
        this.dataList = res.data.page.records
        this.totalPage = res.data.page.total
      })
    },

    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getTestList()
    },

    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getTestList()
    },
    clearHandle () {
      this.searchForm = {}
      this.pageIndex = 1
      this.getTestList()
    },
    handleSelectionChange (val) {
      this.selectDataList = val
    },
    bindItem (val) {
      const h = this.$createElement
      this.$msgbox({
        title: '绑定',
        message: h('p', {style: 'width: 400px;'}, [
          h('span', {class: 'icon iconfont icon-daoru', style: 'color: #67C23A;padding-right: 10px;font-size: 20px;font-weight:600;'}, ''),
          h('span', { style: 'color: #666' }, '请确认是否绑定?')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            let params = {
              examPoolId: this.testObj.id
            }

            if (val === 'branch') {
              let aaa = []
              this.selectDataList.map(item => {
                aaa.push(item.id)
                // aaa.push({id: item.id})
              })
              params.examinationIDs = JSON.parse(JSON.stringify(aaa))
            } else {
              params.examinationIDs = [val.id]
            }
            console.log(params)
            saveExamination(params).then(res => {
              done()
              instance.confirmButtonLoading = false
              if (res.data.code === 0) {
                this.$message.success('操作成功')
              }
              this.getTestList()
            }).catch(err => {
              console.log(err)
              done()
              instance.confirmButtonLoading = false
            })
          } else {
            done()
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.addStudent{
  .el-dialog__body{
    background: #f5f5f5;
    height: calc(100vh - 50px);
  }
}
.content{
  height: 100%;
  background: #fff;
  overflow: auto;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  color: #333;
  display: flex;
  flex-direction: column;
  .top{
    p{
      font-weight: 600;
      font-size: 16px;
      text-indent: 10px;
      position: relative;
      padding: 0;
      margin: 0;
    }
    p:before{
      content: '';
      height: 100%;
      width: 4px;
      border-radius: 4px;
      position: absolute;
      left: 0;
      top: 0;
      background: #3399ff;
      font-size: 14px;
    }
    .base-info{
      padding: 10px 0 10px 10px;
      display: flex;
      justify-content: flex-start;
    }
  }
  .mid{
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    p:before{
      content: '';
      height: 20px;
      width: 4px;
      border-radius: 4px;
      position: absolute;
      left: 0;
      top: 8px;
      background: #3399ff;
    }
    .mid-bot{
      flex: 1;
      overflow: auto;
      padding: 10px;
    }
  }
  .bot{
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

}
</style>
