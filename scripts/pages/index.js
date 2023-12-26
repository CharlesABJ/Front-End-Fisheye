async function getPhotographers() {
  const apiPhotographer = "./data/photographers.json";
  const response = await fetch(apiPhotographer);
  let data = await response.json();
  let photographers = data.photographers;
  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const resultat = await getPhotographers();

  displayData(resultat);
}

init();
