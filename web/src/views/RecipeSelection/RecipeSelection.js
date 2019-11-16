import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import market from './market.png';
import styles from "./RecipeSelection.module.css";
import { changeView, VIEW } from "../../store/view";

const apiKey = 'f629eee545784c2b8776716d5b537a95'

export default function RecipeSelection() {
  const [ recipes, setRecipes ] = useState([]);
  const dispatch = useDispatch();
  const { selectedProducts } = useSelector(state => state.purchaseHistory);
  const products = selectedProducts.map(p => ({ name: p.IngredientTypeName }));
  useEffect(() => {
    fetchMatchingRecipes(products, setRecipes, dispatch);
  }, [])
  if (recipes.length === 0) return null;
  console.log(recipes);

  return (
    <>
    <div className={styles.hCenter}>
      <p className={styles.selectRecipe}>Your selection produced these recipes</p>
      <div className={styles.kmarket}>
        <img src={market} alt='Market' />
      </div>
        {recipes.map(recipe =>
          <a href={recipe.Url} className={styles.card} key={recipe.Id + "100"} 
            style={backgroundStyle(recipe.PictureUrls[0].Normal)}
          >
            <div className={styles.cardText} key={recipe.Id}>
                {recipe.Name}
            </div>
            {/* </div> */}
          </a>
        )}
      </div>
    </>
  );
}

export function backgroundStyle (imgurl) {
  const style = {
    backgroundImage:`linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 66.11%), url('${imgurl}')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };
  return style;
}


function fetchMatchingRecipes(products, setRecipes, dispatch) {
  const fetch1 = fetch("/search/recipes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "ocp-apim-subscription-key": apiKey
    },
    body: JSON.stringify({
      filters: {
        mainCategory: "4"
      },
      view: {
        offset: 100  
      }
    })
  })
  const fetch2 = fetch("/search/recipes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "ocp-apim-subscription-key": apiKey
    },
    body: JSON.stringify({
      filters: {
        mainCategory: "4"
      },
      view: {
        offset: 200  
      }
    })
  })
  Promise.all([fetch1, fetch2])
  .then(async([response1, response2]) => {
      const a = await response1.json()
      const b = await response2.json()
      return [a, b]
    })
    .then(([json1, json2]) => {
      const results = [...json1.results, ...json2.results]
      const MINIMUM_MATCHING_INGREDIENTS = 1;

      console.log("received ", results.length, " recipes");
      const filtered = results.filter(recipe => {
        recipe.matchedProducts = getMatchedProductsData(recipe, products);
        return recipe.matchedProducts.length >= MINIMUM_MATCHING_INGREDIENTS;
      });

      console.log(filtered.length, " recipes filtered");
      
      if (!filtered || !filtered[0]) {
        return dispatch(changeView(VIEW.LANDING));
      }
      const sorted = sortRecipes(filtered);
      
      const top5 = sorted.slice(0, 10);
      setRecipes(top5);
      console.log(`set ${top5.length} recipes`)
    })
    .catch(err => {
      throw err;
    });
}

const getMatchedProductsData = (recipe, products) => {
  const mathcedProductsSet = [];
  // top of the recipe ingredients is Ingredient
  recipe.Ingredients.forEach(ingredient => {
    // subsection is for different steps of the recipe
    ingredient.SubSectionIngredients.forEach(subSectionIngredient => {
      // subingredient is an array of actual arrays ingredients
      return subSectionIngredient.forEach(singleIngredient => {
        // compare our product names to the product type
        products.forEach(product => {
          if (productInIngredients(product, singleIngredient)){
            if (!mathcedProductsSet.includes(product))
              mathcedProductsSet.push(product);
          }
        });
      });
    });
  });
  return mathcedProductsSet;
};

const productInIngredients = (product, ingredient) => {
  if (!ingredient.IngredientTypeName) return false;
  return ingredient.IngredientTypeName.toLowerCase().includes(product.name.toLowerCase())
}

const sortRecipes = (recipes) => {
  if (!recipes || !recipes[0]) return;
  console.log(recipes[0].matchedProducts)
  const sorted = [...recipes].sort((a, b) => {
    if (a.matchedProducts.length > b.matchedProducts.length) return -1;
    if (a.matchedProducts.length < b.matchedProducts.length) return 1;
    return 0;
  });
  console.log(sorted[0].matchedProducts)
  return sorted;
};