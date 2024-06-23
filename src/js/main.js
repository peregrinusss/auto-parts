const TomSelect = require("tom-select");
const HandyCollapse = require("handy-collapse");
const GraphModal = require("../js/libs/graph-modal");

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
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll("select[data-tom-select]")
    .forEach(function (select) {
      new TomSelect(select, {
        create: false,
        sortField: {
          field: "text",
          direction: "asc",
        },
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

// tooltip more list
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-more]").forEach(function (tooltip) {
    const tooltipTitle = tooltip.querySelector("[data-more-title]");
    const tooltipContent = tooltip.querySelector("[data-more-content]");

    // Function to show tooltip
    function showTooltip() {
      tooltipContent.classList.add("tooltip-more-active");
    }

    // Function to hide tooltip
    function hideTooltip() {
      tooltipContent.classList.remove("tooltip-more-active");
    }

    // Listen for mouse enter on the tooltip title
    tooltip.addEventListener("mouseenter", function (event) {
      // Hide all other tooltips before showing this one
      document.querySelectorAll("[data-more-content]").forEach(el => {
        el.classList.remove("tooltip-more-active");
      });
      showTooltip();
    });

    // Listen for mouse leave on the tooltip title
    tooltip.addEventListener("mouseleave", hideTooltip);
  });
});


// colorPick
const colorPick = document.getElementById('colorPick');

if (colorPick) {
  colorPick.addEventListener('input', function(event) {
    const colorBox = document.getElementById('colorBox');
    const selectedColor = event.target.value;
    colorBox.style.backgroundColor = selectedColor;
  });
}


// Show/hide password
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-password]").forEach(function (tooltip) {
    const trigger = tooltip.querySelector("[data-password-trigger]");
    const crossLine = tooltip.querySelector("[data-password-line]");
    const inputPassword = tooltip.querySelector("input");
    let isPasswordVisible = false;

    // Function to show/hide password
    function showPassword() {
      if (!isPasswordVisible) {
        inputPassword.type = "text";
        crossLine.classList.add("crossline-hidden");
        isPasswordVisible = true;
      } else {
        inputPassword.type = "password";
        crossLine.classList.remove("crossline-hidden");
        isPasswordVisible = false;
      }
    }

    // Listen for click on the toggle pasword
    trigger.addEventListener("click", function (event) {
      showPassword();
    });
  });
});

//popover

document.querySelectorAll('[data-popover-wrapper]').forEach(wrapper => {
  const trigger = wrapper.querySelector('[data-popover-trigger]');
  const content = wrapper.querySelector('[data-popover-content]');

  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    if (content.classList.contains('opacity-0')) {
      content.classList.remove('opacity-0', 'invisible');
      content.classList.add('opacity-80');
    } else {
      content.classList.remove('opacity-80');
      content.classList.add('opacity-0');
    }
  });

  document.addEventListener('click', (event) => {
    if (!wrapper.contains(event.target)) {
      if (content.classList.contains('opacity-80')) {
        content.classList.remove('opacity-80');
        content.classList.add('opacity-0');
        content.addEventListener('transitionend', function handleTransitionEnd() {
          content.classList.add('invisible');
          content.removeEventListener('transitionend', handleTransitionEnd);
        });
      }
    }
  });
});


//table columns & checkboxes

document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"][data-column]');
  checkboxes.forEach(checkbox => {
    const columnIndex = checkbox.getAttribute('data-column');
    document.querySelectorAll(`#parts-table tr`).forEach(row => {
      const cells = Array.from(row.children);
      const cell = cells[columnIndex - 1]; // Столбцы начинаются с 1, а индексы массива с 0
      if (cell) {
        if (!checkbox.checked) {
          cell.classList.add('hidden');
        }
      }
    });

    checkbox.addEventListener('change', function() {
      document.querySelectorAll(`#parts-table tr`).forEach(row => {
        const cells = Array.from(row.children);
        const cell = cells[columnIndex - 1]; // Столбцы начинаются с 1, а индексы массива с 0
        if (cell) {
          if (this.checked) {
            cell.classList.remove('hidden');
          } else {
            cell.classList.add('hidden');
          }
        }
      });
    });
  });
});


// column sorting

document.addEventListener('DOMContentLoaded', () => {
  const sortingTriggers = document.querySelectorAll('[data-sorting-trigger]');

  sortingTriggers.forEach(trigger => {
    const ascending = trigger.querySelector('[data-sorting-ascending]');
    const descending = trigger.querySelector('[data-sorting-descending]');
    const title = trigger.querySelector('[data-sorting-title]');
    const sortingWrapper = trigger.querySelector('[data-sorting-wrapper]');

    // По умолчанию скрыть sortingWrapper
    if (sortingWrapper) {
      sortingWrapper.classList.add('hidden');
    }

    if (title) {
      title.classList.add('text-primary');
      title.addEventListener('click', () => {
        title.classList.toggle('underline');
        if (sortingWrapper) {
          sortingWrapper.classList.toggle('hidden');
          sortingWrapper.classList.toggle('flex');
        }
        // Сброс состояния других триггеров
        resetOtherTriggers(trigger);
      });
    }

    if (ascending) {
      ascending.addEventListener('click', () => {
        const isActive = ascending.classList.toggle('text-primary');
        if (isActive) {
          title.classList.add('text-primary');
        }
        if (descending) {
          descending.classList.remove('text-primary');
        }
        // Сброс состояния других триггеров
        resetOtherTriggers(trigger);
      });
    }

    if (descending) {
      descending.addEventListener('click', () => {
        const isActive = descending.classList.toggle('text-primary');
        if (isActive) {
          title.classList.add('text-primary');
        }
        if (ascending) {
          ascending.classList.remove('text-primary');
        }
        // Сброс состояния других триггеров
        resetOtherTriggers(trigger);
      });
    }
  });

  function resetOtherTriggers(activeTrigger) {
    sortingTriggers.forEach(trigger => {
      if (trigger !== activeTrigger) {
        const ascending = trigger.querySelector('[data-sorting-ascending]');
        const descending = trigger.querySelector('[data-sorting-descending]');
        const title = trigger.querySelector('[data-sorting-title]');

        if (ascending) {
          ascending.classList.remove('text-primary');
        }
        if (descending) {
          descending.classList.remove('text-primary');
        }
        if (title) {
          title.classList.remove('underline');
        }
        // Скрыть sortingWrapper для неактивных триггеров
        const sortingWrapper = trigger.querySelector('[data-sorting-wrapper]');
        if (sortingWrapper) {
          sortingWrapper.classList.add('hidden');
          sortingWrapper.classList.remove('flex');
        }
      }
    });
  }
});

