<template>
  <div class="qqauth">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" />
      <p class="text">请稍后...</p>
    </v-overlay>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import { mapGetters } from 'vuex';
import Alert from '@/components/alert';

export default {
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    const qqAccessToken = this.$route.hash.split('=')[1].split('&')[0];
    const isLogin = Cookie.get('jwt');
    if (isLogin) {
      // 绑定qq
      this.$api.user.qqAccess({
        userId: this.user.id,
        qqAccessToken
      })
        .then(res => {
          if (res.status === 200) {
            this.$router.push('/setting');
          }
        });
    } else {
      // qq登录
      this.$api.user.qqLogin({ qqAccessToken })
        .then(res => {
          if (res.status === 200) {
            this.$store.dispatch('setUser', res.data.data);
            this.$router.push('/me');
          } else {
            Alert({
              content: res.data.message
            });
            this.$router.push('/login');
          }
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.qqauth
  position relative
  width 100vw
  height 100vh
  z-index 101
  background-color #fff
  .text
    text-align center
    margin-top 10px
</style>
