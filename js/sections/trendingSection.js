import { API_KEY, BASE_API_URL } from "../configFile.js";

import {
  renderLoadingMessage,
  renderGifMarkup,
  renderErrorMessage,
} from "../helpers.js";

// ------------------------------------------------------------ TRENDING SECTION --------------------------------------------------------
const trendingResultsContainer = document.querySelector(
  ".trendingResultsContainer"
);

// This function requires no parameter and will render a list of trending gifs on the trending section
const renderTrending = async function () {
  try {
    // Add the loading message with the spinner
    renderLoadingMessage(trendingResultsContainer);

    // Call the API to request random gif
    const response = await fetch(`${BASE_API_URL}/trending?api_key=${API_KEY}`);

    // Return API error if something goes wrong
    if (!response.ok) {
      const { meta: errorData } = await response.json();
      throw Error(JSON.stringify(errorData));
    }

    // Destructure data from the response
    const { data } = await response.json();

    // Remove loading message
    trendingResultsContainer.querySelector(".loading").remove();

    // Render gifs
    data.forEach((result) => {
      renderGifMarkup(result, trendingResultsContainer);
    });
  } catch (error) {
    // If something goes wrong we remove the loading and append the error message
    trendingResultsContainer.querySelector(".loading").remove();
    renderErrorMessage(trendingResultsContainer);
  }
};

export default renderTrending;
