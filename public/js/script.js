// =====================
// MENU MOBILE (BURGER)
// =====================
function initializeMenu() {
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");
  const navBg = document.querySelector(".nav-bg");
  const navLinks = document.querySelectorAll(".navbar a");

  if (!menuIcon || !navbar) return;

  // === Abrir / fechar menu ===
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();

    const opened = navbar.classList.toggle("active");
    menuIcon.classList.toggle("bx-x", opened);
    navBg?.classList.toggle("active", opened);

    document.body.classList.toggle("no-scroll", opened);
  });

  // === Fechar ao clicar em link ===
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // === Fechar ao clicar fora ===
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && !e.target.closest(".header")) {
      closeMobileMenu();
    }
  });

  // === Fechar ao voltar para desktop ===
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  // === Função de fechar ===
  function closeMobileMenu() {
    navbar.classList.remove("active");
    menuIcon.classList.remove("bx-x");
    navBg?.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
}

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {
  initializeMenu();
});
