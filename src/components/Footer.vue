<template>
  <!--页脚-->
  <div>
    <v-footer color="black" padless>
      <v-row justify="center" no-gutters>
        <v-btn v-for="(link, i) in links" :key="link" color="white" text rounded class="my-2" @click="onShowFullscreen(i)">
          {{ link }}
        </v-btn>
        <!--SEO专用开始-->
        <v-btn color="white" text rounded class="my-2" onClick="window.open('http://wp.pisaai.com')">行业资讯</v-btn>
        <!--SEO专用结束-->
        <v-col class="py-4 text-center white--text text-body-2" cols="12">
          {{ $vuetify.lang.t('$vuetify.copyrightTxt') }}
          <a style="color: #ffffff" href="https://beian.miit.gov.cn/" target="_blank">{{ $vuetify.lang.t('$vuetify.copyrightTxt1') }}</a>
        </v-col>
      </v-row>
    </v-footer>

    <v-dialog v-model="showFullScreen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="black">
          <v-btn icon dark @click="showFullScreen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ fullscreenTitle }}</v-toolbar-title>
        </v-toolbar>
        <div class="px-4 py-2 text-caption" v-html="fullscreenHtml"></div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      showFullScreen: false,
      fullscreenTitle: '',
      fullscreenHtml: '',
    }
  },
  computed: {
    links() {
      return [
        this.$vuetify.lang.t('$vuetify.menu[3]'),
        this.$vuetify.lang.t('$vuetify.privacyTxt'),
        this.$vuetify.lang.t('$vuetify.agreementTxt'),
        this.$vuetify.lang.t('$vuetify.contactTxt'),
      ]
    },
  },
  methods: {
    onShowFullscreen(i) {
      switch (i) {
        case 0:
          this.fullscreenTitle = this.$vuetify.lang.t('$vuetify.menu[3]')
          this.fullscreenHtml = this.$vuetify.lang.t('$vuetify.aboutInfo')
          break
        case 1:
          this.fullscreenTitle = this.$vuetify.lang.t('$vuetify.privacyTxt')
          this.fullscreenHtml = this.$vuetify.lang.t('$vuetify.privacyInfo')
          break
        case 2:
          this.fullscreenTitle = this.$vuetify.lang.t('$vuetify.agreementTxt')
          this.fullscreenHtml = this.$vuetify.lang.t('$vuetify.agreementInfo')
          break
        case 3:
          this.fullscreenTitle = this.$vuetify.lang.t('$vuetify.contactTxt')
          this.fullscreenHtml = this.$vuetify.lang.t('$vuetify.contactInfo')
          break
      }
      this.showFullScreen = true
    },
  },
}
</script>
