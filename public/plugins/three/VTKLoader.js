// 构造函数
THREE.VTKLoader = function() {
  THREE.EventDispatcher.call(this) // 继承自监听器，使这个类有监听的功能
}

// VTKLoader的原型函数，里面包含了VTKloader的成员函数，成员变量的定义
THREE.VTKLoader.prototype = {
  // 构造函数
  constructor: THREE.VTKLoader,
  // 加载函数，url表示要加载的vtk文件的url路径，callback表示加载完成后要调用的后续处理函数，这里是异步操作，加载需要一个过程，不能将程序阻塞在这里，所以需要异步回调
  load: function(url, callback) {
    // 将类自身保存在scope中，scope表示域的意思，这里是为了避免this的歧义，因为，每一个地方使用this，其意义不一样。
    var scope = this
    // ajax 异步请求
    var request = new XMLHttpRequest()
    // 加载完成的监听器，加载完成后，将调用第二个参数定义的回调函数
    request.addEventListener(
      'load',
      function(event) {
        // 对服务器加载下来的数据进行解析，后面详细解释
        var geometry = scope.parse(event.target.responseText)
        // 解析完成后，发一个load事件，表示数据解析完成
        scope.dispatchEvent({ type: 'load', content: geometry })
        // 如果设置了回调函数，那么调用回调函数
        if (callback) callback(geometry)
      },
      false
    )
    // 加载过程中，向自身发送进度progress信息，信息中包含已经加载的数据的字节数和文件总共的字节数，通过两者的百分比能够了解加载进度。
    // request.addEventListener(
    //   'progress',
    //   function(event) {
    //     // 发送正在加载的消息，两个参数分别是已经加载了多少字节，总共多少字节
    //     scope.dispatchEvent({
    //       type: 'progress',
    //       loaded: event.loaded,
    //       total: event.total
    //     })
    //   },
    //   false
    // )
    // 加载出错的监听器，加载的过程也可能出错，这里如果出错，进行错误处理，
    request.addEventListener(
      'error',
      function() {
        // 加载出错之后需要发布的错误消息，
        scope.dispatchEvent({
          type: 'error',
          message: "Couldn't load URL [" + url + ']'
        })
      },
      false
    )
    // 初始化 HTTP 请求参数，例如 URL 和 HTTP 方法，但是并不发送请求。
    request.open('GET', url, true)
    //发送 HTTP 请求，开始下载
    request.send(null)
  },

  // parse函数在上面调用过，主要负责解析数据的功能，我们将在后面详细介绍解析函数，这里就不介绍了。
  parse: function(data) {
    var geometry = new THREE.Geometry()
    function vertex(x, y, z) {
      geometry.vertices.push(new THREE.Vector3(x, y, z))
    }

    function face3(a, b, c) {
      geometry.faces.push(new THREE.Face3(a, b, c))
    }

    function face4(a, b, c, d) {
      geometry.faces.push(new THREE.Face4(a, b, c, d))
    }

    var pattern, result

    // float float float

    pattern = /([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)/g

    while ((result = pattern.exec(data)) != null) {
      // ["1.0 2.0 3.0", "1.0", "2.0", "3.0"]

      vertex(
        parseFloat(result[1]),
        parseFloat(result[2]),
        parseFloat(result[3])
      )
    }

    // 3 int int int

    pattern = /3[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g

    while ((result = pattern.exec(data)) != null) {
      // ["3 1 2 3", "1", "2", "3"]

      face3(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]))
    }

    // 4 int int int int

    pattern = /4[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g

    while ((result = pattern.exec(data)) != null) {
      // ["4 1 2 3 4", "1", "2", "3", "4"]

      face4(
        parseInt(result[1]),
        parseInt(result[2]),
        parseInt(result[3]),
        parseInt(result[4])
      )
    }

    geometry.computeCentroids()
    geometry.computeFaceNormals()
    geometry.computeVertexNormals()
    geometry.computeBoundingSphere()

    return geometry
  }
}
