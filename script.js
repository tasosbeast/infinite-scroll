// Unsplash API
const count = 10;
const apiKey = "g26280_Enqn8P9DEKwACacG3-9PcG4hZwai2nxaV7AA";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotosFromUnsplashApi() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Catch Error Here
  }
}

// on load
getPhotosFromUnsplashApi();
