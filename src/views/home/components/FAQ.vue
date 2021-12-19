<template>
  <!--FAQ-->
  <v-sheet tag='section' class='mb-8'>
    <h1 class='my-8 text-h5 text-md-h4 text-center'>FAQ</h1>
    <v-expansion-panels v-model='panel' multiple>
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon='mdi-menu-down' class='text-subtitle-2'>
          {{ $vuetify.lang.t('$vuetify.problem[0].title') }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class='text-justify text-body-2'>{{ $vuetify.lang.t('$vuetify.problem[0].info1') }}</p>
          <v-img src='@/assets/faq1.jpg' eager></v-img>
          <p class='mt-4 text-justify text-body-2' v-html="$vuetify.lang.t('$vuetify.problem[0].info2')"></p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon='mdi-menu-down' class='text-subtitle-2'>
          {{ $vuetify.lang.t('$vuetify.problem[1].title') }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class='text-justify text-body-2'>{{ $vuetify.lang.t('$vuetify.problem[1].info') }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon='mdi-menu-down' class='text-subtitle-2'>
          {{ $vuetify.lang.t('$vuetify.problem[2].title') }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class='text-justify text-body-2' v-html="$vuetify.lang.t('$vuetify.problem[2].info')"></p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon='mdi-menu-down' class='text-subtitle-2'>
          {{ $vuetify.lang.t('$vuetify.problem[3].title') }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class='text-justify text-body-2'>{{ $vuetify.lang.t('$vuetify.problem[3].info') }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon='mdi-menu-down' class='text-subtitle-2'>
          {{ $vuetify.lang.t('$vuetify.problem[4].title') }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class='text-justify text-body-2' v-html="$vuetify.lang.t('$vuetify.problem[4].info')"></p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon='mdi-menu-down' class='text-subtitle-2'>
          {{ $vuetify.lang.t('$vuetify.problem[5].title') }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class='text-justify text-body-2' v-html="$vuetify.lang.t('$vuetify.problem[5].info')"></p>
          <p class='text-justify text-body-2'>
            <span>Bilibili:</span>
            <br />
            <a href='https://www.bilibili.com/video/BV13g41157hL' target='_blank' class='text-decoration-none'>
              https://www.bilibili.com/video/BV13g41157hL
            </a>
          </p>
          <p class='text-justify text-body-2'>
            <span>Youtube:</span>
            <br />
            <a href='https://www.youtube.com/watch?v=XtHbzENmb74' target='_blank' class='text-decoration-none'>
              https://www.youtube.com/watch?v=XtHbzENmb74
            </a>
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>
<script>
export default {
  name: 'FAQ',
  data() {
    return {
      panel: []
    }
  }
}
</script>
