// import 'webrtc-adapter'
import CameraScanner from './components/CameraScanner'

export default {
  install: function (Vue) {
    Vue.component('v-zxing', CameraScanner)
  }
}
