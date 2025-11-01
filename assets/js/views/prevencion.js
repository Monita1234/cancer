import { $, html } from "../utils/dom.js";
import { enhanceRichContent } from "../utils/enhance.js";

export function mountPrevencion() {
  const root = document.querySelector("#app") || document.body;
  root.innerHTML = html`
  <section class="page">
    <div class="container">
      <div class="hero mb">
        <h1>Prevención</h1>
      </div>
      <div class="legacy-wrap rich-content" id="prevencion-content"></div>
    </div>
  </section>
`;
  const legacyFn = window["initPrevencion"];
  if (typeof legacyFn === "function") {
    try { legacyFn(); } catch(err) { console.error("Legacy initPrevencion failed:", err); }
  }
}
