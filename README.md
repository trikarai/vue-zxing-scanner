# vue-zxing-scanner

## Install

```js
npm i https://github.com/trikarai/vue-zxing-scanner
```

## Usage

The Vue Zxing Scanner works out of the box by just including it.

### Using Video Camera

Once a stream from the users camera is loaded, it's displayed and continuously scanned for barcodes. Results are indicated by the decode event.

```js
import Vue from "vue";
import VueZxingScanner from "vue-zxing-scanner";
Vue.use(VueZxingScanner);
```

In your template you can use this syntax:
```html
<div style="witdh:300px">
  <CameraScanner
    @decode="onDecode"
    @loaded="onLoaded"
  />
</div>
```

```js
methods: {
  onDecode (result) {
    console.log(result)
  }
}
```

### Scanning from Image

TODO
