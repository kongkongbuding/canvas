/* eslint-disable */
/**
 * webgl kkbd s
 */

let init = function(canvas) {
  let VSHADER_SOURCE =
    'attribute vec4 coordinates;' +
    'void main() {' +
    'gl_Position = coordinates; ' +
    '} '

  let FSHADER_SOURCE =
    'void main() {' + 'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' + '}'

  let gl = canvas.getContext('experimental-webgl')

  if (!gl) {
    console.log('Failed')
    return
  }
  let vertices = [0.0, 0.5, -0.5, -0.5, 0.5, -0.5]
  let vertShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER)
  let fragShader = createShader(gl, FSHADER_SOURCE, gl.FRAGMENT_SHADER)

  let shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertShader)
  gl.attachShader(shaderProgram, fragShader)
  gl.linkProgram(shaderProgram)
  gl.useProgram(shaderProgram)

  let coordinates = gl.getAttribLocation(shaderProgram, 'coordinates')

  if (coordinates < 0) {
    console.log('Failed to get the storage location of coordinates')
    return
  }
  initBuffers(gl, vertices, shaderProgram)

  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}

function createShader(gl, sourceCode, type) {
  let shader = gl.createShader(type)
  gl.shaderSource(shader, sourceCode)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let info = gl.getShaderInfoLog(shader)
    throw new Error('Could not compile WebGL program. \n\n' + info)
  }
  return shader
}

function initBuffers(gl, vertices, shaderProgram) {
  vertices = new Float32Array(vertices)
  let vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  let coordinates = gl.getAttribLocation(shaderProgram, 'coordinates')
  gl.vertexAttribPointer(coordinates, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(coordinates)
}
export default init
