<template>
  <div class="conBox">
    <div class="conBoxInner">
      <div class="innerTop">
        <div>{{ info.creatDate }}</div>
        <div class="flex">
          <div :class="['flex topBoxConRight', activeIdArrs.indexOf('today') > -1 ? 'activeCon' : '']" @click="choose('today')">
            <div class="chooseBox"></div>
            <div>今日手术</div>
          </div>
          <div :class="['flex topBoxConRight', activeIdArrs.indexOf('other') > -1 ? 'activeCon' : '']" @click="choose('other')">
            <div class="chooseBox"></div>
            <div>非今日手术</div>
          </div>
        </div>
      </div>
      <div class="innerBottom">
        <div class="detailsBox flex">
          <div :class="['detailsBoxInner', item.type === 'today' ? 'detailsBoxInnerToday':'detailsBoxInnerOther']" v-for="(item,index) in operaArr" :key='index' @click="linkTo(item.No)">
            <div class="pos">{{ item.No }}</div>
            <div>
              手术名称：<span class="nameDes">{{ item.name }}</span>
            </div>
            <div>
              科室：<span class="nameDes">{{ item.dept }}</span>
            </div>
            <div>
              主刀医生：<span class="nameDes">{{ item.doctor }}</span>
            </div>
            <div>
              时间：<span class="nameDes">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      info: {
        creatDate: '2025-04-01'
      },
      activeIdArrs: ['today', 'other'],
      operaArr: [
        {
          type: 'today',
          No: '1',
          name: '肠胃炎手术',
          doctor: '张小川',
          dept: '肛肠科',
          date: '2025-04-01 11:20'
        },
        {
          type: 'today',
          No: '2',
          name: '皮肤纤维瘤',
          doctor: '冯国川',
          dept: '皮肤科',
          date: '2025-04-01 12:30'
        },
        {
          type: 'other',
          No: '3',
          name: '胆囊切除术',
          doctor: '张志国',
          dept: '内科',
          date: '2025-05-01 12:30'
        },
        {
          type: 'today',
          No: '4',
          name: '疝气无张力修补术',
          doctor: '李凯尔',
          dept: '内科',
          date: '2025-04-01 14:30'
        },
        {
          type: 'other',
          No: '5',
          name: '肺癌根治术',
          doctor: '杜小双',
          dept: '内科',
          date: '2025-06-03 12:30'
        },
        {
          type: 'other',
          No: '5',
          name: '肺癌根治术',
          doctor: '杜小双',
          dept: '内科',
          date: '2025-06-03 12:30'
        },
        {
          type: 'other',
          No: '5',
          name: '肺癌根治术',
          doctor: '杜小双',
          dept: '内科',
          date: '2025-06-03 12:30'
        }
      ]
    }
  },
  created () {
  },
  methods: {
    // 跳转
    linkTo (val) {
      console.log(val)
      this.$router.push({path: '/operationRoom-detail'})
    },
    choose (val) {
      if (this.activeIdArrs.indexOf(val) === -1) {
        this.activeIdArrs.push(val)
      } else {
        if (this.activeIdArrs.length === 1) {
          this.$message.warning('至少需要一个选项')
        } else {
          this.activeIdArrs = this.activeIdArrs.filter(v => {
            return v !== val
          })
        }
      }
    }
  }
}
</script>
<style lang='scss'>
.conBox{
  height: calc( 100vh - 92px);
  display: flex;
  padding: 10px;
  .conBoxInner{
    background: #fff;
    flex: 1;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    .innerTop{
      height: 60px;
      width: 100%;
      border-bottom: 1px solid #F1F3F4;
      padding: 0 24px;
      color: #1F1F1F;
      font-size: 18px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .topBoxConRight{
        padding-left: 20px;
        font-size: 12px;
        font-weight: 400;
        cursor: pointer;
        .chooseBox{
          height: 12px;
          width: 12px;
          background: #B2B2B2;
          border-radius: 2px;
          margin-right: 8px;
        }
      }
      .activeCon{
        .chooseBox{
          background: #3399FF;
        }
      }
    }
    .innerBottom{
      flex: 1;
      overflow: auto;
      .detailsBox{
        display: flex;
        flex-wrap: wrap; /* 允许换行 */
        justify-content: flex-start; /* 居左排列 */
        align-items: flex-start;
        flex: none;
        padding: 20px;
        .detailsBoxInner{
          flex: 0 0 calc((100% - 40px)/3);
          height: 124px;
          /* 间隙为20px */
          margin: 0 20px 20px 0;
          border-radius: 8px;
          padding: 16px 20px;
          border: 1px solid #3399FF;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #757575;
          font-size: 14px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          .pos{
            position: absolute;
            right: 0;
            top: 0;
            height: 70px;
            width: 70px;
            background: linear-gradient(45deg, transparent 50%, #3399FF 50%);
            // display: flex;
            // justify-content: center;
            // align-items: center;
            padding-left: 45px;
            padding-top: 15px;
            color: #fff;
            font-weight: 500;
            font-size: 18px;
          }
          .nameDes{
            color: #1f1f1f;
            font-weight: 500;
          }
        }

        .detailsBoxInnerOther:hover{
          box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.2);
        }
        .detailsBoxInnerToday:hover{
          box-shadow: 0px 3px 10px 0px rgba(51, 153, 255, 0.2);
        }
        .detailsBoxInnerToday{
          border: 1px solid #3399FF;
          .pos{
            background: linear-gradient(45deg, transparent 50%, #3399FF 50%);
          }
        }
        .detailsBoxInnerOther{
          border: 1px solid #B2B2B2;
          .pos{
            background: linear-gradient(45deg, transparent 50%, #B2B2B2 50%);
          }
        }
      }
    }
  }
}

@media (min-width: 200px) and (max-width: 600px) {
  .detailsBoxInner{
    flex: 0 0 calc((100% - 0px)/1) !important;
  }
  .detailsBoxInner:nth-child(1n) {
    margin-right: 0 !important;
  }
}

@media (min-width: 600px) and (max-width: 900px) {
  .detailsBoxInner{
    flex: 0 0 calc((100% - 20px)/2) !important;
  }
  .detailsBoxInner:nth-child(2n) {
    margin-right: 0 !important;
  }
}
@media (min-width: 900px) and (max-width: 1400px) {
  .detailsBoxInner{
    flex: 0 0 calc((100% - 40px)/3) !important;
  }
  .detailsBoxInner:nth-child(3n) {
    margin-right: 0 !important;
  }
}
@media (min-width: 1400px) and (max-width: 1600px) {
  .detailsBoxInner{
    flex: 0 0 calc((100% - 60px)/4) !important;
  }
  .detailsBoxInner:nth-child(4n) {
    margin-right: 0 !important;
  }
}
@media (min-width: 1600px) {
  .detailsBoxInner{
    flex: 0 0 calc((100% - 80px)/5) !important;
  }
  .detailsBoxInner:nth-child(5n) {
    margin-right: 0 !important;
  }
}
</style>
