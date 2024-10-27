import { useMemo, useRef } from "react";

const PlanetList = () => {
    const planetsRef = useRef();

    const newPlanet = () => {
        const key = "instance_" + Math.random();
        const position = 16;
        const linearVelocity = 0;
        const scale = 3;

        return {
            key, position, linearVelocity, scale
        }
    }

    const planetData = useMemo(() => {
        const list = [newPlanet()];
    }, []);


}