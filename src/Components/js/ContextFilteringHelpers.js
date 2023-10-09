

export default function reorganizeByCategory(products) {
    const [ProductArray] = products;
    const categorizedProducts = [];
  
    for (const product of ProductArray) {
      const { id_category, category_name } = product;
  
      // Buscar la categoría en el array clasificado
      const existingCategory = categorizedProducts.find(
        (category) => category.category_name === category_name
      );
  
      if (existingCategory) {
        existingCategory.products.push(product);
      } else {
        // Crear una nueva categoría
        categorizedProducts.push({
          category_name,
          products: [product],
        });
      }
    }
    
    return categorizedProducts;
  }


//funcion para filtrar un array y devolver los 10 productos mas vendidos

function getTop10MostSoldProducts(products) {
  // Primero, ordenamos el array de productos en orden descendente según la cantidad vendida (sold).
  products.sort((a, b) => b.sold - a.sold);

  // Luego, tomamos los primeros 10 productos del array ordenado.
  const top10MostSoldProducts = products.slice(0, 10);

  return top10MostSoldProducts;
 
}



//funcion para filtrar un array y devolver los 10 productos mas nuevos
function getTop10NewProducts(products) {
  // Sort the products based on the "date" in descending order (assuming the date is in a valid format)
  const sortedProducts = products.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get the first 10 products from the sorted list
  const top10NewProducts = sortedProducts.slice(0, 10);

  return top10NewProducts;
}



//funcion para filtrar el array y reordenar dependiendo del valor, si es nuevo, mas vendido o menor preciofun

function reorganizeArrayByFilteredResults(products,categoryName, filterValue){
  let productsArray = products.slice();

  let ProductsArrayFiltered = productsArray.map((productsCategoryContainer) => {

    if (productsCategoryContainer.category_name === categoryName) {
      console.log(productsCategoryContainer.products)

      let categoryFiltered =  productsCategoryContainer.products.sort((a,b)=> b.sold - a.sold)
     
      console.log(categoryFiltered)

      return
      
    }
      
     
      return 
  });

  
  return 
}













//funcion para reorganizar el array  y dejar la categoria pasada por parametro de primera
// Función para reorganizar el orden de los objetos en el array
function reorganizeArrayByCategoryAndMoveUp(products, categoryName) {

  let productsArray = products.slice();
  // Find the index of the category in the array
  const categoryIndex = productsArray.findIndex(product => product.category === categoryName);

  // If the category exists in the array, move it to the beginning
  if (categoryIndex !== -1) {
    // Extract the category object
    const category = productsArray.splice(categoryIndex, 1)[0];

    // Add the category object and its products to the beginning of the array
    productsArray.unshift(category);
  }

  return productsArray;

}



//funcion para hacer llamada a la api para verificar el producto antes de mostrarlo en el modal


function productModalVerificationCall(id){
  
  const fetchData = async () => {
    try {
     /*  const response = await fetch(`https://api-mimarte.azurewebsites.net/api/Product/Obtener/${id}`);
      const productForModal = await response.json(); */

      const json = require("../dataBase/dataBase.json")
      

      const filteredResult = arrayproductFiltering(json.list, id);
    
      return filteredResult; // Return the fetched data
      
    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  };

  return fetchData(); // Return the promise returned by fetchData()
}
export {getTop10MostSoldProducts, getTop10NewProducts, reorganizeArrayByCategoryAndMoveUp,productModalVerificationCall, reorganizeArrayByFilteredResults}





//funcion para filtrar array
function arrayproductFiltering (productList, id){
  const productsArray = productList[0];
  const filteredResult = productsArray.filter((product, index)=>{
    return product.product_id === id
  })
 
  return [filteredResult];
}




