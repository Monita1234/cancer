(function () {
  if (!window.DATA || !DATA.inicio) return;

  var collageHtml =
    '<div class="intro-gallery intro-gallery--full">' +
      '<figure class="intro-gallery__tile" role="img" aria-label="Antomía del estómago" style="--img:url(https://source.unsplash.com/1200x800/?stomach,anatomy)"></figure>' +
      '<figure class="intro-gallery__tile" role="img" aria-label="Endoscopia gástrica" style="--img:url(https://source.unsplash.com/1200x800/?stomach,endoscopy)"></figure>' +
      '<figure class="intro-gallery__tile" role="img" aria-label="Tinción de cáncer gástrico" style="--img:url(https://source.unsplash.com/1200x800/?gastric-cancer,histology)"></figure>' +
      '<figure class="intro-gallery__tile" role="img" aria-label="Helicobacter pylori" style="--img:url(https://source.unsplash.com/1200x800/?helicobacter,pylori)"></figure>' +
      '<figure class="intro-gallery__tile" role="img" aria-label="Equipo oncológico digestivo" style="--img:url(https://source.unsplash.com/1200x800/?oncology,team)"></figure>' +
      '<figure class="intro-gallery__tile" role="img" aria-label="Imagen diagnóstica abdominal" style="--img:url(https://source.unsplash.com/1200x800/?abdominal,ct)"></figure>' +
      '<figure class="intro-gallery__tile" role="img" aria-label="Nutrición para cáncer gástrico" style="--img:url(https://source.unsplash.com/1200x800/?nutrition,gastric)"></figure>' +
      '<figure class="intro-gallery__tile" role="img" aria-label="Quirófano de cirugía digestiva" style="--img:url(https://source.unsplash.com/1200x800/?surgery,gastrointestinal)"></figure>' +
    '</div>';

DATA.inicio.html = collageHtml;

  // Si ya estamos mostrando "inicio", reemplaza el contenido inmediatamente
  if (typeof window.byId === "function" && window.byId("content") && window.CURRENT_SECTION === "inicio") {
    window.byId("content").innerHTML = collageHtml;
  }

  var TESIS_STATIC = window.TESIS_DATA || [
    { file: "tesis-01.pdf", title: "Incidencia local de cancer gastrico" },
    { file: "tesis-02.pdf", title: "Proyecto academico 2025" },
    { file: "tesis-03.pdf", title: "Intervenciones comunitarias" },
    { file: "tesis-04.pdf", title: "Tratamiento multimodal" },
    { file: "tesis-05.pdf", title: "Seguimiento nutricional" },
    { file: "tesis-prostata.pdf", title: "Sensibilizacion cancer prostata" },
    { file: "tesis-cervix.pdf", title: "Informe final cancer cervix" },
    { file: "tesis-pulmon.pdf", title: "Proyecto cancer de pulmon" },
    { file: "tesis-hipofraccionamiento.pdf", title: "Radioterapia hipofraccionada" },
    { file: "tesis-rai.pdf", title: "Registro academico institucional" }
  ];

  window.TESIS_DATA = TESIS_STATIC;
  var tesisManifestLoaded = false;

  function ensureTesisData() {
    if (tesisManifestLoaded) return Promise.resolve();
    tesisManifestLoaded = true;
    if (typeof fetch !== "function") return Promise.resolve();
    return fetch("./assets/tesis/manifest.json", { cache: "no-store" })
      .then(function (res) { return res.ok ? res.json() : []; })
      .then(function (items) {
        if (Array.isArray(items) && items.length) {
          window.TESIS_DATA = items;
        }
      })
      .catch(function () { /* silencio: archivos locales (file://) fallan */ });
  }

  window.renderTesisGrid = function () {
    var grid = (typeof byId === "function") ? byId("tesisGrid") : document.getElementById("tesisGrid");
    if (!grid) return;
    var data = Array.isArray(window.TESIS_DATA) ? window.TESIS_DATA : [];
    if (!data.length) {
      grid.innerHTML = '<div class="card full"><p class="muted">No hay tesis registradas.</p></div>';
      return;
    }
    var safe = (typeof escapeHtml === "function") ? escapeHtml : function (s) { return String(s); };
    var cards = data.map(function (item) {
      var href = "./assets/tesis/" + encodeURIComponent(item.file);
      return '<div class="card equal tesis-card">'
        + '<div class="pdf-thumb"><img src="' + PDF_ICON + '" alt="PDF"></div>'
        + '<h4>' + safe(item.title || item.file) + '</h4>'
        + '<div class="btn-row">'
        +   '<a class="btn primary" href="' + href + '" target="_blank" rel="noopener">Abrir</a>'
        +   '<a class="btn" href="' + href + '" download>Descargar</a>'
        + '</div>'
      + '</div>';
    }).join("");
    grid.innerHTML = cards;
  };

  window.initTesis = function () {
    ensureTesisData()
      .then(function () { window.renderTesisGrid(); })
      .catch(function () { window.renderTesisGrid(); });
  };
})();


