<template>
  <v-app-bar app color="black" dark>
    <v-container class="d-flex justify-space-between pa-0" style="max-width: 1080px; margin: auto">
      <div class="d-flex align-center pa-0">
        <v-img class="shrink" contain src="http://pisaai.com/img/logo.cf60ae52.png" transition="scale-transition" width="120" eager />
      </div>
      <v-spacer></v-spacer>
      <Menu />
    </v-container>
  </v-app-bar>
</template>

<script>
import Menu from '@/components/Menu'
export default {
  name: 'Header',
  components: { Menu },
  data() {
    return {}
  },
}
</script>
