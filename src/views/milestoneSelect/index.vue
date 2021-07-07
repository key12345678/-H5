<template>
  <div class="container milestoneSelect">
        <titleText :title="title">
            <div slot="back">
                <van-icon
                size="22px"
                color="#fff"
                class="iconfont iconarrow"
                ></van-icon>
            </div>
        </titleText>
        <div class="milestoneList">
            <div 
                class="milestoneItem" 
                v-for="(item,index) in milestoneList" 
                :key="index" 
                @click="selectItem(item,index)"
            >
                <div :style="{color: item.selected==true?'#6DA2FF':''}">{{item.name}}</div>
                <div><van-icon name="success" color="#6DA2FF" v-show="item.selected==true" /></div>
            </div>
            

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
            title: '项目',
            milestoneList: [
                {name: '蓝图设计',selected: false},{name: '项目启动',selected: false},{name: '项目调研',selected: false},{name: '项目第一阶段',selected: false},{name: '项目第二阶段',selected: false}
            ],
            activeIndex: 0
            
        }
    },
    methods: {
        selectItem(item,index) {
            this.activeIndex = index;
            this.$set(item,'selected',!item.selected)
            this.milestoneList.forEach((item,idx)=>{
                if(index!=idx) {
                    this.$set(item,'selected',false)
                }
            })

            sessionStorage.setItem('milestone',item.name)
            this.$router.push('/fillInHour')
        }
    },
    mounted() {
        if(sessionStorage.getItem('milestone')) {
            let index = this.milestoneList.findIndex(item=> item.name==sessionStorage.getItem('milestone'))
            if(index>-1) {
                this.$set(this.milestoneList[index],'selected',true)
            }
        }
    }
}
</script>

<style lang="less">
    .milestoneSelect {
        height:100%;
        .milestoneList {
            width:95%;
            margin:10px auto;
            .milestoneItem {
                background: #fff;
                padding:0 10px;
                height: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom:1px solid #eee;
            }
        }
    }
</style>