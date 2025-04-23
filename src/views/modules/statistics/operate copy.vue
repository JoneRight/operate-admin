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
          <el-form-item label="考试名称">
            <el-input
              v-model="searchForm.stationNumber"
              type="number"
              placeholder="考试名称"
              clearable
              style="width: 160px"
            ></el-input>
          </el-form-item>
          <el-form-item label="考试时间">
             <el-date-picker
              v-model="searchForm.examDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 280px"
              >
            </el-date-picker>
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
        </el-form>
      </div>
      <div class="choosedBox">
        <el-checkbox-group
          v-model="choosedValue"
          @change="handleChoosedValue"
        >
          <el-checkbox
            v-for="(item,index) in col"
            :key="index"
            :label="item.headerName"
          >{{ item.headerName }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="detailsBox">
        <ag-grid-vue
          class="ag-theme-alpine ag-theme-quartz"
          :gridOptions="gridOptions"
          :localeText="localeText"
          @grid-ready="onGridReady"
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
  </div>
</template>
<script>
// import Vue from 'vue'
import listBtn from '@/views/modules/operationRoom/listBtn.vue'
import listJson from '@/views/modules/operationRoom/list.json'
import { fetchList } from '@/api/examTest.js'
export default {
  beforeMount () {
    this.gridOptions = {
      // 通过这个属性建立了上下文引用
      context: { componentParent: this }
      // 说人话就是可以在自己声明的组件里调用到父组件的方法和属性了
    }
  },
  components: {
    listBtn
  },
  watch: {
    $route: {
      handler (newValue, oldValue) {
        console.log(newValue, oldValue)
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
        stationNumber: ''
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
          checkboxSelection: false,
          headerCheckboxSelection: false,
          sortable: false,
          pinned: 'left',
          valueGetter: (params) => {
            // 返回当前行的序号
            return params.node.rowIndex + 1
          }
        }
        // {
        //   field: 'handle',
        //   headerName: '操作',
        //   width: 150,
        //   pinned: 'right',
        //   cellRenderer: 'listBtn'
        // }
      ],
      columnDefs: [],
      gridApi: null,
      rowData: [],
      choosedValue: []
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
    // 获取表头
    getHeadersCol () {
      this.columnDefs = []
      setTimeout(() => {
        this.col = JSON.parse(JSON.stringify(listJson.column))
        if (localStorage.getItem(`${this.$store.state.user.name}_${this.$route.path}`)) {
          this.choosedValue = JSON.parse(localStorage.getItem(`${this.$store.state.user.name}_${this.$route.path}`))
        } else {
          this.choosedValue = []
          console.log('this.col', this.col)
          this.col.map(v => {
            if (v.choosedFlag === true) {
              this.choosedValue.push(v.headerName)
            }
          })
          localStorage.setItem(`${this.$store.state.user.name}_${this.$route.path}`, JSON.stringify(this.choosedValue))
        }
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
        page: this.page.curentPage,
        stationNumber: this.searchForm.stationNumber || '',
        // 状态1 是已完成的考试 必须要有
        examStatus: 1,
        orderSql: 'totalStationNumber asc'
      }
      fetchList(params).then(res => {
        this.rowData = res.data.page.records
        this.page.total = res.data.page.total
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
    handleChoosedValue (val) {
      localStorage.setItem(`${this.$store.state.user.name}_${this.$route.path}`, JSON.stringify(val))
    }
  }
}
</script>
<style lang='scss'>
.choosedBox{
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  background: #3399ff20;
  backdrop-filter: blur(2px);
  border-radius: 4px;
}
</style>
