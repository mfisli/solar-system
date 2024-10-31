import { createContext, ReactNode, useState } from "react";
import { astronomicalUnit, earthRadius, solarSystemList } from "../constants/solarSystem";
import { id as sunId } from "../components/Sun";

interface ViewSettingsContext {
    astronomicalUnit: number;
    relativeRadius: number;
    isZoom: boolean;
    orbitLines: boolean;
    targetId: string;
    handleSetTarget: (id: string) => void
}

const targetList = [sunId, ...solarSystemList.map(item => item.id)];

const defaultView: ViewSettingsContext = {
    astronomicalUnit: 36,
    relativeRadius: earthRadius * 20,
    isZoom: false,
    orbitLines: true,
    targetId: targetList[0],
    handleSetTarget: () => { }
}

export const ViewContext = createContext<ViewSettingsContext>(defaultView);

export const ViewProvider = ({ children }: { children: ReactNode }) => {

    const handleSetTarget = (targetId: string) => {
        if (targetList.includes(targetId)) {
            setView(prev => {
                return { ...prev, targetId }
            })
        }
    }

    const [view, setView] = useState<ViewSettingsContext>(defaultView);
    const [hideMenu, setHideMenu] = useState(false);


    const handleAUChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setView(prev => {
            return { ...prev, astronomicalUnit: parseFloat(event.target.value) }
        });
    }

    const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setView(prev => {
            return { ...prev, relativeRadius: parseFloat(event.target.value) }
        });
    }

    const handleZoomChange = () => {
        setView(prev => {
            return { ...prev, isZoom: !prev.isZoom }
        });
    }


    const handleOrbitLinesChange = () => {
        setView(prev => {
            return { ...prev, orbitLines: !prev.orbitLines }
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
            <div className="setting-wrapper position-absolute z-index-front container">
                <div className="field-group">
                    <button className={hideMenu ? 'opacity-50' : ''} onClick={() => setHideMenu(prev => !prev)}>{hideMenu ? '>' : '< Hide Menu'}</button>
                </div>
                {!hideMenu &&
                    <>
                        <div className="field-group">
                            <div className="flex w-100 justify-space-between">
                                <button onClick={handlePrevTarget}>Prev</button>
                                <span className="target-text">{view.targetId}</span>
                                <button onClick={handleNextTarget}>Next</button>
                            </div>
                        </div>
                        <div className="field-group">
                            <input type="checkbox" id="fixed-zoom" checked={view.isZoom} onChange={handleZoomChange} />
                            <label htmlFor='fixed-zoom'>Fixed Zoom</label>
                        </div>
                        <div className="field-group">
                            <input type="checkbox" id="orbit-lines" checked={view.orbitLines} onChange={handleOrbitLinesChange} />
                            <label htmlFor='orbit-lines'>Orbit Lines</label>
                        </div>
                        <div className="field-group">
                            <label>Astronomical Unit Scale: {Math.ceil((view.astronomicalUnit / astronomicalUnit) * 100)}%</label> <br />
                            <input type="range" step={0.5} min={0} max={astronomicalUnit} value={view.astronomicalUnit} onChange={handleAUChange} /> <br />
                        </div>
                        <div className="field-group">
                            <label>Relative Radius: {Math.ceil((view.relativeRadius / earthRadius) * 100)}%</label> <br />
                            <input type="range" step={0.000001} min={earthRadius} max={earthRadius * 50} value={view.relativeRadius} onChange={handleRadiusChange} />
                        </div>
                        <div className="field-group">
                            <button onClick={handleReset}>Reset</button>
                        </div>
                        <a href="https://maksfisli.com" target="_blank">maksfisli.com</a>
                    </>
                }
            </div>
            <ViewContext.Provider value={{ ...view, handleSetTarget }}>
                {children}
            </ViewContext.Provider>
        </>
    )
}