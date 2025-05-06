<template>
  <div class="listBox">
    <div class="listBoxTop">
      <div class="listBoxTopTitle">患者列表</div>
    </div>
    <div class="listBoxBottom">
      <div @click="choosePatient(item)" :class="['patientInfoBox', activePatientId === item.id ? 'patientInfoBox_active': '']" v-for="(item,index) in newPatientList" :key='index'>
        <div class="patientInfoBoxTitle">{{ item.roomName }}</div>
        <div class="patientInfoBoxDes">
          <el-row>
            <el-col :span='12' style='padding-bottom: 10px;'>
              <span class='innerTitle'>患者姓名：</span>
              <span class="innerDes">{{ item.name }}</span>
            </el-col>
            <el-col :span='12' style='padding-bottom: 10px;'>
              <span class='innerTitle'>性别：</span>
              <span class="innerDes">{{ getSex(item.sex) }}</span>
            </el-col>
            <el-col :span='12' style='padding-bottom: 10px;'>
              <span class="innerTitle">年龄：</span>
              <span class="innerDes">{{ getAge(item.birthday) }}</span>
            </el-col>
            <el-col :span='12' style='padding-bottom: 10px;'>
              <span class="innerTitle">住院号：</span>
              <span class="innerDes">{{ item.zhuYuanHao }}</span>
            </el-col>
            <el-col :span='12' style='padding-bottom: 10px;'>
              <span class="innerTitle">床号：</span>
              <span class="innerDes">{{ item.bedNo }}</span>
            </el-col>
            <el-col :span='12' style='padding-bottom: 10px;'>
              <span class="innerTitle">科室：</span>
              <span class="innerDes">{{ item.deptName }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getSexText, getAgeText} from '@/utils/index'
export default{
  props: ['patientList', 'activePatientId'],
  data () {
    return {
      newPatientList: []
    }
  },
  created () {
  },
  methods: {
    changePatientList (val) {
      console.log(3434, val)
      this.newPatientList = val
    },
    choosePatient (val) {
      this.$emit('choosePat', val)
    },
    getSex (val) {
      return getSexText(val)
    },
    getAge (val) {
      return getAgeText(val)
    }
  }
}
</script>
<style lang='scss'>
.listBox{
  height: 100%;
  display: flex;
  flex-direction: column;
  .listBoxTop{
    padding: 10px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.6));
    .listBoxTopTitle{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 16px;
    }
  }
  .listBoxBottom{
    padding: 10px;
    flex: 1;
    overflow: auto;
    .patientInfoBox{
      background: #3399ff05;
      border: solid 1px #f5f5f5;
      border-radius: 4px;
      // padding: 6px;
      margin-bottom: 10px;
      cursor: pointer;
      // overflow: hidden;
      .patientInfoBoxTitle{
        padding: 10px;
        width: 100%;
        background: #3399ff90;
        text-align: center;
        color: #fff;
      }
      .patientInfoBoxDes{
        padding: 10px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        .innerDes{
          font-weight: 500;
          color: #000;
        }
      }
    }
    .patientInfoBox_active{
      background: #3399ff25;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
      position: relative;
      .patientInfoBoxTitle{
        background: #3399ff;
      }
    }
    .patientInfoBox_active:after{
      content: '';
      width: 0;
      height: 0;
      border-left: 10px solid transparent; /* 左侧边框透明 */
      border-right: 10px solid transparent; /* 右侧边框透明 */
      border-bottom: 10px solid #3399ff50; /* 底部边框颜色 */
      transform: rotate(90deg);
      position: absolute;
      right: -15px;
      top: 50%;
      z-index: 1000;
    }
  }
}
</style>
