<template>
  <div class="reset-password">
    <v-form v-model="valid">
      <v-container>
        <v-row class="row">
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="passwordRules"
              name="input-10-1"
              label="新密码"
              @click:append="show = !show"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="confirmPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              :rules="confirmPasswordRules"
              name="input-10-1"
              label="确认新密码"
              @click:append="show2 = !show2"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              color="primary"
              width="100%"
              :disabled="!valid"
              @click="resetPassword"
            >
              完成重置
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Alert from '@/components/alert';

export default {
  data() {
    return {
      valid: false,
      show: false,
      show2: false,
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || '请填写新密码',
        v => (v.length >= 8 && v.length <= 20) || '密码在8-20位'
      ],
      confirmPasswordRules: [
        v => v === this.password || '输入密码不一致'
      ]
    };
  },
  methods: {
    resetPassword() {
      let data = this.$route.query;
      delete data.VNK;
      data = { ...data, password: this.password };
      this.$api.user.resetPassword(data)
        .then(res => {
          if (res.status === 200) {
            Alert({
              content: '重置成功，点击返回登录页面'
            });
            window.location.href = `${process.env.VUE_APP_HOME_URL}/login`;
          } else {
            Alert({
              content: res.data.message
            });
          }
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.reset-password
  width 100vw
  height 100vh
  position relative
  z-index 102
  background-color #fff
  padding 50px
  box-sizing border-box
</style>
