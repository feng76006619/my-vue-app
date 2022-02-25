<template>
  <div class="edit">
    <Header :title="isCreate ? '新建画集' : '画集编辑'" />
    <form class="form">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="form.title" label="请输入画集标题" required />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="form.caption" label="请输入画集简介" />
        </v-col>
        <v-switch v-model="form.isPublic" class="ma-2" label="公开画集" />
        <v-switch v-model="form.forbidComment" class="ma-2" label="允许评论" />
        <v-switch v-model="form.pornWarning" class="ma-2" label="R16内容" />
        <v-col cols="12" sm="6" md="4">
          <v-divider />
          标签
          <div>
            <v-chip
              v-for="item in form.tagList"
              :key="item.id"
              close
              class="ma-2"
              @click:close="remove(item.tagName)"
            >
              {{ item.tagName }}
            </v-chip>
          </div>
          <search-box v-model="value" :left="false" :right="false" />
          <div class="search-suggest">
            <div
              v-for="item in tags"
              :key="item.id"
              class="suggest-item"
            >
              <div class="tag" @click="enter(item)">
                {{ item.tagName }}
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
          <v-btn class="mr-5" color="primary" @click="updateCollect">{{ isCreate ? '新建画集' : '更新画集' }}</v-btn>
          <v-btn v-if="!isCreate" color="error" @click="removeCollect">删除画集</v-btn>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import Header from '@/components/header/Header';
import SearchBox from '@/views/search/components/search-box';
import Toast from '@/components/toast';
import Confirm from '@/components/confirm';
import { mapGetters } from 'vuex';

export default {
  name: 'Illustrations',
  components: {
    Header,
    SearchBox
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        title: null,
        caption: null,
        tagList: null,
        isPublic: null,
        forbidComment: null,
        pornWarning: null
      },
      value: null,
      tags: null
    };
  },
  computed: {
    ...mapGetters(['user']),
    isCreate() {
      return this.id === '-1';
    }
  },
  watch: {
    value() {
      this.getKeyword();
    }
  },
  mounted() {
    this.getCollects();
  },
  methods: {
    getCollects() {
      if (this.id === '-1') return;
      this.$api.collections
        .getCollects(this.id)
        .then(res => {
          if (res.status === 200) {
            this.form = res.data.data;
          }
        });
    },
    getKeyword: debounce(function() {
      this.$api.collections
        .getTags(({ keyword: this.value }))
        .then(res => {
          this.tags = res.data.data || [];
          this.tags.unshift({ id: null, tagName: this.value });
        });
    }, 500),
    enter(item) {
      if (!this.form.tagList) this.form.tagList = [];
      const index = this.form.tagList.findIndex(val => val.tagName === item.tagName);
      if (index === -1) {
        this.form.tagList.push(item);
      } else {
        Toast({ content: '重复添加' });
      }
    },
    remove(name) {
      const index = this.form.tagList.findIndex(item => item.tagName === name);
      this.form.tagList.splice(index, 1);
    },
    updateCollect() {
      if (!this.form.title) {
        return Toast({ content: '标题不能为空' });
      }

      const data = {
        title: this.form.title,
        caption: this.form.caption,
        tagList: this.form.tagList,
        isPublic: Number(this.form.isPublic),
        forbidComment: Number(this.form.forbidComment),
        pornWarning: Number(this.form.pornWarning)
      };
      if (this.isCreate) {
        this.$store.dispatch('createCollect', { ...data, username: this.user.username })
          .then(res => {
            this.$router.push(`/collects`);
            Toast({ content: res.data.message });
          });
      } else {
        this.$store.dispatch('updateCollect', { ...data, id: this.id })
          .then(res => {
            this.$router.push(`/collects`);
            Toast({ content: res.data.message });
          });
      }
    },
    async removeCollect() {
      const res = await Confirm({
        title: '确认删除该画集吗?'
      });
      if (res === 'submit') {
        this.$store.dispatch('delCollects', this.id)
          .then(res => {
            this.$router.push(`/collects`);
            Toast({ content: res.data.message });
          });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.edit
  .form
    padding 10px
    margin-bottom 70px
    .search-suggest
      width 100%
      overflow scroll
      margin-bottom 10px
      .suggest-item
        width 100%
        padding 9px 12px 9px 16px
        display flex
        align-items center
        justify-content space-between
        box-sizing border-box
        .tag
          width 100%
          color #adadad
          font-size 16px
</style>
