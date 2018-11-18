let container, stats;

let camera, scene, renderer;

let cube, plane;

let targetRotation = 0;
let targetRotationOnMouseDown = 0;

let CANVAS_WIDTH = 400;
let CANVAS_HEIGHT = 400;

let mouseX = 0;
let mouseXOnMouseDown = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const init = () => {
    let button1 = document.getElementById('button1')
    let button2 = document.getElementById('button2')
    let button3 = document.getElementById('button3')
    let button4 = document.getElementById('button4')

    //container
    container = document.getElementById('canvas');
    document.body.appendChild(container);

    //camera

    camera = new THREE.PerspectiveCamera(75, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000);
    camera.position.y = 30;
    camera.position.z = 150;


    //scene
    scene = new THREE.Scene();

    //lighting
    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    camera.add(pointLight);
    scene.add(camera);


    //render
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    container.appendChild(renderer.domElement);

    //3d model object and material
    var material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/3d-obj-loader/img/B185.jpg') });
    var objLoader = new THREE.OBJLoader();
    objLoader.setPath('/3d-obj-loader/assets/');
    objLoader.load('male02.obj', function (object) {
        object.material = material;
        object.traverse(function (child) { child.material = material; });
        object.position.y -= 60;
        dModel = object
        scene.add(object);
        animate();
    });


    //event listeners for changing material
    button1.onclick = function button1() {
        material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/3d-obj-loader/img/B183.jpg') });
        dModel.material = material;
        dModel.traverse(function (child) { child.material = material; });
    }
    button2.onclick = function button2() {
        material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/3d-obj-loader/img/B166.jpg') });
        dModel.material = material;
        dModel.traverse(function (child) { child.material = material; });
    }
    button3.onclick = function button3() {
        material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/3d-obj-loader/img/B174.jpg') });
        dModel.material = material;
        dModel.traverse(function (child) { child.material = material; });
    }
    button4.onclick = function button4() {
        material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/3d-obj-loader/img/B185.jpg') });
        dModel.material = material;
        dModel.traverse(function (child) { child.material = material; });
    }
    //event listeners for mouse controls
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    // window.addEventListener('resize', onWindowResize, false);
}

init();

// function onWindowResize() {

//     windowHalfX = window.innerWidth / 2;
//     windowHalfY = window.innerHeight / 2;

//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize(window.innerWidth, window.innerHeight);

// }

//

function onDocumentMouseDown(event) {

    event.preventDefault();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mouseout', onDocumentMouseOut, false);

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;

    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;

}

function onDocumentMouseUp(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentMouseOut(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentTouchStart(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;

    }
}


const animate = function () {
    requestAnimationFrame(animate);
    render();

};
function render() {
    dModel.rotation.y += (targetRotation - dModel.rotation.y) * 0.05;
    dModel.rotation.y += 0.01;
    renderer.render(scene, camera);
}