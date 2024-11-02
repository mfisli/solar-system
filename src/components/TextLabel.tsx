import { Html } from "@react-three/drei"
import { ReactNode, useContext } from "react";
import { ViewContext } from "../context/View";

const TextLabel = ({ children }: { children: ReactNode }) => {
    const { labels } = useContext(ViewContext);

    if (!labels) {
        return null;
    }

    return (
        <Html>
            <div className="text-label">
                {children}
            </div>
        </Html>
    )
}

export default TextLabel;