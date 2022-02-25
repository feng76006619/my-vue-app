<template>
  <v-list class="list">
    <VirtualCollection
      :cell-size-and-position-getter="cellSizeAndPositionGetter"
      :collection="list"
      :identifier="identifier"
      @infinite="infinite"
      @resize="resize"
    >
      <slot />
      <template v-slot:cell="props">
        <slot name="cell" :data="props.data" />
      </template>
    </VirtualCollection>
  </v-list>
</template>

<script>
import VirtualCollection from '@/components/collect/VirtualCollection';
import { getClient } from '@/util/dom';
export default {
  components: {
    VirtualCollection
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    identifier: {
      type: Number,
      default: +new Date()
    },
    height: {
      type: Number,
      required: true
    }
  },
  methods: {
    infinite($state) {
      this.$emit('infinite', $state);
    },
    cellSizeAndPositionGetter(item, index) {
      return {
        width: getClient().width - 16,
        height: this.height,
        x: 0,
        y: (item.height ? item.height : this.height) * index
      };
    },
    handleClick(id) {
      this.$emit('handleClick', id);
    },
    resize() {
      this.$emit('resize');
    }
  }
};
</script>

<style lang="stylus" scoped>
.list
  position relative
  background-color #fff
</style>
