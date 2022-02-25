<template>
  <div class="search-header">
    <svg
      v-if="left"
      font-size="20"
      class="icon"
      aria-hidden="true"
      @click="$router.back()"
    >
      <use xlink:href="#picfanhui1" />
    </svg>
    <div class="input">
      <input
        ref="input"
        :value="value"
        placeholder="(●'◡'●)ﾉ關鍵字の輸入"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="enter(value)"
        @focus="focus"
      >
      <svg v-if="right" font-size="30" class="icon" aria-hidden="true">
        <use xlink:href="#picxiangji1-copy" />
      </svg>
      <div v-if="right" class="save">
        <input
          id="uploads"
          type="file"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="uploadImg($event)"
        >
      </div>
    </div>
    <slot name="right" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    left: {
      type: Boolean,
      default: true
    },
    right: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    uploadImg() {

    },
    enter(value) {
      this.$emit('enter', value);
    },
    focus() {
      this.$emit('focus');
    },
    onfocus() {
      this.$refs.input.focus();
    }
  }
};
</script>

<style lang="stylus" scoped>
.search-header
  display flex
  align-items center
  justify-content space-between
  padding 12px 16px 16px
  box-sizing border-box
  svg
    flex-basis 40px
    position relative
    &:after
      content ''
      position absolute
      top -10px
      right -10px
      bottom -10px
      left 0
  .menu
    text-align right
  .input
    flex 1
    font-size 16px
    box-sizing border-box
    position relative
    >input
      // flex 1
      width 100%
      border none
      // font-size 16px
      box-sizing border-box
      height 40px
      padding 0 32px 0 9px
      border-radius 5px
      background-color rgb(245, 245, 245)
      color rgb(31, 31, 31)
    >svg
      position absolute
      top 5px
      right 5px
      &:after
        content ''
        position absolute
        top -10px
        right -10px
        bottom -10px
        left -10px
    .save
      position absolute
      width 40px
      height 40px
      top 0
      right 0
      opacity 0
      >input
        width 100%
        height 100%
</style>
