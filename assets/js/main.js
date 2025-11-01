import { renderNav } from "./components/nav.js";
import { renderSidebar } from "./components/sidebar.js";
import { register, startRouter } from "./router.js";
import { byId } from "./utils/dom.js";

// Use NAV/SIDE from legacy (window) until migrated into data/constants.js
const NAV = (window.NAV) || [
  { id: "dashboard", label: "Dashboard" },
  { id: "prevencion", label: "Prevención" },
  { id: "impacto", label: "Impacto" },
  { id: "tratamiento", label: "Tratamiento" },
  { id: "carousel", label: "Carousel" },
  { id: "tesis", label: "Tesis" },
];
const SIDE = (window.SIDE) || [];

import { mountDashboard }  from "./views/dashboard.js";
import { mountPrevencion } from "./views/prevencion.js";
import { mountImpacto }    from "./views/impacto.js";
import { mountTratamiento }from "./views/tratamiento.js";
import { mountCarousel }   from "./views/carousel.js";
import { mountTesis }      from "./views/tesis.js";

function renderChrome() {
  const active = location.hash.replace("#/", "") || "dashboard";
  const navEl = byId("nav") || document.body.appendChild(Object.assign(document.createElement("div"), { id: "nav" }));
  const sideEl = byId("side") || document.body.appendChild(Object.assign(document.createElement("div"), { id: "side" }));
  renderNav(navEl, NAV, active);
  renderSidebar(sideEl, SIDE);
}

register("dashboard",  () => { renderChrome(); mountDashboard();  });
register("prevencion", () => { renderChrome(); mountPrevencion(); });
register("impacto",    () => { renderChrome(); mountImpacto();    });
register("tratamiento",() => { renderChrome(); mountTratamiento(); });
register("carousel",   () => { renderChrome(); mountCarousel();   });
register("tesis",      () => { renderChrome(); mountTesis();      });

startRouter();
