const boxes = document.querySelectorAll('.box');
window.addEventListener("scroll", () => {
    const line = window.innerHeight + 100;
    boxes.forEach((box) => {
        const top = box.getBoundingClientRect().top;
        if (top < line) {
            box.classList.add("show")
        }
    });
});
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});
const fadein = document.querySelectorAll('.fadein');
window.addEventListener("scroll", () => {
    const line = window.innerHeight - 100;
    fadein.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < line) {
            el.classList.add("show");
        }
    });
});