document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("carModal");
  if (!modal) return;

  const modalImg = document.getElementById("modalImage");
  const modalBrand = document.getElementById("modalBrand");
  const modalModel = document.getElementById("modalModel");
  const modalPrice = document.getElementById("modalPrice");

  const modalYear = document.getElementById("modalYear");
  const modalFuel = document.getElementById("modalFuel");
  const modalKm = document.getElementById("modalKm");

  const modalCaixa = document.getElementById("modalCaixa");
  const modalSegmento = document.getElementById("modalSegmento");
  const modalCilindrada = document.getElementById("modalCilindrada");
  const modalPotencia = document.getElementById("modalPotencia");

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const closeBtn = document.querySelector(".close-modal");

  let currentImages = [];
  let currentIndex = 0;

  // =====================
  // OPEN MODAL
  // =====================
  function openModal(card) {
    if (!card) return;

    const {
      brand = "",
      model = "",
      price = "",
      year = "",
      fuel = "",
      km = "",
      caixa = "",
      segmento = "",
      cilindrada = "",
      potencia = "",
    } = card.dataset;

    try {
      currentImages = JSON.parse(card.dataset.images || "[]");
    } catch (e) {
      console.warn("Erro ao ler imagens:", e);
      currentImages = [];
    }

    currentIndex = 0;

    const firstImg =
      currentImages[0] || card.querySelector("img")?.getAttribute("src");

    if (firstImg && modalImg) {
      modalImg.src = firstImg;
    }

    modalBrand.textContent = brand;
    modalModel.textContent = model;
    modalPrice.textContent = price;

    modalYear.textContent = year;
    modalFuel.textContent = fuel;
    modalKm.textContent = km;

    if (modalCaixa) modalCaixa.textContent = caixa || "-";
    if (modalSegmento) modalSegmento.textContent = segmento || "-";
    if (modalCilindrada) modalCilindrada.textContent = cilindrada || "-";
    if (modalPotencia) modalPotencia.textContent = potencia || "-";

    modal.classList.add("active");

    document.body.classList.add("modal-open", "no-scroll");
    document.documentElement.classList.add("no-scroll");
  }

  // =====================
  // 🔥 TOQUE INTELIGENTE (FIX MOBILE DRAG)
  // =====================
  let startX = 0;
  let startY = 0;
  let moved = false;

  document.addEventListener(
    "touchstart",
    (e) => {
      const card = e.target.closest(".car-card");
      if (!card) return;

      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      moved = false;
    },
    { passive: true },
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      const touch = e.touches[0];

      const dx = Math.abs(touch.clientX - startX);
      const dy = Math.abs(touch.clientY - startY);

      if (dx > 10 || dy > 10) {
        moved = true;
      }
    },
    { passive: true },
  );

  document.addEventListener("touchend", (e) => {
    const card = e.target.closest(".car-card");
    if (!card) return;

    if (moved) return;

    openModal(card);
  });

  // =====================
  // CLICK DESKTOP
  // =====================
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".car-card");
    if (!card) return;

    openModal(card);
  });

  // =====================
  // CLOSE MODAL (🔥 FIX DEFINITIVO SCROLL)
  // =====================
  function closeModal() {
    modal.classList.remove("active");

    document.body.classList.remove("modal-open", "no-scroll");
    document.documentElement.classList.remove("no-scroll");

    // 🔥 impede Safari/iOS de resetar scroll
    const scrollY = window.scrollY;

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }

  closeBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // =====================
  // SLIDER
  // =====================
  nextBtn?.addEventListener("click", () => {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  });
  
  prevBtn?.addEventListener("click", () => {
    if (!currentImages.length) return;
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  });
});
