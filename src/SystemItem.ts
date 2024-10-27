import { Mesh, MeshBasicMaterial, SphereGeometry,TextureLoader } from "three";
import { PlanetProps } from "./constants/solarSystem";

export default class SystemItem {
  radius: number;
  positionX: number;
  textureFile: string;
  mesh: Mesh | undefined;

  constructor(planet: PlanetProps) {
    this.radius = planet.radius;
    this.positionX = planet.positionX;
    this.textureFile = planet.textureFile;
  }

  getMesh() {
    if (this.mesh === undefined || this.mesh === null) {
      const geometry = new SphereGeometry(this.radius);
      const texture = new TextureLoader().load(this.textureFile);
      const material = new MeshBasicMaterial({ map: texture });
      this.mesh = new Mesh(geometry, material);
      this.mesh.position.x += this.positionX;
    }
    return this.mesh;
  }
}