import sunImg from "../assets/sun.jpeg"
import mercuryImg from "../assets/mercury.jpeg"
import venusImg from "../assets/venus.jpeg"
import earthImg from "../assets/earth.jpg"
import earthBump from "../assets/earthBump.jpg"
import earthSpec from "../assets/earthSpec.jpg"
import earthAtmophere from "../assets/earthCloud.jpg"
import marsImg from "../assets/mars.jpeg"
import jupiterImg from "../assets/jupiter.jpeg"
import saturnImg from "../assets/saturn.jpeg"
import saturnRingImg from "../assets/saturn-ring.png";
import uranusImg from "../assets/uranus.jpeg"
import uranusRingImg from "../assets/uranus-ring.png";
import neptuneImg from "../assets/neptune.jpeg"

export interface PlanetProps {
    id: string;
    name: string;
    radius: number;    // KM instead?
    positionX: number; // Astronomical unit instead?
    textureFile: string;
    bumpFile?: string;
    specFile?: string;
    atmosphereFile?: string;
    year: number;  // km/h instead? Earth is 1670 km/h, sun 7,189 km/h
    ring?: {
        innerRadius: number,
        outerRadius: number,
        thetaSegments: number,
        rotationX: number,
        rotationY: number,
        textureFile: string;
    }
    // tilt: number // degrees
}

const earthYear = 2 * Math.PI * (1 / 120) * (1 / 120);
const earthRadius = 6.3 // 6,371km
const astronomicalUnit = 149.5 * .90 // 149,597,870.7 km

export const solarSystemList: PlanetProps[] = [
    // {
    //     id: "sun",
    //     name: "sun",
    //     radius: earthRadius * 109, // 695,700 
    //     positionX: 0,
    //     textureFile: sunImg,
    //     year: 0.001 // TODO: relative to earth
    // },
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
        bumpFile: earthBump,
        specFile: earthSpec,
        atmosphereFile: earthAtmophere,
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
        year: earthYear * 0.03, // 365 / 10847.92
        ring: {
            textureFile: saturnRingImg,
            innerRadius: earthRadius * 10,
            outerRadius: earthRadius * 20,
            thetaSegments: earthRadius * 30,
            rotationX: -0.5 * Math.PI,
            rotationY: -0.1 * Math.PI
        }
    },
    {
        id: "uranus",
        name: "uranus",
        radius: earthRadius * 3.98,
        positionX: astronomicalUnit * 19.22,
        textureFile: uranusImg,
        year: earthYear * 0.011, // 365 / 30790.58
        ring: {
            textureFile: uranusRingImg,
            innerRadius: earthRadius * 7,
            outerRadius: earthRadius * 12,
            thetaSegments: earthRadius * 30,
            rotationX: -0.5 * Math.PI,
            rotationY: -0.1 * Math.PI
        }
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