import sunImg from "../assets/sun.jpeg"
import mercuryImg from "../assets/mercury.jpeg"
import venusImg from "../assets/venus.jpeg"
import earthImg from "../assets/earth.jpeg"
import marsImg from "../assets/mars.jpeg"
import jupiterImg from "../assets/jupiter.jpeg"
import saturnImg from "../assets/saturn.jpeg"
import uranusImg from "../assets/uranus.jpeg"
import neptuneImg from "../assets/neptune.jpeg"

export interface SystemItemInterface {
    id: string;
    name: string;
    radius: number;    // KM instead?
    positionX: number; // Astronomical unit instead?
    textureFile: string;
    year: number;  // km/h instead? Earth is 1670 km/h, sun 7,189 km/h
}

const earthYear = 2 * Math.PI * (1 / 60) * (1 / 60);
const earthRadius = 0.063 // 6,371km
const astronomicalUnit = 149.5 // 149,597,870.7 km

export const solarSystemList: SystemItemInterface[] = [
    {
        id: "sun",
        name: "sun",
        radius: earthRadius * 109, // 695,700 
        positionX: 0,
        textureFile: sunImg,
        year: 0.001 // TODO: relative to earth
    },
    {
        id: "mercury",
        name: "mercury",
        radius: earthRadius * 0.3,
        positionX: astronomicalUnit * 0.39,
        textureFile: mercuryImg,
        year: earthYear * 4.14 // 365 / 88
    },
    {
        id: "venus",
        name: "venus",
        radius: earthRadius * 0.94,
        positionX: astronomicalUnit * 0.72,
        textureFile: venusImg,
        year: earthYear * 1.62 // 365 / 224.7
    },
    {
        id: "earth",
        name: "earth",
        radius: earthRadius,
        positionX: astronomicalUnit,
        textureFile: earthImg,
        year: earthYear
    },
    {
        id: "mars",
        name: "mars",
        radius: earthRadius * 0.53,
        positionX: astronomicalUnit * 1.52,
        textureFile: marsImg,
        year: earthYear * 0.52 // 365 / 699.584
    },
    {
        id: "jupiter",
        name: "jupiter",
        radius: earthRadius * 10.97,
        positionX: astronomicalUnit * 5.20,
        textureFile: jupiterImg,
        year: earthYear * 0.08 // 365 / 4346.475
    },
    {
        id: "saturn",
        name: "saturn",
        radius: earthRadius * 9.14,
        positionX: astronomicalUnit * 9.54,
        textureFile: saturnImg,
        year: earthYear * 0.03 // 365 / 10847.92
    },
    {
        id: "uranus",
        name: "uranus",
        radius: earthRadius * 3.98,
        positionX: astronomicalUnit * 19.22,
        textureFile: uranusImg,
        year: earthYear * 0.011 // 365 / 30790.58
    },
    {
        id: "neptune",
        name: "neptune",
        radius: earthRadius * 3.86,
        positionX: astronomicalUnit * 30.06,
        textureFile: neptuneImg,
        year: earthYear * 0.006 // 365 / 60193.2
    }
] as const;