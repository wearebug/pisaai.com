<!--图片编辑弹窗-->
<template>
  <!-- 裁剪、旋转图片  -->
  <v-dialog :value="value" eager persistent max-width="600px" max-height="0.8vh">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">编辑图片</v-card-title>
      <v-card-text style="padding-top: 20px">
        <vue-cropper
          ref="cropper"
          :view-mode="2"
          drag-mode="move"
          :auto-crop-area="1"
          :min-container-width="250"
          :min-container-height="180"
          :background="true"
          :rotatable="true"
          :src="imgSrc"
          alt="Source Image"
          :modal="true"
          :img-style="{ width: '400px', height: '400px' }"
          :center="false"
          :highlight="true"
          @crop="onCroppering"
        />
        <v-row class="py-2" justify="center" style="top: 10px; position: relative" contenteditable="true">
          尺寸：
          <span :style="cropSizeW > 3000 ? 'color: red' : ''">{{ cropSizeW }}</span>
          *
          <span :style="cropSizeH > 3000 ? 'color: red' : ''">{{ cropSizeH }}</span>
        </v-row>
      </v-card-text>
      <v-row class="py-2" justify="center">
        <v-btn class="mx-2" fab dark x-small color="primary" @click="rotate('r')">
          <v-icon dark>mdi-rotate-right</v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark x-small color="primary" @click="rotate('l')">
          <v-icon dark>mdi-rotate-left</v-icon>
        </v-btn>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="cancelCropImage">取消</v-btn>
        <v-btn :color="cropBtnColor" @click="cropImage">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapMutations } from 'vuex'
import VueCropper from 'vue-cropperjs'

import 'cropperjs/dist/cropper.css'
export default {
  name: 'ImageEditModal',
  props: ['imgSrc', 'onOk', 'value', 'onCancel', 'files'],
  components: { VueCropper },
  data() {
    return {
      cropSizeW: 0,
      cropSizeH: 0,
      cropBtnColor: '',
    }
  },

  methods: {
    ...mapMutations['save'],
    /**
     * 图片裁剪
     */
    onCroppering() {
      this.cropSizeW = Math.floor(this.$refs.cropper.getData().width)
      this.cropSizeH = Math.floor(this.$refs.cropper.getData().height)
      if (this.cropSizeW <= 3000 && this.cropSizeH <= 3000) {
        this.cropBtnColor = 'primary'
      } else {
        this.cropBtnColor = ''
      }
    },
    rotate(dir) {
      if (dir === 'r') {
        this.$refs.cropper.rotate(90)
      } else {
        this.$refs.cropper.rotate(-90)
      }
    },
    cancelCropImage() {
      //this.files.splice(0, 1)
      this.onCancel()
    },
    cropImage() {
      if (this.cropSizeW > 3000 || this.cropSizeH > 3000) {
        this.$toast.error(this.$vuetify.lang.t('$vuetify.error800'))
        return
      }
      let oldFile = this.files[this.files.length - 1]
      let binStr = window.atob(this.$refs.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
      let arr = new Uint8Array(binStr.length)
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      let file = new File([arr], oldFile.name, { type: oldFile.type })
      let thumb = URL.createObjectURL(file)
      let cropFile = Object.assign(oldFile, { file, thumb })
      cropFile.width = this.cropSizeW
      cropFile.height = this.cropSizeH
      //this.files.splice(this.files.length - 1, 1, cropFile)
      //this.showImageEditModal = false
      //this.showOption = true
      this.onOk(cropFile)
    },
    flip(vert) {
      let { scaleX, scaleY, rotate } = this.$refs.cropper.getData()
      if (rotate === 90 || rotate === 270) {
        vert = !vert
      }
      if (vert) {
        this.$refs.cropper.scale(scaleX, -1 * scaleY)
      } else {
        this.$refs.cropper.scale(-1 * scaleX, scaleY)
      }
    },
  },
}
</script>
