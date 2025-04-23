<template>
  <div class="width200">
    <el-input v-if="false" v-model="imageUrl"></el-input>
    <el-image style="max-width: 100px; max-height: 100px" v-if="imageUrl" :src="imageUrl"
              @click="openImg(imageUrl)"></el-image>
    <el-button style="position: relative;" icon="el-icon-upload" @click="visible = true" v-if="!disabled"
               circle></el-button>
    <el-dialog :visible.sync="visible"
               style="z-index: 1000"
               width="950px"
               title="选择图片"
               :lock-scroll="false"
               append-to-body>
      <el-form :inline="true" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-button type="primary" @click="uploadHandle()">上传文件</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataList"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="图片">
          <template slot-scope="scope">
            <video v-if="scope.row.url.indexOf('.mp4')>0||scope.row.url.indexOf('.flv')>0" :src="scope.row.url"
                   style="width: 200px;height: auto"
                   controls="controls">您的浏览器不支持视频播放
            </video>
            <el-image
              v-else
              style="max-height: 100px;max-width: 100px"
              :key="scope.row.url"
              @click="openImg(scope.row.url)"
              :src="scope.row.url">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-circle-check" circle v-if="scope.row.url.indexOf('.mp4')<0&&scope.row.url.indexOf('.flv')<0"
                       @click="selectImg(scope.row.url)"></el-button>
            <el-button v-if="isAuth('sys:oss:delete')" type="danger" icon="el-icon-delete" circle
                       @click="deleteHandle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-dialog>
    <!-- 弹窗, 上传文件 -->
    <upload v-if="uploadVisible" ref="upload" @refreshDataList="getDataList"></upload>
  </div>
</template>

<script>
import Upload from '../../views/modules/oss/oss-upload'

export default {
  name: 'el-img',
  componentName: 'ElImg',
  data () {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      visible: false,
      uploadVisible: false,
      imageUrl: ''
    }
  },
  components: {
    Upload
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    // 接受外部v-model传入的值，必须使用value
    value: ''
  },
  watch: {
    imageUrl (val, oldVal) {
      if (val !== oldVal) {
        this.$emit('input', this.imageUrl)
      }
    },
    value (val) {
      this.imageUrl = val
    }
  },
  mounted () {
    this.getDataList()
    this.imageUrl = this.value
  },
  methods: {
    // 上传文件
    uploadHandle () {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.$refs.upload.init()
      })
    },
    selectImg (url) {
      this.imageUrl = url
      this.visible = false
      this.$nextTick(() => {
        this.$emit('change', url)
      })
    },
    // 获取数据列表
    getDataList () {
      this.$http({
        url: '/sys/oss/list',
        method: 'get',
        params: {
          'page': this.pageIndex,
          'limit': this.pageSize
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
    // 删除
    deleteHandle (id) {
      let ids = [id]
      this.$confirm('确定删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: '/sys/oss/delete',
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
    }
  }
}
</script>
