<template>
  <v-container>
    <v-card style="overflow-y: scroll" class="mx-auto mb-4" v-for="(item, i) in docsInfo.functionFun" :key="i">
      <v-card-title>
        {{ item.title }}
      </v-card-title>
      <pre class="text-caption font-weight-light pa-2">{{ item.info }}</pre>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ApiDocs',
  props: {
    lang: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      docsInfo: {
        functionFun: [],
      },
    }
  },
  mounted() {
    console.log(this.$vuetify.lang.locales)
  },
  watch: {
    lang: {
      handler(value) {
        const key = value.id
        console.log(key)
        this.docsInfo = this.$vuetify.lang.locales[key]
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>

<style></style>
