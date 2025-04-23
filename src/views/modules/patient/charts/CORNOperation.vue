//  CORN术中获得压力性损伤风险评估表
<template>
  <div class="chartsBox" v-if='operationObj.patientInfoEntity && operationObj.patientInfoEntity.id'>
    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10">
        <div class="topBoxT flex">
          <div class="headTitle">{{ operationObj.patientInfoEntity.deptName || '暂无' }}</div>
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
              <span class="innerConLeft">住院号：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.zhuYuanHao }}</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="innerCon">
              <span class="innerConLeft">拟行手术术式：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.niOperateName }}</span>
            </div>
          </el-col>
          <el-col :xs="24">
            <div class="innerCon">
              <span class="innerConLeft" style="width: 50px">手术体位：</span>
              <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.cornEntity.bodyPosition" v-for='(item, index) in jsonData.bodyPositionOptions' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
            </div>
          </el-col>
          <el-col :xs="24">
            <div class="innerCon" style="padding-left: 74px;">
              <span class="innerConLeft">其他：</span>
              <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.qiTa" placeholder="" input-align="left" class="common-input" :style="'width: 200px;border-radius: 2px;margin: 0 10px;'" size="small"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10">
        <div class="topBoxT flex">
          <div class="headTitle">术前评估</div>
          <div>
          </div>
        </div>
      </div>
      <div class="pointInner marginBottom10">
        <div class="headTitle1">麻醉风险分级根据患者体质状况和手术危险性分IV或V级</div>
        <div :class="'desBox ' +  (sqMzArr.indexOf(item.value) > -1 ? ' divChoosed ' : '') " v-for="(item,index) in jsonData.shuQianOptions.options1" :key='index'>
          <div class="desBoxView">{{ item.label }}</div>
          <div class="toCheckBoxInfoDes">
            <div :class=" 'chooseBox ' + (sqMzArr.indexOf(item.value) > -1 ? ' chooseBoxChoosed2 ' : 'chooseBoxChoosed') + (beforeEditFlag ? '  ' : ' unEditChoosed ')">
              <span v-if='sqMzArr.indexOf(item.value) > -1' class="icon iconfont icon-duihao1"></span>
            </div>
            <div class="pointBox">{{ item.point }}</div>
          </div>
        </div>
      </div>

      <div class="pointInner marginBottom10">
        <div class="headTitle1">身体质量指数/体重指数 BMI=体重(千克)÷身高(米)2</div>
        <div :class="'desBox ' +  (sqBodyArr.indexOf(item.value) > -1 ? ' divChoosed ' : '') " v-for="(item,index) in jsonData.shuQianOptions.options2" :key='index'>
          <div class="desBoxView">{{ item.label }}</div>
          <div class="toCheckBoxInfoDes">
            <div :class=" 'chooseBox ' + (sqBodyArr.indexOf(item.value) > -1 ? ' chooseBoxChoosed2 ' : 'chooseBoxChoosed') + (beforeEditFlag ? '  ' : ' unEditChoosed ')">
              <span v-if='sqBodyArr.indexOf(item.value) > -1' class="icon iconfont icon-duihao1"></span>
            </div>
            <div class="pointBox">{{ item.point }}</div>
          </div>
        </div>
      </div>

      <div class="pointInner marginBottom10">
        <div class="headTitle1">受压部位皮肤状态</div>
        <div :class="'desBox ' +  (sqPfArr.indexOf(item.value) > -1 ? ' divChoosed ' : '') " v-for="(item,index) in jsonData.shuQianOptions.options3" :key='index'>
          <div class="desBoxView">{{ item.label }}</div>
          <div class="toCheckBoxInfoDes">
            <div :class=" 'chooseBox ' + (sqPfArr.indexOf(item.value) > -1 ? ' chooseBoxChoosed2 ' : 'chooseBoxChoosed') + (beforeEditFlag ? '  ' : ' unEditChoosed ')">
              <span v-if='sqPfArr.indexOf(item.value) > -1' class="icon iconfont icon-duihao1"></span>
            </div>
            <div class="pointBox">{{ item.point }}</div>
          </div>
        </div>
      </div>

      <div class="pointInner marginBottom10">
        <div class="headTitle1">术前肢体活动</div>
        <div :class="'desBox ' +  (sqZtArr.indexOf(item.value) > -1 ? ' divChoosed ' : '') " v-for="(item,index) in jsonData.shuQianOptions.options4" :key='index'>
          <div class="desBoxView">{{ item.label }}</div>
          <div class="toCheckBoxInfoDes">
            <div :class=" 'chooseBox ' + (sqZtArr.indexOf(item.value) > -1 ? ' chooseBoxChoosed2 ' : 'chooseBoxChoosed') + (beforeEditFlag ? '  ' : ' unEditChoosed ')">
              <span v-if='sqZtArr.indexOf(item.value) > -1' class="icon iconfont icon-duihao1"></span>
            </div>
            <div class="pointBox">{{ item.point }}</div>
          </div>
        </div>
      </div>

      <div class="pointInner marginBottom10">
        <div class="headTitle1">预计手术时间（h）指患者安置手术体位后持续受压时间</div>
        <div :class="'desBox ' +  (sqTimeArr.indexOf(item.value) > -1 ? ' divChoosed ' : '') " v-for="(item,index) in jsonData.shuQianOptions.options5" :key='index'>
          <div class="desBoxView">{{ item.label }}</div>
          <div class="toCheckBoxInfoDes">
            <div :class=" 'chooseBox ' + (sqTimeArr.indexOf(item.value) > -1 ? ' chooseBoxChoosed2 ' : 'chooseBoxChoosed') + (beforeEditFlag ? '  ' : ' unEditChoosed ')">
              <span v-if='sqTimeArr.indexOf(item.value) > -1' class="icon iconfont icon-duihao1"></span>
            </div>
            <div class="pointBox">{{ item.point }}</div>
          </div>
        </div>
      </div>

      <div class="pointInner marginBottom10">
        <div class="headTitle1">高危疾病</div>
        <div :class="'desBox ' +  (sqJbArr.indexOf(item.value) > -1 ? ' divChoosed ' : '') " v-for="(item,index) in jsonData.shuQianOptions.options6" :key='index'>
          <div class="desBoxView">{{ item.label }}</div>
          <div class="toCheckBoxInfoDes">
            <div :class=" 'chooseBox ' + (sqJbArr.indexOf(item.value) > -1 ? ' chooseBoxChoosed2 ' : 'chooseBoxChoosed') + (beforeEditFlag ? '  ' : ' unEditChoosed ')">
              <span v-if='sqJbArr.indexOf(item.value) > -1' class="icon iconfont icon-duihao1"></span>
            </div>
            <div class="pointBox">{{ item.point }}</div>
          </div>
        </div>
      </div>

      <div class="pointInner marginBottom10">
        <div class="headTitle1">带入压力性损伤</div>
        <div :class="'desBox ' +  (sqSunShangArr.indexOf(item.value) > -1 ? ' divChoosed ' : '') " v-for="(item,index) in jsonData.shuQianOptions.options7" :key='index'>
          <div class="desBoxView">{{ item.label }}</div>
          <div class="toCheckBoxInfoDes">
            <div :class=" 'chooseBox ' + (sqSunShangArr.indexOf(item.value) > -1 ? ' chooseBoxChoosed2 ' : 'chooseBoxChoosed') + (beforeEditFlag ? '  ' : ' unEditChoosed ')">
              <span v-if='sqSunShangArr.indexOf(item.value) > -1' class="icon iconfont icon-duihao1"></span>
            </div>
            <div class="pointBox">{{ item.point }}</div>
          </div>
        </div>
      </div>

      <div class="scoreBox marginBottom10">
        <div class="title">术前评估总分</div>
        <div class="scoreDes">
          总分<9为低风险，9～14为中风险，>14为高风险
        </div>
        <div :class="'socreCount ' + ( operationObj.cornEntity.sqTotal < 9 ? 'commonSocreCount' : (operationObj.cornEntity.sqTotal >= 9 && operationObj.cornEntity.sqTotal < 14)  ? 'warningSocreCount' : 'dangerSocreCount')">
          {{ operationObj.cornEntity.sqTotal }}
          <span style="font-size: 12px; padding-left: 6px;font-weight: 400;">
            {{ operationObj.cornEntity.sqTotal < 9 ? '低风险' : (operationObj.cornEntity.sqTotal >= 9 && operationObj.cornEntity.sqTotal < 14)  ? '中风险' : '高风险' }}
          </span>
        </div>
      </div>

      <div class="underLineBox marginBottom10"></div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>术前病房护士签名 </p>
        </div>
        <div class='checkInnerChoose flex_center signBox'>
          <img v-if="operationObj.cornEntity.sqNurseImage" style="height: 80px;" :src="'data:image/png;base64,' + operationObj.cornEntity.sqNurseImage" />
          <div v-else>此区域签名</div>
        </div>
      </div>
      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>术前评估日期</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.cornEntity.sqDateTime || '---' }}</div>
        </div>
      </div>

    </div>

    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10">
        <div class="topBoxT flex">
          <div class="headTitle">术中评估</div>
          <div>
          </div>
        </div>
      </div>
      <div class="pointInner marginBottom10">
        <div class="headTitle1">体温丢失因素</div>
        <div :class="'desBox ' +  (szTwArr.indexOf(item.value) > -1 ? ' divChoosed ' : '') " v-for="(item,index) in jsonData.shuZhongOptions.options1" :key='index'>
          <div class="desBoxView">{{ item.label }}</div>
          <div class="toCheckBoxInfoDes">
            <div :class=" 'chooseBox ' + (szTwArr.indexOf(item.value) > -1 ? ' chooseBoxChoosed2 ' : 'chooseBoxChoosed') + (beforeEditFlag ? '  ' : ' unEditChoosed ')">
              <span v-if='szTwArr.indexOf(item.value) > -1' class="icon iconfont icon-duihao1"></span>
            </div>
            <div class="pointBox">{{ item.point }}</div>
          </div>
        </div>
      </div>

      <div class="pointInner marginBottom10">
        <div class="headTitle1">手术出血量（ml）</div>
        <div :class="'desBox ' +  (szCxArr.indexOf(item.value) > -1 ? ' divChoosed ' : '') " v-for="(item,index) in jsonData.shuZhongOptions.options2" :key='index'>
          <div class="desBoxView">{{ item.label }}</div>
          <div class="toCheckBoxInfoDes">
            <div :class=" 'chooseBox ' + (szCxArr.indexOf(item.value) > -1 ? ' chooseBoxChoosed2 ' : 'chooseBoxChoosed') + (beforeEditFlag ? '  ' : ' unEditChoosed ')">
              <span v-if='szCxArr.indexOf(item.value) > -1' class="icon iconfont icon-duihao1"></span>
            </div>
            <div class="pointBox">{{ item.point }}</div>
          </div>
        </div>
      </div>

      <div class="pointInner marginBottom10">
        <div class="headTitle1">压力剪切力改变</div>
        <div :class="'desBox ' +  (szYlArr.indexOf(item.value) > -1 ? ' divChoosed ' : '') " v-for="(item,index) in jsonData.shuZhongOptions.options3" :key='index'>
          <div class="desBoxView">{{ item.label }}</div>
          <div class="toCheckBoxInfoDes">
            <div :class=" 'chooseBox ' + (szYlArr.indexOf(item.value) > -1 ? ' chooseBoxChoosed2 ' : 'chooseBoxChoosed') + (beforeEditFlag ? '  ' : ' unEditChoosed ')">
              <span v-if='szYlArr.indexOf(item.value) > -1' class="icon iconfont icon-duihao1"></span>
            </div>
            <div class="pointBox">{{ item.point }}</div>
          </div>
        </div>
      </div>

      <div class="pointInner marginBottom10">
        <div class="headTitle1">实际手术时间（h）指患者安置手术体位后持续受压的时间</div>
        <div :class="'desBox ' +  (szTimeArr.indexOf(item.value) > -1 ? ' divChoosed ' : '') " v-for="(item,index) in jsonData.shuZhongOptions.options4" :key='index'>
          <div class="desBoxView">{{ item.label }}</div>
          <div class="toCheckBoxInfoDes">
            <div :class=" 'chooseBox ' + (szTimeArr.indexOf(item.value) > -1 ? ' chooseBoxChoosed2 ' : 'chooseBoxChoosed') + (beforeEditFlag ? '  ' : ' unEditChoosed ')">
              <span v-if='szTimeArr.indexOf(item.value) > -1' class="icon iconfont icon-duihao1"></span>
            </div>
            <div class="pointBox">{{ item.point }}</div>
          </div>
        </div>
      </div>

      <div class="scoreBox marginBottom10">
        <div class="title">术中评估总分</div>
        <div class="scoreDes">
          总分<8为低风险，8～12为中风险，>12为高风险
        </div>
        <div :class="'socreCount ' + ( operationObj.cornEntity.szTotal < 8 ? 'commonSocreCount' : (operationObj.cornEntity.szTotal >= 8 && operationObj.cornEntity.szTotal < 12)  ? 'warningSocreCount' : 'dangerSocreCount')">
          {{ operationObj.cornEntity.szTotal }}
          <span style="font-size: 12px; padding-left: 6px;font-weight: 400;">
            {{ operationObj.cornEntity.szTotal < 8 ? '低风险' : (operationObj.cornEntity.szTotal >= 8 && operationObj.cornEntity.szTotal < 12)  ? '中风险' : '高风险' }}
          </span>
        </div>
      </div>

      <div class="underLineBox marginBottom10"></div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>术中病房护士签名 </p>
        </div>
        <div class='checkInnerChoose flex_center signBox'>
          <img v-if="operationObj.cornEntity.szNurseImage" style="height: 80px;" :src="'data:image/png;base64,' + operationObj.cornEntity.szNurseImage" />
          <div v-else>此区域签名</div>
        </div>
      </div>
      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>术中评估日期</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.cornEntity.szDateTime || '---' }}</div>
        </div>
      </div>

    </div>

    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10">
        <div class="topBoxT flex">
          <div class="headTitle">术后皮肤结果界定</div>
          <div>
          </div>
        </div>
      </div>
      <div :class="['checkInner flex', (operationObj.anesthesiaEntity.shYl === true || operationObj.anesthesiaEntity.shYl === false) ? 'checkInner_choosed' : '' ]">
        <div>
          <el-checkbox :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shYl" size="small">带入性压力损伤</el-checkbox>
        </div>
      </div>
      <div :class="['checkInner flex' ]" style='justify-content: flex-start;'>
        <div>部位</div>
        <el-input :disabled="!operationObj.cornEntity.shYl || !beforeEditFlag" v-model="operationObj.cornEntity.shBw" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
        <div>面积</div>
        <el-input :disabled="!operationObj.cornEntity.shYl || !beforeEditFlag" v-model="operationObj.cornEntity.shMj" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
        <div>cm</div>
        <div style="padding-left: 10px;">X</div>
        <el-input :disabled="!operationObj.cornEntity.shYl || !beforeEditFlag" v-model="operationObj.cornEntity.shX" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
        <div>cm</div>
      </div>
      <div class="signTitle flex_aling_center_start">
        <p style="font-size: 16px;font-weight: 500;">术中 </p>
      </div>

      <div class="outerBoxx">
        <div :class="['flex', 'checkInner']">
          <div>
            <el-checkbox :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzZc" size="small">正常，观察受压部位皮肤，没有发生压红或压力性损伤</el-checkbox>
          </div>
          <div class="checkInnerChoose">

          </div>
        </div>
        <div class="topBox flex underLineBox marginBottom10 marginTop10"></div>
        <div :class="['flex', 'checkInner']">
          <div>
            <el-checkbox :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzYl" size="small">术中获得性压力损伤</el-checkbox>
          </div>
          <div class="checkInnerChoose">

          </div>
        </div>
        <div :class="['flex', 'checkInner']">
          <div>
            <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.cornEntity.shSzSzArr" v-for='(item, index) in jsonData.shuHouOptions.options1' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
          </div>
          <div class="checkInnerChoose">

          </div>
        </div>

        <div :class="['checkInner flex' ]" style='justify-content: flex-start;'>
          <div>部位</div>
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzSzBw" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
          <div>面积</div>
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzSzMj" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
          <div>cm</div>
          <div style="padding-left: 10px;">X</div>
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzSzX" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
          <div>cm</div>
        </div>

        <div :class="['checkInner flex' ]" style='justify-content: flex-start;'>
          <div>皮肤持续受压时间</div>
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzSzPf" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
          <div>h</div>
        </div>

        <div class="topBox flex underLineBox marginBottom10 marginTop10"></div>

        <div :class="['flex', 'checkInner']">
          <div>
            <el-checkbox :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzQx" size="small">器械相关性压力损伤</el-checkbox>
          </div>
          <div class="checkInnerChoose">
          </div>
        </div>

        <div :class="['flex', 'checkInner']">
          <div>
            <el-radio :disabled="!beforeEditFlag"  v-model="operationObj.cornEntity.shSzQxArr" v-for='(item, index) in jsonData.shuHouOptions.options2' :key='index' :label='item.value' size="small">{{ item.label }}</el-radio>
          </div>
          <div class="checkInnerChoose">
          </div>
        </div>

        <div :class="['checkInner flex' ]" style='justify-content: flex-start;'>
          <div>部位</div>
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzQxBw" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
          <div>面积</div>
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzQxMj" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
          <div>cm</div>
          <div style="padding-left: 10px;">X</div>
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzQxX" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
          <div>cm</div>
        </div>

        <div :class="['checkInner flex' ]" style='justify-content: flex-start;'>
          <div>皮肤持续受压时间</div>
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzQxPf" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
          <div>h</div>
        </div>

        <div class="topBox flex underLineBox marginBottom10 marginTop10"></div>

        <div :class="['flex', 'checkInner']">
          <div>
            <el-checkbox :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzNm" size="small">黏膜压力性损伤</el-checkbox>
          </div>
          <div class="checkInnerChoose">
          </div>
        </div>

        <div :class="['checkInner flex' ]" style='justify-content: flex-start;'>
          <div>部位</div>
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzBw" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
        </div>

        <div :class="['checkInner flex' ]" style='justify-content: flex-start;'>
          <div>皮肤持续受压时间</div>
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.shSzPfsy" placeholder="" input-align="left" class="common-input" size='small' :style="'width: 100px;border-radius: 2px;height: 30px;margin: 0 10px;' + (false ? 'border: 1px solid #e22519;' : 'border: 1px solid #c9c9c9;')"></el-input>
          <div>h</div>
        </div>
      </div>

      <div :class="['checkInner flex']" id="remarks" style="align-items: flex-start;">
        <div style="width: 80px;">
          备注：
        </div>
        <div class='checkInnerChoose flex_aling_center' style="flex: 1">
          <el-input :disabled="!beforeEditFlag" v-model="operationObj.cornEntity.remarks" placeholder="" input-align="center" class="common-input" :style="'width: 100%;border-radius: 2px;margin: 0 10px;'" type="textarea" :rows="4" size="small"></el-input>
        </div>
      </div>

      <div class="topBox flex underLineBox marginBottom10 marginTop10"></div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>手术室护士签名 </p>
        </div>
        <div class='checkInnerChoose flex_center signBox'>
          <img v-if="operationObj.cornEntity.opNurseImage" style="height: 80px;" :src="'data:image/png;base64,' + operationObj.cornEntity.opNurseImage" />
          <div v-else>此区域签名</div>
        </div>
      </div>
      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>手术室护士签名日期</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.cornEntity.opNurseTime || '---' }}</div>
        </div>
      </div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>PACU护士签名 </p>
        </div>
        <div class='checkInnerChoose flex_center signBox'>
          <img v-if="operationObj.cornEntity.pacuNurseImage" style="height: 80px;" :src="'data:image/png;base64,' + operationObj.cornEntity.pacuNurseImage" />
          <div v-else>此区域签名</div>
        </div>
      </div>
      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>PACU护士签名日期</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.cornEntity.pacuNurseTime || '---' }}</div>
        </div>
      </div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>病房护士签名 </p>
        </div>
        <div class='checkInnerChoose flex_center signBox'>
          <img v-if="operationObj.cornEntity.bfNurseImage" style="height: 80px;" :src="'data:image/png;base64,' + operationObj.cornEntity.bfNurseImage" />
          <div v-else>此区域签名</div>
        </div>
      </div>
      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>病房护士签名日期</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.cornEntity.bfNurseTime || '---' }}</div>
        </div>
      </div>

      <div :class="['checkInner flex']">
        <div class="signTitle flex_aling_center_start">
          <p>ICU护士签名 </p>
        </div>
        <div class='checkInnerChoose flex_center signBox'>
          <img v-if="operationObj.cornEntity.icuNurseImage" style="height: 80px;" :src="'data:image/png;base64,' + operationObj.cornEntity.icuNurseImage" />
          <div v-else>此区域签名</div>
        </div>
      </div>
      <div :class="['checkInner flex']">
        <div class="signTitle1 flex_aling_center_start">
          <p>ICU护士签名日期</p>
        </div>
        <div class='checkInnerChoose flex_center signDate'>
          <div>{{ operationObj.cornEntity.icuNurseTime || '---' }}</div>
        </div>
      </div>


    </div>

  </div>
</template>
<script>
import { getCorn } from '@/api/patient.js'
import jsonData from '@/assets/json/data.json'
import {getSexText, getAgeText} from '@/utils/index'
import moment from 'moment'
export default {
  data () {
    return {
      sqMzArr: [],
      sqBodyArr: [],
      sqPfArr: [],
      sqZtArr: [],
      sqTimeArr: [],
      sqJbArr: [],
      sqSunShangArr: [],

      szTwArr: [],
      szCxArr: [],
      szYlArr: [],
      szTimeArr: [],

      jsonData: jsonData,
      operationObj: {
        patientInfoEntity: {},
        cornEntity: {
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
      getCorn(formData).then(res => {
        this.operationObj.cornEntity = res.data.corn.cornEntity
        this.operationObj.patientInfoEntity = res.data.corn.patientInfoEntity

        // 麻醉风险分级根据患者体质状况和手术危险性分IV或V级  单选
        this.sqMzArr = []
        jsonData.shuQianOptions.options1.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.sqMzArr.push(v.value)
          }
        })

        // 身体质量指数/体重指数 BMI=体重(千克)÷身高(米)2
        this.sqBodyArr = []
        jsonData.shuQianOptions.options2.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.sqBodyArr.push(v.value)
          }
        })

        // 受压部位皮肤状态
        this.sqPfArr = []
        jsonData.shuQianOptions.options3.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.sqPfArr.push(v.value)
          }
        })

        // 术前肢体活动
        this.sqZtArr = []
        jsonData.shuQianOptions.options4.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.sqZtArr.push(v.value)
          }
        })

        // 预计手术时间（h）指患者安置手术体位后持续受压时间 - 术前
        this.sqTimeArr = []
        jsonData.shuQianOptions.options5.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.sqTimeArr.push(v.value)
          }
        })

        // 高危疾病
        this.sqJbArr = []
        jsonData.shuQianOptions.options6.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.sqJbArr.push(v.value)
          }
        })

        // 带入压力性损伤
        this.sqSunShangArr = []
        jsonData.shuQianOptions.options7.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.sqSunShangArr.push(v.value)
          }
        })

        // 体温丢失因素
        this.szTwArr = []
        jsonData.shuZhongOptions.options1.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.szTwArr.push(v.value)
          }
        })

        // 手术出血量（ml）
        this.szCxArr = []
        jsonData.shuZhongOptions.options2.map(v => {
          console.log('v.value', v.value, this.operationObj.cornEntity[v.value])
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.szCxArr.push(v.value)
          }
        })

        // 压力剪切力改变
        this.szYlArr = []
        jsonData.shuZhongOptions.options3.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.szYlArr.push(v.value)
          }
        })

        // 实际手术时间（h）指患者安置手术体位后持续受压的时间
        this.szTimeArr = []
        jsonData.shuZhongOptions.options4.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.szTimeArr.push(v.value)
          }
        })

        // 术后  带入性压力损伤
        this.operationObj.cornEntity.shYl = this.operationObj.cornEntity.shYl === '1'

        // 术后 正常，观察受压部位皮肤，没有发生压红或压力性损伤
        this.operationObj.cornEntity.shSzZc = this.operationObj.cornEntity.shSzZc === '1'

        // 术后 术中获得性压力损伤
        this.operationObj.cornEntity.shSzYl = this.operationObj.cornEntity.shSzYl === '1'

        // 术后 术中获得性压力损伤 细则
        this.operationObj.cornEntity.shSzSzArr = ''
        jsonData.shuHouOptions.options1.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.operationObj.cornEntity.shSzSzArr = v.value
          }
        })

        // console.log('operationObj.cornEntity.shSzSzArr', operationObj.cornEntity.shSzSzArr)

        // 术后 器械相关性压力损伤
        this.operationObj.cornEntity.shSzQx = this.operationObj.cornEntity.shSzQx === '1'

        // 术后 器械相关性压力损伤 细则
        this.operationObj.cornEntity.shSzQxArr = ''
        jsonData.shuHouOptions.options2.map(v => {
          if (this.operationObj.cornEntity[v.value] === '1') {
            this.operationObj.cornEntity.shSzQxArr = v.value
          }
        })

        // 术后 黏膜压力性损伤
        this.operationObj.cornEntity.shSzNm = this.operationObj.cornEntity.shSzNm === '1'

        this.operationObj.cornEntity.sqBody = []
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
.toCheckBoxInfoDes{
  width: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .pointBox{
    width: 20px;
    padding-left: 5px;
  }
  .chooseBox{
    background: #fff;
    border: 1px solid rgb(117, 117, 117, 0.9);
    height: 20px;
    width: 20px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont{
      font-size: 12px;
      color: #fff;
      font-weight: 700;
    }
  }
  .chooseBoxChoosed2{
    background: #999999;
    border-color: #999999;
  }
}
.divChoosed{
  background: rgba(79, 79, 104, 0.1);
}
.unEditChoosed{
  color: #999 !important;
  .chooseBoxChoosed{
    background: pink !important;
    border-color: pink !important;
  }
}
.desBox{
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
  padding: 4px 0;
}
.desBoxView{
  flex: 1;
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
  .pointInner{
    border: 1px solid #D9D9D9;
    padding: 10px;
    .headTitle1{
      font-size: 14px;
      font-weight: 600;
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
.outerBoxx{
  border: 1px solid #D9D9D9;
  padding: 10px 10px;
  border-radius: 4px;
}
.scoreBox{
  background: #F1F3F4;
  border: 1px solid #F1F3F4;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 12px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #1f1f1f;
  .title{
    font-weight: 600;
    font-size: 16px;
  }
  .scoreDes{
    padding: 6px 0 4px;
  }
  .socreCount{
    font-size: 18px;
    font-weight: 600;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .commonSocreCount{
    color: #666;
  }
  .warningSocreCount{
    color: #F57F17;
  }
  .dangerSocreCount{
    color: #e22519;
  }
}
</style>

