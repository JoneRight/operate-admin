<template>
  <div class="followup-box inner-content">
    <div class="inner inner-content-box">
      <div class="searchBox">
        <el-form
          :inline="true"
          :model="searchForm"
          size="small"
          style="width: 100%"
        >
          <el-form-item label="考题库名称">
            <el-input
              v-model="searchForm.examPool"
              placeholder="考题库名称"
              clearable
              style="width: 100px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="getList"
              size="small"
              icon="el-icon-search"
              >搜索</el-button
            >
            <el-button @click="searchReset" size="small" icon="el-icon-delete"
              >清空</el-button
            >
          </el-form-item>
          <br />
          <el-form-item>
            <el-button
              v-if='isAuth("testLibraryAdd")'
              size="small"
              type="primary"
              @click="add"
            >
              <span class="icon iconfont icon-kaodian"></span>
              新增考题库
            </el-button>
            <el-button
              v-if='isAuth("testLibraryDel")'
              size="small"
              type="danger"
              @click="delHandle('branch')"
              :disabled="dataSelect.length == 0"
            >
              <span class="el-icon-delete"></span>
              删除
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="detailsBox">
        <ag-grid-vue
          class="ag-theme-alpine ag-theme-quartz"
          :gridOptions="gridOptions"
          :localeText="localeText"
          @grid-ready="onGridReady"
          @selection-changed="getSelectedRows"
          @sort-changed="onSortChangedAggrid"
          @filter-changed="onFilterChangedAggrid"
          :rowHeight="38"
          :headerHeight="42"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="rowData"
          rowSelection="multiple"
          :rowMultiSelectWithClick="true"
          :enableRangeSelection="true"
        >
        </ag-grid-vue>
      </div>
      <div class="pageBox">
        <div>
          选择 <strong style="color: #3399ff;">{{ dataSelect.length }}</strong> 数据
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="addOrUpdateFlag === 'add' ? '新增考题库' : '编辑考题库'"
      :visible.sync="addOrUpdateVisible"
      width="600px"
      size="small"
      :before-close="handleClose">

      <el-form :model="addOrUpdateForm" :rules="addOrUpdateFormRules" ref="addOrUpdateForm" label-width="120px" style="width: 400px">
        <el-form-item label="考题库名称：" prop="examPool">
          <el-input v-model="addOrUpdateForm.examPool" placeholder="考题库名称"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small" :loading='btnLoading'>取 消</el-button>
        <el-button type="primary" @click="submit('addOrUpdateForm')" size="small" :loading='btnLoading'>确 定</el-button>
      </span>
    </el-dialog>

    <editTest ref='editTest' :editVisable='editVisable' :testObj='testObj' @child-event="closeMethod"></editTest>
    <addTest ref='addTest' :editVisable='addVisable' :testObj='testObj' @child-event="closeMethod2"></addTest>

  </div>
</template>
<script>
// import Vue from 'vue'
import listBtn from '@/views/modules/testLibrary/listBtn.vue'
import listJson from '@/views/modules/testLibrary/list.json'
import {fetchList, addObj, deleteObj, updateObj} from '@/api/testLibrary.js'
import { Message } from 'element-ui'
import editTest from './editTest.vue'
import addTest from './addTest.vue'
export default {
  beforeMount () {
    this.gridOptions = {
      // 通过这个属性建立了上下文引用
      context: { componentParent: this }
      // 说人话就是可以在自己声明的组件里调用到父组件的方法和属性了
    }
  },
  components: {
    listBtn,
    editTest,
    addTest
  },
  watch: {
    $route: {
      handler (newValue, oldValue) {
        if (oldValue.name === 'testLibrary-list') {
          this.editVisable = false
          this.addVisable = false
          this.addOrUpdateVisible = false
        }
      },
      deep: true
    }
  },
  data () {
    return {
      gridOptions: null,
      localeText: this.$AG_GRID_LOCALE_ZZZ,
      col: [],
      page: {
        pageSizes: [100, 2000, 5000],
        currentPage: 1,
        total: 0,
        pageSize: 100
      },
      searchForm: {
        examPool: ''
      },
      defaultColDef: {
        editable: false,
        sortable: true,
        resizable: true,
        filter: true,
        cellDataType: false
      },
      rowIndexArr: [
        {
          field: 'rowIndex',
          headerName: '序号',
          width: 100,
          checkboxSelection: true,
          headerCheckboxSelection: true,
          sortable: false,
          pinned: 'left',
          valueGetter: (params) => {
            // 返回当前行的序号
            return params.node.rowIndex + 1
          }
        },
        {
          field: 'handle',
          headerName: '操作',
          width: 170,
          pinned: 'right',
          cellRenderer: 'listBtn'
        }
      ],
      columnDefs: [],
      gridApi: null,
      rowData: [],
      dataSelect: [],

      // 新增
      addOrUpdateVisible: false,
      addOrUpdateFormBak: {
        examPool: ''
      },
      addOrUpdateForm: {
        examPool: ''
      },
      addOrUpdateFormRules: {
        examPool: [
            { required: true, message: '请输入考题库名称', trigger: 'blur' }
        ]
      },
      addOrUpdateFlag: 'add',
      btnLoading: false,

      editVisable: false,
      addVisable: false,
      testObj: {},
      msg: null
    }
  },
  created () {
    this.getHeadersCol()
    setTimeout(() => {
      this.getList()
    }, 10)
  },
  methods: {
    onSortChangedAggrid (event) {
      const api = event.api
      const visibleRowCount = api.getDisplayedRowCount()
      for (let i = 0; i < visibleRowCount; i++) {
        const rowNode = api.getDisplayedRowAtIndex(i)
        console.log(rowNode)
      }
      let aaa = JSON.parse(JSON.stringify(this.rowData))
      if (this.gridApi.getRenderedNodes().length > 1) {
        this.aggridScrollNum = this.gridApi.getRenderedNodes()[1].rowIndex - 1
      } else {
        this.aggridScrollNum = this.gridApi.getRenderedNodes()[0].rowIndex
      }
      setTimeout(() => {
        this.rowData = JSON.parse(JSON.stringify(aaa))
        setTimeout(() => {
          if (this.aggridScrollNum !== 0) {
            this.gridApi.ensureIndexVisible(this.aggridScrollNum, 'top')
          }
        }, 10)
      }, 10)
    },
    onFilterChangedAggrid (event) {
      const api = event.api
      const visibleRowCount = api.getDisplayedRowCount()
      for (let i = 0; i < visibleRowCount; i++) {
        const rowNode = api.getDisplayedRowAtIndex(i)
        console.log(rowNode)
      }
      let aaa = JSON.parse(JSON.stringify(this.rowData))
      if (this.gridApi.getRenderedNodes().length > 1) {
        this.aggridScrollNum = this.gridApi.getRenderedNodes()[1].rowIndex - 1
      } else {
        this.aggridScrollNum = this.gridApi.getRenderedNodes()[0].rowIndex
      }
      setTimeout(() => {
        this.rowData = JSON.parse(JSON.stringify(aaa))
        setTimeout(() => {
          if (this.aggridScrollNum !== 0) {
            this.gridApi.ensureIndexVisible(this.aggridScrollNum, 'top')
          }
        }, 10)
      }, 10)
    },
    // 获取选中
    getSelectedRows () {
      this.dataSelect = this.gridApi.getSelectedRows()
    },
    // 获取表头
    getHeadersCol () {
      this.columnDefs = []
      setTimeout(() => {
        this.col = JSON.parse(JSON.stringify(listJson.column))
        this.columnDefs = this.rowIndexArr.concat(this.col)
      }, 10)
    },
    // 装载列表
    onGridReady (params) {
      this.gridApi = params.api
    },
    getList () {
      let params = {
        limit: this.page.pageSize,
        page: this.page.currentPage,
        examPool: this.searchForm.examPool || '',
        orderSql: 'creat_date desc'
        // orderSql: 'station_number asc'
      }
      fetchList(params).then(res => {
        this.rowData = res.data.page.records
        this.page.total = res.data.page.total
        this.dataSelect = []
      })
    },
    handleSizeChange (val) {
      this.page.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getList()
    },
    // 清空搜索
    searchReset () {
      this.searchForm = {}
      this.page.currentPage = 1
      // this.getList();
    },
    // handel
    // 查看考题
    viewHandle (val) {
      this.testObj = JSON.parse(JSON.stringify(val))
      this.editVisable = true
      setTimeout(() => {
        this.$refs.editTest.getTestList()
      }, 10)
    },
    // 导入考题
    importHandle (val) {
      this.testObj = JSON.parse(JSON.stringify(val))
      this.addVisable = true
      setTimeout(() => {
        this.$refs.addTest.getTestList()
      }, 10)
    },
    editHandle (val) {
      this.addOrUpdateForm = JSON.parse(JSON.stringify(val))
      this.addOrUpdateFlag = 'edit'
      this.addOrUpdateVisible = true
    },
    resetForm () {
      this.$refs['addOrUpdateForm'].resetFields()
    },
    // 新增编辑
    handleClose () {
      this.addOrUpdateForm = JSON.parse(JSON.stringify(this.addOrUpdateFormBak))
      this.resetForm()
      setTimeout(() => {
        this.addOrUpdateVisible = false
      }, 1)
    },
    add () {
      this.addOrUpdateFlag = 'add'
      this.addOrUpdateVisible = true
    },
    // 新增修改
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.msg = Message({
            duration: 0,
            dangerouslyUseHTMLString: true,
            iconClass: 'el-icon-loading',
            message: '<p style="padding-left: 10px;">操作中，请稍后...</p>'
          })
          let params = {
            examPool: this.addOrUpdateForm.examPool
          }
          if (this.addOrUpdateFlag === 'edit') {
            params.id = this.addOrUpdateForm.id
          }
          if (this.addOrUpdateFlag === 'add') {
            addObj(params).then(res => {
              console.log(res)
              this.btnLoading = false
              this.handleClose()
              this.msg.close()
              this.$message.success('新增成功')
              this.getList()
            })
          } else {
            updateObj(params).then(res => {
              console.log(res)
              this.btnLoading = false
              this.handleClose()
              this.msg.close()
              this.$message.success('编辑成功')
              this.getList()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除
    delHandle (val) {
      let msg = val === 'branch' ? '选中数据' : val.examPool
      let params = val === 'branch' ? this.dataSelect.map(item => {
        return item.id
      }) : [val.id]
      console.log(params)
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', { class: 'flex', style: 'justify-content:flex-start;width: 400px' }, [
          h(
            'i',
            {
              class: 'el-icon-delete-solid',
              style: 'color: #ff0000b5;font-size: 26px;padding-right: 10px'
            },
            ''
          ),
          h('span', null, `此操作将删除“${msg}”`)
        ]),
        showCancelButton: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '删除中...'
            deleteObj(params)
              .then(res => {
                done()
                instance.confirmButtonLoading = false
                if (res.data.code === 0) {
                  this.$message.success('删除成功')
                  this.getList()
                }
              })
              .catch(() => {
                instance.confirmButtonLoading = false
                done()
              })
          } else {
            done()
          }
        }
      })
    },
    closeMethod () {
      this.editVisable = false
      this.getList()
    },
    closeMethod2 () {
      this.addVisable = false
      this.getList()
    }
  }
}
</script>
