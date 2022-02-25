<template>
  <div>
    <v-overlay>
      <v-progress-circular indeterminate size="64" />
      <p class="text">登陆中...</p>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Oauth',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    '$store.state.user.id': {
      handler(n, o) {
        if (n) {
          this.jump();
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (!this.user.id) {
      this.$router.push({
        name: 'Login',
        query: {
          return_to: window.location.href
        }
      });
    }
  },
  methods: {
    async jump() {
      const oauthQuery = window.location.href.split('authorize')[1];
      const { headers: { location }} = await this.$api.user.oauth(oauthQuery);
      window.location.href = location;
    }
  }
};
</script>

<style scoped lang="stylus">
.QQauth {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
