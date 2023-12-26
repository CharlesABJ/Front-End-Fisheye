function photographerPageTemplate(data) {
  const { portrait, name, city, country, tagline } = data;

  function getHeaderDOM() {
    const header = `
    <div class="presentation">
      <h2>${name}</h2>
      <h3>${city}, ${country}</h3>
      <p>${tagline}</p>
    </div>
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <div class="profile">
      <img src="assets/photographers/${portrait}" alt="${name}">
    </div>`;
    return header;
  }
  return { getHeaderDOM };
}

function getGalleryCard(media, photographerId) {
  const mediaFactory = media.hasOwnProperty("image")
    ? new MediaFactory(media.image, "image")
    : new MediaFactory(media.video, "video");
  const card = `
  <div class="card">

    ${mediaFactory.getMedia(photographerId)}
      <div class="content">
        <h5>${media.title}</h5>
        <span>${media.likes}❤️</span>
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
      return `<img src = "./assets/${photographerId}/${this.src}" alt= "${this.src}">`;
    }
    if (this.type === "video") {
      return `<video controls src = "./assets/${photographerId}/${this.src}"> </video>`;
    }
  }
}
