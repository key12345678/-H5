<template>
    <div class="container detail">
        <titleText :title="title">
            <div slot="back">
                <van-icon
                size="22px"
                color="#fff"
                class="iconfont iconarrow"
                ></van-icon>
            </div>
        </titleText>

        <div class="day_">
            <div class="currentDate">
                <span>{{date}}</span>&nbsp;&nbsp;
                <span>{{formatWeekDay_(weekDay)}}</span>
            </div>
        </div>

        <div class="itemList">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="往下没有啦~~"
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
                            <div class="top-right" @click="selectItem(item,index)">
                                <van-icon name="checked" color="#3B82FF" size="22" v-if="item.selected==true" />
                                <van-icon name="checked" color="#CCCCCC" size="22" v-else />
                            </div>
                        </div>
                        <!-- type=1 项目 -->
                        <div class="item-bottom" v-show="item.type==1">
                            <div class="title_">工作描述</div>
                            <div class="desc">绘制订单模块绘制订单模块绘制订单模块</div>
                            <div class="title_">存在的问题</div>
                            <div class="desc">订单列表是否需要带上物流信息？订单列表是否需要带上物流信息？订单列表是否需要带上物流信息？</div>
                        </div>
                        <!-- type=3 请假 -->
                        <div class="item-bottom" v-show="item.type==3">
                            <div class="date_">
                                <div class="date_text">开始日期</div>
                                <div class="date_time">2021-03-21 下午</div>
                            </div>
                            <div class="date_">
                                <div class="date_text">结束日期</div>
                                <div class="date_time">2021-3-24 下午</div>
                            </div>
                            <div class="title_" style="border-top:1px solid #eee">描述</div>
                            <div class="desc">水管漏水，需要维修</div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>  
        </div>

        <div class="bottom-btns">
            <div class="btn"><van-button style="background: #F2F4F6;color: #D83D3D" block>拒绝</van-button></div>
            <div class="btn"><van-button type="info" block>通过</van-button></div>
        </div>
    </div>
</template>

<script>
import titleText from "@/components/header/index.vue";
import { formatWeekDay } from '@/utils/index.js'
export default {
    components: {
        titleText,
    },
    data() {
        return {
            refreshing: false,
            loading: false,
            finished: true,
            title: '',
            date: '',
            weekDay: 0,
            list: [
                {hour: 4,project: '永达智慧零售',step: '蓝图阶段',status: 0,color: '#85E085',type: 1,selected: false},
                {hour: 4,project: '强生',step: '蓝图阶段',status: 1,color: '#5894FF',type: 1,selected: false},
                {hour: 8,project: '请假',step: '',status: 0,color: '#85E085',type: 3,selected: false},
            ],
            statusMap: {
                0: '未提交',
                1: '已审批'
            }
        }
    },
    methods: {
        selectItem(item,index) {
            item.selected = !item.selected
        },
        formatWeekDay_(val) {
            return formatWeekDay(val)
        },
        onRefresh() {

        },
        onLoad() {
            
        },
    },
    mounted() {

    },
    created() {
        this.date = this.$route.query && this.$route.query.date;
        this.title = this.$route.query && this.$route.query.name;
        this.weekDay = new Date(this.date).getDay()
    }
}
</script>

<style lang="less">
    .detail {
        .day_ {
            padding:0 10px;
            height:50px;
            display: flex;
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
                padding:0 10px 20px;
                background: #fff;
                border-radius: 10px;
                margin-bottom:10px;
                .item-top{
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
                }
                .item-bottom{
                    .title_ {
                        height:50px;
                        line-height: 50px;
                        color: #333333
                    }
                    .desc {
                        background: #F8F9FA;
                        color: #9C9D9D;
                        padding:5px;
                        font-size:13px;
                    }
                    .date_ {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height:40px;
                        .date_text {
                            // font-weight:bold;
                            color:#515151;
                        }
                        .date_time {
                            color:#9C9D9D
                        }
                    }
                }
            }
        }
        .bottom-btns {
            background: #fff;
            // border-top:1px solid #eee;
            width:100%;
            height:50px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            position:fixed;
            bottom:0;
            left:0;
            .btn{
                width:45%;
                text-align: center;
            }
        }
    }
</style>