<template>
  <div style="line-height: 34px !important;">
    <el-button type="success" title="系数查看" circle size="small" @click.stop="viewHandle">
      <span class="icon iconfont icon-xiapushuai"></span>
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
    viewHandle () {
      console.log(this.params.data)
      // this.params.context.componentParent.viewHandle(this.params.data)
    }
  }
})
</script>
