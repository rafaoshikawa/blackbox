// public/js/viaturas.js
import { fetchCars, createCarCardHTML } from "./fetchCars.js";

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("car-list-grid");
  const noResults = document.getElementById("noResults");
  const input = document.getElementById("viaturasSearchInput");
  const clearBtn = document.getElementById("clearFilters");
  const showAllBtn = document.getElementById("showAll");

  if (!grid) return;

  // ── Loading ───────────────────────────────────────────────────────────────
  grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;opacity:.6;">A carregar viaturas…</div>`;

  // ── Fetch sempre do Supabase, sem cache ───────────────────────────────────
  let allCars = await fetchCars();

  // ── Parâmetros da URL (?search= ou ?brand=) ───────────────────────────────
  const params = new URLSearchParams(window.location.search);
  let urlSearch = (params.get("search") || "").toLowerCase().trim();
  let urlBrand = (params.get("brand") || "").toLowerCase().trim();

  if (input && (urlSearch || urlBrand)) {
    input.value = urlSearch || urlBrand;
  }

  // ── Render inicial ────────────────────────────────────────────────────────
  applyFilter(input?.value || "");

  // ── Eventos ───────────────────────────────────────────────────────────────
  input?.addEventListener("input", (e) => {
    // igual ao comportamento antigo: filtra ao digitar
    applyFilter(e.target.value);
  });

  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyFilter(input.value);
  });

  clearBtn?.addEventListener("click", () => {
    if (input) input.value = "";
    urlSearch = "";
    urlBrand = "";
    history.replaceState({}, "", "/viaturas");
    applyFilter("");
  });

  showAllBtn?.addEventListener("click", () => {
    if (input) input.value = "";
    urlSearch = "";
    urlBrand = "";
    applyFilter("");
  });

  // ── Helpers ───────────────────────────────────────────────────────────────
  function normalize(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function applyFilter(value) {
    const v = normalize(value);
    const b = normalize(urlBrand);

    const filtered = allCars.filter((car) => {
      const cardBrand = normalize(car.brand);
      const cardModel = normalize(car.model);
      const combined =
        cardBrand +
        " " +
        cardModel +
        " " +
        normalize(car.fuel) +
        " " +
        normalize(car.year) +
        " " +
        normalize(car.segmento);
      const matchBrand = !b || cardBrand.includes(b);
      const matchSearch = !v || combined.includes(v);
      return matchBrand && matchSearch;
    });

    renderCars(filtered);
  }

  function renderCars(cars) {
    if (cars.length === 0) {
      grid.innerHTML = "";
      if (noResults) noResults.style.display = "block";
      return;
    }
    if (noResults) noResults.style.display = "none";
    grid.innerHTML = cars.map(createCarCardHTML).join("");

    // Re-ligar modal após cada render
    if (typeof window.bindCarModalEvents === "function") {
      window.bindCarModalEvents();
    } else {
      document.dispatchEvent(new CustomEvent("cars:rendered"));
    }
  }
});
