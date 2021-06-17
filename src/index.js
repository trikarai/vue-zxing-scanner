import 'webrtc-adapter';
import CameraScanner from './components/CameraReader'

export default{
  install:function(Vue){
    Vue.component('v-zxing',CameraScanner)
  }
}