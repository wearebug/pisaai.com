<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container class="d-flex justify-space-between pa-0">
        <div class="d-flex align-center pa-0">
          <v-img
            alt="高光照片优化"
            class="shrink"
            contain
            src="http://new.hiliphoto.com/logo.ee557abfcfb6967a2fc020b032fad178.png"
            transition="scale-transition"
            width="40"
            eager
          />
        </div>
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
          <v-btn text large @click="onPriceClick">
            <span>{{ $vuetify.lang.t('$vuetify.functionTxt[0]') }}</span>
          </v-btn>
          <v-btn text large @click="onApiClick">
            <span>{{ $vuetify.lang.t('$vuetify.functionTxt[1]') }}</span>
          </v-btn>
          <v-menu offset-y nudge-top="-10">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" text large>
                <span>{{ curLang.name }}</span>
                <v-icon size="16">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list flat>
              <v-list-item-group v-model="langIndex" color="primary">
                <v-list-item v-for="item in langs" :key="item.id">
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
          <v-menu offset-y nudge-top="-10" v-if="userInfo">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" text large>
                <span>{{ $vuetify.lang.t('$vuetify.userTxt') }}</span>
                <v-icon size="16">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list flat>
              <v-list-item-group color="primary">
                <v-list-item @click="onLogout">
                  <v-list-item-title v-text="$vuetify.lang.t('$vuetify.loginOutBtnTxt')"></v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
          <v-btn text large @click="onLogin" v-else>
            <span>{{ $vuetify.lang.t('$vuetify.loginTxt') }}</span>
          </v-btn>
        </div>
        <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed left temporary>
      <v-list dense>
        <v-list-item ripple @click="onPriceClick">
          <v-list-item-title>{{ $vuetify.lang.t('$vuetify.functionTxt[0]') }}</v-list-item-title>
        </v-list-item>
        <v-list-item ripple @click="onApiClick">
          <v-list-item-title>{{ $vuetify.lang.t('$vuetify.functionTxt[1]') }}</v-list-item-title>
        </v-list-item>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>{{ curLang.name }}</v-list-item-title>
          </template>
          <v-list-item v-for="(item, i) in langs" :key="item.id" @click="onLangChange(i)">
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group v-if="userInfo">
          <template v-slot:activator>
            <v-list-item-title>{{ $vuetify.lang.t('$vuetify.userTxt') }}</v-list-item-title>
          </template>
          <v-list-item @click="onLogout">
            <v-list-item-title v-text="$vuetify.lang.t('$vuetify.loginOutBtnTxt')"></v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item ripple @click="onLogin" v-else>
          <v-list-item-title>{{ $vuetify.lang.t('$vuetify.loginTxt') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <v-sheet color="white" tag="section">
          <h1 class="my-4 text-h4">{{ $vuetify.lang.t('$vuetify.name') }}</h1>
          <p class="text--secondary text-justify">{{ $vuetify.lang.t('$vuetify.synopsis') }}</p>
        </v-sheet>
        <v-sheet tag="section" class="d-flex align-center justify-center pt-7 pb-7 pt-md-12 pb-md-12 border-dash">
          <file-upload
            ref="upload"
            v-model="files"
            :thread="thread"
            :post-action="postAction"
            :data="postData"
            :multiple="multiple"
            :extensions="extensions"
            :accept="accept"
            @input-file="inputFile"
            @input-filter="inputFilter"
          >
            <v-btn class="mt-5 mb-5" color="success" dark large>
              {{ $vuetify.lang.t('$vuetify.btnTxt') }}
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </file-upload>
        </v-sheet>
        <v-list three-line>
          <v-list-item v-for="item in files" :key="item.id">
            <v-list-item-avatar size="80" rounded>
              <v-img :src="item.blob"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <v-progress-linear :value="item.response.code === 0 ? item.progress : 0" height="6"></v-progress-linear>
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption font-weight-light">
                <span>{{ `${item.width}x${item.height}px` }}</span>
                <v-divider class="mx-2" vertical style="height: 16px"></v-divider>
                <span>{{ item.size | getFileSize }}</span>
                <v-divider class="mx-2" vertical style="height: 16px"></v-divider>
                <span>{{ item.name }}</span>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <template v-if="item.response.code === 200">
                  <template v-if="item.status && item.status.src_url">
                    <v-chip class="mr-2" color="success" small>{{ $vuetify.lang.t('$vuetify.upload.status[6]') }}</v-chip>
                    <v-btn class="mr-2" small color="primary" @click="onFileDownload(item.response)">
                      {{ $vuetify.lang.t('$vuetify.upload.btn[1]') }}
                    </v-btn>
                    <v-btn class="mr-2" small color="success" @click="onFilePreview(item.status)">
                      {{ $vuetify.lang.t('$vuetify.upload.btn[2]') }}
                    </v-btn>
                  </template>
                  <template v-else>
                    <v-chip class="mr-2" small>{{ $vuetify.lang.t('$vuetify.upload.status[3]') }}</v-chip>
                  </template>
                </template>
                <span v-else class="text-caption">{{ item.response.msg }}</span>
                <v-btn small color="error" @click="onFileRemove(item)">{{ $vuetify.lang.t('$vuetify.upload.btn[3]') }}</v-btn>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-row class="mt-4">
          <v-col v-for="(card, i) in cards" :key="i" cols="12" md="6">
            <v-card elevation="4">
              <v-sheet class="d-rela">
                <div class="before-img">
                  <img ref="staticImg" :src="card.after" alt="before" />
                  <v-chip class="tag-after" color="rgba(0,0,0,.3)" dark>{{ $vuetify.lang.t('$vuetify.contrastTips[0]') }}</v-chip>
                </div>
                <div class="after-img" :style="{ width: cardPercents[i] + '%' }">
                  <img :src="card.before" alt="after" :style="{ width: staticImgWidth + 'px', height: staticImgHeight + 'px' }" />
                  <v-chip class="tag-before" color="rgba(0,0,0,.3)" dark>{{ $vuetify.lang.t('$vuetify.contrastTips[1]') }}</v-chip>
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

              <v-card-text>
                <v-chip v-for="(tag, j) in card.tags" :key="j" class="mr-2">{{ tag }}</v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-sheet tag="section">
          <h1 class="my-8 text-h5 text-md-h4">{{ $vuetify.lang.t('$vuetify.caseTxt') }}</h1>
          <v-slide-group :show-arrows="!$vuetify.breakpoint.mobile" next-icon="mdi-arrow-right-box" prev-icon="mdi-arrow-left-box">
            <v-slide-item v-for="(item, i) in products" :key="i">
              <v-card class="mx-2" width="344" height="238">
                <v-img
                  :src="item.src"
                  width="100%"
                  height="100%"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-chip class="product-tag" color="rgba(0,0,0,.3)" dark>{{ item.tag }}</v-chip>
                </v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
        <v-sheet tag="section" class="mb-8">
          <h1 class="my-8 text-h5 text-md-h4">FAQ</h1>
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-1">
                {{ $vuetify.lang.t('$vuetify.problem[0].title') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text-body-2">{{ $vuetify.lang.t('$vuetify.problem[0].info1') }}</p>
                <v-img src="http://new.hiliphoto.com/faq.7713d11dd17df54ae15dee326ab14d17.jpg" eager></v-img>
                <p class="mt-4 text-justify text-body-2" v-html="$vuetify.lang.t('$vuetify.problem[0].info2')"></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-1">
                {{ $vuetify.lang.t('$vuetify.problem[1].title') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text-body-2">{{ $vuetify.lang.t('$vuetify.problem[1].info') }}</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-1">
                {{ $vuetify.lang.t('$vuetify.problem[2].title') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text-body-2" v-html="$vuetify.lang.t('$vuetify.problem[2].info')"></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-1">
                {{ $vuetify.lang.t('$vuetify.problem[3].title') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text-body-2">{{ $vuetify.lang.t('$vuetify.problem[3].info') }}</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-1">
                {{ $vuetify.lang.t('$vuetify.problem[4].title') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text-body-2" v-html="$vuetify.lang.t('$vuetify.problem[4].info')"></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-1">
                {{ $vuetify.lang.t('$vuetify.problem[5].title') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text-body-2" v-html="$vuetify.lang.t('$vuetify.problem[5].info')"></p>
                <p class="text-justify text-body-2">
                  <span>Bilibili:</span>
                  <br />
                  <a href="https://www.bilibili.com/video/BV13g41157hL" target="_blank" class="text-decoration-none">
                    https://www.bilibili.com/video/BV13g41157hL
                  </a>
                </p>
                <p class="text-justify text-body-2">
                  <span>Youtube:</span>
                  <br />
                  <a href="https://www.youtube.com/watch?v=XtHbzENmb74" target="_blank" class="text-decoration-none">
                    https://www.youtube.com/watch?v=XtHbzENmb74
                  </a>
                </p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>
      </v-container>
    </v-main>
    <v-footer color="primary" padless>
      <v-row justify="center" no-gutters>
        <v-btn v-for="(link, i) in links" :key="link" color="white" text rounded class="my-2" @click="onShowFullscreen(i)">
          {{ link }}
        </v-btn>
        <v-col class="py-4 text-center white--text text-body-2" cols="12">
          {{ $vuetify.lang.t('$vuetify.copyrightTxt') }}
        </v-col>
      </v-row>
    </v-footer>
    <v-dialog v-model="showDialog" max-width="960">
      <v-card elevation="2">
        <v-tabs color="primary accent-4" align-with-title>
          <v-tab>{{ $vuetify.lang.t('$vuetify.functionTxt[0]') }}</v-tab>
          <v-tab>{{ $vuetify.lang.t('$vuetify.functionTxt[1]') }}</v-tab>
          <v-tab-item>
            <v-container fluid>
              <v-row>
                <v-col v-for="(item, i) in prices" :key="i" cols="12" md="3">
                  <v-card elevation="2" class="pb-3">
                    <v-card-title class="primary text-subtitle-1 white--text" dark>{{ item.title }}</v-card-title>
                    <v-card-text class="py-3">{{ item.list[0] }}</v-card-text>
                    <v-card-text class="py-3">{{ item.list[1] }}</v-card-text>
                    <v-card-text class="py-3">{{ item.list[2] }}</v-card-text>
                    <v-card-text class="py-3">{{ item.list[3] }}</v-card-text>
                    <v-card-text class="py-3">{{ item.list[4] }}</v-card-text>
                    <v-card-actions>
                      <v-btn color="success" rounded block>
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
          <v-tab-item>
            <api-docs :lang="curLang" />
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showLogin" transition="dialog-bottom-transition" max-width="720" @click:outside="onLoginClose">
      <v-card>
        <v-toolbar color="primary" dark class="text-h6">{{ $vuetify.lang.t('$vuetify.loginTxt') }}</v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-subheader class="text-subtitle-1 font-weight-bold">{{ $vuetify.lang.t('$vuetify.loginTitle') }}</v-subheader>
              <ul class="text-button font-weight-light">
                <li>{{ $vuetify.lang.t('$vuetify.loginList[0]') }}</li>
                <li>{{ $vuetify.lang.t('$vuetify.loginList[1]') }}</li>
                <li>{{ $vuetify.lang.t('$vuetify.loginList[2]') }}</li>
                <li>{{ $vuetify.lang.t('$vuetify.loginList[3]') }}</li>
              </ul>
            </v-col>
            <v-col cols="12" md="6">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="email" :rules="emailRules" :label="$vuetify.lang.t('$vuetify.loginTip[0]')" required></v-text-field>
                <v-text-field
                  type="password"
                  v-model="pwd"
                  :rules="pwdRules"
                  :label="$vuetify.lang.t('$vuetify.loginTip[1]')"
                  required
                ></v-text-field>
                <v-checkbox v-model="isRegister" :label="$vuetify.lang.t('$vuetify.loginTip[2]')"></v-checkbox>
                <v-btn :disabled="!valid" :color="isRegister ? 'success' : 'primary'" class="mb-4" @click="onSubmit" block>
                  {{ isRegister ? $vuetify.lang.t('$vuetify.registerBtnTxt') : $vuetify.lang.t('$vuetify.loginBtnTxt') }}
                </v-btn>
                <!-- <div class="login-spacer"><span class="login-spacer-text">第三方登录</span></div>
                <v-sheet class="d-flex justify-center mt-5 pb-2">
                  <v-btn fab dark small color="success" @click="showQrcode = true">
                    <v-icon dark>mdi-wechat</v-icon>
                  </v-btn>
                </v-sheet> -->
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showOption" max-width="720" persistent>
      <v-card>
        <v-tabs v-model="optionsTab" color="primary accent-4" center-active align-with-title>
          <v-tab v-for="tab in optionTabs" :key="tab.id">{{ tab.name }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="optionsTab">
          <v-tab-item v-for="tab in optionTabs" :key="tab.id">
            <v-container fluid>
              <v-row align="center" v-if="tab.types">
                <v-col class="text-button" cols="12" sm="2">图片类型</v-col>
                <v-col class="py-0" cols="12" sm="10">
                  <v-radio-group row v-model="tab.typeValue">
                    <v-radio v-for="item in tab.types" :key="item.value" :label="item.label" :value="item.value"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row align="center" v-else>
                <v-col class="text-button" cols="12" sm="2">背景色</v-col>
                <v-col class="py-0" cols="12" sm="10">
                  <v-radio-group row v-model="tab.bgValue">
                    <v-radio v-for="item in tab.bgs" :key="item.value" :label="item.label" :value="item.value"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="text-button" cols="12" sm="2">高级选项</v-col>
                <v-col class="d-flex flex-wrap py-0" cols="12" sm="10">
                  <v-checkbox
                    v-model="tab.optionValue"
                    class="mr-4"
                    v-for="item in tab.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="text-button" cols="12" sm="2">输出选项</v-col>
                <v-col class="d-flex flex-wrap py-0" cols="12" sm="10">
                  <v-checkbox
                    v-model="tab.outputValue"
                    class="mr-4"
                    v-for="item in tab.output"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onUploadCancel">取消</v-btn>
          <v-btn color="primary darken-1" @click="onUploadComfirm">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showPreview" :max-width="initWidth">
      <v-card :max-width="initWidth" :height="initHeight">
        <preview-scale :initWidth="initWidth" :initHeight="initHeight" :iconUrl="previewFile.icon_url" :srcUrl="previewFile.src_url" />
      </v-card>
      <!-- <v-card>
        <v-sheet class="d-rela">
          <div class="before-img">
            <img ref="staticImg1" :src="previewFile.icon_url" alt="before" />
            <v-chip class="tag-after" color="rgba(0,0,0,.3)" dark>{{ $vuetify.lang.t('$vuetify.contrastTips[0]') }}</v-chip>
          </div>
          <div class="after-img" :style="{ width: previewFile.percent + '%' }">
            <img :src="previewFile.src_url" alt="after" :style="{ width: staticImg1Width + 'px', height: staticImg1Height + 'px' }" />
            <v-chip class="tag-before" color="rgba(0,0,0,.3)" dark>{{ $vuetify.lang.t('$vuetify.contrastTips[1]') }}</v-chip>
          </div>
          <div class="card-slider">
            <vue-slider
              v-model="previewFile.percent"
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
      </v-card> -->
    </v-dialog>
    <v-dialog v-model="showQrcode" max-width="320">
      <v-card>
        <vue-qr :correctLevel="3" :text="qrcodeUrl" :size="320"></vue-qr>
        <div class="qrcode-tip">微信扫码下载高清无水印图</div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showFullScreen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="showFullScreen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ fullscreenTitle }}</v-toolbar-title>
        </v-toolbar>
        <div class="px-4 py-2 text-caption" v-html="fullscreenHtml"></div>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import VueQr from 'vue-qr'
import ApiDocs from '@/components/ApiDocs'
import PreviewScale from '@/components/PreviewScale'
import { getfilesize, isMobile, isWechat } from '@/utils'
import { login, fileDownload, getFileStatus, wechatPay, getOrderStataus } from '@/api/home'
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t('$vuetify.name'),
      meta: [
        {
          name: 'keywords',
          content: this.$vuetify.lang.t('$vuetify.keyword'),
        },
        {
          name: 'description',
          content: this.$vuetify.lang.t('$vuetify.description'),
        },
      ],
    }
  },
  name: 'App',
  components: {
    VueQr,
    ApiDocs,
    PreviewScale,
  },
  filters: {
    getFileSize(size) {
      return getfilesize(size)
    },
  },
  data() {
    return {
      timer: null,
      timer1: null,
      timer1Count: 0,
      postAction: 'https://sdkphoto.fangtangtv.com/api/toc/uploads',
      postData: {},
      file: null,
      files: [],
      thread: 3,
      multiple: true,
      accept: 'image/png,image/gif,image/jpeg,image/webp',
      extensions: 'gif,jpg,jpeg,png,webp',
      showOption: false,
      showPreview: false,
      previewFile: {
        icon_url: '',
        src_url: '',
      },
      optionsTab: 0,
      optionTabs: [
        {
          id: 'colour',
          name: '彩照优化',
          typeValue: '',
          optionValue: [],
          outputValue: [],
          types: [
            { label: '人物', value: 'people' },
            { label: '漫画插图', value: 'cortoon' },
            { label: '风景', value: 'landscape' },
          ],
          options: [
            { label: '去雾', value: 'defogging' },
            { label: '去划痕', value: 'scratch' },
          ],
          output: [{ label: '300dpi（印刷级）', value: 'dpi' }],
        },
        {
          id: 'b&w',
          name: '黑白优化',
          typeValue: '',
          optionValue: [],
          outputValue: [],
          types: [
            { label: '人物', value: 'people' },
            { label: '漫画插图', value: 'cortoon' },
            { label: '风景', value: 'landscape' },
          ],
          options: [
            { label: '去雾', value: 'defogging' },
            { label: '去划痕', value: 'scratch' },
            { label: '上色', value: 'colour' },
          ],
          output: [{ label: '300dpi（印刷级）', value: 'dpi' }],
        },
        {
          id: 'changeBg）',
          name: '证件换背景',
          bgValue: '',
          optionValue: [],
          outputValue: [],
          bgs: [
            { label: '蓝色', value: 'blue' },
            { label: '白色', value: 'white' },
            { label: '红色', value: 'red' },
            { label: '透明（抠图）', value: 'transparent' },
          ],
          options: [{ label: '人像优化', value: 'repair' }],
          output: [{ label: '300dpi（印刷级）', value: 'dpi' }],
        },
        {
          id: 'deadee',
          name: '遗像照',
          bgValue: '',
          optionValue: [],
          outputValue: [],
          bgs: [
            { label: '白色', value: 'white' },
            { label: '渐变灰', value: 'grey' },
          ],
          options: [{ label: '人像优化', value: 'repair' }],
          output: [{ label: '300dpi（印刷级）', value: 'dpi' }],
        },
      ],
      staticImgWidth: 0,
      staticImgHeight: 0,
      staticImg1Width: 0,
      staticImg1Height: 0,
      langIndex: 0,
      curLang: { id: 'zhHans', name: '简体中文' },
      langs: [
        { id: 'zhHans', name: '简体中文' },
        { id: 'en', name: 'English' },
        { id: 'ja', name: '日本语' },
        { id: 'es', name: 'Español' },
        { id: 'fr', name: 'Français' },
      ],
      drawer: false,
      panel: [],
      showDialog: false,
      showLogin: false,
      showQrcode: false,
      qrcodeUrl: '',
      isRegister: false,
      valid: true,
      email: '',
      emailRules: [(v) => !!v || '请输入邮箱', (v) => /.+@.+\..+/.test(v) || '邮箱格式有误'],
      pwd: '',
      pwdRules: [(v) => !!v || '请输入密码'],
      cardPercents: [50, 50, 50, 50],
      showFullScreen: false,
      fullscreenTitle: '',
      fullscreenHtml: '',
      winWidth: 0,
      winHeight: 0,
      initWidth: 0,
      initHeight: 0,
    }
  },
  watch: {
    langIndex(value) {
      if (value >= 0) {
        this.curLang = this.langs[value]
        this.$vuetify.lang.current = this.curLang.id
      }
    },
    files: {
      handler(value) {
        console.log(value)
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(['userInfo']),
    prices() {
      return this.$vuetify.lang.locales[this.curLang.id].functionPrice
    },
    cards() {
      return [
        {
          before: 'http://new.hiliphoto.com/contrast1-1.dfdf5513ef7d0461777e835debe27531.jpg',
          after: 'http://new.hiliphoto.com/contrast1-2.870908c3291f48bb80ba9d9d4dc58d77.jpg',
          tags: [this.$vuetify.lang.t('$vuetify.contrastType[0]')],
        },
        {
          before: 'http://new.hiliphoto.com/contrast2-1.a49e903c0c462f5fe3b4420e7aea4875.jpg',
          after: 'http://new.hiliphoto.com/contrast2-2.22220caffd0c1a8678217cd21f4483ef.jpg',
          tags: [this.$vuetify.lang.t('$vuetify.contrastType[1]'), this.$vuetify.lang.t('$vuetify.contrastType[4]')],
        },
        {
          before: 'http://new.hiliphoto.com/contrast3-1.2b61873dfc704afb076459384e452bd2.jpg',
          after: 'http://new.hiliphoto.com/contrast3-2.6bc9395b5696789298bb3ac748ec524c.jpg',
          tags: [this.$vuetify.lang.t('$vuetify.contrastType[2]'), this.$vuetify.lang.t('$vuetify.contrastType[5]')],
        },
        {
          before: 'http://new.hiliphoto.com/contrast4-1.a8ff8a58fedd43c3204c179ff99b42e6.jpg',
          after: 'http://new.hiliphoto.com/contrast4-2.649632ce9e5b833c6c3f312f01643929.jpg',
          tags: [this.$vuetify.lang.t('$vuetify.contrastType[3]')],
        },
      ]
    },
    products() {
      return [
        {
          tag: this.$vuetify.lang.t('$vuetify.contrastType[1]'),
          src: 'http://new.hiliphoto.com/roll2.3e47eeb951c135be1ecc670b377ba706.jpg',
        },
        {
          tag: this.$vuetify.lang.t('$vuetify.contrastType[1]'),
          src: 'http://new.hiliphoto.com/roll3.d21c5f0709e28f4ed22564924d4dc34a.jpg',
        },
        {
          tag: this.$vuetify.lang.t('$vuetify.contrastType[0]'),
          src: 'http://new.hiliphoto.com/roll4.1308fd0682989e613ea55520f58cc2a0.jpg',
        },
        {
          tag: this.$vuetify.lang.t('$vuetify.contrastType[0]'),
          src: 'http://new.hiliphoto.com/roll1.ed3dfd75a81af454bb9f5a6fb831e209.jpg',
        },
      ]
    },
    links() {
      return [
        this.$vuetify.lang.t('$vuetify.menu[3]'),
        this.$vuetify.lang.t('$vuetify.privacyTxt'),
        this.$vuetify.lang.t('$vuetify.agreementTxt'),
      ]
    },
  },
  created() {
    let langIndex = this.langs.findIndex((v) => v.id === this.$vuetify.lang.current)
    this.langIndex = langIndex
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    ...mapMutations(['setUserInfo', 'removeUserInfo']),
    onResize() {
      this.winHeight = window.innerHeight - window.innerHeight / 10 // 屏幕高度
      this.winWidth = window.innerWidth - 30 // 屏幕宽度
      this.staticImgWidth = this.$refs.staticImg[0].offsetWidth
      this.staticImgHeight = this.$refs.staticImg[0].offsetHeight
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }
      if (newFile && newFile.error === '' && newFile.file && (!oldFile || newFile.file !== oldFile.file)) {
        // 创建 blob 字段
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        // Thumbnails
        // 缩略图
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
      // image 尺寸
      if (
        newFile &&
        newFile.error === '' &&
        newFile.type.substr(0, 6) === 'image/' &&
        newFile.blob &&
        (!oldFile || newFile.blob !== oldFile.blob)
      ) {
        newFile.error = 'image parsing'
        let img = new Image()
        img.onload = () => {
          this.$refs.upload.update(newFile, { error: '', height: img.height, width: img.width })
        }
        img.οnerrοr = () => {
          this.$refs.upload.update(newFile, { error: 'parsing image size' })
        }
        img.src = newFile.blob
      }
    },
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        this.showOption = true
      }
      if (!newFile && oldFile) {
        this.showOption = false
      }
      // 上传成功
      if (newFile?.active !== oldFile?.active) {
        if (newFile?.success !== oldFile?.success) {
          this.getFileStatusProgress(newFile)
        }
      }
    },
    /**
     * 查询上传文件
     */
    getFileStatusProgress(file) {
      if (file.response.mdfs) {
        const { mdfs } = file.response
        getFileStatus({ mdf: mdfs[0], platform: isMobile ? 'h5' : 'pc' })
          .then((res) => {
            if (res.mdfs[0].src_url) {
              file.status = res.mdfs[0]
              this.$refs.upload.update(file, { active: false })
              clearInterval(this.timer)
            } else {
              this.timer = setTimeout(() => {
                this.getFileStatusProgress(file)
              }, 2000)
            }
          })
          .catch((e) => {
            this.$toast.error(e.msg)
            clearInterval(this.timer)
          })
      }
    },
    /**
     * 确认上传文件
     */
    onUploadComfirm() {
      const opt = this.optionTabs[this.optionsTab]
      const bgMap = {
        transparent: -1,
        grey: 1,
        white: '255,255,255',
        blue: '85,142,213',
        red: '235,51,35',
      }
      let data = {}
      if (this.optionsTab === 0 || this.optionTabs === 1) {
        let seq = []
        switch (opt.typeValue) {
          case 'people':
            seq = [...opt.optionValue, 'repair']
            data = {
              type: opt.typeValue,
              seq: seq.join(),
              dpi: opt.outputValue.length ? 300 : '',
            }
            break
          case 'cortoon':
            seq = [...opt.optionValue, 'sr']
            data = {
              type: opt.typeValue,
              seq: seq.join(),
              rate: 4,
              dpi: opt.outputValue.length ? 300 : '',
            }
            break
          case 'landscape':
            seq = [...opt.optionValue, 'sr']
            data = {
              type: opt.typeValue,
              seq: seq.join(),
              rate: 2,
              dpi: opt.outputValue.length ? 300 : '',
            }
            break
        }
      } else if (this.optionsTab === 2) {
        let seq = [...opt.optionValue, 'bg']
        let rgb = bgMap[opt.bgValue]
        data = {
          type: 'people',
          seq: seq.join(),
          dpi: opt.outputValue.length ? 300 : '',
          rgb: rgb,
        }
      } else if (this.optionsTab === 3) {
        let seq = [...opt.optionValue, 'bg']
        let rgb = bgMap[opt.bgValue]
        data = {
          type: 'portrait',
          seq: seq.join(),
          dpi: opt.outputValue.length ? 300 : '',
          rgb: rgb,
        }
      }
      this.postData = { ...data, platform: isMobile ? 'h5' : 'pc', token: this.userInfo?.token }
      // let oldFile = this.files[0]
      this.files.forEach((v) => {
        if (!v.success) {
          this.$refs.upload.update(v.id, {
            active: true,
            data: this.postData,
          })
        }
      })
      this.showOption = false
    },
    /**
     * 取消上传文件
     */
    onUploadCancel() {
      this.files.forEach((v) => {
        if (!v.success) {
          this.$refs.upload.remove(v)
        }
      })
      this.showOption = false
    },
    /**
     * 下载上传文件
     */
    async onFileDownload(response) {
      const { mdfs } = response
      try {
        await fileDownload(mdfs[0])
        const url = `https://sdkphoto.fangtangtv.com/api/toc/download/${mdfs[0]}`
        if (isWechat) {
          this.saveImg(url)
        } else {
          this.fileDonwload(url)
        }
      } catch (e) {
        if (e.code === 2) {
          this.onWechatPay(response)
        }
      }
    },
    fileDonwload(url) {
      let image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      image.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob)
          this.saveImg(url)
          URL.revokeObjectURL(url)
        })
      }
    },
    saveImg(Url) {
      let blob = new Blob([''], { type: 'application/octet-stream' })
      let url = URL.createObjectURL(blob)
      let a = document.createElement('a')
      a.href = Url
      a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, '$2').split('?')[0]
      let e = document.createEvent('MouseEvents')
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
      URL.revokeObjectURL(url)
    },
    onWechatPay(response) {
      const data = {
        goodsid: 'BV11r4y1T7aX',
        channel: 'hili',
        mdf: response.mdfs[0],
      }
      wechatPay(data)
        .then((res) => {
          const { orderid, url } = res.data
          this.qrcodeUrl = url
          this.showQrcode = true
          this.getOrderStataus(orderid, response)
          // this.makeQrcode()
        })
        .catch((e) => {
          this.$toast.error(e.msg)
        })
    },
    getOrderStataus(orderid, response) {
      getOrderStataus({ orderid })
        .then((res) => {
          this.$toast.success(res.msg)
          this.onFileDownload(response)
        })
        .catch((e) => {
          if (e.code === 9010) {
            this.getOrderResult(orderid, response)
          } else {
            this.$toast.info(e.msg)
          }
        })
    },
    getOrderResult(orderid, response) {
      this.timer1 = setInterval(() => {
        this.timer1Count += 1
        if (this.timer1Count >= 30) {
          clearInterval(this.timer1)
          this.timer1Count = 0
        }
        getOrderStataus({ orderid })
          .then((res) => {
            this.timer1Count = 0
            clearInterval(this.timer1)
            this.$toast.success(res.msg)
            this.onFileDownload(response)
          })
          .catch((e) => {
            if (e.code !== 9010) {
              this.timer1Count = 0
              clearInterval(this.timer1)
            }
          })
      }, 2000)
    },
    /**
     * 预览上传文件
     */
    onFilePreview(fileObj) {
      this.previewFile = { ...fileObj, percent: 50 }
      let img = new Image()
      img.src = this.previewFile.icon_url
      img.onload = () => {
        let rate = Math.min(this.winWidth / img.width, this.winHeight / img.height)
        this.initWidth = img.width * rate
        this.initHeight = img.height * rate
      }
      this.$nextTick(() => {
        this.showPreview = true
      })
    },
    /**
     * 删除上传文件
     */
    onFileRemove(file) {
      this.$refs.upload.remove(file)
    },
    /**
     * 切换语言
     */
    onLangChange(e) {
      if (e !== this.langIndex) {
        this.langIndex = e
      }
    },
    /**
     * 点击价格TAB
     */
    onPriceClick() {
      this.showDialog = true
    },
    /**
     * 点击API TAB
     */
    onApiClick() {
      this.showDialog = true
    },
    /**
     * 点击登录/用户中心 TAB
     */
    onLogin() {
      this.showLogin = true
    },
    onLoginClose() {
      this.$refs.form.reset()
    },
    onSubmit() {
      const valid = this.$refs.form.validate()
      if (valid) {
        const params = {
          email: this.email,
          pws: this.pwd,
          ty: this.isRegister ? 2 : 1,
        }
        login(params)
          .then((res) => {
            this.setUserInfo(res.data)
            this.showLogin = false
          })
          .catch((e) => {
            this.$toast.error(e.message)
          })
      }
    },
    onLogout() {
      this.removeUserInfo()
    },
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
      }
      this.showFullScreen = true
    },
  },
}
</script>

<style scoped lang="scss">
.v-sheet {
  &.border-dash {
    border: 2px dashed #e5e5e5;
    border-radius: 8px;
  }
}
.d-rela {
  position: relative;
  overflow: hidden;
}
.tag-after {
  position: absolute;
  right: 16px;
  bottom: 16px;
}
.before-img {
  position: relative;
  /* z-index: 1; */
  img {
    width: 100%;
  }
}

.after-img {
  position: absolute;
  left: 0;
  top: 0;
  /* z-index: 0; */
  overflow: hidden;
}
.tag-before {
  position: absolute;
  left: 16px;
  bottom: 16px;
  z-index: 0;
}
.card-slider {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.product-tag {
  position: absolute;
  left: 16px;
  top: 16px;
}
::v-deep .v-label {
  font-size: 12px;
}
.login-spacer {
  width: 100%;
  position: relative;
  height: 1px;
  margin-top: 30px;
  background-color: rgba($color: #000000, $alpha: 0.1);
  .login-spacer-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 10px;
    font-size: 13px;
    color: #999;
    z-index: 2;
    background-color: #fff;
  }
}
.qrcode-tip {
  padding-bottom: 16px;
  font-size: 13px;
  color: #333;
  text-align: center;
}
</style>
