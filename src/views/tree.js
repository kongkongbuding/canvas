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
    this.initTree()
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
  initTree () {
    let { tree } = this
    let { x, y, speed, num, size, fork, forkNum, flower, color } = this.options
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
        this.addBranch()
        tree.i = 0
      }
      this.grow()
      tree.i++
      if (this.tree.branches.length > forkNum) {
        clearInterval(tree.timer)
        if (flower) this.flower(100)
      }
    }, speed)
  }
  addBranch () {
    let { tree } = this
    let { branches } = tree
    let len = branches.length
    let newBranches = []
    branches[len - 1].map(v => {
      let nv = Object.assign({}, v, {})
      newBranches.push(nv)
      newBranches.push(nv)
    })
    tree.branches.push(newBranches)
  }
  grow () {
    let { tree, options } = this
    let { branches } = tree
    let { ctx } = options
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
  flower (i) {
    if (i < 0) return
    setTimeout(() => {
      let { options, tree } = this
      let { branches } = tree
      let { ctx } = options
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
      this.flower(i)
    }, 50)
  }
}

export default Tree
