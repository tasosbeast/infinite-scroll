const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "g26280_Enqn8P9DEKwACacG3-9PcG4hZwai2nxaV7AA";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("ready = ", ready);
    loader.style.display = "none";
  }
}

// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links & photos, add to dom
// create elements for links & photos, add to dom
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // run function for each object in photosArray
  photosArray.forEach((photo) => {
    // create <a> to link to Unsplash
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // add a data attribute for the color
    img.dataset.color = photo.color;

    // put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);

    // create an observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        // loop over the entries
        entries.forEach((entry) => {
          // if the element is visible
          if (entry.isIntersecting) {
            // change the background color to the color from the data attribute
            document.body.style.backgroundColor = entry.target.dataset.color;
            // scale the image
            entry.target.style.filter = "saturate(100%)";
            entry.target.style.transition = "all 0.6s ease";
            entry.target.style.filter = "blur(0px)";
          } else {
            // reset the scale when the image is not at the center
            entry.target.style.filter = "saturate(10%)";
            entry.target.style.filter = "blur(10px)";
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    // start observing the image
    observer.observe(img);
  });
}

async function getPhotosFromUnsplashApi() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotosFromUnsplashApi();
  }
});
// on load
getPhotosFromUnsplashApi();
