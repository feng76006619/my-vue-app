<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot />
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
BScroll.use(ObserveDOM);
export default {
  name: 'Scroll',
  props: {
    direction: {
      type: String,
      default: 'vertical',
      validator: function(value) {
        return value === 'vertical' || value === 'horizontal';
      }
    },
    probeType: {
      type: Number,
      default: 3
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  destroyed() {
    this.scroll && this.scroll.destroy();
    this.scroll = null;
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: this.direction === 'horizontal',
        scrollY: this.direction === 'vertical',
        probeType: this.probeType,
        click: this.click,
        observeDOM: true
      });
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos);
        });
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style lang="stylus" scoped>
.scroll-wrapper
  height 100%
  width 100%
  overflow hidden
</style>
