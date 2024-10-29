import { createContext, useState } from "react";
import { astronomicalUnit, earthRadius } from "../constants/solarSystem";

interface ScaleContext {
    astronomicalUnit: number;
    relativeRadius: number;
}

export const ScaleContext = createContext<ScaleContext>(
    {
        astronomicalUnit,
        relativeRadius: earthRadius
    }
);

export const ScaleProvider = ({ children }) => {
    const [scale, setScale] = useState<ScaleContext>(
        {
            astronomicalUnit: astronomicalUnit * 0.04,
            relativeRadius: earthRadius * 20
        }
    );

    const handleAUChange = (event) => {
        console.log("AU", event.target.value)
        setScale(prev => {
            return { ...prev, astronomicalUnit: parseFloat(event.target.value) }
        });
    }

    const handleRadiusChange = (event) => {
        setScale(prev => {
            return { ...prev, relativeRadius: parseFloat(event.target.value) }
        });
    }

    return (
        <>
            <span>Astronomical Unit Scale: {Math.ceil((scale.astronomicalUnit / astronomicalUnit) * 100)} %</span> <br />
            <input type="range" step={0.5} min={0} max={astronomicalUnit} value={scale.astronomicalUnit} onChange={handleAUChange} /> <br />

            <span>Relative Radius: {Math.ceil((scale.relativeRadius / earthRadius) * 100)} %</span> <br />
            <input type="range" step={0.000001} min={earthRadius} max={earthRadius * 50} value={scale.relativeRadius} onChange={handleRadiusChange} />
            <ScaleContext.Provider value={scale}>
                {children}
            </ScaleContext.Provider>
        </>
    )
}