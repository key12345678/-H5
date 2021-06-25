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
            
        }
    },
    methods: {
        

    }
}
</script>

<style lang="scss">

</style>