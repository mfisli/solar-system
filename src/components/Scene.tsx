import Stars from "./Stars"
import Sun from "./Sun";

const Scene = () => {
    return (
        <>
            <ambientLight intensity={2} />
            <Sun />
            <Stars />
        </>
    )
}

export default Scene;