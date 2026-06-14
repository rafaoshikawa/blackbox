// public/js/homeCards.js
import { fetchCars, createCarCardHTML } from "./fetchCars.js";

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("colecao-cards-grid");
  if (!grid) return;

  grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;opacity:.6;">A carregar viaturas…</div>`;

  const allCars = await fetchCars();
  const latest = allCars.slice(0, 6);

  if (latest.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;opacity:.6;">Sem viaturas disponíveis de momento.</p>`;
    return;
  }

  grid.innerHTML = latest.map(createCarCardHTML).join("");

  if (typeof window.bindCarModalEvents === "function") {
    window.bindCarModalEvents();
  } else {
    document.dispatchEvent(new CustomEvent("cars:rendered"));
  }
});
