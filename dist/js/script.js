function initializeMenu() {
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");
  const navBg = document.querySelector(".nav-bg");
  const navLinks = document.querySelectorAll(".navbar a");

  if (!menuIcon || !navbar) return;

  function closeMobileMenu() {
    navbar.classList.remove("active");
    menuIcon.classList.remove("bx-x");
    navBg?.classList.remove("active");
    document.body.classList.remove("lock-scroll");
  }

  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();

    const opened = navbar.classList.toggle("active");
    menuIcon.classList.toggle("bx-x", opened);
    navBg?.classList.toggle("active", opened);
    document.body.classList.toggle("lock-scroll", opened);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) closeMobileMenu();
    });
  });

  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && !e.target.closest(".header")) {
      closeMobileMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", initializeMenu);

// =====================
// 🔥 PRELOADER
// =====================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  preloader.classList.add("hidden");
  setTimeout(() => preloader.remove(), 500);
});

// =====================
// 🔍 HOME SEARCH (SEM MUDAR HTML)
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput"); // 👈 mantém teu HTML
  const btn = document.getElementById("searchBtn");     // 👈 mantém teu HTML

  if (!input && !btn) return;

  function goSearch() {
    const value = input?.value.trim();
    if (!value) return;

    window.location.href = `/viaturas?search=${encodeURIComponent(value)}`;
  }

  btn?.addEventListener("click", goSearch);

  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goSearch();
    }
  });
});

// =====================
// 🏷️ BRANDS → VIATURAS
// =====================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".brand-item")?.forEach((el) => {
    el.addEventListener("click", () => {
      const brand = el.dataset.brand;
      if (!brand) return;

      window.location.href = `/viaturas?brand=${encodeURIComponent(brand)}`;
    });
  });
});