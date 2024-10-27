import { solarSystemList } from "../constants/solarSystem";
import Planet from "./Planet";
import Stars from "./Stars"
import Sun from "./Sun";

const Scene = () => {
    return (
        <>
            {/* <ambientLight intensity={0} /> */}
            <Sun />
            {solarSystemList.map(item => <Planet key={item.id} {...item} />)}
            <Stars />
        </>
    )
}

export default Scene;