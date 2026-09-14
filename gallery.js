/* AuraStudio capture gallery + pre-capture creative options */
(function () {
  if (window.__auraGalleryInit) return;
  window.__auraGalleryInit = true;

  var shots = [];

  var css = document.createElement('style');
  css.textContent = [
    '#aura-gal-btn{position:fixed;bottom:70px;right:12px;z-index:280;background:rgba(0,255,255,0.15);border:1px solid rgba(0,255,255,0.5);color:#0ff;padding:10px 14px;border-radius:22px;font-size:13px;font-weight:700;font-family:system-ui,sans-serif;cursor:pointer;backdrop-filter:blur(8px)}',
    '#aura-gal-panel{display:none;position:fixed;inset:auto 0 0 0;max-height:62vh;z-index:290;background:rgba(4,10,22,0.97);border-top:1px solid rgba(0,255,255,0.3);padding:12px;font-family:system-ui,sans-serif;color:#e2f4ff;overflow:auto}',
    '#aura-gal-panel.open{display:block}',
    '#aura-gal-panel h3{margin:0 0 6px;color:#0ff;font-size:14px}',
    '#aura-gal-panel h4{margin:10px 0 6px;color:#5bb3e0;font-size:12px;font-weight:600}',
    '#aura-gal-opts,#aura-pre{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;font-size:11px;color:#7da5c2;align-items:center}',
    '#aura-gal-opts label,#aura-pre label{display:flex;align-items:center;gap:4px}',
    '#aura-gal-opts select,#aura-gal-opts input,#aura-pre select{background:#0a1628;border:1px solid rgba(0,255,255,0.3);color:#0ff;border-radius:6px;padding:4px 6px;font-size:11px}',
    '#aura-gal-actions{display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap}',
    '#aura-gal-actions button,.aura-pose-btn{background:rgba(0,255,255,0.12);border:1px solid rgba(0,255,255,0.4);color:#0ff;padding:8px 12px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer}',
    '.aura-pose-btn{padding:6px 10px;font-size:11px}',
    '.aura-pose-btn.active{background:rgba(0,255,255,0.35);color:#001018}',
    '#aura-gal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px}',
    '.aura-gal-item{position:relative;border-radius:8px;overflow:hidden;border:1px solid rgba(0,255,255,0.2);background:#02040a}',
    '.aura-gal-item img{width:100%;display:block;aspect-ratio:16/10;object-fit:cover}',
    '.aura-gal-item .row{display:flex;gap:4px;padding:4px}',
    '.aura-gal-item .row button{flex:1;font-size:10px;padding:4px;border:none;border-radius:4px;cursor:pointer;background:#0a2030;color:#0ff}',
    '#aura-gal-close{float:right;background:transparent;border:none;color:#7da5c2;font-size:18px;cursor:pointer}'
  ].join('');
  document.head.appendChild(css);

  var btn = document.createElement('button');
  btn.id = 'aura-gal-btn';
  btn.type = 'button';
  btn.textContent = '📷 Galería';
  document.body.appendChild(btn);

  var panel = document.createElement('div');
  panel.id = 'aura-gal-panel';
  panel.innerHTML = [
    '<button type="button" id="aura-gal-close" aria-label="Cerrar">×</button>',
    '<h3>Galería y ajustes de captura</h3>',
    '<h4>Antes de capturar</h4>',
    '<div id="aura-pre">',
    '  <label>Estilo <select id="aura-pre-style">',
    '    <option value="cyberpunk">Cyberpunk</option>',
    '    <option value="emerald">Matrix</option>',
    '    <option value="solar">Solar</option>',
    '    <option value="violet">Violet</option>',
    '  </select></label>',
    '  <label>Forma <select id="aura-pre-shape">',
    '    <option value="particles">Partículas</option>',
    '    <option value="terrain">Malla</option>',
    '    <option value="crystal">Cristal</option>',
    '    <option value="cylinder">Espectro</option>',
    '  </select></label>',
    '  <label>Bloom <input id="aura-pre-bloom" type="range" min="0.2" max="3" step="0.1" value="1.5"></label>',
    '  <label>Auto-rotar <input id="aura-pre-spin" type="checkbox" checked></label>',
    '</div>',
    '<div id="aura-pose-row" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">',
    '  <span style="font-size:11px;color:#7da5c2;width:100%">Pose / cámara</span>',
    '  <button type="button" class="aura-pose-btn" data-pose="front">Frontal</button>',
    '  <button type="button" class="aura-pose-btn" data-pose="top">Cenital</button>',
    '  <button type="button" class="aura-pose-btn" data-pose="side">Lateral</button>',
    '  <button type="button" class="aura-pose-btn" data-pose="dramatic">Dramática</button>',
    '  <button type="button" class="aura-pose-btn" data-pose="close">Primer plano</button>',
    '</div>',
    '<h4>Calidad de archivo</h4>',
    '<div id="aura-gal-opts">',
    '  <label>Formato <select id="aura-cap-fmt"><option value="png">PNG</option><option value="jpeg">JPEG</option></select></label>',
    '  <label>Calidad JPEG <input id="aura-cap-q" type="range" min="0.5" max="1" step="0.05" value="0.92"></label>',
    '  <label>Resolución <select id="aura-cap-scale"><option value="1">1×</option><option value="2">2× nítido</option></select></label>',
    '  <label><input type="checkbox" id="aura-cap-hideui" checked> Ocultar UI</label>',
    '</div>',
    '<div id="aura-gal-actions">',
    '  <button type="button" id="aura-cap-shot">📸 Capturar ahora</button>',
    '  <button type="button" id="aura-cap-clear">🗑️ Vaciar</button>',
    '</div>',
    '<div id="aura-gal-grid"></div>',
    '<p style="font-size:10px;color:#7da5c2;margin:8px 0 0">Elige estilo, forma y pose; espera un momento con audio y captura. 2× da más detalle.</p>'
  ].join('');
  document.body.appendChild(panel);

  var grid = document.getElementById('aura-gal-grid');
  btn.onclick = function () { panel.classList.toggle('open'); };
  document.getElementById('aura-gal-close').onclick = function () { panel.classList.remove('open'); };

  function syncFromMain() {
    var ps = document.getElementById('palette-select');
    var ss = document.getElementById('shape-select');
    var bl = document.getElementById('slider-bloom');
    if (ps) document.getElementById('aura-pre-style').value = ps.value;
    if (ss) document.getElementById('aura-pre-shape').value = ss.value;
    if (bl) document.getElementById('aura-pre-bloom').value = bl.value;
  }
  setTimeout(syncFromMain, 800);

  document.getElementById('aura-pre-style').onchange = function () {
    var ps = document.getElementById('palette-select');
    if (ps) {
      ps.value = this.value;
      ps.dispatchEvent(new Event('change'));
    }
  };
  document.getElementById('aura-pre-shape').onchange = function () {
    var ss = document.getElementById('shape-select');
    if (ss) {
      ss.value = this.value;
      ss.dispatchEvent(new Event('change'));
    }
  };
  document.getElementById('aura-pre-bloom').oninput = function () {
    var bl = document.getElementById('slider-bloom');
    if (bl) {
      bl.value = this.value;
      bl.dispatchEvent(new Event('input'));
    }
    if (window.__auraBloom) window.__auraBloom.strength = parseFloat(this.value);
  };
  document.getElementById('aura-pre-spin').onchange = function () {
    if (window.__auraControls) window.__auraControls.autoRotate = this.checked;
  };

  var poses = {
    front:     { pos: [0, 80, 750], target: [0, 0, 0] },
    top:       { pos: [0, 900, 40], target: [0, 0, 0] },
    side:      { pos: [700, 100, 200], target: [0, 0, 0] },
    dramatic:  { pos: [420, 220, 520], target: [0, 40, 0] },
    close:     { pos: [0, 40, 320], target: [0, 0, 0] }
  };

  panel.querySelectorAll('.aura-pose-btn').forEach(function (b) {
    b.onclick = function () {
      panel.querySelectorAll('.aura-pose-btn').forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      var p = poses[b.getAttribute('data-pose')];
      if (!p || !window.__auraCamera) return;
      window.__auraCamera.position.set(p.pos[0], p.pos[1], p.pos[2]);
      if (window.__auraControls) {
        window.__auraControls.target.set(p.target[0], p.target[1], p.target[2]);
        window.__auraControls.update();
      }
    };
  });

  function hideChrome(hide) {
    ['sidebar-panel', 'nav-tabs', 'toggle-panel-btn', 'status-bar', 'home-link', 'aura-gal-btn', 'aura-open-controls'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.style.visibility = hide ? 'hidden' : '';
    });
  }

  function capture() {
    var renderer = window.__auraRenderer;
    var composer = window.__auraComposer;
    if (!renderer) {
      alert('Espera a que cargue el visualizador');
      return;
    }
    var scale = parseFloat(document.getElementById('aura-cap-scale').value) || 1;
    var fmt = document.getElementById('aura-cap-fmt').value;
    var q = parseFloat(document.getElementById('aura-cap-q').value) || 0.92;
    var hideUi = document.getElementById('aura-cap-hideui').checked;
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (hideUi) hideChrome(true);

    function doShot() {
      try {
        if (scale > 1) {
          renderer.setPixelRatio(1);
          renderer.setSize(w * scale, h * scale, false);
          if (composer && composer.setSize) composer.setSize(w * scale, h * scale);
        }
        if (composer) composer.render();
        else if (window.__auraScene && window.__auraCamera) renderer.render(window.__auraScene, window.__auraCamera);
        var mime = fmt === 'jpeg' ? 'image/jpeg' : 'image/png';
        var data = renderer.domElement.toDataURL(mime, q);
        shots.unshift({ data: data, t: Date.now(), mime: mime });
        if (shots.length > 24) shots.pop();
        renderGrid();
      } catch (err) {
        alert('No se pudo capturar: ' + err.message);
      } finally {
        if (scale > 1) {
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(w, h, false);
          if (composer && composer.setSize) composer.setSize(w, h);
        }
        if (hideUi) hideChrome(false);
        if (composer) composer.render();
      }
    }
    requestAnimationFrame(function () { requestAnimationFrame(doShot); });
  }

  function renderGrid() {
    grid.innerHTML = '';
    shots.forEach(function (s, i) {
      var div = document.createElement('div');
      div.className = 'aura-gal-item';
      var img = document.createElement('img');
      img.src = s.data;
      img.alt = 'Captura';
      var row = document.createElement('div');
      row.className = 'row';
      var dl = document.createElement('button');
      dl.type = 'button';
      dl.textContent = '⬇️';
      dl.onclick = function () {
        var a = document.createElement('a');
        a.download = 'aurastudio-' + s.t + (s.mime.indexOf('jpeg') >= 0 ? '.jpg' : '.png');
        a.href = s.data;
        a.click();
      };
      var rm = document.createElement('button');
      rm.type = 'button';
      rm.textContent = '✕';
      rm.onclick = function () { shots.splice(i, 1); renderGrid(); };
      row.appendChild(dl);
      row.appendChild(rm);
      div.appendChild(img);
      div.appendChild(row);
      grid.appendChild(div);
    });
  }

  document.getElementById('aura-cap-shot').onclick = capture;
  document.getElementById('aura-cap-clear').onclick = function () { shots = []; renderGrid(); };
})();
