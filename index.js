import { STLLoader } from "./threejs/STLLoader.js";
function addModelToBG() {
  //Variables for setup

  let container;
  let camera;
  let renderer;
  let scene;
  let box;

  function init() {
    container = document.querySelector(".scene.one");

    //Create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.9;
    const far = 1000;

    //Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    //Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);
    
    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0,0,10);
    scene.add(light);

    let light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(0,0,-10);
    scene.add(light2);

    function render() {
      renderer.render(scene, camera);
    }

    // var geometry = new THREE.BoxGeometry();
    // var material = new THREE.MeshNormalMaterial();
    // var box = new THREE.Mesh(geometry, material);
    // box.scale.set(2.0, 2.0, 2.0);
    // box.position.set(0.0, 0.0, 0.0);
    // scene.add(box);

      
    let loader = new STLLoader();
    loader.load("./3dmodels/Baby_Yoda_v2.2.stl", (model) => {
      box = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({ color: 0xdddddd })
      );
      box.scale.set(0.01, 0.01, 0.01);
      box.position.set(0, 0, 0);
      box.rotation.x = -Math.PI / 2;
      scene.add(box);
    });
    
    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  init();

  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener("resize", onWindowResize);

  gsap.registerPlugin(ScrollTrigger);

  scene.rotation.set(0, 1, 0);
  camera.position.set(0, 0, 10);

  ScrollTrigger.defaults({
    immediateRender: false,
    ease: "power1.inOut",
    scrub: true,
  });

//   gsap.from(scene.rotation, {
//     duration: 1.1,
//     attr: { r: 0 },
//     repeat: -1,
//     repeatDelay: 1,
//     yoyo: true,
//     ease:"power4.inOut"
//   });

  let car_anim = gsap.timeline();

  //Full Height
//   console.log(scene.rotation);
  car_anim.to( camera.position, {
    z: 4,
    scrollTrigger: {
      trigger: ".section-two",

      endTrigger: ".section-four",
      end: "top bottom",
    },
  });

//   // Slide 2

  car_anim.to(scene.rotation, {
    y: -0.5,
    z: 0.3,
    scrollTrigger: {
      trigger: ".section-two",

      start: "top bottom",
      end: "top top",
    },
  });

//   // Slide 3

  car_anim.to(scene.rotation, {
    y: 0.4,
    z:0,
    scrollTrigger: {
      trigger: ".section-three",

      start: "top bottom",
      end: "top top",
    },
  });



//   // // Slide 4 - The problem child

//   car_anim.to(scene.rotation, {
//     z: 0.02,
//     y: 3.1,
//     scrollTrigger: {
//       trigger: ".section-four",

//       start: "top bottom",
//       end: "top top",
//     },
//   });

//   car_anim.to(camera.position, {
//     x: 0.16,
//     scrollTrigger: {
//       trigger: ".section-four",

//       start: "top top",
//       end: "bottom top",
//     },
//   });
}
addModelToBG();
