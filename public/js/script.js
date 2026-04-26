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

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMobileMenu();
  });
}

document.addEventListener("DOMContentLoaded", initializeMenu);

// =====================
// 🔥 PRELOADER FIX
// =====================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  preloader.classList.add("hidden");

  // remove depois da animação (opcional mas recomendado)
  setTimeout(() => {
    preloader.remove();
  }, 500);
});
