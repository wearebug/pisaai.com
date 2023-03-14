<!--图片配置弹窗-->
<template>
  <!--任务配置-->
  <v-dialog :value="value" max-width="720" persistent>
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
        <v-spacer />
        <v-btn @click="onUploadCancel">
          {{ $vuetify.lang.t('$vuetify.choiceType.cancel') }}
        </v-btn>
        <v-btn color="primary darken-1" @click="onUploadConfirm">
          {{ $vuetify.lang.t('$vuetify.choiceType.btn') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'ImageOptionModal',
  props: ['value', 'onOk', 'onCancel'],
  data() {
    return {
      //showImageOptionModal: false
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
            //{ label: '去划痕', value: 'scratch' },
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
            //{ label: '去划痕', value: 'scratch' },
            { label: '上色', value: 'colour' },
			{ label: '上色(实验版)', value: 'colourbeta' },
          ],
          output: [{ label: '300dpi（印刷级）', value: 'dpi' }],
        },
        {
          id: 'changeBg）',
          name: '证件换背景',
          bgValue: 'blue',
          optionValue: ['repair'],
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
          name: '特种照',
          bgValue: 'white',
          optionValue: [],
          outputValue: [],
          bgs: [
            { label: '新农合（渐变蓝）', value: 'nrcms' },
            { label: '遗像照（渐变灰）', value: 'grey' },
          ],
          options: [{ label: '人像优化', value: 'repair' }],
          output: [{ label: '300dpi（印刷级）', value: 'dpi' }],
        },
      ],
    }
  },
  methods: {
    onUploadCancel() {
      this.onCancel()
    },
    onUploadConfirm() {
      this.onOk(this.optionTabs[this.optionsTab], this.optionsTab)
    },
  },
}
</script>
