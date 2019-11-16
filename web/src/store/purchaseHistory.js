import api from './constants';
import {fs} from 'fs';

const initialState = {
  products: ""
}

const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = (products) => {
  return { type: SET_PRODUCTS, products };
}

export async function getProductsFromReceipts () {
  try {
    const receiptData = fs.readFileSync("./purchaseHistory.json", "utf-8");
    const jsonReceiptData = JSON.parse(receiptData);
    let products = []
    for (let product in jsonReceiptData){
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
    // await dispatch(setProducts(products))
  }
  catch (error) {}
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