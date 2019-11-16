import api from './constants';

import receiptData from './receiptData.json';

const initialState = {
  products: ""
}

const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = (products) => {
  return { type: SET_PRODUCTS, products };
}



export const getProductsFromReceipts = () => async (dispatch) => {
  try {
    let products = []
    for (let product in receiptData){
      let productData = await api.post("https://kesko.azure-api.net/v1/search/products", {
          "filters": {
            "ean": [
              product.EAN
            ]
          }
        }
      )
      products.push(productData)
    }
    console("-----------")
    console.log(products)
    dispatch(setProducts(products))
  }
  catch (error) {
    console.error('Error while getting productsFromRecieipts', error);
    dispatch({ type: SET_PRODUCTS, products: 'error' });
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return Object.assign({}, state, {
        products: action.products
      })
    default:
      return state
  }
}