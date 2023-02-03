const API_URL = `https://api.unsplash.com/`;
const API_KEY = "cYYptSYsX7An0Jz6tcgtcLwYSQKUcwzspY6hnAUQEno";

document.querySelector("#searchField").addEventListener("keydown", (e) => {
  e.key === "Enter" && e.target.value !== "" && searchImages(e.target.value);
});

function searchImages(query) {
  document.querySelector("#grid").textContent = "";
  fetch(
    `${API_URL}search/photos?query=${query}&per_page=30&client_id=${API_KEY}`
  )
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      mountImages(data?.results || []);
    })
    .catch((e) => alert(e));
}

function mountImages(imagesData) {
  imagesData.map((image) => {
    let imageToMount = new Image();
    imageToMount.alt = image?.alt;
    imageToMount.src = image?.links.download;

    return document.querySelector("#grid").appendChild(imageToMount);
  });
}
