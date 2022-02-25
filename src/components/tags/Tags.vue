<template>
  <div ref="tags" class="tags">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="tags-item"
      :style="{'justifyContent': item.keywordTranslated ? 'space-between' : 'center'}"
      @click.prevent="handleClick(item)"
    >
      <div>{{ item.keyword || item.name }}</div>
      <span>{{ item.keywordTranslated || item.translatedName }}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('handleClick', item);
    }
  }
};
</script>

<style lang="stylus" scoped>
  .tags
    padding 0 10px
    display -webkit-box
    overflow-x scroll
    position relative
    margin-top 8px
    height 44px
    &::-webkit-scrollbar
      display none
    .tags-item
      display flex
      flex-direction column
      justify-content space-between
      font-family Arial
      padding 5px 7px 5px 7px
      width auto
      border-radius 3px
      margin-right 7px
      text-align center
      color white
      background-color #B9EEE5
      div
        font-size 16px
        white-space nowrap
      span
        font-size 10px
        white-space nowrap
</style>
