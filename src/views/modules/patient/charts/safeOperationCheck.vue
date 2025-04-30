//  手术安全核查表
<template>
  <div class="chartsBox" v-if='operationObj.patientInfoEntity && operationObj.patientInfoEntity.id'>
    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10">
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
              <span class="innerConLeft">科别：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.deptName }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">患者姓名：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.name }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">性别：</span>
              <span class="innerConRight">{{ getAge(operationObj.patientInfoEntity.sex) }}</span>
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
              <span class="innerConLeft">床号：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.bedNo }}</span>
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
              <span class="innerConLeft">麻醉方式：</span>
              <span class="innerConRight">{{ operationObj.anesthesiaEntity.anesthesiaFs }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">术者：</span>
              <span class="innerConRight">{{ operationObj.operationEntity.operationDoctor }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">手术日期：</span>
              <span class="innerConRight">{{ operationObj.operationEntity.operationDoctorTime }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">手术方式：</span>
              <span class="innerConRight">{{ operationObj.operationEntity.operationFs }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10">
        <div class="topBoxT flex">
          <div class="headTitle">麻醉实施前</div>
          <div>
          </div>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.patientInfo ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          患者姓名、性别、年龄
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.patientInfo" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.operationFs ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          手术方式确认
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.operationFs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.operationBwBs ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          手术部位与标识正确
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.operationBwBs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.operatonZq ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          手术知情同意
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.operatonZq" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.anesthesiaZq ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          麻醉知情同意
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.anesthesiaZq" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.anesthesiaFs ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          麻醉方式确认
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.anesthesiaFs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.anesthesiaSb ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          麻醉设备安全检查完成
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.anesthesiaSb" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.piFu ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          皮肤是否完整
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.piFu" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.syPiFu ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          术野皮肤准备正确
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.syPiFu" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.jmTd ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          静脉通道建立完成
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.jmTd" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.guoMin ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          患者是否有过敏史
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.guoMin" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.piShi ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          抗菌药物皮试结果
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.piShi" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.beiXue ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          术前备血
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.beiXue" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.jiaTi ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          假体
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.jiaTi" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.tiNei ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          体内植入物
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.tiNei" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.yingXiang ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          影像学资料
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.yingXiang" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.anesthesiaEntity.qiTa ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          其他
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.anesthesiaEntity.qiTa" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>
    </div>

    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10">
        <div class="topBoxT flex">
          <div class="headTitle">手术开始前</div>
          <div>
          </div>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.operationEntity.patientInfo ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          患者姓名、性别、年龄
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.operationEntity.patientInfo" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.operationEntity.operationFs ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          手术方式确认
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.operationEntity.operationFs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.operationEntity.operationBwBs ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          手术部位与标识正确
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.operationEntity.operationBwBs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div class="topBox flex underLineBox marginBottom10 marginTop10"></div>

      <div class="topBox flex">
        <div class="topBoxT flex">
          <div class="headTitle" style="font-size: 16px;">手术、麻醉风险预警</div>
          <div>
          </div>
        </div>
      </div>
      <div class="topBox flex">
        <div class="topBoxT flex">
          <div class="headTitle" style="font-size: 14px;">手术医师陈述</div>
          <div>
          </div>
        </div>
      </div>
      <div v-if="operationDocChenShuArr.length >= 0" :class="['checkInner flex', operationDocChenShuArr ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          <el-checkbox-group :disabled="!beforeEditFlag" v-model="operationDocChenShuArr">
            <el-checkbox v-for="(item,index) in jsonData.operationDocChenShuOptions" :label="item.value" :key="index">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class='checkInnerChoose flex_aling_center'>
        </div>
      </div>

      <div class="topBox flex">
        <div class="topBoxT flex">
          <div class="headTitle" style="font-size: 14px;">麻醉师陈述</div>
          <div>
          </div>
        </div>
      </div>
      <div v-if="anesthesiaDocChenShuOptionsArr.length >= 0" :class="['checkInner flex', anesthesiaDocChenShuOptionsArr ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          <el-checkbox-group :disabled="!beforeEditFlag" v-model="anesthesiaDocChenShuOptionsArr">
            <el-checkbox v-for="(item,index) in jsonData.anesthesiaDocChenShuOptions" :label="item.value" :key="index">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class='checkInnerChoose flex_aling_center'>
        </div>
      </div>

      <div class="topBox flex">
        <div class="topBoxT flex">
          <div class="headTitle" style="font-size: 14px;">手术护士陈述</div>
          <div>
          </div>
        </div>
      </div>
      <div v-if="ShuOptionsArr.length >= 0" :class="['checkInner flex', ShuOptionsArr ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          <el-checkbox-group :disabled="!beforeEditFlag" v-model="ShuOptionsArr">
            <el-checkbox v-for="(item,index) in jsonData.ShuOptionsOptions" :label="item.value" :key="index">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class='checkInnerChoose flex_aling_center'>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.operationEntity.yingXiang ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          是否需要相关影像资料
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.operationEntity.yingXiang" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.operationEntity.qiTa ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          其他
        </div>
        <div class='checkInnerChoose flex_aling_center' style="flex: 1">
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.operationEntity.qiTa" placeholder="" input-align="left" class="common-input" :style="'width: 100%;border-radius: 2px;margin: 0 10px;'" size="small"></el-input>
        </div>
      </div>

    </div>


    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10">
        <div class="topBoxT flex">
          <div class="headTitle">患者离开手术室前</div>
          <div>
          </div>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.backEntity.patientInfo ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          患者姓名、性别、年龄
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.backEntity.patientInfo" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.backEntity.operationFs ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          实际手术方式确认
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.backEntity.operationFs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.backEntity.yySx ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          手术用药、输血的核查
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.backEntity.yySx" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.backEntity.yongWu ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          手术用物清点正确
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.backEntity.yongWu" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.backEntity.biaoBen ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          手术标本确认
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.backEntity.biaoBen" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationObj.backEntity.piFu ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          皮肤是否完整
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.backEntity.piFu" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div class="topBox flex underLineBox marginBottom10 marginTop10"></div>

      <div class="topBox flex">
        <div class="topBoxT flex">
          <div class="headTitle" style="font-size: 14px;">各种管路</div>
          <div>
          </div>
        </div>
      </div>
      <div v-if="tongLuArr.length >= 0" :class="['checkInner flex', tongLuArr ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          <el-checkbox-group :disabled="!beforeEditFlag" v-model="tongLuArr">
            <el-checkbox v-for="(item,index) in jsonData.tongLuOptions" :label="item.value" :key="index">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class='checkInnerChoose flex_aling_center'>
        </div>
      </div>

      <div class="topBox flex">
        <div class="topBoxT flex">
          <div class="headTitle" style="font-size: 14px;">患者去向</div>
          <div>
          </div>
        </div>
      </div>
      <div v-if="quXiangArr.length >= 0" :class="['checkInner flex', quXiangArr ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          <el-checkbox-group :disabled="!beforeEditFlag" v-model="quXiangArr">
            <el-checkbox v-for="(item,index) in jsonData.quXiangOptions" :label="item.value" :key="index">{{item.label}}</el-checkbox>
          </el-checkbox-group>
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.backEntity.qxQt" placeholder="" input-align="left" class="common-input" :style="'width: 200px;border-radius: 2px;margin: 0 10px;'" size="small"></el-input>
        </div>
        <div class='checkInnerChoose flex_aling_center'>
        </div>
      </div>


    </div>


    <div class="innerBox-z marginBottom20">
      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>手术医生签名</p>
        </div>
        <div class='checkInnerChoose flex_center signBox' style="color: #99999980;cursor: not-allowed">
          <div class="isSignBox flex" v-if="operationObj.anesthesiaEntity.operationDoctorImage">
            <img style="height: 80px;" :src="'data:image/png;base64,' + operationObj.anesthesiaEntity.operationDoctorImage" mode="aspectFit"/>
          </div>
          <div class="unSignBox flex" v-if="!operationObj.anesthesiaEntity.operationDoctorImage">手术室护士未签名</div>
        </div>
      </div>
      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>手术医生签名时间</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.anesthesiaEntity.operationDoctorTime || '---' }}</div>
        </div>
      </div>
      <div class="underLineBox marginBottom10"></div>
      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>手术室护士签名</p>
        </div>
        <div class='checkInnerChoose flex_center signBox' style="color: #99999980;cursor: not-allowed">
          <div class="isSignBox flex" v-if="operationObj.anesthesiaEntity.operationNurseImage">
            <img style="height: 80px;" :src="'data:image/png;base64,' + operationObj.anesthesiaEntity.operationNurseImage" mode="aspectFit"/>
          </div>
          <div class="unSignBox flex" v-if="!operationObj.anesthesiaEntity.operationNurseImage">手术室护士未签名</div>
        </div>
      </div>
      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>手术室护士签名时间</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.anesthesiaEntity.operationNurseTime || '---' }}</div>
        </div>
      </div>
      <div class="underLineBox marginBottom10"></div>
      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>麻醉师签名</p>
        </div>

        <div class='checkInnerChoose flex_center signBox' style="color: #99999980;cursor: not-allowed">
          <div class="isSignBox flex" v-if="operationObj.anesthesiaEntity.anesthesiaDoctorImage">
            <img style="height: 80px;" :src="'data:image/png;base64,' + operationObj.anesthesiaEntity.anesthesiaDoctorImage" mode="aspectFit"/>
          </div>
          <div class="unSignBox flex" v-if="!operationObj.anesthesiaEntity.anesthesiaDoctorImage">麻醉师未签名</div>
        </div>

      </div>
      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>麻醉师签名时间</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.anesthesiaEntity.anesthesiaDoctorTime || '---' }}</div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import { getCheck } from '@/api/patient.js'
import jsonData from '@/assets/json/data.json'
import {getSexText, getAgeText} from '@/utils/index'
import moment from 'moment'
export default {
  data () {
    return {
      operationDocChenShuArr: [],
      anesthesiaDocChenShuOptionsArr: [],
      ShuOptionsArr: [],
      tongLuArr: [],
      quXiangArr: [],
      jsonData: jsonData,
      operationObj: {
        patientInfoEntity: {},
        operationEntity: {
        },
        backEntity: {},
        anesthesiaEntity: {}
      },
      beforeEditFlag: false
    }
  },
  methods: {
    // 获取详情
    getDetails (val) {
      const formData = new URLSearchParams()
      formData.append('patientId', val.patientId)
      formData.append('paiTaiId', val.paiTaiId)
      getCheck(formData).then(res => {
        this.operationObj.patientInfoEntity = res.data.operationEntity.patientInfoEntity
        this.operationObj.operationEntity = res.data.operationEntity.operationEntity
        this.operationObj.backEntity = res.data.operationEntity.backEntity
        this.operationObj.anesthesiaEntity = res.data.operationEntity.anesthesiaEntity

        // 手术医师陈述
        this.operationDocChenShuArr = []
        // 麻醉医师陈述
        this.anesthesiaDocChenShuOptionsArr = []
        // 手术护士陈述
        this.ShuOptionsArr = []
        this.tongLuArr = []
        this.quXiangArr = []
        // 手术医师陈述
        jsonData.operationDocChenShuOptions.map(val => {
          if (res.data.operationEntity.operationEntity[val.value] === '1') {
            this.operationDocChenShuArr.push(val.value)
          }
        })
        // 麻醉师陈述
        jsonData.anesthesiaDocChenShuOptions.map(val => {
          if (res.data.operationEntity.operationEntity[val.value] === '1') {
            this.anesthesiaDocChenShuOptionsArr.push(val.value)
          }
        })
        // 手术护士陈述
        jsonData.ShuOptionsOptions.map(val => {
          if (res.data.operationEntity.operationEntity[val.value] === '1') {
            this.ShuOptionsArr.push(val.value)
          }
        })
        // 各种管路
        jsonData.tongLuOptions.map(val => {
          if (res.data.operationEntity.backEntity[val.value] === '1') {
            this.tongLuArr.push(val.value)
          }
        })
        // 患者去向
        jsonData.quXiangOptions.map(val => {
          if (res.data.operationEntity.backEntity[val.value] === '1') {
            this.quXiangArr = val.value
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

