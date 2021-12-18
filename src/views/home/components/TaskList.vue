<template>
  <div>
    <!--任务列表-->
    <v-list three-line v-if="files.length" class="pic_list">
      <v-list-item v-for="item in lodash.cloneDeep(files).reverse()" :key="item.id" style="border-bottom: 1px solid #c9cbce">
        <v-list-item-avatar class="list_item_head_box" rounded style="padding-top: 15px; padding-bottom: 37px">
          <v-checkbox v-model="checkedItem" label="" :value="item.id"/>
          <v-img :src="item.thumb" style="height: 100%" @click="onFilePreview(item.status, item)" />
        </v-list-item-avatar>
        <v-list-item-content style="padding: 35px 0 0; padding-top: 15px">
          <v-list-item-title>
            <v-progress-linear :value="item.response.code === 200 ? item.progress : 0" height="6" />
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption font-weight-light d-flex align-center justify-between">
            <div style="font-family: Work Sans; font-style: normal; font-size: 14px; color: #999">
              <span>{{ `${item.width}x${item.height}px` }}</span>
              <v-divider class="mx-2" vertical style="height: 16px"></v-divider>
              <span>{{ item.size | getFileSize }}</span>
              <v-divider class="mx-2" vertical style="height: 16px"></v-divider>
              <span>{{ item.name }}</span>
            </div>
            <div
              v-if="item.response.code === 200 && item.status"
              style="font-family: Work Sans; font-style: normal; color: #db8819; font-size: 14px"
            >
              {{ item.status.res_size }}
            </div>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <template v-if="item.response.code === 200">
              <template v-if="item.status">
                <template v-if="item.status.code == 1">
                  <!-- <v-chip class="mr-2" color="success" small>{{ $vuetify.lang.t('$vuetify.upload.status[6]') }}</v-chip> -->
                  <div class="d-flex align-center justify-between btns-box">
                    <template v-if="item.blob.substring(0, 4) != 'http'">
                      <v-btn class="mr-2 mb-1" small color="#FBB03B" style="color: #fff" @click="onContinue(item)">
                        {{ $vuetify.lang.t('$vuetify.upload.btn[4]') }}
                      </v-btn>
                    </template>
                    <div>
                      <v-btn class="mr-2 mb-1" small color="primary" @click="onFilePreview(item.status, item)">
                        {{ $vuetify.lang.t('$vuetify.upload.btn[2]') }}
                      </v-btn>
                      <v-btn class="mr-2 mb-1" small color="primary" @click="onFileDownload(item.response, item)" id="list-download">
                        {{ $vuetify.lang.t('$vuetify.upload.btn[1]') }}
                      </v-btn>
                      <v-btn class="mb-1" small color="#333333" style="color: #fff" @click="onRemove(item)">
                        {{ $vuetify.lang.t('$vuetify.upload.btn[3]') }}
                      </v-btn>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <v-chip class="mr-2" small>{{ $vuetify.lang.t('$vuetify.upload.status[' + item.status.task + ']') }}</v-chip>
                </template>
              </template>
            </template>
            <span v-else class="text-caption">{{ item.response.msg }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <PreviewImage
      v-model="showPreview"
      :on-close="onCloseModal"
      :init-height="initHeight"
      :init-width="initWidth"
      :preview-file="previewFile"
    />
  </div>
</template>

<script>
import PreviewImage from '../../../components/PreviewImage'
import { getfilesize } from '@/utils'
import lodash from 'lodash'
import { tocDownload } from '../../../api/home'

const payok = new Array()

export default {
  name: 'TaskList',
  components: { PreviewImage },
  props: ['files', 'onFileRemove', 'onContinue', 'onWechatPay'],
  data() {
    return {
      lodash: lodash,
      showPreview: false,
      checkedItem: [],
      findItem: {},
      previewFile: {
        wmk_url: '',
        src_url: '',
      },
      initWidth: 0,
      initHeight: 0,
      winWidth: 0,
      winHeight: 0,
    }
  },
  methods: {
    onResize() {
      this.winHeight = window.innerHeight - window.innerHeight / 10 - 44 // 屏幕高度
      this.winWidth = window.innerWidth - 48 // 屏幕宽度
    },

  },
  filters: {
    getFileSize(size) {
      return getfilesize(size)
    },
  },
}
</script>

<style scoped lang="scss">
.pic_list {
  padding: 0;

  .v-list-item {
    height: 175px;
    padding-left: 10px !important;

    .list_item_head_box {
      min-width: 80px !important;
      height: 100% !important;
      width: 142px !important;
      padding-left: 16px;
      // margin: 0px;
      margin-right: 20px;

      .v-image {
        width: 110px;
        height: 110px;
        cursor: pointer;
      }
    }

    .btns-box {
      .v-btn {
        font-family: Work Sans;
        font-style: normal;
        font-size: 14px;
        box-shadow: none;
        padding: 0px 27px;
        border-radius: 0px;
      }
    }
  }
}
</style>
