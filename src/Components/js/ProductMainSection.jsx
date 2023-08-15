import {useEffect, createContext, useState, useRef} from "react";
import React from 'react';





import Header from "./Header";
import "../../GlobalStyles.scss"
import HeaderBanner from './HeaderBanner';
import CategoryHomeSlider from  './categorýHomeSlider';
import ExtraServicesHomeSection from './ExtraServicesHomeSection';
import Footer from './Footer';
import ProductSectionCategoryCards from './ProductSectionCategoryCards';
import reorganizeByCategory from "./ContextFilteringHelpers";
import {  useLocation } from "react-router-dom";




export default function ProductsSection() {

      //logica para revisar si estamos vivnendo del filtro para dar scroll hasta las tarjetas
      const scrolRef = useRef();
      const scrolStartRef = useRef();
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
       <div > <HeaderBanner  connectorType="productSectionConnector" /></div>
        <div ref={scrolRef}><ProductSectionCategoryCards  />
      </div>
      <Footer/>
    </div>
  );
}




