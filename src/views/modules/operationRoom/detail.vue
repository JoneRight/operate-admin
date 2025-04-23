<template>
  <div class="operationRoom">
    <div class="top">
      <div class="topCrumbs">
        <span class="topCrumbsLeft">手术间 /</span>
        <span class="topCrumbsRight">1号手术间</span>
      </div>
      <div class="topTitle">1号手术间</div>
    </div>
    <div class="inner"  @scroll="handleScroll">
      <div :class="['innerBox', ((activeIndex === index) ? 'fixedTopScroll' : 'fixedTopOuter')]" v-for='(item,index) in dataLists' ref="item" :id="'item' + item.id" :key='index'>
        <div :class="['innerTop', ((activeIndex === index) ? 'fixedTopInnerScroll' : 'fixedTop')]">{{ item.name }}</div>
        <div class="myBox">
          <div class="myBoxTitle">患者信息</div>
          <div class="myBoxDes" v-if="item.patientInfo">
            <el-row style="width: 100%"  :gutter="10">
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>姓名：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.xingMing }}</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>性别：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.xingBie }}</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>年龄：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.nianLing }}</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>科室：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.keShi }}</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>床号：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.chuangHao }}</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>住院号：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.zhuYuanHao }}</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>手术时间：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.shouShuShiJian }}</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>主刀医生：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.zhuDaoYiSheng }}</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>麻醉医生：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.maZuiYiSheng }}</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>巡回护士：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.xunHuiHuShi }}</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>麻醉方式：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.maZuiFangShi }}</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="6" :lg='4' :xl='4' class="myBoxlist">
                <div>手术部位：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.shouShuBuWei }}</div>
              </el-col>
              <el-col :span="24" class="myBoxlist">
                <div style="width: 180px">备注：</div>
                <div class="myBoxlistDes">{{ item.patientInfo.beiZhu }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="myBoxTitle">手术进程</div>
          <div>
            <div class="customSteps">
              <div :class="['stepDes', (item.activeStep == 1 ? 'stepDesActive': item.activeStep > 1 ? 'stepDesEnd': '')]">
                <div class="iconBox">
                  <div class="icon iconfont icon-shuqianzhunbei"></div>
                </div>
                <div class="title">术前准备</div>
                <div class="date">2025-01-03</div>
                <div class="time">12:20</div>
              </div>
              <div class="stepDesArrow">
                <div class="line"></div>
                <span class="arrowSanJiao"></span>
              </div>
              <div :class="['stepDes', (item.activeStep == 2 ? 'stepDesActive': item.activeStep > 2 ? 'stepDesEnd': '')]">
                <div class="iconBox">
                  <div class="icon iconfont icon-rushoushushi"></div>
                </div>
                <div class="title">入手术室</div>
                <div class="date">2025-01-03</div>
                <div class="time">12:20</div>
              </div>
              <div class="stepDesArrow">
                <div class="line"></div>
                <span class="arrowSanJiao"></span>
              </div>
              <div :class="['stepDes', (item.activeStep == 3 ? 'stepDesActive': item.activeStep > 3 ? 'stepDesEnd': '')]">
                <div class="iconBox">
                  <div class="icon iconfont icon-mazuikaishi"></div>
                </div>
                <div class="title">麻醉开始</div>
                <div class="date">2025-01-03</div>
                <div class="time">12:20</div>
              </div>
              <div class="stepDesArrow">
                <div class="line"></div>
                <span class="arrowSanJiao"></span>
              </div>
              <div :class="['stepDes', (item.activeStep == 4 ? 'stepDesActive': item.activeStep > 4 ? 'stepDesEnd': '')]">
                <div class="iconBox">
                  <div class="icon iconfont icon-shoushukaishi"></div>
                </div>
                <div class="title">手术开始</div>
                <div class="date">2025-01-03</div>
                <div class="time">12:20</div>
              </div>
              <div class="stepDesArrow">
                <div class="line"></div>
                <span class="arrowSanJiao"></span>
              </div>
              <div :class="['stepDes', (item.activeStep == 5 ? 'stepDesActive': item.activeStep > 5 ? 'stepDesEnd': '')]">
                <div class="iconBox">
                  <div class="icon iconfont icon-shoushujieshu"></div>
                </div>
                <div class="title">手术结束</div>
                <div class="date">2025-01-03</div>
                <div class="time">12:20</div>
              </div>
              <div class="stepDesArrow">
                <div class="line"></div>
                <span class="arrowSanJiao"></span>
              </div>
              <div :class="['stepDes', (item.activeStep == 6 ? 'stepDesActive': item.activeStep > 6 ? 'stepDesEnd': '')]">
                <div class="iconBox">
                  <div class="icon iconfont icon-rufusushi"></div>
                </div>
                <div class="title">入复苏室</div>
                <div class="date">2025-01-03</div>
                <div class="time">12:20</div>
              </div>
              <div class="stepDesArrow">
                <div class="line"></div>
                <span class="arrowSanJiao"></span>
              </div>
              <div :class="['stepDes', (item.activeStep == 7 ? 'stepDesActive': item.activeStep > 7 ? 'stepDesEnd': '')]">
                <div class="iconBox">
                  <div class="icon iconfont icon-mazuijieshu"></div>
                </div>
                <div class="title">麻醉结束</div>
                <div class="date">2025-01-03</div>
                <div class="time">12:20</div>
              </div>
              <div class="stepDesArrow">
                <div class="line"></div>
                <span class="arrowSanJiao"></span>
              </div>
              <div :class="['stepDes', (item.activeStep == 8 ? 'stepDesActive': item.activeStep > 8 ? 'stepDesEnd': '')]">
                <div class="iconBox">
                  <div class="icon iconfont icon-fanhuididian"></div>
                </div>
                <div class="title">返回地点</div>
                <div class="date">2025-01-03</div>
                <div class="time">12:20</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      activeIndex: 0,
      dataLists: [
        {
          name: '第1台-阑尾炎手术',
          id: 1,
          activeStep: 9,
          patientInfo: {
            xingMing: '刘庆元',
            xingBie: '男',
            nianLing: '22',
            keShi: '肛肠科',
            chuangHao: 'No1123',
            zhuYuanHao: 'In0202',
            shouShuShiJian: '2025-04-01',
            zhuDaoYiSheng: '张小川',
            maZuiYiSheng: '张燕',
            xunHuiHuShi: '佩小倪',
            maZuiFangShi: '全麻',
            shouShuBuWei: '阑尾部位',
            beiZhu: '手术在全麻下进行，患者取仰卧位，常规消毒铺巾，采用**（腹腔镜/开腹）入路，逐层切开进入腹腔，探查见阑尾（充血水肿/化脓坏死/穿孔脓肿形成），与周围组织（轻度/广泛）粘连，小心分离后游离阑尾，（腹腔镜下使用Endo-GIA切割闭合/开腹下使用3-0可吸收线缝扎根部）完成切除，彻底止血后以生理盐水/抗生素液冲洗腹腔，视情况放置腹腔引流管，逐层关闭腹腔，术中出血约XX ml，未输血，患者麻醉苏醒良好，生命体征平稳，安返病房。'
          }
        },
        {
          name: '第2台-阑尾炎手术',
          id: 2,
          activeStep: 3,
          patientInfo: {
            xingMing: '刘晓',
            xingBie: '女',
            nianLing: '72',
            keShi: '内科',
            chuangHao: 'No2223',
            zhuYuanHao: 'In4302',
            shouShuShiJian: '2025-05-01',
            zhuDaoYiSheng: '宋佳',
            maZuiYiSheng: '王佩佩',
            xunHuiHuShi: '薛嘉华',
            maZuiFangShi: '半麻',
            shouShuBuWei: '肠胃',
            beiZhu: '（腹腔镜/开腹）入路，逐层切开进入腹腔，探查见阑尾（充血水肿/化脓坏死/穿孔脓肿形成），与周围组织（轻度/广泛）粘连，小心分离后游离阑尾，（腹腔镜下使用Endo-GIA切割闭合/开腹下使用3-0可吸收线缝扎根部）完成切除，彻底止血后以生理盐水/抗生素液冲洗腹腔，视情况放置腹腔引流管，逐层关闭腹腔，术中出血约XX ml，未输血，患者麻醉苏醒良好，生命体征平稳，安返病房。'
          }
        },
        {
          name: '第3台-阑尾炎手术',
          id: 3,
          activeStep: 4,
          patientInfo: {
            xingMing: '小小',
            xingBie: '女',
            nianLing: '12',
            keShi: '肛肠科',
            chuangHao: 'No23',
            zhuYuanHao: 'In22',
            shouShuShiJian: '2025-04-11',
            zhuDaoYiSheng: '任正佳',
            maZuiYiSheng: '周轮',
            xunHuiHuShi: '宋伟',
            maZuiFangShi: '半麻',
            shouShuBuWei: '阑尾部位',
            beiZhu: '（腹腔镜/开腹）入路，逐层切开进入腹腔，探查见阑尾（充血水肿/化脓坏死/穿孔脓肿形成），与周围组织（轻度/广泛）粘连，小心分离后游离阑尾，（腹腔镜下使用Endo-GIA切割闭合/开腹下使用3-0可吸收线缝扎根部）完成切除，彻底止血后以生理盐水/抗生素液冲洗腹腔，视情况放置腹腔引流管，逐层关闭腹腔，术中出血约XX ml，未输血，患者麻醉苏醒良好，生命体征平稳，安返病房。'
          }
        },
        {
          name: '第4台-阑尾炎手术',
          id: 4,
          activeStep: 6,
          patientInfo: {
            xingMing: '小伟',
            xingBie: '男',
            nianLing: '42',
            keShi: '肛肠科2',
            chuangHao: 'No1123',
            zhuYuanHao: 'In0202',
            shouShuShiJian: '2025-04-01',
            zhuDaoYiSheng: '张小川',
            maZuiYiSheng: '张燕',
            xunHuiHuShi: '佩小倪',
            maZuiFangShi: '全麻',
            shouShuBuWei: '阑尾部位',
            beiZhu: '手术在全麻下进行，患者取仰卧位，常规消毒铺巾，采用**（腹腔镜/开腹）入路，逐层切开进入腹腔，探查见阑尾（充血水肿/化脓坏死/穿孔脓肿形成），与周围组织（轻度/广泛）粘连，小心分离后游离阑尾，（腹腔镜下使用Endo-GIA切割闭合/开腹下使用3-0可吸收线缝扎根部）完成切除，彻底止血后以生理盐水/抗生素液冲洗腹腔，视情况放置腹腔引流管，逐层关闭腹腔，术中出血约XX ml，未输血，患者麻醉苏醒良好，生命体征平稳，安返病房。'
          }
        },
        {
          name: '第5台-阑尾炎手术',
          id: 5,
          activeStep: 7,
          patientInfo: {
            xingMing: '冯国',
            xingBie: '男',
            nianLing: '52',
            keShi: '肛肠科',
            chuangHao: 'No1123',
            zhuYuanHao: 'In0202',
            shouShuShiJian: '2025-04-01',
            zhuDaoYiSheng: '张小川',
            maZuiYiSheng: '张燕',
            xunHuiHuShi: '佩小倪',
            maZuiFangShi: '全麻',
            shouShuBuWei: '阑尾部位',
            beiZhu: '手术在全麻下进行，患者取仰卧位，常规消毒铺巾，采用**（腹腔镜/开腹）入路，逐层切开进入腹腔，探查见阑尾（充血水肿/化脓坏死/穿孔脓肿形成），与周围组织（轻度/广泛）粘连，小心分离后游离阑尾，（腹腔镜下使用Endo-GIA切割闭合/开腹下使用3-0可吸收线缝扎根部）完成切除，彻底止血后以生理盐水/抗生素液冲洗腹腔，视情况放置腹腔引流管，逐层关闭腹腔，术中出血约XX ml，未输血，患者麻醉苏醒良好，生命体征平稳，安返病房。'
          }
        }
      ],
      stepList: [
        {

        }
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      this.activeIndex = 0
      this.updateSectionDistances()
    }, 10)
  },
  methods: {
    handleScroll (event) {
      // 获取滚动容器的scrollTop，表示滚动的距离
      this.updateSectionDistances()
      // console.log(event.target.scrollTop)
    },
    updateSectionDistances () {
      for (let i = 0; i < this.dataLists.length; i++) {
        const section = this.$refs['item'][i]
        if ((section.getBoundingClientRect().height > -(section.getBoundingClientRect().top - 138)) && (section.getBoundingClientRect().top - 138) < 0) {
          this.activeIndex = i
        }
      }
      // console.log((section.getBoundingClientRect().top - 138))
      // return section ? section.getBoundingClientRect().top + window.scrollY : 0;
    }
  }
}
</script>
<style lang="scss">
.operationRoom{
  background: rgb(248, 250, 250);
  height: calc(100vh - 50px);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .top{
    // height: 80px;
    width: 100%;
    .topCrumbs{
      padding: 6px 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #757575;
      font-size: 12px;
      .topCrumbsRight{
        color: #3399FF;
        padding-left: 6px;
      }
    }
    .topTitle{
      font-size: 20px;
      color: #333333;
      font-weight: 600;
      padding: 2px 0 20px;
    }
  }
  .inner{
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
    .innerBox{
      margin-bottom: 20px;
      overflow: hidden;
      background: #fff;
      border-radius: 6px;
      padding-top: 60px;
      color: #000000;
      .innerTop{
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #F1F3F4;
        font-size: 18px;
        color: #333;
        font-weight: 600;
      }
      .fixedTop{
        position: absolute;
        left: 0;
        top: 0;
        width: calc(100%);
        background: #fff;
      }
      .myBox{
        padding: 0 20px 20px;
        .myBoxTitle{
          padding: 16px 0;
          height: 20px;
          line-height: 20px;
          box-sizing: content-box;
          font-weight: 500;
          font-size: 16px;
        }
        .myBoxDes{
          padding: 16px 20px;
          background: #F1F3F4;
          border-radius: 6px;
          display: flex;
          .myBoxlist{
            display: flex;
            justify-content: flex-start;
            color: #757575;
            line-height: 30px;
            .myBoxlistDes{
              color: #1F1F1F;
            }
          }
        }

        .customSteps{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .stepDes{
            height: 120px;
            width: 100px;
            border-radius: 6px;
            // border: 1px solid #d9d9d9;
            color: #757575;
            padding: 10px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .iconBox{
              display: flex;
              align-items: center;
              justify-content: center;
              height: 40px;
              width: 40px;
              .iconfont{
                font-size: 34px !important;
                color: #D9D9D9;
              }
            }
            .title{
              height: 24px;
              line-height: 24px;
              font-weight: 600;
            }
            .date{
              font-size: 12px;
              color: #757575;
            }
            .time{
              font-size: 12px;
              color: #757575;
            }

          }
          .stepDesActive{
            border: 1px solid #3399FF;
            color: #3399FF;
            .iconBox{
              .iconfont{
                color: #3399FF;
              }
            }
            .date{
              color: #3399FF;
            }
            .time{
              color: #3399FF;
            }
          }
          .stepDesEnd{
            border: 1px solid #B2B2B290;
            color: #1F1F1F;
          }
          .stepDesArrow{
            height: 2px;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .line{
              margin-left: 2px;
              height: 1px;
              border-top: 1px dotted #999;
              width: 100%;
            }
            .arrowSanJiao{
              height: 6px;
              width: 6px;
              margin: 0 2px;
              background-color: #999;
              clip-path: polygon(0 0, 0% 100%, 100% 50%); /* 定义三角形路径 */
            }
          }
        }
      }
    }
    .fixedTopOuter{
      position: relative;
    }
    .fixedTopScroll{
      // position: absolute;
      .fixedTopInnerScroll{
        position: absolute;
        color: #1F1F1F;
        background: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0.6));
        backdrop-filter: blur(10px);
        left: 11px;
        top: 82px;
        width: calc(100% - 20px);
        z-index: 10000;
        border-radius: 6px 6px 0 0;
      }
    }
  }
}
</style>
