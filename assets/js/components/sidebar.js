export function renderSidebar(container, items = []) {
  container.innerHTML = items.map(i => `
    <button data-action="${i.action}" class="side__btn">${i.label}</button>
  `).join("");
}
