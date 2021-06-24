<template>
    <div id="tabbar">
        <tab-bar-item v-for="item in tabBarItemList" :key="item.path" :path="item.path">
            <img slot="item-icon" :src="item.image" />
            <img slot="item-icon-active" :src="item.activeImage" />
            <div class="text" slot="item-text">{{ item.title }}</div>
        </tab-bar-item>
    </div>
</template>
<script>
    import TabBarItem from './TabBarItem.vue';
    export default {
        components: {
            TabBarItem
        },
        data(){
            return {
                tabBarItemList: [
                    { path: '/device', title: '设备列表',image:require('../../assets/device.png'),activeImage: require('../../assets/device-active.png')},
                    { path: '/person', title: '人员库',image:require('../../assets/person.png'),activeImage: require('../../assets/person-active.png')},
                    { path: '/message', title: '消息处理',image:require('../../assets/message.png'),activeImage: require('../../assets/message-active.png')},
                    { path: '/mine', title: '我的',image:require('../../assets/mine.png'),activeImage: require('../../assets/mine-active.png')},
                ]
            }
        }
    }
</script>
<style lang="less">
    #tabbar {
        height: 58px;
        background-color: #22272A;
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0 -1px 1px rgba(100,100,100,.1);
        font-size: 14px;
        z-index: 10;
    }
</style>