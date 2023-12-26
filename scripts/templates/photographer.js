function photographerTemplate(data) {
  const { portrait, name, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const a = document.createElement("a");
    const cover = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const span = document.createElement("span");
    a.setAttribute("href", `photographer.html?id=${id}`);

    cover.setAttribute("class", "cover");
    img.setAttribute("src", picture);
    h2.innerHTML = name;
    h3.innerHTML = `${city}, ${country}`;
    p.innerHTML = tagline;
    span.innerHTML = `${price}€/jour`;

    article.appendChild(a);
    a.appendChild(cover);
    a.appendChild(h2);
    a.appendChild(h3);
    a.appendChild(p);
    a.appendChild(span);
    cover.appendChild(img);
    return article;
  }
  return { getUserCardDOM };
}
