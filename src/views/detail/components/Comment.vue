<template>
  <transition enter-active-class="animated slideInUp">
    <div v-if="show" class="comments">
      <div class="comments-popup">
        <div class="popup-title-container">
          <div class="popup-title">
            评论
            <div class="popup-close" @click="close">
              <svg font-size="24" class="icon" aria-hidden="true">
                <use xlink:href="#picguanbi7" />
              </svg>
            </div>
          </div>
        </div>
        <div class="popup-content">
          <vue-better-scroll
            ref="scroll"
            class="wrapper"
            :pull-up-load="pullUpLoadObj"
            @pulling-up="getCommentsList"
          >
            <div class="popup-content-inside">
              <div v-if="cid" class="d-flex justify-center" @click="$router.push(`/illusts/${id}`)">
                <v-btn
                  class="text-align"
                  outlined
                  color="#FA5A57"
                  width="90%"
                >
                  进入详情页
                </v-btn>
              </div>
              <List :list="commentList" @reply="reply" />
            </div>
          </vue-better-scroll>
        </div>
        <div class="popup-input">
          <div class="input-emoji" @click="openEmoji">
            <svg font-size="30" class="icon" aria-hidden="true">
              <use xlink:href="#picbiaoqing" />
            </svg>
          </div>
          <div class="input-container">
            <form>
              <textarea
                ref="input"
                v-model="value"
                maxlength="140"
                :placeholder="placeholder"
                @input="handleInput"
              />
            </form>
            <div class="input-send" @click="submitComment">
              <svg font-size="30" class="icon" aria-hidden="true">
                <use xlink:href="#picfasong" />
              </svg>
            </div>
          </div>
        </div>
        <Emoji :visible.sync="showemoji" @clickEmoji="clickEmoji" />
      </div>
    </div>
  </transition>
</template>

<script>
import VueBetterScroll from 'vue2-better-scroll';
import Emoji from '@/components/emoji';
import { mapGetters } from 'vuex';
import Toast from '@/components/toast';
import List from './List';
const INPUT_HEIGHT = 40;

export default {
  components: {
    VueBetterScroll,
    List,
    Emoji
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pid: {
      type: String,
      required: false
    },
    cid: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      value: '',
      commentList: [],
      placeholder: '添加评论...',
      replyParam: {},
      issend: false,
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: '加载更多',
          noMore: '到底了～'
        }
      },
      page: 1,
      pageSize: 10,
      showemoji: false,
      id: null
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    show(val) {
      if (val) {
        this.pid ? this.getCommentsList() : this.getComment();
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false);
    },
    submitComment() {
      if (this.cid && !this.id) return;
      if (!this.value) {
        return Toast({ content: '请输入评论内容~' });
      }
      if (this.issend) {
        return Toast({ content: '评论正在发送中~' });
      }
      this.issend = true;
      const MobileDetect = require('mobile-detect');
      const md = new MobileDetect(window.navigator.userAgent);
      let data = {
        commentAppType: 'illusts',
        commentAppId: this.pid ? this.pid : this.id,
        parentId: 0, // 父级评论id,顶级就是0
        replyTo: 0, // 回复者，没有就是0
        replyFromName: this.user.username, // 评论者用户名
        replyToName: '', // 回复者用户名
        content: this.value, // 内容
        platform: `${md.os()} ${md.userAgent()}`
      };
      data = Object.assign(data, this.replyParam);
      this.$api.comment.makeComments(data)
        .then(res => {
          if (res.status === 200) {
            const params = { ...data, createDate: new Date(), replyFrom: this.user.id, id: res.data.data };
            if (params.parentId === 0) {
              this.commentList.unshift(params);
            } else {
              const item = this.commentList.find(item => item.id === params.parentId);
              if (item.subCommentList) {
                item.subCommentList.push(params);
              } else {
                this.$set(item, 'subCommentList', [params]);
              }
            }
            this.value = '';
            // this.placeholder = '';
            // this.replyParam = {};
            if (!this.cid) {
              this.placeholder = '请输入评论内容~';
              this.replyParam = {};
            }
            this.$emit('reply', this.commentList);
          }
        })
        .finally(() => {
          this.issend = false;
        });
    },
    handleInput() {
      const input = this.$refs.input;
      input.style.height = input.scrollTop + INPUT_HEIGHT + 'px';
    },
    reply({ id, val }) {
      this.replyParam = {
        parentId: id,
        replyTo: val.replyFrom,
        replyToName: val.replyFromName,
        replyToCommentId: val.id
      };
      this.placeholder = '回复: ' + val.replyFromName;
      this.$refs.input.focus();
    },
    getCommentsList() {
      if (this.cid) return;
      this.$api.comment.getComments({
        commentAppType: 'illusts',
        commentAppId: this.pid,
        page: this.page++,
        pageSize: this.pageSize
      })
        .then(res => {
          if (res.status === 200) {
            const list = res.data.data || [];
            this.commentList = this.commentList.concat(list);
            if (list.length < 10) {
              this.$refs.scroll.forceUpdate(false);
            } else {
              this.$refs.scroll.forceUpdate(true);
            }
          }
        });
    },
    openEmoji() {
      this.showemoji = true;
    },
    clickEmoji(item) {
      this.value = item;
      this.submitComment();
      this.showemoji = false;
    },
    getComment() {
      this.commentList = [];
      this.$api.comment.getSingleComment(this.cid)
        .then(res => {
          if (res.status === 200) {
            const item = res.data.data;
            this.commentList = [item] || [];
            this.replyParam = {
              parentId: item.id,
              replyTo: item.replyFrom,
              replyToName: item.replyFromName,
              replyToCommentId: item.id
            };
            this.placeholder = '回复: ' + item.replyFromName;
            this.$refs.input.focus();
            this.id = item.appId;
            this.$refs.scroll.forceUpdate(false);
          }
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.comments
  position fixed
  top 0
  right 0
  left 0
  width 100%
  height 100%
  overflow hidden
  background-color #fff
  z-index 1000
  &-popup
    position absolute
    top 0
    bottom 0
    left 0
    width 100%
    background-color #fff
    .popup-title-container
      height 48px
      color rgb(31, 31, 31)
      .popup-title
        line-height 24px
        text-align center
        font-size 16px
        font-weight 700
        position relative
        z-index 1
        padding 12px 0
        color rgb(31, 31, 31)
        .popup-close
          position fixed
          width 46px
          top 0
          right 0
          padding 12px 0
    .popup-content
      position fixed
      top 48px
      right 0
      bottom 0
      left 0
      padding 16px 16px 80px
      box-sizing border-box
      &-inside
        width 100%
    .popup-input
      width 100%
      height 80px
      position fixed
      bottom 0
      left 0
      padding 0 16px
      box-sizing border-box
      display flex
      align-items center
      background #fff
      z-index 102
      .input-emoji
        flex-basis 30px
        margin-right 5px
      .input-container
        flex 1
        display flex
        align-items center
        width 100%
        box-sizing border-box
        form
          flex 1
          textarea
            width 100%
            background none
            outline none
            border none
            box-sizing border-box
            max-height 80px
            line-height 24px
            min-height 40px
            height 40px
            padding 8px
            text-align left
            font-weight 400
            color #666
        .input-send
          flex-basis 30px
</style>
