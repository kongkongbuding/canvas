/**
 * 绘制树
 */

class Tree {
  constructor (options) {
    this.initialize(options)
  }
  initialize (options) {
    this.options = Object.assign({}, this.options, options)
    if (!this.options.ctx) return false
    this.options.ctx.globalCompositeOperation = 'lighter'
  }
  options = {
    ctx: null,
    speed: 40,
    x: 400,
    y: 400,
    num: 3,
    size: 30,
    fork: 20,
    forkNum: 9,
    flower: false,
    color: []
  }
  tree = {
    branches: [],
    timer: null,
    i: 0
  }
  treeObj = {
    canvas: null,
    h: 3000,
    w: 3000,
    x: 1500,
    y: 3000
  }
  grow = position => {
    let { tree } = this
    let { ctx, x, y, speed, num, size, fork, forkNum, flower, color } = this.options
    if (position) {
      x = position.x || x
      y = position.y || y
    }
    let branches = []
    let rc = () => Math.ceil(Math.random() * 255)
    for (let i = 0; i < num; i++) {
      let c = color[i] ? color[i] : 'rgba( ' + rc() + ', ' + rc() + ', ' + rc() + ', 0.3)'
      branches.push({
        r: size,
        x,
        y,
        d: 90,
        c
      })
    }
    tree.branches = [branches]
    clearInterval(tree.timer)
    tree.timer = setInterval(() => {
      if (tree.i > fork) {
        this.addBranch(tree.branches)
        tree.i = 0
      }
      this.__grow__(ctx, tree.branches)
      tree.i++
      if (tree.branches.length > forkNum) {
        clearInterval(tree.timer)
        if (flower) this.flower(ctx, tree.branches, 100)
      }
    }, speed)
  }
  addBranch (branches) {
    let len = branches.length
    let newBranches = []
    branches[len - 1].map(v => {
      let nv = Object.assign({}, v, {})
      newBranches.push(nv)
      newBranches.push(nv)
    })
    branches.push(newBranches)
  }
  __grow__ (ctx, branches) {
    let len = branches.length
    let b = branches[len - 1]
    b.map((v, i) => {
      let { r, x, y, c, d } = v
      ctx.fillStyle = c
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
      d += (Math.random() - 0.5) * 5 * len
      x += Math.cos((d / 180) * Math.PI) * 3
      y -= Math.sin((d / 180) * Math.PI) * 2 + 1 * Math.random()
      b[i].x = x
      b[i].y = y
      b[i].r *= 0.99
      b[i].d = d
    })
  }
  flower (ctx, branches, i, t = 50) {
    if (i < 0) return
    setTimeout(() => {
      let len = branches.length
      let b = branches[len - 1]
      let bl = b.length
      let n = i
      for (; n < bl; n = n + 6) {
        let v = b[n]
        if (!v) continue
        let { x, y, c } = v
        ctx.beginPath()
        ctx.fillStyle = c
        ctx.arc(x, y, (i % 3) * Math.random() + 1, 0, Math.PI * 2)
        ctx.fill()
      }
      i--
      this.flower(ctx, branches, i)
    }, t)
  }
  create = options => {
    this.initialize(options)
    let { canvas, h, w, x, y } = this.treeObj
    canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h

    let ctx = canvas.getContext('2d')

    let { num, size, fork, forkNum, flower, color } = this.options

    let branche = []
    let rc = () => Math.ceil(Math.random() * 255)
    for (let i = 0; i < num; i++) {
      let c = color[i] ? color[i] : 'rgba( ' + rc() + ', ' + rc() + ', ' + rc() + ', 0.3)'
      branche.push({
        r: size,
        x,
        y,
        d: 90,
        c
      })
    }
    let branches = [branche]
    let timer = null
    let i = 0
    timer = setInterval(() => {
      if (i > fork) {
        this.addBranch(branches)
        i = 0
      }
      this.__grow__(ctx, branches)
      i++
      if (branches.length > forkNum) {
        clearInterval(timer)
        if (flower) this.flower(ctx, branches, 100)
      }
    }, 0)
  }
  // addTree = ({ x = 100, y = 100, ctx }) => {
  //   let pattern = ctx.createPattern(newCanvas, 'repeat')
  //   ctx.fillStyle = pattern || style.fillStyle
  // }
}

export default Tree
