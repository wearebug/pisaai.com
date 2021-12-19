<template>
  <div>
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
    </div>
    <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="changeMenuNavShow" />
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import menu from '../mixins/menu'

export default {
  name: 'Menu',
  components: {},
  computed: {
    ...mapState(['userInfo', 'userNumews', 'userExDate', 'langs', 'curLang', 'showMenuNav']),
    langIndex: {
      get() {
        return this.$store.state.langIndex
      },
      set(v) {
        this.save({ key: 'langIndex', payload: v })
      },
    },
  },

  watch: {
    langIndex(value) {
      console.log(value)
      if (value >= 0) {
        this.save({ key: 'curLang', payload: this.langs[value] })
        this.$vuetify.lang.current = this.langs[value].id
      }
    },
  },
  data() {
    return {}
  },

  created() {
    let langIndex = this.langs.findIndex((v) => v.id === this.$vuetify.lang.current)
    this.save({ key: 'langIndex', payload: langIndex })
  },
  mixins: [menu],
  methods: {
    ...mapMutations(['removeUserInfo', 'removeSetNumew', 'removeSetExDate', 'save', 'changeMenuNavShow']),
  },
}
</script>
<style scoped lang="scss">
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
