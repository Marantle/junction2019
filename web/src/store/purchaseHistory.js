import api from './constants';
import receiptData from './receiptData.json';

const initialState = {
  products: [],
  selectedProducts: []
}

const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_SELECTED_PRODUCTS = 'SET_SELECTED_PRODUCTS'
const RESET_SELECTED = 'RESET_SELECTED';

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

export const toggleSelectedProduct = (product) => (dispatch, getState) => {
  const { selectedProducts } = getState().purchaseHistory;
  if (selectedProducts.some(p => p.ean === product.ean)) {
    const newProducts = selectedProducts.filter(p => p.ean !== product.ean);
    return dispatch({
      type: SET_SELECTED_PRODUCTS,
      selectedProducts: newProducts
    })
  } else {
    return dispatch({
      type: SET_SELECTED_PRODUCTS,
      selectedProducts: [
        ...selectedProducts,
        product
      ]
    });
  }
}

export const resetSelected = () => {
  return { type: RESET_SELECTED }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return Object.assign({}, state, {
        products: action.products
      })
    case SET_SELECTED_PRODUCTS:
      return { ...state, selectedProducts: action.selectedProducts }
    case RESET_SELECTED:
      return { ...state, selectedProducts: [] }
    default:
      return state
  }
}