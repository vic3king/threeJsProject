let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', function () {
  let width = window.innerWidth
  let height = window.innerHeight
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
})
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// let loader = new THREE.ObjectLoader()
// loader.load
// {
//   'img/male02.obj',
//   function(object) {
//     scene.add(object)
//   }
// }

// create the shape
let geometry = new THREE.BoxGeometry(1, 1, 1)
let cubeMaterials = [
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/blue.png'), side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/blue.png'), side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/blue.png'), side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/blue.png'), side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/blue.png'), side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/blue.png'), side: THREE.DoubleSide })
]

// create a material, color or image texture
let material = new THREE.MeshFaceMaterial(cubeMaterials)
let cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 3

///game logic
let update = function () {
  // var angle = Math.PI / 2;
  // cone.rotation.x += 0.01;
  // cone.rotation.y += 0.005
  // // cone.rotateX(angle);
  // // cone.rotateY(angle);
  // // cone.rotateZ(angle);
//  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005

}
//draw scene 
let render = function () {
  renderer.render(scene, camera)
}
//run game loop(update, render , repeat)
let GameLoop = function () {
  requestAnimationFrame(GameLoop)
  update()
  render()
}

GameLoop()




















// let geometry = new THREE.ConeGeometry(5, 20, 32 );
// let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
// let cone = new THREE.Mesh( geometry, material );
// scene.add( cone );