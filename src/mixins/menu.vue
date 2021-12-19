<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      //showMenuNav: false,
    }
  },
  computed: {
    ...mapState(['langs', 'curLang', 'userInfo']),
    langIndex: {
      get() {
        return this.$store.state.langIndex
      },
      set(v) {
        this.save({ key: 'langIndex', payload: v })
      },
    },
  },

  methods: {
    ...mapMutations['save'],

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
    },
  },
}
</script>
