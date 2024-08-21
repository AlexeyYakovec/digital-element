import "../pages/index.scss";

// Element Selections
const elements = {
  burger: document.querySelector(".burger"),
  closeMenu: document.querySelector(".off-screen-menu__close"),
  offScreenMenu: document.querySelector(".off-screen-menu"),
  modalOverlay: document.getElementById("modal-overlay"),
  successOverlay: document.getElementById("success-overlay"),
  contactForm: document.getElementById("contact-form"),
  openFormModal: document.getElementById("open-form"),
  closeButtons: document.querySelectorAll(".form__close"),
  fullNameInput: document.getElementById("full-name"),
  emailInput: document.getElementById("email"),
  nameError: document.getElementById("name-error"),
  emailError: document.getElementById("email-error"),
  successMessage: document.querySelector(".success-message"),
  offScreenForm: document.querySelector(".off-screen-form"),
};

// Menu Toggle Functions
function openMenu() {
  elements.burger.classList.add("active");
  elements.offScreenMenu.classList.add("active");
}

function closeMenu() {
  elements.burger.classList.remove("active");
  elements.offScreenMenu.classList.remove("active");
}

// Modal Toggle Functions
function openModal() {
  elements.modalOverlay.style.display = "flex";
  elements.modalOverlay.style.flexDirection = "column";
  elements.contactForm.style.display = "flex";
  elements.contactForm.style.flexDirection = "column";
  document.body.classList.add("no-scroll");
}

function closeModal() {
  elements.modalOverlay.style.display = "none";
  elements.successOverlay.style.display = "none";
  document.body.classList.remove("no-scroll");
}

// Form Validation and Submission
function handleFormSubmit(event) {
  event.preventDefault();

  let isValid = validateForm();

  if (isValid) {
    submitForm();
  }
}

function validateForm() {
  let isValid = true;

  if (!elements.fullNameInput.value.trim()) {
    elements.nameError.style.display = "block";
    isValid = false;
  } else {
    elements.nameError.style.display = "none";
  }

  if (
    !elements.emailInput.value.trim() ||
    !elements.emailInput.value.includes("@")
  ) {
    elements.emailError.style.display = "block";
    isValid = false;
  } else {
    elements.emailError.style.display = "none";
  }

  return isValid;
}

function submitForm() {
  const formData = new FormData(elements.contactForm);
  const formDataObject = Object.fromEntries(formData.entries());

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObject),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      console.log("Success:", data);
      closeModal();
      elements.successOverlay.style.display = "flex";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function addEventListeners() {
  elements.burger.addEventListener("click", openMenu);
  elements.closeMenu.addEventListener("click", closeMenu);
  elements.openFormModal.addEventListener("click", openModal);
  elements.contactForm.addEventListener("submit", handleFormSubmit);

  elements.modalOverlay.addEventListener("click", (event) => {
    if (event.target === elements.modalOverlay) {
      closeModal();
    }
  });

  elements.successOverlay.addEventListener("click", (event) => {
    if (event.target === elements.successOverlay) {
      closeModal();
    }
  });

  elements.offScreenForm.addEventListener("click", (event) =>
    event.stopPropagation()
  );
  elements.successMessage.addEventListener("click", (event) =>
    event.stopPropagation()
  );

  elements.closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });
}

document.addEventListener("DOMContentLoaded", addEventListeners);
