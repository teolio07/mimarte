import { BsGift } from "react-icons/bs";
import { BiMapPin } from "react-icons/bi";
import { TbTruckReturn } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";

import "../scss/ExtraServicesHomeSection.scss" ;
export default function ExtraServicesHomeSection (){

    return(
        <section className="font-color-40 extra-services-home-section-main-container bg-A-W-50" >
            <div className="extra-services-home-secton__services-container ">
                <div className="shadow-A extra-services-home-section__service-container extra-services-home-section__service-container-long bg-B-W-100 "> <p>Empaquetado de <span className="font-color-B">regalo.</span></p> <BsGift  className="extra-services-home-section__service__icons font-color-B "/> </div>
                <div className="shadow-A extra-services-home-section__service-container extra-services-home-section__service-container-short bg-B-W-100"> <p>Envíos a <span className="font-color-B">toda colombia.</span></p> <BiMapPin className="extra-services-home-section__service__icons font-color-B "/> </div>
                <div className="shadow-A extra-services-home-section__service-container extra-services-home-section__service-container-short bg-B-W-100"> <p>Devolución <span className="font-color-B">gratis.</span></p> <TbTruckReturn className="extra-services-home-section__service__icons font-color-B "/> </div>
                <div className="shadow-A extra-services-home-section__service-container extra-services-home-section__service-container-short bg-B-W-100"> <p>Productos de <span className="font-color-B">alta calidad.</span></p> <FaRegStar className="extra-services-home-section__service__icons font-color-B "/> </div>
                <div className="shadow-A extra-services-home-section__service-container extra-services-home-section__service-container-short bg-B-W-100"> <p>Atención al cliente <span className="font-color-B">24 hrs.</span></p> <RiCustomerService2Fill className="extra-services-home-section__service__icons  font-color-B"/> </div>
               {/*  <div> <div><p>Envíos a toda colombia.</p></div> <div><BiMapPin/></div>  </div>
                <div> <div><p>Devolución gratis.</p></div> <div><TbTruckReturn/></div>  </div> */}
            </div>
        </section>
    )
}