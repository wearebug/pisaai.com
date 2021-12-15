<template>
  <div>
    <!-- 导航菜单 -->
    <div class='hidden-sm-and-down'>
      <v-btn text large @click='onPriceClick'>
        <span>{{ $vuetify.lang.t('$vuetify.functionTxt[0]') }}</span>
      </v-btn>
      <v-menu offset-y nudge-top='-10'>
        <template v-slot:activator='{ on, attrs }'>
          <v-btn v-bind='attrs' v-on='on' text large>
            <span>{{ curLang.name }}</span>
            <v-icon size='16'>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list flat>
          <v-list-item-group v-model='langIndex' color='primary'>
            <v-list-item v-for='item in langs' :key='item.id'>
              <v-list-item-title v-text='item.name' />
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <!-- 登录 -->
      <v-menu offset-y nudge-top='-10' nudge-right='20' v-if='userInfo'>
        <template v-slot:activator='{ on, attrs }'>
          <v-btn v-bind='attrs' v-on='on' fab class='head_img_btn'>
            <v-img :src="userInfo.headimgurl || require('../assets/head_img.png')" class='head_img' />
          </v-btn>
        </template>
        <v-list flat>
          <v-list-item-group color='primary'>
            <v-list-item>
              <v-list-item-title v-text="$vuetify.lang.t('$vuetify.vipDateTxt') + (userExDate || 0)" />
            </v-list-item>
            <v-list-item>
              <v-list-item-title v-text="$vuetify.lang.t('$vuetify.vipNumTxt') + (userNumews || 0)" />
            </v-list-item>
            <v-list-item @click='onLogout'>
              <v-list-item-title v-text="$vuetify.lang.t('$vuetify.loginOutBtnTxt')" />
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-btn text large @click='onLogin' v-else>
        <span>{{ $vuetify.lang.t('$vuetify.loginTxt') }}</span>
      </v-btn>
    </div>
    <v-app-bar-nav-icon class='hidden-sm-and-up' @click.stop='drawer = !drawer' />
    <div class='nav_box'>
      <v-navigation-drawer v-model='drawer' fixed left temporary>
        <v-list dense>
          <v-list-item ripple @click='onPriceClick'>
            <v-list-item-title>{{ $vuetify.lang.t('$vuetify.functionTxt[0]') }}</v-list-item-title>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-title>{{ curLang.name }}</v-list-item-title>
            </template>
            <v-list-item v-for='(item, i) in this.langs' :key='item.id' @click='onLangChange(i)'>
              <v-list-item-title v-text='item.name'></v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-group v-if='userInfo'>
            <template v-slot:activator>
              <v-list-item-title>{{ $vuetify.lang.t('$vuetify.userTxt') }}</v-list-item-title>
            </template>
            <v-list-item @click='onLogout'>
              <v-list-item-title v-text="$vuetify.lang.t('$vuetify.loginOutBtnTxt')"></v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item ripple @click='onLogin' v-else>
            <v-list-item-title>{{ $vuetify.lang.t('$vuetify.loginTxt') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Menu',
  components: {},
  computed: {
    ...mapState(['userInfo', 'userNumews', 'userExDate', 'langs','curLang']),
    langIndex: {
      get() {
        return this.$store.state.langIndex
      },
      set(v) {
        this.save({ key: 'langIndex', payload: v })
      }
    }
  },

  watch: {
    langIndex(value) {
      console.log(value)
      if (value >= 0) {
        this.save({ key: 'curLang', payload: this.langs[value] })
        this.$vuetify.lang.current =  this.langs[value].id
      }
    }
  },
  data() {
    return {
      drawer: false,
    }
  },

  created() {
    let langIndex = this.langs.findIndex((v) => v.id === this.$vuetify.lang.current)
    this.save({ key: 'langIndex', payload: langIndex })
  },

  methods: {
    ...mapMutations(['removeUserInfo', 'removeSetNumew', 'removeSetExDate', 'save']),
    /**
     * 点击登录/用户中心 TAB
     */
    onLogin() {
      _hmt.push(['_trackEvent', 'pisaai', 'www-nav', 'ClickUserCenter']) //百度埋点统计
      this.save({ key: 'showLogin', payload: true })
    },
    onLogout() {
      this.$store.dispatch('onLogout')
    },
    /**
     * 切换语言
     */
    onLangChange(e) {
      if (e !== this.langIndex) {
        this.save({ key: 'langIndex', payload: e })
      }
    },
    /**
     * 点击价格TAB
     */
    onPriceClick() {
      _hmt.push(['_trackEvent', 'pisaai', 'www-nav', 'ClickPriceTAB']) //百度埋点统计
      //this.showDialog = true
      this.save({ key: 'showPriceModal', payload: true })
    }
  }
}
</script>
<style scoped lang='scss'>
.head_img_btn {
  width: 40px !important;
  height: 40px !important;
  border-radius: 40px;

  .head_img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }


}

.nav_box1 {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
</style>
