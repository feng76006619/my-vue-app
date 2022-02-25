<template>
  <div class="hot">
    <div class="hot-title">大家都在搜</div>
    <div class="hot-tag">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="tag-item"
        @click="clickTag(item.name)"
      >
        <div class="tag-container">
          <img :src="item.illustration.imageUrls[0].squareMedium | replaceSquare" alt="">
          <div class="mask" />
          <div class="tag-bottom">
            <div class="name text-no-wrap text-truncate">
              {{ '#' + item.name }}
            </div>
            <div class="translate-name text-no-wrap text-truncate">
              {{ item.translatedName }}
            </div>
          </div>
        </div>
      </div>
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
    clickTag(name) {
      this.$emit('clickTag', name);
    }
  }
};
</script>

<style lang="stylus" scoped>
.hot-title
  font-size 14px
  color #adadad
  padding 8px
.hot-tag
  width 100vw
  display flex
  flex-wrap wrap
  .tag-item
    width 33.3vw
    height 33.3vw
    border 1px solid #fff
    .tag-container
      width 100%
      height 100%
      position relative
      img
        width 100%
        height 100%
      .mask
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        background-image linear-gradient(to right, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32))
      .tag-bottom
        position absolute
        bottom 0
        box-sizing border-box
        padding 14px 8px
        width 100%
        text-align center
        color #fff
        text-align center
        .name
          font-size 12px
          line-height 16px
          font-weight 700
          margin-bottom 5px
        .translate-name
          font-size 10px
          line-height 14px
</style>
