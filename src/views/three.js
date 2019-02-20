/* eslint-disable */
var camera, scene, renderer
var geometry, material, mesh, mesh2, stats, light
var i = 0

function init() {
  
  // 场景
  scene = new THREE.Scene()

  // 实体
  geometry = new THREE.BoxGeometry(40, 40, 40)
  material = new THREE.MeshNormalMaterial()

  mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(-30, 40, 0);
  scene.add(mesh)

  // mesh2 = new THREE.Mesh(geometry, material)
  // mesh2.position.set(30, 40, 0);
  // scene.add(mesh2)

  var obj1 = new THREE.CubeGeometry(40, 40, 40)
  var obj1Material = new THREE.MeshLambertMaterial({ color:0xffffff })
  var mesh1 = new THREE.Mesh(obj1, obj1Material)
  mesh1.position.set(30, 40, 0);
  scene.add(mesh1)

  // 照相机
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.set(0, 100, 300)
  camera.lookAt(0, 40, 0);

  // 光源
  // light = new THREE.AmbientLight(0x464646);
  // scene.add(light)
  light = new THREE.DirectionalLight(0x00a000)
  light.position.set(0, 500, 0);
  scene.add(light)
  light = new THREE.DirectionalLight(0xa00000)
  light.position.set(500, 0, 0);
  scene.add(light)
  light = new THREE.DirectionalLight(0x0000a0)
  light.position.set(0, 0, 500);
  scene.add(light)
  light = new THREE.PointLight(0xff0000, 10, 100);
  light.position.set(0, 100, 0);
  scene.add(light);

  // 渲染
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById('app').innerHTML = ''
  document.getElementById('app').appendChild(renderer.domElement)

  // 动画帧
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.getElementById('app').appendChild(stats.domElement);

  // 网格
  var grid = new THREE.GridHelper( 1000, 50, 0xf00000, 0x808080 );
  scene.add( grid );

  // 页面大小改变
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  
  renderer.render(scene, camera)
}

var j = 0
function animate() {
  j++
  if (j > 200) return
  requestAnimationFrame(animate)

  mesh.rotation.x += 0.015
  mesh.rotation.y += 0.02
  i++
  camera.position.set(Math.sin(i / 180 * Math.PI) * 200, 100, Math.cos(i / 180 * Math.PI) * 300)
  camera.lookAt(0, 40, 0);
  renderer.render(scene, camera)
  stats.update();
  // TWEEN.update()
}

// function initTween()
// {
//     new TWEEN.Tween( mesh.position)
//             .to( { x: -400 }, 3000 ).repeat( Infinity ).start();
// }
function addVTK () {
  var material = new THREE.MeshLambertMaterial( { color:0xffffff, side: THREE.DoubleSide } )
  var loader = new THREE.VTKLoader()

  loader.load( "plugins/three/bunny.vtk", function (event) {
    // var geometry = event.content
    // var mesh = new THREE.Mesh( geometry, material )
    // mesh.position.setY( - 0.09 )
    // scene.add( mesh )
    console.log(event)
  })
}
let initThree = function() {
  init()
  animate()
  // addVTK()
  // initTween()
}

export default initThree
