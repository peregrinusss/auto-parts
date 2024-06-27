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
  // bottomModals.forEach((modal) => {
  //   modal.addEventListener("click", (event) => {
  //     event.stopPropagation();
  //   });
  // });
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

function initializeSelects() {
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

    // Set the default selected option to "-"
    selectedOption.textContent = "-";

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
}

// select
document.addEventListener("DOMContentLoaded", function () {
  initializeSelects();
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
      document.querySelectorAll("[data-more-content]").forEach((el) => {
        el.classList.remove("tooltip-more-active");
      });
      showTooltip();
    });

    // Listen for mouse leave on the tooltip title
    tooltip.addEventListener("mouseleave", hideTooltip);
  });
});

// colorPick
const colorPick = document.getElementById("colorPick");

if (colorPick) {
  colorPick.addEventListener("input", function (event) {
    const colorBox = document.getElementById("colorBox");
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

document.querySelectorAll("[data-popover-wrapper]").forEach((wrapper) => {
  const trigger = wrapper.querySelector("[data-popover-trigger]");
  const content = wrapper.querySelector("[data-popover-content]");

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    if (content.classList.contains("opacity-0")) {
      content.classList.remove("opacity-0", "invisible");
      content.classList.add("opacity-80");
    } else {
      content.classList.remove("opacity-80");
      content.classList.add("opacity-0");
    }
  });

  document.addEventListener("click", (event) => {
    if (!wrapper.contains(event.target)) {
      if (content.classList.contains("opacity-80")) {
        content.classList.remove("opacity-80");
        content.classList.add("opacity-0");
        content.addEventListener(
          "transitionend",
          function handleTransitionEnd() {
            content.classList.add("invisible");
            content.removeEventListener("transitionend", handleTransitionEnd);
          }
        );
      }
    }
  });
});

//table columns & checkboxes

document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][data-column]'
  );
  checkboxes.forEach((checkbox) => {
    const columnIndex = checkbox.getAttribute("data-column");
    document.querySelectorAll(`#parts-table tr`).forEach((row) => {
      const cells = Array.from(row.children);
      const cell = cells[columnIndex - 1]; // Столбцы начинаются с 1, а индексы массива с 0
      if (cell) {
        if (!checkbox.checked) {
          cell.classList.add("hidden");
        }
      }
    });

    checkbox.addEventListener("change", function () {
      document.querySelectorAll(`#parts-table tr`).forEach((row) => {
        const cells = Array.from(row.children);
        const cell = cells[columnIndex - 1]; // Столбцы начинаются с 1, а индексы массива с 0
        if (cell) {
          if (this.checked) {
            cell.classList.remove("hidden");
          } else {
            cell.classList.add("hidden");
          }
        }
      });
    });
  });
});

// column sorting
document.addEventListener("DOMContentLoaded", () => {
  const sortingTriggers = document.querySelectorAll("[data-sorting-trigger]");

  sortingTriggers.forEach((trigger) => {
    const ascending = trigger.querySelector("[data-sorting-ascending]");
    const descending = trigger.querySelector("[data-sorting-descending]");
    const title = trigger.querySelector("[data-sorting-title]");
    const sortingWrapper = trigger.querySelector("[data-sorting-wrapper]");

    // По умолчанию скрыть sortingWrapper
    if (sortingWrapper) {
      sortingWrapper.classList.add("hidden");
    }

    if (title) {
      title.classList.add("text-primary");
      title.addEventListener("click", () => {
        title.classList.toggle("underline");
        if (sortingWrapper) {
          sortingWrapper.classList.toggle("hidden");
          sortingWrapper.classList.toggle("flex");
        }
        // Сброс состояния других триггеров
        resetOtherTriggers(trigger);
      });
    }

    if (ascending) {
      ascending.addEventListener("click", () => {
        const isActive = ascending.classList.toggle("text-primary");
        if (isActive) {
          title.classList.add("text-primary");
        }
        if (descending) {
          descending.classList.remove("text-primary");
        }
        // Сброс состояния других триггеров
        resetOtherTriggers(trigger);
      });
    }

    if (descending) {
      descending.addEventListener("click", () => {
        const isActive = descending.classList.toggle("text-primary");
        if (isActive) {
          title.classList.add("text-primary");
        }
        if (ascending) {
          ascending.classList.remove("text-primary");
        }
        // Сброс состояния других триггеров
        resetOtherTriggers(trigger);
      });
    }
  });

  function resetOtherTriggers(activeTrigger) {
    sortingTriggers.forEach((trigger) => {
      if (trigger !== activeTrigger) {
        const ascending = trigger.querySelector("[data-sorting-ascending]");
        const descending = trigger.querySelector("[data-sorting-descending]");
        const title = trigger.querySelector("[data-sorting-title]");

        if (ascending) {
          ascending.classList.remove("text-primary");
        }
        if (descending) {
          descending.classList.remove("text-primary");
        }
        if (title) {
          title.classList.remove("underline");
        }
        // Скрыть sortingWrapper для неактивных триггеров
        const sortingWrapper = trigger.querySelector("[data-sorting-wrapper]");
        if (sortingWrapper) {
          sortingWrapper.classList.add("hidden");
          sortingWrapper.classList.remove("flex");
        }
      }
    });
  }
});

// // filters
// document.addEventListener('DOMContentLoaded', () => {
//   const filters = document.querySelector('[data-filters]');
//   const filterPoints = filters.querySelectorAll('[data-filter]');

//   filterPoints.forEach(point => {
//     point.addEventListener('click', () => {
//       point.classList.add('filter-choosed');

//       // add conditions for all types of filters (in the discussion)
//     });
//   })

// })

// filters
document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelector("[data-filters]");
  const filterPoints = filters.querySelectorAll("[data-filter]");

  filterPoints.forEach((point) => {
    point.addEventListener("click", () => {
      point.classList.add("filter-choosed");

      const parentElement = document.querySelector("[data-filter-container]");

      !parentElement && createFilterElements("[data-filters-area]");
      createAndAppendContainer(point.textContent, point);
      initializeSelects();

      // add conditions for all types of filters (in the discussion)
    });
  });
});

function createFilterElements(parentSelector) {
  const parentElement = document.querySelector(parentSelector);

  // Create main filter container
  const filterContainer = document.createElement("div");
  filterContainer.dataset.filterContainer = true;
  filterContainer.classList.add("mb-5", "flex", "flex-col", "gap-5", "mt-5");

  // Create filter buttons container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("flex", "items-center", "gap-5");

  // Create "Apply Filters" button
  const applyButton = document.createElement("button");
  applyButton.type = "button";
  applyButton.classList.add(
    "flex",
    "w-full",
    "items-center",
    "gap-2",
    "rounded-lg",
    "bg-success",
    "p-3",
    "py-2",
    "pr-4",
    "text-start",
    "font-medium",
    "leading-tight",
    "text-white",
    "transition-all",
    "hover:text-light-gray",
    "cursor-pointer",
    "active:opacity-60",
    "!w-fit",
    "whitespace-nowrap"
  );

  const applyButtonText = document.createElement("h4");
  applyButtonText.textContent = "Применить фильтры";
  applyButton.appendChild(applyButtonText);
  buttonsContainer.appendChild(applyButton);

  // Create "Clear Filters" button
  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.classList.add(
    "flex",
    "w-full",
    "items-center",
    "gap-2",
    "rounded-lg",
    "bg-danger",
    "p-3",
    "py-2",
    "pr-4",
    "text-start",
    "font-medium",
    "leading-tight",
    "text-white",
    "transition-all",
    "hover:text-light-gray",
    "cursor-pointer",
    "active:opacity-60",
    "!w-fit",
    "whitespace-nowrap"
  );
  const clearButtonText = document.createElement("h4");
  clearButtonText.textContent = "Очистить фильтры";
  clearButton.appendChild(clearButtonText);
  buttonsContainer.appendChild(clearButton);

  // Add event listener to clear all filters on click
  clearButton.addEventListener("click", () => {
    clearAllFilters();
  });

  // Append buttons container to filter container
  filterContainer.appendChild(buttonsContainer);

  const filtersList = document.createElement("div");
  filtersList.dataset.filterList = true;
  filtersList.classList.add("flex", "flex-col", "gap-5");

  // Append filter container to parent element
  parentElement.appendChild(filtersList);
  parentElement.appendChild(filterContainer);
}

function createAndAppendContainer(title, point) {
  // Create main container
  const container = document.createElement("div");
  container.classList.add("flex", "items-center", "gap-10");

  // Create OEM div
  const oemDiv = document.createElement("div");
  oemDiv.classList.add(
    "flex",
    "cursor-pointer",
    "items-center",
    "gap-4",
    "transition-all",
    "hover:opacity-70",
    "w-44"
  );

  // Create SVG container
  const svgContainer = document.createElement("div");
  svgContainer.classList.add("relative", "h-4", "w-4");
  const svgElement = `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
    <g stroke-width="0"></g>
    <g stroke-linecap="round" stroke-linejoin="round"></g>
    <g>
      <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"></path>
    </g>
  </svg>
  `;
  svgContainer.innerHTML = svgElement;
  oemDiv.appendChild(svgContainer);

  // Create OEM span
  const oemSpan = document.createElement("span");
  oemSpan.textContent = `${title}:`;
  oemDiv.appendChild(oemSpan);
  container.appendChild(oemDiv);

  // Add event listener to remove container on click
  oemDiv.addEventListener("click", () => {
    container.remove();
    point.classList.remove("filter-choosed");

    // Check if there are any other filter containers
    const filterList = document.querySelector("[data-filter-list]");
    if (!filterList || filterList.children.length === 0) {
      const filterContainer = document.querySelector("[data-filter-container]");
      if (filterContainer) {
        filterContainer.remove();
      }
    }
  });

  // Create grid container
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid", "grid-cols-2", "items-center", "gap-4");

  // Create custom select container
  const customSelectContainer = document.createElement("div");
  customSelectContainer.classList.add("custom-select", "relative", "w-full");

  // Create select button
  const selectButtonDiv = document.createElement("div");
  selectButtonDiv.classList.add(
    "border-blue-gray-200",
    "rounded-lg",
    "border",
    "bg-white",
    "shadow-sm"
  );
  const selectButton = document.createElement("button");
  selectButton.type = "button";
  selectButton.classList.add(
    "select-button",
    "flex",
    "w-full",
    "items-center",
    "justify-between",
    "px-3",
    "py-2",
    "text-left"
  );
  const selectedOptionSpan = document.createElement("span");
  selectedOptionSpan.classList.add("selected-option");
  selectedOptionSpan.textContent = "Option B";
  const selectIcon = `
  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
  </svg>
  `;
  selectButton.innerHTML += selectedOptionSpan.outerHTML + selectIcon;
  selectButtonDiv.appendChild(selectButton);
  customSelectContainer.appendChild(selectButtonDiv);

  // Create dropdown options
  const dropdownOptions = document.createElement("ul");
  dropdownOptions.classList.add(
    "dropdown-options",
    "pointer-events-none",
    "absolute",
    "z-10",
    "mt-1",
    "w-full",
    "scale-95",
    "transform",
    "overflow-hidden",
    "rounded-lg",
    "border",
    "border-gray-300",
    "bg-white",
    "opacity-0",
    "shadow-sm",
    "transition"
  );
  const optionB = document.createElement("li");
  optionB.classList.add(
    "cursor-pointer",
    "px-3",
    "py-2",
    "hover:bg-gray-100",
    "text-primary",
    "font-bold"
  );
  optionB.textContent = "равно";
  const optionC = document.createElement("li");
  optionC.classList.add("cursor-pointer", "px-3", "py-2", "hover:bg-gray-100");
  optionC.textContent = "не равно";
  const optionD = document.createElement("li");
  optionD.classList.add("cursor-pointer", "px-3", "py-2", "hover:bg-gray-100");
  optionD.textContent = "содержит";
  const optionE = document.createElement("li");
  optionE.classList.add("cursor-pointer", "px-3", "py-2", "hover:bg-gray-100");
  optionE.textContent = "не содержит";
  const optionF = document.createElement("li");
  optionF.classList.add("cursor-pointer", "px-3", "py-2", "hover:bg-gray-100");
  optionF.textContent = "отсутсвует";
  const optionG = document.createElement("li");
  optionG.classList.add("cursor-pointer", "px-3", "py-2", "hover:bg-gray-100");
  optionG.textContent = "существует";
  dropdownOptions.appendChild(optionB);
  dropdownOptions.appendChild(optionC);
  dropdownOptions.appendChild(optionD);
  dropdownOptions.appendChild(optionE);
  dropdownOptions.appendChild(optionF);
  dropdownOptions.appendChild(optionG);
  customSelectContainer.appendChild(dropdownOptions);
  gridContainer.appendChild(customSelectContainer);

  // Create input field
  const inputField = document.createElement("input");
  inputField.classList.add(
    "text-blue-gray-700",
    "disabled:bg-blue-gray-50",
    "placeholder-shown:border-blue-gray-200",
    "placeholder-shown:border-t-blue-gray-200",
    "border-t-blue-gray-200",
    "border-blue-gray-200",
    "peer",
    "h-full",
    "w-full",
    "rounded-[7px]",
    "border",
    "bg-transparent",
    "px-3",
    "py-2.5",
    "font-sans",
    "text-base",
    "font-normal",
    "outline",
    "outline-0",
    "transition-all",
    "placeholder-shown:border",
    "focus:outline-1",
    "focus:outline-primary",
    "focus:border-primary",
    "disabled:border-0"
  );
  inputField.placeholder = "";
  inputField.value = "";
  inputField.type = "text";
  gridContainer.appendChild(inputField);

  container.appendChild(gridContainer);

  // Append container to the desired parent element
  const parentElement = document.querySelector("[data-filter-list]");
  parentElement.appendChild(container);
}

function clearAllFilters() {
  const filterContainer = document.querySelector("[data-filter-container]");
  if (filterContainer) {
    filterContainer.remove();
  }

  const filterList = document.querySelector("[data-filter-list]");
  if (filterList) {
    filterList.remove();
  }

  const filterPoints = document.querySelectorAll("[data-filter]");
  filterPoints.forEach((point) => {
    point.classList.remove("filter-choosed");
  });
}


// inventory checkbox
document.addEventListener("DOMContentLoaded", function () {
  const inventories = document.querySelector("[data-inventories]");
  if (!inventories) return; // Проверка на наличие элемента inventories
  
  const inventoryItems = inventories.querySelectorAll("[data-inventory]");

  inventoryItems.forEach((inventoryItem) => {
    const inventoryCheckbox = inventoryItem.querySelector("[data-inventory-checkbox]");
    const checkbox = inventoryCheckbox.querySelector("input[type='checkbox']");

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString(); // Форматирование даты и времени
        const span = document.createElement("span");
        span.classList.add("text-sm", "text-success", "font-normal");
        span.textContent = `${formattedDate}`;
        inventoryItem.classList.add("invetory-active");

        inventoryCheckbox.innerHTML = ''; // Очистка содержимого элемента
        inventoryCheckbox.appendChild(span); // Добавление нового span с датой и временем
      }
    });
  });
});


const mainCheckboxes = document.querySelectorAll("[data-table-checkbox-main]");
const secondaryCheckboxes = document.querySelectorAll("[data-table-checkbox-secondary]");

function updateSortingVisibility(CheckboxType) {
  const sortingElement = document.querySelector(`[data-table-checkbox-filter='${CheckboxType}']`);
  const anyMainChecked = document.querySelector(`[data-table-checkbox-main='${CheckboxType}']:checked`);
  const anySecondaryChecked = document.querySelector(`[data-table-checkbox-secondary='${CheckboxType}']:checked`);

  if (anyMainChecked || anySecondaryChecked) {
    sortingElement.classList.remove("hidden");
  } else {
    sortingElement.classList.add("hidden");
  }
}

mainCheckboxes.forEach(function (mainCheckbox) {
  mainCheckbox.addEventListener("change", function () {
    const CheckboxType = mainCheckbox.getAttribute("data-table-checkbox-main");

    // Update secondary checkboxes based on the main checkbox state
    const secondaryCheckboxes = document.querySelectorAll(`[data-table-checkbox-secondary='${CheckboxType}']`);
    secondaryCheckboxes.forEach(function (secondaryCheckbox) {
      secondaryCheckbox.checked = mainCheckbox.checked;
    });

    // Update sorting visibility
    updateSortingVisibility(CheckboxType);
  });
});

secondaryCheckboxes.forEach(function (secondaryCheckbox) {
  secondaryCheckbox.addEventListener("change", function () {
    const CheckboxType = secondaryCheckbox.getAttribute("data-table-checkbox-secondary");
    updateSortingVisibility(CheckboxType);
  });
});
