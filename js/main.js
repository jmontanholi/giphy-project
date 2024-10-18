import { API_KEY, BASE_API_URL } from "./configFile.js";

const randomGifPlaceholder = document.querySelector(
  ".randomSection__gifPlaceholder"
);
const randomNextBtn = document.querySelector(".randomSection__btn");

const generateGifMarkup = function (data) {
  if (!data) return "";

  return `
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
};

const generateLoadingSpinner = function () {
  return `
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
};

const generateErrorMessage = function () {
  return `
    <div class="error">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p>Oh no, something went snap!</p>
    </div>
  `;
};

const renderRandom = async function () {
  const skeleton = randomGifPlaceholder.querySelector(".gifSkeleton");

  try {
    skeleton.insertAdjacentHTML("beforeend", generateLoadingSpinner());

    const response = await fetch(`${BASE_API_URL}/random?api_key=${API_KEY}`);

    if (!response.ok) {
      const { meta: errorData } = await response.json();
      throw Error(JSON.stringify(errorData));
    }

    const { data } = await response.json();

    skeleton.remove();
    randomGifPlaceholder.insertAdjacentHTML(
      "beforeend",
      generateGifMarkup(data)
    );
  } catch (error) {
    skeleton.insertAdjacentHTML("beforeend", generateErrorMessage());
  } finally {
    skeleton.querySelector(".loading").remove();
  }
};
renderRandom();
