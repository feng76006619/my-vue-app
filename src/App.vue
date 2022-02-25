<template>
  <v-app id="app">
    <vue-page-stack>
      <router-view :key="key" />
    </vue-page-stack>
    <div :class="['tabs', {'show': showTab}]">
      <div
        v-for="item in tabs"
        :key="item.value"
        class="tabs-item"
        @click.stop="clickTab(item.value)"
      >
        <img
          :src="active === item.value ? item.activeSrc : item.src"
          :style="{transform: active === item.value ? 'scale(1.1)' : ''}"
          alt
        >
      </div>
      <div class="tabs-item" @click="$router.push('/me')">
        <v-badge
          v-if="unreadcount"
          color="#FA5A57"
          offset-x="-12"
          offset-y="-5"
          :content="unreadcount"
          style="z-index: 999;"
        />
        <img
          :src="avatar ? avatar : require('@/assets/images/me.svg')"
          :style="{transform: $route.name === 'Me' ? 'scale(1.1)' : ''}"
        >
      </div>
    </div>
    <CollectsList />
    <v-dialog
      v-model="dialog"
      persistent
    >
      <v-card>
        <v-card-title class="headline">
          会员试用
        </v-card-title>
        <v-card-text>恭喜🎉您获得会员试用资格，点击开始试用吧（已经是会员状态将免费增加一天）</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            @click="close"
          >
            放弃
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="begin"
          >
            开始
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
// import cookie from 'js-cookie';
import Alert from '@/components/alert';
import CollectsList from '@/components/collects-list';
import Toast from '@/components/toast';

export default {
  components: {
    CollectsList
  },
  data() {
    return {
      active: '/dailyRank',
      tabs: [
        {
          value: '/dailyRank',
          src: require('@/assets/images/pixivic.svg'),
          activeSrc: require('@/assets/images/pixivic-active.svg')
        },
        {
          value: '/recommend',
          src: require('@/assets/images/recommend.svg'),
          activeSrc: require('@/assets/images/recommend-active.svg')
        },
        {
          value: '/find',
          src: require('@/assets/images/find.svg'),
          activeSrc: require('@/assets/images/find-active.svg')
        },
        {
          value: '/new',
          src: require('@/assets/images/new.svg'),
          activeSrc: require('@/assets/images/new-active.svg')
        }
      ],
      dialog: false
    };
  },
  computed: {
    ...mapGetters([
      'cachedViews',
      'showTab',
      'avatar',
      'isVip',
      'serverAddress',
      'user',
      'unreadcount'
    ]),
    key() {
      return this.$route.path;
    }
  },
  watch: {
    $route: {
      handler(val) {
        this.active = val.path;
      },
      immediate: true
    }
  },
  async mounted() {
    if (this.isVip) {
      this.$store.dispatch('vipProxyServer');
    } else if (!this.isVip && localStorage.getItem('serverAddress')) {
      localStorage.removeItem('serverAddress');
    }
    this.$store.dispatch('setCollectDigest');
    if (!localStorage.getItem('alert8')) {
      await Alert({
        content: '请大家关注一下微信公众号和微博，我们会在上面发布最新资讯与更新记录',
        html: `
        <div style="margin-bottom: 5px; color: red;">
           会员图片加速已上线 
           <a style="color: #0582cd;" href="https://m.pixivic.com/handbook">详情戳我</a>
        </div>
        <div style="display: flex; justify-content: center;">
          <img src="${require('@/assets/images/wchat.jpg')}" style="width: 50%; height: 50%; margin-right: 5px;" />
          <img src="${require('@/assets/images/wbo.jpg')}" style="width: 50%; height: 50%;" />
        </div>
      `,
        btn: '不再提示'
      });
      localStorage.setItem('alert8', true);
    }
    if (this.user.id && !localStorage.getItem('participate')) {
      const res = await this.$api.user.canParticipateStatus('try');
      if (res.data.data) {
        this.dialog = true;
      }
    }
    this.$store.dispatch('unreadRemindsCount');
  },
  methods: {
    clickTab(val) {
      this.$router.push(val);
    },
    begin() {
      this.$api.user.participateStatus('try')
        .then(res => {
          Toast({ content: res.data.message });
          if (res.status === 200) {
            this.$store.dispatch('setUser', res.data.data);
            this.$store.dispatch('vipProxyServer');
            this.dialog = false;
          }
        })
        .finally(() => {
          localStorage.setItem('participate', true);
        });
    },
    close() {
      this.dialog = false;
      localStorage.setItem('participate', true);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/color.styl';

.tabs {
  width: 70%;
  max-width: 300px;
  height: 55px;
  background: #ffffff;
  border-radius: 25px;
  position: fixed;
  bottom: 15px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 100;
  display: flex;
  align-items: center;
  transform: translateY(80px);
  opacity: 0;
  transition: all 0.3s ease;

  &-item {
    flex: 1;
    text-align: center;

    img {
      width: 25px;
      height: 25px;
      vertical-align: middle;
      transition: all 0.3s;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}

.show {
  transform: translateY(0);
  opacity: 1;
}
</style>
