import { Vortex } from "react-loader-spinner";
import css from "./Loader.module.css"

export default function Loader() {
    return (
        <div className={css.overlay}>
            <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
        </div>
    );
}