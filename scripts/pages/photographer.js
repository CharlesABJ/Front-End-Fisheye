// Obtenir l'ID du photographe à partir de l'URL
function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}

// On vérifie si l'ID du photographe correspond à celui de la page
function isCurrentPhotographer(id) {
  return id === getPhotographerIdFromUrl();
}

async function getPhotographer(id) {
  const apiPhotographer = "./data/photographers.json";
  const response = await fetch(apiPhotographer);
  let data = await response.json();
  let photographers = data.photographers;
  const photographer = photographers.find((p) => p.id.toString() === id);
  return photographer;
}

async function displayPhotographerHeader(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerPageModel = photographerPageTemplate(photographer);
  photographerHeader.innerHTML = photographerPageModel.getHeaderDOM();
}
async function getPhotographerMedia(id) {
  const apiPhotographer = "./data/photographers.json";
  const response = await fetch(apiPhotographer);
  let data = await response.json();
  let photographersMedias = data.media.filter(
    (m) => m.photographerId.toString() === id
  );
  return photographersMedias;
}

function displayPhotographerMedia(medias, photographerId) {
  const galleryCards = document.querySelector(".gallery-cards");

  medias.forEach((media) => {
    galleryCards.insertAdjacentHTML(
      "beforeend",
      getGalleryCard(media, photographerId)
    );
  });
}

async function init() {
  // Récupère les datas des photographes
  const id = getPhotographerIdFromUrl();
  const resultat = await getPhotographer(id);
  displayPhotographerHeader(resultat);
  const medias = await getPhotographerMedia(id);

  //   const mediaFactory = new MediaFactory();
  //   const media = mediaFactory.getMedia("img.jpg", "image");
  displayPhotographerMedia(medias, id);
}

init();
