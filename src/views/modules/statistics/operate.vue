<template>
  <div class="searchListBox">
    <div class="search-container">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-row>
          <!-- 遍历搜索字段 -->
          <el-col :span='8'>
            <el-form-item label="科室：">
              <el-select v-model="searchForm.dept" multiple placeholder="请选择科室" size='small' style="width: 100%;">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="医生：">
              <el-select v-model="searchForm.doctor" multiple placeholder="请选择医生" size='small' style="width: 100%;">
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8' v-if="isExpanded">
            <el-form-item label="麻醉师：">
              <el-select v-model="searchForm.doctor" multiple placeholder="请选择麻醉师" size='small' style="width: 100%;">
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8' v-if="isExpanded">
            <el-form-item label="巡回护士：">
              <el-select v-model="searchForm.doctor" multiple placeholder="请选择巡回护士" size='small' style="width: 100%;">
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8' v-if="isExpanded">
            <el-form-item label="巡回护士：">
              <el-select v-model="searchForm.doctor" multiple placeholder="请选择巡回护士" size='small' style="width: 100%;">
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8' v-if="isExpanded">
            <el-form-item label="洗手护士：">
              <el-select v-model="searchForm.doctor" multiple placeholder="请选择洗手护士" size='small' style="width: 100%;">
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8' v-if="isExpanded">
            <el-form-item label="手术名称：">
              <el-select v-model="searchForm.doctor" multiple placeholder="请选择手术名称" size='small' style="width: 100%;">
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8' v-if="isExpanded">
            <el-form-item label="日期：">
              <el-date-picker
                style="width: 100%;"
                v-model="searchForm.dateRange"
                type="daterange"
                size="small"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 搜索 & 重置按钮 也占据一个框的位置 -->
          <el-col :span="8">
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
    <div class="conBox">
      <div class="conBoxTop">
        <el-checkbox-group v-model="checkList" @change="changeHeadersCol" style="margin-bottom: 5px;">
          <el-checkbox v-for="(item, index) in headLabel1" :key="index" :label="item.field">
            {{ item.headerName }}
          </el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-model="checkList"  @change="changeHeadersCol">
          <el-checkbox v-for="(item, index) in headLabel2" :key="index" :label="item.field">
            {{ item.headerName }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="conBoxMid">
        <div class="conBoxMidTop">
          <div class="title">查询表格</div>
          <div>
            <el-button type="primary" size='small'>
              <a style="height:100%;width:100%;cursor:pointer;color: #fff;" href='https://www.solacemeta.com/shoushufile/shoushu.xlsx'>导出</a>
            </el-button>
          </div>
        </div>
        <ag-grid-vue
          style='flex: 1;'
          class="ag-theme-alpine ag-theme-quartz"
          :gridOptions="gridOptions"
          :localeText="localeText"
          @grid-ready="onGridReady"
          @sort-changed="onSortChangedAggrid"
          @filter-changed="onFilterChangedAggrid"
          :rowHeight="48"
          :headerHeight="38"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="rowData"
          rowSelection="multiple"
          :rowMultiSelectWithClick="true"
          :enableRangeSelection="true"
        >
        </ag-grid-vue>
        <div class="pageBox conBoxMidBottom">
          <div>
          </div>
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
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
  </div>
</template>

<script>
import listBtn from '@/views/modules/operationRoom/listBtn.vue'
// import listJson from '@/views/modules/operationRoom/list.json'
// import { fetchList } from '@/api/examTest.js'
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
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      deptOptions: [{
        value: 'dept1',
        label: '内科'
      }, {
        value: 'dept2',
        label: '外科'
      }, {
        value: 'dept3',
        label: '脑科'
      }, {
        value: 'dept4',
        label: '骨科'
      }, {
        value: 'dept5',
        label: '消化科'
      }],
      userOptions: [{
        value: 'wangcan',
        label: '王灿'
      }, {
        value: 'zhangsanfeng',
        label: '张三丰'
      }, {
        value: 'wangxudong',
        label: '王旭东'
      }, {
        value: 'liqi',
        label: '李琦'
      }, {
        value: 'xiaolong',
        label: '枭龙'
      }],
      checkList: ['doctor', 'anesthetist', 'circulatingNurse', 'scrubNurse', 'operationName', 'preparation', 'intoOperatingRoom', 'anesthesiaStart', 'operationStart', 'operationEnd', 'intoRecoveryRoom', 'anesthesiaEnd', 'returnLocation'],
      headLabel1: [
        {
          headerName: '科室',
          field: 'department',
          filter: 'department',
          tooltipField: 'department',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '医生',
          field: 'doctor',
          filter: 'doctor',
          tooltipField: 'doctor',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '麻醉师',
          field: 'anesthetist',
          filter: 'anesthetist',
          tooltipField: 'anesthetist',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '巡回护士',
          field: 'circulatingNurse',
          filter: 'circulatingNurse',
          tooltipField: 'circulatingNurse',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '洗手护士',
          field: 'scrubNurse',
          filter: 'scrubNurse',
          tooltipField: 'scrubNurse',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '手术名称',
          field: 'operationName',
          filter: 'operationName',
          tooltipField: 'operationName',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        }
      ],
      headLabel2: [
        {
          headerName: '术前准备',
          field: 'preparation',
          filter: 'preparation',
          tooltipField: 'preparation',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '入手术室',
          field: 'intoOperatingRoom',
          filter: 'intoOperatingRoom',
          tooltipField: 'intoOperatingRoom',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '麻醉开始',
          field: 'anesthesiaStart',
          filter: 'anesthesiaStart',
          tooltipField: 'anesthesiaStart',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '手术开始',
          field: 'operationStart',
          filter: 'operationStart',
          tooltipField: 'operationStart',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '手术结束',
          field: 'operationEnd',
          filter: 'operationEnd',
          tooltipField: 'operationEnd',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '入复苏室',
          field: 'intoRecoveryRoom',
          filter: 'intoRecoveryRoom',
          tooltipField: 'intoRecoveryRoom',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '麻醉结束',
          field: 'anesthesiaEnd',
          filter: 'anesthesiaEnd',
          tooltipField: 'anesthesiaEnd',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        },
        {
          headerName: '返回地点',
          field: 'returnLocation',
          filter: 'returnLocation',
          tooltipField: 'returnLocation',
          cellStyle: { whiteSpace: 'normal' },
          autoHeight: true,
          minWidth: 100,
          flex: 1,
          id: 103,
          sortable: true,
          resizable: true,
          hide: false,
          editable: false,
          choosedFlag: true,
          tooltipComponentParams: {
            color: '#55AA77'
          }
        }
      ],
      isExpanded: false,
      searchForm: {
        dept: '',
        doctor: '',
        dateRange: []
      },
      gridOptions: null,
      localeText: this.$AG_GRID_LOCALE_ZZZ,
      col: [],
      page: {
        pageSizes: [100, 2000, 5000],
        currentPage: 1,
        total: 0,
        pageSize: 100
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
          width: 70,
          checkboxSelection: false,
          headerCheckboxSelection: false,
          sortable: false,
          pinned: 'left',
          valueGetter: (params) => {
            // 返回当前行的序号
            return params.node.rowIndex + 1
          }
        },
        {
          field: 'time',
          headerName: '时长(h)',
          width: 100,
          pinned: 'right'
        }
      ],
      columnDefs: [],
      gridApi: null,
      rowData: [
        {
          department: '外科',
          doctor: '周华云',
          anesthetist: '宋爱荣',
          circulatingNurse: '薛佳期',
          scrubNurse: '任佳琪',
          operationName: '阑尾切除术',
          preparation: '术前准备',
          intoOperatingRoom: '2025-04-01 08:00',
          anesthesiaStart: '2025-04-01 08:30',
          operationStart: '2025-04-01 09:00',
          operationEnd: '2025-04-01 10:00',
          intoRecoveryRoom: '2025-04-01 10:30',
          anesthesiaEnd: '2025-04-01 11:00',
          returnLocation: '病房',
          time: '1.5'
        },
        {
          department: '内科',
          doctor: '林宇轩',
          anesthetist: '叶诗涵',
          circulatingNurse: '苏悦萱',
          scrubNurse: '苏悦萱',
          operationName: '阑尾切除术',
          preparation: '术前准备',
          intoOperatingRoom: '2025-04-01 08:00',
          anesthesiaStart: '2025-04-01 08:30',
          operationStart: '2025-04-01 09:00',
          operationEnd: '2025-04-01 10:00',
          intoRecoveryRoom: '2025-04-01 10:30',
          anesthesiaEnd: '2025-04-01 11:00',
          returnLocation: '病房',
          time: '1.5'
        },
        {
          department: '外科',
          doctor: '苏逸晨',
          anesthetist: '陆子铭',
          circulatingNurse: '林楚汐',
          scrubNurse: '苏沐瑶',
          operationName: '阑尾切除术',
          preparation: '术前准备',
          intoOperatingRoom: '2025-04-01 08:00',
          anesthesiaStart: '2025-04-01 08:30',
          operationStart: '2025-04-01 09:00',
          operationEnd: '2025-04-01 10:00',
          intoRecoveryRoom: '2025-04-01 10:30',
          anesthesiaEnd: '2025-04-01 11:00',
          returnLocation: '病房',
          time: '1.5'
        }
      ]
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
    // 装载列表
    onGridReady (params) {
      this.gridApi = params.api
    },
    getList () {

    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getList()
    },
    search () {
      console.log('搜索条件:', this.searchForm)
    },
    reset () {
      // Object.keys(this.searchForm).forEach(key => this.searchForm[key] = "");
    },
    toggleExpand () {
      this.isExpanded = !this.isExpanded
    },
    changeHeadersCol () {
      console.log('this.checkList', this.checkList)
      localStorage.setItem(`${this.$store.state.user.name}_${this.$route.path}`, JSON.stringify(this.checkList))
      this.getHeadersCol()
    },
    // 获取表头
    getHeadersCol () {
      this.columnDefs = []
      let colArr = this.headLabel1.concat(this.headLabel2)
      console.log('34', localStorage.getItem(`${this.$store.state.user.name}_${this.$route.path}`))
      if (localStorage.getItem(`${this.$store.state.user.name}_${this.$route.path}`)) {
        this.checkList = JSON.parse(localStorage.getItem(`${this.$store.state.user.name}_${this.$route.path}`))
      } else {
        this.checkList = []
        colArr.map(v => {
          this.checkList.push(v.field)
        })
        localStorage.setItem(`${this.$store.state.user.name}_${this.$route.path}`, JSON.stringify(this.checkList))
      }
      console.log('this.checkList', this.checkList)
      setTimeout(() => {
        colArr.map(v => {
          if (this.checkList.includes(v.field)) {
            v.hide = false
          } else {
            v.hide = true
          }
        })
        this.col = JSON.parse(JSON.stringify(colArr))
        this.columnDefs = this.rowIndexArr.concat(this.col)

        console.log('this.columnDefs', this.columnDefs)
      }, 10)
    }
  }
}
</script>
<style lang='scss'>

.searchListBox{
  height: calc(100vh - 92px);
  background: #F8FAFA;
  padding: 20px;
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
  .el-checkbox{
    margin-right: 16px !important;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #606266 !important;
  }
  .search-container {
    background: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .conBox{
    flex: 1;
    width: 100%;
    background: #fff;
    margin-top: 16px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .conBoxTop{
      width: 100%;
      padding: 6px 10px;
      border-bottom: 1px solid #F1F3F4;
      .lineBox{
        height: 8px;
        width: 100%;
      }
    }
    .conBoxMid{
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      .conBoxMidTop{
        height: 40px;
        padding: 0 10px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
          font-size: 14px;
          font-weight: 600;
        }
      }
      .conBoxMidBottom{
        height: 40px;
      }
    }
  }
}
.ag-ltr .ag-cell {
  border-right: 1px solid #ebeef5 !important;
}
.ag-cell{
  display: flex !important;
  justify-content: center !important;
}
.ag-cell-value {
  line-height: 1.2 !important;
  padding: 10px 0 !important;
}
</style>
