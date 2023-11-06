import { CgShoppingBag } from "react-icons/cg";
import { MdFilterList, MdOutlineFilterAlt } from "react-icons/md";
import "../scss/HeaderConnectorType.scss";
import { useState, useContext } from "react";
import { ProductsContext } from "../../App";
import { reorganizeArrayByCategoryAndMoveUp } from "./ContextFilteringHelpers";
import "../../GlobalStyles.scss";
import { Link } from "react-router-dom";
import { AttentionSeeker, Zoom } from "react-awesome-reveal";

function HeaderBannerSectionConnectorType(props) {
  //estado para controlar el filtro desplegable
  const [filterExpandedState, setFilterExpandedState] = useState(false);
  function hanldeFilterExpandedState() {
    setFilterExpandedState(filterExpandedState ? false : true);
  }

  if (props.connectorType === "homeConnector") {
    return (
      <div className=" bg-A-W-50 header-banner__down-text-container flex-column-center  font-color-40 font-mobile-small-B ">
        {/* <div className="header-banner__last-text-container  ">

                    <p className="font-500">Resalta lo mejor de <span className="font-600 ">Ti misma.</span></p>
                </div> */}
        <div className="  font-color-90 header-banner__down-text__catalogo-container-text flex-row-center">
          <Zoom duration={250} delay={100}>
            <Link
              to="/products"
              className="button-hover-animated shadow-A bg-B-W-100 decoration-none font-color-40  flex-row-center catalogo-text-container "
            >
              <span className=" font-500  font-color-40 catalogo-text-text">
                Catálogo.
              </span>
              <AttentionSeeker effect="bounce" delay={1500}><CgShoppingBag className=" font-color-40 home-icon-products-link" /></AttentionSeeker>
            </Link>
          </Zoom>
        </div>
      </div>
    );
  }

  if (props.connectorType === "productSectionConnector") {
    return (
      <div className="product-section__category__filter-main-container flex-row-center bg-c">
        <div className="category-filter-container flex-column-center">
          <div
            onClick={hanldeFilterExpandedState}
            className=" font-color-100 product-section__category__filter-container background-B shadow-A"
          >
            <p className="font-500  font-mobile-small-B ">Filtrar Catálogo.</p>
            <div className="flex-row-center ">
              <MdFilterList className="product-section__category-filter__icon" />{" "}
            </div>
          </div>

          <div
            className={`product-section__category__filter__category-results-container  flex-row-center ${filterExpandedState
                ? "result-container-show"
                : "result-container-hide"
              } `}
          >
            {/* aqui tenemos una cantidad variable que va a depender de la cantidad de categorias que se encuentren en la base de datos. */}
            <div className="product-section-_category__filter__categories-main-container">
              <div className="product-senction__category__filter__categories-container font-color-40">
                <GetCategoriesFromMainContextArray
                  setExpandState={setFilterExpandedState}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderBannerSectionConnectorType;

//esta funcion es para traer la lista de las categorias que vienen de la base de datos

function GetCategoriesFromMainContextArray(props) {
  const { products, updateProducts } = useContext(ProductsContext);

  function moveCategoryToTop(categoryName) {
    const updatedProducts = products.map((category) => {
      if (category.category_name === categoryName) {
        return {
          ...category,
        };
      }
      return category;
    });

    const categoryIndex = updatedProducts.findIndex(
      (category) => category.category_name === categoryName,
    );

    if (categoryIndex > 0) {
      const [category] = updatedProducts.splice(categoryIndex, 1);
      updatedProducts.unshift(category);
    }

    updateProducts(updatedProducts);
    //finalmente contraemos la ventana de filtro
    props.setExpandState(false);
  }

  return products.map((category, index) => {
    return (
      <Zoom duration={250} className="result-zoom-container">
        <p
          className="font-color-100 bg-gray-30 font-400"
          key={index}
          onClick={() => moveCategoryToTop(category.category_name)}
        >
          {category.category_name}
        </p>
      </Zoom>
    );
  });
}
