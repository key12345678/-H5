<template>
  <div class="container fillHour">
        <titleText :title="title">
            <div slot="back">
                <van-icon
                size="22px"
                color="#fff"
                class="iconfont iconarrow"
                ></van-icon>
            </div>
        </titleText>
        <div class="fillContainer">
            <div class="project" style="border-bottom:1px solid #eee">
                <div class="text">项目</div>
                <div class="value" @click="toProjectSelect">
                    <span :style="{color: projectName==='请选择'?'#AAAAAA':''}">{{projectName}}</span>&nbsp;&nbsp;&nbsp;
                    <van-icon name="arrow" color="#AAAAAA"/>
                </div>
            </div>
            <!-- 一般项目 -->
            <div class="wrapper" v-if="type==='commonProject'">
                <div class="project" style="border-bottom:1px solid #eee">
                    <div class="text">里程碑</div>
                    <div class="value">
                        <span :style="{color: milestone==='请选择'?'#AAAAAA':''}">{{milestone}}</span>&nbsp;&nbsp;&nbsp;
                        <van-icon name="arrow" color="#AAAAAA"/>
                    </div>
                </div>
                <div class="project" style="border-bottom:1px solid #eee">
                    <div class="text">工时</div>
                    <div class="value">
                        <van-field v-model="hour" placeholder="请填写" />
                    </div>
                </div>
                <div class="workDesc">
                    <div class="item">
                        <van-icon name="desktop-o" color="#3B82FF" size="20px" /> &nbsp;<span>工作描述</span>
                    </div>
                    <div>
                        <van-field
                            v-model="desc"
                            rows="4"
                            autosize
                            label=""
                            type="textarea"
                            placeholder="填写工作描述内容"
                        />
                    </div>
                </div>
                <div class="question">
                    <div class="item">
                        <van-icon name="question-o" color="#FF9900" size="20px" /> &nbsp;<span>存在的问题</span>
                    </div>
                    <div>
                        <van-field
                            v-model="desc"
                            rows="4"
                            autosize
                            label=""
                            type="textarea"
                            placeholder="填写工作中存在的问题"
                        />
                    </div>
                </div>
            </div>
            <!-- 其他 -->
            <div class="wrapper" v-if="type==='other'">
                <div class="project" style="border-bottom:1px solid #eee">
                    <div class="text">工时</div>
                    <div class="value">
                        <van-field v-model="hour" placeholder="请填写" />
                    </div>
                </div>
                <div class="workDesc">
                    <div class="item">
                        <van-icon name="desktop-o" color="#3B82FF" size="20px" /> &nbsp;<span>工作描述</span>
                    </div>
                    <div>
                        <van-field
                            v-model="desc"
                            rows="4"
                            autosize
                            label=""
                            type="textarea"
                            placeholder="填写工作描述内容"
                        />
                    </div>
                </div>
                <div class="question">
                    <div class="item">
                        <van-icon name="question-o" color="#FF9900" size="20px" /> &nbsp;<span>存在的问题</span>
                    </div>
                    <div>
                        <van-field
                            v-model="desc"
                            rows="4"
                            autosize
                            label=""
                            type="textarea"
                            placeholder="填写工作中存在的问题"
                        />
                    </div>
                </div>
            </div>
            <!-- 假期 -->
            <div class="wrapper" v-if="type==='leave'">
                <div class="project" style="border-bottom:1px solid #eee">
                    <div class="text">开始时间</div>
                    <div class="value" @click="selectStartTime">
                        <span :style="{color: startTime==='请选择'?'#AAAAAA':''}">{{startTime}}</span>&nbsp;&nbsp;&nbsp;
                        <van-icon name="arrow" color="#AAAAAA"/>
                    </div>
                </div>
                <div class="project" style="border-bottom:1px solid #eee">
                    <div class="text">结束时间</div>
                    <div class="value" @click="selectEndTime">
                        <span :style="{color: endTime==='请选择'?'#AAAAAA':''}">{{endTime}}</span>&nbsp;&nbsp;&nbsp;
                        <van-icon name="arrow" color="#AAAAAA"/>
                    </div>
                </div>
                <div class="project" style="border-bottom:1px solid #eee">
                    <div class="text">工时</div>
                    <div class="value">
                        <van-field v-model="leaveHour" placeholder="" readonly />
                    </div>
                </div>
                <div class="workDesc">
                    <div class="item">
                        <van-icon name="desktop-o" color="#3B82FF" size="20px" /> &nbsp;<span>描述</span>
                    </div>
                    <div>
                        <van-field
                            v-model="desc"
                            rows="4"
                            autosize
                            label=""
                            type="textarea"
                            placeholder="填写内容"
                        />
                    </div>
                </div>


                <!-- 开始时间选择器 -->
                <van-action-sheet v-model="show" title="">
                    <div class="operation">
                        <span @click="show = false">取消</span>
                        <span @click="confirm">确认</span>
                    </div>
                    <div style="display:flex;">
                        <div class="left" style="width:50%">
                            <van-datetime-picker
                                :show-toolbar="false" 
                                v-model="currentDate"
                                type="date"
                                :min-date="minDate"
                                :max-date="maxDate"
                            ></van-datetime-picker>
                        </div>
                        <div class="right" style="width:50%">
                            <van-picker :columns="columns" @change="onChange" />
                        </div>
                    </div>
                </van-action-sheet>
                <!-- 结束时间选择器 -->
                <van-action-sheet v-model="show2" title="">
                    <div class="operation">
                        <span @click="show2 = false">取消</span>
                        <span @click="confirm2">确认</span>
                    </div>
                    <div style="display:flex;">
                        <div class="left" style="width:50%">
                            <van-datetime-picker
                                :show-toolbar="false" 
                                v-model="currentDate2"
                                type="date"
                                :min-date="minDate"
                                :max-date="maxDate"
                            ></van-datetime-picker>
                        </div>
                        <div class="right" style="width:50%">
                            <van-picker :columns="columns" @change="onChange2" />
                        </div>
                    </div>
                </van-action-sheet>
            </div>
        </div>

        <div class="bottom-btns">
            <div class="btn"><van-button type="default" block style="background:#F2F4F6">保存</van-button></div>
            <div class="btn"><van-button type="info" block>提交</van-button></div>
        </div>
  </div>
</template>

<script>
import titleText from "@/components/header/index.vue";
import { getNowFormatDate,formatWeekDay } from '@/utils/index.js'
export default {
    components: {
        titleText,
    },
    data() {
        return {
            title: '',
            projectName: sessionStorage.getItem('projectName') || '请选择',
            milestone: sessionStorage.getItem('milestone') || '请选择',
            startTime: '请选择',
            endTime: '请选择',
            hour: 0,
            leaveHour: 0,
            desc: '',
            type: 'leave',  //一般项目(commonProject)、其他(other)、请假(leave)
            show: false,
            show2: false,
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(),
            currentDate2: new Date(),
            columnsValue: '上午',
            columnsValue2: '上午',
            columns: ['上午', '下午'],
            dateType: 'start'
        }
    },
    methods: {
        toProjectSelect() {
            this.$router.push('/projectSelect')
        },
        selectStartTime() {
            this.show = true;
        },
        selectEndTime() {
            this.show2 = true;
        },
        confirm() {
            let date = this.currentDate;
            let year = date.getFullYear()
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.currentDate = year+'-'+month+'-'+strDate
            const st = this.currentDate.replace(/-/g,"/");
            // this.currentDateFormat = Date.parse(st) //???????
            this.startTime = this.currentDate +' '+ this.columnsValue;
            this.show = false;
            if(this.currentDate2) {
                console.log(this.leaveDay(),'QQQ')
            }
        },
        confirm2() {
            let date = this.currentDate2;
            let year = date.getFullYear()
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.currentDate2 = year+'-'+month+'-'+strDate
            const st = this.currentDate.replace(/-/g,"/");
            // this.currentDateFormat = Date.parse(st) //???????
            this.endTime = this.currentDate2 +' '+ this.columnsValue2;
            this.show2 = false;
            if(this.currentDate) {
                console.log(this.leaveDay(),'###')
            }
        },
        onChange(picker, value, index) {
            this.columnsValue = value
            this.currentDate = new Date(this.currentDate)
        },
        onChange2(picker, value, index) {
            this.columnsValue2 = value
            this.currentDate2 = new Date(this.currentDate2)
        },
        leaveDay() {
          if (this.currentDate == "" && this.currentDate2 == "") {
            return "自动计算/最小单位0.5天";
          } else {
            let sdate = new Date(this.currentDate);
            let now = new Date(this.currentDate2);
            let days = now.getTime() - sdate.getTime();
            let day = parseInt(days / (1000 * 60 * 60 * 24));
    //         console.log(day);
            if (
              now == sdate ||
              (this.columnsValue == "上午" &&
                this.columnsValue2 == "上午") ||
              (this.columnsValue == "下午" && this.columnsValue2 == "下午")
            ) {
              day = day + 0.5;
            } else if (
              this.columnsValue == "上午" &&
              this.columnsValue2 == "下午"
            ) {
              day = day + 1;
            }
            return day;
          }
        }
    },
    created() {
        let {currentdate,weekDay} = getNowFormatDate();
        this.title = currentdate + ' ' + formatWeekDay(weekDay)
    }
}
</script>

<style lang="less">
    .fillHour {
        background: #eaedf1;
        height:100%;
        .fillContainer {
            width:95%;
            margin: 10px auto 0;
            .project {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height:60px;
                line-height:60px;
                background: #fff;
                padding:0 10px;
                .value {
                    display: flex;
                    align-items: center;
                    .van-field__control {
                        text-align: right;
                    }
                }
            }
            .workDesc,.question {
                // margin-top:10px;
                .item {
                    margin:10px 0;
                    display: flex;
                    align-items: center;
                }
            }
        }
        .bottom-btns {
            background: #fff;
            // border-top:1px solid #eee;
            width:100%;
            height:50px;
            display: flex;
            align-items: center;
            position:fixed;
            bottom:0;
            left:0;
            .btn{
                width:50%;
                text-align: center;
            }
        }
        .operation {
            display: flex;
            justify-content: space-between;
            padding: 12px;
        }
    }
</style>