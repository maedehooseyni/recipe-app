import View from "./view.js";
import { Fraction } from "fractional";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one!";
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>
      <div class="recipe__details">
        <div class="recipe__info">
        <svg class="recipe__info-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class="hovered-paths"><g transform="matrix(-1,0,0,1,32,0)"><path d="M16 2.5A13.5 13.5 0 1 0 29.5 16 13.52 13.52 0 0 0 16 2.5zm0 26A12.5 12.5 0 1 1 28.5 16 12.52 12.52 0 0 1 16 28.5zM16.5 7v9a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h5.5V7a.5.5 0 0 1 1 0z" data-name="Layer 2" fill="#2f9e44" data-original="#000000" class="hovered-path"></path></g></svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
        <svg class="recipe__info-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 490.667 490.667" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M244.587 241.557c32.128-18.389 54.08-52.629 54.08-92.224 0-58.816-47.851-106.667-106.667-106.667S85.333 90.517 85.333 149.333c0 39.595 21.952 73.835 54.08 92.224C59.051 262.656 0 330.603 0 411.136v26.197C0 443.221 4.779 448 10.667 448s10.667-4.779 10.667-10.667v-26.197C21.333 325.611 97.899 256 192 256s170.667 69.611 170.667 155.136v26.197c0 5.888 4.779 10.667 10.667 10.667s10.667-4.779 10.667-10.667v-26.197c-.001-80.533-59.052-148.501-139.414-169.579zm-137.92-92.224C106.667 102.272 144.939 64 192 64s85.333 38.272 85.333 85.333-38.272 85.333-85.333 85.333-85.333-38.271-85.333-85.333z" fill="#2f9e44" data-original="#000000" class=""/><path d="M388.224 241.835c23.125-15.296 38.443-41.451 38.443-71.168 0-47.061-38.272-85.333-85.333-85.333-5.888 0-10.667 4.779-10.667 10.667s4.779 10.667 10.667 10.667c35.285 0 64 28.715 64 64s-28.715 64-64 64c-5.888 0-10.667 4.779-10.667 10.667S335.445 256 341.333 256c70.592 0 128 53.056 128 118.293v20.373c0 5.888 4.779 10.667 10.667 10.667s10.667-4.779 10.667-10.667v-20.373c0-61.653-43.008-114.026-102.443-132.458z" fill="#2f9e44" data-original="#000000" class=""/></g></svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings - 1
            }">
            <svg class="recipe__info-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings + 1
            }">
            <svg class="recipe__info-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </button>
          </div>
        </div>
        <button class="btn--round btn--bookmark">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path ${
          this._data.bookmarked
            ? 'fill="#f03e3e" stroke="none"'
            : 'fill="none" stroke="#212529"'
        } stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
        </svg>
        </button>
      </div>
      <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIng).join("")}
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
        This recipe was designed by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions to see more information about this recipe
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </a>
      </div>
    `;
  }

  _generateMarkupIng(ing) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  
      <div class="recipe__quantity">${
        ing.amount ? new Fraction(ing.amount).toString() : ""
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.original}
      </div>
    </li>
  `;
  }
}

export default new RecipeView();
