import { API_KEY, BASE_API_URL } from "./configFile.js";

const randomGifPlaceholder = document.querySelector(
  ".randomSection__gifPlaceholder"
);
const randomNextBtn = document.querySelector(".randomSection__btn");

/**
 *
 * @param {object} parent // Node element that should have its content replaced by skeleton
 *
 * This function appends the gif to the parent at the end
 */
const generateGifMarkup = function (data, parent) {
  if (!data) return "";

  const markup = `
    <video class="gifVideo" width="280" autoplay loop muted>
        <source src="${data.images.looping.mp4}" type="video/mp4">
        <p>
            ${
              data.alt_text
                ? data.alt_text
                : "Your browser does not support video"
            }
        </p>
    </video>
  `;

  parent.insertAdjacentHTML("beforeend", markup);
};

/**
 *
 * @param {object} parent // Node element that should have its content replaced by skeleton
 *
 * This function appends the loading message to the parent at the end
 */
const generateLoadingMessage = function (parent) {
  const markup = `
    <div class="loading">
        <div class="spinner">
        <span class="spinner__bar spinner__bar--1"></span>
        <span class="spinner__bar spinner__bar--2"></span>
        <span class="spinner__bar spinner__bar--3"></span>
        <span class="spinner__bar spinner__bar--4"></span>
        <span class="spinner__bar spinner__bar--5"></span>
        <span class="spinner__bar spinner__bar--6"></span>
        <span class="spinner__bar spinner__bar--7"></span>
        <span class="spinner__bar spinner__bar--8"></span>
        </div>
        <p>Giphy's will be here in a jiffy...</p>
    </div>
  `;

  parent.insertAdjacentHTML("beforeend", markup);
};

/**
 *
 * @param {object} parent // Node element that should have its content replaced by skeleton
 *
 * This function appends the error message to the parent at the end
 */
const generateErrorMessage = function (parent) {
  const markup = `
    <div class="error">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p>Oh no, something went snap!</p>
    </div>
  `;

  parent.insertAdjacentHTML("beforeend", markup);
};

/**
 *
 * @param {object} parent // Node element that should have its content replaced by skeleton
 *
 * This function replaces parent content with Skeleton
 */
const renderSkeleton = function (parent) {
  const markup = `
    <div class="gifSkeleton" aria-hidden="true">
      <i class="fa-regular fa-image skeleton__svg"> </i>
    </div>
  `;

  parent.innerHTML = markup;
};

const renderRandom = async function () {
  // First add to the parent or replace the current gif with a skeleton
  renderSkeleton(randomGifPlaceholder);

  // Select the skeleton to use later
  const skeleton = randomGifPlaceholder.querySelector(".gifSkeleton");

  try {
    // Add the loading message with the spinner
    generateLoadingMessage(skeleton);

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
    generateGifMarkup(data, randomGifPlaceholder);
  } catch (error) {
    // If something goes wrong we remove the loading and append the error message
    skeleton.querySelector(".loading").remove();
    generateErrorMessage(skeleton);
  }
};

// Add event listener to next button on random section to render a random gif
randomNextBtn.addEventListener("click", renderRandom);

// Call render random a first time when page is loaded
// renderRandom();
