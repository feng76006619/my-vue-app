<template>
  <div class="search-artists">
    <Artist :list="artistList" :title="title" @infinite="infinite" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Artist from '@/components/artist/Artist';

export default {
  name: 'ArtistCollect',
  components: {
    Artist
  },
  data() {
    return {
      artistList: [],
      page: 1,
      artistName: null
    };
  },
  computed: {
    ...mapGetters(['user']),
    title() {
      return this.artistList.length ? '为你找到以下画师' : '未找到画师';
    }
  },
  mounted() {
    const { artistName } = this.$route.query;
    this.artistName = artistName;
  },
  methods: {
    infinite($state) {
      this.$api.search
        .searchArtists({
          page: this.page++,
          artistName: this.artistName
        })
        .then(res => {
          const { data: { data }} = res;
          if (!data) {
            $state.complete();
          } else {
            this.artistList = this.artistList.concat(data);
          }
          $state.loaded();
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.search-artists
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
