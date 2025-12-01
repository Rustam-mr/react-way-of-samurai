import React from "react"
import loaderSvg from "../../../assets/images/motion-blur-2.svg"

const Preloader: React.FC = () => {
    return (
        <div>
            <img height={100} src={ loaderSvg } alt="Preloader"/>
        </div>
    )
}

export default Preloader