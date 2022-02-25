<template>
  <div class="search-illusts">
    <div class="search-content">
      <List
        :list="pictureList"
        :identifier="identifier"
        @infinite="infinite"
      >
        <search-box v-model="tag" @focus="focus">
          <template v-slot:right>
            <svg
              font-size="20"
              class="icon"
              aria-hidden="true"
              @click="openOption"
            >
              <use xlink:href="#picshezhi" />
            </svg>
          </template>
        </search-box>
        <Tags :data="[...tags, ...exclusive]" @handleClick="clickTag" />
      </List>
    </div>
    <Option ref="option" @setOption="setOption" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Tags from '@/components/tags/Tags';
import List from '@/components/virtual-list/VirtualList';
import SearchBox from '../components/search-box';
import Option from '../components/option';

export default {
  name: 'Illusts',
  components: {
    List,
    Tags,
    SearchBox,
    Option
  },
  data() {
    return {
      value: '',
      pictureList: [],
      identifier: +new Date(),
      page: 1,
      tags: [],
      exclusive: [],
      tag: '',
      show: false
    };
  },
  computed: {
    ...mapGetters(['option'])
  },
  mounted() {
    this.tag = this.$route.query.tag;
    this.getTags(this.tag);
    this.getExclusive(this.tag);
  },
  methods: {
    infinite($state) {
      this.$api.search
        .getSearch({
          ...this.option,
          page: this.page++,
          keyword: this.tag
        })
        .then(res => {
          const data = res.data.data;
          if (!data) {
            $state.complete();
          } else {
            this.pictureList = this.pictureList.concat(data);
            $state.loaded();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getTags(param) {
      this.$api.search
        .getTags(param)
        .then(res => {
          this.tags = res.data.data || [];
        });
    },
    getExclusive(param) {
      this.$api.search
        .getExclusive(param)
        .then(res => {
          this.exclusive = res.data.data || [];
        });
    },
    clickTag(val) {
      this.tag = val.keyword;
      this.getTags(val.keyword);
      this.getExclusive(val.keyword);
      this.page = 1;
      this.pictureList = [];
      this.identifier += 1;
    },
    openOption() {
      this.$refs.option.show();
    },
    setOption() {
      this.page = 1;
      this.pictureList = [];
      this.identifier += 1;
    },
    focus() {
      /*       if (this.$route.query.source) {
        this.$router.replace({
          name: 'Search',
          query: {
            tag: this.tag
          }
        });
      } else {
        this.$router.back();
      } */
      this.$router.push({
        name: 'Search',
        query: {
          tag: this.tag
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.search-illusts
  position fixed
  top 0
  right 0
  left 0
  z-index 101
  font-size 16px
  background #fff
  width 100%
  height 100vh
</style>
