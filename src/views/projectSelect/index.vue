<template>
  <div class="container projectSelect">
        <titleText :title="title">
            <div slot="back">
                <van-icon
                size="22px"
                color="#fff"
                class="iconfont iconarrow"
                ></van-icon>
            </div>
        </titleText>
        <div class="projectList">
            <div 
                class="projectItem" 
                v-for="(item,index) in projectList" 
                :key="index" 
                :style="{marginTop: item.name==='其他'?'20px':0}"
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
            projectList: [
                {name: '永达智慧零售',selected: false},{name: '强生',selected: false},{name: '帝亚一维',selected: false},{name: '其他',selected: false},{name: '假期',selected: false}
            ],
            activeIndex: 0
            
        }
    },
    methods: {
        selectItem(item,index) {
            this.activeIndex = index;
            this.$set(item,'selected',!item.selected)
            this.projectList.forEach((item,idx)=>{
                if(index!=idx) {
                    this.$set(item,'selected',false)
                }
            })

            if(item.name=='其他') {
                sessionStorage.setItem('type','other')
            }else if(item.name=='假期') {
                sessionStorage.setItem('type','leave')
            }else {
                sessionStorage.setItem('type','commonProject')
            }

            sessionStorage.setItem('projectName',item.name)
            this.$router.push('/fillInHour')
        }
    },
    mounted() {
        if(sessionStorage.getItem('projectName')) {
            let index = this.projectList.findIndex(item=> item.name==sessionStorage.getItem('projectName'))
            if(index>-1) {
                this.$set(this.projectList[index],'selected',true)
            }
        }
    }
}
</script>

<style lang="less">
    .projectSelect {
        height:100%;
        .projectList {
            width:95%;
            margin:10px auto;
            .projectItem {
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