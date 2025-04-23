//  手术室感染手术辅料清洗统计表
<template>
  <div class="chartsBox" v-if='operationObj.patientInfoEntity && operationObj.patientInfoEntity.id'>
    <div class="innerBox-z marginBottom20">
      <div class="topBox flex underLineBox marginBottom10 paddingBottom10">
        <div class="topBoxT flex">
          <div class="headTitle">{{ operationObj.patientInfoEntity.name || '暂无' }}</div>
        </div>
        <div class="innerCon">
          <span class="innerConLeft">日期：</span>
          <span class="innerConRight">{{ operationObj.patientInfoEntity.operateDate }}</span>
        </div>
      </div>
      <div class="conInnerBox">
        <el-row :gutter="10">
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">感染种类：</span>
              <span class="innerConRight">{{ operationObj.fuliaoEntity.infection || '暂无' }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">手木间：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.roomName }}</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="innerCon">
              <span class="innerConLeft">科室：</span>
              <span class="innerConRight">{{ operationObj.patientInfoEntity.deptName }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="innerBox-z marginBottom20 tableInner">
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex headDesIn">辅料名称</div>
        <div class="width50 flex headDesIn rightLineBox">辅料数量</div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex headDesIn">辅料名称</div>
        <div class="width50 flex headDesIn">辅料数量</div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">剖包</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.pouBao }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">纸台套</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.zhiTaiTao }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">手术衣5</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.operationFive }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">额面包</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.emianBao }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">手术衣2</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.operationTwo }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">布台套</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.buTaiTao }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">手术衣1</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.operationOne }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">单孔剖包</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.danKongPouBao }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">中单6</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.zhongDanSix }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">双孔剖包</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.shuangKongPouBao }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">中单4</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.zhongDanFour }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">关节腿包</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.guanJieTuiBao }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">中单2</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.zhongDanTwo }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">妇包</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.fuBao }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">脑包</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.naoBao }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">中单</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.zhongDan }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">甲单</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.jiaDan }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">大包布</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.daBaoBu }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">小手术包</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.xiaoOperationBao }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">小包布</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.xiaoBaoBu }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">耳包</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.erBao }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">方巾</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.fangJin }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">会阴包</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.huiYinBao }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">小敷包</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.xiaoFuBao }}
        </div>
      </div>

      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">五官包</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.wuGuanBao }}
        </div>
      </div>
      <div class='width50 flex headInner flex underLineBox'>
        <div class="width50 flex contentIn contentInTitle">剖被</div>
        <div class="width50 flex contentIn contentInCon">
          {{ operationObj.fuliaoEntity.pouBei }}
        </div>
      </div>

      <div class='width50 flex headInner flex'>
        <div class="width50 flex contentIn contentInTitle">小包</div>
        <div class="width50 flex contentIn contentInCon rightLineBox">
          {{ operationObj.fuliaoEntity.xiaoBao }}
        </div>
      </div>
      <div class='width50 flex headInner flex'>
        <div class="width50 flex contentIn contentInTitle"></div>
        <div class="width50 flex contentIn contentInCon">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFuLiao } from '@/api/patient.js'
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
        fuliaoEntity: {
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
      getFuLiao(formData).then(res => {
        this.operationObj.fuliaoEntity = res.data.bs.fuliaoEntity
        this.operationObj.patientInfoEntity = res.data.bs.patientInfoEntity
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
.rightLineBox{
  border-right: 1px solid #D9D9D9;
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
.paddingBottom10{
  padding-bottom: 10px !important;
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
.tableInner{
  display: flex;
  flex-wrap: wrap;
  padding: 0 !important;
  overflow: hidden;
  .headInner{
    .headDesIn{
      height: 42px;
      background: #f5f5f5;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 14px;
    }
    .contentIn{
      height: 36px;
      background: #fff;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      font-size: 14px;
    }
    .contentInTitle{
      color: #333;
    }
    .contentInCon{
      color: #000;
    }
  }
}
.width50{
  width: 50%;
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

