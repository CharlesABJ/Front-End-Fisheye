function handleModal() {
  const body = document.querySelector("body");
  const contactModal = document.getElementById("contact_modal");
  const openContactModalButton = document.querySelector(".contact_button");
  const closeContactModalButton = document.querySelector(".modal .top img");
  const valideContactModalButton = document.querySelector(".contact_button2");

  openContactModalButton.addEventListener("click", displayModal);
  closeContactModalButton.addEventListener("click", closeModal);
  valideContactModalButton.addEventListener("click", validateTheForm);

  function displayModal() {
    body.classList.add("modal-is-open");
    contactModal.classList.add("modal-is-open");
  }

  function closeModal() {
    contactModal.classList.remove("modal-is-open");
    body.classList.remove("modal-is-open");
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
