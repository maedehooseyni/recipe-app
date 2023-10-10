class SearchView {
  _parentEl = document.querySelector(".search");
  _primaryMessage = document.querySelector(".primary-message-box");
  _searchField = this._parentEl.querySelector(".search__field");

  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector(".search__field").value = "";
    this._primaryMessage.remove();
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
