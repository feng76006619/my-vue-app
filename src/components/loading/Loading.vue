<template>
  <div class="loading-mask">
    <div class="loading-spinner" />
  </div>
</template>

<script>
export default {

};
</script>

<style lang="stylus" scoped>
@keyframes scaleout
  0%, 100%
    transform scale(0)
  50%
    transform scale(1)
.loading-mask
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  margin 0
  z-index 100
  background-color hsla(0, 0%, 100%, 1)
  transition opacity 0.3s
  .loading-spinner
    position absolute
    top 50%
    left 0
    right 0
    min-width 56px
    min-height 56px
    transform translateY(-50%)
    text-align center
    &::before, &::after
      content ''
      width 56px
      height 56px
      position absolute
      top 0
      left 50%
      margin-left -28px
      background rgb(185, 238, 229)
      opacity 0.6
      border-radius 50%
      animation scaleout 1.4s ease-in-out infinite
    &::after
      animation-delay -0.7s
</style>
