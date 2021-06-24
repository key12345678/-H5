<template>
    <div class="title">
        <div class="back" @click="goBack">
            <slot name="back"></slot>
        </div>
        <div>{{title}}</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>
<style lang="less">
    .title {
        height: 52px;
        line-height: 52px;
        letter-spacing: 3px;
        text-align: center;
        font-weight: 350;
        color: #fff;
        background: #3975C6;
        .back {
            position: absolute;
            left: 20px;
            top: 4px;
        }
    }
</style>