import { createContext, ReactNode, useReducer, useState } from "react";
import { astronomicalUnit, earthRadius, solarSystemList } from "../constants/solarSystem";
import { id as sunId } from "../components/Sun";

const targetList = [sunId, ...solarSystemList.map(item => item.id)];

interface ViewSettings {
    astronomicalUnit: number;
    relativeRadius: number;
    isZoom: boolean;
    orbitLines: boolean;
    targetId: string;
    labels: boolean;
}

export enum ViewActionType {
    AU = "AU",
    RADIUS = "RADIUS",
    ZOOM = "ZOOM",
    ORBITAL_LINES = "ORBITAL_LINES",
    LABELS = "LABELS",
    RESET = "RESET",
    NEXT_TARGET = "NEXT_TARGET",
    PREV_TARGET = "PREV_TARGET",
    SET_TARGET = "SET_TARGET"
}

interface ViewAction {
    type: ViewActionType,
    payload?: any
}

interface ViewSettingsContext extends ViewSettings {
    dispatch?: React.Dispatch<ViewAction>
}

const defaultView: ViewSettings = {
    astronomicalUnit: 36,
    relativeRadius: earthRadius * 20,
    isZoom: false,
    orbitLines: true,
    targetId: targetList[0],
    labels: false
}

const viewReducer = (state: ViewSettings, action: ViewAction): ViewSettings => {
    const getIndex = () => targetList.indexOf(state.targetId);

    switch (action.type) {
        case ViewActionType.AU:
            return { ...state, astronomicalUnit: action.payload }

        case ViewActionType.RADIUS:
            return { ...state, relativeRadius: action.payload }

        case ViewActionType.ZOOM:
            return { ...state, isZoom: !state.isZoom }

        case ViewActionType.ORBITAL_LINES:
            return { ...state, orbitLines: !state.orbitLines }

        case ViewActionType.LABELS:
            return { ...state, labels: !state.labels }

        case ViewActionType.RESET:
            return { ...defaultView }

        case ViewActionType.NEXT_TARGET:
            const index = getIndex();
            const next = index === targetList.length - 1 ? 0 : index + 1;
            return index === -1 ? state : { ...state, targetId: targetList[next] }

        case ViewActionType.PREV_TARGET:
            // TODO: rename index2; can't re-declare index in switch scope
            const index2 = getIndex();
            const prev = index2 === 0 ? targetList.length - 1 : index2 - 1;
            return index2 === -1 ? state : { ...state, targetId: targetList[prev] }

        case ViewActionType.SET_TARGET:
            return { ...state, targetId: action.payload }

        default:
            state;
    }
    return state; // TODO: fix typing
}

export const ViewContext = createContext<ViewSettingsContext>(defaultView);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(viewReducer, defaultView);
    const [hideMenu, setHideMenu] = useState(false);

    const handleAUChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ViewActionType.AU,
            payload: parseFloat(event.target.value)
        });
    }

    const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ViewActionType.RADIUS,
            payload: parseFloat(event.target.value)
        });
    }

    const handleZoomChange = () => {
        dispatch({
            type: ViewActionType.ZOOM
        });
    }

    const handleOrbitLinesChange = () => {
        dispatch({
            type: ViewActionType.ORBITAL_LINES
        });
    }

    const handleLabelsChange = () => {
        dispatch({
            type: ViewActionType.LABELS
        });
    }

    const handleReset = () => {
        dispatch({
            type: ViewActionType.RESET
        });
    }

    const handleNextTarget = () => {
        dispatch({
            type: ViewActionType.NEXT_TARGET
        })
    }

    const handlePrevTarget = () => {
        dispatch({
            type: ViewActionType.PREV_TARGET
        })
    }

    return (
        <>
            <div className="setting-wrapper position-absolute z-index-front container">
                <div className={hideMenu ? 'opacity-50' : 'field-group'}>
                    <button onClick={() => setHideMenu(prev => !prev)}>{hideMenu ? '>' : '< Hide Menu'}</button>
                </div>
                {!hideMenu &&
                    <>
                        <div className="field-group">
                            <div className="flex w-100 justify-space-between">
                                <button onClick={handlePrevTarget}>Prev</button>
                                <span className="target-text">{state.targetId}</span>
                                <button onClick={handleNextTarget}>Next</button>
                            </div>
                        </div>
                        <div className="field-group">
                            <input type="checkbox" id="fixed-zoom" checked={state.isZoom} onChange={handleZoomChange} />
                            <label htmlFor='fixed-zoom'>Fixed Zoom</label>
                        </div>
                        <div className="field-group">
                            <input type="checkbox" id="orbit-lines" checked={state.orbitLines} onChange={handleOrbitLinesChange} />
                            <label htmlFor='orbit-lines'>Orbit Lines</label>
                        </div>
                        <div className="field-group">
                            <input type="checkbox" id="labels" checked={state.labels} onChange={handleLabelsChange} />
                            <label htmlFor='labels'>Labels</label>
                        </div>
                        <div className="field-group">
                            <label htmlFor='au'>Astronomical Unit Scale: {Math.ceil((state.astronomicalUnit / astronomicalUnit) * 100)}%</label> <br />
                            <input type="range" id="au" step={0.5} min={0.0001} max={astronomicalUnit} value={state.astronomicalUnit} onChange={handleAUChange} /> <br />
                        </div>
                        <div className="field-group">
                            <label htmlFor='radius'>Relative Radius: {Math.ceil((state.relativeRadius / earthRadius) * 100)}%</label> <br />
                            <input type="range" id="radius" step={0.000001} min={earthRadius} max={earthRadius * 50} value={state.relativeRadius} onChange={handleRadiusChange} />
                        </div>
                        <div className="field-group">
                            <button onClick={handleReset}>Reset</button>
                        </div>
                        <a href="https://maksfisli.com" target="_blank">maksfisli.com</a>
                    </>
                }
            </div>
            <ViewContext.Provider value={{ ...state, dispatch }}>
                {children}
            </ViewContext.Provider>
        </>
    )
}