<template>
  <div class="found">
    <h2>404</h2>
    <i class="iconfont icon-icon-test" @click="$router.back()" />
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  components: {},
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
.found
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background #ffffff
  z-index 999
  display flex
  justify-content center
  align-items center
  flex-direction column
  i
    margin-top 20px
</style>
