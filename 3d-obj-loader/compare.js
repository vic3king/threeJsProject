var camera, scene, renderer, mesh, loader, mesh2, loader2;
var obj = './models/sandalo3.json';
var obj2 = './models/sandalo7.json';

init();
animate();

function init() {

  var BaseAzzurraButtonId = document.getElementById('BaseAzzurraButtonId');
  var BaseGiallaButtonId = document.getElementById('BaseGiallaButtonId');

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000);

  loader = new THREE.JSONLoader();

  loader.load(obj, function (geometry, materials) {
    mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.scale.set(150, 150, 150);
    mesh.position.y = 0;
    mesh.position.x = 0;
    mesh.rotation.x = 340;
    scene.add(mesh);
  });

  loader2 = new THREE.JSONLoader();
  loader2.load(obj2, function (geometry, materials) {
    mesh2 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh2.scale.set(150, 150, 150);
    mesh2.position.y = 0;
    mesh2.position.x = 0;
    mesh2.rotation.x = 340;
  });

  BaseAzzurraButtonId.onclick = function BaseAzzurraButtonId() {
    scene.remove(mesh);
    scene.add(mesh2);
    animate2();
  }

  BaseGiallaButtonId.onclick = function BaseGiallaButtonId() {
    scene.remove(mesh2);
    scene.add(mesh);
  }

  var ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  var ambientLight2 = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight2);

  var ambientLight3 = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight3);

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

}

function animate() {

  requestAnimationFrame(animate);
  mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
}

function animate2() {

  requestAnimationFrame(animate2);
  mesh2.rotation.y += 0.02;
  renderer.render(scene, camera);
}
