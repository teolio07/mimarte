import { useEffect, useState, useRef, useContext } from "react";

import { BiChevronRight, BiChevronLeft, BiChevronDown } from "react-icons/bi";
import { ProductsContext } from '../../App.js';

import {
  Fade,
  JackInTheBox,
  Hinge,
  Slide,
  Zoom,
  Roll,
  Bounce,
} from "react-awesome-reveal";

import "../scss/ProductSectionCategoryCardSection.scss";
import "../../GlobalStyles.scss";
import { PopupProductContext } from "./PopupProductModalContext";

import { productModalVerificationCall, reorganizeArrayByFilteredResults } from "./ContextFilteringHelpers";
import { BsFilterLeft } from "react-icons/bs";

// estado que va a manejar la cantidad de cards a renderizar, ya que varian dependiendo de la anchura de la pantalla y de si damos click en ver más.
let cardsQuantity = 0;

// funcion para el procentaje

let precioFinal;

function porcentaje(precio) {
  // esta funcion crea los porcentajes entre precio y fPrecio
  // Generar un porcentaje aleatorio entre 10 y 35
  const porcentaje = Math.floor(Math.random() * 26) + 10;

  // Calcular el incremento al precio original
  const incremento = (precio * porcentaje) / 100;

  // Calcular el nuevo precio
  precioFinal = precio + incremento;

  // Calcular el porcentaje de descuento en relación al precio original
  let porcentajeDescuento = ((precioFinal - precio) / precio) * 100;
  porcentajeDescuento = ((precio - precioFinal) / precioFinal) * 100;

  // Devolver el porcentaje de aumento y el precio final
  return Math.abs(Math.ceil(porcentajeDescuento));
}

export default function ProductSectionCategoryCardSectionLabel({
  categoryProp,
}) {
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);
  const [categoryProductState, setCategoryProductState] = useState();
  const [CardLabelExpandState, setCardLabelExpandState] = useState();

  useEffect(() => {
    setCategoryProductState(categoryProp.products);
    setCardLabelExpandState(categoryProp.products.length > 10);

    const manejarCambioTamaño = () => {
      setAnchoPantalla(window.innerWidth);
    };

    window.addEventListener("resize", manejarCambioTamaño);

    return () => {
      window.removeEventListener("resize", manejarCambioTamaño);
    };
  }, [categoryProp.products]);



  //logica para el boton de filtrado de los resultados

  const { products, updateProducts } = useContext(ProductsContext);
  //esta funcion va a editar el contexto global para que filtre los datos por precio, nuevo y mas vendido
    function filterProducts (e){

      let filterValue = e.target.getAttribute("value");
      let filterCategory = e.target.getAttribute("categoryname");
      //ahora filtramreos el contexto
        let filterArrayResult = reorganizeArrayByFilteredResults(products,filterCategory, filterValue)

      console.log(filterArrayResult) 
      
    }








  let breakpoints = {
    sss: [100, 6],
    ssm: [400, 6],
    mms: [500, 6],
    mmm: [600, 6],
    mml: [700, 6],
    lls: [800, 6],
    llm: [900, 6],
    lll: [1000, 6],
    xls: [1200, 5],
    xlm: [1400, 5],
    xll: [1600, 5],
  };

  const howManyCards = () => {
    let cardsQuantity = 0;
    let breakPointsArray = Object.entries(breakpoints);

    breakPointsArray.forEach((breakpoint) => {
      if (breakpoint[1][0] <= anchoPantalla) {
        cardsQuantity = breakpoint[1][1];
      }
    });

    return cardsQuantity;
  };

  const cardsQuantity = howManyCards();

  // Función para desplazarse hasta el inicio del componente

  const componentRef = useRef(null);



  //funcion para manejar el filtro de las cards

  return (
    <div
      ref={componentRef}
      className="category-product-section-main-container bg-A-W-50 font-color-40"
    >
      <div className="flex-row-center ">
        <div className="category-product-section__category-txt-container flex-row-center">
          <p className="font-500 category-product-section__category-name-txt bg-B-W-100">
            {categoryProp.category_name} 
          </p>

          <div  className="category-product-section__cards-filter-button-container">

            <BsFilterLeft  className=" bg-B-W-100 card-filter-button" size={18} />

            <div className="filter-options">
                <p categoryname={categoryProp.category_name} value="less-price" onClick={(e)=> filterProducts(e)}>Menor Precio</p>
                <p categoryname={categoryProp.category_name} value="new" onClick={(e)=> filterProducts(e)}>Más Nuevo</p>
                <p categoryname={categoryProp.category_name} value="most-sold" onClick={(e)=> filterProducts(e)}>Más Vendido</p>
            </div>
          </div>

        </div>
      </div>
      {<Cards categoryProp={categoryProp} cardsQuantity={cardsQuantity} />}{" "}
    </div>
  );
}

function Cards({ categoryProp, cardsQuantity }) {
  const [cardQuantityState, setCardQuantityState] = useState(cardsQuantity);
  const [expandedCardsState, setExpandedCardsState] = useState(false);
  let cardsRemaining = 0;

  useEffect(() => {
    setCardQuantityState(cardsQuantity);
  }, [cardsQuantity]);

  function handleCardsQuiantityExpanded() {
    setExpandedCardsState(true);
  }

  if (!expandedCardsState) {
    return (
      <div className="category-product-section-card-outside-main-container flex-column-center font-mobile-small-A font-color-40">
        <div className="category-product-section-card-grid-container position-relative">

          {categoryProp.products.map((product, index) => {
            if (index < cardQuantityState) {
              return <Cardlabel key={product.product_id} product={product} />;
            } else {
              cardsRemaining = cardQuantityState - categoryProp.products.length;

              return null; // Se agrega un return null para el caso en que no se renderice ninguna tarjeta
            }
          })}{" "}
        </div>
        <div className="category-product-section__seemore-container flex-row-center">
          <div className="category-product-section__seemore-flex-container">
            {Math.abs(cardsRemaining) > 4 && (
              <div>
                <p
                  className="category-product-section__category-seemore-button "
                  onClick={handleCardsQuiantityExpanded}
                >
                  {" "}
                  <BiChevronDown className="category-product-section__seemore-icon" />{" "}
                </p>
                {/* icon */}{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (expandedCardsState) {
    return (
      <CardsPaginated
        products={categoryProp.products}
        categoryName={categoryProp.category_name}
      />
    );
  }
}

// logica para las label de tarjetas que tienen pagianción

function CardsPaginated({ products, categoryName }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;



  // Calcular el índice inicial y final de los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Función para cambiar a la página siguiente
  // Función para cambiar a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);

      if (window.innerWidth < 1200) {
        // detectar modo móvil
      }
    }
  };

  // Función para cambiar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      if (window.innerWidth < 1200) {
      }
    }
  };

  // Función para cambiar a una página específica
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="font-color-40 flex-column-center">
      <div className="category-product-section-card-grid-container ">
        {currentProducts.map((product, index) => (
          <Cardlabel
            key={index}
            cardAnimated={true}
            duration={1000}
            product={product}
          />
        ))}
      </div>
      <div className=" flex-row-center category-product-section__card__pagination-button-container ">
        <button
          className="bg-B-W-100 font-color-40 flex-row-center"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <BiChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={
              currentPage === index + 1
                ? "pagination-button-disabled "
                : "pagination-button-enabled font-color-40 bg-B-W-100"
            }
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="font-color-40 bg-B-W-100 flex-row-center"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          <BiChevronRight />
        </button>
      </div>
    </div>
  );
}

function Cardlabel(props) {
  //product, cardAnimated = true, duration = 1000
  const { popupState, setPopupState, productModalInfo, setProductModalInfo } =
    useContext(PopupProductContext);
  //funcion para abrir el modal del producto
  function handlePopUpProductModal(id) {
    //primero abrimos el modal
    setPopupState(true);
    //luego hacemos la lllamada a la api para verificar nuevamente el producto
    productModalVerificationCall(id)
      .then((productForModal) => {
        // Aquí puedes utilizar los datos obtenidos del producto
        //modificamos el contexto del producto mostrado en el modal
      
        setProductModalInfo(productForModal[0][0]);
      })
      .catch((error) => {
        // Manejo de errores en caso de que ocurra algún problema al llamar a la API
        console.error("Error al llamar a la función:", error);
      });
  }

  if (props.cardAnimated) {
    return (
      <Fade
        cascade="true"
        direction="top"

        damping={1}
        duration={500}
        className="shadow-A card-hover-animated   category-product-section__card-main-container bg-B-W-100 "
        key={props.product.product_id}
      >
        <div
          onClick={() => handlePopUpProductModal(props.product.product_id)}
          className="flex-column-center"
        >
          <div className="category-product-section__card__percentage__container font-mobile-small-B font-600">
            <p className="font-mobile-small-B ">
              {porcentaje(props.product.price)}%{" "}
              <span className="font-mobile-small-C font-500">Off</span>{" "}
            </p>
          </div>
          <div className="category-product-section__image-container flex-row-center ">
            <img
              src={props.product.image}
              draggable="false"
              alt={props.product.name}
            />
          </div>
          <div className="category-product-section__name-container font-600 font-mobile-small-B">
            <p>{props.product.name}</p>
          </div>
          <div className="category-product-section__prices-container ">
            <p className="product-real-price font-mobile-small-B font-600 font-color-B">
              ${props.product.price}
            </p>{" "}
            <p className="product-card__fake-price underlined-decoration ">
              ${precioFinal}
            </p>
          </div>
        </div>
      </Fade>
    );
  } else {
    return (
      <Zoom
        cascade="false"
        delay={70}
        duration={250}
        className=" shadow-A card-hover-animated  category-product-section__card-main-container bg-B-W-100 "
        key={props.product.product_id}
      >
        <div
          onClick={() => handlePopUpProductModal(props.product.product_id)}
          className="flex-column-center"
        >
          <div className="category-product-section__card__percentage__container font-mobile-small-B font-600">
            <p className="font-mobile-small-B ">
              {porcentaje(props.product.price)}%{" "}
              <span className="font-mobile-small-C font-500">Off</span>{" "}
            </p>
          </div>
          <div className="category-product-section__image-container flex-row-center ">
            <img
              src={props.product.image}
              draggable="false"
              alt={props.product.name}
            />
          </div>
          <div className="category-product-section__name-container font-600 font-mobile-small-B">
            <p>{props.product.name}</p>
          </div>
          <div className="category-product-section__prices-container ">
            <p className="product-real-price font-mobile-small-B font-600 font-color-B">
              ${props.product.price}
            </p>{" "}
            <p className="product-card__fake-price underlined-decoration ">
              ${precioFinal}
            </p>
          </div>
        </div>
      </Zoom>
    );
  }
}

export { Cardlabel };
