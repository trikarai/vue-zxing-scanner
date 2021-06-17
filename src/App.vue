<template>
  <div id="app">
    <div style="width:300px">
    <camera-scanner @decode="onDecode" />
    </div>
    <div> {{result}} </div>
  </div>
</template>

<script>

import CameraScanner from './components/CameraScanner'

export default {
  name: 'App',
  components: {
    CameraScanner
  },
  data () {
    return {
      result: null
    }
  },
  methods: {
    onDecode (result) {
      this.result = result
    }
  }
}
</script>

<style lang="scss">
</style>
