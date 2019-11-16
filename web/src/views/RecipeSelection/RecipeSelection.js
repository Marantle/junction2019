import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//   Paper,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell
// } from "@material-ui/core";
// import { getProductsFromReceipts, setProducts } from "../../store/purchaseHistory";

import styles from "./RecipeSelection.module.css";

const apiKey = 'f629eee545784c2b8776716d5b537a95'

const products = [
  { name: "Tomaatti" },
  { name: "Peruna" },
  { name: "Porkkana" },
  { name: "Suola" },
  { name: "Siirappi" },
  { name: "Maito" },
  { name: "Nakki" }
];

export default function RecipeSelection() {
  const [ recipes, setRecipes ] = useState([]);
  useEffect(() => {
    fetchMatchingRecipes(products, setRecipes);
  }, [])
  if (recipes.length === 0) return null;
  console.log(recipes);
  
  return (
    <>
      <div className={styles.kmarket}></div>
      {recipes.map(recipe =>
        <div className={styles.card} key={recipe.Id + "100"} style={backgroundStyle(recipe.PictureUrls[0].Normal)}>
          {console.log(recipe.PictureUrls[0].Normal)}
          <div key={recipe.Id}>
              {recipe.Name}
          </div>
        </div>
      )}
    </>
  );
}

function backgroundStyle (imgurl) {
  const style = {
    backgroundImage:`url('${imgurl}')`,
    backgroundSize: 'cover'
  };
  console.log(style)
  return style;
}


function fetchMatchingRecipes(products, setRecipes) {
  fetch("/search/recipes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "ocp-apim-subscription-key": apiKey
    },
    body: JSON.stringify({
      filters: {
        mainCategory: "4"
      }
    })
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      const MINIMUM_MATCHING_INGREDIENTS = 2;

      console.log("received ", json.results.length, " recipes");
      const filtered = json.results.filter(recipe => {
        recipe.matchedProducts = getMatchedProductsData(recipe, products);
        return recipe.matchedProducts.length >= MINIMUM_MATCHING_INGREDIENTS;
      });
      console.log(filtered.length, " recipes filtered");

      const sorted = sortRecipes(filtered);

      const top5 = sorted.slice(0, 5);
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
  console.log(recipes[0].matchedProducts)
  const sorted = [...recipes].sort((a, b) => {
    if (a.matchedProducts.length > b.matchedProducts.length) return -1;
    if (a.matchedProducts.length < b.matchedProducts.length) return 1;
    return 0;
  });
  console.log(sorted[0].matchedProducts)
  return sorted;
};