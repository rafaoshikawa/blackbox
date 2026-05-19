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

  const modalStatus = document.getElementById("modalStatus");

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const closeBtn = document.querySelector(".close-modal");

  // =========================
  // IMAGE VIEWER (CARROSSEL)
  // =========================
  const imageViewer = document.getElementById("imageViewer");
  const imageTrack = document.getElementById("imageTrack");
  const expandBtn = document.querySelector(".expand-image");
  const closeImageViewer = document.querySelector(".close-image-viewer");

  let currentImages = [];
  let currentIndex = 0;
  let scrollY = 0;

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
      status = "disponivel",
    } = card.dataset;

    try {
      currentImages = JSON.parse(card.dataset.images || "[]");
    } catch {
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

    modal.classList.remove("vendido", "reservado", "disponivel");
    modal.classList.add(status);

    if (modalStatus) {
      modalStatus.textContent =
        status === "vendido"
          ? "VENDIDO"
          : status === "reservado"
          ? "RESERVADO"
          : "";

      modalStatus.className = `car-status ${status}`;
    }

    scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add("lock-scroll");

    modal.classList.add("active");
  }

  // =========================
  // TOUCH OPEN MODAL
  // =========================
  let startX = 0;
  let startY = 0;
  let moved = false;

  document.addEventListener(
    "touchstart",
    (e) => {
      const card = e.target.closest(".car-card");
      if (!card) return;

      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      moved = false;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      const dx = Math.abs(t.clientX - startX);
      const dy = Math.abs(t.clientY - startY);

      if (dx > 10 || dy > 10) moved = true;
    },
    { passive: true }
  );

  document.addEventListener("touchend", (e) => {
    const card = e.target.closest(".car-card");
    if (!card || moved) return;
    openModal(card);
  });

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".car-card");
    if (!card) return;
    openModal(card);
  });

  // =========================
  // CLOSE MODAL
  // =========================
  function closeModal() {
    modal.classList.remove("active");
    document.body.classList.remove("lock-scroll");

    document.body.style.top = "";
    document.body.style.position = "";

    window.scrollTo(0, scrollY);
  }

  closeBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // =========================
  // NEXT / PREV (MODAL NORMAL)
  // =========================
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

  // =========================
  // IMAGE VIEWER (CARROSSEL EXPANDIDO)
  // =========================
  function openImageViewer() {
    if (!currentImages.length || !imageTrack) return;

    imageTrack.innerHTML = "";

    currentImages.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      imageTrack.appendChild(img);
    });

    imageViewer.classList.add("active");
  }

  function closeImageViewerModal() {
    imageViewer.classList.remove("active");
  }

  expandBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    openImageViewer();
  });

  closeImageViewer?.addEventListener("click", closeImageViewerModal);

  imageViewer?.addEventListener("click", (e) => {
    if (e.target === imageViewer) {
      closeImageViewerModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeImageViewerModal();
    }
  });
});