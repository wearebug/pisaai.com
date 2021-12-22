<template>
  <v-dialog v-model="showQrcode" max-width="320">
    <v-card>
      <vue-qr :correctLevel="3" :text="qrcodeUrl" :size="320" />
      <div class="qrcode-tip">{{ $vuetify.lang.t('$vuetify.priceType[0]') }}</div>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import VueQr from 'vue-qr'

export default {
  name: 'QrcodeModal',
  props: ['qrcodeUrl'],
  components: { VueQr },
  data() {
    return {
      //qrcodeUrl: '',
    }
  },
  computed: {
    ...mapState(['userInfo', 'showQrcode']),
    showQrcode: {
      get() {
        return this.$store.state.showQrcode
      },
      set(value) {
        console.log(value)
        this.save({ key: 'showQrcode', payload: value })
      },
    },
  },
  methods: {
    ...mapMutations(['save']),
  },
}
</script>
<style scoped lang="scss">
.qrcode-tip {
  padding-bottom: 16px;
  font-size: 13px;
  color: #333;
  text-align: center;
}
</style>
