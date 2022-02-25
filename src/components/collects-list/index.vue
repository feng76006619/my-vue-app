<template>
  <div v-show="collectStatus" class="collect">
    <div class="overlay" @click.prevent="close" />
    <div class="popup">
      <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-divider />
        <v-card-text style="height: 300px;">
          <v-list>
            <v-list-item @click="addCollects">
              <v-list-item-avatar>
                <svg font-size="30" class="icon" aria-hidden="true">
                  <use xlink:href="#pictianjia1" />
                </svg>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>新建画集</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="item in collectDigest"
              :key="item.id"
              @click="clickItem(item.id)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="90%"
    >
      <v-card>
        <v-card-title>
          <span class="headline">新建画集</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="titles" label="画集标题" required />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="caption" label="画集简介" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="tagList" label="画集标签（多个空格隔开）" />
              </v-col>
              <v-switch v-model="isPublic" class="ma-2" label="公开画集" />
              <v-switch v-model="forbidComment" class="ma-2" label="允许评论" />
              <v-switch v-model="pornWarning" class="ma-2" label="R16内容" />
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
          <v-btn color="blue darken-1" text @click="createCollects">创建</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Toast from '@/components/toast';
import { mapGetters } from 'vuex';
import { SET_COLLECT_STATUS } from '@/store/mutation-types';

export default {
  props: {
    title: {
      type: String,
      default: '我的画集'
    }
  },
  data() {
    return {
      dialog: false,
      isLoading: false,
      titles: null,
      caption: null,
      tagList: null,
      isPublic: 0,
      forbidComment: 0,
      pornWarning: 0,
      model: null,
      search: null,
      items: []
    };
  },
  computed: {
    ...mapGetters(['user', 'collectStatus', 'collectDigest'])
  },
  watch: {
    search(val) {
      this.isLoading = true;
      this.$api.collections
        .getTags({ keyword: this.search })
        .then(res => {
          this.items = res.data.data;
        })
        .finally(() => (this.isLoading = false));
    }
  },
  methods: {
    handleClick() {
      this.$router.back();
      this.$emit('handleClick');
    },
    close() {
      this.$store.commit(SET_COLLECT_STATUS, null);
    },
    addCollects() {
      this.dialog = true;
    },
    clickItem(id) {
      if (!this.collectStatus.id) {
        this.$router.push(`/illustration/${id}`);
      } else {
        this.$api.collections.illustrations({
          collectionId: id,
          data: [this.collectStatus.id]
        })
          .then(res => {
            if (res.status === 200) {
              this.close();
            }
            Toast({ content: res.data.message });
          });
      }
    },
    createCollects() {
      this.titles = this.titles.trim();
      this.tagList = this.tagList.trim();
      if (!this.titles || !this.tagList) {
        return Toast({ content: '标题或标签不能为空' });
      }
      const tagsList = this.tagList.split(/\s+/g).map(item => ({ id: null, tagName: item }));
      const data = {
        username: this.user.username,
        title: this.titles,
        caption: this.caption,
        isPublic: Number(this.isPublic),
        forbidComment: Number(this.forbidComment),
        pornWarning: Number(this.pornWarning),
        tagsList
      };
      this.$store.dispatch('createCollect', data)
        .then(res => {
          this.dialog = false;
          Toast({ content: res.data.message });
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.collect
  align-items center
  display flex
  height 100%
  justify-content center
  left 0
  position fixed
  top 0
  transition .2s cubic-bezier(.25,.8,.25,1),z-index 1ms
  width 100%
  outline none
  z-index 101
  .popup
    background #ffffff
    border-radius 4px
    margin 24px
    overflow-y auto
    pointer-events auto
    transition .3s cubic-bezier(.25,.8,.25,1)
    width 80%
    z-index inherit
    box-shadow 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12)
    /deep/ .v-card__text
      overflow-y auto
      padding-top 0
  .overlay
    opacity 0.46
    background-color rgb(33, 33, 33)
    border-color rgb(33, 33, 33)
    position fixed
    top 0
    left 0
    right 0
    bottom 0
</style>
