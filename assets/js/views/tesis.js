import { $, html } from "../utils/dom.js";
import { enhanceRichContent } from "../utils/enhance.js";

export function mountTesis() {
  const root = document.querySelector("#app") || document.body;
  root.innerHTML = html`
  <section class="page">
    <div class="container">
      <div class="hero mb">
        <h1>Tesis</h1>
      </div>
      <div class="legacy-wrap rich-content" id="tesis-content"></div>
    </div>
  </section>
`;
  const legacyFn = window["initTesis"];
  if (typeof legacyFn === "function") {
    try { legacyFn(); } catch(err) { console.error("Legacy initTesis failed:", err); }
  }
}
