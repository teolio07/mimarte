import headerBannerImg from "../../Icons/beauty.jpg";
import "../scss/HeaderBanner.scss";
import {CgShoppingBag} from "react-icons/cg"
import {FaAngleDown} from "react-icons/fa";
import {MdKeyboardArrowDown} from "react-icons/md";
import {FiChevronDown} from "react-icons/fi";
import HeaderBannerSectionConnectorType from "./HeaderConnectorType";
import "../../GlobalStyles.scss"

export default function HeaderBanner(props) { /*    aqui decidimos si ponemos el conector de secciones o si usamos el filtro de busqueda de categorias */


    return (
        <div className=" header-banner-container  font-color-30">
            <div className="header-banner__glass-filter"></div>
            <img className="header-banner__img" alt="makeupbackground"
                src={headerBannerImg}/>
            <div className="header-banner__text-container flex-column-center ">
                <div className="flex-column-center header-banner-text1-container  font-mobile-medium-A">
                    <p className="font-400">La <span className="font-color-B font-500">Belleza</span> no es <span >superficial</span>, </p>
                    <p className="header-banner__text2">es una <span className="font-color-B font-500">Expresión</span> de tu <span className="font-color-B font-500">Ser</span>.</p>
                    <FiChevronDown className="header-banner__text-icon font-color-40"/>

                </div>
                {HeaderBannerSectionConnectorType(props.connectorType)} </div>
            {/*  <div>
                <div>
                    <p>Descubre nuestra gama de productos,</p>
                    <p>Resalta lo mejor de ti misma.</p>
                </div>
            </div> */} </div>
    )

}



