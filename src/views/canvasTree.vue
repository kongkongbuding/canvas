<template>
  <canvas
    ref='canvas'
    class="canvasBox"
  />
</template>

<script>
// import Tree from './tree'
// import webgl from './webgl_study'
import three from './three'
export default {
  data () {
    return {
      canvas: false,
      ctx: false,
      w: 0,
      h: 0,
      tree: {
        branches: [],
        timer: null,
        speed: 40,
        i: 0
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.init()
    })
  },
  methods: {
    init: function () {
      let canvas = this.$refs.canvas
      if (!canvas) return false
      this.canvas = canvas
      this.w = canvas.offsetWidth
      this.h = canvas.offsetHeight
      canvas.width = this.w
      canvas.height = this.h

      // let ctx = canvas.getContext('2d')
      // this.ctx = ctx
      // ctx.fillStyle = '#000000'
      // ctx.fillRect(0, 0, this.w, this.h)

      // this.addTree()
      // webgl(canvas)
      three()
    },
    addTree: function () {
      // let tree = new Tree({
      //   ctx: this.ctx,
      //   speed: 20,
      //   x: this.w / 2,
      //   y: this.h,
      //   num: 5,
      //   size: 30,
      //   fork: 20,
      //   forkNum: 10,
      //   flower: true,
      //   color: ['rgba( 255, 255, 255, 0.3)']
      // })
      // tree.grow()

      // this.d.tree.push(new Tree({
      //   ctx: this.ctx,
      //   speed: 10,
      //   x: this.w * 0.8,
      //   y: this.h,
      //   num: 2,
      //   size: 15,
      //   fork: 12,
      //   forkNum: 10
      // }))

      // this.d.tree.push(new Tree({
      //   ctx: this.ctx,
      //   speed: 10,
      //   x: this.w * 0.2,
      //   y: this.h,
      //   num: 2,
      //   size: 10,
      //   fork: 8,
      //   forkNum: 10
      // }))
      // let tree1 = new Tree({
      //   ctx: this.ctx,
      //   speed: 0,
      //   x: this.w * 0.1,
      //   y: this.h,
      //   num: 1,
      //   size: 2,
      //   fork: 3,
      //   forkNum: 8,
      //   color: ['rgba( 33, 33, 200, 0.2)']
      // })
      // tree1.grow()
      // tree1.create()
    }
  }
}
</script>

<style type="text/less" lang="less" >
canvas {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  vertical-align: top;
}
</style>
