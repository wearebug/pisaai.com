<template>
  <v-sheet :width="initWidth" :height="initHeight">
    <div class="z-rela" :style="{ width: initWidth + 'px', height: initHeight + 'px' }">
      <div class="before-img">
        <img :src="iconUrl" alt="before" />
        <v-chip class="tag-after" color="rgba(0,0,0,.3)" dark>{{ $vuetify.lang.t('$vuetify.contrastTips[0]') }}</v-chip>
      </div>
      <div class="after-img" :style="{ width: percent + '%' }">
        <img :src="srcUrl" alt="after" :style="{ width: initWidth + 'px', height: initHeight + 'px' }" />
        <v-chip class="tag-before" color="rgba(0,0,0,.3)" dark>{{ $vuetify.lang.t('$vuetify.contrastTips[1]') }}</v-chip>
      </div>
      <div class="card-slider">
        <vue-slider
          v-model="percent"
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
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: 'PreviewScale',
  components: {},
  props: {
    iconUrl: String,
    srcUrl: String,
    initWidth: Number,
    initHeight: Number,
  },
  data() {
    return {
      percent: 50,
    }
  },
}
</script>

<style scoped>
.z-rela {
  position: relative;
}
.before-img {
  position: relative;
  width: 100%;
  height: 100%;
}
.before-img img {
  width: 100%;
  height: 100%;
}
.tag-after {
  position: absolute;
  right: 16px;
  bottom: 16px;
}
.after-img {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
}
.tag-before {
  position: absolute;
  left: 16px;
  bottom: 16px;
}
.card-slider {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
