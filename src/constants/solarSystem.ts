import sunImg from "../assets/sun.jpg"
import mercuryImg from "../assets/mercury.jpg"
import venusImg from "../assets/venus.jpg"
import venusAtmosphere from "../assets/venus-atmosphere.jpg"
import earthImg from "../assets/earth.jpg"
import earthBump from "../assets/earth-bump.jpg"
import earthSpec from "../assets/earth-spec.jpg"
import earthAtmophere from "../assets/earth-atmosphere.jpg"
import marsImg from "../assets/mars.jpg"
import jupiterImg from "../assets/jupiter.jpg"
import saturnImg from "../assets/saturn.jpg"
import saturnRingImg from "../assets/saturn-ring.png";
import uranusImg from "../assets/uranus.jpg"
import uranusRingImg from "../assets/uranus-ring.png";
import neptuneImg from "../assets/neptune.jpg"

export interface PlanetProps {
    id: string;
    name: string;
    radius: number;
    positionX: number;
    textureFile: string;
    bumpFile?: string;
    specFile?: string;
    atmosphereFile?: string;
    atmosphereThickness?: number
    year: number;  // km/h instead? Earth is 1670 km/h, sun 7,189 km/h
    ring?: {
        innerRadius: number,
        outerRadius: number,
        thetaSegments: number,
        rotationX: number,
        rotationY: number,
        textureFile: string;
    }
}

const earthYear = (2 * Math.PI * (1 / 120) * (1 / 120)) * 0.3;
export const earthRadius = 0.06371 // 6,371km
export const astronomicalUnit = 1495.97870 // 149,597,870.7 km

export const solarSystemList: PlanetProps[] = [
    {
        id: "mercury",
        name: "mercury",
        radius: 0.3,
        positionX: 0.39,
        textureFile: mercuryImg,
        year: earthYear * 4.14 // 365 / 88
    },
    {
        id: "venus",
        name: "venus",
        radius: 0.94,
        positionX: 0.72,
        textureFile: venusImg,
        atmosphereFile: venusAtmosphere,
        atmosphereThickness: 0.7,
        year: earthYear * 1.62 // 365 / 224.7
    },
    {
        id: "earth",
        name: "earth",
        radius: 1,
        positionX: 1,
        textureFile: earthImg,
        bumpFile: earthBump,
        specFile: earthSpec,
        atmosphereFile: earthAtmophere,
        atmosphereThickness: 0.1,
        year: earthYear
    },
    {
        id: "mars",
        name: "mars",
        radius: 0.53,
        positionX: 1.52,
        textureFile: marsImg,
        year: earthYear * 0.52 // 365 / 699.584
    },
    {
        id: "jupiter",
        name: "jupiter",
        radius: 10.97,
        positionX: 5.20,
        textureFile: jupiterImg,
        year: earthYear * 0.08 // 365 / 4346.475
    },
    {
        id: "saturn",
        name: "saturn",
        radius: 9.14,
        positionX: 9.54,
        textureFile: saturnImg,
        year: earthYear * 0.03, // 365 / 10847.92
        ring: {
            textureFile: saturnRingImg,
            innerRadius: 1,
            outerRadius: 2,
            thetaSegments: 30,
            rotationX: -0.5 * Math.PI,
            rotationY: -0.1 * Math.PI
        }
    },
    {
        id: "uranus",
        name: "uranus",
        radius: 3.98,
        positionX: 19.22,
        textureFile: uranusImg,
        year: earthYear * 0.011, // 365 / 30790.58
        ring: {
            textureFile: uranusRingImg,
            innerRadius: 2.8, // 7
            outerRadius: 3, // 12
            thetaSegments: 30,
            rotationX: -0.5 * Math.PI,
            rotationY: -0.1 * Math.PI
        }
    },
    {
        id: "neptune",
        name: "neptune",
        radius: 3.86,
        positionX: 30.06,
        textureFile: neptuneImg,
        year: earthYear * 0.006 // 365 / 60193.2
    }
] as const;