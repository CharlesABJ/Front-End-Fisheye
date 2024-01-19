const apiPhotographer = "./data/photographers.json";

// Obtenir l'ID du photographe à partir de l'URL
function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}

// On dit que l'ID du photographe affiché correspondra à celui de la page
function isCurrentPhotographer(id) {
  return id === getPhotographerIdFromUrl();
}
// Obtenir les infos du photographe et on donne ainsi une valeur au parametre id de la fonction isCurrentPhotographer
async function getPhotographer(id) {
  const response = await fetch(apiPhotographer);
  let data = await response.json();
  let photographers = data.photographers;
  const photographer = photographers.find((p) => p.id.toString() === id);
  return photographer;
}
// Afficher les infos du photographe
async function displayPhotographerHeader(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerPageModel =
    photographerHeaderTemplate(photographer).photographerHeaderModel();
  photographerHeader.innerHTML = photographerPageModel;
}

// Obtenir les médias du photographe
async function getPhotographerMedia(id) {
  const response = await fetch(apiPhotographer);
  let data = await response.json();
  let photographersMedias = data.media.filter(
    (m) => m.photographerId.toString() === id
  );
  return photographersMedias;
}

// Afficher les médias du photographe
function displayPhotographerMedia(medias, photographerId) {
  const galleryCards = document.querySelector(".gallery-cards");
  galleryCards.innerHTML = "";
  medias.forEach((media) => {
    galleryCards.insertAdjacentHTML(
      "afterbegin",
      galleryCardTemplate(media, photographerId)
    );
  });
  getSelectedMedia();
}

let id;
let medias;
const critereTri = document.querySelector("#critere-tri");
critereTri.addEventListener("change", trieMedias);
function trieMedias() {
  switch (critereTri.value) {
    case "popularité":
      medias.sort((a, b) => b.likes - a.likes);
      break;
    case "date":
      medias.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "titre":
      medias.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      console.log(critereTri.value);
      break;
  }
  displayPhotographerMedia(medias, id);
}

async function init() {
  // Récupère les datas des photographes
  id = getPhotographerIdFromUrl();
  const resultat = await getPhotographer(id);
  await displayPhotographerHeader(resultat);
  medias = await getPhotographerMedia(id);

  const mediaFactory = new MediaFactory();
  const media = mediaFactory.getMedia("img.jpg", "image");
  await displayPhotographerMedia(medias, id);
  handleModal();
  handleCarrousel();
}

function getSelectedMedia() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", openLightBox));
  function openLightBox(e) {
    // Récuperer le parent le plus proche ayant le selecteur .card
    const card = e.target.closest(".card");
    // const mediaId = card.dataset.id;
    const mediaId = card.getAttribute("data-id");
  }
}
init();

// Mise en place de la logique de like
const likesCounter = document.querySelectorAll(
  "#photograph-medias .gallery-cards .card .counter"
);
const likes = document.querySelectorAll(
  "#photograph-medias .gallery-cards .card .fa-solid.fa-heart"
);
likes.forEach((like) =>
  like.addEventListener("click", function (e) {
    e.preventDefault();
    likesCounter.forEach((counter) => {
      if (counter.getAttribute("data-id") === like.getAttribute("data-id")) {
        counter.innerHTML++;
      }
    });
  })
);

//Mise en place du carrousel
function handleCarrousel() {
  const body = document.querySelector("body");
  const mediasOfGallery = document.querySelectorAll(
    "#photograph-medias .gallery-cards .card"
  );
  const galleryModalContainer = document.querySelector("#gallery-modal");
  const galleryModal = document.querySelector("#gallery-modal .modal");

  const closeGalleryModalBtn = document.querySelector(".close-media");

  const prevButton = document.querySelector(".prev-media");
  const nextButton = document.querySelector(".next-media");
  const modalTriggers = document.querySelectorAll(
    "#photograph-medias .gallery-cards .card"
  );
  let counter = 0;

  //Ouvrir la modale
  for (let trigger of modalTriggers) {
    trigger.addEventListener("click", function () {
      body.classList.add("modal-is-open");
      galleryModalContainer.classList.add("modal-is-open");
    });
  }

  //Fermer la modale

  closeGalleryModalBtn.addEventListener("click", closeGalleryModal);

  function closeGalleryModal() {
    galleryModalContainer.classList.remove("modal-is-open");
    body.classList.remove("modal-is-open");
  }

  //Cloner les images de  gallery dans la modale

  for (let media of mediasOfGallery) {
    const mediaCloneInModal = media.cloneNode(true);
    galleryModal.append(mediaCloneInModal);
  }

  const mediasOfGalleryCloneInModal = document.querySelectorAll(
    "#gallery-modal .modal .card"
  );
  let x = 0;

  for (let media of mediasOfGalleryCloneInModal) {
    media.setAttribute("media-position", x++);
  }

  for (let mediaOfGallery of mediasOfGallery) {
    mediaOfGallery.addEventListener("click", function () {
      for (let mediaOfModal of mediasOfGalleryCloneInModal) {
        if (
          mediaOfModal.getAttribute("data-id") ===
          mediaOfGallery.getAttribute("data-id")
        ) {
          mediaOfModal.classList.add("media-active-in-modal");
          counter = mediaOfModal.getAttribute("media-position");
        } else {
          mediaOfModal.classList.remove("media-active-in-modal");
        }
      }
    });
  }

  //Afficher le media suivant
  function nextMedia() {
    for (let media of mediasOfGalleryCloneInModal) {
      media.classList.remove("media-active-in-modal");
    }

    if (counter < mediasOfGalleryCloneInModal.length - 1) {
      counter++;
    } else {
      counter = 0;
    }
    mediasOfGalleryCloneInModal[counter].classList.add("media-active-in-modal");
  }
  nextButton.addEventListener("click", nextMedia);

  //Afficher le media précédent
  function prevMedia() {
    for (let media of mediasOfGalleryCloneInModal) {
      media.classList.remove("media-active-in-modal");
    }
    if (counter > 0) {
      counter--;
    } else {
      counter = mediasOfGalleryCloneInModal.length - 1;
    }
    mediasOfGalleryCloneInModal[counter].classList.add("media-active-in-modal");
  }
  prevButton.addEventListener("click", prevMedia);

  document.addEventListener("keydown", (e) => {
    let keyCode = e.code;
    switch (keyCode) {
      case "Escape":
        closeGalleryModal();
        break;
      case "ArrowLeft":
        prevMedia();
        break;
      case "ArrowRight":
        nextMedia();
      default:
        break;
    }
  });
}
