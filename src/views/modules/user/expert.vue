<template>
  <div class="followup-box inner-content export-box">
    <div class="inner inner-content-box">
      <el-form
        class="search-form"
        :inline="true"
        :model="searchForm"
        @keyup.enter.native="getDataList(1)"
      >
        <el-form-item>
          <el-select
            style="width: 160px"
            v-model="searchForm.dept"
            placeholder="请选择科室"
            filterable
            clearable
          >
            <el-option
              v-for="item in deptOptions"
              :key="item.id"
              :label="item.dept"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchForm.nickname"
            placeholder="专家姓名"
            clearable
            style="width: 160px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div
            class="flex-start"
            style="align-items: flex-start"
          >
            <el-button
              type="primary"
              @click="getDataList(1)"
              icon="el-icon-search"
            >查询</el-button>
            <el-button
              @click="clearHandle()"
              icon="el-icon-delete-solid"
            >清空</el-button>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="add"
            >新增</el-button>
          </div>
        </el-form-item>
        <!-- <el-form-item>
          <div
            class="flex-start"
            style="align-items: flex-start"
          >
            
            <el-button
              type="danger"
              icon='el-icon-delete'
              :disabled="selectDataList.length == 0"
            >删除</el-button>
          </div>
        </el-form-item> -->
      </el-form>
      <div
        class="table-box"
        ref="tableBox"
      >
        <el-table
          :data="dataList"
          :height="tableHeight"
          border
          size="small"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column> -->
          <el-table-column
            label="序号"
            type="index"
            fixed="left"
            header-align="center"
            align="center"
            width="70"
          >
          </el-table-column>
          <el-table-column
            minWidth="90"
            prop="userName"
            header-align="center"
            align="center"
            label="登录名"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            minWidth="90"
            prop="nickname"
            header-align="center"
            align="center"
            label="专家姓名"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            minWidth="90"
            prop="gender"
            header-align="center"
            align="center"
            label="性别"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <div>{{ computedGenderList(scope.row.gender) }}</div>
            </template>
          </el-table-column>
          <el-table-column
            minWidth="130"
            prop="dept"
            header-align="center"
            align="center"
            label="专家科室"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            minWidth="160"
            prop="position"
            header-align="center"
            align="center"
            label="职称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            minWidth="160"
            prop="honour"
            header-align="center"
            align="center"
            label="专家荣誉"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            minWidth="190"
            prop="jobAddress"
            header-align="center"
            align="center"
            label="工作地点"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            minWidth="270"
            prop="introduce"
            header-align="center"
            align="center"
            label="专家简介"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            minWidth="160"
            prop="registerTime"
            header-align="center"
            align="center"
            label="创建时间"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            minWidth="160"
            prop="lastLoginTime"
            header-align="center"
            align="center"
            label="最后登录时间"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            minWidth="120"
          >
            <template slot-scope="scope">
              <el-button
                title="修改"
                icon="el-icon-edit"
                type="primary"
                circle
                size="small"
                @click="editItem(scope.row)"
              ></el-button>
              <el-button
                title="删除"
                icon="el-icon-delete"
                type="danger"
                circle
                size="small"
                @click="delItem(scope.row)"
              ></el-button>
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
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="!addOrUpdateForm.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :lock-scroll="false"
      :visible.sync="addOrUpdateVisible"
      :before-close="closeHandle"
      :fullscreen="true"
    >
      <el-form
        inline
        :model="addOrUpdateForm"
        :rules="addOrUpdateFormRule"
        ref="addOrUpdateForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="120px"
      >
        <el-row>
          <el-col :span="18">
            <el-form-item
              label="登录名"
              prop="userName"
              class="label-box"
            >
            <el-input
                v-model.trim="addOrUpdateForm.userName"
                placeholder="请填写登录名"
                clearable
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="专家姓名"
              prop="nickname"
              class="label-box"
            >
              <el-input
                v-model.trim="addOrUpdateForm.nickname"
                placeholder="请填写姓名"
                clearable
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="性别"
              prop="gender"
              class="label-box"
            >
              <el-radio-group v-model="addOrUpdateForm.gender">
                <el-radio
                  v-for="(item, index) in genderList"
                  :key="index"
                  :label="item.value"
                >{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="手机号"
              prop="mobile"
              class="label-box"
            >
              <el-input
                v-model.trim="addOrUpdateForm.mobile"
                placeholder="请填写手机号"
                clearable
                style="width: 100%"
                maxlength="11"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="科室"
              prop="deptId"
              class="label-box"
            >
              <el-select
                style="width: 100%"
                v-model="addOrUpdateForm.deptId"
                placeholder="请选择科室"
                filterable
                clearable
              >
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.dept"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="职称"
              prop="position"
              class="label-box"
            >
              <el-input
                v-model.trim="addOrUpdateForm.position"
                placeholder="对个职称用“，”隔开"
                clearable
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="价格"
              prop="money"
              class="label-box"
            >
              <el-input
                v-model.trim="addOrUpdateForm.money"
                placeholder="请输入价格"
                clearable
                style="width: 100%"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="照片"
              prop="imageUrl"
              class="label-box"
            >
              <el-upload
                drag
                class="avatar-uploader"
                :action="url"
                :headers="headerToken"
                :before-upload="beforeUploadHandle"
                :on-success="successHandle"
                :show-file-list="false"
              >
                <img
                  v-if="addOrUpdateForm.imageUrl"
                  :src="addOrUpdateForm.imageUrl"
                  class="avatar"
                />
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item
              label="专家简介"
              prop="introduce"
              class="label-box"
            >
              <el-input
                v-model.trim="addOrUpdateForm.introduce"
                placeholder="专家简介"
                clearable
                style="width: 100%"
                rows="8"
                maxlength="1000"
                show-word-limit
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="专家荣誉"
              prop="honour"
              class="label-box"
            >
              <el-input
                v-model.trim="addOrUpdateForm.honour"
                placeholder="专家荣誉"
                clearable
                style="width: 100%"
                rows="8"
                maxlength="1000"
                show-word-limit
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="工作地点"
              prop="jobAddress"
              class="label-box"
            >
              <el-input
                v-model.trim="addOrUpdateForm.jobAddress"
                placeholder="工作地点"
                clearable
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closeHandle">取消</el-button>
        <el-button
          type="primary"
          @click="dataFormSubmit()"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import jsonData from '@/assets/json/data.json'
import { isMobile } from '@/utils/validate.js'
import Vue from 'vue'
export default {
  data () {
    var mobileVal = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!isMobile(value)) {
        callback(new Error('请输入正确的手机号!'))
      } else {
        callback()
      }
    }
    return {
      url: '',
      num: 0,
      successNum: 0,
      fileList: [],
      genderList: jsonData.genderList,
      selectDataList: [],
      searchForm: {},
      // 带随访数目
      addOrUpdateVisible: false,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      tableHeight: 0,
      userOptions: [],
      userLoading: false,
      addOrUpdateForm: {
        id: '',
        nickname: '',
        gender: '',
        deptId: '',
        position: '',
        money: '',
        honour: '',
        jobAddress: '',
        introduce: '',
        imageUrl: '',
        mobile: '',
        userName: ''
      },
      addOrUpdateFormRule: {
        nickname: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: ['blur', 'change']
          }
        ],
        gender: [
          {
            required: true,
            message: '性别不能为空',
            trigger: ['blur', 'change']
          }
        ],
        deptId: [
          {
            required: true,
            message: '科室不能为空',
            trigger: ['blur', 'change']
          }
        ],
        money: [
          {
            required: true,
            message: '请输入价格',
            trigger: ['blur', 'change']
          }
        ],
        imageUrl: [
          {
            required: true,
            message: '请选择照片',
            trigger: ['blur', 'change']
          }
        ],
        position: [
          {
            required: true,
            message: '职称不能为空',
            trigger: ['blur', 'change']
          }
        ],
        honour: [
          {
            required: true,
            message: '荣誉不能为空',
            trigger: ['blur', 'change']
          }
        ],
        jobAddress: [
          {
            required: true,
            message: '工作地点不能为空',
            trigger: ['blur', 'change']
          }
        ],
        introduce: [
          {
            required: true,
            message: '专家简介不能为空',
            trigger: ['blur', 'change']
          }
        ],
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: ['blur', 'change']
          },
          { validator: mobileVal, trigger: ['blur', 'change'] }
        ],
        userName: [
          {
            required: true,
            message: '登录名不能为空',
            trigger: ['blur', 'change']
          }
        ]
      },
      deptOptions: []
    }
  },
  computed: {
    headerToken () {
      return { Token: Vue.cookie.get('token') }
    }
  },
  created () {
    this.getDept()
    setTimeout(() => {
      this.tableHeight = this.$refs.tableBox.scrollHeight
      this.url = this.$http.BASE_URL + `/tool/upload/uploadMultipartFile`
    }, 100)
    this.getDataList()
  },
  methods: {
    handleSelectionChange (val) {
      this.selectDataList = val
    },

    successHandle (res, file) {
      this.addOrUpdateForm.imageUrl = res.url
    },
    beforeUploadHandle (file) {
      const isJPG =
          file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg'

      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
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
    userMethod (query) {
      let params = {
        mobile: query,
        flag: 1,
        page: 1,
        limit: 100
      }
      this.userLoading = true
      this.userOptions = []
      this.$http({
        url: '/exam/teacher/listTeacher',
        method: 'get',
        params: params
      }).then(({ data }) => {
        this.userLoading = false
        if (data && data.code === 0) {
          if (data.page.records.length > 0) {
            data.page.records.map(item => {
              this.userOptions.push(
                Object.assign(item, {
                  label: `${item.userName} / ${item.mobile}`,
                  value: item.id
                })
              )
            })
            console.log(this.userOptions)
          }
        }
      })
    },
    // 获取科室
    getDept () {
      this.$http({
        url: '/exam/dept/list',
        method: 'get',
        params: {
          page: 1,
          limit: 100000
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.deptOptions = data.page.records
        } else {
          this.deptOptions = []
        }
      })
    },
    // 获取专家
    getDataList (page) {
      if (page) {
        this.pageIndex = page
      }
      this.$http({
        url: '/mall/user/list',
        method: 'get',
        params: {
          page: this.pageIndex,
          limit: this.pageSize,
          deptId: this.searchForm.dept,
          type: 2,
          orderSql: 'register_time desc'
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          data.page.records.map(item => {
            item.gender = String(item.gender)
          })
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
    },
    closeHandle () {
      this.addOrUpdateForm = {
        id: '',
        nickname: '',
        gender: '',
        deptId: '',
        position: '',
        money: '',
        honour: '',
        jobAddress: '',
        introduce: '',
        imageUrl: '',
        mobile: '',
        userName: ''
      }
      this.$refs['addOrUpdateForm'].resetFields()
      setTimeout(() => {
        this.addOrUpdateVisible = false
      }, 10)
    },
    dataFormSubmit () {
      this.$refs.addOrUpdateForm.validate(valid => {
        if (valid) {
          let dept = this.deptOptions.filter(val => {
            return val.id === this.addOrUpdateForm.deptId
          })[0].dept
          if (this.addOrUpdateForm.id) {
            // 编辑
            let params = Object.assign(this.addOrUpdateForm, {
              dept: dept,
              createUserId: this.$store.state.user.id,
              password: this.addOrUpdateForm.mobile,
               // 1学生2老师3院校版学生4院校版老师,
              typeCode: 2

            })
            this.$http({
              url: '/mall/user/update',
              method: 'post',
              data: params
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.closeHandle()
                this.$message.success('科室编辑成功！')
                this.getDataList()
              }
            })
          } else {
            let params = Object.assign(this.addOrUpdateForm, {
              dept: dept,
              createUserId: this.$store.state.user.id,
              password: this.addOrUpdateForm.mobile,
              // 1学生2老师3院校版学生4院校版老师,
              typeCode: 2
            })
            delete params.id
            this.$http({
              url: '/mall/user/save',
              method: 'post',
              data: params
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.closeHandle()
                this.$message.success('专家保存成功！')
                this.getDataList()
              }
            })
          }
        }
      })
    },
    delItem (val) {
      const h = this.$createElement
      this.$msgbox({
        title: '消息',
        message: h('p', { style: 'display: flex;' }, [
          h(
            'i',
            {
              class: 'el-icon-delete',
              style: 'font-size: 22px;color: #ff1744;font-weight: 600;margin-right: 4px'
            },
            ' '
          ),
          h('span', {}, `请确认是否删除专家: ${val.nickname}`)
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '操作中...'
            this.$http({
              url: '/mall/user/delete',
              method: 'post',
              data: [val.id]
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.$message.success('专家删除成功！')
                this.getDataList()
                instance.confirmButtonLoading = false
                done()
              }
            })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    },
    editItem (val) {
      this.addOrUpdateForm = JSON.parse(JSON.stringify(val))
      this.addOrUpdateVisible = true
      this.getDept()
    },
    add () {
      this.addOrUpdateVisible = true
      this.getDept()
    }
  }
}
</script>
<style lang="scss">
.followup-box {
  .inner {
    .table-box {
      flex: 1;
      width: 100%;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-upload-dragger {
  width: 178px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.export-box {
  .el-form-item__content {
    width: 100%;
  }
  .label-box {
    width: 100%;
    display: flex !important;
  }
}
</style>
