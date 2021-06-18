<template>
  <div class="scanner-container">
    <div v-show="!isLoading">
      <div class="button-container">
        <button class="button" id="startButton" @click="onStart">Start</button>
        <button class="button" id="resetButton" @click="onReset">Reset</button>
      </div>
      <video poster="data:image/gif, AAAA" id="video" ref="scanner" />
      <div class="overlay"></div>
      <div class="laser"></div>

      <div class="select" id="sourceSelectPanel" style="display: none">
        <label for="sourceSelect">Change video source:</label>
        <select
          id="sourceSelect"
          style="max-width: 400px"
          v-model="selectedDeviceId"
        >
          <option
            v-for="source in sourceSelect"
            :key="source.value"
            :value="source.value"
          >
            {{ source.text }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { BrowserMultiFormatReader, Exception } from '@zxing/library'

export default {
  name: 'stream-reader',
  data () {
    return {
      isLoading: false,
      scanner: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported:
        navigator &&
        navigator.mediaDevices &&
        'enumerateDevices' in navigator.mediaDevices,
      sourceSelect: [],
      selectedDeviceId: ''
    }
  },
  watch: {
    selectedDeviceId: 'onStart'
  },
  mounted () {
    if (!this.isMediaStreamAPISupported) {
      throw new Exception('Media Stream API is not supported')
      return
    }
    this.start()
    this.$refs.scanner.oncanplay = (event) => {
      this.isLoading = false
      this.$emit('loaded')
    }
  },
  beforeDestroy () {
    this.scanner.reset()
  },
  methods: {
    start () {
      this.scanner.listVideoInputDevices().then((videoInputDevices) => {
        this.selectedDeviceId = videoInputDevices[0].deviceId
        if (videoInputDevices.length >= 1) {
          videoInputDevices.forEach((element) => {
            const sourceOption = {}
            sourceOption.text = element.label
            sourceOption.value = element.deviceId
            this.sourceSelect.push(sourceOption)
          })

          const sourceSelectPanel =
            document.getElementById('sourceSelectPanel')
          sourceSelectPanel.style.display = 'block'
        }
      })
      this.onStart()
    },
    onStart () {
      this.scanner.decodeFromVideoDevice(
        this.selectedDeviceId,
        'video',
        (result, err) => {
          if (result) {
            this.$emit('decode', result.text)
            // console.log(result.text)
          }
          if (err && !(err instanceof Exception)) {
            console.error(err)
          }
        }
      )
    },
    onReset () {
      this.scanner.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
video {
  max-width: 100%;
  max-height: 100%;
}
.button-container {
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
}
.scanner-container {
  position: relative;
}
.overlay-element {
  position: absolute;
  top: 0;
  width: 100%;
  height: 99%;
  background: rgba(30, 30, 30, 0.5);
  -webkit-clip-path: polygon(
    0% 0%,
    0% 100%,
    20% 100%,
    20% 20%,
    80% 20%,
    80% 80%,
    20% 80%,
    20% 100%,
    100% 100%,
    100% 0%
  );
  clip-path: polygon(
    0% 0%,
    0% 100%,
    20% 100%,
    20% 20%,
    80% 20%,
    80% 80%,
    20% 80%,
    20% 100%,
    100% 100%,
    100% 0%
  );
}
.laser {
  width: 60%;
  margin-left: 20%;
  background-color: tomato;
  height: 1px;
  position: absolute;
  top: 40%;
  z-index: 2;
  box-shadow: 0 0 4px red;
  -webkit-animation: scanning 2s infinite;
  animation: scanning 2s infinite;
}
@-webkit-keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
@keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
</style>
