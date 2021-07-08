<template>
    <div class="container auditTime">
        <titleText :title="title">
            <div slot="back">
                <van-icon
                size="22px"
                color="#fff"
                class="iconfont iconarrow"
                ></van-icon>
            </div>
        </titleText>

        <div class="list">
            <div class="listWrapper" v-for="(item,index) in list" :key="item.date">
                <div class="date">{{item.date}}</div>
                <div class="wrapper">
                    <!-- <div class="item" v-for="(itm,idx) in item.inList" :key="itm.id">
                        {{itm.name}}
                    </div> -->
                    <van-grid :gutter="10" :column-num="3">
                        <van-grid-item v-for="(itm,idx) in item.inList" :key="itm.id" @click="toAuditDetail(item,itm)">
                            <div><van-image round fit="cover" width="80" height="80" src="https://img01.yzcdn.cn/vant/apple-1.jpg" /></div>
                            <div>{{itm.name}}</div>
                            <div class="dot">5</div>
                        </van-grid-item>
                    </van-grid>
                </div>
            </div>
        </div>

        <div class="bottom-btns">
            <div class="btn"><van-button type="info" block>首页</van-button></div>
        </div>
    </div>
</template>

<script>
import titleText from "@/components/header/index.vue";
export default {
    components: {
        titleText,
    },
    data() {
        return {
            title: '审核工时',
            list: [
                {
                    date: '2021-03-05',inList: [{id: 1,name: '张三'},{id: 2,name: '李四'},{id: 3,name: '张三'},{id: 4,name: '李四'},{id: 5,name: '张三'},{id: 6,name: '李四'}]
                },
                {
                    date: '2021-03-06',inList: [{id: 1,name: '张三'},{id: 2,name: '李四'},{id: 3,name: '张三'},{id: 4,name: '李四'},{id: 5,name: '张三'},{id: 6,name: '李四'}]
                },
                {
                    date: '2021-03-07',inList: [{id: 1,name: '张三'},{id: 2,name: '李四'},{id: 3,name: '张三'},{id: 4,name: '李四'},{id: 5,name: '张三'},{id: 6,name: '李四'}]
                }
            ]
        }
    },
    methods: {
        toAuditDetail(item,itm) {
            this.$router.push({
                path: '/auditDetail',
                query: {
                    date: item.date,
                    name: itm.name
                }
            })
        }
    }
}
</script>

<style lang="less">
    .auditTime {
        min-height:100%;
        background: #eaedf1;
        padding-bottom: 50px;
        .listWrapper {
            .date {
                height: 50px;
                line-height: 50px;
                padding-left:10px;
            }
        }
        .bottom-btns {
            background: #fff;
            width:100%;
            // height:50px;
            display: flex;
            align-items: center;
            position:fixed;
            z-index:10;
            bottom:0;
            left:0;
            .btn{
                width:100%;
                text-align: center;
            }
        }
        .dot {
            width:20px;
            height:20px;
            font-size: 12px;
            border-radius: 10px;
            line-height:20px;
            text-align: center;
            background: red;
            color:#fff;
            position:absolute;
            right: 16px;
            top: 12px;
        }
    }
    
    
</style>