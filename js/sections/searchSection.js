import { API_KEY, BASE_API_URL } from "../configFile.js";

import {
  renderLoadingMessage,
  renderGifMarkup,
  renderErrorMessage,
} from "../helpers.js";

// -------------------------------------------------------------- SEARCH SECTION --------------------------------------------------------
const searchSection = document.querySelector(".searchSection");
const searchResultsList = document.querySelector(".searchResultsContainer");

/**
 *
 * @param {string} search // Represents the text to be searched
 * This function will render the results of the search on the search section
 */
const renderSearch = async function (search) {
  // Clean inner html from previous results
  searchResultsList.innerHTML = "";

  // Get the message that is already in the container (search something or nothing found)
  const initialMessage = document.querySelector(
    ".searchSection__initialMessage"
  );

  // If there is already an initial message we remove it
  initialMessage && initialMessage.remove();

  // Check to see if there is already an error in place and if so, remove it
  const error = searchSection.querySelector(".error");
  error && error.remove();

  try {
    // Add the loading message with the spinner
    renderLoadingMessage(searchSection);

    // Call the API to request random gif
    const response = await fetch(
      `${BASE_API_URL}/search?api_key=${API_KEY}&q=${search}`
    );

    // Return API error if something goes wrong
    if (!response.ok) {
      const { meta: errorData } = await response.json();
      throw Error(JSON.stringify(errorData));
    }

    // Destructure data from the response
    const { data } = await response.json();

    // if we have no results for the query we show the user a message and stop the function
    if (data && data.length === 0) {
      searchSection.querySelector(".loading").remove();

      searchSection.insertAdjacentHTML(
        "beforeend",
        "<span class='searchSection__initialMessage'>No gifs found for this query</span>"
      );

      return;
    }

    // Remove loading message
    searchSection.querySelector(".loading").remove();

    // Render gifs
    data.forEach((result) => {
      renderGifMarkup(result, searchResultsList);
    });
  } catch (error) {
    // If something goes wrong we remove the loading and append the error message
    searchSection.querySelector(".loading").remove();
    renderErrorMessage(searchSection);
  }
};

export default renderSearch;
