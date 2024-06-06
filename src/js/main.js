const TomSelect = require('tom-select');
const HandyCollapse = require('handy-collapse');
const GraphModal = require('../js/libs/graph-modal');

const modal = new GraphModal({
  isOpen: (modal) => {
    console.log(modal);
    console.log("opened");
  },
});

const accordeon = new HandyCollapse({
  nameSpace: "nested",
  closeOthers: false,
  isAnimation: true,
  animationSpeed: 400,
});

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
        buttons.forEach((btn) => btn.classList.remove("tab-active"));
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
        index = i + 1;
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

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[table-item-button]");
  const modals = document.querySelectorAll("[table-item-modal]");
  const closeButtons = document.querySelectorAll("[table-close-modal]");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      modals[index].classList.remove("hidden");
      const modalContent = modals[index].querySelector("[table-modal-content]");
      requestAnimationFrame(() => {
        modalContent.classList.remove("opacity-0", "translate-y-14");
      });
      document.body.classList.add("overflow-hidden");
    });
  });

  closeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const modal = modals[index];
      const modalContent = modal.querySelector("[table-modal-content]");
      modalContent.classList.add("opacity-0", "translate-y-14");
      modalContent.addEventListener(
        "transitionend",
        () => {
          modal.classList.add("hidden");
          document.body.classList.remove("overflow-hidden");
        },
        { once: true }
      );
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (!event.target.closest("[table-modal-content]")) {
        const modalContent = modal.querySelector("[table-modal-content]");
        modalContent.classList.add("opacity-0", "translate-y-14");
        modalContent.addEventListener(
          "transitionend",
          () => {
            modal.classList.add("hidden");
            document.body.classList.remove("overflow-hidden");
          },
          { once: true }
        );
      }
    });
  });
});

//  graph-modal

// gallery in modal
document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const previewContainer = document.getElementById("preview-container");

  fileInput.addEventListener("change", function () {
    const files = Array.from(fileInput.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.createElement("div");
        preview.classList.add(
          "rounded-xl",
          "w-full",
          "max-w-[300px]",
          "border-4",
          "border-solid",
          "border-primary"
        );

        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("rounded-[8px]", "w-full", "h-full", "object-cover");

        preview.appendChild(img);
        previewContainer.appendChild(preview);
      };

      reader.readAsDataURL(file);
    });
  });
});

// mini-modals
document.addEventListener("DOMContentLoaded", () => {
  const topToggles = document.querySelectorAll("[minimodal-top-toggle]");
  const topModals = document.querySelectorAll("[minimodal-top-content]");

  // Делегирование событий для переключателей
  topToggles.forEach((toggle, index) => {
    toggle.addEventListener("click", () => {
      const modal = topModals[index];
      if (modal) {
        if (modal.classList.contains("hidden")) {
          modal.classList.remove("hidden");
          setTimeout(() => {
            requestAnimationFrame(() => {
              modal.classList.remove("translate-y-14", "opacity-0");
            });
          }, 10);
          document.body.classList.add("overflow-hidden");
        } else {
          modal.classList.add("opacity-0", "translate-y-14");
          modal.addEventListener(
            "transitionend",
            () => {
              modal.classList.add("hidden");
              document.body.classList.remove("overflow-hidden");
            },
            { once: true }
          );
        }
      }
    });
  });

  // Закрытие модальных окон при клике вне их содержимого
  document.addEventListener("click", (event) => {
    topModals.forEach((modal, index) => {
      const toggle = topToggles[index];
      if (!modal.contains(event.target) && !toggle.contains(event.target)) {
        if (!modal.classList.contains("hidden")) {
          modal.classList.add("opacity-0", "translate-y-14");
          modal.addEventListener(
            "transitionend",
            () => {
              modal.classList.add("hidden");
              document.body.classList.remove("overflow-hidden");
            },
            { once: true }
          );
        }
      }
    });
  });

  // Предотвращение закрытия модального окна при клике внутри него
  topModals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const bottomToggles = document.querySelectorAll("[minimodal-bottom-toggle]");
  const bottomModals = document.querySelectorAll("[minimodal-bottom-content]");

  // Делегирование событий для переключателей
  bottomToggles.forEach((toggle, index) => {
    toggle.addEventListener("click", () => {
      const modal = bottomModals[index];
      if (modal) {
        if (modal.classList.contains("hidden")) {
          modal.classList.remove("hidden");
          setTimeout(() => {
            requestAnimationFrame(() => {
              modal.classList.remove("translate-y-full", "opacity-0");
            });
          }, 10);
          document.body.classList.add("overflow-hidden");
        } else {
          modal.classList.add("opacity-0", "translate-y-full");
          modal.addEventListener(
            "transitionend",
            () => {
              modal.classList.add("hidden");
              document.body.classList.remove("overflow-hidden");
            },
            { once: true }
          );
        }
      }
    });
  });

  // Закрытие модальных окон при клике вне их содержимого
  document.addEventListener("click", (event) => {
    bottomModals.forEach((modal, index) => {
      const toggle = bottomToggles[index];
      if (!modal.contains(event.target) && !toggle.contains(event.target)) {
        if (!modal.classList.contains("hidden")) {
          modal.classList.add("opacity-0", "translate-y-full");
          modal.addEventListener(
            "transitionend",
            () => {
              modal.classList.add("hidden");
              document.body.classList.remove("overflow-hidden");
            },
            { once: true }
          );
        }
      }
    });
  });

  // Предотвращение закрытия модального окна при клике внутри него
  bottomModals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
});




//orders
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('select[data-tom-select]').forEach(function(select) {
    new TomSelect(select,{
      create: false,
      sortField: {
        field: "text",
        direction: "asc"
      }
    });
  });
});

// select
document.addEventListener("DOMContentLoaded", function () {
  function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-options").forEach((dropdown) => {
      if (!dropdown.classList.contains("hidden")) {
        closeDropdown(dropdown);
      }
    });
  }

  function openDropdown(dropdown) {
    dropdown.classList.remove("opacity-0", "scale-95", "pointer-events-none");
    dropdown.classList.add("opacity-100", "scale-100");
  }

  function closeDropdown(dropdown) {
    dropdown.classList.remove("opacity-100", "scale-100");
    dropdown.classList.add("opacity-0", "scale-95", "pointer-events-none");
  }

  document.querySelectorAll(".custom-select").forEach((customSelect) => {
    const selectButton = customSelect.querySelector(".select-button");
    const dropdownOptions = customSelect.querySelector(".dropdown-options");
    const selectedOption = customSelect.querySelector(".selected-option");

    // Set the first option as the default selected option
    const firstOption = dropdownOptions.querySelector("li");
    if (firstOption) {
      selectedOption.textContent = firstOption.textContent;
      firstOption.classList.add("text-primary", "font-bold");
    }

    selectButton.addEventListener("click", function (event) {
      closeAllDropdowns();
      if (dropdownOptions.classList.contains("opacity-0")) {
        openDropdown(dropdownOptions);
      } else {
        closeDropdown(dropdownOptions);
      }
    });

    const options = dropdownOptions.querySelectorAll("li");
    options.forEach((option) => {
      option.addEventListener("click", function () {
        options.forEach((opt) =>
          opt.classList.remove("text-primary", "font-bold")
        );
        this.classList.add("text-primary", "font-bold");
        selectedOption.textContent = this.textContent;
        closeDropdown(dropdownOptions);
      });
    });

    document.addEventListener("click", function (event) {
      if (!customSelect.contains(event.target)) {
        closeDropdown(dropdownOptions);
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".custom-select")) {
      closeAllDropdowns();
    }
  });
});
