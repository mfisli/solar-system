import { createContext, useState } from "react";
import { astronomicalUnit } from "../constants/solarSystem";

export const ScaleContext = createContext(astronomicalUnit);

export const ScaleProvider = ({ children }) => {
    const [value, setValue] = useState(astronomicalUnit);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <>
            <span>Astronomical Unit scale: {Math.ceil((value / astronomicalUnit) * 100)} %</span> <br />
            <input type="range" min={0} max={astronomicalUnit} value={value} onChange={handleChange} />
            <ScaleContext.Provider value={value}>
                {children}
            </ScaleContext.Provider>
        </>
    )
}