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

  // novos campos (precisam existir no HTML se quiser mostrar)
  const modalCaixa = document.getElementById("modalCaixa");
  const modalSegmento = document.getElementById("modalSegmento");
  const modalCilindrada = document.getElementById("modalCilindrada");
  const modalPotencia = document.getElementById("modalPotencia");

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const closeBtn = document.querySelector(".close-modal");

  let currentImages = [];
  let currentIndex = 0;

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
    } catch {
      currentImages = [];
    }

    currentIndex = 0;

    modalImg.src = currentImages[0] || card.querySelector("img")?.src || "";

    modalBrand.textContent = brand;
    modalModel.textContent = model;
    modalPrice.textContent = price;

    modalYear.textContent = year;
    modalFuel.textContent = fuel;
    modalKm.textContent = km;

    // novos campos (com fallback)
    if (modalCaixa) modalCaixa.textContent = caixa || "-";
    if (modalSegmento) modalSegmento.textContent = segmento || "-";
    if (modalCilindrada) modalCilindrada.textContent = cilindrada || "-";
    if (modalPotencia) modalPotencia.textContent = potencia || "-";

    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }

  // click nos cards
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".car-card");
    if (card) openModal(card);
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  closeBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

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
