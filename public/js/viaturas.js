document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".car-card");
  const input = document.getElementById("viaturasSearchInput");
  const btn = document.getElementById("searchBtn");

  const clearBtn = document.getElementById("clearFilters");
  const showAllBtn = document.getElementById("showAll");
  const noResults = document.getElementById("noResults");

  if (!cards.length) return;

  const params = new URLSearchParams(window.location.search);

  let search = (params.get("search") || "").toLowerCase().trim();
  let brand = (params.get("brand") || "").toLowerCase().trim();

  function normalize(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function applyFilter(value = "") {
    const v = normalize(value);
    let hasResults = false;

    cards.forEach((card) => {
      const cardBrand = normalize(card.dataset.brand);
      const cardModel = normalize(card.dataset.model);
      const combined = `${cardBrand} ${cardModel} ${card.textContent}`;

      const matchBrand = !brand || cardBrand.includes(brand);
      const matchSearch = !v || combined.includes(v);

      const show = matchBrand && matchSearch;

      card.style.display = show ? "" : "none";

      if (show) hasResults = true;
    });

    // 🔥 MOSTRAR / OCULTAR MENSAGEM
    if (noResults) {
      noResults.style.display = hasResults ? "none" : "block";
    }

    return hasResults;
  }

  // preencher input com URL
  if (input) {
    input.value = search || brand || "";
  }

  // ❌ NÃO FILTRA AO DIGITAR
  input?.addEventListener("input", (e) => {
    search = e.target.value;
  });

  function executeSearch() {
    const value = input?.value || "";
    applyFilter(value);
  }

  // ENTER
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  });

  // BOTÃO PESQUISAR
  btn?.addEventListener("click", executeSearch);

  // FILTRO INICIAL (URL)
  applyFilter(input?.value || "");

  // LIMPAR FILTROS
  clearBtn?.addEventListener("click", () => {
    if (input) input.value = "";

    search = "";
    brand = "";

    window.history.replaceState({}, "", "/viaturas");

    cards.forEach((c) => (c.style.display = ""));

    if (noResults) noResults.style.display = "none";
  });

  // MOSTRAR TODOS
  showAllBtn?.addEventListener("click", () => {
    if (input) input.value = "";

    search = "";
    brand = "";

    applyFilter("");
  });
});