import {useEffect,  useRef} from "react";
import React from 'react';





import Header from "./Header";
import "../../GlobalStyles.scss"
import HeaderBanner from './HeaderBanner';

import Footer from './Footer';
import ProductSectionCategoryCards from './ProductSectionCategoryCards';

import {  useLocation } from "react-router-dom";
import HeaderBannerSectionConnectorType from "./HeaderConnectorType";




export default function ProductsSection() {

      //logica para revisar si estamos vivnendo del browser para dar scroll hasta las tarjetas
      const scrolRef = useRef();
      
      const location = useLocation();
      const parametro = location.state?.parametro ?? 'valor por defecto';
      
      if (parametro === "browser-filtered") {
        scrolRef.current?.scrollIntoView({ behavior: 'smooth' });
      }


      //controla el scroll que hace cuando se carga el componente
      useEffect(() => {
        const scrollOffset = 164; // Ajusta el valor para posicionar la referencia más arriba
        if (scrolRef.current) {
            const currentPosition = scrolRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: currentPosition - scrollOffset,
                behavior: 'smooth'
            });
        }
    }, []);




  return (
    <div>
      {/* Proporcionamos el contexto a los componentes hijos */}
      
        <Header />
       <div > <HeaderBanner   /></div>
       <HeaderBannerSectionConnectorType connectorType="productSectionConnector"/>
        <div ref={scrolRef}><ProductSectionCategoryCards  />
      </div>
      <Footer/>
    </div>
  );
}




