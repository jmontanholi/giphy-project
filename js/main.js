import { API_KEY, BASE_API_URL } from "./configFile.js";

const randomGifPlaceholder = document.querySelector(
  ".randomSection__gifPlaceholder"
);

const generateGifMarkup = function (data) {
  if (!data) return "";

  return `
    <video class="gifVideo" width="320" height="240" autoplay loop muted>
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

const renderRandom = async function () {
  const skeleton = randomGifPlaceholder.querySelector(".gifSkeleton");

  try {
    skeleton.insertAdjacentHTML("beforeend", generateLoadingSpinner());

    const response = await fetch(
      `${BASE_API_URL}/random?api_key=${API_KEY}231`
    );

    // if (!response.ok) {
    //   const { meta: errorData } = await response.json();
    //   throw Error(JSON.stringify(errorData));
    // }

    const { data } = await response.json();

    // randomGifPlaceholder.insertAdjacentHTML(
    //   "beforeend",
    //   generateGifMarkup(data)
    // );
  } catch (error) {
    // TODO: Show error message instead of loading
    console.log(error);

    console.log("CATCH", JSON.parse(error.message));
  } finally {
    skeleton.querySelector(".loading").remove();
  }
};

renderRandom();
