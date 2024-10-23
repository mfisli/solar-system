import { BoxGeometry, Mesh, MeshNormalMaterial } from "three";

export default class Rotation {
    planetPositionX: any;
    y: number;
    z: number;
    showRotation: boolean;
    mesh: Mesh | undefined;

  constructor(planetMesh: Mesh, showRotation = true) {
    this.planetPositionX = planetMesh.position.x;
    this.y = 0.25;
    this.z = 0.25;
    this.showRotation = showRotation;
  }

  getMesh() {
    if (!this.mesh) {
      const geometry = new BoxGeometry(this.planetPositionX, 0.25, 0.25);
      const material = new MeshNormalMaterial();
      this.mesh = new Mesh(geometry, material);
      this.mesh.position.x = this.planetPositionX / 2;
      this.mesh.visible = this.showRotation;
    }
    return this.mesh;
  }
}