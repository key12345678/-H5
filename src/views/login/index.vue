<template>
<div>
    <van-button type="primary" @click="login">登录</van-button>
</div>
  
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        login() {
            this.$router.push('/home')
        }
    }
}
</script>

<style>

</style>