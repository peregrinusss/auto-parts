const accordionItems=document.querySelectorAll("[data-accordion-item]");accordionItems.forEach((t=>{const a=t.querySelector("[data-accordion-button]"),c=t.querySelector("[data-accordion-content]");a.addEventListener("click",(function(){c.classList.toggle("max-h-0");const a=t.querySelector("[data-accordion-arrow]");a&&a.classList.toggle("rotate-180")}))}));const tabs=document.querySelectorAll("[data-tabs]");tabs.length&&tabs.forEach((t=>{const a=t.querySelectorAll("button");a.forEach((t=>{t.addEventListener("click",(function(){a.forEach((t=>t.classList.remove("tab-active"))),t.classList.add("tab-active")}))}))}));const paginations=document.querySelectorAll("[data-pagination]");paginations.length&&paginations.forEach((t=>{let a;const c=t.querySelectorAll("[data-pagination-item]");c.forEach(((t,c)=>{t.classList.contains("pagination-active")&&(a=c+1)})),c.forEach((t=>{t.addEventListener("click",(function(){c.forEach((t=>{t.classList.remove("pagination-active"),t.classList.add("hover:bg-gray-900/10")})),t.classList.add("pagination-active"),t.classList.remove("hover:bg-gray-900/10")}))}))}));