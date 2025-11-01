import { $, html } from "../utils/dom.js";
import { enhanceRichContent } from "../utils/enhance.js";

export function mountCarousel() {
  const root = document.querySelector("#app") || document.body;
  root.innerHTML = html`
  <section class="page">
    <div class="container">
      <div class="hero mb">
        <h1>Carousel</h1>
      </div>
      <div class="legacy-wrap rich-content" id="carousel-content"></div>
    </div>
  </section>
`;
  const legacyFn = window["initCarousel"];
  if (typeof legacyFn === "function") {
    try { legacyFn(); } catch(err) { console.error("Legacy initCarousel failed:", err); }
  }
}
