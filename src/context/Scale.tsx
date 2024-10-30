import { createContext, useState } from "react";
import { astronomicalUnit, earthRadius } from "../constants/solarSystem";

interface ScaleContext {
    astronomicalUnit: number;
    relativeRadius: number;
    isZoom?: boolean;
}

const defaultScale = {
    astronomicalUnit: 36,
    relativeRadius: earthRadius * 20
}

export const ScaleContext = createContext<ScaleContext>(
    defaultScale
);

export const ScaleProvider = ({ children }) => {
    const [scale, setScale] = useState<ScaleContext>(
        defaultScale
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

    const handleZoomChange = () => {
        setScale(prev => {
            return { ...prev, isZoom: !prev.isZoom }
        });
    }

    const handleReset = () => {
        setScale(defaultScale);
    }

    return (
        <>
            <span>Astronomical Unit Scale: {Math.ceil((scale.astronomicalUnit / astronomicalUnit) * 100)} %</span> <br />
            <input type="range" step={0.5} min={0} max={astronomicalUnit} value={scale.astronomicalUnit} onChange={handleAUChange} /> <br />
            <span>Relative Radius: {Math.ceil((scale.relativeRadius / earthRadius) * 100)} %</span> <br />
            <input type="range" step={0.000001} min={earthRadius} max={earthRadius * 50} value={scale.relativeRadius} onChange={handleRadiusChange} />
            <button onClick={handleReset}>Reset</button>
            <span>Zoom</span>
            <input type="checkbox" onChange={handleZoomChange} />
            <ScaleContext.Provider value={scale}>
                {children}
            </ScaleContext.Provider>
        </>
    )
}