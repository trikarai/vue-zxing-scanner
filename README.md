# vue-zxing-scanner
# Vue Barcode and QR code scanner

## Benefits

* Can scan both barcodes and QR codes
* Uses [ZXing](https://github.com/zxing-js/library) ("zebra crossing"), an open-source, multi-format 1D/2D barcode image processing library implemented in Java, with ports to other languages.

## Install

```js
npm i vue-zxing-scanner
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
<div style="width:300px">
  <v-zxing
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

### Credit
https://github.com/olefirenko/vue-barcode-reader
