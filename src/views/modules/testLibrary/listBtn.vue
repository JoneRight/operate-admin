<template>
  <div style="line-height: 34px !important;">
    <el-button v-if='isAuth("testLibraryEdit")' type="primary" title="编辑" circle size="small" @click.stop="editHandle">
      <span class="icon iconfont icon-bianji"></span>
    </el-button>
    <el-button v-if='isAuth("testLibraryView")' type="warning" title="查看考题列表" circle size="small" @click.stop="viewHandle">
      <span class="el-icon-view"></span>
    </el-button>
    <el-button v-if='isAuth("testLibraryImport")' type="success" title="导入考题" circle size="small" @click.stop="importHandle">
      <span class="icon iconfont icon-daoru"></span>
    </el-button>
    <el-button v-if='isAuth("testLibraryDel")' type="danger" title="删除" circle size="small" @click.stop="delHandle">
      <span class="icon iconfont icon-shanchu"></span>
    </el-button>
  </div>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  // props: ["flag"],
  data () {
    return {}
  },
  methods: {
    editHandle () {
      this.params.context.componentParent.editHandle(this.params.data)
    },
    viewHandle () {
      this.params.context.componentParent.viewHandle(this.params.data)
    },
    delHandle () {
      this.params.context.componentParent.delHandle(this.params.data)
    },
    importHandle () {
      this.params.context.componentParent.importHandle(this.params.data)
    }
  }
})
</script>
