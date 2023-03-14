<template>
  <v-dialog v-model="visitable" max-width="900">
    <v-card>
      <div class="home__share__box">
        <div class="home__choiceType__title">{{ this.$vuetify.lang.t('$vuetify.shareTitle') }}</div>
        <pre class="home__share__tip">{{ this.$vuetify.lang.t('$vuetify.shareContent') }}</pre>
        <div class="share_footer">
          <VCheckbox :error="showError" v-model="checked" :label="this.$vuetify.lang.t('$vuetify.shareAgree')" />

          <v-btn class="mr-2 mb-1" small color="primary" @click="onShareClick()">
            {{ $vuetify.lang.t('$vuetify.shareBtn') }}
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import { sharePhoto } from '@/api/home'

export default {
  name: 'ShareModal',
  props: ['id', 'showShare', 'onClose'],

  data() {
    return {
      checked: false,
      showError: false,
      //visitable:false
    }
  },
  computed: {
    visitable: {
      get() {
        return this.showShare
      },
      set(e) {
        this.onClose(e)
      },
    },
  },
  watch: {
    checked: function (v, ov) {
      this.showError = !v
    },
    showShare: function (v, ov) {
      this.visitable = v
    },
  },
  methods: {
    onShareClick() {
      if (!this.checked) {
        this.showError = true
        this.$toast.error(this.$vuetify.lang.t('$vuetify.shareCheckTip'))
        return
      }
      let data = { mdf: this.id, platform: 'pc', channel: 'pisaAI' }
      sharePhoto(data)
        .then((res) => {
          this.$toast.success(this.$vuetify.lang.t('$vuetify.shareSuccess'))
          this.visitable = false
        })
        .catch((err) => {
          this.$toast.error(err.msg ?? this.$vuetify.lang.t('$vuetify.shareFail'))
        })
    },
  },
}
</script>
<style>
.home__share__box {
  padding: 20px;
}

.home__choiceType__title {
  color: #333;
  font-size: 18px;
}

.home__share__tip {
  line-height: 30px;
  font-size: 14px;
}

.share_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 26px;
}
</style>
