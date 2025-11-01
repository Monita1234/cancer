export function makeMasonry(container, base = 8){
  if(!container) return;
  const style = getComputedStyle(container);
  const gap = parseFloat(style.gap) || 16;
  container.classList.add('masonry');
  container.style.gridAutoRows = base + 'px';

  const calc = () => {
    Array.from(container.children).forEach(el => {
      if(!(el instanceof HTMLElement)) return;
      el.style.gridRowEnd = 'span 1';
      const h = el.getBoundingClientRect().height;
      const span = Math.ceil((h + gap) / (base));
      el.style.gridRowEnd = `span ${span}`;
    });
  };
  const ro = new ResizeObserver(() => calc());
  ro.observe(container);
  window.addEventListener('resize', calc, { passive: true });
  calc();
}

export function enhanceRichContent(container){
  if(!container) return;
  const kids = Array.from(container.children).filter(n => n.nodeType === 1);
  const candidateBlocks = kids.filter(n => /(section|div|article)/i.test(n.tagName));
  if(candidateBlocks.length >= 2){
    container.classList.add('grid');
    container.classList.add(candidateBlocks.length >= 3 ? 'grid-3' : 'grid-2');
    candidateBlocks.forEach(n => {
      if(!n.classList.contains('card') && !n.classList.contains('no-card')){
        const computed = getComputedStyle(n);
        const hasPadding = parseFloat(computed.paddingTop) > 0 || parseFloat(computed.paddingLeft) > 0;
        if(!hasPadding) n.classList.add('card');
      }
    });
    // Masonry to reduce white gaps
    makeMasonry(container, 8);
  }
  // Responsive tables
  container.querySelectorAll('table').forEach(tbl => {
    if(tbl.closest('.table-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    wrap.style.overflowX = 'auto';
    wrap.style.webkitOverflowScrolling = 'touch';
    tbl.parentNode.insertBefore(wrap, tbl);
    wrap.appendChild(tbl);
  });
}
