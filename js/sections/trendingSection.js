import { API_KEY, BASE_API_URL } from "../configFile.js";

import {
  renderLoadingMessage,
  renderGifMarkup,
  renderErrorMessage,
  AJAX,
} from "../helpers.js";

// ------------------------------------------------------------ TRENDING SECTION --------------------------------------------------------
const trendingSection = document.querySelector(".trendingSection");
const trendingResultsContainer = document.querySelector(
  ".trendingResultsContainer"
);

// This function requires no parameter and will render a list of trending gifs on the trending section
const renderTrending = async function () {
  try {
    // Add the loading message with the spinner
    renderLoadingMessage(trendingSection);

    // Call the API to request trending gifs
    const data = await AJAX(`${BASE_API_URL}/trending?api_key=${API_KEY}`);

    // Remove loading message
    trendingSection.querySelector(".loading").remove();

    // Render gifs
    data.forEach((result) => {
      renderGifMarkup(result, trendingResultsContainer);
    });
  } catch (error) {
    // If something goes wrong we remove the loading and append the error message
    trendingSection.querySelector(".loading").remove();
    renderErrorMessage(trendingSection);
  }
};

export default renderTrending;
