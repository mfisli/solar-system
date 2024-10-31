import { createContext, useState } from "react";
import { astronomicalUnit, earthRadius, solarSystemList } from "../constants/solarSystem";

interface ViewSettingsContext {
    astronomicalUnit: number;
    relativeRadius: number;
    isZoom?: boolean;
    targetId: string;
    handleSetTarget: (id: string) => void
}

const targetList = ['sun', ...solarSystemList.map(item => item.id)];

const defaultView: ViewSettingsContext = {
    astronomicalUnit: 36,
    relativeRadius: earthRadius * 20,
    isZoom: true,
    targetId: targetList[0],
    handleSetTarget: () => { }
}

export const ViewContext = createContext<ViewSettingsContext>(defaultView);

export const ViewProvider = ({ children }) => {

    const handleSetTarget = (targetId: string) => {
        if (targetList.includes(targetId)) {
            setView(prev => {
                return { ...prev, targetId }
            })
        }
    }

    const [view, setView] = useState<ViewSettingsContext>(defaultView);


    const handleAUChange = (event) => {
        console.log("AU", event.target.value)
        setView(prev => {
            return { ...prev, astronomicalUnit: parseFloat(event.target.value) }
        });
    }

    const handleRadiusChange = (event) => {
        setView(prev => {
            return { ...prev, relativeRadius: parseFloat(event.target.value) }
        });
    }

    const handleZoomChange = () => {
        setView(prev => {
            return { ...prev, isZoom: !prev.isZoom }
        });
    }

    const handleReset = () => {
        setView(defaultView);
    }

    const handleNextTarget = () => {
        const index = targetList.indexOf(view.targetId);
        if (index !== -1) {
            setView(prev => {
                return { ...prev, targetId: targetList[index === targetList.length - 1 ? 0 : index + 1] }
            })
        }
    }

    const handlePrevTarget = () => {
        const index = targetList.indexOf(view.targetId);
        if (index !== -1) {
            setView(prev => {
                return { ...prev, targetId: targetList[index === 0 ? targetList.length - 1 : index - 1] }
            })
        }
    }

    return (
        <>
            <span>Astronomical Unit Scale: {Math.ceil((view.astronomicalUnit / astronomicalUnit) * 100)} %</span> <br />
            <input type="range" step={0.5} min={0} max={astronomicalUnit} value={view.astronomicalUnit} onChange={handleAUChange} /> <br />
            <span>Relative Radius: {Math.ceil((view.relativeRadius / earthRadius) * 100)} %</span> <br />
            <input type="range" step={0.000001} min={earthRadius} max={earthRadius * 50} value={view.relativeRadius} onChange={handleRadiusChange} />
            <button onClick={handleReset}>Reset</button>
            <span>Zoom</span>
            <input type="checkbox" checked={view.isZoom} onChange={handleZoomChange} />
            <button onClick={handlePrevTarget}>Prev</button>
            <span>Target: {view.targetId}</span>
            <button onClick={handleNextTarget}>Next</button>
            <ViewContext.Provider value={{ ...view, handleSetTarget }}>
                {children}
            </ViewContext.Provider>
        </>
    )
}