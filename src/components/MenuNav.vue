<template>
  <v-navigation-drawer v-model="showMenuNav" fixed left temporary>
    <v-list dense>
      <v-list-item ripple @click="onPriceClick">
        <v-list-item-title>{{ $vuetify.lang.t('$vuetify.functionTxt[0]') }}</v-list-item-title>
      </v-list-item>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-title>{{ curLang.name }}</v-list-item-title>
        </template>
        <v-list-item v-for="(item, i) in this.langs" :key="item.id" @click="onLangChange(i)">
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item>
      </v-list-group>
      <v-list-group v-if="userInfo">
        <template v-slot:activator>
          <v-list-item-title>{{ $vuetify.lang.t('$vuetify.userTxt') }}</v-list-item-title>
        </template>
        <v-list-item @click="onLogout">
          <v-list-item-title v-text="$vuetify.lang.t('$vuetify.loginOutBtnTxt')"/>
        </v-list-item>
      </v-list-group>
      <v-list-item ripple @click="onLogin" v-else>
        <v-list-item-title>{{ $vuetify.lang.t('$vuetify.loginTxt') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import m_menu from '../mixins/menu'

export default {
  name: 'MenuNav',
  data() {
    return {}
  },
  computed: {
    showMenuNav: {
      get() {
        return this.$store.state.showMenuNav
      },
      set(v) {
        console.log(v, 324)
        this.changeMenuNavShow(v)
      },
    },
  },
  mixins: [m_menu],
  methods: {
    ...mapMutations(['changeMenuNavShow', 'save']),
  },
}
</script>
