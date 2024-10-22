import { PerspectiveCamera, Scene, WebGLRenderer} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";

export default class SceneInit {
    fov: number;
    scene: any;
    stats: any;
    camera: any;
    controls: any;
    renderer: any;

  constructor(fov = 36, camera = null, scene = null, stats = null, controls = null, renderer = null) {
    this.fov = fov;
    this.scene = scene;
    this.stats = stats;
    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
  }

  initScene() {
    this.camera = new PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 128;

    this.scene = new Scene();

    // specify a canvas which is already created in the HTML file and tagged by an id
    // aliasing enabled
    const element = document.getElementById("canvas");
    if (element) {
        this.renderer = new WebGLRenderer({
            canvas: element,
            antialias: true,
        });
    } else {
        throw new Error("HTML Canvas element not found.");
    }

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}