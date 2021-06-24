<template>
  <div id="app">
    <transition name='fade'>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data(){
      return {

      }
    }
  }
</script>
<style lang="less">
  // .fade-enter-active, .fade-leave-active { transition: all 0.3s; }
  // .fade-enter, .fade-leave { transform: translateX(100%); }
</style>
