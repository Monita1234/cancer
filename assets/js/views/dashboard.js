import { $, html } from "../utils/dom.js";
import { enhanceRichContent } from "../utils/enhance.js";

export function mountDashboard() {
  const root = document.querySelector("#app") || document.body;
  root.innerHTML = html`
  <section class="page">
    <div class="container">
      <div class="hero mb">
        <h1>Dashboard</h1>
      </div>
      <div class="legacy-wrap rich-content" id="dashboard-content"></div>
    </div>
  </section>
`;
  const legacyFn = window["initDashboard"];
  if (typeof legacyFn === "function") {
    try { legacyFn(); } catch(err) { console.error("Legacy initDashboard failed:", err); }
  }
}
