// Mettre en forme la header card du photographe
function photographerHeaderTemplate(data) {
  const { portrait, name, city, country, tagline } = data;
  function photographerHeaderModel() {
    const photographerHeader = `
    <div class="presentation">
      <h1>${name}</h1>
      <h2>${city}, ${country}</h2>
      <p>${tagline}</p>
    </div>
    <div class="profil-and-contact">
    <button class="contact_button">Contactez-moi</button>
    <a target="_blank" href="assets/photographers/${portrait}" class="profile">
      <img src="assets/photographers/${portrait}" alt="${name}" loading="lazy">
    </a>
    </div>`;

    return photographerHeader;
  }
  return { photographerHeaderModel };
}

// Mettre en forme la gallerie du photographe
function galleryCardTemplate(media, photographerId) {
  const mediaFactory = Object.prototype.hasOwnProperty.call(media, "image")
    ? new MediaFactory(media.image, "image")
    : new MediaFactory(media.video, "video");

  const card = `
  <div tabindex=0 class="card" data-id="${media.id}">
    <div class="cover">
     ${mediaFactory.getMedia(photographerId, media)}
    </div>
    <div class="content">
        <h3>${media.title}</h3>
        <h4><span data-id="${media.id}" class="counter">${
    media.likes
  }</span> <i tabindex="0" data-id="${
    media.id
  }" class="fa-solid fa-heart"></i></h4>
    </div>
    </div>`;
  return card;
}

class MediaFactory {
  constructor(src, type) {
    this.src = src;
    this.type = type;
  }
  getMedia(photographerId, media) {
    if (this.type === "image") {
      return `<img src = "./assets/${photographerId}/${this.src}" alt= "${media.title}" loading="lazy">`;
    }
    if (this.type === "video") {
      return `<video src = "./assets/${photographerId}/${this.src}" loading="lazy"> </video>`;
    }
  }
}
