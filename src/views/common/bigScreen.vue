<template>
  <div class="bigScreen flex">
    <div class="top flex">
      <div class="top-title">手术显示大屏</div>
      <div class="top-time">
        <div class="date">2025年05月06日</div>
        <div class="time flex">09:45:43</div>
      </div>

    </div>
    <div class="bottom flex">
      <div class="bottom-left">
        <div class='list-head list-inner flex'>
          <div class="list-inner-title flex list-inner-title1">手术间</div>
          <div class="list-inner-title flex list-inner-title2">患者姓名</div>
          <div class="list-inner-title flex list-inner-title3">住院号</div>
          <div class="list-inner-title flex list-inner-title4">穿刺部位</div>
          <div class="list-inner-title flex list-inner-title5">接收方式</div>
          <div class="list-inner-title flex list-inner-title6">备注</div>
        </div>
        <div class='list-inner flex' v-for='(item, index) in leftData' :key='index'>
          <div class="flex" style="width: 100%;height: 90%;line-height: 3;margin: 3px 0;background: #2b50b5;border-radius: 8px;">
            <div class="list-inner-title flex list-inner-title1">手术间-{{ item.roomNo }}</div>
            <div class="list-inner-title flex list-inner-title2">{{ item.name }}</div>
            <div class="list-inner-title flex list-inner-title3">{{ item.zhuYuanHao }}</div>
            <div class="list-inner-title flex list-inner-title4">{{ item.dianDi }}</div>
            <div class="list-inner-title flex list-inner-title5">{{ item.songFs }}</div>
            <div class="list-inner-title flex list-inner-title6">{{ item.beiZhu }}</div>
          </div>
        </div>
      </div>
      <div class="list-middle"></div>
      <div class="bottom-right">
        <div class='list-head list-inner flex'>
          <div class="list-inner-title flex list-inner-title1">手术间</div>
          <div class="list-inner-title flex list-inner-title2">患者姓名</div>
          <div class="list-inner-title flex list-inner-title3">住院号</div>
          <div class="list-inner-title flex list-inner-title4">穿刺部位</div>
          <div class="list-inner-title flex list-inner-title5">接收方式</div>
          <div class="list-inner-title flex list-inner-title6">备注</div>
        </div>
        <div class='list-inner flex' v-for='(item, index) in rightData' :key='index'>
          <div class="flex" style="width: 100%;height: 90%;line-height: 3;margin: 4px 0;background: #2b50b5;border-radius: 8px;">
            <div class="list-inner-title flex list-inner-title1">手术间-{{ item.roomNo }}</div>
            <div class="list-inner-title flex list-inner-title2">{{ item.name }}</div>
            <div class="list-inner-title flex list-inner-title3">{{ item.zhuYuanHao }}</div>
            <div class="list-inner-title flex list-inner-title4">{{ item.dianDi }}</div>
            <div class="list-inner-title flex list-inner-title5">{{ item.songFs }}</div>
            <div class="list-inner-title flex list-inner-title6">{{ item.beiZhu }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDpBF, getDpSSJ } from '@/api/bigScreen.js'
// import { sseBfConnect } from '@/api/patient.js'
export default {
  data () {
    return {
      leftData: [],
      rightData: []
    }
  },
  created () {
    this.getDpBFHandle()
    this.longLink()
  },
  methods: {
    // 病房大屏
    getDpBFHandle () {
      getDpBF().then(res => {
        this.leftData = res.data.dpSVos.slice(0, 14)
        this.rightData = res.data.dpSVos.slice(14, 28)
      })
    },
    // 手术间大屏
    getDpList () {
      getDpSSJ().then(res => {
        console.log(res.data)
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
  background: linear-gradient(to top, #37a1d0, #f5f5f5 , skyblue);
  flex-direction: column;
  font-family: 'fangsong';

  .top{
    height: 80px;
    width: 100%;
    font-size: 22px;
    font-weight: 500;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 60px;
    .top-time{
      background: #9bd4db;
      font-size: 16px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0 0 10px;
      border-radius: 10px;
      .time{
        padding: 0 10px;
        background: #37a1d0;
        color: #fff;
        font-weight: 400;
        font-size: 14px;
        border-radius: 10px;
        height: 30px;
        line-height: 30px;
        margin-left: 10px;
      }
    }
  }
  .bottom{
    flex: 1;
    width: 100%;
    font-size: 14px;
    padding: 0 10px 10px;
    .bottom-left, .bottom-right{
      height: 100%;
      width: 54%;
      .list-inner{
        color: #fff;
        // padding: 4px 0;
        box-sizing: border-box;
      }
      // .list-inner:nth-child(odd){
      //   background: rgb(227, 199, 190);
      // }
      // .list-inner:nth-child(even){
      //   background: #c5c2c2;
      // }
    }
    .list-middle{
      width: 2%;
      height: 100%;
      // background: mediumseagreen;
    }
    // .bottom-right{
      // height: 100%;
      // width: 54%;

      // .list-inner:nth-child(odd){
      //   background: rgb(227, 199, 190);
      // }
      // .list-inner:nth-child(even){
      //   background: #c5c2c2;
      // }

    // }
    .list-inner{
      height: 6.6%;
      width: 100%;
      // border-bottom: 1px solid rgb(214, 61, 61);
      // border-left: 1px solid rgb(214, 61, 61);
      // border-right: 1px solid rgb(214, 61, 61);
      .list-inner-title{
        height: 100%;
        // border-left: 1px solid rgb(214, 61, 61);
        font-weight: 500;
      }
      .list-inner-title1{
        width: 14%;
        border-left: none;
      }
      .list-inner-title2{
        width: 14%;
      }
      .list-inner-title3{
        width: 10%;
      }
      .list-inner-title4{
        width: 20%;
      }
      .list-inner-title5{
        width: 14%;
      }
      .list-inner-title6{
        flex: 1;
      }
    }
    .list-inner:nth-of-type(1){
      // border-top: 1px solid rgb(214, 61, 61);
    }
    .list-head{
      height: 5.6%;
      padding-top: 10px;
      background: transparent !important;
      color: #254a4a !important;
      font-size: 16px !important;
    }
  }
}
</style>
