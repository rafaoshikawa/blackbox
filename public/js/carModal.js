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

  const imageViewer = document.getElementById("imageViewer");
  const imageTrack = document.getElementById("imageTrack");
  const expandBtn = document.querySelector(".expand-image");
  const closeImageViewer = document.querySelector(".close-image-viewer");

  const singleViewer = document.getElementById("singleImageViewer");
  const singleImg = document.getElementById("singleExpandedImg");
  const closeSingleBtn = document.querySelector(".close-single-image");

  let currentImages = [];
  let currentIndex = 0;
  let scrollY = 0;

  document.documentElement.style.scrollBehavior = "auto";

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

    const safeStatus = status?.trim() || "disponivel";

    modal.classList.remove("vendido", "reservado", "disponivel");
    modal.classList.add(safeStatus);

    if (modalStatus) {
      modalStatus.textContent =
        safeStatus === "vendido"
          ? "VENDIDO"
          : safeStatus === "reservado"
            ? "RESERVADO"
            : "";

      modalStatus.className = `car-status ${safeStatus}`;
    }

    document.title = `${brand} ${model} | Blackbox Auto`;

    scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    modal.classList.add("active");
  }

  function closeModal() {
    modal.classList.remove("active");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollY);

    document.title = "Blackbox Auto";
  }

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".car-card");

    if (!card || modal.contains(e.target)) return;

    openModal(card);
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

  closeBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      imageViewer?.classList.remove("active");
      singleViewer?.classList.remove("active");
    }
  });

  function openImageViewer() {
    if (!currentImages.length || !imageTrack) return;

    imageTrack.innerHTML = "";

    currentImages.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;

      img.addEventListener("click", () => {
        openSingleImage(src);
      });

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
    if (e.target === imageViewer) closeImageViewerModal();
  });

  function openSingleImage(src) {
    if (!singleViewer || !singleImg) return;

    singleImg.src = src;
    singleViewer.classList.add("active");
  }

  closeSingleBtn?.addEventListener("click", () => {
    singleViewer.classList.remove("active");
  });

  singleViewer?.addEventListener("click", (e) => {
    if (e.target === singleViewer) {
      singleViewer.classList.remove("active");
    }
  });
});
