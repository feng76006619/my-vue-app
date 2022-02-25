<template>
  <List
    :list="usersList"
    :height="56"
    @infinite="infinite"
  >
    <v-subheader>{{ type === 'artist' ? '这些用户关注了Ta' : '这些用户收藏了' }}</v-subheader>
    <template v-slot:cell="props">
      <v-list-item @click="handleClick(props.data.userId)">
        <v-list-item-avatar>
          <img :src="props.data.userId | replaceAvatar">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="props.data.username" />
          <v-list-item-subtitle>{{ props.data.createDate | dateFormat }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </List>
</template>

<script>
import { mapGetters } from 'vuex';
import List from '@/components/list/List';

export default {
  name: 'BookMark',
  components: {
    List
  },
  props: {
    illustId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      artistList: [],
      listMap: new Map(),
      page: 1,
      usersList: [],
      type: null
    };
  },
  computed: {
    ...mapGetters(['user', 'followStatus'])
  },
  mounted() {
    this.type = this.$route.query.type;
  },
  methods: {
    infinite($state) {
      if (this.type === 'artist') {
        this.$api.user
          .getFollowers({
            artistId: this.illustId,
            page: this.page++
          })
          .then(res => {
            const { data: { data }} = res;
            if (data) {
              this.usersList = this.usersList.concat(data);
              $state.loaded();
            } else {
              $state.complete();
            }
          });
      } else {
        this.$api.detail
          .bookmarkedUsers({
            illustId: this.illustId,
            page: this.page++
          })
          .then(res => {
            const { data: { data }} = res;
            if (data) {
              this.usersList = this.usersList.concat(data);
              $state.loaded();
            } else {
              $state.complete();
            }
          });
      }
    },
    handleClick(id) {
      if (id !== this.user.id) {
        this.$router.push(`/users/${id}`);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
