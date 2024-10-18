import { API_KEY, BASE_API_URL } from "./configFile.js";

const randomGifPlaceholder = document.querySelector(
  ".randomSection__gifPlaceholder"
);

const generateGifMarkup = function (data) {
  if (!data) return ``;

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

const fetchRandom = async function () {
  try {
    // TODO: add loading message
    const response = await fetch(
      `${BASE_API_URL}/random?api_key=${API_KEY}231`
    );

    // if (!response.ok) {
    //   const { meta: errorData } = await response.json();
    //   throw Error(JSON.stringify(errorData));
    // }

    const { data } = await response.json();

    const skeleton = randomGifPlaceholder.querySelector(".gifSkeleton");
    console.log(skeleton);

    // randomGifPlaceholder.insertAdjacentHTML(
    //   "beforeend",
    //   generateGifMarkup(data)
    // );
  } catch (error) {
    // TODO: Show error message instead of loading
    console.log("CATCH", JSON.parse(error.message));
  } finally {
    // TODO: remove loading
  }
};

fetchRandom();
