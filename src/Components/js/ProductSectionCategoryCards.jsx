import React, {  useContext } from 'react';

import { ProductsContext } from '../../App.js';

import ProductSectionCategoryCardSectionLabel from './ProductSectionCategoryCardSection.jsx';
import MoonLoader from "react-spinners/MoonLoader";

//importing css styles
import "../scss/ProductSectionCategoryCards.scss"

 export default function ProductSectionCategoryCards(props) {


  









  //aqui nos traemos del contexto global de categorias, el array
    
     const { products, updateProducts } = useContext(ProductsContext);

     


    
    

    //aqui iteramos el array para saber cuantas secciones de tarjetas hay que renderizar
    //recordemos que hay categorias que como tienen mas de 10 productos, tendrian otra propiedad que indique si es necesario realizar paginación
    //Dado el caso que si tenga paginación, un separador de condicional nos ayudaría a separar el tipo de componente de tarjeta que queremos

   /*  return productsOrdered.forEach((category, index)=>{
        return(<ProductSectinCategoryCardsLabel categoryProp={category} />)
    }) */

    if (products.length === 0) {
        return <div className='category-cards__noload-spinner-container flex-row-center bg-A-W-50'>
               <MoonLoader className="loading-spinner" size={60} color={'#8e3e4a'} loading={true} />
        </div>;
      }
    
      if (products.length > 0){
        return products.map((product,index) => {
        
            return(<div  key={products[index].products[0].id_category}>
    
               
                <ProductSectionCategoryCardSectionLabel categoryProp={product} />
            </div>)
        })
      }

}













