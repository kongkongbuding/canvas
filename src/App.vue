<template>
  <div id='app'>
    <canvas-tree />
  </div>
</template>

<script>
import CanvasTree from './views/canvasTree'
import IsoImage from 'iso-image'
export default {
  name: 'app',
  components: {
    CanvasTree
  },
  mounted: function () {
    console.log(IsoImage)
    // var clip = []
    // var areacode = [350102, 350103, 350104, 350105, 350111, 350121, 350122, 350123, 350124, 350125, 350181, 350182]
    // var ajax = 0
    // var getJson = function (url) {
    //   var xmlhttp = new XMLHttpRequest()
    //   xmlhttp.onreadystatechange = function () {
    //     if (xmlhttp.readyState === 4) {
    //       if (xmlhttp.status === 200) {
    //         var ret = JSON.parse(xmlhttp.responseText)
    //         var features = ret.features || []
    //         for (var j = 0; features[j]; j++) {
    //           var rings = features[j].geometry.rings
    //           clip = clip.concat(rings)
    //         }
    //       }
    //       ajax++
    //       doNext()
    //     }
    //   }
    //   xmlhttp.open('GET', url)
    //   xmlhttp.send()
    // }
    // setTimeout(function () {
    //   for (var i = 0; areacode[i]; i++) {
    //     var url = 'http://localhost:8001/35_福建省/01_福州/福州市防汛指挥图、内涝风险图服务应用平台项目/地图标绘/MapPlotting/src/data/areas/' + areacode[i] + '.json'
    //     getJson(url)
    //   }
    // }, 0)

    // function doNext () {
    //   if (!(areacode.length === ajax)) return
    //   var url = 'http://localhost:8001/000000/kongkongbuding/iso-image/dist/data.json'
    //   var xmlhttp = new XMLHttpRequest()
    //   xmlhttp.onreadystatechange = function () {
    //     if (xmlhttp.readyState === 4) {
    //       if (xmlhttp.status === 200) {
    //         var data = JSON.parse(xmlhttp.responseText)

    //         // kriging
    //         var krigingImg = new IsoImage(data, {
    //           type: 'kriging',
    //           extent: [[118.3, 26.8], [120.3, 25]],
    //           // clip: clip,
    //           level: [
    //             { value: 0, color: '#ffffff' },
    //             { value: 5, color: '#A9F18D' },
    //             { value: 10, color: '#38A801' },
    //             { value: 25, color: '#61B8FF' },
    //             { value: 30, color: '#81BcaF' },
    //             { value: 50, color: '#0100FC' },
    //             { value: 100, color: '#FA00FA' },
    //             { value: 250, color: '#FF0000' }
    //           ],
    //           cellWidth: 0.05,
    //           keyConfig: {
    //             x: 'X',
    //             y: 'Y',
    //             v: 'VAL',
    //             clipX: '0',
    //             clipY: '1'
    //           }
    //         })
    //         var krigingImgIsosurface = krigingImg.getIsoImage({
    //           width: 600,
    //           opacity: 0.8,
    //           gradient: false,
    //           isolineColor: '#666',
    //           clip: false,
    //           clipColor: '#333',
    //           clipWidth: 1
    //         })
    //         var krigingImgIsosurfaceImg = new Image()
    //         krigingImgIsosurfaceImg.src = krigingImgIsosurface
    //         document.body.appendChild(krigingImgIsosurfaceImg)
    //         console.log(krigingImg)

    //         // idw
    //         var img = new IsoImage(data, {
    //           type: 'idw',
    //           extent: [[118.3, 26.8], [120.3, 25]],
    //           // clip: clip,
    //           level: [
    //             { value: 0, color: '#ffffff' },
    //             { value: 5, color: '#A9F18D' },
    //             { value: 10, color: '#38A801' },
    //             { value: 25, color: '#61B8FF' },
    //             { value: 30, color: '#81BcaF' },
    //             { value: 50, color: '#0100FC' },
    //             { value: 100, color: '#FA00FA' },
    //             { value: 250, color: '#FF0000' }
    //           ],
    //           cellWidth: 0.05,
    //           keyConfig: {
    //             x: 'X',
    //             y: 'Y',
    //             v: 'VAL',
    //             clipX: '0',
    //             clipY: '1'
    //           }
    //         })
    //         console.log(img)

    //         var isosurface = img.getIsosurface({
    //           width: 600,
    //           opacity: 0.8,
    //           gradient: true,
    //           clip: true,
    //           clipColor: '#333',
    //           clipWidth: 1
    //         })
    //         var isosurfaceImg = new Image()
    //         isosurfaceImg.src = isosurface
    //         document.body.appendChild(isosurfaceImg)

    //         var isoline = img.getIsoline({
    //           width: 600,
    //           isolineColor: 'level',
    //           opacity: 0.8,
    //           gradient: false,
    //           clip: true,
    //           clipColor: '#999',
    //           clipWidth: 1
    //         })
    //         var isolineImg = new Image()
    //         isolineImg.src = isoline
    //         document.body.appendChild(isolineImg)

    //         var isoImage = img.getIsoImage({
    //           width: 600,
    //           opacity: 1,
    //           isolineColor: '#000',
    //           gradient: false,
    //           clip: true
    //         })
    //         var isoImageImg = new Image()
    //         isoImageImg.src = isoImage
    //         document.body.appendChild(isoImageImg)

    //         var legend = img.getLegend()
    //         var legendImg = new Image()
    //         legendImg.src = legend
    //         document.body.appendChild(legendImg)

    //         window.img = img
    //       }
    //     }
    //   }
    //   xmlhttp.open('GET', url)
    //   xmlhttp.send()
    // }
  }
}
</script>

<style>
body,
html {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>
