<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :class="[isActive?'active':'default']">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            path: {
                type: String,
                default: '/processStart'
            }
        },
        data(){
            return {
            }
        },
        computed: {
            isActive(){
                return this.$route.path.indexOf(this.path) !== -1;
            }
        },
        methods: {
            itemClick() {
                this.$router.push(this.path)
            }
        }
    }
</script>
<style lang="less">
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 58px;
    }
    .tab-bar-item img {
        width: 22px;
        height: 22px;
        margin-top: 8px;
        margin-bottom: 6px;
        vertical-align: middle;
    }
    .active {
        color: #1E969B;
    }
    .default {
        color: #6A6E71;
    }
</style>