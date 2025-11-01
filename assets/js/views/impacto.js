import { $, html } from "../utils/dom.js";
import { enhanceRichContent } from "../utils/enhance.js";

export function mountImpacto() {
  const root = document.querySelector("#app") || document.body;
  root.innerHTML = html`
  <section class="page">
    <div class="container">
      <div class="hero mb">
        <h1>Impacto</h1>
      </div>
      <div class="legacy-wrap rich-content" id="impacto-content"></div>
    </div>
  </section>
`;
  const legacyFn = window["initImpacto"];
  if (typeof legacyFn === "function") {
    try { legacyFn(); } catch(err) { console.error("Legacy initImpacto failed:", err); }
  }
}
