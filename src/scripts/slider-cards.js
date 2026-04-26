document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".card-grid-wrapper");

  sliders.forEach((wrapper) => {
    const grid = wrapper.querySelector(".card-grid");
    const cards = wrapper.querySelectorAll(".card");

    // Cria container de dots se não existir
    let dotsContainer = wrapper.querySelector(".slider-dots");
    if (!dotsContainer) {
      dotsContainer = document.createElement("div");
      dotsContainer.className = "slider-dots";
      wrapper.appendChild(dotsContainer);
    }

    if (!grid || cards.length === 0 || window.innerWidth > 768) return; // ativa só no mobile

    let currentIndex = 0;

    // --- Criar bolinhas de navegação ---
    cards.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("span");

    // --- Função para ir para slide específico ---
    function goToSlide(index) {
      currentIndex = index;
      grid.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d) => d.classList.remove("active"));
      dots[index].classList.add("active");
    }

    // --- Arraste touch para deslizar ---
    let startX = 0;
    let isDragging = false;

    grid.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    grid.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const moveX = e.touches[0].clientX - startX;

      if (Math.abs(moveX) > 50) {
        if (moveX < 0 && currentIndex < cards.length - 1)
          goToSlide(currentIndex + 1);
        if (moveX > 0 && currentIndex > 0) goToSlide(currentIndex - 1);
        isDragging = false;
      }
    });

    grid.addEventListener("touchend", () => {
      isDragging = false;
    });
  });
});
