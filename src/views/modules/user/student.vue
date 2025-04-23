<template>
  <div class="followup-box inner-content">
    <div class="inner inner-content-box">
      <el-form :inline="true" :model="searchForm" @keyup.enter.native="getDataList(1)">
        <el-form-item>
          <el-input v-model="searchForm.userName" placeholder="用户名" clearable style='width: 160px;'></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm.mobile" placeholder="手机号" clearable style='width: 160px;'></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm.school" placeholder="所属学校" clearable style='width: 160px;'></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex-start" style="align-items: flex-start;">
            <el-button type="primary" @click="getDataList(1)">查询</el-button>
            <el-button @click="clearHandle()">清空</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="table-box" ref="tableBox">
        <el-table
          :data="dataList"
          :height="tableHeight"
          border
          size="small"
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
            prop="userName"
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
            minWidth="80"
            prop="gender"
            header-align="center"
            align="center"
            label="性别">
              <template slot-scope="scope">
                <div> {{ computedGenderList(scope.row.gender) }}</div>
              </template>
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
            prop="userLevelId"
            header-align="center"
            align="center"
            label="用户类型">
            <template slot-scope="scope">
              <div> {{ computeduserLevelId(scope.row.userLevelId) }}</div>
            </template>
          </el-table-column>
          <el-table-column
            minWidth="170"
            prop="type"
            header-align="center"
            align="center"
            label="所属院校">
          </el-table-column>
          <el-table-column
            minWidth="160"
            prop="shouldDate"
            header-align="center"
            align="center"
            label="用户版本">
          </el-table-column>
          <el-table-column
            minWidth="160"
            prop="registerTime"
            header-align="center"
            align="center"
            label="创建时间">
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
      genderList: jsonData.genderList,
      searchForm: {
      },
      // 带随访数目
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      tableHeight: 0
    }
  },
  created () {
    setTimeout(() => {
      this.tableHeight = this.$refs.tableBox.scrollHeight
    }, 100)
    this.getDataList()
  },
  methods: {
    computedGenderList (val) {
      let Arr = this.genderList.filter(item => {
        return item.value === String(val)
      })
      if (Arr.length > 0) {
        return Arr[0].label
      } else {
        return '暂无'
      }
    },
    computeduserLevelId (val) {
      if (val === 0) {
        return '非会员'
      } else {
        return `会员${val}级`
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
    // 获取数据列表
    getDataList (page) {
      if (page) {
        this.pageIndex = page
      }
      this.$http({
        url: '/mall/user/list',
        method: 'get',
        params: {
          'page': this.pageIndex,
          'limit': this.pageSize,
          'userName': this.searchForm.userName,
          'typeCode': 1,
          // 1学生2老师3院校版学生4院校版老师,
          'mobile': this.searchForm.mobile,
          'school': this.searchForm.school
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

    clearHandle () {
      this.searchForm = {}
      this.pageIndex = 1
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
