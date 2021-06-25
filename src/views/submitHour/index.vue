<template>
    <div class="container submitHour">
        <titleText :title="title">
            <div slot="back">
                <van-icon
                size="22px"
                color="#fff"
                class="iconfont iconarrow"
                ></van-icon>
            </div>
        </titleText>
        <div class="currentDay">
            <div class="currentDate">
                <span>{{currentDate}}</span>&nbsp;&nbsp;
                <span>{{formatWeekDay_(weekDay)}}</span>
            </div>
            <div class="add">
                <van-icon name="add" color="#3B82FF" size="26px" @click="goFillInHour"/>
            </div>
        </div>
        <div class="itemList">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    :finished-text="finishedText"
                    @load="onLoad"
                >
                    <div class="item" v-for="(item,index) in list" :key="index">
                        <div class="item-top">
                            <div class="top-left">
                                <div class="hour">{{item.hour}}h</div>
                                <div class="desc">
                                    <div class="desc-top">{{item.project}}</div>
                                    <div class="desc-bottom">{{item.step}}</div>
                                </div>
                            </div>
                            <div class="top-right">
                                <div class="status" :style="{color:item.color}">{{statusMap[item.status]}}</div>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div class="bottom-left">操作</div>
                            <div class="bottom-right" v-if="item.status==0">
                                <van-icon name="edit" size="16px" />&nbsp;&nbsp;&nbsp;&nbsp;
                                <van-icon name="delete-o" size="16px"/>
                            </div>
                            <div v-if="item.status==1">
                                <van-icon name="search" size="16px" />
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>  
        </div>
        <div class="bottom-btns">
            <div class="btn">总计：12小时</div>
            <div class="btn"><van-button type="info">提交当前工时(12小时)</van-button></div>
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
    computed: {
        finishedText() {
            if(this.list.length===0 || !this.list) {
                return '今天还没提交工时'
            }
            let totolHour = this.list.length>0 && this.list.reduce((pre,cur)=> {
                pre += cur.hour
                return pre
            },0)
            if(this.list.length>0 && totolHour < 8) {
                return '今天工时还没满8小时'
            }
            return '往下没有了~'
        }
    },
    data() {
        return {
            title: 'Zack',
            currentDate: null,
            weekDay: 0,
            loading: false,
            finished: true,
            refreshing: false,
            list: [
                {hour: 4,project: '永达智慧零售',step: '蓝图阶段',status: 0,color: '#85E085'},
                {hour: 4,project: '强生',step: '蓝图阶段',status: 1,color: '#5894FF'},
                {hour: 8,project: '请假',step: '',status: 0,color: '#85E085'},
            ],
            statusMap: {
                0: '未提交',
                1: '已审批'
            }
        }
    },
    methods: {
        onLoad() {
            
        },
        onRefresh() {
            // this.finished = false;
            // this.loading = true;
            // this.onLoad();
        },
        formatWeekDay_(val) {
            return formatWeekDay(val)
        },
        goFillInHour() {
            this.$router.push('/fillInHour')
        }
    },
    created() {
        let {currentdate,weekDay} = getNowFormatDate();
        this.currentDate = currentdate;
        this.weekDay = weekDay
    }
}
</script>

<style lang="less">
    .submitHour {
        .currentDay {
            padding:0 10px;
            height:50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            font-size: 14px;
            color:#525252;
        }
        .itemList {
            width: 95%;
            margin: 10px auto 0;
            padding-bottom: 50px;
            .item {
                display: flex;
                flex-direction: column;
                padding:0 10px;
                background: #fff;
                border-radius: 10px;
                margin-bottom:10px;
                .item-top,.item-bottom{
                    height:60px;
                }
                .item-top {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #eee;
                    align-items: center;
                    .top-left{
                        display: flex;
                        .hour{
                            width:40px;
                            height:40px;
                            line-height:40px;
                            text-align: center;
                            border-radius: 20px;
                            background: #E8F0FF;
                            margin-right:10px;
                            color:#3B82FF;
                        }
                        .desc {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            font-size: 14px;
                            .desc-top{
                                color:#515151;
                                font-weight: bold;
                            }
                            .desc-bottom{
                                color:#FFAB2D
                            }
                        }
                    }
                    .top-right {
                        .status {
                            // color:#85E085;
                            font-size:14px;
                        }
                    }
                }
                .item-bottom{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color:#A5A5A5;
                    font-size:13px;
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
    }
</style>