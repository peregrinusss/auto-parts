// sidebar
const accordionItems = document.querySelectorAll("[data-accordion-item]"); // Select elements with data-accordion-item attribute
accordionItems.forEach((item) => {
  const button = item.querySelector("[data-accordion-button]"); // Find button using data-accordion-button
  const content = item.querySelector("[data-accordion-content]"); // Find content using data-accordion-content

  button.addEventListener("click", function () {
    content.classList.toggle("max-h-0"); // Toggle max-height between 0 and fit content

    // Optional arrow handling
    const arrow = item.querySelector("[data-accordion-arrow]");
    if (arrow) {
      arrow.classList.toggle("rotate-180"); // Toggle rotate-180 on the arrow
    }
  });
});

// preheader

// document.addEventListener('DOMContentLoaded', function () {
//     const preheaderTabs = document.getElementById('preheader_tabs');
//     const buttons = preheaderTabs.querySelectorAll('button');
//     buttons.forEach(button => {
//         button.addEventListener('click', function () {
//             buttons.forEach(btn => btn.classList.remove('bg-white', 'text-dark-gray'));
//             button.classList.add('bg-white', 'text-dark-gray');
//         });
//     });
// });

// tabs
const tabs = document.querySelectorAll("[data-tabs]");

if (tabs.length) {
  tabs.forEach((tab) => {
    const buttons = tab.querySelectorAll("button");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) =>
          btn.classList.remove("tab-active")
        );
        button.classList.add("tab-active");
      });
    });
  });
}

// pagination
const paginations = document.querySelectorAll("[data-pagination]");

if (paginations.length) {
  paginations.forEach((pagination) => {
    let index;
    const items = pagination.querySelectorAll("[data-pagination-item]");

    items.forEach((item, i) => {
      if (item.classList.contains("pagination-active")) {
        index = i+1;
      }
    });

    items.forEach((item) => {
      item.addEventListener("click", function () {
        items.forEach((el) => {
          el.classList.remove("pagination-active");
          el.classList.add("hover:bg-gray-900/10");
        });
        item.classList.add("pagination-active");
        item.classList.remove("hover:bg-gray-900/10");
      });
    });
  });
}


// table content

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[table-item-button]');
  const modals = document.querySelectorAll('[table-item-modal]');
  const closeButtons = document.querySelectorAll('[table-close-modal]');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      modals[index].classList.remove('hidden');
      const modalContent = modals[index].querySelector('[table-modal-content]');
      requestAnimationFrame(() => {
        modalContent.classList.remove('opacity-0', 'translate-y-14');
      });
      document.body.classList.add('overflow-hidden');
    });
  });

  closeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const modal = modals[index];
      const modalContent = modal.querySelector('[table-modal-content]');
      modalContent.classList.add('opacity-0', 'translate-y-14');
      modalContent.addEventListener('transitionend', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }, { once: true });
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (!event.target.closest('[table-modal-content]')) {
        const modalContent = modal.querySelector('[table-modal-content]');
        modalContent.classList.add('opacity-0', 'translate-y-14');
        modalContent.addEventListener('transitionend', () => {
          modal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }, { once: true });
      }
    });
  });
});


// gallery in modal
document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput');
  const previewContainer = document.getElementById('preview-container');

  fileInput.addEventListener('change', function() {
    const files = Array.from(fileInput.files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const preview = document.createElement('div');
        preview.classList.add('rounded-xl', 'w-full', 'max-w-[300px]', 'border-4', 'border-solid', 'border-primary');

        const img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('rounded-[8px]', 'w-full', 'h-full', 'object-cover');

        preview.appendChild(img);
        previewContainer.appendChild(preview);
      };

      reader.readAsDataURL(file);
    });
  });
});
