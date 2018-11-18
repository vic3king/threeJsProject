// Three.js ray.intersects with offset canvas

var container, camera, scene, renderer, mesh,

    mouse = { x: 0, y: 0 },
    objects = [],
    
    count = 0,

    CANVAS_WIDTH = 400,
    CANVAS_HEIGHT = 400;

// info
info = document.createElement( 'div' );
info.style.position = 'absolute';
info.style.top = '30px';
info.style.width = '100%';
info.style.textAlign = 'center';
info.style.color = '#f00';
info.style.backgroundColor = 'transparent';
info.style.zIndex = '1';
info.style.fontFamily = 'Monospace';
info.innerHTML = 'INTERSECT Count: ' + count;
info.style.userSelect = "none";
info.style.webkitUserSelect = "none";
info.style.MozUserSelect = "none";
document.body.appendChild( info );

container = document.getElementById( 'canvas' );
document.body.appendChild( container );

renderer = new THREE.WebGLRenderer();
renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
container.appendChild( renderer.domElement );

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 50, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000 );
camera.position.y = 150;
camera.position.z = 500;
camera.lookAt( scene.position );

mesh = new THREE.Mesh( 
    new THREE.BoxGeometry( 200, 200, 200, 1, 1, 1 ), 
    new THREE.MeshBasicMaterial( { color : 0xff0000 } 
) );
scene.add( mesh );
objects.push( mesh );

// find intersections
var vector = new THREE.Vector3();
var raycaster = new THREE.Raycaster();

// mouse listener
document.addEventListener( 'mousedown', function( event ) {
    
    // For the following method to work correctly, set the canvas position *static*; margin > 0 and padding > 0 are OK
    mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.width ) * 2 - 1;
    mouse.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.height ) * 2 + 1;
    
    // For this alternate method, set the canvas position *fixed*; set top > 0, set left > 0; padding must be 0; margin > 0 is OK
    //mouse.x = ( ( event.clientX - container.offsetLeft ) / container.clientWidth ) * 2 - 1;
    //mouse.y = - ( ( event.clientY - container.offsetTop ) / container.clientHeight ) * 2 + 1;

    vector.set( mouse.x, mouse.y, 0.5 );
    vector.unproject( camera );

    raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

    intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {
        
        info.innerHTML = 'INTERSECT Count: ' + ++count;
        
    }

}, false );

let controls = new THREE.OrbitControls(camera, renderer.domElement);
function render() {

    mesh.rotation.y += 0.01;
    
    renderer.render( scene, camera );

}

(function animate() {

    requestAnimationFrame( animate );

    render();

})();

// // Create the scene and a camera to view it
// var scene = new THREE.Scene();

// /**
// * Camera
// **/

// // Specify the portion of the scene visiable at any time (in degrees)
// var fieldOfView = 75;

// // Specify the camera's aspect ratio
// var aspectRatio = window.innerWidth / window.innerHeight;

// // Specify the near and far clipping planes. Only objects
// // between those planes will be rendered in the scene
// // (these values help control the number of items rendered
// // at any given time)
// var nearPlane = 0.1;
// var farPlane = 1000;

// // Use the values specified above to create a camera
// var camera = new THREE.PerspectiveCamera(
//   fieldOfView, aspectRatio, nearPlane, farPlane
// );

// // Finally, set the camera's position in the z-dimension
// camera.position.z = 5;

// /**
// * Renderer
// **/

// // Create the canvas with a renderer
// var renderer = new THREE.WebGLRenderer({antialias: true});

// // Specify the size of the canvas
// renderer.setSize( window.innerWidth, window.innerHeight );

// // Add the canvas to the DOM
// document.body.appendChild( renderer.domElement );

// /**
// * Image
// **/

// // Create a texture loader so we can load our image file
// var loader = new THREE.TextureLoader();

// // Load an image file into a custom material
// var material = new THREE.MeshLambertMaterial({
//   map: loader.load('img/blue.png')
// });

// // create a plane geometry for the image with a width of 10
// // and a height that preserves the image's aspect ratio
// var geometry = new THREE.PlaneGeometry(10, 10*.75);

// // combine our image geometry and material into a mesh
// var mesh = new THREE.Mesh(geometry, material);

// // set the position of the image mesh in the x,y,z dimensions
// mesh.position.set(0,0,0)

// // add the image to the scene
// scene.add(mesh);

// /**
// * Lights
// **/

// // Add a point light with #fff color, .7 intensity, and 0 distance
// var light = new THREE.PointLight( 0xffffff, 1, 0 );

// // Specify the light's position
// light.position.set(1, 1, 100 );

// // Add the light to the scene
// scene.add(light)

// /**
// * Render!
// **/

// // The main animation function that re-renders the scene each animation frame
// function animate() {
// requestAnimationFrame( animate );
//   renderer.render( scene, camera );
// }
// animate();





