import { $, html } from "../utils/dom.js";
import { enhanceRichContent } from "../utils/enhance.js";

export function mountTratamiento() {
  const root = document.querySelector("#app") || document.body;
  root.innerHTML = html`
  <section class="page">
    <div class="container">
      <div class="hero mb">
        <h1>Tratamiento</h1>
      </div>
      <div class="legacy-wrap rich-content" id="tratamiento-content"></div>
    </div>
  </section>
`;
  const legacyFn = window["initTratamiento"];
  if (typeof legacyFn === "function") {
    try { legacyFn(); } catch(err) { console.error("Legacy initTratamiento failed:", err); }
  }
}
