// Mettre en forme la header card du photographe
function photographerHeaderTemplate(data) {
  const { portrait, name, city, country, tagline } = data;
  function photographerHeaderModel() {
    const photographerHeader = `
    <div class="presentation">
      <h2>${name}</h2>
      <h3>${city}, ${country}</h3>
      <p>${tagline}</p>
    </div>
    <div class="profil-and-contact">
    <button class="contact_button">Contactez-moi</button>
    <a target="_blank" href="assets/photographers/${portrait}" class="profile">
      <img src="assets/photographers/${portrait}" alt="${name}">
    </a>
    </div>`;

    return photographerHeader;
  }
  return { photographerHeaderModel };
}

// Mettre en forme la gallerie du photographe
function galleryCardTemplate(media, photographerId) {
  const mediaFactory = media.hasOwnProperty("image")
    ? new MediaFactory(media.image, "image")
    : new MediaFactory(media.video, "video");

  const card = `
  <div class="card" data-id="${media.id}">
    <div class="cover">
     ${mediaFactory.getMedia(photographerId)}
    </div>
    <div class="content">
        <h4>${media.title}</h4>
        <p><span data-id="${media.id}" class="counter">${
    media.likes
  }</span> <i data-id="${media.id}" class="fa-solid fa-heart"></i></p>
    </div>
    </div>`;
  return card;
}

class MediaFactory {
  constructor(src, type) {
    this.src = src;
    this.type = type;
  }
  getMedia(photographerId) {
    if (this.type === "image") {
      return `<img src = "./assets/${photographerId}/${this.src}" alt= "${this.src}" loading="lazy">`;
    }
    if (this.type === "video") {
      return `<video controls src = "./assets/${photographerId}/${this.src}" loading="lazy"> </video>`;
    }
  }
}
