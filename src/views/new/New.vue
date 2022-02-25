<template>
  <div>
    <List
      :list="pictureList"
      :identifier="identifier"
      @infinite="infinite"
    >
      <v-tabs centered grow>
        <v-tab @click="getList('illust')">
          插画
        </v-tab>
        <v-tab @click="getList('manga')">
          漫画
        </v-tab>
      </v-tabs>
    </List>
  </div>
</template>

<script>
import List from '@/components/virtual-list/VirtualList';
import { mapGetters } from 'vuex';

export default {
  name: 'New',
  components: {
    List
  },
  data() {
    return {
      pictureList: [],
      page: 1,
      type: 'illust',
      identifier: +new Date()
    };
  },
  computed: {
    ...mapGetters(['user', 'showTab'])
  },
  methods: {
    infinite($state) {
      this.$api.user
        .getNewIllust({
          page: this.page++,
          type: this.type,
          userId: this.user.id
        })
        .then(res => {
          const { data: { data }} = res;
          if (!data) {
            $state.complete();
          } else {
            this.pictureList = this.pictureList.concat(data);
            $state.loaded();
          }
        });
    },
    getList(type) {
      this.type = type;
      this.page = 1;
      this.pictureList = [];
      this.identifier += 1;
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>

