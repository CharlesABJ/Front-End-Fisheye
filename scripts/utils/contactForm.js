function handleModal() {
  const body = document.querySelector("body");
  const contactModal = document.getElementById("contact_modal");
  const overlay = document.querySelector("#contact_modal .overlay");
  const openContactModalButton = document.querySelector(".contact_button");
  const closeContactModalButton = document.querySelector(".modal .top img");
  const valideContactModalButton = document.querySelector(".contact_button2");
  const main = document.querySelector("main");
  const galleryModalContainer = document.querySelector("#gallery-modal");

  openContactModalButton.addEventListener("click", displayModal);
  overlay.addEventListener("click", closeModal);
  closeContactModalButton.addEventListener("click", closeModal);
  valideContactModalButton.addEventListener("click", validateTheForm);

  function displayModal() {
    body.classList.add("modal-is-open");
    contactModal.classList.add("modal-is-open");
    main.setAttribute("aria-hidden", "true");
    galleryModalContainer.setAttribute("aria-hidden", "true");
    main.setAttribute("tabindex", "-1");
    galleryModalContainer.setAttribute("tabindex", "-1");
  }

  function closeModal() {
    contactModal.classList.remove("modal-is-open");
    body.classList.remove("modal-is-open");
    main.setAttribute("aria-hidden", "false");
    galleryModalContainer.setAttribute("aria-hidden", "false");
    main.setAttribute("tabindex", "0");
  }

  document.addEventListener("keydown", (e) => {
    let keyCode = e.code;
    if (keyCode === "Escape") {
      closeModal();
    }
  });
}

function validateTheForm() {
  const inputs = document.querySelectorAll("#contact_modal form input");
  const textArea = document.querySelector("#contact_modal form textarea");
  let invalide = false;
  inputs.forEach((input) => {
    if (input.value === "") {
      invalide = true;
      console.log(`Veuillez écrire votre ${input.name.toLowerCase()}`);
    } else {
      console.log(`${input.name}: ${input.value}`);
    }
  });
  if (textArea.value === "") {
    textArea.classList.add("invalid");
    console.log(`Veuillez écrire un ${textArea.name.toLowerCase()}`);
    invalide = true;
  } else {
    textArea.classList.remove("invalid");
    console.log(`Message: ${textArea.value}`);
  }
  if (!invalide) {
    alert(
      `Votre message pour ${
        document.querySelector("h2").innerHTML
      } a bien été envoyé !`
    );
    inputs.forEach((input) => {
      input.value = "";
    });
    textArea.value = "";
    console.clear();
  }
}
