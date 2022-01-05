<template>
  <v-app>
    <Header />
    <!--    移动端导航栏-->
    <MenuNav />
    <v-main style="max-width: 1080px; margin: auto">
      <v-container>
        <v-sheet color="white" tag="section">
          <p style="text-align: center">{{ $vuetify.lang.t('$vuetify.synopsis') }}</p>
        </v-sheet>
        <!--上传按钮-->
        <v-sheet v-if="!files.length" tag="section" class="d-flex align-center justify-center pt-7 pb-7 pt-md-12 pb-md-12 border-dash">
          <file-upload
            ref="upload"
            v-model="files"
            :multiple="false"
            :thread="thread"
            :post-action="postAction"
            :data="postData"
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
        <!--继续上传-->
        <v-sheet tag="section" v-else class="continue-upload d-flex align-center justify-between">
          <div class="check_all">
            <v-checkbox
              v-model="checkedAllItem"
              :label="$vuetify.lang.t('$vuetify.pic.checkAll')"
              value="all"
              @click="checkedAll"
              class="continue-upload-check"
            />
            <!-- <p style="color: #db8819;">{{ $vuetify.lang.t('$vuetify.pic.checkAll') }}</p> -->
          </div>
          <file-upload
            ref="upload"
            v-model="files"
            :thread="thread"
            :multiple="false"
            :post-action="postAction"
            :data="postData"
            :extensions="extensions"
            :accept="accept"
            @input-file="inputFile"
            @input-filter="inputFilter"
          >
            <v-btn class="mt-5 mb-5" color="primary" dark large>
              <v-img src="@/assets/continue-upload.png" style="margin-right: 14px; width: 24px; height: 24px"></v-img>
              {{ $vuetify.lang.t('$vuetify.pic.upload') }}
            </v-btn>
          </file-upload>
          <!--删除按钮-->
          <div class="delete_all d-flex align-center justify-center">
            <v-img src="@/assets/delete_all.png" style="margin-right: 14px; width: 24px; height: 27px"></v-img>
            <p style="margin-bottom: 0" @click="deleteAllItem">{{ $vuetify.lang.t('$vuetify.pic.cancel') }}</p>
          </div>
        </v-sheet>
        <div style="text-align: center; position: relative" v-if="!files.length">
          <p style="top: -50px; position: relative; color: #519eff">
            {{ $vuetify.lang.t('$vuetify.uploadBtnTips') }}
          </p>
        </div>

        <!--任务列表-->
        <v-list three-line v-if="files.length" class="pic_list">
          <v-list-item v-for="item in files" :key="item.id" style="border-bottom: 1px solid #c9cbce">
            <v-list-item-avatar class="list_item_head_box" rounded style="padding-top: 15px; padding-bottom: 37px">
              <v-checkbox v-model="checkedItem" label="" :value="item.id" />
              <v-img :src="item.thumb" style="height: 100%" @click="onFilePreview(item.status, item)" />
            </v-list-item-avatar>
            <v-list-item-content style="padding: 35px 0 0; padding-top: 15px">
              <v-list-item-title>
                <v-progress-linear ref="_progress" :value="getProcessNumber(item)" height="6" />
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption font-weight-light d-flex align-center justify-between">
                <div style="font-family: Work Sans; font-style: normal; font-size: 14px; color: #999">
                  <span>{{ `${item.width}x${item.height}px` }}</span>
                  <v-divider class="mx-2" vertical style="height: 16px" />
                  <span>{{ item.size | getFileSize }}</span>
                  <v-divider class="mx-2" vertical style="height: 16px" />
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
                          <v-btn class="mr-2 mb-1" small color="primary" @click="onShareClick(item.status, item)">
                            {{ $vuetify.lang.t('$vuetify.shareText') }}
                          </v-btn>
                          <v-btn class="mr-2 mb-1" small color="primary" @click="onFilePreview(item.status, item)">
                            {{ $vuetify.lang.t('$vuetify.upload.btn[2]') }}
                          </v-btn>
                          <v-btn class="mr-2 mb-1" small color="primary" @click="onFileDownload(item.response, item)" id="list-download">
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

        <!--示例图-->
        <ExampleList ref="exampleList" />
        <!--FAQ-->
        <FAQ />
      </v-container>
    </v-main>

    <!--价格弹窗-->
    <PriceModal :onPay="onShowPay" />
    <!--登录弹窗-->
    <LoginModal />
    <!--图片编辑弹窗-->
    <ImageEditModal
      ref="ImageEditModal"
      :img-src="imgSrc"
      :onOk="onImageEditOk"
      :value="showImageEditModal"
      :onCancel="onImageEditCancel"
      :files="files"
    />

    <ImageOptionModal :value="showImageOptionModal" :onOk="onUploadConfirm" :onCancel="onUploadCancel" />
    <!--付款二维码弹窗-->
    <QrcodeModal :qrcodeUrl="qrcodeUrl" />

    <!--查看结果-->
    <v-dialog v-model="showPreview" :max-width="initWidth">
      <v-card class="p-rela" :max-width="initWidth" :height="initHeight">
        <v-row class="toolbar" :style="{ top: toolbarTop + 'px' }">
          <v-btn class="mx-4" icon color="white" @click="onPlus">
            <v-icon>mdi-magnify-plus</v-icon>
          </v-btn>
          <v-btn class="mx-4" icon color="white" @click="onMinus">
            <v-icon>mdi-magnify-minus</v-icon>
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

    <!--    分享弹窗-->
    <ShareModal :id="shareId" v-model="showShare" :show-share="showShare" :on-close="onCloseShareModal" />

    <Footer />
  </v-app>
</template>

<script>
import lodash from 'lodash'
import Header from '@/components/Header'
import { mapState, mapMutations } from 'vuex'
import { getfilesize, isMobile, checkSeoTab } from '@/utils'
import {
  fileDownload,
  loginGetStatus,
  getFileStatus,
  wechatPay,
  chaundibs,
  getOrderStataus,
  login,
  wechatLogin,
  packagePay,
  packageStatus,
  photoUserfinace,
  photoPhotopay,
  tocDownload,
} from '@/api/home'
import PriceModal from '@/components/PriceModal'
import LoginModal from '@/components/LoginModal'
import QrcodeModal from '@/components/QrCodeModal'
import MenuNav from '@/components/MenuNav'
import ImageEditModal from './components/ImageEditModal'
import ImageOptionModal from './components/ImageOptionModal'
import Footer from '../../components/Footer'
import ExampleList from './components/ExampleList'
import FAQ from './components/FAQ'
import { seoTab_arr } from '../../utils/contants'
import PreviewScale from '@/components/PreviewScale'
import ShareModal from '@/components/ShareModal'

const payok = new Array()
let PROCESS_NUMBER = 30
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
  name: 'Home',
  components: {
    ShareModal,
    FAQ,
    ExampleList,
    Footer,
    ImageOptionModal,
    ImageEditModal,
    MenuNav,
    QrcodeModal,
    LoginModal,
    PriceModal,
    Header,
    PreviewScale,
  },

  watch: {
    files: {
      handler(value) {
        console.log('flies', value[0])
        //刷新本地保存的任务状态
        if (value.length) {
          //this.files1 = cloneDeep(value).reverse()
          //this.files = value.sort((a, b) => a.file.lastModified - b.file.lastModified)
          localStorage.setItem('FILE_RECORDS', JSON.stringify(value))
        } else {
          localStorage.removeItem('FILE_RECORDS')
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(['userInfo', 'userNumews', 'userExDate', 'showQrcode', 'langIndex', 'channel']),
    toolbarTop() {
      let top = (this.winHeight - this.initHeight) / 2
      return top <= 22 ? 22 : top
    },
  },
  data() {
    return {
      mobelLoginInfo: {
        headimgurl: '',
        nickname: '',
      },
      timer: null,
      timer1: null,
      timer1Count: 0,
      timer2: null,
      timer2Count: 0,
      postAction: 'https://sdkphoto.fangtangtv.com/api/toc/uploads',
      postData: {},
      file: null,
      files: [],
      files1: [],
      checkedAllItem: [],
      checkedItem: [],
      thread: 3,
      accept: 'image/png,image/gif,image/jpeg,image/webp',
      extensions: 'png,gif,jpg,jpeg,webp',
      showPreview: false,
      optionsTab: 0,
      wechatHead: '',
      isUploadAgain: false, // 是否再次处理上传
      uploadAgainItem: '',
      uploadAgainItemMdf: '',
      showImageEditModal: false,
      showImageOptionModal: false,
      imgSrc: '',
      // tasklist-----------
      lodash: lodash,
      findItem: {},
      previewFile: {
        wmk_url: '',
        src_url: '',
      },
      initWidth: 0,
      initHeight: 0,
      winWidth: 0,
      winHeight: 0,
      scaleRatio: 1,
      qrcodeUrl: '', //支付二维码
      isWechatLogin: false, // 是否微信扫码登录
      shareId: '',
      showShare: false,
    }
  },
  methods: {
    ...mapMutations(['removeUserInfo', 'setNumew', 'setExDate', 'save', 'setUserInfo']),

    onCloseShareModal(e) {
      console.log(12313, e)
      this.showShare = e
    },
    onShowPay(url, order_id) {
      this.qrcodeUrl = url
      this.save({ key: 'showQrcode', payload: true })
      if (order_id) {
        this.getPackageOrderStataus(order_id)
      }
    },
    onImageEditOk(v) {
      console.log('onImageEditOk', v)
      this.files.splice(this.files.length - 1, 1, v)
      //this.files.shift(v)
      this.showImageEditModal = false
      this.showImageOptionModal = true
    },
    onImageEditCancel() {
      this.files.splice(0, 1)
      this.showImageEditModal = false
    },
    getWechatLoginCode() {
      const code = this.getUrlParam()
      console.log(code)
      if (code) {
        this._wechatLogin(code)
      }
      //this.getPhonrDs()
      this.tongbudian() // 点数
    },
    getUrlParam(name = 'code') {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let rrr = decodeURIComponent(window.location.search)
      let r = rrr.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },

    async inputFilter(newFile, oldFile, prevent) {
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

      function getImageSize(imgSrc) {
        return new Promise((resolve, reject) => {
          const newImg = new Image()
          newImg.onload = () => {
            resolve([newImg.width, newImg.height])
          }
          newImg.onerror = (err) => {
            reject(err)
          }
          newImg.src = imgSrc
        })
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
      //添加或者更新的时候(后置到剪裁时检查）
      // if (oldFile || (oldFile && newFile)) {
      //   try {
      //     getImageSize(newFile.blob).then((res) => {
      //       //if (res[0] > 800 || res[1] > 800) {
      //       if (res[0] > 3000 || res[1] > 3000) {
      //         _hmt.push(['_trackEvent', 'pisaai', 'www', 'error800']) //百度埋点统计
      //         //this.$toast.error(this.$vuetify.lang.t('$vuetify.error800'))
      //         //this.onUploadCancel()
      //       }
      //     })
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
    },
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // this.showOption = true
        this.$nextTick(() => {
          this.imgSrc = newFile.blob
          console.log(12123123)
          this.$refs.ImageEditModal.$refs.cropper.replace(newFile.blob)
        })
        this.showImageEditModal = true
        _hmt.push(['_trackEvent', 'pisaai', 'www', 'showTask']) //百度埋点统计
      }
      if (!newFile && oldFile) {
        this.showImageOptionModal = false
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
      //console.log('getfilestatusprogress:', file)
      if (file && file.response.mdfs) {
        const { mdfs } = file.response
        getFileStatus({ mdf: mdfs[0], platform: isMobile() ? 'h5' : 'pc' })
          .then((res) => {
            //设置进度条
            //this.$refs.upload.progress = 0

            if (res.mdfs[0].code == 1) {
              //任务完成
              // file.status = res.mdfs[0]
              this.$refs.upload.update(file, { active: false, status: res.mdfs[0] })
              //_hmt.push(['_trackEvent', 'pisaai', 'www', 'repaired']) //百度埋点统计
              clearInterval(this.timer)
            } else if (res.mdfs[0].code == 2) {
              //任务处理失败
              this.$refs.upload.update(file, { active: false, status: res.mdfs[0] })
              clearInterval(this.timer)
            } else {
              this.$refs.upload.update(file, { status: res.mdfs[0] })
              this.timer = setTimeout(() => {
                this.getFileStatusProgress(file)
              }, 2000)
            }
          })
          .catch((e) => {
            this.$toast.error(e.msg)
            clearInterval(this.timer)
            this.$refs.upload.remove(file)
          })
      }
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
      this.showImageOptionModal = false
    },
    /**
     * 确认上传文件
     */
    onUploadConfirm(opt, index) {
      //const opt = this.optionTabs[this.optionsTab]
      this.optionsTab = index
      const bgMap = {
        transparent: -1,
        grey: 1,
		nrcms: 2,
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

      //console.log('data', data)
      this.postData = {
        ...data,
        platform: isMobile() ? 'h5' : 'pc',
        token: this.userInfo?.token,
        channel: this.channel,
      }
      // 再次处理上传
      if (this.isUploadAgain) {
        let aa = this.$refs.upload.update(this.$refs.upload.add(this.uploadAgainItem), {
          active: true,
          success: false,
          response: {},
          status: {},
          data: { ...this.postData, mdf: this.uploadAgainItemMdf, channel: this.channel },
        })
        //console.log('aa', aa)
        this.getFileStatusProgress(aa)
        this.isUploadAgain = false
      } else {
        // let oldFile = this.files[this.files.length-1]
        // if (!oldFile.success) {
        //   this.$refs.upload.update(oldFile.id, {
        //     active: true,
        //     data: this.postData,
        //   })
        // }
        this.files.forEach((v) => {
          if (!v.success) {
            this.$refs.upload.update(v.id, {
              active: true,
              data: this.postData,
            })
          }
        })
      }
      this.showImageOptionModal = false
    },
    /**
     * 删除上传文件
     */
    onFileRemove(file) {
      //删除供页面显示用的列表项
      this.$refs.upload.remove(file)
      //刷新本地保存的任务状态
      let mdf = file.status.mdf
      this.files = this.files.filter((item) => item.status.mdf !== mdf)
    },
    // 删除全部
    deleteAllItem() {
      if (this.checkedAllItem.length == 1) {
        this.files = []
        this.files1 = []
        localStorage.removeItem('FILE_RECORDS')
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

    // 状态轮询
    statusLxun(item, response) {
      // 状态轮询
      let mdf = response.mdf || response.mdfs[0]
      if (item) {
        window.bbq = 0 // 初始化0秒
        window.infoStatus = true
        window.code111 = true
        window.dsqq = setInterval(() => {
          window.bbq = window.bbq + 2
          // 调用下载接口判断支付状态
          tocDownload(response.mdf || response.mdfs[0]).then((res) => {
            if (res.code === 200 && window.code111) {
              // 已经支付直接下载
              _hmt.push(['_trackEvent', 'pisaai', 'www', 'payok']) //百度埋点统计
              this.fileDownload(res.img_url, mdf)
              // 关闭定时器
              clearInterval(window.dsqq)
              this.$toast.success('支付完成')
              // 关闭弹框
              //this.showQrcode = false
              this.save({ key: 'showQrcode', payload: false })

              window.code111 = false
            }
          })

          // 调用登陆状态接口判断手机是否登录
          if (window.infoStatus) {
            loginGetStatus({
              pc_code: response.pc_code,
              channel: this.channel,
            }).then((res) => {
              if (res.data) {
                // 手机已经登陆 踢掉当前登录状态
                // _this.onLogout() //退出登录
                this.setUserInfo(res.data)
                this.isWechatLogin = true
                window.infoStatus = false

                this.wechatHead = res.data.headimgurl
                // localStorage.setItem('headimgurl', res.data.headimgurl)
                this.mobelLoginInfo.headimgurl = res.data.headimgurl
                this.mobelLoginInfo.nickname = res.data.nickname
              }
            })
          }

          //  如果登陆就 查询点数
          if (this.userInfo) {
            photoUserfinace({
              token: this.userInfo.token,
              channel: this.channel,
              ver: 2,
            }).then((res) => {
              this.setNumew(res.data.nums ? res.data.nums : 0)
              this.setExDate(res.data.sdate ? res.data.sdate : 0)
              console.log(parseInt(res.data.sdate) > parseInt(new Date().getTime() / 1000))
              if (res.code === 0 && (res.data.nums > 0 || parseInt(res.data.sdate) > parseInt(new Date().getTime() / 1000))) {
                // 调用扣除点数
                photoPhotopay({
                  mdt: mdf,
                  fd: 'pc',
                  ver: 2,
                  ftype: 1,
                  channel: this.channel,
                  mobile: this.userInfo.token,
                }).then((res) => {
                  if (res.code === 0) {
                    this.tongbudian() // 再次同步点数
                    tocDownload(mdf).then((res) => {
                      if (res.code === 200 && window.code111) {
                        this.fileDownload(res.img_url, mdf)
                        clearInterval(window.dsqq)
                        this.$toast.success('成功')
                        // 关闭弹框
                        this.save({ key: 'showQrcode', payload: false })
                        window.code111 = false
                      }
                    })
                  }
                })
              }
            })
          }

          // 二维码关闭轮训关闭
          if (!this.showQrcode) {
            window.code111 = false
            clearInterval(window.dsqq)
          }
        }, 2000)

        if (window.bbq >= 60) {
          // 停止轮询
          clearInterval(window.bbq)
        }
      }
    },

    onWechatPay(response, item = null) {
      console.log('onWechatPay')
      // 如果用户没有登陆 或者 用户登录了没有点数
      _hmt.push(['_trackEvent', 'pisaai', 'www', 'pay']) //百度埋点统计
      let ffun = () => {
        const data = {
          goodsid: 'BV11r4y1T7aX',
          channel: this.channel,
          mdf: response.mdf || response.mdfs[0],
        }

        let icon = item.status.icon_url
        let timestamp = new Date().valueOf().toString()
        let random = Math.ceil(Math.random() * 100000).toString()
        if (isMobile()) {
          // 调用扣除点数
          let mdf = response.mdf || response.mdfs[0]
          photoPhotopay({
            mdt: mdf,
            fd: 'h5',
            ver: 2,
            ftype: '',
            channel: this.channel,
            mobile: `${timestamp}${random}`,
            openid: `${timestamp}${random}`,
          }).then((res) => {
            if (res.code === 0) {
              let reg = new RegExp('&amp;', 'g') //g代表全部
              let newUrl = res.img_url.replace(reg, '&')
              //针对的mdf设置标记.页面加载时检测这个标志，为1时触发下载，并将该标志置0
              localStorage.setItem('pay', 1)
              this.$toast.success('即将拉起微信支付，支付成功后请再次点击下载。')
              window.location.href = newUrl
            }
          })
        } else {
          let payLink = `http://api.es.hiliad.com/photo/redSku?mdt=${data.mdf}&img_icon=${icon}&pc_code=${timestamp}${random}&channel=${this.channel}`
          this.qrcodeUrl = payLink
          //this.showQrcode = true
          this.save({ key: 'showQrcode', payload: true })
          // chaundibs(payLink) // 传递标识
        }
        response.pc_code = `${timestamp}${random}`
        this.statusLxun(item, response)
      }
      if (this.userInfo) {
        photoUserfinace({
          token: this.userInfo.token,
          channel: this.channel,
          ver: 2,
        }).then((res) => {
          this.setNumew(res.data.nums ? res.data.nums : 0)
          this.setExDate(res.data.sdate ? res.data.sdate : 0)
          if (res.code === 0) {
            if (res.data.nums <= 0) {
              // 没有点数了
              ffun()
            } else {
              // 调用扣除点数
              let mdf = response.mdf || response.mdfs[0]
              photoPhotopay({
                mdt: mdf,
                fd: 'pc',
                ver: 2,
                ftype: 1,
                channel: this.channel,
                mobile: this.userInfo.token,
              }).then((res) => {
                if (res.code === 0) {
                  tocDownload(mdf).then((res) => {
                    if (res.code === 200) {
                      this.fileDownload(res.img_url, mdf)
                    }
                  })
                  this.tongbudian() // 再次同步点数
                }
              })
            }
          }
          console.log(res)
        })
      } else {
        ffun()
      }

      return false
    },
    getPackageOrderStataus(order_id) {
      packageStatus({ order_id, channel: this.channel })
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
        packageStatus({ order_id, channel: this.channel })
          .then((res) => {
            if (res.data.is_pay !== 2) {
              this.timer2Count = 0
              clearInterval(this.timer2)
              this.$toast.success('支付成功')
              //this.showQrcode = false
              this.save({ key: 'showQrcode', payload: false })
              this.tongbudian()
            }
          })
          .catch((e) => {
            this.timer2Count = 0
            clearInterval(this.timer)
          })
      }, 2000)
    },

    // 同步点数
    tongbudian() {
      if (this.userInfo) {
        photoUserfinace({
          token: this.userInfo.token,
          channel: 'pisaAI',
          ver: 2,
        }).then((res) => {
          this.setNumew(res.data.nums ? res.data.nums : 0)
          this.setExDate(res.data.sdate ? res.data.sdate : 0)
        })
      }
    },

    async _wechatLogin(code) {
      let gdsa = () => {
        this.tongbudian()
      }
      try {
        let res = await wechatLogin({ code, channel: this.channel })
        console.log('wechatLogin', res)
        if (res.data) {
          this.setUserInfo(res.data)
          this.wechatHead = res.data.headimgurl
          this.isWechatLogin = true
          this.$toast.success('登录成功')
          gdsa()
        }
      } catch (e) {
        console.log(e)
        gdsa()
        // this.$toast.error(e.message)
      }
    },

    onGetTaskList() {},

    onContinue(item) {
      this.isUploadAgain = true
      this.uploadAgainItemMdf = item.response.mdfs[0]
      this.uploadAgainItem = item.file
      this.showImageOptionModal = true
      _hmt.push(['_trackEvent', 'pisaai', 'www', 'fixAgain']) //百度埋点统计
    },
    onResize() {
      // this.$refs.taskList.onResize()
      this.$refs.exampleList.onResize()
      this.winHeight = window.innerHeight - window.innerHeight / 10 - 44 // 屏幕高度
      this.winWidth = window.innerWidth - 48 // 屏幕宽度
    },

    //分享图片
    onShareClick(fileObj, item = null) {
      console.log(123123132, fileObj, item)
      this.shareId = fileObj.mdf
      this.showShare = true
    },

    ///tastlist------
    /**
     * 预览上传文件
     */
    onFilePreview(fileObj, item = null) {
      _hmt.push(['_trackEvent', 'pisaai', 'www', 'ViewContrast']) //百度埋点统计
      this.findItem = item
      console.log(this.showPreview, 666)
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
     * 下载上传文件
     */
    async onFileDownload(response, item = null) {
      //console.log("fileDownload",item);
      _hmt.push(['_trackEvent', 'pisaai', 'www', 'clickdownload']) //百度埋点统计
      const mdf = response.mdf || response.mdfs[0]
      //解决部分浏览器拦截下载问题
      if (payok.hasOwnProperty(mdf)) {
        //console.log('download_url:'+payok[mdf])
        setTimeout(function () {
          window.open(payok[mdf])
          //me.downloadImage(payok[mdf], mdf)
        }, 500)
      } else {
        try {
          let res = await tocDownload(mdf)
          if (res.code === 200) {
            _hmt.push(['_trackEvent', 'pisaai', 'www', 'downloaded']) //百度埋点统计
            this.fileDownload(res.img_url, mdf)
          } else {
            this.onWechatPay(response, item)
          }
        } catch (e) {
          if (e.code === 2) {
            this.onWechatPay(response, item)
          }
        }
      }
    },

    fileDownload(url, mdf) {
      payok[mdf] = url
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

    onPlus() {
      if (this.scaleRatio.toFixed() > 4) return
      this.scaleRatio += 0.1
    },
    onMinus() {
      if (this.scaleRatio.toFixed(1) < 0.1) return
      this.scaleRatio -= 0.1
    },
    getProcessNumber(item) {
      console.log(this.$refs?._progress, 44)
      if (item?.status?.task == 2002) {
        PROCESS_NUMBER = 30
      }
      return item.success ? (item?.status?.task == 2002 ? 100 : (PROCESS_NUMBER += 5)) : 0
    },
  },

  created() {
    _hmt.push(['_trackEvent', 'pisaai', 'www', 'index']) //百度埋点统计
    this.getWechatLoginCode()
    let seoTab = checkSeoTab()
    seoTab_arr.forEach((i, idx) => {
      if (i === seoTab) this.optionsTab = idx
    })
    //读取本地存储的上传记录
    const FILE_RECORDS = localStorage.getItem('FILE_RECORDS') && JSON.parse(localStorage.getItem('FILE_RECORDS'))
    //console.log('file:', FILE_RECORDS)
    if (FILE_RECORDS && FILE_RECORDS.length) {
      this.files = FILE_RECORDS
      let idx = 0
      this.files.forEach((v) => {
        this.getFileStatusProgress(v)
        if (v.success) {
          v.blob = 'https://sdkphoto.fangtangtv.com/api/toc/download/input/' + v.status.mdf + '.png'
          v.thumb = 'https://sdkphoto.fangtangtv.com/api/toc/download/input/icon_' + v.status.mdf + '.jpg'
        } else {
          //this.files.splice(idx,1)
        }
        //idx = idx + 1
      })
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
  filters: {
    getFileSize(size) {
      return getfilesize(size)
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

.toolbar {
  position: fixed;
  left: 50%;
  /* top: 22px; */
  height: 44px;
  line-height: 44px;
  transform: translateX(-50%);
}

.continue-upload {
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #db8819;
  font-size: 14px;
  color: #fff;
  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;

  .continue-upload-check {
    ::v-deep .v-icon {
      color: #fff !important;
    }

    ::v-deep .v-label {
      font-size: 14px;
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
    font-size: 14px;
    color: #fff;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 600;
  }
}

.justify-between {
  justify-content: space-between;
}

.edit-img-wrap {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}

::v-deep .cropper-bg {
  background-repeat: repeat;
}

//tasklist-------
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

.p-rela {
  position: relative;
}
</style>
