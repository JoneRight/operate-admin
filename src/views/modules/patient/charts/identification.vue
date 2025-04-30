// 手术患者辨识单
<template>
  <div class="chartsBox" v-if='operationObj.patientInfoEntity && operationObj.patientInfoEntity.id'>
    <!-- 手术患者交接表(术前) -->
    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox">
        <div class="topBoxT flex">
          <div class="headTitle">{{ operationObj.patientInfoEntity.name || '暂无' }}</div>
          <div>
            住院号：{{ operationObj.patientInfoEntity.zhuYuanHao }}
          </div>
        </div>
      </div>
      <div class="conInnerBox">
        <el-row :gutter="10">
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">患者姓名：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.name }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">性别：</span>
              <span class="innerConRight">{{ getSex(operationObj.patientInfoEntity.sex) }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">年龄：</span>
              <span class="innerConRight">{{ getAge(operationObj.patientInfoEntity.birthday) }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">住院号：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.zhuYuanHao }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">床号：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.bedNo }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">科别：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.deptName }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">主治医师：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.doctorName }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">手术日期：</span>
              <span class="innerConRight">{{ operationObj.bsEntity.operationDoctorTime || '暂无' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24">
            <div class="innerCon">
              <span class="innerConLeft">诊断：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.diagnosis }}</span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24">
            <div class="innerCon">
              <span class="innerConLeft">手术名称：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.operateName }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10">
        <div class="topBoxT flex">
          <div class="headTitle">场所：病房 &nbsp; ( 门诊或急诊 )</div>
          <div>
          </div>
        </div>
      </div>
      <div class="topBox flex">
        <div class="topBoxT flex">
          <div class="headTitle">病房护士核对</div>
          <div>
          </div>
        </div>
      </div>
      <div :class="['checkInner flex', operationObj.bsEntity.bfPatientInfo ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          询问患者身份
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.bfPatientInfo" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.bfBingLi ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          核对病例
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.bfBingLi" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.bfWanDai ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          核对腕带上的姓名及住院号
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.bfWanDai" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.bfBuWei ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          核对手术部位及检查手术部位标识
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.bfBuWei" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.bfBuWeiArr ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.bfBuWeiArr" v-for='(item, index) in jsonData.bfBuWeiOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
        <div class='checkInnerChoose flex_aling_center'>
        </div>
      </div>
      <div class="underLineBox"></div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>病房护士签名</p>
        </div>
        <div class='checkInnerChoose flex_center signBox'>
          <img v-if="operationObj.bsEntity.bfNurseImage" style="height: 80px;" :src="'data:image/png;base64,' + operationObj.bsEntity.bfNurseImage" />
          <div v-else>此区域签名</div>
        </div>
      </div>

      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>病房护士签名时间</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.bsEntity.bfNurseTime || '---' }}</div>
        </div>
      </div>

    </div>

    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10">
        <div class="topBoxT flex">
          <div class="headTitle">场所：手术室患者接待处</div>
          <div>
          </div>
        </div>
      </div>
      <div class="topBox flex">
        <div class="topBoxT flex">
          <div class="headTitle">巡回护士与病房护士共同核对</div>
          <div>
          </div>
        </div>
      </div>
      <div :class="['checkInner flex', operationObj.bsEntity.xhPatientInfo ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          询问患者身份
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.xhPatientInfo" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.xhBingLi ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          核对病例
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.xhBingLi" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.xhWanDai ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          核对腕带上的姓名及住院号
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.xhWanDai" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.xhBuWei ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          核对手术部位及检查手术部位标识
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.xhBuWei" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.xhBuWeiArr ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.xhBuWeiArr" v-for='(item, index) in jsonData.bfBuWeiOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
        <div class='checkInnerChoose flex_aling_center'>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.xhShu ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          核对手术及麻醉知情同意书
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.xhShu" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>


      <div class="underLineBox marginTop10"></div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>巡回护士签名</p>
        </div>
        <div class='checkInnerChoose flex_center signBox' style="color: #99999980;cursor: not-allowed">
          <div class="isSignBox flex" v-if="operationObj.bsEntity.xhNurseImage">
            <img style="height: 80px;" :src="'data:image/png;base64,' + operationObj.bsEntity.xhNurseImage" mode="aspectFit"/>
          </div>
          <div class="unSignBox flex" v-if="!operationObj.bsEntity.xhNurseImage">巡回护士未签名</div>
        </div>
      </div>

      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>巡回护士签名时间</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.bsEntity.xhNurseTime || '---' }}</div>
        </div>
      </div>

    </div>

    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10">
        <div class="topBoxT flex">
          <div class="headTitle">手术室暂停（time out）</div>
          <div>
          </div>
        </div>
      </div>
      <div class="topBox flex">
        <div class="topBoxT flex">
          <div class="headTitle">开刀前手术医师、手术室巡回护士及麻醉医师三方核对，由巡回护士主持</div>
          <div>
          </div>
        </div>
      </div>
      <div :class="['checkInner flex', operationObj.bsEntity.toPatientName ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          患者姓名 （麻醉医师回答 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 手术医师回答）
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.toPatientName" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.toOperationName ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          手术名称 （手术医师回答）
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.toOperationName" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.toBuWei ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          手术部位 （手术医师回答）
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.toBuWei" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.bsEntity.toGuoMin ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          有无过敏史 （麻醉医师回答 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 手术医师回答）
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.bsEntity.toGuoMin" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>
      <div class="underLineBox marginTop10"></div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>巡回护士签名</p>
        </div>
        <div class='checkInnerChoose flex_center signBox' style="color: #99999980;cursor: not-allowed">
          <div class="isSignBox flex" v-if="operationObj.bsEntity.toXhNurseImage">
            <img style="height: 80px;" :src="'data:image/png;base64,' + operationObj.bsEntity.toXhNurseImage" mode="aspectFit"/>
          </div>
          <div class="unSignBox flex" v-if="!operationObj.bsEntity.toXhNurseImage">巡回护士未签名</div>
        </div>
      </div>

      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>巡回护士签名时间</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.bsEntity.toXhNurseTime || '---' }}</div>
        </div>
      </div>

      <div class="underLineBox"></div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>麻醉医师签名</p>
        </div>
        <div class='checkInnerChoose flex_center signBox' style="color: #99999980;cursor: not-allowed">
          <div class="isSignBox flex" v-if="operationObj.bsEntity.anesthesiaDoctorImage">
            <img style="height: 80px;" :src="'data:image/png;base64,' + operationObj.bsEntity.anesthesiaDoctorImage" mode="aspectFit"/>
          </div>
          <div class="unSignBox flex" v-if="!operationObj.bsEntity.anesthesiaDoctorImage">麻醉医师未签名</div>
        </div>
      </div>

      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>麻醉医师签名时间</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.bsEntity.anesthesiaDoctorTime || '---' }}</div>
        </div>
      </div>

      <div class="underLineBox"></div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>手术医师签名</p>
        </div>
        <div class='checkInnerChoose flex_center signBox' style="color: #99999980;cursor: not-allowed">
          <div class="isSignBox flex" v-if="operationObj.bsEntity.operationDoctorImage">
            <img style="height: 80px;" :src="'data:image/png;base64,' + operationObj.bsEntity.operationDoctorImage" mode="aspectFit"/>
          </div>
          <div class="unSignBox flex" v-if="!operationObj.bsEntity.operationDoctorImage">手术医师未签名</div>
        </div>
      </div>

      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>手术医师签名时间</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.bsEntity.operationDoctorTime || '---' }}</div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
import { getBs } from '@/api/patient.js'
import jsonData from '@/assets/json/data.json'
import {getSexText, getAgeText} from '@/utils/index'
import moment from 'moment'
export default {
  data () {
    return {
      jsonData: jsonData,
      operationObj: {},
      beforeEditFlag: false
    }
  },
  methods: {
    // 获取详情
    getDetails (val) {
      const formData = new URLSearchParams()
      formData.append('patientId', val.patientId)
      formData.append('paiTaiId', val.paiTaiId)
      getBs(formData).then(res => {
        this.operationObj = res.data.bs
        jsonData.bfBuWeiOptions.map(v => {
          if (this.operationObj.bsEntity[v.value] === '1') {
            this.operationObj.bsEntity.bfBuWeiArr = v.value
          }
        })
      // 巡回护士核对部位
        jsonData.xhBuWeiOptions.map(v => {
          if (this.operationObj.bsEntity[v.value] === '1') {
            this.operationObj.bsEntity.xhBuWeiArr = v.value
          }
        })
      })
    },
    getSex (val) {
      return getSexText(val)
    },
    getAge (val) {
      return getAgeText(val)
    },
    // 计算时限
    computedCurrentDate (date, days) {
      if (!date) {
        // 如果时间为null ，不为真则报错
        return false
      } else {
        // 定义两个日期
        const date1 = moment(date)
        const date2 = moment(new Date())

        // 计算两个日期之间的差异（以天为单位）
        const diffDays = date2.diff(date1, 'days')
        if (diffDays <= days) {
          // 小于最大的天数则为真
          return true
        } else {
          // 大于最大的天数则为假
          return false
        }
      }
    }
  }
}
</script>
<style lang='scss'>
.el-radio{
  margin-right: 10px;
  margin-left: 2px;
}
.el-radio__input.is-disabled+span.el-radio__label{
  color: #666 !important;
}
.el-radio__input.is-disabled .el-radio__inner, .el-radio__input.is-disabled.is-checked .el-radio__inner{
  color: #666 !important;
}
.flex{
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.flex_aling_center_start{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex_aling_center{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.underLineBox{
  border-bottom: 1px solid #D9D9D9;
}
.marginBottom10{
  margin-bottom: 10px;
}
.marginBottom20{
  margin-bottom: 20px;
}
.marginTop10{
  margin-top: 10px;
}
.marginBottom6{
  margin-bottom: 6px;
}
.paddingBottom0{
  padding-bottom: 0 !important;
}
.flex_center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.chartsBox{
  margin: 2px;
  .innerBox-z{
    padding: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 6px;
    .topBox{
      flex-direction: column;
      .topBoxT{
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0 10px 0;
        color: #000;
        .headTitle{
          font-size: 16px;
          font-weight: 600;
        }
      }
      .headDes{
        width: 100%;
        padding: 10px 0;
        justify-content: flex-start;
      }
    }
    .conInnerBox{
      padding-bottom: 10px;
      .innerCon{
        padding: 6px 0;
        color: #333;
        font-size: 14px;
        .innerConRight{
          color: #000;
          font-weight: 500;
          font-size: 14px;
          padding-left: 0;
        }
      }
    }
  }
  .confirmRedText{
    color: #f35626 !important;
    font-size: 12px;
    padding-left: 20px;
    text-decoration: none !important;
  }
  .confirmGreenText{
    color: green !important;
    font-size: 12px;
    padding-left: 20px;
  }
  .checkInner{
    margin: 4px 0;
    padding: 10px 0;
    justify-content: space-between;
    align-items: center;
    .confirmRedText{
      color: #f35626;
      font-size: 12px;
      padding-left: 20px;
      text-decoration: none;
    }
    .checkInnerBox_a{
      color: #3399FF;
      text-decoration: underline;
      cursor: pointer;
    }
    .checkInnerBox_a_none{
      color: #3399FF80;
    }
    .checkInnerChoose{
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
    }
    .signTitle{
      height: 80px;
      width: 130px;
    }
    .signTitle1{
      height: 30px;
      width: 130px;
    }
    .signBox{
      height: 80px;
      flex: 1;
      margin-left: 20px;
      border: 1px dotted #99999980;
      border-radius: 4px;
      justify-content: center !important;
      cursor: pointer;
      overflow: hidden;
    }
    .signDate{
      justify-content: flex-start;
      flex: 1;
      margin-left: 20px;
    }
  }
  .checkInner_choosed{
    background: #f5f5f5;
  }
}
</style>
