// Responsive menu toggle
const nav = document.querySelector('header nav ul');
document.querySelector('header').addEventListener('click', () => {
    nav.classList.toggle('active');
});
