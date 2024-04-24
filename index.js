//
//
//
let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${
      y * boolInt
    }px)`;
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";

  emailjs
    .sendForm(
      "service_5vs0izw",
      "template_08knn0m",
      event.target,
      "LGHXeSXLqXlEsviIP"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly on firato1811@outlook.de"
      );
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}

// Event listeners for click events
document.querySelector(".nav__link").addEventListener("click", toggleModal);
document.querySelector(".click").addEventListener("click", toggleContrast);
document.querySelector(".form__submit").addEventListener("click", contact);

// Event listeners for touch events
document.querySelector(".nav__link").addEventListener("touchstart", toggleModal);
document.querySelector(".click").addEventListener("touchstart", toggleContrast);
document.querySelector(".form__submit").addEventListener("touchstart", contact);

// Event listener for touch events to move background
document.addEventListener("touchstart", moveBackground);

