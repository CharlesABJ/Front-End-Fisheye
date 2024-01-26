const apiPhotographer = "./data/photographers.json";

// Obtenir l'ID de l'URL
function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}

// On cherche dans la base de données le photographe qui a le même id que celui de l'URL
async function getPhotographer(id) {
  const response = await fetch(apiPhotographer);
  let data = await response.json();
  let photographers = data.photographers;
  const photographer = photographers.find((p) => p.id.toString() === id);
  return photographer;
}

// Afficher les infos du photographe
async function displayPhotographerHeader(photographer) {
  document.querySelector("title").innerHTML = `Fisheye - ${photographer.name}`;
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
  photographersMedias.sort((a, b) => b.likes - a.likes);
  return photographersMedias;
}

// Afficher les médias du photographe
function displayPhotographerMedia(medias, photographerId) {
  const galleryCards = document.querySelector(".gallery-cards");

  galleryCards.innerHTML = medias
    .map((media) => galleryCardTemplate(media, photographerId))
    .join("");

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

    galleryCards.innerHTML = medias
      .map((media) => galleryCardTemplate(media, photographerId))
      .join("");

    handleLikes();
    handleCarrousel();
  }
}

// Mise en place de la logique de like
function handleLikes(photographer) {
  counterLikesContainer = document.querySelector(".counter-likes");
  const likesCounter = document.querySelectorAll(
    "#photograph-medias .gallery-cards .card .counter"
  );
  const likes = document.querySelectorAll(
    "#photograph-medias .gallery-cards .card .fa-solid.fa-heart"
  );
  // Incrémentation du nombre de likes
  likes.forEach((like) => {
    like.addEventListener("click", function () {
      incrementLikes(like);
    });
  });

  // Incrémentation du nombre de likes avec la touche entrée
  likes.forEach((like) => {
    like.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        incrementLikes(like);
      }
    });
  });

  function incrementLikes(like) {
    likesCounter.forEach((counter) => {
      if (counter.getAttribute("data-id") === like.getAttribute("data-id")) {
        Number(counter.innerHTML++);
        // Vérification si le nombre de likes se termine par 9
        if (
          (Number(counter.innerHTML) - 99) % 100 === 0 ||
          Number(counter.innerHTML) % 100 === 0
        ) {
          like.classList.add("special");
        } else {
          like.classList.remove("special");
        }
      }
    });
    // Calcul du nombre total de likes
    let totalLikes = 0;
    likesCounter.forEach((counter) => {
      totalLikes += Number(counter.innerHTML);
    });
    counterLikesContainer.innerHTML = `
    <p>${totalLikes.toLocaleString()} <i tabindex="0" class="fa-solid fa-heart"></i></p> 
    <p>${photographer.price}€ / jour</p>
    `;
  }
  // Calcul du nombre total de likes
  let totalLikes = 0;
  likesCounter.forEach((counter) => {
    totalLikes += Number(counter.innerHTML);
  });

  counterLikesContainer.innerHTML = `
  <p>${totalLikes.toLocaleString()} <i tabindex="0" class="fa-solid fa-heart"></i></p> 
  <p>${photographer.price}€ / jour</p>
  `;

  // const totalLikesIcon = document.querySelector(".counter-likes p i");

  // if (totalLikes % 1000 === 999 || totalLikes % 1000 === 0) {
  //   totalLikesIcon.classList.add("special");
  // } else {
  //   totalLikesIcon.classList.remove("special");
  // }
}

//Mise en place du carrousel
function handleCarrousel() {
  const main = document.querySelector("main");
  const contactModal = document.getElementById("contact_modal");
  const body = document.querySelector("body");
  const mediasOfGallery = document.querySelectorAll(
    "#photograph-medias .gallery-cards .card"
  );
  const galleryModalContainer = document.querySelector("#gallery-modal");
  const galleryModal = document.querySelector("#gallery-modal .modal");
  // Supprimer les éléments .card existants dans la modale
  const existingCards = galleryModal.querySelectorAll(".card");
  existingCards.forEach((card) => card.remove());

  const closeGalleryModalBtn = document.querySelector(".close-media");
  const overlay = document.querySelector("#gallery-modal .overlay");

  const prevButton = document.querySelector(".prev-media");
  const nextButton = document.querySelector(".next-media");
  const modalTriggers = document.querySelectorAll(
    "#photograph-medias .gallery-cards .card"
  );
  let counter = 0;

  // Cloner les images de gallery dans la modale
  for (let media of mediasOfGallery) {
    const mediaCloneInModal = media.cloneNode(true);
    galleryModal.append(mediaCloneInModal);
  }
  const videos = document.querySelectorAll("#gallery-modal .modal .card video");
  videos.forEach((video) => video.setAttribute("controls", "true"));
  // Ajouter les événements aux éléments clonés
  const mediasOfGalleryCloneInModal = document.querySelectorAll(
    "#gallery-modal .modal .card"
  );

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

  // Ouvrir la modale
  for (let trigger of modalTriggers) {
    trigger.addEventListener("click", function (e) {
      if (!e.target.classList.contains("fa-heart")) {
        body.classList.add("modal-is-open");
        galleryModalContainer.classList.add("modal-is-open");
        // main.setAttribute("aria-hidden", "true");
        // contactModal.setAttribute("aria-hidden", "true");
      }
    });
  }

  // Fermer la modale
  closeGalleryModalBtn.addEventListener("click", closeGalleryModal);
  overlay.addEventListener("click", closeGalleryModal);

  function closeGalleryModal() {
    galleryModalContainer.classList.remove("modal-is-open");
    body.classList.remove("modal-is-open");
    // main.setAttribute("aria-hidden", "false");
    // contactModal.setAttribute("aria-hidden", "false");
  }

  // Afficher le media suivant
  nextButton.addEventListener("click", function () {
    if (counter < mediasOfGalleryCloneInModal.length - 1) {
      counter++;
    } else {
      counter = 0;
    }
    mediasOfGalleryCloneInModal[counter].classList.add("media-active-in-modal");
  });

  // Afficher le media précédent
  prevButton.addEventListener("click", function () {
    if (counter > 0) {
      counter--;
    } else {
      counter = mediasOfGalleryCloneInModal.length - 1;
    }
    mediasOfGalleryCloneInModal[counter].classList.add("media-active-in-modal");
  });

  // Afficher le media suivant
  function nextMedia() {
    const mediasOfGalleryCloneInModal = document.querySelectorAll(
      "#gallery-modal .modal .card"
    );

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

  // Afficher le media précédent
  function prevMedia() {
    const mediasOfGalleryCloneInModal = document.querySelectorAll(
      "#gallery-modal .modal .card"
    );

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
      case "ArrowUp":
        prevMedia();
        break;
      case "ArrowRight":
        nextMedia();
        break;
      case "ArrowDown":
        nextMedia();
        break;
      case "Space":
        nextMedia();
        break;
      case "Enter":
        nextMedia();
        break;
      default:
        break;
    }
  });
}
async function init() {
  // Récupère les datas des photographes
  id = getPhotographerIdFromUrl();
  const photographer = await getPhotographer(id);
  await displayPhotographerHeader(photographer);
  medias = await getPhotographerMedia(id);

  await displayPhotographerMedia(medias, id);
  handleLikes(photographer);
  handleModal();
  handleCarrousel();
}

init();
