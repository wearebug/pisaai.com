<template>
  <!--查看结果-->
  <v-dialog :value='value' :max-width='initWidth'>
    <v-card class='p-rela' :max-width='initWidth' :height='initHeight'>
      <v-row class='toolbar' :style="{ top: toolbarTop + 'px' }">
        <v-btn class='mx-4' icon color='white' @click='onPlus'>
          <v-icon>mdi-magnify-plus</v-icon>
        </v-btn>
        <v-btn class='mx-4' icon color='white' @click='onMinus'>
          <v-icon>mdi-magnify-minus</v-icon>
        </v-btn>
      </v-row>
      <preview-scale
        :initWidth='initWidth'
        :initHeight='initHeight'
        :iconUrl='previewFile.wmk_url'
        :srcUrl='previewFile.src_url'
        :scaleRatio='scaleRatio'
      />
    </v-card>
  </v-dialog>
</template>
<script>
import PreviewScale from '@/components/PreviewScale'

export default {
  name: 'PreviewImage',
  props: ['value', 'initWidth', 'initHeight', 'previewFile', 'onClose'],
  components: { PreviewScale },
  data() {
    return {
      scaleRatio: 1
    }
  },
  computed: {
    toolbarTop() {
      let top = (this.winHeight - this.initHeight) / 2
      return top <= 22 ? 22 : top
    }
  },
  created() {
    console.log(this.previewFile, 123123)
  },
  methods: {
    onPlus() {
      if (this.scaleRatio.toFixed() > 4) return
      this.scaleRatio += 0.1
    },
    onMinus() {
      if (this.scaleRatio.toFixed(1) < 0.1) return
      this.scaleRatio -= 0.1
    },
  }
}
</script>

<style lang='scss' scoped>
.p-rela {
  position: relative;
}
</style>
