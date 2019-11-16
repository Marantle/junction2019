import api from './constants';

import receiptData from './receiptData.json';

import purchasesMock from '../mock/purchases';

const initialState = {
  products: purchasesMock
}

const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = (products) => {
  return { type: SET_PRODUCTS, products };
}

export const getProductsFromReceipts = () => async (dispatch) => {
  try {
    const eans = receiptData.map((receipt) => String(receipt.EAN))
    const response = await api.post("/search/products", JSON.stringify({
        "filters": {
          "ean": [
            ...eans
          ]
        }
      })
    )
    const productData = response.data.results;

    for (const prod of productData) {
      const receipt = receiptData.find(r => r.EAN === prod.ean);
      prod.IngredientTypeName = receipt.IngredientTypeName;
    }

    dispatch(setProducts(productData))
  }
  catch (error) {
    console.error('Error while getting productsFromRecieipts', error);
    dispatch({ type: SET_PRODUCTS, products: [] });
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