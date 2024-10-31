import { solarSystemList } from "../constants/solarSystem";
import { CameraProvider } from "../context/Camera";
import Planet from "./Planet";
import Stars from "./Stars"
import Sun from "./Sun";

const Scene = () => {
    return (
        <>
            {/* <CameraProvider> */}
            <Sun />
            {solarSystemList.map(item => <Planet key={item.id} {...item} />)}
            <Stars />
            {/* </CameraProvider> */}
        </>
    )
}

export default Scene;