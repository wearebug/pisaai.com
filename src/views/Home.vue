<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <v-container class="d-flex justify-space-between pa-0">
        <div class="d-flex align-center pa-0">
          <v-img alt="高光照片优化" class="shrink" contain src="../assets/logo.png" transition="scale-transition" width="120" eager />
          <!-- <h1 class="ml-4 text-h6">{{ $vuetify.lang.t('$vuetify.name') }}</h1> -->
        </div>
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
          <v-btn text large @click="onPriceClick">
            <span>{{ $vuetify.lang.t('$vuetify.functionTxt[0]') }}</span>
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
          <v-menu offset-y nudge-top="-10" nudge-right="20" v-if="userInfo">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" fab class="head_img_btn">
                <!-- <span>{{ $vuetify.lang.t('$vuetify.userTxt') }}</span> -->
                <!-- <v-icon size="16">mdi-chevron-down</v-icon> -->
                <v-img :src="userInfo.headimgurl || require('../assets/head_img.png')" class="head_img"></v-img>
              </v-btn>
            </template>
            <v-list flat>
              <v-list-item-group color="primary">
                <v-list-item>
                  <v-list-item-title v-text="$vuetify.lang.t('$vuetify.vipNumTxt') + (userNumews || 0)"></v-list-item-title>
                </v-list-item>
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
          <!-- <h1 class="my-4 text-h4">{{ $vuetify.lang.t('$vuetify.name') }}</h1> -->
          <p class="text--secondary text-justify">{{ $vuetify.lang.t('$vuetify.synopsis') }}</p>
        </v-sheet>
        <v-sheet tag="section" v-if="files.length == 0" class="d-flex align-center justify-center pt-7 pb-7 pt-md-12 pb-md-12 border-dash">
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
            <v-btn class="mt-5 mb-5" color="primary" dark large>
              {{ $vuetify.lang.t('$vuetify.btnTxt') }}
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </file-upload>
        </v-sheet>
        <v-sheet tag="section" v-else class="continue-upload d-flex align-center justify-between">
          <div class="check_all">
            <v-checkbox
              v-model="checkedAllItem"
              :label="$vuetify.lang.t('$vuetify.pic.checkAll')"
              value="all"
              @click="checkedAll"
              class="continue-upload-check"
            ></v-checkbox>
            <!-- <p style="color: #db8819;">{{ $vuetify.lang.t('$vuetify.pic.checkAll') }}</p> -->
          </div>
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
            <v-btn class="mt-5 mb-5" color="primary" dark large>
              <!-- <v-icon left dark large style="margin-right: 14px;">mdi-cloud-upload</v-icon> -->
              <v-img src="../assets/continue-upload.png" style="margin-right: 14px; width: 24px; height: 24px"></v-img>
              {{ $vuetify.lang.t('$vuetify.pic.upload') }}
            </v-btn>
          </file-upload>

          <div class="delete_all d-flex align-center justify-center">
            <v-img src="../assets/delete_all.png" style="margin-right: 14px; width: 24px; height: 27px"></v-img>
            <p style="margin-bottom: 0" @click="deleteAllItem">{{ $vuetify.lang.t('$vuetify.pic.cancel') }}</p>
          </div>
        </v-sheet>
        <v-list three-line v-if="files.length" class="pic_list">
          <v-list-item v-for="item in files" :key="item.id" style="border-bottom: 1px solid #c9cbce">
            <v-list-item-avatar class="list_item_head_box" rounded  style="padding-top: 15px;padding-bottom: 37px;">
              <v-checkbox v-model="checkedItem" label="" :value="item.id"></v-checkbox>
              <v-img :src="item.blob" style="height:100%"></v-img>
            </v-list-item-avatar>
            <v-list-item-content style="padding: 35px 0 0;padding-top: 15px;">
              <v-list-item-title>
                <v-progress-linear :value="item.response.code === 200 ? item.progress : 0" height="6"></v-progress-linear>
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
                        <v-btn class="mr-2 mb-1" small color="#FBB03B" style="color: #fff" @click="onContinue(item)">
                          {{ $vuetify.lang.t('$vuetify.upload.btn[4]') }}
                        </v-btn>
                        <div>
                          <v-btn class="mr-2 mb-1" small color="primary" @click="onFilePreview(item.status)">
                            {{ $vuetify.lang.t('$vuetify.upload.btn[2]') }}
                          </v-btn>
                          <v-btn class="mr-2 mb-1" small color="primary" @click="onFileDownload(item.response)">
                            {{ $vuetify.lang.t('$vuetify.upload.btn[1]') }}
                          </v-btn>
                          <v-btn class="mb-1" small color="#333333" style="color: #fff" @click="onFileRemove(item)">
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
        <v-sheet tag="section" class="mb-8">
          <h1 class="my-8 text-h5 text-md-h4 text-center">FAQ</h1>
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-2">
                {{ $vuetify.lang.t('$vuetify.problem[0].title') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text-body-2">{{ $vuetify.lang.t('$vuetify.problem[0].info1') }}</p>
                <v-img src="../assets/faq1.jpg" eager></v-img>
                <p class="mt-4 text-justify text-body-2" v-html="$vuetify.lang.t('$vuetify.problem[0].info2')"></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-2">
                {{ $vuetify.lang.t('$vuetify.problem[1].title') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text-body-2">{{ $vuetify.lang.t('$vuetify.problem[1].info') }}</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-2">
                {{ $vuetify.lang.t('$vuetify.problem[2].title') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text-body-2" v-html="$vuetify.lang.t('$vuetify.problem[2].info')"></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-2">
                {{ $vuetify.lang.t('$vuetify.problem[3].title') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text-body-2">{{ $vuetify.lang.t('$vuetify.problem[3].info') }}</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-2">
                {{ $vuetify.lang.t('$vuetify.problem[4].title') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text-body-2" v-html="$vuetify.lang.t('$vuetify.problem[4].info')"></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" class="text-subtitle-2">
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
    <v-footer color="black" padless>
      <v-row justify="center" no-gutters>
        <v-btn v-for="(link, i) in links" :key="link" color="white" text rounded class="my-2" @click="onShowFullscreen(i)">
          {{ link }}
        </v-btn>
        <!--v-col class="py-4 text-center white--text text-body-2" cols="12">
          {{ $vuetify.lang.t('$vuetify.copyrightTxt') }}
        </v-col-->
      </v-row>
    </v-footer>
    <v-dialog v-model="showDialog" max-width="960">
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
                      <v-btn color="success" rounded block @click="onWechatPayPackage(item.id)">
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
    <v-dialog v-model="showLogin" transition="dialog-bottom-transition" max-width="720">
      <v-card>
        <v-tabs active-class="primary" background-color="black" align-with-title dark hide-slider>
          <v-tab>微信扫码登录</v-tab>
          <v-tab>邮箱密码登录</v-tab>
          <v-tab-item>
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
                <v-col class="d-flex justify-center" cols="12" md="6">
                  <wxlogin
                    appid="wx4f357b743df13731"
                    scope="snsapi_login"
                    theme="'black'"
                    :redirect_uri="encodeURIComponent('http://pisaai.com')"
                  ></wxlogin>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
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
                  <form>
                    <v-text-field
                      v-model="email"
                      :error-messages="emailErrors"
                      label="邮箱"
                      required
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                    ></v-text-field>
                    <v-text-field
                      v-model="pwd"
                      type="password"
                      :error-messages="pwdErrors"
                      label="密码"
                      required
                      @input="$v.pwd.$touch()"
                      @blur="$v.pwd.$touch()"
                    ></v-text-field>
                    <v-checkbox v-model="isRegister" label="创建新的账户"></v-checkbox>

                    <v-btn class="my-4" block color="primary" @click="onSubmit">登录</v-btn>
                  </form>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showOption" max-width="720" persistent>
      <v-card>
        <v-tabs v-model="optionsTab" active-class="primary" background-color="black" align-with-title dark hide-slider>
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
      <v-card class="p-rela" :max-width="initWidth" :height="initHeight">
        <v-row class="toolbar" :style="{ top: toolbarTop + 'px' }">
          <v-btn class="mx-4" icon color="white" @click="onPlus">
            <v-icon>mdi-magnify-close</v-icon>
          </v-btn>
          <v-btn class="mx-4" icon color="white" @click="onMinus">
            <v-icon>mdi-magnify-minus</v-icon>
          </v-btn>
          <v-btn class="mx-4" icon color="white" @click="onFileDownload(previewFile)">
            <v-icon>mdi-file-download</v-icon>
          </v-btn>
        </v-row>
        <preview-scale
          :initWidth="initWidth"
          :initHeight="initHeight"
          :iconUrl="previewFile.wmk_url"
          :srcUrl="previewFile.src_url"
          :scaleRatio="scaleRatio"
        />
      </v-card>
    </v-dialog>
    <v-dialog v-model="showQrcode" max-width="320">
      <v-card>
        <vue-qr :correctLevel="3" :text="qrcodeUrl" :size="320"></vue-qr>
        <div class="qrcode-tip">微信扫码下载高清无水印图</div>
      </v-card>
    </v-dialog>
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
  </v-app>
</template>

<script>
const CARD_BEFORE1 = require('../assets/contrast1-1.jpg')
const CARD_BEFORE2 = require('../assets/contrast2-1.jpg')
const CARD_BEFORE3 = require('../assets/contrast3-1.jpg')
const CARD_BEFORE4 = require('../assets/contrast4-1.jpg')
const CARD_AFTER1 = require('../assets/contrast1-2.jpg')
const CARD_AFTER2 = require('../assets/contrast2-2.jpg')
const CARD_AFTER3 = require('../assets/contrast3-2.jpg')
const CARD_AFTER4 = require('../assets/contrast4-2.jpg')
import { mapState, mapMutations } from 'vuex'
import VueQr from 'vue-qr'
import wxlogin from 'vue-wxlogin'
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import PreviewScale from '@/components/PreviewScale'
import { getfilesize, isMobile, isWechat, checkSeoTab } from '@/utils'
import { fileDownload, getFileStatus, wechatPay, getOrderStataus, login, wechatLogin, packagePay, packageStatus,photoUserfinace } from '@/api/home'
export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    pwd: { required, minLength: minLength(6) },
  },
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
  name: 'Home',
  components: {
    VueQr,
    wxlogin,
    PreviewScale,
  },
  filters: {
    getFileSize(size) {
      return getfilesize(size)
    },
  },
  data() {
    return {
      channel: 'HILI',
      timer: null,
      timer1: null,
      timer1Count: 0,
      timer2: null,
      timer2Count: 0,
      postAction: 'https://sdkphoto.fangtangtv.com/api/toc/uploads',
      postData: {},
      file: null,
      files: [],
      checkedAllItem: [],
      checkedItem: [],
      thread: 3,
      multiple: true,
      accept: 'image/png,image/gif,image/jpeg,image/webp',
      extensions: 'gif,jpg,jpeg,png,webp',
      showOption: false,
      showPreview: false,
      previewFile: {
        wmk_url: '',
        src_url: '',
      },
      optionsTab: 0,
      optionTabs: [
        {
          id: 'colour',
          name: '彩照优化',
          typeValue: 'people',
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
          typeValue: 'people',
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
          bgValue: 'blue',
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
          bgValue: 'white',
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
      cardPercents: [50, 50, 50, 50],
      showFullScreen: false,
      fullscreenTitle: '',
      fullscreenHtml: '',
      winWidth: 0,
      winHeight: 0,
      initWidth: 0,
      initHeight: 0,
      scaleRatio: 1,
      email: '',
      pwd: '',
      isRegister: false,

      isWechatLogin: false, // 是否微信扫码登录
      wechatHead: '',
      isUploadAgain: false, // 是否再次处理上传
      uploadAgainItem: '',
      uploadAgainItemMdf: '',
      cards: [
        {
          before: CARD_BEFORE1,
          after: CARD_AFTER1,
          icon: 'mdi-image-area',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[0]'),
        },
        {
          before: CARD_BEFORE2,
          after: CARD_AFTER2,
          icon: 'mdi-palette',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[1]'),
        },
        {
          before: CARD_BEFORE3,
          after: CARD_AFTER3,
          icon: 'mdi-account-box',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[2]'),
        },
        {
          before: CARD_BEFORE4,
          after: CARD_AFTER4,
          icon: 'mdi-fullscreen-exit',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[3]'),
        },
      ],
    }
  },
  watch: {
    langIndex(value) {
      if (value >= 0) {
        this.curLang = this.langs[value]
        this.$vuetify.lang.current = this.curLang.id
        this.cards = [
          {
            before: CARD_BEFORE1,
            after: CARD_AFTER1,
            icon: 'mdi-image-area',
            tag: this.$vuetify.lang.t('$vuetify.contrastType[0]'),
          },
          {
            before: CARD_BEFORE2,
            after: CARD_AFTER2,
            icon: 'mdi-palette',
            tag: this.$vuetify.lang.t('$vuetify.contrastType[1]'),
          },
          {
            before: CARD_BEFORE3,
            after: CARD_AFTER3,
            icon: 'mdi-account-box',
            tag: this.$vuetify.lang.t('$vuetify.contrastType[2]'),
          },
          {
            before: CARD_BEFORE4,
            after: CARD_AFTER4,
            icon: 'mdi-fullscreen-exit',
            tag: this.$vuetify.lang.t('$vuetify.contrastType[3]'),
          },
        ]
      }
    },
    files: {
      handler(value) {
        console.log(value)
      },
      deep: true,
    },
    checkedItem(newVal, oldVal) {
      // alert(JSON.stringify(newVal))
      if (newVal.length == this.files.length) {
        this.checkedAllItem = ['all']
      } else {
        this.checkedAllItem = []
      }
    },
  },
  computed: {
    ...mapState(['userInfo','userNumews']),
    prices() {
      const functionPrice = this.$vuetify.lang.locales[this.curLang.id].functionPrice
      const priceIds = ['PcToBNums3', 'PcToBNums10', 'PcToBNums50', 'PcToBNums200']
      return functionPrice.map((v, i) => {
        return { ...v, id: priceIds[i] }
      })
    },
    links() {
      return [
        this.$vuetify.lang.t('$vuetify.menu[3]'),
        this.$vuetify.lang.t('$vuetify.privacyTxt'),
        this.$vuetify.lang.t('$vuetify.agreementTxt'),
      ]
    },
    toolbarTop() {
      let top = (this.winHeight - this.initHeight) / 2
      return top <= 22 ? 22 : top
    },
    pwdErrors() {
      const errors = []
      if (!this.$v.pwd.$dirty) return errors
      !this.$v.pwd.required && errors.push('请输入密码')
      !this.$v.pwd.minLength && errors.push('请输入至少6位数密码')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('邮箱格式有误')
      !this.$v.email.required && errors.push('请输入邮箱')
      return errors
    },
  },
  created() {
    let langIndex = this.langs.findIndex((v) => v.id === this.$vuetify.lang.current)
    this.langIndex = langIndex
    this.getWechatLoginCode()
    let seoTab = checkSeoTab()
    if (seoTab == 'enhance') {
      // 彩色照片优化
      this.optionsTab = 0
      this.cards = [
        {
          before: CARD_BEFORE1,
          after: CARD_AFTER1,
          icon: 'mdi-image-area',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[0]'),
        },
      ]
    } else if (seoTab == 'color') {
      // 黑白照片上色
      this.optionsTab = 1
      this.cards = [
        {
          before: CARD_BEFORE2,
          after: CARD_AFTER2,
          icon: 'mdi-palette',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[1]'),
        },
      ]
    } else if (seoTab == 'changeBG') {
      // 证件照换背景
      this.optionsTab = 2
      this.cards = [
        {
          before: CARD_BEFORE3,
          after: CARD_AFTER3,
          icon: 'mdi-account-box',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[2]'),
        },
      ]
    } else if (seoTab == 'deadee') {
      // 遗像照
      this.optionsTab = 3
      this.cards = [
        {
          before: CARD_BEFORE4,
          after: CARD_AFTER4,
          icon: 'mdi-fullscreen-exit',
          tag: this.$vuetify.lang.t('$vuetify.contrastType[3]'),
        },
      ]
    }
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
    ...mapMutations(['setUserInfo', 'removeUserInfo', 'setNumew']),
    getWechatLoginCode() {
      const code = this.getUrlParam()
      if (code) {
        this.wechatLogin(code)
      }

      this.getPhonrDs()


    },
    getUrlParam(name = 'code') {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let rrr = decodeURIComponent(window.location.search)
      let r = rrr.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    onResize() {
      setTimeout(() => {
        this.staticImgWidth = this.$refs.staticImg[0].offsetWidth
        this.staticImgHeight = this.$refs.staticImg[0].offsetHeight
      }, 0)
      this.winHeight = window.innerHeight - window.innerHeight / 10 - 44 // 屏幕高度
      this.winWidth = window.innerWidth - 48 // 屏幕宽度
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
      console.log('newFile', newFile)
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
      console.log('file', file)
      if (file.response.mdfs) {
        const { mdfs } = file.response
        getFileStatus({ mdf: mdfs[0], platform: isMobile() ? 'h5' : 'pc' })
          .then((res) => {
            if (res.mdfs[0].src_url) {
              // file.status = res.mdfs[0]
              this.$refs.upload.update(file, { active: false, status: res.mdfs[0] })
              clearInterval(this.timer)
            } else {
              // file.status = res.mdfs[0]
              this.$refs.upload.update(file, { status: res.mdfs[0] })
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
      if (this.optionsTab === 0 || this.optionsTab === 1) {
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
      console.log('data', data)
      this.postData = { ...data, platform: isMobile() ? 'h5' : 'pc', token: this.userInfo?.token }
      if (this.isUploadAgain) {
        let aa = this.$refs.upload.update(this.$refs.upload.add(this.uploadAgainItem), {
          active: true,
          success: false,
          response: {},
          status: {},
          data: { ...this.postData, mdf: this.uploadAgainItemMdf },
        })
        console.log('aa', aa)
        this.getFileStatusProgress(aa)
        this.isUploadAgain = false
      } else {
        // let oldFile = this.files[0]
        this.files.forEach((v) => {
          if (!v.success) {
            this.$refs.upload.update(v.id, {
              active: true,
              data: this.postData,
            })
          }
        })
      }
      this.showOption = false
    },
    /**
     * 取消上传文件
     */
    onUploadCancel() {
      if (this.isUploadAgain) {
        this.files.shift()
      } else {
        this.files.forEach((v) => {
          if (!v.success) {
            this.$refs.upload.remove(v)
          }
        })
      }
      this.isUploadAgain = false
      this.showOption = false
    },
    // 删除全部
    deleteAllItem() {
      if (this.checkedAllItem.length == 1) {
        this.files = []
      }
    },
    checkedAll() {
      if (this.checkedAllItem.indexOf('all') > -1) {
        this.checkedItem = []
        this.files.forEach((ele) => {
          this.checkedItem.push(ele.id)
        })
      } else {
        this.checkedItem = []
      }
    },
    /**
     * 下载上传文件
     */
    async onFileDownload(response) {
      const mdf = response.mdf || response.mdfs[0]
      try {
        await fileDownload(mdf)
        const url = `https://sdkphoto.fangtangtv.com/api/toc/download/${mdf}`
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
        channel: this.channel,
        mdf: response.mdf || response.mdfs[0],
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
    async onWechatPayPackage(id) {
      if (this.userInfo) {
        try {
          const data = {
            fd: isMobile() ? 'h5' : 'pc',
            token:
              this.userInfo?.token ||
              'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJmZCI6InBjIiwic3ViIjoiNDU4NDA0MTk3QHFxLmNvbSIsInVpZCI6ODUyMH0.utfh-gpwheIAl5oH6HYOW2mWAFWy8Xv7-QLbFkp-OcF8Q0C-u5pjlHRACwoG67vEqTEC5Qus1vA0LVYPICmSMg',
            goodsid: id,
          }
          const res = await packagePay(data)
          const { order_id, url } = res.data
          this.qrcodeUrl = url
          this.showQrcode = true
          if (order_id) {
            this.getPackageOrderStataus(order_id)
          }
        } catch (e) {
          this.$toast.error(e.msg)
        }
      } else {
        this.showLogin = true
      }
      // const data = {
      //   goodsid: id,
      //   channel: this.channel,
      // }
      // wechatPay(data)
      //   .then((res) => {
      //     const { url } = res.data
      //     this.qrcodeUrl = url
      //     this.showQrcode = true
      //   })
      //   .catch((e) => {
      //     this.$toast.error(e.msg)
      //   })
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
    getPackageOrderStataus(order_id) {
      packageStatus({ order_id })
        .then((res) => {
          if (res.data.is_pay === 2) {
            this.getPackageOrderResult(order_id)
          }
        })
        .catch((e) => {
          this.$toast.error(e.msg)
        })
    },
    getPackageOrderResult(order_id) {
      this.timer2 = setInterval(() => {
        this.timer2Count += 1
        if (this.timer2Count >= 30) {
          clearInterval(this.timer2)
          this.timer2Count = 0
        }
        packageStatus({ order_id })
          .then((res) => {
            if (res.data.is_pay !== 2) {
              this.timer2Count = 0
              clearInterval(this.timer2)
              this.$toast.success(res.msg)
              this.showQrcode = false
            }
          })
          .catch((e) => {
            this.timer2Count = 0
            clearInterval(this.timer)
          })
      }, 2000)
    },
    /**
     * 预览上传文件
     */
    onFilePreview(fileObj) {
      console.log(fileObj)
      this.previewFile = fileObj
      let img = new Image()
      img.src = this.previewFile.wmk_url
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
     * 点击登录/用户中心 TAB
     */
    onLogin() {
      this.showLogin = true
    },
    async wechatLogin(code) {

      let gdsa = () => {
        this.getPhonrDs()
      }
      try {
        const res = await wechatLogin({ code, channel:'pisaAI' })
        this.setUserInfo(res.data)
        this.wechatHead = res.data.headimgurl
        this.isWechatLogin = true
        this.$toast.success('登录成功')
        gdsa()
      } catch (e) {
        gdsa()
        // this.$toast.error(e.message)
      }


    },
    // 查看剩余点数
    getPhonrDs() {
        if (this.userInfo) {
            photoUserfinace({
              token: this.userInfo.token,
              channel: 'pisaAI',
              ver:2
            }).then(res=>{
              this.setNumew(res.data.nums ? res.data.nums : 0)
            })
        }
    },
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const data = {
          email: this.email,
          pws: this.pwd,
          ty: this.isRegister ? 2 : 1,
        }
        login(data)
          .then((res) => {
            this.setUserInfo(res.data)
            this.isWechatLogin = false
            this.$toast.success('登录成功')
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
    onGetTaskList() {},
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
    onPlus() {
      if (this.scaleRatio.toFixed() > 4) return
      this.scaleRatio += 0.1
    },
    onMinus() {
      if (this.scaleRatio.toFixed(1) < 0.1) return
      this.scaleRatio -= 0.1
    },
    onContinue(item) {
      // this.$refs.upload.update(item, {
      //   active: true,
      //   success: false,
      //   response: {},
      //   status: {},
      //   data: { ...item.data, mdf: item.response.mdfs[0] },
      // })
      this.isUploadAgain = true
      this.uploadAgainItemMdf = item.response.mdfs[0]
      this.uploadAgainItem = item.file
      this.showOption = true
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
  right: 0;
  bottom: 24px;
  height: 30px;
  padding: 0 20px !important;
  border-radius: 0 !important;
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
.p-rela {
  position: relative;
}
.toolbar {
  position: fixed;
  left: 50%;
  /* top: 22px; */
  height: 44px;
  line-height: 44px;
  transform: translateX(-50%);
}

.head_img_btn {
  width: 40px !important;
  height: 40px !important;
  border-radius: 40px;

  .head_img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }
}
.continue-upload {
  height: 52px;
  padding-left: 44px;
  padding-right: 62px;
  background-color: #db8819;
  font-size: 18px;
  color: #fff;
  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;
  .continue-upload-check {
    ::v-deep .v-icon {
      color: #fff !important;
    }
    ::v-deep .v-label {
      font-size: 18px;
      color: #fff;
      font-family: Work Sans;
      font-style: normal;
      font-weight: 600;
    }
    .primary--text {
      color: #fff !important;
      caret-color: #fff !important;
    }
  }
  .v-btn--is-elevated {
    box-shadow: none;
    font-size: 18px;
    color: #fff;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 600;
  }
}
.justify-between {
  justify-content: space-between;
}

.pic_list {
  padding: 0;
  .v-list-item {
    height: 175px;
    padding-left: 38px !important;

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
      }
    }

    .btns-box {
      .v-btn {
        font-family: Work Sans;
        font-style: normal;
        font-size: 18px;
        box-shadow: none;
        padding: 0px 27px;
        border-radius: 0px;
      }
    }
  }
}
</style>
