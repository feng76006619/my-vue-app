<template>
  <div class="list">
    <div v-for="item in list" :key="item.id" v-ripple class="list-item">
      <a class="profile-img">
        <v-avatar size="40" @click="goUsers(item.replyFrom)">
          <img :src="item.replyFrom | replaceAvatar">
        </v-avatar>
      </a>
      <a>
        <div class="user-name">{{ item.replyFromName }}</div>
      </a>
      <div class="comment-text f-caption-s">
        <img v-if="isimg(item.content)" :src="require(`@/assets/${isimg(item.content)}`)">
        <span v-else class="comment-text">{{ item.content }}</span>
      </div>
      <div class="status-bar">
        <div class="time">{{ item.createDate | formatDate }}</div>
        <div class="time">
          <span style="font-size: 12px; margin-left: 10px;">{{ item.platform }}</span>
        </div>
        <div class="like" style="margin-left: 10px;">
          <svg font-size="12" class="icon" aria-hidden="true" @click="handleLike(item)">
            <use :xlink:href="item.isLike ? '#pictuijian-copy-copy' : '#pictuijian-copy'" />
          </svg>
          <span v-if="item.likedCount > 0" style="margin-left: 4px; vertical-align: middle; color: #999;">{{ item.likedCount }}</span>
        </div>
        <div class="reply">
          <span @click="reply(item.id, item)">回复</span>
        </div>
      </div>
      <div class="comment-replies">
        <div v-for="val in item.subCommentList" :key="val.id" v-ripple class="list-item">
          <a class="profile-img">
            <v-avatar size="40" @click="goUsers(val.replyFrom)">
              <img :src="val.replyFrom | replaceAvatar">
            </v-avatar>
          </a>
          <a>
            <div class="user-name">{{ val.replyFromName }}</div>
          </a>
          <div class="comment-text f-caption-s">
            <span class="comment-text">@{{ val.replyToName }}:
              <img v-if="isimg(val.content)" :src="require(`@/assets/${isimg(val.content)}`)">
              <span v-else class="comment-text">{{ val.content }}</span>
            </span>
          </div>
          <div class="status-bar">
            <div class="time">{{ val.createDate | formatDate }}</div>
            <div class="like" style="margin-left: 10px;">
              <svg font-size="12" class="icon" aria-hidden="true" @click="handleLike(val)">
                <use :xlink:href="val.isLike ? '#pictuijian-copy-copy' : '#pictuijian-copy'" />
              </svg>
              <span v-if="val.likedCount" style="margin-left: 4px; vertical-align: middle; color: #999;">{{ val.likedCount }}</span>
            </div>
            <div class="reply">
              <span @click="reply(item.id, val)">回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import data from '@/static/resources/sticker.json';

export default {
  filters: {
    formatDate(time) {
      const date = new Date(time);
      const M = date.getMonth() + 1;
      const D = date.getDate();
      return `${M < 10 ? '0' + M : M}-${D < 10 ? '0' + D : D}`;
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      emoji: data
    };
  },
  computed: {
    ...mapGetters(['isVip'])
  },
  methods: {
    reply(id, val) {
      this.$emit('reply', { id, val });
    },
    goUsers(id) {
      this.$router.push(`/users/${id}`);
    },
    handleLike(item) {
      const data = {
        commentAppType: item.appType,
        commentAppId: item.appId,
        commentId: item.id
      };
      if (!item.isLike) {
        this.$api.comment.likedComments(data)
          .then(res => {
            if (res.status === 200) {
              item.likedCount++;
              item.isLike = true;
            }
          });
      } else {
        this.$api.comment.canclelikedComments(data)
          .then(res => {
            if (res.status === 200) {
              item.likedCount--;
              item.isLike = false;
            }
          });
      }
    },
    isimg(item) {
      const reg = /\[(.+?)\]/g;
      if (!reg.test(item)) return false;
      const data = item.replace(/\[|\]/g, '').split('_');
      if (!this.emoji[data[0]]) return false;
      return this.emoji[data[0]][data[1]];
    }
  }
};
</script>

<style lang="stylus" scoped>
.list
  .list-item
    position relative
    padding-left 48px
    margin 16px 0
    display block
    min-width 60%
    min-height 50px
    box-sizing border-box
    .profile-img
      position absolute
      top 0
      left 0
      width 40px
      height 40px
    a
      .user-name
        color #2c333c
        font-size 12px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        max-width 100%
        line-height 16px
        font-weight 700
        display inline-block
        vertical-align middle
    .comment-text
      padding 0 0 4px
      word-wrap break-word
      img
        width 80px
        height 80px
        object-fit cover
        margin 4px
        vertical-align middle
        border-radius 5px
    .f-caption-s
      line-height 16px
      font-size 12px
      font-weight 400
    .status-bar
      display flex
      font-weight 400
      font-size 10px
      text-align left
      line-height 14px
      margin-top 10px
      .time
        color #adadad
      .reply
        margin-left 16px
        span
          color #3d7699
          user-select none
    .comment-replies
      font-size 12px
</style>
