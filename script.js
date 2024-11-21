// JavaScript for hamburger menu toggle
const hamburgerMenu = document.getElementById("hamburger-menu");
const mobileNav = document.getElementById("mobile-nav");

hamburgerMenu.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav-visible");
});
