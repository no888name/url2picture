<template>
    <v-layout>
      <v-flex class="text-center">
       <take-screenshot></take-screenshot>
      </v-flex>
    </v-layout>
</template>

<script>
import TakeScreenshot from '~/components/TakeScreenshot.vue'

export default {
  layout: 'default',
  components: {
    TakeScreenshot
  }
}
</script>
