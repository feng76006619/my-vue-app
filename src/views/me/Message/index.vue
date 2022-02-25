<template>
  <div class="message">
    <Header title="消息中心" />
    <div class="container">
      <a
        v-for="(item, index) in list"
        :key="item.id"
        v-ripple
        class="items"
        @click="$router.push(`/message/list/${item.id}`)"
      >
        <v-badge
          v-if="types[index] && types[index].unread"
          color="#FA5A57"
          offset-x="-2"
          offset-y="10"
          :content="types[index].unread"
        />
        <svg font-size="30" class="icon" aria-hidden="true">
          <use :xlink:href="item.icon" />
        </svg>
        <span class="text">{{ item.text }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@/components/header/Header';

export default {
  name: 'Message',
  components: {
    Header
  },
  data() {
    return {
      list: [
        { id: 1, text: '评论回复', icon: '#picpinglun2' },
        { id: 2, text: '收到的赞', icon: '#picdianzan1' },
        { id: 3, text: '收藏', icon: '#picshoucang3' },
        { id: 4, text: '关注', icon: '#picGroup' }
      ],
      types: []
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  activated() {
    this.getRemind();
  },
  methods: {
    async getRemind() {
      const res = await this.$api.user.getRemindSummary(this.user.id);
      if (res.status === 200) {
        this.types = res.data.data;
      }
      this.$store.dispatch('unreadRemindsCount');
    }
  }
};
</script>

<style scoped lang="stylus">
.message
  width 100vw
  height 100vh
  background #fff
  .container
    padding 18px 5px 5px
    box-sizing border-box
    display flex
    background #fff
    border-top 1px solid #e5e9ef
    .items
      flex 1
      display flex
      flex-direction column
      align-items center
      justify-content center
      position relative
      .text
        text-align center
        color #6b757b
        display inline-block
        margin-top 5px
        font-size 14px
</style>
