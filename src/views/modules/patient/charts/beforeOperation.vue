<template>
  <div class="chartsBox" v-if='operationDetail.operateEntity'>
    <!-- 手术患者交接表(术前) -->
    <div class="innerBox-z marginBottom20">
      <div class="topBox flex">
        <div class="topBoxT flex">
          <div class="headTitle">{{ operationDetail.operateEntity.operateRoom || '暂无' }}</div>
          <div>
            <el-radio v-model="operationDetail.operateEntity.operateType" :disabled='true' v-for='(item, index) in jsonData.emergencyList' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
          </div>
        </div>
        <div class="headDes flex_center underLineBox marginBottom6">{{ operationDetail.operateEntity.roomName || '暂无' }}</div>
      </div>
      <div class="conInnerBox marginBottom6 underLineBox">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="innerCon">
              <span class="innerConLeft">手术日期：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.operateDate }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">科别：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.deptName }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">病区：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.ward }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">姓名：</span>
              <span class="innerConRight">{{ operationDetail.patientInfoEntity.name }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">住院号：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.zhuYuanHao }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">性别：</span>
              <span class="innerConRight">{{ getSex(operationDetail.patientInfoEntity.sex) }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">年龄：</span>
              <span class="innerConRight">{{ getAge(operationDetail.patientInfoEntity.birthday) }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">拟手术名称：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.niOperateName }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">手术名称：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.operateName }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">麻醉方式：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.anesthesia }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12">
            <div class="innerCon">
              <span class="innerConLeft">入手术室时间：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.inTime }}</span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="innerCon">
              <span class="innerConLeft">出手术室时间：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.outTime }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">手术级别：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.operateLevel }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">手术医生：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.doctorName }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">医生级别：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.doctorLevel }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">手术部位：</span>
              <span class="innerConRight">{{ operationDetail.operateEntity.operatePart }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="conInnerBox paddingBottom0">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="innerCon">
              <span class="innerConLeft">手术标识：</span>
              <el-radio v-model="operationDetail.operateEntity.operateFlag" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="innerCon">
              <span class="innerConLeft">手术体位：</span>
              <el-radio v-model="operationDetail.operateEntity.bodyPosition" v-for='(item, index) in jsonData.bodyPositionOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="innerCon">
              <span class="innerConLeft">手术分级管理审核：</span>
              <el-radio v-model="operationDetail.operateEntity.operateExam" v-for='(item, index) in jsonData.operateExamOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="innerCon">
              <span class="innerConLeft">患者腕带：</span>
              <el-radio v-model="operationDetail.operateEntity.wanDai" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox">
        <div class="topBoxT flex">
          <div class="headTitle">接患者登记表</div>
          <div>
            编辑
          </div>
        </div>
      </div>
      <!-- 手术(操作)知情同意书 start -->
      <div :class="['flex', 'checkInner', (operationDetail.operateEntity.operateInformedIs == '1' || operationDetail.operateEntity.operateInformedIs == '0') ? 'checkInner_choosed' : '' ]">
        <div>
          <span :class="['checkInnerBox_a', !operationDetail.operateEntity.operateInformed ? 'checkInnerBox_a_none' : '']">
            手术(操作)知情同意书
          </span>
          <span v-if="!operationDetail.operateEntity.operateInformed" class='confirmRedText'>未查询到该《手术(操作)知情同意书》</span>
          <span v-if="operationDetail.operateEntity.operateInformed && operationDetail.operateEntity.operateInformedIs == '0'" class='confirmRedText'>已查询到 《手术(操作)知情同意书》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">无</span>的选项，请确认</span>
          <span v-if="!operationDetail.operateEntity.operateInformed && operationDetail.operateEntity.operateInformedIs == '1'" class='confirmRedText'>未查询到 《手术(操作)知情同意书》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">有</span>的选项，请确认</span>
        </div>
        <div class="checkInnerChoose">
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.operateInformedIs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>
      <!-- 手术(操作)知情同意书 end -->

      <!-- 患者授权书 start -->
      <div :class="['flex', 'checkInner', (operationDetail.operateEntity.patientAuthorIs == '1' || operationDetail.operateEntity.patientAuthorIs == '0') ? 'checkInner_choosed' : '' ]">
        <div>
          <span :class="['checkInnerBox_a', !operationDetail.operateEntity.patientAuthor ? 'checkInnerBox_a_none' : '']">
            患者授权书
          </span>
          <span v-if="!operationDetail.operateEntity.patientAuthor" class='confirmRedText'>未查询到该《患者授权书》</span>
          <span v-if="operationDetail.operateEntity.patientAuthor && operationDetail.operateEntity.patientAuthorIs == '0'" class='confirmRedText'>已查询到 《患者授权书》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">无</span>的选项，请确认</span>
          <span v-if="!operationDetail.operateEntity.patientAuthor && operationDetail.operateEntity.patientAuthorIs == '1'" class='confirmRedText'>未查询到 《患者授权书》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">有</span>的选项，请确认</span>
        </div>
        <div class="checkInnerChoose">
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.patientAuthorIs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>
      <!-- 患者授权书 end -->

      <!-- 输血治疗知情同意书 start -->
      <div :class="['flex', 'checkInner', (operationDetail.operateEntity.transfuseInformedIs == '1' || operationDetail.operateEntity.transfuseInformedIs == '0') ? 'checkInner_choosed' : '' ]">
        <div>
          <span :class="['checkInnerBox_a', !operationDetail.operateEntity.transfuseInformed ? 'checkInnerBox_a_none' : '']">
            输血治疗知情同意书
          </span>
          <span v-if="!operationDetail.operateEntity.transfuseInformed" class='confirmRedText'>未查询到该《输血治疗知情同意书》</span>
          <span v-if="operationDetail.operateEntity.transfuseInformed && operationDetail.operateEntity.transfuseInformedIs == '0'" class='confirmRedText'>已查询到 《输血治疗知情同意书》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">无</span>的选项，请确认</span>
          <span v-if="!operationDetail.operateEntity.transfuseInformed && operationDetail.operateEntity.transfuseInformedIs == '1'" class='confirmRedText'>未查询到 《输血治疗知情同意书》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">有</span>的选项，请确认</span>
        </div>
        <div class="checkInnerChoose">
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.transfuseInformedIs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>
      <!-- 输血治疗知情同意书 end -->

      <!-- 手术安全核查单 start -->
      <div :class="['flex', 'checkInner', (operationDetail.operateEntity.safetyBillIs == '1' || operationDetail.operateEntity.safetyBillIs == '0') ? 'checkInner_choosed' : '' ]">
        <div>
          <span :class="['checkInnerBox_a', !operationDetail.operateEntity.safetyBill ? 'checkInnerBox_a_none' : '']">
            手术安全核查单
          </span>
          <span v-if="!operationDetail.operateEntity.safetyBill" class='confirmRedText'>未查询到该《手术安全核查单》</span>
          <span v-if="operationDetail.operateEntity.safetyBill && operationDetail.operateEntity.safetyBillIs == '0'" class='confirmRedText'>已查询到 《手术安全核查单》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">无</span>的选项，请确认</span>
          <span v-if="!operationDetail.operateEntity.safetyBill && operationDetail.operateEntity.safetyBillIs == '1'" class='confirmRedText'>未查询到 《手术安全核查单》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">有</span>的选项，请确认</span>
        </div>
        <div class="checkInnerChoose">
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.safetyBillIs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>
      <!-- 手术安全核查单 end -->

      <!-- 手术风险评估表 start -->
      <div :class="['flex', 'checkInner', (operationDetail.operateEntity.operateRiskBillIs == '1' || operationDetail.operateEntity.operateRiskBillIs == '0') ? 'checkInner_choosed' : '' ]">
        <div>
          <span :class="['checkInnerBox_a', !operationDetail.operateEntity.operateRiskBill ? 'checkInnerBox_a_none' : '']">
            手术风险评估表
          </span>
          <span v-if="!operationDetail.operateEntity.operateRiskBill" class='confirmRedText'>未查询到该《手术风险评估表》</span>
          <span v-if="operationDetail.operateEntity.operateRiskBill && operationDetail.operateEntity.operateRiskBillIs == '0'" class='confirmRedText'>已查询到 《手术风险评估表》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">无</span>的选项，请确认</span>
          <span v-if="!operationDetail.operateEntity.operateRiskBill && operationDetail.operateEntity.operateRiskBillIs == '1'" class='confirmRedText'>未查询到 《手术风险评估表》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">有</span>的选项，请确认</span>
        </div>
        <div class="checkInnerChoose">
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.operateRiskBillIs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>
      <!-- 手术风险评估表 end -->

      <!-- 手术患者辨识记录单 start -->
      <div :class="['flex', 'checkInner', (operationDetail.operateEntity.identifyBillIs == '1' || operationDetail.operateEntity.identifyBillIs == '0') ? 'checkInner_choosed' : '' ]">
        <div>
          <span :class="['checkInnerBox_a', !operationDetail.operateEntity.identifyBill ? 'checkInnerBox_a_none' : '']">
            手术患者辨识记录单
          </span>
          <span v-if="!operationDetail.operateEntity.identifyBill" class='confirmRedText'>未查询到该《手术患者辨识记录单》</span>
          <span v-if="operationDetail.operateEntity.identifyBill && operationDetail.operateEntity.identifyBillIs == '0'" class='confirmRedText'>已查询到 《手术患者辨识记录单》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">无</span>的选项，请确认</span>
          <span v-if="!operationDetail.operateEntity.identifyBill && operationDetail.operateEntity.identifyBillIs == '1'" class='confirmRedText'>未查询到 《手术患者辨识记录单》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">有</span>的选项，请确认</span>
        </div>
        <div class="checkInnerChoose">
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.identifyBillIs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>
      <!-- 手术患者辨识记录单 end -->

      <!-- 术前小结 start -->
      <div :class="['flex', 'checkInner', (operationDetail.operateEntity.operateXjIs == '1' || operationDetail.operateEntity.operateXjIs == '0') ? 'checkInner_choosed' : '' ]">
        <div>
          <span :class="['checkInnerBox_a', !operationDetail.operateEntity.operateXj ? 'checkInnerBox_a_none' : '']">
            术前小结
          </span>
          <span v-if="!operationDetail.operateEntity.operateXj" class='confirmRedText'>未查询到该《术前小结》</span>
          <span v-if="operationDetail.operateEntity.operateXj && operationDetail.operateEntity.operateXjIs == '0'" class='confirmRedText'>已查询到 《术前小结》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">无</span>的选项，请确认</span>
          <span v-if="!operationDetail.operateEntity.operateXj && operationDetail.operateEntity.operateXjIs == '1'" class='confirmRedText'>未查询到 《术前小结》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">有</span>的选项，请确认</span>
        </div>
        <div class="checkInnerChoose">
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.operateXjIs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>
      <!-- 术前小结 end -->

      <!-- 静脉血栓栓塞症风险评估表 start -->
      <div :class="['flex', 'checkInner', (operationDetail.operateEntity.thrombusRiskBillIs == '1' || operationDetail.operateEntity.thrombusRiskBillIs == '0') ? 'checkInner_choosed' : '' ]">
        <div>
          <span :class="['checkInnerBox_a', !operationDetail.operateEntity.thrombusRiskBill ? 'checkInnerBox_a_none' : '']">
            静脉血栓栓塞症风险评估表
          </span>
          <span v-if="!operationDetail.operateEntity.thrombusRiskBill" class='confirmRedText'>未查询到该《静脉血栓栓塞症风险评估表》</span>
          <span v-if="operationDetail.operateEntity.thrombusRiskBill && operationDetail.operateEntity.thrombusRiskBillIs == '0'" class='confirmRedText'>已查询到 《静脉血栓栓塞症风险评估表》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">无</span>的选项，请确认</span>
          <span v-if="!operationDetail.operateEntity.thrombusRiskBill && operationDetail.operateEntity.thrombusRiskBillIs == '1'" class='confirmRedText'>未查询到 《静脉血栓栓塞症风险评估表》，但却勾选了<span style="color: red; font-weight: 700; padding: 0 2px;">有</span>的选项，请确认</span>
        </div>
        <div class="checkInnerChoose">
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.thrombusRiskBillIs" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>
      <!-- 静脉血栓栓塞症风险评估表 end -->

      <div :class="['flex', 'checkInner', (operationDetail.operateEntity.thrombusRiskResult == '1' || operationDetail.operateEntity.thrombusRiskResult == '2') ? 'checkInner_choosed' : '' ]">
        <div>
          <span>
            静脉血栓栓塞症风险评估表结果
          </span>
        </div>
        <div class="checkInnerChoose">
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.thrombusRiskResult" v-for='(item, index) in jsonData.thrombusRiskResultList' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['flex', 'checkInner']">
        <div>
          <span>
          </span>
        </div>
        <div class="checkInnerChoose">
          <el-checkbox :disabled="!beforeEditFlag" v-model="operationDetail.operateEntity.erJvTi" size="small">D-二聚体测定</el-checkbox>
          <el-checkbox :disabled="!beforeEditFlag" v-model="operationDetail.operateEntity.chaoSheng" size="small">下肢静脉超声检查</el-checkbox>
        </div>
      </div>

      <div class="underLineBox marginBottom10 marginTop10"></div>

      <!-- 这些数据 ：最近一次对应检验结果是否存在，如果存在自动选择 “有”，否则选择 “无”。  start -->
      <!--
          1、血常规                    7天有效              血凝常规: bloodClotting             血凝常规时间: bloodClottingTime
          2、血凝常规                  7天有效               血常规:  bloodTest                 血常规时间:  bloodTestTime
          3、ABO红细胞定型             本次住院有即可
          4、血型单特意抗体为采后的     3天
          5、病毒标志物监测            90天
      -->
      <div :class="['checkInner flex', (operationDetail.operateEntity.bloodClotting == '1' || operationDetail.operateEntity.bloodClotting == '0') ? 'checkInner_choosed' : '' , (operationDetail.operateEntity.bloodClottingTime && computedCurrentDate(operationDetail.operateEntity.bloodClottingTime, 7) ? '': ' justTipsRed')  ]" id="bloodClotting">
        <div>
          血凝常规
          <!-- 如果不合格的话需要提示 -->
          <span :class="(operationDetail.operateEntity.bloodClottingTime && computedCurrentDate(operationDetail.operateEntity.bloodClottingTime, 7))? 'confirmGreenText': 'confirmRedText'">
            最新检验时间：{{ operationDetail.operateEntity.bloodClottingTime || '暂无' }} 有效时限 （7天内有效）
          </span>
        </div>
        <div class='checkInnerChoose'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.bloodClotting" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', (operationDetail.operateEntity.bloodTest == '1' || operationDetail.operateEntity.bloodTest == '0') ? 'checkInner_choosed' : '' , (operationDetail.operateEntity.bloodTestTime && computedCurrentDate(operationDetail.operateEntity.bloodTestTime, 7) ? '': ' justTipsRed')  ]" id="bloodTest">
        <div>
          血常规
          <!-- 如果不合格的话需要提示 -->
          <span :class="(operationDetail.operateEntity.bloodTestTime && computedCurrentDate(operationDetail.operateEntity.bloodTestTime, 7))? 'confirmGreenText': 'confirmRedText'">
            最新检验时间：{{ operationDetail.operateEntity.bloodTestTime || '暂无' }} 有效时限 （7天内有效）
          </span>
        </div>
        <div class='checkInnerChoose'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.bloodTest" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', (operationDetail.operateEntity.abo == '1' || operationDetail.operateEntity.abo == '0') ? 'checkInner_choosed' : '' , (operationDetail.operateEntity.bloodTestTime && computedCurrentDate(operationDetail.operateEntity.bloodTestTime, 7) ? '': ' justTipsRed')  ]" id="bloodTest">
        <div>
          ABO红细胞定型
          <!-- 如果不合格的话需要提示 -->
          <span :class="operationDetail.operateEntity.abo === '1' ? 'confirmGreenText' : operationDetail.operateEntity.abo === '0' ? 'confirmRedText' : 'confirmRedText' ">
            提示：{{ operationDetail.operateEntity.abo === '1' ? 'ABO血型本次住院已做' : operationDetail.operateEntity.abo === '0' ? 'ABO血型本次住院未做' : 'ABO血型本次住院未做'}}
          </span>
        </div>
        <div class='checkInnerChoose'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.abo" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', (operationDetail.operateEntity.antisubstance == '1' || operationDetail.operateEntity.antisubstance == '0') ? 'checkInner_choosed' : '' , (operationDetail.operateEntity.antisubstanceTime && computedCurrentDate(operationDetail.operateEntity.antisubstanceTime, 3) ? '': ' justTipsRed')  ]" id="antisubstance">
        <div>
          血型单特异性抗体鉴定
          <!-- 如果不合格的话需要提示 -->
          <span :class="(operationDetail.operateEntity.antisubstanceTime && computedCurrentDate(operationDetail.operateEntity.antisubstanceTime, 3))? 'confirmGreenText': 'confirmRedText'">
            最新检验时间：{{ operationDetail.operateEntity.antisubstanceTime || '暂无' }} 有效时限 （3天内有效）
          </span>
        </div>
        <div class='checkInnerChoose'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.antisubstance" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', (operationDetail.operateEntity.virusSafety == '1' || operationDetail.operateEntity.virusSafety == '0') ? 'checkInner_choosed' : '' , (operationDetail.operateEntity.virusSafetyTime && computedCurrentDate(operationDetail.operateEntity.virusSafetyTime, 90) ? '': ' justTipsRed')  ]" id="virusSafety">
        <div>
          病毒标志物全项
          <!-- 如果不合格的话需要提示 -->
          <span :class="(operationDetail.operateEntity.virusSafetyTime && computedCurrentDate(operationDetail.operateEntity.virusSafetyTime, 90))? 'confirmGreenText': 'confirmRedText'">
            最新检验时间：{{ operationDetail.operateEntity.virusSafetyTime || '暂无' }} 有效时限 （90天内有效）
          </span>
        </div>
        <div class='checkInnerChoose'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.virusSafety" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div class="underLineBox marginBottom10 marginTop10"></div>

      <div :class="['checkInner flex', operationDetail.operateEntity.jmsy ? 'checkInner_choosed' : '' ]" id="jmsy">
        <div>
          静脉输液
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.jmsy" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
          <el-input :disabled='!beforeEditFlag || operationDetail.operateEntity.jmsy !== "1"' v-model="operationDetail.operateEntity.jmsyBw" placeholder="" input-align="center" class="common-input" :style="'width: 200px;border-radius: 2px;margin: 0 10px;'" size="small"></el-input>
          <div>部位</div>
        </div>
      </div>

      <div :class="['checkInner flex', operationDetail.operateEntity.piShi ? 'checkInner_choosed' : '' ]" id="piShi">
        <div>
          皮试
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.piShi" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationDetail.operateEntity.weiGuan ? 'checkInner_choosed' : '' ]" id="weiGuan">
        <div>
          胃管
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.weiGuan" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationDetail.operateEntity.niaoGuan ? 'checkInner_choosed' : '' ]" id="niaoGuan">
        <div>
          尿管
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.niaoGuan" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationDetail.operateEntity.yinLiuGuan ? 'checkInner_choosed' : '' ]" id="yinLiuGuan">
        <div>
          引流管
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.yinLiuGuan" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', (operationDetail.operateEntity.jinShiTime &&  operationDetail.operateEntity.jinShuiTime ) ? 'checkInner_choosed' : '' ]" id="JinShiShuiShiJian">
        <div>
          禁食水时间
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <div>禁食</div>
          <el-input :disabled='!beforeEditFlag' v-model="operationDetail.operateEntity.jinShiTime" placeholder="" input-align="center" class="common-input" :style="'width: 200px;border-radius: 2px;margin: 0 10px;'" size="small"></el-input>
          <div>小时</div>
          <div style="padding-left: 10px;">禁饮</div>
          <el-input :disabled='!beforeEditFlag' v-model="operationDetail.operateEntity.jinShuiTime" placeholder="" input-align="center" class="common-input" :style="'width: 200px;border-radius: 2px;margin: 0 10px;'" size="small"></el-input>
          <div>小时</div>
        </div>
      </div>

      <div :class="['checkInner flex', operationDetail.operateEntity.daoNiao ? 'checkInner_choosed' : '' ]" id="daoNiao">
        <div>
          导尿包
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.daoNiao" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex', operationDetail.operateEntity.fuDai ? 'checkInner_choosed' : '' ]" id="fuDai">
        <div>
          腹带(或胸带)
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.fuDai" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>


      <div :class="['checkInner flex', ( operationDetail.operateEntity.yingXiang ) ? 'checkInner_choosed' : '' ]" id="yingXiang">
        <div>
          影像学资料
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.yingXiang" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
          <el-input :disabled='!beforeEditFlag || operationDetail.operateEntity.yingXiang !== "1"' v-model="operationDetail.operateEntity.yingXiangCount" placeholder="" input-align="center" class="common-input" :style="'width: 200px;border-radius: 2px;margin: 0 10px;'" size="small"></el-input>
          <div>张</div>
        </div>
      </div>


    </div>

    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox">
        <div class="topBoxT flex">
          <div class="headTitle">术前带药情况</div>
        </div>
      </div>
      <div :class="['checkInner flex', 'underLineBox']"  v-for="(item, index) in operationDetail.drugs" :key="index">
        <div>{{ item.drugName }}</div>
        <div class='checkInnerChoose flex_aling_center'>
          {{ item.unit }}
        </div>
      </div>
    </div>

    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox">
        <div class="topBoxT flex">
          <div class="headTitle">其他情况</div>
        </div>
      </div>


      <div :class="['checkInner flex', operationDetail.operateEntity.piFuQk ? 'checkInner_choosed' : '' ]" id="piFuQk">
        <div>
          皮肤情况
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.piFuQk" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex']" id="piFuQk">
        <div>
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <div>部位</div>
          <el-input :disabled="!beforeEditFlag || operationDetail.operateEntity.piFuQk == '1'" v-model="operationDetail.operateEntity.piFuBw" placeholder="" input-align="center" class="common-input" :style="'width: 200px;border-radius: 2px;margin: 0 10px;'" size="small"></el-input>
          <div style="padding-left: 10px;">面积</div>
          <el-input :disabled="!beforeEditFlag || operationDetail.operateEntity.piFuQk == '1'" v-model="operationDetail.operateEntity.piFuMj" placeholder="" input-align="center" class="common-input" :style="'width: 200px;border-radius: 2px;margin: 0 10px;'" size="small"></el-input>
          <div>cm</div>
        </div>
      </div>


      <div :class="['checkInner flex']" id="remarks" style="align-items: flex-start;">
        <div style="width: 80px;">
          备注：
        </div>
        <div class='checkInnerChoose flex_aling_center' style="flex: 1">
          <el-input :disabled="!beforeEditFlag" v-model="operationDetail.operateEntity.remarks" placeholder="" input-align="center" class="common-input" :style="'width: 100%;border-radius: 2px;margin: 0 10px;'" type="textarea" :rows="4" size="small"></el-input>
        </div>
      </div>

      <div :class="['checkInner flex']" id="dianDi">
        <div style="width: 80px;">
          注射部位：
        </div>
        <div class='checkInnerChoose flex_aling_center' style="flex: 1">
          <el-input :disabled="!beforeEditFlag" v-model="operationDetail.operateEntity.dianDi" placeholder="" input-align="center" class="common-input" :style="'width: 100%;border-radius: 2px;margin: 0 10px;'" size="small"></el-input>
        </div>
      </div>

    </div>

    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox">
        <div class="topBoxT flex">
          <div class="headTitle">护士签名</div>
        </div>
      </div>


      <div :class="['checkInner flex', operationDetail.operateEntity.piFuQk ? 'checkInner_choosed' : '' ]" id="piFuQk">
        <div>
          皮肤情况
        </div>
        <div class='checkInnerChoose flex_aling_center'>
          <el-radio :disabled="!beforeEditFlag"  v-model="operationDetail.operateEntity.piFuQk" v-for='(item, index) in jsonData.haveOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
        </div>
      </div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>病房护士签名</p>
        </div>
        <div class='checkInnerChoose flex_center signBox'>
          <div>此区域签名</div>
        </div>
      </div>

      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>病房护士签名时间</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>---</div>
        </div>
      </div>

      <div class="underLineBox"></div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>手术室护士签名</p>
        </div>
        <div class='checkInnerChoose flex_center signBox' style="color: #99999980;cursor: not-allowed">
          <div>此区域签名</div>
        </div>
      </div>

      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>手术室护士签名时间</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>---</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetail } from '@/api/patient.js'
import jsonData from '@/assets/json/data.json'
import {getSexText, getAgeText} from '@/utils/index'
import moment from 'moment'
export default {
  data () {
    return {
      jsonData: jsonData,
      operationDetail: {
        // patientInfoEntity: {},
        // operateEntity: {},
        // drugs: []
      },
      beforeEditFlag: true
    }
  },
  methods: {
    // 获取详情
    getDetails (val) {
      const formData = new URLSearchParams()
      formData.append('patientId', val.patientId)
      formData.append('paiTaiId', val.paiTaiId)
      getDetail(formData).then(res => {
        this.operationDetail = res.data.operationDetail
        // 需要处理成true  或者false    operationDetail.operateEntity.erJvTi===>D-二聚体测定     operationDetail.operateEntity.chaoSheng===>下肢静脉超声检查
        this.operationDetail.operateEntity.erJvTi = this.operationDetail.operateEntity.erJvTi === '1' ? true : this.operationDetail.operateEntity.erJvTi === '0' ? false : ''
        this.operationDetail.operateEntity.chaoSheng = this.operationDetail.operateEntity.chaoSheng === '1' ? true : this.operationDetail.operateEntity.chaoSheng === '0' ? false : ''

      // 根据病房护士是否签名来判断能否编辑
        this.beforeEditFlag = !this.operationDetail.operateEntity.bfNurseImage
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
