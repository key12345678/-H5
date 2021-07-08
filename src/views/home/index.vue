<template>
    <div class="container home">
        <titleText :title="title">
            <div slot="back">
                <van-icon
                size="22px"
                color="#fff"
                class="iconfont iconarrow"
                ></van-icon>
            </div>
        </titleText>
        <div class="calendar">
            <!-- 日期标题 -->
            <div class="title_date">
                <!-- <div class="btn" @click="last()">
                    <van-icon name="arrow-left" />
                </div> -->
                <div class="text">{{Year}}年{{Month}}月</div> &nbsp;
                <div @click="chooseDate">▼</div>
                <!-- <div class="btn"@click="next()">
                    <van-icon name="arrow" />
                </div> -->
            </div>
            <!-- 周 -->
            <div class="head">
                <div class="days" 
                    v-for="(item,index) in weeks" 
                    :key="index"
                >
                    {{item}}
                </div>
            </div>

            <div class="wrap">
                <div class="span" 
                    v-for="(item,index) in calendarList" 
                    :key="index" 
                    @click="click(item.count)" 
                    :class="item.empty?'kong':'fillDay'"
                >
                    <div class="itemDayWrap">
                    <div class="itemDay" :class="currentDay===item.count?'active':''">{{item.value}}</div>
                    <div :class="item==''?'kong':'workingHours'">
                        <div class="box" v-if="!item.empty && item.checked">
                            <div class="hourValue checked">{{item.checked}}</div> &nbsp;<span>已审核</span>
                        </div>
                        <div class="box" v-if="!item.empty && item.unChecked">
                            <div class="hourValue unChecked">{{item.unChecked}}</div> &nbsp;<span>未审核</span>
                        </div>
                        <div class="box" v-if="!item.empty && item.unSubmit">
                            <div class="hourValue unSubmit">{{item.unSubmit}}</div> &nbsp;<span>未提交</span>
                        </div>
                        <div class="box" v-if="!item.empty && item.back">
                            <div class="hourValue back">{{item.back}}</div> &nbsp;<span>被退回</span>
                        </div>
                        <div class="box" v-if="!item.empty && item.leave">
                            <div class="hourValue leave">{{item.leave}}</div> &nbsp;&nbsp;&nbsp;&nbsp;<span>请假</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="items">
            <div class="item" v-for="(item,index) in items" :key="index">
                <div class="itemWrapper">
                    <div class="hour" :style="{color: item.color}">{{item.hour}}</div>
                    <div class="name">{{item.name}}</div>
                </div>
                
            </div>
        </div>

        <div class="checkShowHour">
            <div class="hour_" style="border-bottom:1px solid #eee">
                <div class="text">审核工时</div>
                <div class="value" @click="toAuditTime">
                    <span>5</span>&nbsp;&nbsp;&nbsp;
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="hour_">
                <div class="text">查看工时</div>
                <div class="value">
                    <span>3</span>&nbsp;&nbsp;&nbsp;
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>

        <van-action-sheet v-model="show" title="选择日期">
            <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                title="选择年月"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
                @cancel="show = false"
                @confirm="confirm"
            />
        </van-action-sheet>
  </div>
</template>

<script>
import titleText from "@/components/header/index.vue";
import { getNowFormatDate } from '@/utils/index.js'
export default {
    components: {
        titleText,
    },
    data() {
      return {
        title: '首页',
        weeks: ['日','一','二','三','四','五','六'],
        Year: new Date().getFullYear(),   //日历上的年份
        Month: new Date().getMonth() + 1, //日历上的月份
        Day: new Date().getDate(),        //日历上的天
        currentDay: null,
        calendarList: [],
        show: false,
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        currentDateFormat: new Date(),
        datas: [
            {date: '1',checked: '4',unChecked: '1',unSubmit: null,back: '1',leave: null},
            {date: '2',checked: '3',unChecked: '4',unSubmit: null,back: null,leave: null},
            {date: '3',checked: null,unChecked: null,unSubmit: '2',back: null,leave: null},
            {date: '4',checked: '4',unChecked: null,unSubmit: null,back: '1',leave: null},
            {date: '5',checked: null,unChecked: null,unSubmit: '1',back: null,leave: null},
            {date: '6',checked: '4',unChecked: '1',unSubmit: null,back: null,leave: null},
            {date: '7',checked: '4',unChecked: null,unSubmit: null,back: null,leave: '3'},
            {date: '8',checked: null,unChecked: null,unSubmit: '1',back: null,leave: null},
            {date: '9',checked: '4',unChecked: '1',unSubmit: null,back: null,leave: null},
            {date: '10',checked: null,unChecked: null,unSubmit: null,back: null,leave: null},
            {date: '11',checked: '4',unChecked: null,unSubmit: '1',back: null,leave: null},
            {date: '12',checked: null,unChecked: null,unSubmit: null,back: '1',leave: '2'},
            {date: '13',checked: null,unChecked: '1',unSubmit: null,back: '1',leave: null},
            {date: '14',checked: '4',unChecked: null,unSubmit: null,back: '1',leave: null},
            {date: '15',checked: '4',unChecked: '1',unSubmit: '1',back: '1',leave: null},
            {date: '16',checked: '4',unChecked: '1',unSubmit: null,back: null,leave: '1'},
            {date: '17',checked: null,unChecked: null,unSubmit: '1',back: null,leave: null},
            {date: '18',checked: null,unChecked: '1',unSubmit: null,back: '1',leave: null},
            {date: '19',checked: '4',unChecked: '1',unSubmit: '1',back: '1',leave: null},
            {date: '20',checked: null,unChecked: null,unSubmit: null,back: '1',leave: null},
            {date: '21',checked: '4',unChecked: null,unSubmit: '1',back: null,leave: null},
            {date: '22',checked: null,unChecked: null,unSubmit: '1',back: null,leave: null},
            {date: '23',checked: null,unChecked: '1',unSubmit: null,back: '1',leave: null},
            {date: '24',checked: '4',unChecked: null,unSubmit: '1',back: '1',leave: null},
            {date: '25',checked: null,unChecked: '1',unSubmit: '1',back: null,leave: null},
            {date: '26',checked: null,unChecked: null,unSubmit: '1',back: '1',leave: null},
            {date: '27',checked: '4',unChecked: '1',unSubmit: '1',back: null,leave: null},
            {date: '28',checked: '4',unChecked: null,unSubmit: '1',back: '1',leave: null},
            {date: '29',checked: null,unChecked: null,unSubmit: '1',back: null,leave: null},
            {date: '30',checked: '4',unChecked: '1',unSubmit: '1',back: '1',leave: null},
            {date: '31',checked: '4',unChecked: null,unSubmit: null,back: '1',leave: '2'}
        ],
        items: [
            {name: '本月已审核',hour: '60',color: '#3B82FF'},
            {name: '本月未审核',hour: '8',color: '#FF9900'},
            {name: '本月未提交',hour: '6',color: '#33CC33'},
            {name: '本月被退回',hour: '5',color: '#FF5757'},
            {name: '本月请假',hour: '2',color: '#999999'}
        ]
      }
    },
    methods: {
        toAuditTime() {
            this.$router.push('/auditTime')
        },
        chooseDate() {
            this.show = true;
        },
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
            return val;
        },
        confirm() {
            let date = this.currentDate;
            let year = date.getFullYear()
            let month = date.getMonth() + 1;
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            this.currentDate = year+'-'+month
            const st = this.currentDate.replace(/-/g,"/");
            // this.currentDateFormat = Date.parse(st) //???????
            this.Year = year;
            this.Month = month;
            this.Draw(this.Year, this.Month);
            this.getData()
            this.show = false;
        },
        getData() {
            let {calendarList} = this;
            calendarList.forEach(item=> {
                if(item && !item.empty) {
                    this.datas.forEach(itm=> {
                        if(item.value==itm.date) {
                            this.$set(item,'checked',itm.checked);
                            this.$set(item,'unChecked',itm.unChecked);
                            this.$set(item,'unSubmit',itm.unSubmit);
                            this.$set(item,'back',itm.back);
                            this.$set(item,'leave',itm.leave);
                        }
                    })
                }
            })
        },
        Draw(Year, Month) {
            //日期列表
            let calendar = [];
            //用当月第一天在一周中的日期值作为当月离第一天的天数(获取当月第一天是周几)new Date(Year, Month - 1, 1).getDay()
            for (let i = 1, firstDay = new Date(Year, Month - 1, 1).getDay(); i <= firstDay; i++) {
                // 补上个月最后几天
                let date = new Date(Year,Month-1,1)
                date.setDate(i - firstDay)
                let time_year = date.getFullYear();
                let time_month = date.getMonth() + 1;
                let time_day = date.getDate();
                let time_day_ = date.getDate();
                if (time_month < 10) {
                    time_month = 0 + '' + time_month;
                }
                if (time_day_ < 10) {
                    time_day_ = 0 + '' + time_day_;
                }
                calendar.push({
                    value: time_day,
                    count: time_year + '-' + time_month + '-' + time_day_,
                    empty: true
                });


            }
            //用当月最后一天在一个月中的日期值作为当月的天数(获取当前月的天数)
            for (let i = 1, monthDay = new Date(Year, Month, 0).getDate(); i <= monthDay; i++) {
            let time_month = Month;
            let time_day = i;
            if (Month < 10) {
                time_month = 0 + '' + Month;
            }
            if (i < 10) {
                time_day = 0 + '' + i;
            }
            calendar.push({
                value: i,
                count: Year + '-' + time_month + '-' + time_day
            })
            }
            //获取下个月第一天是周几 new Date(Year, Month, 1).getDay()
            if(new Date(Year, Month, 1).getDay() > 0) {
                for(let i = 1, nextMonthFirstDay = new Date(Year, Month, 1).getDay();i <= 7 -nextMonthFirstDay; i++) {
                    // 补下个月开始几天
                    let date = new Date(Year,Month,1)
                    date.setDate(i)
                    let time_year = date.getFullYear();
                    let time_month = date.getMonth() + 1;
                    let time_day = date.getDate();
                    let time_day_ = date.getDate();
                    if (time_month < 10) {
                        time_month = 0 + '' + time_month;
                    }
                    if (time_day_ < 10) {
                        time_day_ = 0 + '' + time_day_;
                    }
                    calendar.push({
                        value: time_day,
                        count: time_year + '-' + time_month + '-' + time_day_,
                        empty: true
                    });
                }
            }
            this.calendarList = calendar;
        },
        last() {
            this.Month--;
            if (this.Month == 0) {
            this.Month = 12;
            this.Year--;
            }
            this.Draw(this.Year, this.Month);
            this.getData()
        },
        next() {
            this.Month++;
            if (this.Month == 13) {
            this.Month = 1;
            this.Year++;
            }
            this.Draw(this.Year, this.Month);
            this.getData()
        },
    },
    mounted() {
        this.getData()
    },
    created() {
      this.Draw(this.Year, this.Month);
      let {currentdate} = getNowFormatDate();
      this.currentDay = currentdate
    }
}
</script>

<style lang="less">
    .home {
        // .name {
        //     height:50px;
        //     line-height:50px;
        //     text-align: center;
        //     background: #eee;
        // }
        .calendar {
            background: #fff;
            .title_date{
                width: 100%;
                height: 50px;
                // background-color: #60a7e8;
                display: flex;
                flex-wrap: nowrap;
                // text-align: center;
                justify-content: center;
                color: #434343;
                font-weight: bold;
                line-height: 50px;
            
                .btn{
                    width: 30px;
                    text-align: center;   
                &.noclick{
                    pointer-events: none;
                    background: #ccc;
                }
                }
                .text{
                    // flex: 1;
                }
            }
            .head{
                display: flex;
                flex-wrap: nowrap;
                text-align: center;
                height: 40px;
                line-height: 40px;
                .days {
                    flex: 1;
                }
            }
            .wrap {
                // width: 7.5rem;
                height: auto;
                overflow: hidden;
                padding-bottom: 1rem;
            }
            .span {
                box-sizing:border-box;
                width: 14.28%;
                height:110px;
                float: left;
                text-align: center;
                &.active {
                    background: #037ef5;
                    color: #fff;
                }
            
                &.noclick {
                    pointer-events: none;
                    background: #ccc;
                }
            
                &.kong {
                    color:#ddd;
                    // background: #fff;
                    // pointer-events: none;
                }
                &.fillDay {
                    // background:#eee;
                    // border:1px solid #fff;
                }
            }
            .itemDayWrap {
                height:100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .itemDay {
                    width:30px;
                    height:30px;
                    line-height:30px;
                    border-radius: 15px;
                    text-align: center;
                    &.active {
                        background: #1890FF;
                        color:#fff;
                    }
                }
                .workingHours {
                    width:100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size:12px;
                    transform: scale(0.9);
                    // flex-grow: 1;
                    .box {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 2px;
                        span{
                            color:#BFBFBF;
                        }
                    }
                    div {
                        // flex: 1
                    }
                    .hourValue {
                        width:14px;
                        height:14px;
                        border-radius: 7px;
                        line-height: 14px;
                        text-align: center;
                        color:#fff;
                    }
                    .checked {
                        background: #3B82FF;
                    }
                    .unChecked {
                        background: #FF9900;
                    }
                    .unSubmit {
                        background: #33CC33;
                    }
                    .back {
                        background: #FF5757;
                    }
                    .leave {
                        background: #999999;
                    }
                }
            }
        }
        .items {
            background: #fff;
            display:flex;
            flex-wrap: wrap;
            .item{
                width:33.3%;
                text-align: center;
                margin-bottom:10px;
                display: flex;
                justify-content: center;
                .itemWrapper{
                    width:90%;
                    display: flex;
                    align-items: center;
                    background: #dde1e6;
                    padding:3px 0;
                    border-radius:3px;
                    .hour {
                        width:30px;
                        font-size:14px;
                    }
                    .name{
                        color:#6F6F70;
                        font-size:12px;
                    }
                }
            }
        }
        .checkShowHour {
            background: #fff;
            font-size:14px;
            padding:0 10px;
            color:#6F6F70;
            margin:10px 0;
            .hour_ {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height:60px;
                line-height:60px;
                .value {
                    display: flex;
                    align-items: center;
                }
            }
        }

    }
</style>