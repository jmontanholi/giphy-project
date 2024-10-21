import { API_KEY, BASE_API_URL } from "./configFile.js";
import {
  renderErrorMessage,
  renderGifMarkup,
  renderLoadingMessage,
  renderSkeleton,
} from "./helpers.js";

// Random section elements
const randomGifPlaceholder = document.querySelector(
  ".randomSection__gifPlaceholder"
);
const randomNextBtn = document.querySelector(".randomSection__btn");

// Search section elements
const searchSection = document.querySelector(".searchSection");
const searchForm = document.querySelector(".searchForm");
const searchInput = searchForm.querySelector(".searchForm__textInput");
const searchResultsList = document.querySelector(".searchResultsContainer");

// This function requires no parameter and will render a random gif on the random section
// TODO: FIX API KEY WHEN ALL IS FINISHED
const renderRandom = async function () {
  // First add to the parent or replace the current gif with a skeleton
  renderSkeleton(randomGifPlaceholder);

  // Select the skeleton to use later
  const skeleton = randomGifPlaceholder.querySelector(".gifSkeleton");

  try {
    // Add the loading message with the spinner
    renderLoadingMessage(skeleton);

    // Call the API to request random gif
    const response = await fetch(`${BASE_API_URL}/random?api_key=${API_KEY}2`);

    // Return API error if something goes wrong
    if (!response.ok) {
      const { meta: errorData } = await response.json();
      throw Error(JSON.stringify(errorData));
    }

    // Destructure data from the response
    const { data } = await response.json();

    // Remove the skeleton and render gif
    skeleton.remove();
    renderGifMarkup(data, randomGifPlaceholder);
  } catch (error) {
    // If something goes wrong we remove the loading and append the error message
    skeleton.querySelector(".loading").remove();
    renderErrorMessage(skeleton);
  }
};

// Add event listener to next button on random section to render a random gif
randomNextBtn.addEventListener("click", renderRandom);

// Call render random a first time when page is loaded
renderRandom();

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

  initialMessage && initialMessage.remove();

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
    if (data.length === 0) {
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
    searchResultsList.querySelector(".loading").remove();
    renderErrorMessage(searchResultsList);
  }
};

// Add event listener to search form so that we can prevent the page reload and render gifs
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const search = searchInput.value;
  renderSearch(search);
});
