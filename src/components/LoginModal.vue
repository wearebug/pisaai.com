<template>
  <v-dialog v-model="showLogin" transition="dialog-bottom-transition" max-width="720">
    <v-card>
      <v-tabs active-class="primary" background-color="black" align-with-title dark hide-slider>
        <v-tab>微信扫码登录</v-tab>
        <v-tab>邮箱密码登录</v-tab>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-subheader class="text-subtitle-1 font-weight-bold">{{ $vuetify.lang.t('$vuetify.loginTitle') }}</v-subheader>
                <ul class="text-button font-weight-light">
                  <li>{{ $vuetify.lang.t('$vuetify.loginList[0]') }}</li>
                  <li>{{ $vuetify.lang.t('$vuetify.loginList[1]') }}</li>
                  <li>{{ $vuetify.lang.t('$vuetify.loginList[2]') }}</li>
                  <li>{{ $vuetify.lang.t('$vuetify.loginList[3]') }}</li>
                </ul>
              </v-col>
              <v-col class="d-flex justify-center" cols="12" md="6">
                <wxlogin
                  appid="wx398b230d26c5b01d"
                  scope="snsapi_login"
                  theme="'black'"
                  :redirect_uri="encodeURIComponent('http://pisaai.com')"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-subheader class="text-subtitle-1 font-weight-bold">{{ $vuetify.lang.t('$vuetify.loginTitle') }}</v-subheader>
                <ul class="text-button font-weight-light">
                  <li>{{ $vuetify.lang.t('$vuetify.loginList[0]') }}</li>
                  <li>{{ $vuetify.lang.t('$vuetify.loginList[1]') }}</li>
                  <li>{{ $vuetify.lang.t('$vuetify.loginList[2]') }}</li>
                  <li>{{ $vuetify.lang.t('$vuetify.loginList[3]') }}</li>
                </ul>
              </v-col>
              <v-col cols="12" md="6">
                <form>
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="邮箱"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="pwd"
                    type="password"
                    :error-messages="pwdErrors"
                    label="密码"
                    required
                    @input="$v.pwd.$touch()"
                    @blur="$v.pwd.$touch()"
                  ></v-text-field>
                  <v-checkbox v-model="isRegister" label="创建新的账户"></v-checkbox>

                  <v-btn class="my-4" block color="primary" @click="onSubmit">登录</v-btn>
                </form>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>
<script>
import { login } from '../api/home'
import { mapMutations } from 'vuex'
import { validationMixin } from 'vuelidate'
import { email, minLength, required } from 'vuelidate/lib/validators'
import wxlogin from 'vue-wxlogin'

export default {
  name: 'LoginModal',
  components: { wxlogin },
  data() {
    return {
      email: '',
      pwd: '',
      isRegister: false,
      isWechatLogin: false, // 是否微信扫码登录
    }
  },
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    pwd: { required, minLength: minLength(6) },
  },
  computed: {
    showLogin: {
      get() {
        return this.$store.state.showLogin
      },
      set(value) {
        console.log(value)
        this.save({ key: 'showLogin', payload: value })
      },
    },
    pwdErrors() {
      const errors = []
      if (!this.$v.pwd.$dirty) return errors
      !this.$v.pwd.required && errors.push('请输入密码')
      !this.$v.pwd.minLength && errors.push('请输入至少6位数密码')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('邮箱格式有误')
      !this.$v.email.required && errors.push('请输入邮箱')
      return errors
    },
  },
  methods: {
    ...mapMutations(['setUserInfo', 'save']),

    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const data = {
          channel: this.channel,
          email: this.email,
          pws: this.pwd,
          ty: this.isRegister ? 2 : 1,
        }
        login(data)
          .then((res) => {
            this.setUserInfo(res.data)
            this.isWechatLogin = false
            this.$toast.success('登录成功')
            this.save({ key: 'showLogin', payload: false })
          })
          .catch((e) => {
            this.$toast.error(e.message)
          })
      }
    },
  },
}
</script>
