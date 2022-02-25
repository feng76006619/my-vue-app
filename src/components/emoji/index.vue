<template>
  <transition enter-active-class="animated fadeIn">
    <div v-show="visible" class="bottom-popup-container" @click="close">
      <div class="emoji animated slideInUp" @click.stop>
        <v-tabs
          :vertical="false"
          height="30"
          hide-slider
          light
        >
          <v-tab
            v-for="item in pannels"
            :key="item"
            @click="type = item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <div class="emoji-selection">
          <img
            v-for="(item, index) in emojiData[type]"
            :key="index"
            :src="require(`@/assets/${item}`)"
            @click="handleClick(index)"
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import data from '@/static/resources/sticker.json';
export default {
  name: 'Emoji',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      emojiData: data,
      pannels: ['sazi', '公主连结', '雀魂'],
      activeIndex: 0,
      isShow: false,
      type: 'sazi'
    };
  },
  methods: {
    changeActive(index) {
      this.activeIndex = index;
    },
    getPureName(name) {
      return name.replace(/:/g, '');
    },
    selectItem(emoji) {
      this.$emit('select', emoji);
    },
    show() {
      this.isShow = true;
    },
    close() {
      this.$emit('update:visible', false);
    },
    handleClick(index) {
      const data = `[${this.type}_${index}]`;
      this.$emit('clickEmoji', data);
    }
  }
};
</script>

<style lang='stylus' scoped>
.bottom-popup-container
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.4);
  z-index: 103
  overflow: hidden;
  .emoji
    position absolute
    bottom 0
    left 0
    width 100%
    max-height 100%
    border-top 1px solid #f3f3f3
    overflow hidden
    background-color #fff
    z-index 104
    .emoji-title
      height 48px
    .scroll-wrapper
      width 90%
      margin 80px auto
      white-space nowrap
      border 3px solid #42b983
      border-radius 5px
      overflow hidden
      .scroll-content
        display inline-block
      .scroll-item
        height 50px
        line-height 50px
        font-size 24px
        display inline-block
        text-align center
        padding 0 10px
    .emoji-selection
      text-align: center;
      max-height: 248px;
      overflow: scroll;
      img
        width 55px
        height 55px
        margin 4px
        border none
        vertical-align middle
        transition transform .1s
        object-fit cover
        border-radius 4px
      :active
        transform scale(.8)
</style>
