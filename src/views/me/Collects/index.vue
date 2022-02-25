<template>
  <List
    :list="list"
    :height="270"
    :identifier="identifier"
    @infinite="infinite"
  >
    <v-tabs centered grow>
      <v-tab @click="getList(1)">
        公开
      </v-tab>
      <v-tab @click="getList(0)">
        私人
      </v-tab>
    </v-tabs>
    <template v-slot:cell="props">
      <v-list-item class="item" @click="clickItem(props.data.id)">
        <div class="item-card">
          <div v-if="!props.data.cover" class="card-img">
            <img
              :src="require('@/assets/images/default.jpg')"
              width="100%"
            >
          </div>
          <div v-else-if="props.data.cover.length < 3" class="card-img">
            <img
              :src="props.data.cover[0].medium | replaceSquare"
              width="100%"
            >
          </div>
          <div v-else class="card-img multiply">
            <div class="left">
              <img
                :src="props.data.cover[0].medium | replaceSquare"
                width="100%"
              >
            </div>
            <div class="right">
              <img
                :src="props.data.cover[1].medium | replaceSquare"
                width="100%"
              >
              <img
                :src="props.data.cover[2].medium | replaceSquare"
                width="100%"
              >
            </div>
          </div>
          <div class="card-bottom">
            <span>{{ props.data.title }}</span>
            <v-chip color="primary" class="text-no-wrap text-truncate" @click.stop="edit(props.data)">编辑</v-chip>
          </div>
        </div>
      </v-list-item>
    </template>
    <svg
      font-size="40"
      class="icon"
      aria-hidden="true"
      style="position: fixed; z-index: 9999; bottom: 80px; right: 0; left: 0; margin: auto;"
      @click="openCollect"
    >
      <use xlink:href="#pictianjia2" />
    </svg>
  </List>
</template>

<script>
import { mapGetters } from 'vuex';
import List from '@/components/list/List';

export default {
  name: 'Collects',
  components: {
    List
  },
  data() {
    return {
      page: 1,
      isPublic: 1,
      identifier: +new Date(),
      list: []
    };
  },
  computed: {
    ...mapGetters(['user', 'avatar'])
  },
  methods: {
    infinite($state) {
      this.$api.collections
        .getCollections({
          page: this.page++,
          userId: this.user.id,
          isPublic: this.isPublic
        })
        .then(res => {
          const { data: { data }} = res;
          if (!data) {
            $state.complete();
          } else {
            this.list = this.list.concat(data);
            $state.loaded();
          }
        });
    },
    getList(isPublic) {
      this.page = 1;
      this.list = [];
      this.isPublic = isPublic;
      this.identifier += 1;
    },
    edit(item) {
      this.$router.push(`/edit/${item.id}`);
    },
    openCollect() {
      this.$router.push(`/edit/-1`);
    },
    clickItem(id) {
      this.$router.push(`/illustration/${id}`);
    }
  }
};
</script>

<style scoped lang="stylus">
.item
  width 100%
  height 100%
  padding 10px
  .item-card
    width 100%
    .card-img
      height calc(50vw - 20px)
      padding 5px
      img
        width 100%
        height 100%
        object-fit cover
    .multiply
      width 100%
      display flex
      .left, .right
        flex 1
        img
          object-fit cover
      .right
        flex 1
        display flex
        flex-direction column
        img
          height 50%
    .card-bottom
      display flex
      justify-content space-between
      align-items center
      padding 5px
</style>
