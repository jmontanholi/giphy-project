import renderRandom from "./sections/randomSection.js";
import renderSearch from "./sections/searchSection.js";
import renderTrending from "./sections/trendingSection.js";

const randomNextBtn = document.querySelector(".randomSection__btn");

// Add event listener to next button on random section to render a random gif
randomNextBtn.addEventListener("click", renderRandom);

// Call render random a first time when page is loaded
renderRandom();

const searchForm = document.querySelector(".searchForm");
const searchInput = searchForm.querySelector(".searchForm__textInput");

// Add event listener to search form so that we can prevent the page reload and render gifs
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const search = searchInput.value;
  renderSearch(search);
});

// Call render trending
renderTrending();
