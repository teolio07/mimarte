
// PopupProductContext.js
import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom'
import { PopupProductContext, usePopupProductContext } from './PopupProductModalContext';
import "../scss/PopupProductModalContent.scss";
import PuffLoader from "react-spinners/PuffLoader";
import MoonLoader from "react-spinners/MoonLoader";

import { FiChevronLeft } from "react-icons/fi";
import { MdWhatsapp,MdClose } from "react-icons/md";

import { RiMoreLine } from "react-icons/ri";
import { Fade, JackInTheBox, Hinge, Slide, Zoom, Roll, Bounce } from "react-awesome-reveal";

import "../../GlobalStyles.scss"



function PopupProductModal() {

  const { popupState, setPopupState, productModalInfo, setProductModalInfo } = useContext(PopupProductContext);
  const portalRoot = document.getElementById('portal-root'); // Selecciona un elemento en el DOM donde renderizar el portal



  //estado para controlar el estado expandido de la descripcion del producto
  const [descriptionContainerExpanded, setDescriptioncontainerExpanded] = useState(false);

  //logica para cerrar el modal y borrar el contenido del estado del producto
  function handleModalState() {
    setPopupState(false);
    setProductModalInfo({});
    setDescriptioncontainerExpanded(false)
  }
  if (popupState) {



    return ReactDOM.createPortal(
      <section className='popup-product-modal__outside-container font-mobile-small-A flex-column-center font-color-40'>



        <MoonLoader
          className='popup-product-modal__loader-animated'
          color={"#8e3e4a"}
          loading={Object.keys(productModalInfo).length === 0}

          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {Object.keys(productModalInfo).length > 0 ?
          <div className='popup-product-modal__inner-container  '>
          
          <div onClick={handleModalState} className='popup-product-modal__close-modal-button-container flex-column-center'>
                <div className=' flex-row-center br-6 '> <MdClose className='popup-product-modal__close-icon' /></div>
              </div>

            <JackInTheBox duration={1000} className='br-6 popup-product-modal__image-container flex-row-center bg-B-W-100  '>

              <img className='br-6' src={productModalInfo.image} alt="" />

            </JackInTheBox>

            <Fade delay={100} duration={1200} className='popup-product-modal__info-outside-container flex-column-center'>
            
              <div>
                <div className='br-6 popup-product-modal__info-container bg-B-W-100'>

                  <div className='popup-product-modal__main-info-container'>
                    <p className='modal-product__name m-tb-6px font-600 ' >{productModalInfo.name}</p>
                    <p className='modal-product__price m-tb-6px '>Precio: <span className='font-600 font-color-B'> {productModalInfo.price}</span> COP. </p>
                  </div>
                  <div>

                    <p>Stock disponible: <span className='font-color-B'>{productModalInfo.stock}</span></p>
                  </div>
                  <div className={` modal-product-modal__info__description-container ${descriptionContainerExpanded ? "description-show" : ""}`}>
                    <p className='m-tb-6px font-600'>Descripción:</p>
                    <p className='m-tb-6px'>{productModalInfo.description}
                      <p>El producto de maquillaje que te presentamos es una base
                        líquida de alta cobertura y larga duración. Esta base ha sido
                        especialmente formulada para brindarte un acabado impecable y
                        natural durante fff
                        fffffffff
                        fffffhdsjfjksdhafhdsfjdskafdsa
                        fadsjfjsdaflasljdfjajsd
                        <br />
                        faslkdfjañlskdjflkjasdfjñlsadfj
                        asdfjkalsjdflasldñfjkñadjsjfkl
                        asjdfklasdkfljasdjsafjasd
                        <br />
                        fasdlkfjaksdjñfjadsj
                        <br />
                        faslkdfjasjdfñadjsf
                        asdlkfñjasñlkdfadjs
                        fasdlkfñasdfjkasdf
                        asdfjlkjasdjfñlasdjlñfjkads
                        fljasdkjfñklasdjklfjasdf
                        asdklfjasñdfñkaskdjfa
                        sdfjklasdjfñasdñfjads
                        f
                        asdjkfljasdklñfjkasdkfasd
                        f
                        as
                        <br />
                        dljfasjf
                        asdlfñkjasldkjflkasjdlñfkjañsdf
                        asdlñfkjañlskjdflasdja
                        sdtodo el día. Su fórmula ligera se desliza suavemente
                        sobre la piel, difuminando las imperfecciones y proporcionando una
                        apariencia radiante. </p>

                    </p>


                  </div>
                  <div className='flex-row-center popup-product-modal__expand-icon-container'>{!descriptionContainerExpanded && <RiMoreLine onClick={() => setDescriptioncontainerExpanded(true)} className='font-color-30 modal-product__description__expand-icon' />}</div>
                </div>
                <div className=' popup-product-modal__buy-button-container '>

                  <div className='br-6 popup-product-modal__buy-button bg-B-W-100 flex-row-center'>
                    <p className='font-600'>Comprar Via Whatsapp!</p> <MdWhatsapp />
                  </div>



                </div>
              </div>


            </Fade>
          </div>
          : ""
        }

      </section>,
      portalRoot // Renderiza el contenido en el nodo del portal
    );
  }
}

export default PopupProductModal;




