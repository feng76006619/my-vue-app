<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <List
      :list="pictureList"
      :show-delete="showDelete"
      @infinite="infinite"
      @handleDelete="handleDelete"
    >
      <Header title="画集作品">
        <v-btn
          color="primary"
          class="ma-2"
          small
          rounded
          @click="edit"
        >
          {{ text }}
        </v-btn>
      </Header>
      <div v-if="message" class="content">
        <div class="content-top">
          <v-avatar size="36px">
            <img :src="avatar" alt="avatar">
          </v-avatar>
          <span class="text-no-wrap text-truncate font-weight-medium">{{ message.title }}</span>
        </div>
        <p class="content-mid">{{ message.caption }}</p>
        <div class="content-tag">
          <v-chip
            v-for="item in message.tagList || []"
            :key="item.tagName"
            class="ma-1"
            small
            color="#1867c0"
            outlined
          >
            {{ item.tagName }}
          </v-chip>
        </div>
        <!-- <div class="content-select">
          操作
        </div> -->
      </div>
    </List>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import List from '@/components/virtual-list/VirtualList';
import Header from '@/components/header/Header';

export default {
  name: 'Illustrations',
  components: {
    List,
    Header
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    const options = {
      'edit': '编辑',
      'complete': '完成'
    };
    return {
      pictureList: [],
      page: 1,
      message: null,
      showDelete: false,
      options,
      text: options.edit,
      group: [],
      overlay: false
    };
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  mounted() {
    this.getCollects();
  },
  methods: {
    infinite($state) {
      this.$api.collections
        .getIllustrations({
          collectoinId: this.id,
          page: this.page++
        })
        .then(res => {
          if (!res.data.data) {
            $state.complete();
          } else {
            this.pictureList = this.pictureList.concat(res.data.data);
            $state.loaded();
          }
        });
    },
    getCollects() {
      this.$api.collections
        .getCollects(this.id)
        .then(res => {
          if (res.status === 200) {
            this.message = res.data.data;
          }
        });
    },
    edit() {
      const { edit, complete } = this.options;
      if (this.text === complete) {
        this.overlay = true;
        this.$api.collections.delIllustration({
          collectionId: this.id,
          data: this.group
        })
          .then(res => {
            if (res.status === 200) {
              this.text = edit;
              this.showDelete = false;
            }
          })
          .finally(() => {
            this.overlay = false;
          });
      } else {
        this.showDelete = true;
        this.group = [];
        this.text = complete;
      }
    },
    handleDelete(item) {
      const index = this.pictureList.findIndex(val => val.id === item.id);
      this.pictureList.splice(index, 1);
      this.group.push(item.id);
    }
  }
};
</script>

<style scoped lang="stylus">
.content
  padding 5px
  &-top
    display flex
    align-items center
    padding 5px
    span
      margin-left 10px
      font-size 18px
  &-mid
    font-size 14px
    margin-bottom 2px
</style>

