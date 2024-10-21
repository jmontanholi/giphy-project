import { API_KEY, BASE_API_URL } from "../configFile.js";

import {
  renderLoadingMessage,
  renderGifMarkup,
  renderErrorMessage,
  renderSkeleton,
  AJAX,
} from "../helpers.js";

// -------------------------------------------------------------- RANDOM SECTION --------------------------------------------------------
const randomGifPlaceholder = document.querySelector(
  ".randomSection__gifPlaceholder"
);

// This function requires no parameter and will render a random gif on the random section
const renderRandom = async function () {
  // First add to the parent or replace the current gif with a skeleton
  renderSkeleton(randomGifPlaceholder);

  // Select the skeleton to use later
  const skeleton = randomGifPlaceholder.querySelector(".gifSkeleton");

  try {
    // Add the loading message with the spinner
    renderLoadingMessage(skeleton);

    const data = await AJAX(`${BASE_API_URL}/random?api_key=${API_KEY}`);

    // Remove the skeleton and render gif
    skeleton.remove();
    renderGifMarkup(data, randomGifPlaceholder);
  } catch (error) {
    // If something goes wrong we remove the loading and append the error message
    skeleton.querySelector(".loading").remove();
    renderErrorMessage(skeleton);
  }
};

export default renderRandom;
