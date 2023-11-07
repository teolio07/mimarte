import headerBannerImg from "../../Icons/beauty.jpg";
import "../scss/HeaderBanner.scss";
import {CgShoppingBag} from "react-icons/cg"
import {CiDeliveryTruck} from "react-icons/ci";

import {VscActivateBreakpoints} from "react-icons/vsc"


import { PiMapPinLineThin ,PiGiftThin} from "react-icons/pi";


import "../../GlobalStyles.scss"

export default function HeaderBanner(props) { /*    aqui decidimos si ponemos el conector de secciones o si usamos el filtro de busqueda de categorias */


    return (
        <div className={` header-banner-container  font-color-100 ${props.productSectionMod? "header-banner-container-productSection-mod" : "" } `}>
            <div className="header-banner__glass-filter"></div>
            <img className="header-banner__img" alt="makeupbackground"
                src={headerBannerImg}/>
            {props.section === "product" 
            
            
            
            ? <div className="header-banner-product-section-text-main-container flex-row-center">
                <div>
                <PiGiftThin className="product-section-banner-icon font-color-40" size={44} />
                <CiDeliveryTruck className="product-section-banner-icon font-color-40" size={44} />
                <PiMapPinLineThin className="product-section-banner-icon font-color-40" size={44} />
                </div>
                </div>
            
            
            
            : <div className="header-banner__text-container flex-row-center">
                <div className=" flex-row-center header-banner-text1-container  font-mobile-small-A">
                   <div className={``} >
                   <p className="font-400">La <span className="font-color-100 font-500">Belleza</span> no es <span >superficial</span>, </p>
                    <p className="header-banner__text2">es una <span className="font-color-100 font-500">Expresión</span> de tu <span className="font-color-100 font-500">Ser</span>.</p>
                   </div>
                    

                </div>
              
                <div className="header-text-bar">
                    <VscActivateBreakpoints/>
                </div>
                
            {/*    <div className="flex-column-center">
               <FiChevronDown className="header-banner__text-icon font-color-100"/>
               </div> */}
               </div>
            }
            
            {/*  <div>
                <div>
                    <p>Descubre nuestra gama de productos,</p>
                    <p>Resalta lo mejor de ti misma.</p>
                </div>
            </div> */} 
            
        </div>
    )

}



