<template>
  <!--价格弹窗-->
  <v-dialog v-model="showPriceModal" max-width="960">
    <v-card elevation="2">
      <v-tabs active-class="primary" background-color="black" align-with-title dark hide-slider>
        <v-tab>{{ $vuetify.lang.t('$vuetify.functionTxt[0]') }}</v-tab>
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col v-for="(item, i) in prices" :key="i" cols="12" md="3">
                <v-card elevation="2" class="pb-3">
                  <v-card-title class="black text-subtitle-1 white--text" dark>{{ item.title }}</v-card-title>
                  <v-card-text class="py-3">{{ item.list[0] }}</v-card-text>
                  <v-card-text class="py-3">{{ item.list[1] }}</v-card-text>
                  <v-card-text class="py-3">{{ item.list[2] }}</v-card-text>
                  <v-card-text class="py-3">{{ item.list[3] }}</v-card-text>
                  <v-card-text class="py-3">{{ item.list[4] }}</v-card-text>
                  <v-card-actions>
                    <v-btn color="success" rounded block @click="onWechatPayPackage(item.id, item.title)">
                      <v-icon left dark>mdi-wechat</v-icon>
                      {{ $vuetify.lang.t('$vuetify.priceType[0]') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <div class="text-body-2 text-md-body-1 text-center primary--text my-4">
            {{ $vuetify.lang.t('$vuetify.priceTips') }}
          </div>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
import { isMobile } from '../utils'
import { packagePay } from '../api/home'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'PriceModal',
  computed: {
    ...mapState(['userInfo', 'showQrcode','channel']),
    showPriceModal: {
      get() {
        return this.$store.state.showPriceModal
      },
      set(value) {
        console.log(value)
        this.save({ key: 'showPriceModal', payload: value })
      },
    },
    prices() {
      const functionPrice = this.$vuetify.lang.locales[this.$store.state.curLang.id].functionPrice
      const priceIds = ['PCToBNums3', 'PcToBNums10', 'PcToBNums50', 'PcMonthly']
      return functionPrice.map((v, i) => {
        return { ...v, id: priceIds[i] }
      })
    },
  },
  methods: {
    ...mapMutations(['save']),
    async onWechatPayPackage(id, title) {
      console.log('onWechatPayPackage',id, title)
      _hmt.push(['_trackEvent', 'pisaai', 'www', 'pay:' + title]) //百度埋点统计
      if (this.userInfo) {
        try {
          const data = {
            channel: this.channel,
            fd: isMobile() ? 'h5' : 'pc',
            token:
              this.userInfo?.token ||
              'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJmZCI6InBjIiwic3ViIjoiNDU4NDA0MTk3QHFxLmNvbSIsInVpZCI6ODUyMH0.utfh-gpwheIAl5oH6HYOW2mWAFWy8Xv7-QLbFkp-OcF8Q0C-u5pjlHRACwoG67vEqTEC5Qus1vA0LVYPICmSMg',
            goodsid: id,
          }
          const res = await packagePay(data)
          const { order_id, url } = res.data
          this.qrcodeUrl = url
          this.save({ key: 'showQrcode', payload: true })

          if (order_id) {
            this.getPackageOrderStataus(order_id)
          }
        } catch (e) {
          this.$toast.error(e.msg)
        }
      } else {
        this.save({ key: 'showLogin', payload: true })
      }
    },
  },
}
</script>
