import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { ProductsContext } from "../../App";
import { PopupProductContext } from "./PopupProductModalContext";
import "../scss/BrowserPopupContent.scss";
import { BiChevronRight, BiChevronLeft, BiChevronDown } from "react-icons/bi";
import { MdMoreHoriz } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { productModalVerificationCall } from "./ContextFilteringHelpers";
import { useNavigate } from "react-router-dom";
import { Fade, Zoom } from "react-awesome-reveal";

// Esta función recibe una lista de productos y un valor de búsqueda.
function searchProducts(products, searchValue) {
  // Creamos dos matrices vacías para almacenar las categorías y los productos que coinciden con la búsqueda.
  const matchingCategories = [];
  const matchingProducts = [];
  // Convertimos el valor de búsqueda a minúsculas para hacer una búsqueda sin distinción entre mayúsculas y minúsculas.
  const lowerSearchStrings = searchValue.toLowerCase().split(" ");

  // Iteramos sobre cada categoría en la lista de productos.
  for (const category of products) {
    // Creamos un objeto para almacenar la categoría y los productos que coinciden con la búsqueda.
    const matchingCategory = {
      category_name: category.category_name,
      products: [],
    };
    // Iteramos sobre cada producto en la categoría actual.
    for (const product of category.products) {
      // Convertimos el nombre y la descripción del producto a minúsculas para hacer una búsqueda sin distinción entre mayúsculas y minúsculas.
      const productName = product.name.toLowerCase();
      const productDescription = product.description.toLowerCase();
      // Creamos una variable para verificar si el producto coincide con todas las subcadenas de búsqueda.
      let isMatch = true;

      // Iteramos sobre cada subcadena de búsqueda y verificamos si el nombre del producto o la descripción del producto la incluyen.
      for (const searchString of lowerSearchStrings) {
        if (
          !productName.includes(searchString) &&
          !productDescription.includes(searchString)
        ) {
          // Si el producto no coincide con una de las subcadenas de búsqueda, establecemos la variable isMatch en falso y salimos del bucle.
          isMatch = false;
          break;
        }
      }

      // Si el producto coincide con todas las subcadenas de búsqueda, lo agregamos a la matriz de productos coincidentes y a la matriz de productos coincidentes para la categoría actual.
      if (isMatch) {
        matchingCategory.products.push({ ...product, resultType: "product" });
        matchingProducts.push({ ...product, resultType: "product" });
      }
    }
    // Si la categoría actual tiene productos coincidentes, la agregamos a la matriz de categorías coincidentes.
    if (matchingCategory.products.length > 0) {
      matchingCategories.push({ ...matchingCategory, resultType: "category" });
    }
  }

  // Combinamos las matrices de categorías coincidentes y productos coincidentes en una sola matriz de resultados.
  const resultArray = [...matchingCategories, ...matchingProducts];
  // Imprimimos la matriz de resultados en la consola para fines de depuración.
  console.log(resultArray);
  // Devolvemos la matriz de resultados.
  return resultArray;
}

function BrowserPopUpContent() {
  const { browserModalState, setBrowserModalState } =
    useContext(PopupProductContext);
  const { products, updateProducts } = useContext(ProductsContext);

  const portalRoot = document.getElementById("portal-root");

  const [value, setValue] = useState("");
  const [resultados, setResultados] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentResults = resultados.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(resultados.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const matchingProducts = searchProducts(products, value);
    setResultados(matchingProducts);
    setShowResults(!!value);
    setCurrentPage(1); // Reinicia la página actual a 1
  }, [value]);

  const handleBrowserKeyDown = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  //funcion para manejar el clic, en un objeto de la lista

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
        
        console.log(productForModal[0][0]);
        setProductModalInfo(productForModal[0][0]);
      })
      .catch((error) => {
        // Manejo de errores en caso de que ocurra algún problema al llamar a la API
        console.error("Error al llamar a la función:", error);
      });
  }

  //ref para cuadrar el autofocus al borrar con el boton
  const inputRef = React.useRef(null);

  //funcion para manejar el cerrado del modal de busqueda
  function handleModalClose() {
    setBrowserModalState(false);
  }
  //logica para manejar dar click en la. categoria del resultado

  const navigate = useNavigate();

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
    //navegamos a products para mostrar el filtro de categoria
    navigate("/products", { state: { parametro: "browser-filtered" } });

    setBrowserModalState(false);
  }

  //manejar el borrado del input
  const handleClearInput = () => {
    setValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (browserModalState) {
    return ReactDOM.createPortal(
      <section className=" browser-outside-container  font-color-30">
        <Zoom duration={300}>
          <div className="browser-container flex-column-center">
            <div className="browser-back-button-container">
              <div
                onClick={handleModalClose}
                className="browser-back-icon-container  flex-row-center"
              >
                <MdClose className="browser-back-button-icon" />
              </div>
            </div>
            <div className="browser-input-container flex-column-center">
              <input
                ref={inputRef}
                placeholder="Ingresa Búsqueda"
                autoFocus={true}
                className="browser-input font-600"
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />

              <IoIosClose
                onClick={handleClearInput}
                className="browser-input__delete-icon"
              />
            </div>

            <div className="browser-result-title-container flex-row-center">
              {
                <p className="bg-B-W-100 browser-results-title font-500 ">
                  Resultados.
                </p>
              }
              <div className="browser-pagination__pagination-container">
                {showResults && totalPages > 1 && (
                  <div className="browser-pagination flex-row-center">
                    <button
                      className="bg-B-W-100 button-active-animated"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <BiChevronLeft className="font-color-40" size={18} />
                    </button>
                    <p className=" font-mobile-small-B browser-pagination__text flex-row-center">
                      {currentPage} {" de "} {totalPages}
                    </p>
                    <button
                      className="bg-B-W-100 button-active-animated"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <BiChevronRight className="font-color-40" size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="browser-results-container ">
              {showResults
                ? currentResults.map((product, index) => {
                    if (product.resultType === "product") {
                      return (
                        <Zoom
                          cascade="false"
                          damping={0.6}
                          direction="top"
                          duration={250}
                        >
                          <div
                            className="browser-result-inner-container"
                            key={product.product_id}
                          >
                            <li
                              onClick={() =>
                                handlePopUpProductModal(product.product_id)
                              }
                              className="bg-B-W-100 flex-row-center "
                            >
                              <img
                                className="browser-result-li-img"
                                src={product.image}
                                alt={product.name}
                              />
                              <p className="font-500">
                                {product.name} -
                                <span className="font-color-B">
                                  {" "}
                                  {product.price}
                                </span>
                              </p>
                            </li>
                          </div>
                        </Zoom>
                      );
                    }

                    if (product.resultType === "category") {
                      return (
                        <div
                          className="browser-result-inner-container browser-result-inner-container__category-result"
                          key={index}
                        >
                          <li
                            onClick={() =>
                              moveCategoryToTop(product.category_name)
                            }
                            className="bg-B-W-100 flex-row-center "
                          >
                            <p className="font-500">
                              {product.category_name} -{" "}
                              <span className="font-600 font-color-B">
                                Categoría
                              </span>
                            </p>
                          </li>
                        </div>
                      );
                    }
                  })
                : ""}
            </div>
          </div>
        </Zoom>
      </section>,
      portalRoot,
    );
  }

  return null;
}

export default BrowserPopUpContent;
