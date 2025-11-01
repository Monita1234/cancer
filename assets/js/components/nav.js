import { html } from "../utils/dom.js";

export function renderNav(container, items = [], active) {
  container.innerHTML = html`
    <nav class="nav">
      ${items.map(i => `
        <a href="#/${i.id}" class="nav__item ${i.id===active?'is-active':''}">
          ${i.icon ?? ""}<span>${i.label}</span>
        </a>`).join("")}
    </nav>`;
}
