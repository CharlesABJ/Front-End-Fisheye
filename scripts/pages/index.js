// index.js
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Empêche le comportement par défaut de la touche "Enter"
    document.activeElement.click();
    console.log("test");
  }
}
// Obtenir les données de tous les photographes
async function getPhotographersData() {
  const apiPhotographers = "./data/photographers.json";
  const response = await fetch(apiPhotographers);
  let data = await response.json();
  let photographers = data.photographers;
  return photographers;
}

// Afficher les données de tous les photographes
async function displayPhotographersData(photographers) {
  const photographersGallery = document.querySelector(".photographers_gallery");
  photographers.forEach((photographer) => {
    const photographerModel =
      photographerTemplate(photographer).photographerModel();
    photographersGallery.appendChild(photographerModel);
  });
}

async function init() {
  // Attend de récupérer les datas des photographes pour les afficher
  const resultat = await getPhotographersData();
  displayPhotographersData(resultat);
}

init();
