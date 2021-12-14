<template>
  <!-- 导航菜单 -->
  <div class="hidden-sm-and-down">
    <v-btn text large @click="onPriceClick">
      <span>{{ $vuetify.lang.t('$vuetify.functionTxt[0]') }}</span>
    </v-btn>
    <v-menu offset-y nudge-top="-10">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" text large>
          <span>{{ curLang.name }}</span>
          <v-icon size="16">mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list flat>
        <v-list-item-group v-model="langIndex" color="primary">
          <v-list-item v-for="item in langs" :key="item.id">
            <v-list-item-title v-text="item.name" />
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <!-- 登录 -->
    <v-menu offset-y nudge-top="-10" nudge-right="20" v-if="userInfo">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" fab class="head_img_btn">
          <v-img :src="userInfo.headimgurl || require('../assets/head_img.png')" class="head_img" />
        </v-btn>
      </template>
      <v-list flat>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-title v-text="$vuetify.lang.t('$vuetify.vipDateTxt') + (userExDate || 0)" />
          </v-list-item>
          <v-list-item>
            <v-list-item-title v-text="$vuetify.lang.t('$vuetify.vipNumTxt') + (userNumews || 0)" />
          </v-list-item>
          <v-list-item @click="onLogout">
            <v-list-item-title v-text="$vuetify.lang.t('$vuetify.loginOutBtnTxt')" />
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <v-btn text large @click="onLogin" v-else>
      <span>{{ $vuetify.lang.t('$vuetify.loginTxt') }}</span>
    </v-btn>

    <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer" />
    <v-navigation-drawer v-model="drawer" fixed left temporary>
      <v-list dense>
        <v-list-item ripple @click="onPriceClick">
          <v-list-item-title>{{ $vuetify.lang.t('$vuetify.functionTxt[0]') }}</v-list-item-title>
        </v-list-item>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>{{ curLang.name }}</v-list-item-title>
          </template>
          <v-list-item v-for="(item, i) in langs" :key="item.id" @click="onLangChange(i)">
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group v-if="userInfo">
          <template v-slot:activator>
            <v-list-item-title>{{ $vuetify.lang.t('$vuetify.userTxt') }}</v-list-item-title>
          </template>
          <v-list-item @click="onLogout">
            <v-list-item-title v-text="$vuetify.lang.t('$vuetify.loginOutBtnTxt')"></v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item ripple @click="onLogin" v-else>
          <v-list-item-title>{{ $vuetify.lang.t('$vuetify.loginTxt') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Home from '@/views/Home'

export default {
  name: 'Menu',
  computed: {
    ...mapState(['userInfo', 'userNumews', 'userExDate']),
  },
  data() {
    return {
      curLang: { id: 'zhHans', name: '简体中文' },
      langIndex: 0,
      langs: [
        { id: 'zhHans', name: '简体中文' },
        { id: 'en', name: 'English' },
        { id: 'ja', name: '日本语' },
        { id: 'es', name: 'Español' },
        { id: 'fr', name: 'Français' },
      ],
      drawer: false,
    }
  },

  created() {
    let langIndex = this.langs.findIndex((v) => v.id === this.$vuetify.lang.current)
    this.langIndex = langIndex
  },
  methods: {
    /**
     * 点击登录/用户中心 TAB
     */
    onLogin() {
      _hmt.push(['_trackEvent', 'pisaai', 'www-nav', 'ClickUserCenter']) //百度埋点统计
      this.showLogin = true
    },
    onLogout() {
      this.removeUserInfo()
      this.removeSetNumew()
      this.removeSetExDate()
    },
    /**
     * 切换语言
     */
    onLangChange(e) {
      if (e !== this.langIndex) {
        this.langIndex = e
      }
    },
    /**
     * 点击价格TAB
     */
    onPriceClick() {
      _hmt.push(['_trackEvent', 'pisaai', 'www-nav', 'ClickPriceTAB']) //百度埋点统计
      this.showDialog = true
    },
  },
}
</script>
