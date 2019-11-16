const fetchn = require("node-fetch");
const fs = require("fs");
const path = require('path');
const appRoot = path.resolve(__dirname);

const apiKey = 'f629eee545784c2b8776716d5b537a95'
const MINIMUM_MATCHING_INGREDIENTS = 2;

const products: Product[] = [
  { name: "Tomaatti" },
  { name: "Peruna" },
  { name: "Porkkana" },
  { name: "Suola" },
  { name: "Siirappi" },
  { name: "Maito" },
  { name: "Nakki" }
];

fetchn("https://kesko.azure-api.net/v1/search/recipes", {
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
  .then((json: Recipes) => {
    console.log("received ", json.results.length, " recipes");
    const filtered = json.results.filter(recipe => {
      recipe.matchedProducts = getMatchedProductsData(recipe, products);
      return recipe.matchedProducts.length >= MINIMUM_MATCHING_INGREDIENTS;
    });
    console.log(filtered.length, " recipes filtered");

    const sorted = sortRecipes(filtered);

    fs.writeFileSync(appRoot + "/rawRecipes.json", JSON.stringify(json.results, null,))

    fs.writeFileSync(
      appRoot + "/filteredRecipes.json",
      JSON.stringify(filtered, null, 2)
    );
    fs.writeFileSync(
      appRoot + "/sortedRecipes.json",
      JSON.stringify(sorted, null, 2)
    );
    fs.writeFileSync(
      appRoot + "/topRecipes.json",
      JSON.stringify(sorted.slice(0, 3), null, 2)
    );
  })
  .catch(err => {
    throw err;
  });

const getMatchedProductsData = (recipe: Recipe, products: Product[]) => {
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

const productInIngredients = (product: Product, ingredient: SubSectionIngredient) => {
  if (!ingredient.IngredientTypeName) return false;
  return ingredient.IngredientTypeName.toLowerCase().includes(product.name.toLowerCase())
}

const sortRecipes = (recipes: Recipe[]) => {
  console.log(recipes[0].matchedProducts)
  const sorted = [...recipes].sort((a, b) => {
    if (a.matchedProducts.length > b.matchedProducts.length) return -1;
    if (a.matchedProducts.length < b.matchedProducts.length) return 1;
    return 0;
  });
  console.log(sorted[0].matchedProducts)
  return sorted;
};


export interface Product {
  name: string;
}

export interface Recipes {
  totalHits: number;
  results: Recipe[];
}

export interface FilteredRecipe {
  Recipe;
  matchedProducts: Product[];
}
export interface Recipe {
  Id: string;
  Name: string;
  PieceSize: PieceSize;
  Portions: PieceSize;
  PreparationTime: PreparationTime;
  UserPortions: UserPortions;
  Categories?: Category[];
  Pictures: string[];
  PictureUrls: PictureURL[];
  Ingredients: Ingredient[];
  Instructions: string;
  EndNote: string;
  Description: string;
  DateCreated: Date;
  DateModified: Date;
  Stamp: RecipeUse;
  RecipeUse: RecipeUse;
  resourceType: ResourceType;
  Url: string;
  UrlSlug: string;
  Sort: number[];
  VideoUrl?: string;
  VideoEmbedUrl?: string;
  SpecialDiets?: RecipeUse[];
  TvDate?: Date;
  EnergyAmounts?: EnergyAmounts;
  TrendWords?: RecipeUse[];
  matchedProducts: Product[];
}

export interface Category {
  MainName: MainName;
  MainId: string;
  SubName: string;
  SubId: string;
}

export enum MainName {
  AamuVäliJaIltapalat = "Aamu-,väli- ja iltapalat",
  Aamupalat = "Aamupalat",
  Alkuruoat = "Alkuruoat",
  Apukategoriat = "Apukategoriat",
  AsiakassegmentointiKAsiakkaat = "Asiakassegmentointi (K-asiakkaat)",
  Iltapalat = "Iltapalat",
  Juomat = "Juomat",
  Jälkiruoat = "Jälkiruoat",
  Lisäkkeet = "Lisäkkeet",
  MakeatLeivonnaiset = "Makeat leivonnaiset",
  MakujaMaailmalta = "Makuja maailmalta",
  PääraakaAine = "Pääraaka-aine",
  Pääruoat = "Pääruoat",
  Ruokalaji = "Ruokalaji",
  SesonginRaakaAineet = "Sesongin raaka-aineet",
  Sesonki = "Sesonki",
  SuolaisetLeivonnaiset = "Suolaiset leivonnaiset",
  Säilöntä = "Säilöntä",
  Teema = "Teema",
  Välipalat = "Välipalat"
}

export interface EnergyAmounts {
  KcalPerPortion: string;
  KcalPerUnit: string;
  KJPerPortion: string;
  KJPerUnit: string;
  FatPerPortion: string;
  FatPerUnit: string;
  ProteinPerPortion: string;
  ProteinPerUnit: string;
  CarbohydratePerPortion: string;
  CarbohydratePerUnit: string;
}

export interface Ingredient {
  SubSectionHeading: string;
  SubSectionIngredients: Array<SubSectionIngredient[]>;
}

export interface SubSectionIngredient {
  Name: string;
  Amount?: string;
  PackageRecipe: string;
  IngredientType?: string;
  Unit?: SubSectionIngredientUnit;
  IngredientTypeName?: string;
  AmountInfo?: string;
  Ean?: string;
}

export enum SubSectionIngredientUnit {
  DL = "dl",
  Empty = "",
  G = "g",
  Kg = "kg",
  L = "l",
  Levy = "levy",
  Levyä = "levyä",
  PS = "ps",
  Pala = "pala",
  Pkt = "pkt",
  Plo = "plo",
  Prk = "prk",
  Ripaus = "ripaus",
  Rkl = "rkl",
  Rs = "rs",
  Ruukku = "ruukku",
  Ruukkua = "ruukkua",
  Tl = "tl",
  Tlk = "tlk",
  Viipaletta = "viipaletta"
}

export interface PictureURL {
  Id: string;
  Normal: string;
  Original: string;
}

export interface PieceSize {
  Unit: PieceSizeUnit;
  Amount?: string;
}

export enum PieceSizeUnit {
  Annos = "annos",
  Annosta = "annosta",
  DL = "dl",
  G = "g",
  Kpl = "kpl",
  Ml = "ml",
  Palaa = "palaa"
}

export interface PreparationTime {
  Description: Description;
  TimeRange: TimeRange;
}

export enum Description {
  Alle15Min = "alle 15 min",
  Alle30Min = "alle 30 min",
  The3060Min = "30 - 60 min",
  Yli60Min = "yli 60 min"
}

export interface TimeRange {
  MinTime: number;
  MaxTime?: number;
}

export interface RecipeUse {
  Name: Name;
  Id: string;
}

export enum Name {
  Bloggaaja = "Bloggaaja",
  Gluteeniton = "Gluteeniton",
  KRuokaFi = "k-ruoka.fi",
  Kananmunaton = "Kananmunaton",
  KasvisLaktoOvo = "Kasvis (lakto-ovo)",
  KotimaisetAinekset = "Kotimaiset ainekset",
  Laktoositon = "Laktoositon",
  Maidoton = "Maidoton",
  TestattuKKoekeittiössä = "Testattu K-koekeittiössä",
  Vegaaninen = "Vegaaninen",
  Viljaton = "Viljaton",
  VähemmänSokeria = "Vähemmän sokeria",
  Vähälaktoosinen = "Vähälaktoosinen"
}

export interface UserPortions {
  $: Empty;
}

export interface Empty {
  Unit: Unit;
}

export enum Unit {
  Henkilölle = "henkilölle"
}

export enum ResourceType {
  Recipe = "recipe"
}
