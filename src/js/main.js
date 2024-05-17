// sidebar
const accordionItems = document.querySelectorAll('[data-accordion-item]'); // Select elements with data-accordion-item attribute
accordionItems.forEach(item => {
  const button = item.querySelector('[data-accordion-button]'); // Find button using data-accordion-button
  const content = item.querySelector('[data-accordion-content]'); // Find content using data-accordion-content

  button.addEventListener('click', function() {
    content.classList.toggle('max-h-0'); // Toggle max-height between 0 and fit content

    // Optional arrow handling
    const arrow = item.querySelector('[data-accordion-arrow]');
    if (arrow) {
      arrow.classList.toggle('rotate-180'); // Toggle rotate-180 on the arrow
    }
  });
});





//init
window.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded Scripts");
});