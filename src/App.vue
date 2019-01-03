<template>
  <div id='app'>
    <canvas-tree />
  </div>
</template>

<script>
import CanvasTree from './views/canvasTree'
export default {
  name: 'app',
  components: {
    CanvasTree
  }
}
</script>

<style>
body, html { height: 100%; width: 100%; padding: 0; margin: 0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  margin: 0; box-sizing: border-box; -ms-box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box;
}
</style>
