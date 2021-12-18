<template>
  <!--示例图-->
  <v-row class="mt-4">
    <v-col v-for="(card, i) in cards" :key="i" cols="12" md="6">
      <v-card elevation="4">
        <v-sheet class="d-flex align-center justify-center" color="primary lighten-2" height="48">
          <v-icon color="white">{{ card.icon }}</v-icon>
          <span class="ml-2 text-button white--text">{{ card.tag }}</span>
        </v-sheet>
        <v-sheet class="d-rela">
          <div class="before-img">
            <img ref="staticImg" :src="card.after" alt="before" />
            <v-chip label class="tag-after" color="black" dark>{{ $vuetify.lang.t('$vuetify.contrastTips[0]') }}</v-chip>
          </div>
          <div class="after-img" :style="{ width: cardPercents[i] + '%' }">
            <img :src="card.before" alt="after" :style="{ width: staticImgWidth + 'px', height: staticImgHeight + 'px' }" />
            <v-chip label class="tag-before" color="black" dark>{{ $vuetify.lang.t('$vuetify.contrastTips[1]') }}</v-chip>
          </div>
          <div class="card-slider">
            <vue-slider
              v-model="cardPercents[i]"
              :railStyle="{ backgroundColor: 'transparent' }"
              :process="false"
              :tooltip="'none'"
              :clickable="false"
              :dotSize="40"
            >
              <template v-slot:dot>
                <v-btn fab small color="rgba(255,255,255,.5)">
                  <v-icon color="#666">mdi-arrow-left-right</v-icon>
                </v-btn>
              </template>
            </vue-slider>
          </div>
        </v-sheet>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
import { checkSeoTab } from '../../../utils'

const card_before_img = ['contrast1-1', 'contrast2-1', 'contrast3-1', 'contrast4-1'].map((i) => require('@/assets/' + i + '.jpg'))
const card_after_img = ['contrast1-2', 'contrast2-2', 'contrast3-2', 'contrast4-2'].map((i) => require('@/assets/' + i + '.jpg'))

export default {
  name: 'ExampleList',
  computed: {
    ...mapState(['langIndex']),
  },
  data() {
    return {
      staticImgWidth: 0,
      staticImgHeight: 0,
      staticImg1Width: 0,
      staticImg1Height: 0,
      cards: [
        {
          before: card_before_img[0],
          after: card_after_img[0],
          icon: 'mdi-image-area',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[0]'),
        },
        {
          before: card_before_img[1],
          after: card_after_img[1],
          icon: 'mdi-palette',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[1]'),
        },
        {
          before: card_before_img[2],
          after: card_after_img[2],
          icon: 'mdi-account-box',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[2]'),
        },
        {
          before: card_before_img[3],
          after: card_after_img[3],
          icon: 'mdi-fullscreen-exit',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[3]'),
        },
      ],
      cardPercents: [50, 50, 50, 50],
    }
  },
  watch: {
    langIndex(value) {
      console.log(value)
      if (value >= 0) {
        this.cards = [
          {
            before: card_before_img[0],
            after: card_after_img[0],
            icon: 'mdi-image-area',
            tag: this.$vuetify.lang.t('$vuetify.contrastType[0]'),
          },
          {
            before: card_before_img[1],
            after: card_after_img[1],
            icon: 'mdi-palette',
            tag: this.$vuetify.lang.t('$vuetify.contrastType[1]'),
          },
          {
            before: card_before_img[2],
            after: card_after_img[2],
            icon: 'mdi-account-box',
            tag: this.$vuetify.lang.t('$vuetify.contrastType[2]'),
          },
          {
            before: card_before_img[3],
            after: card_after_img[3],
            icon: 'mdi-fullscreen-exit',
            tag: this.$vuetify.lang.t('$vuetify.contrastType[3]'),
          },
        ]
      }
    },
  },
  created() {
    let seoTab = checkSeoTab()
    if (seoTab == 'enhance') {
      // 彩色照片优化
      //this.optionsTab = 0
      this.cards = [
        {
          before: card_before_img[0],
          after: card_after_img[0],
          icon: 'mdi-image-area',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[0]'),
        },
      ]
    } else if (seoTab == 'color') {
      // 黑白照片上色
      //this.optionsTab = 1
      this.cards = [
        {
          before: card_before_img[1],
          after: card_after_img[1],
          icon: 'mdi-palette',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[1]'),
        },
      ]
    } else if (seoTab == 'changeBG') {
      // 证件照换背景
      //this.optionsTab = 2
      this.cards = [
        {
          before: card_before_img[2],
          after: card_after_img[2],
          icon: 'mdi-account-box',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[2]'),
        },
      ]
    } else if (seoTab == 'deadee') {
      // 遗像照
      //this.optionsTab = 3
      this.cards = [
        {
          before: card_before_img[3],
          after: card_after_img[3],
          icon: 'mdi-fullscreen-exit',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[3]'),
        },
      ]
    }
  },

  methods: {
    onResize() {
      setTimeout(() => {
        this.staticImgWidth = this.$refs.staticImg[0].offsetWidth
        this.staticImgHeight = this.$refs.staticImg[0].offsetHeight
      }, 600)
      //this.winHeight = window.innerHeight - window.innerHeight / 10 - 44 // 屏幕高度
      //this.winWidth = window.innerWidth - 48 // 屏幕宽度
    },
  },
}
</script>
<style scoped lang="scss">
.d-rela {
  position: relative;
  overflow: hidden;
}

.before-img {
  position: relative;
  /* z-index: 1; */
  img {
    width: 100%;
    display: block;
  }
}

.after-img {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  /* z-index: 0; */
  overflow: hidden;
}

.tag-before {
  position: absolute;
  left: 0;
  bottom: 24px;
  z-index: 0;
  height: 30px;
  padding: 0 20px !important;
  border-radius: 0 !important;
}

.tag-after {
  position: absolute;
  right: 0;
  bottom: 24px;
  height: 30px;
  padding: 0 20px !important;
  border-radius: 0 !important;
}

.card-slider {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
