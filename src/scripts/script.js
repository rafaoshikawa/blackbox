function initializeSmoothScroll() {
  const header = document.querySelector(".header");

  function getHeaderHeight() {
    return header ? header.offsetHeight : 0;
  }

  function scrollToHash(hash) {
    const target = document.querySelector(hash);
    if (!target) return;

    const top =
      target.getBoundingClientRect().top + window.scrollY - getHeaderHeight();

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }

  function closeMobileMenu() {
    const navbar = document.querySelector(".navbar");
    const menuIcon = document.querySelector("#menu-icon");
    const navBg = document.querySelector(".nav-bg");

    navbar?.classList.remove("active");
    menuIcon?.classList.remove("bx-x");
    navBg?.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  // 🔥 EVENT DELEGATION GLOBAL (FIX PRINCIPAL)
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    closeMobileMenu();

    // links normais (ex: /colecao)
    if (!href.includes("#")) return;

    const [path, hash] = href.split("#");

    if (!hash) return;

    const targetHash = `#${hash}`;

    // se for outra página, deixa navegar normal
    if (path && path !== "/" && path !== window.location.pathname) {
      return;
    }

    e.preventDefault();

    scrollToHash(targetHash);
  });

  function handleInitialHash() {
    const hash = window.location.hash;
    if (!hash) return;

    setTimeout(() => {
      scrollToHash(hash);
    }, 80);
  }

  window.addEventListener("DOMContentLoaded", handleInitialHash);
  window.addEventListener("pageshow", handleInitialHash);
}
