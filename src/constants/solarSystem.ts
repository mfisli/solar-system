import sunImg from "../assets/sun.jpeg"
import mercuryImg from "../assets/mercury.jpeg"
import venusImg from "../assets/venus.jpeg"
import earthImg from "../assets/earth.jpeg"
import marsImg from "../assets/mars.jpeg"

export interface SystemItemInterface {
    id: string;
    name: string;
    radius: number;    // KM instead?
    positionX: number; // Astronomical unit instead?
    textureFile: string;
    rotation: number;  // km/h instead? Earth is 1670 km/h, sun 7,189 km/h
}

const earthYear = 2 * Math.PI * (1 / 60) * (1 / 60);

export const solarSystemList: SystemItemInterface[] = [
    {
        id: "sun",
        name: "sun",
        radius: 8,
        positionX: 0,
        textureFile: sunImg,
        rotation: 0.001 // relate to earth
    },
    {
        id: "mercury",
        name: "mercury",
        radius: 2,
        positionX: 16,
        textureFile: mercuryImg,
        rotation: earthYear * 4
    },
    {
        id: "venus",
        name: "venus",
        radius: 3,
        positionX: 32,
        textureFile: venusImg,
        rotation: earthYear * 2
    },
    {
        id: "earth",
        name: "earth",
        radius: 4,
        positionX: 48,
        textureFile: earthImg,
        rotation: earthYear
    },
    {
        id: "mars",
        name: "mars",
        radius: 3,
        positionX: 64,
        textureFile: marsImg,
        rotation: earthYear * 0.5
    }
] as const;