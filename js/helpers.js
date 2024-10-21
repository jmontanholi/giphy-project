/**
 *
 * @param {object} parent // Node element that should have its content replaced by skeleton
 *
 * This function appends the gif to the parent at the end
 */
export const renderGifMarkup = function (data, parent) {
  if (!data) return "";

  const markup = `
    <a href="${data.url}">
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
    </a>
  `;

  parent.insertAdjacentHTML("beforeend", markup);
};

/**
 *
 * @param {object} parent // Node element that should have its content replaced by skeleton
 *
 * This function appends the loading message to the parent at the end
 */
export const renderLoadingMessage = function (parent) {
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
export const renderErrorMessage = function (parent) {
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
export const renderSkeleton = function (parent) {
  const markup = `
    <div class="gifSkeleton" aria-hidden="true">
      <i class="fa-regular fa-image skeleton__svg"> </i>
    </div>
  `;

  parent.innerHTML = markup;
};
