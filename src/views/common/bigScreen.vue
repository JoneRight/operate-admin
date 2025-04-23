<template>
  <div class="bigScreen">3434</div>
</template>

<script>
import { getDpBF, getDpSSJ } from '@/api/bigScreen.js'
// import { sseBfConnect } from '@/api/patient.js'
export default {
  data () {
    return {}
  },
  created () {
    this.getDpList()
    this.longLink()
  },
  methods: {
    // 病房大屏
    getDpList1 () {
      getDpBF().then(res => {
        console.log(res)
      })
    },
    // 手术间大屏
    getDpList () {
      getDpSSJ().then(res => {
        console.log(res)
      })
    },
    // 长连接
    longLink () {
      let source = null
      // 用时间戳模拟登录用户
      console.log('window.EventSource', window.EventSource)
      if (window.EventSource) {
        // 建立连接
        source = new EventSource('/wahaha/shoushu-admin/ss/sse/connect/6')

        /**
         * 连接一旦建立，就会触发open事件
         * 另一种写法：source.onopen = function (event) {}
         */
        source.addEventListener(
          'open',
          function (e) {
            console.log('建立连接。。。')
          },
          false
        )

        /**
         * 客户端收到服务器发来的数据
         * 另一种写法：source.onmessage = function (event) {}
         */
        source.addEventListener('message', function (e) {
          console.log(e.data)
        })

        /**
         * 如果发生通信错误（比如连接中断），就会触发error事件
         * 或者：
         * 另一种写法：source.onerror = function (event) {}
         */
        source.addEventListener(
          'error',
          function (e) {
            if (e.readyState === EventSource.CLOSED) {
              console.log('连接关闭')
            } else {
              console.log(e)
            }
          },
          false
        )
      } else {
        console.log('你的浏览器不支持SSE')
      }
    }
  }
}
</script>

<style lang="scss">
.bigScreen {
  height: calc(100vh);
  width: 100%;
  background: #f5f5f5;
}
</style>
