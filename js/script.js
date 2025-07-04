$(document).ready(function () {
  //Menu > mostrar submenu
  $(".submenu")
    .parent()
    .click(function () {
      $(this).children("ul").toggleClass("hidden-element");
    });

  // Click menú hamburguesa
  $(".is-mobile .btn-menu").click(function () {
    $(".overlay-menu-wrapper").toggleClass("hidden-element");
    $(".overlay-menu-wrapper").toggleClass("is-open");
  });

  // Click "Cómo citar"
  $("#btn_modal_how_to_cite").click(function () {
    $(".modal_window_wrapper.how_to_cite").toggleClass("hidden-element");
  });

  $(".citation .citation_formats_button").click(function () {
    $(".citation .citation_formats_list").toggleClass("hidden-element");
  });

  $("#close_button_how_to_cite").click(function () {
    $(".modal_window_wrapper.how_to_cite").toggleClass("hidden-element");
  });

  // Click "Info sobre autores"
  $("#btn_modal_authors_list").click(function () {
    $(".modal_window_wrapper.authors_list").toggleClass("hidden-element");
  });

  $("#close_button_authors_list").click(function () {
    $(".modal_window_wrapper.authors_list").toggleClass("hidden-element");
  });

  //Search > añadir clases
  $(".search_advanced label").addClass("form-label");
  $(".search_advanced select").addClass("form-select");

  // Click "Búsqueda avanzada"
  $(".page_search .search_advanced_title").click(function () {
    $(".page_search .search_advanced").toggleClass("hidden-element");
  });

  document
    .querySelectorAll(".btn-authors-first-letter li")
    .forEach((letter) => {
      letter.addEventListener("click", (event) => {
        const currentLetter = document.querySelector(
          ".btn-authors-first-letter li.select"
        );
        if (currentLetter) {
          currentLetter.classList.remove("select");
        }

        letter.classList.add("select");
        const selectedLetter = letter.getAttribute("data-letter");
        document
          .querySelectorAll(".letter-block-list-wrapper")
          .forEach((block) => {
            const displayValue =
              block.getAttribute("data-letter") == selectedLetter ||
              selectedLetter == "all"
                ? "block"
                : "none";
            block.style.display = displayValue;
          });
      });
    });
  const firstLetter = document.querySelector(
    ".btn-authors-first-letter li:first-child"
  );
  if (firstLetter) {
    firstLetter.click();
  }

  if (
    document.querySelector(".pkp_page_about") ||
    document.querySelector(".pkp_page_indexacio")
  ) {
    const titulos = document
      .querySelector(".pkp_structure_content")
      .getElementsByTagName("h3");
    const container = document.createElement("ul");
    container.className = "aboutToc";

    for (const titulo of titulos) {
      const li = document.createElement("li");
      li.innerHTML = titulo.innerText;
      li.addEventListener("click", () => {
        titulo.scrollIntoView({ behavior: "smooth" });
      });
      container.append(li);
    }
    document.querySelector(".h1_title").after(container);
  }
});

// ************SLIDER**************//

// JavaScript (actualizado)
document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".slider-prev");
  const nextButton = document.querySelector(".slider-next");

  let currentIndex = 0;
  const slidesToShow = 3; // Cambiado de 4 a 3
  const slideWidth = 100 / slidesToShow; // Porcentaje de ancho por slide

  function updateSlider() {
    const offset = -currentIndex * slideWidth;
    sliderTrack.style.transform = `translateX(${offset}%)`;

    // Control de botones
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= slides.length - slidesToShow;
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < slides.length - slidesToShow) {
      currentIndex++;
      updateSlider();
    }
  });

  // Ajustar slides visibles según breakpoint
  function adjustSlidesToShow() {
    let newSlidesToShow = slidesToShow;
    if (window.innerWidth <= 767) newSlidesToShow = 2;
    if (window.innerWidth <= 576) newSlidesToShow = 1;

    updateSlider();
  }

  window.addEventListener("resize", adjustSlidesToShow);
  updateSlider(); // Inicializar
});
