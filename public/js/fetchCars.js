// public/js/fetchCars.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://ziylcoupschcusnlsblu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppeWxjb3Vwc2NoY3VzbmxzYmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMDAwMjksImV4cCI6MjA5NTc3NjAyOX0.6HdFwkPcwxUTlbKvhr3EoSI1qz3U9e3fCeITLr8eVmY",
);

export async function fetchCars() {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("id", { ascending: false });
  if (error) {
    console.error("[fetchCars] Erro:", error);
    return [];
  }
  return data ?? [];
}

function esc(val) {
  if (val == null) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const SVG_CALENDAR = `<svg width="18px" height="18px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" style="height:20px;"><title>calendar</title><g stroke="" stroke-width="1" fill="none" fill-rule="evenodd" stroke-dasharray="0,0" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(-794,-1694)" stroke-width="1.57248"><g transform="translate(682.180272,1322.474020)"><g transform="translate(113,370.006498)"><g transform="translate(0,0)"><g transform="translate(0,2.395062)"><line x1="4.79137095" y1="0" x2="4.79137095" y2="2.94530876"/><line x1="10.7950165" y1="0" x2="10.7950165" y2="2.94530876"/><line x1="0.383339652" y1="5.75564887" x2="15.074953" y2="5.2745739" transform="translate(7.729146,5.515111) rotate(1.875473) translate(-7.729146,-5.515111)"/><path d="M15.5863874,11.6299895 C15.5863874,14.0180777 14.2875218,15.6101365 11.2568354,15.6101365 L4.32955207,15.6101365 C1.29886562,15.6101365 0,14.0180777 0,11.6299895 L0,4.86373961 C0,2.47565142 1.29886562,0.883592629 4.32955207,0.883592629 L11.2568354,0.883592629 C14.2875218,0.883592629 15.5863874,2.47565142 15.5863874,4.86373961 L15.5863874,11.6299895 Z" fill-rule="nonzero"/><line x1="10.5659043" y1="8.924252" x2="10.5726449" y2="8.924252"/><line x1="10.5659043" y1="11.9677377" x2="10.5726449" y2="11.9677377"/><line x1="7.78980458" y1="8.924252" x2="7.79654513" y2="8.924252"/><line x1="7.78980458" y1="11.9677377" x2="7.79654513" y2="11.9677377"/><line x1="5.01223908" y1="8.924252" x2="5.01897963" y2="8.924252"/><line x1="5.01223908" y1="11.9677377" x2="5.01897963" y2="11.9677377"/></g></g></g></g></g></g></svg>`;

const SVG_FUEL = `<svg width="14px" height="15px" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg" style="height:20px;"><title>combust</title><g stroke="" stroke-width="1" fill="none" fill-rule="evenodd" stroke-dasharray="0,0" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(-161,-4120)" fill-rule="nonzero" stroke="" stroke-width="1.2475008"><g transform="translate(15.846154,3875)"><g transform="translate(59.010989,243.640000)"><g transform="translate(87.432916,0.010397)"><g transform="translate(0,2.071173)"><path d="M0,2.02953057 C0,0.676510189 0.828440672,0 1.85471788,0 L6.80063221,0 C7.82690942,0 8.65535009,0.676510189 8.65535009,2.02953057 L8.65535009,13.5302038 L0,13.5302038 L0,2.02953057 Z"/><path d="M5.63834168,5.41207119 C6.28131052,5.41207119 6.80681357,5.0738165 6.80681357,4.13346734 L6.80681357,3.3013627 C6.80681357,2.36101355 6.28131052,2.02275886 5.63834168,2.02275886 L3.02318976,2.02275886 C2.38022092,2.02275886 1.85471788,2.36101355 1.85471788,3.3013627 L1.85471788,4.13346734 C1.85471788,5.0738165 2.38022092,5.41207119 3.02318976,5.41207119 L5.63834168,5.41207119 Z M1.85471788,7.44161208 L3.70943575,7.44161208"/><path d="M8.65535009,9.47790403 L11.4374269,9.47114264 L11.4374269,5.41208151 L10.2009483,4.73557132"/></g></g></g></g></g></g></svg>`;

const SVG_KM = `<svg width="20px" height="18px" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg" style="height:20px;"><title>km</title><g stroke="none" stroke-width="1" fill="" fill-rule="evenodd"><g transform="translate(-1017,-1694)"><g transform="translate(682.180272,1322.474020)"><g transform="translate(113,370.006498)"><g transform="translate(222.360040,0)"><path d="M9.59162304,11.6742776 C9.8725471,11.6742776 10.1268761,11.7813812 10.3109741,11.9545442 C10.4950721,12.1277073 10.608939,12.3669298 10.608939,12.6311677 L10.608939,18.0483081 C10.608939,18.312546 10.4950721,18.5517685 10.3109741,18.7249316 C10.1268761,18.8980946 9.8725471,19.0051982 9.59162304,19.0051982 C9.31069898,19.0051982 9.05636997,18.8980946 8.87227199,18.7249316 C8.688174,18.5517685 8.57430702,18.312546 8.57430702,18.0483081 L8.57430702,12.6311677 C8.57430702,12.3669298 8.688174,12.1277073 8.87227199,11.9545442 C9.05636997,11.7813812 9.31069898,11.6742776 9.59162304,11.6742776 Z M3.18419375,2.48049411 C3.39746315,2.34003124 3.66770112,2.27609537 3.94435731,2.3219798 C4.22101351,2.36786423 4.45170589,2.51488121 4.60103873,2.71548298 C4.75037158,2.91608474 4.81834489,3.17027128 4.76956294,3.43049482 L2.0193468,18.1013098 C1.97056485,18.3615333 1.81426401,18.5785232 1.6009946,18.7189861 C1.38772519,18.8594489 1.11748723,18.9233848 0.840831036,18.8775004 C0.564174844,18.831616 0.333482462,18.684599 0.184149616,18.4839972 C0.0348167705,18.2833954 -0.0331565396,18.0292089 0.0156254114,17.7689854 L2.76584155,3.09817037 C2.8146235,2.83794683 2.97092434,2.62095697 3.18419375,2.48049411 Z M15.2388888,2.3219798 C15.5123272,2.27662903 15.7794936,2.33856261 15.9915867,2.4756235 C16.2048084,2.61341373 16.3623278,2.8271529 16.4146598,3.08413282 L19.1676207,17.7689854 C19.2164026,18.0292089 19.1484293,18.2833954 18.9990965,18.4839972 C18.8497636,18.684599 18.6190712,18.831616 18.342415,18.8775004 C18.0689765,18.9228511 17.8018102,18.8609176 17.5897171,18.7238567 C17.3764954,18.5860664 17.218976,18.3723273 17.166644,18.1153474 L14.4136831,3.43049482 C14.3649012,3.17027128 14.4328745,2.91608474 14.5822073,2.71548298 C14.7315402,2.51488121 14.9622326,2.36786423 15.2388888,2.3219798 Z M9.59162304,6.25713726 C9.8725471,6.25713726 10.1268761,6.36424084 10.3109741,6.53740389 C10.4950721,6.71056694 10.608939,6.94978947 10.608939,7.21402737 L10.608939,9.92259755 C10.608939,10.1868355 10.4950721,10.426058 10.3109741,10.599221 C10.1268761,10.7723841 9.8725471,10.8794877 9.59162304,10.8794877 C9.31069898,10.8794877 9.05636997,10.7723841 8.87227199,10.599221 C8.688174,10.426058 8.57430702,10.1868355 8.57430702,9.92259755 L8.57430702,7.21402737 C8.57430702,6.94978947 8.688174,6.71056694 8.87227199,6.53740389 C9.05636997,6.36424084 9.31069898,6.25713726 9.59162304,6.25713726 Z M9.59162304,2.194282 C9.8725471,2.194282 10.1268761,2.30138558 10.3109741,2.47454863 C10.4950721,2.64771168 10.608939,2.8869342 10.608939,3.15117211 L10.608939,4.5054572 C10.608939,4.76969511 10.4950721,5.00891763 10.3109741,5.18208068 C10.1268761,5.35524373 9.8725471,5.46234731 9.59162304,5.46234731 C9.31069898,5.46234731 9.05636997,5.35524373 8.87227199,5.18208068 C8.688174,5.00891763 8.57430702,4.76969511 8.57430702,4.5054572 L8.57430702,3.15117211 C8.57430702,2.8869342 8.688174,2.64771168 8.87227199,2.47454863 C9.05636997,2.30138558 9.31069898,2.194282 9.59162304,2.194282 Z" id="km"/></g></g></g></g></g></svg>`;

export function createCarCardHTML(car) {
  const status = car.status ?? "";
  const imagesJSON = esc(JSON.stringify(car.images ?? []));
  const showBadge = status && status !== "disponivel";
  const badgeLabel = status === "vendido" ? "VENDIDO" : "RESERVADO";

  return `
<div class="car-card"
     data-status="${esc(status)}"
     data-images="${imagesJSON}"
     data-brand="${esc(car.brand)}"
     data-model="${esc(car.model)}"
     data-price="${esc(car.price)}"
     data-year="${esc(car.year)}"
     data-fuel="${esc(car.fuel)}"
     data-km="${esc(car.km)}"
     data-caixa="${esc(car.caixa)}"
     data-segmento="${esc(car.segmento)}"
     data-cilindrada="${esc(car.cilindrada)}"
     data-potencia="${esc(car.potencia)}">

  ${showBadge ? `<div class="car-status ${esc(status)}">${badgeLabel}</div>` : ""}

  <div class="car-image">
    <img src="${esc(car.image)}" alt="${esc(car.model)}" loading="lazy" />
  </div>

  <div class="car-info">
    <div class="car-meta">
      <div class="meta-item">
        ${SVG_CALENDAR}
        <span>${esc(car.year)}</span>
      </div>
      <div class="meta-item">
        ${SVG_FUEL}
        <span>${esc(car.fuel)}</span>
      </div>
      <div class="meta-item">
        ${SVG_KM}
        <span>${esc(car.km)}</span>
      </div>
    </div>

    <h2 class="brand">${esc(car.brand)}</h2>
    <p class="model">${esc(car.model)}</p>

    <div class="price">
      <span>Preço</span>
      <strong>${esc(car.price)}</strong>
    </div>
  </div>
</div>`;
}
