import { getJSON } from "./helpers.js";
import { KEY } from "./config.js";

export const state = {
  recipes: {},
  search: {
    query: "",
    results: [],
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(
      `SSLhttps://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY}`
    );

    const recipes = data;
    state.recipes = {
      id: recipes.id,
      title: recipes.title,
      publisher: recipes.publisher,
      sourceUrl: recipes.sourceUrl,
      image: recipes.image,
      servings: recipes.servings,
      cookingTime: recipes.readyInMinutes,
      ingredients: recipes.extendedIngredients,
      publisher: recipes.sourceName,
    };

    if (state.bookmarks.some((bookmark) => bookmark.id === state.recipes.id))
      state.recipes.bookmarked = true;
    else state.recipes.bookmarked = false;
  } catch (err) {
    console.error(`${err}💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(
      `SSLhttps://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${KEY}`
    );

    state.search.results = data.results.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image,
      };
    });
  } catch (err) {
    console.error(`${err}💥💥`);
    throw err;
  }
};

export const updateServings = function (newServings) {
  state.recipes.ingredients.forEach((ing) => {
    ing.amount = (ing.amount * newServings) / state.recipes.servings;
  });

  //Update state
  state.recipes.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //Add Bookmark
  state.bookmarks.push(recipe);

  //Mark current recipe as bookmarked
  if (recipe.id === state.recipes.id) state.recipes.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  //Mark current recipe as not bookmarked
  if (id === state.recipes.id) state.recipes.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
