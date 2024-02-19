const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#search-button");
const clearButton = document.querySelector("#clear-button");
const imagelistwrapper = document.querySelector(".imagelist-wrapper");

runAddEventListener();

function runAddEventListener() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clear);

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      search(e);
    }
  });
}

function clear(e) {
  searchInput.value = "";

  Array.from(imagelistwrapper.children).forEach((child) => {
    imagelistwrapper.removeChild(child);
  });
}

function search(e) {
  const value = searchInput.value.trim();

  fetch(`https://api.unsplash.com/search/photos?page=1&query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID y8zc6FA0P5IPceyUnDzqfSKK5MFIcAtOwF4fflNI1iA",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      Array.from(data.results).forEach((image) => {
        addImageToUI(image.urls.small);
      });
    })
    .catch((err) => console.log(err));

  e.preventDefault();
}

function addImageToUI(url) {
  const div = document.createElement("div");
  div.className = "card";
  const img = document.createElement("img");

  img.setAttribute("src", url);

  div.append(img);
  imagelistwrapper.append(div);
}
