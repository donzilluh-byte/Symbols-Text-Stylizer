// content.js

console.log('Stylizer content script loaded');

let stylizerInjected = false;

function injectStylizer() {
  if (stylizerInjected) return;
  stylizerInjected = true;

  const container = document.createElement('div');
  container.id = 'symbols-text-stylizer-root';

  container.innerHTML = `
    <!-- Floating Windows -->
    <div class="floating-window active" id="mainWindow"
         style="position:fixed;left:20px;top:20px;width:500px;max-height:80vh;z-index:999999;">
      <div class="float-header">
        ✦ Symbols & Text Stylizer
        <button class="float-close" onclick="toggleWindow('mainWindow')">✕</button>
      </div>
      <div class="float-content">
        <div class="tabs" style="margin-bottom: 10px;">
          <button class="tab-btn active" data-tab="stylizer">Text Stylizer</button>
          <button class="tab-btn" data-tab="symbols">Symbol Keyboard</button>
          <button class="tab-btn" data-tab="logo">Logo Creator</button>
        </div>

        <!-- STYLIZER TAB -->
        <div id="stylizer" class="tab-content active">
          <div class="main-grid">
            <!-- Input Section -->
            <div class="section">
              <h2><span class="section-icon">✎</span> Input Text</h2>
              <textarea id="inputText" placeholder="Type or paste text here..."></textarea>
              <div class="button-controls">
                <button class="btn" id="clearInputBtn">Clear</button>
              </div>
            </div>

            <!-- Output Section -->
            <div class="section">
              <h2><span class="section-icon">✨</span> Stylized Output</h2>
              <div class="preview-box empty" id="outputPreview">Select a style...</div>
              <textarea id="outputText" placeholder="Stylized text will appear here" readonly></textarea>
              <div class="button-controls">
                <button class="btn btn--success" id="copyOutputBtn">📋 Copy</button>
                <button class="btn" id="selectOutputBtn">◉ Select All</button>
              </div>
            </div>
          </div>

          <!-- Style Selection -->
          <div class="section full-width">
            <h2><span class="section-icon">🎨</span> Text Styles</h2>
            <div class="style-grid">
              <button class="style-btn" data-style="strikethrough">Strikethrough</button>
              <button class="style-btn" data-style="overline">Overline</button>
              <button class="style-btn" data-style="zalgo">Zalgo/Chaos</button>
              <button class="style-btn" data-style="superscript">Superscript</button>
              <button class="style-btn" data-style="subscript">Subscript</button>
              <button class="style-btn" data-style="bold">Bold Math</button>
              <button class="style-btn" data-style="cursive">Cursive Math</button>
              <button class="style-btn" data-style="combining">Combining Marks</button>
              <button class="style-btn" data-style="upsidedown">Upside Down</button>
              <button class="style-btn" data-style="reversed">Reversed</button>
              <button class="style-btn" data-style="mirrored">Mirrored</button>
              <button class="style-btn" data-style="blockSolid">Block Solid</button>
              <button class="style-btn" data-style="blockHollow">Block Hollow</button>
              <button class="style-btn" data-style="triangle">Triangle Font</button>
            </div>
          </div>

          <!-- Live Preview Toggle & Default Style Selection -->
          <div class="section full-width">
            <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: 500;">
                <input type="checkbox" id="livePreview"
                       style="width: 18px; height: 18px; cursor: pointer;">
                <span>🔄 Live Preview (converts as you type)</span>
              </label>
              <div style="display: flex; align-items: center; gap: 8px; font-size: 14px;">
                <label for="defaultStyle">Set Default Style:</label>
                <select id="defaultStyle"
                        style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--color-border);
                               background: var(--color-bg-primary); color: var(--color-text-primary); cursor: pointer;">
                  <option value="">None (click to select)</option>
                  <option value="strikethrough">Strikethrough</option>
                  <option value="overline">Overline</option>
                  <option value="zalgo">Zalgo/Chaos</option>
                  <option value="superscript">Superscript</option>
                  <option value="subscript">Subscript</option>
                  <option value="bold">Bold Math</option>
                  <option value="cursive">Cursive Math</option>
                  <option value="combining">Combining Marks</option>
                  <option value="upsidedown">Upside Down</option>
                  <option value="reversed">Reversed</option>
                  <option value="mirrored">Mirrored</option>
                  <option value="blockSolid">Block Solid</option>
                  <option value="blockHollow">Block Hollow</option>
                  <option value="triangle">Triangle Font</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- LOGO CREATOR TAB -->
        <div id="logo" class="tab-content">
          <div class="logo-grid">
            <!-- Logo Preview -->
            <div class="section">
              <h2><span class="section-icon">🎨</span> Logo Preview</h2>
              <div class="logo-preview-container" id="logoPreview">
                <p style="color: var(--color-text-secondary); font-style: italic;">
                  Enter text to generate logo
                </p>
              </div>
            </div>

            <!-- Controls -->
            <div class="section">
              <h2><span class="section-icon">⚙️</span> Settings</h2>

              <div class="control-group">
                <label class="control-label">Logo Text (Enter for new line)</label>
                <textarea id="logoText" class="control-input" placeholder="REBEL MUSE"></textarea>
              </div>

              <div class="control-group">
                <label class="control-label">Color Mode</label>
                <div class="style-option-grid">
                  <button class="style-option active" data-color-mode="random">🎨 Random</button>
                  <button class="style-option" data-color-mode="rgb">🌈 RGB</button>
                  <button class="style-option" data-color-mode="mono">⚫ Monochrome</button>
                  <button class="style-option" data-color-mode="custom">🎯 Custom</button>
                </div>
              </div>

              <div class="control-group" id="customColorGroup" style="display: none;">
                <label class="control-label">Pick Color</label>
                <div class="color-picker-wrapper">
                  <input type="color" id="customColor" class="color-picker-input" value="#2180a8">
                  <span id="colorValue"
                        style="font-size: 12px; color: var(--color-text-secondary);">#2180a8</span>
                </div>
              </div>

              <div class="control-group">
                <label class="control-label">Design Style</label>
                <div class="style-option-grid">
                  <button class="style-option active" data-design="riley">Bridget Riley</button>
                  <button class="style-option" data-design="stijl">De Stijl</button>
                  <button class="style-option" data-design="bauhaus">Bauhaus</button>
                  <button class="style-option" data-design="constructivist">Constructivist</button>
                  <button class="style-option" data-design="minimalist">Minimalist</button>
                </div>
              </div>

              <div class="control-group">
                <label class="control-label">Size: <span id="sizeValue">10</span>px</label>
                <input type="range" id="logoSize" class="control-input" min="5" max="20" value="10">
              </div>

              <div class="control-group">
                <label class="control-label">Background</label>
                <select id="logoBg" class="control-input">
                  <option value="transparent">Transparent</option>
                  <option value="white">White</option>
                  <option value="light">Light</option>
                </select>
              </div>

              <div class="control-group">
                <label class="control-label">Decorations (multiple select)</label>
                <div class="style-option-grid">
                  <button class="style-option active"
                          data-decoration="none" data-decoration-toggle="false">None</button>
                  <button class="style-option"
                          data-decoration="underline" data-decoration-toggle="true">Underline</button>
                  <button class="style-option"
                          data-decoration="overline" data-decoration-toggle="true">Overline</button>
                  <button class="style-option"
                          data-decoration="frame" data-decoration-toggle="true">Frame</button>
                  <button class="style-option"
                          data-decoration="shadow" data-decoration-toggle="true">Shadow</button>
                  <button class="style-option"
                          data-decoration="glow" data-decoration-toggle="true">Glow</button>
                </div>
              </div>

              <div class="control-group">
                <label class="control-label">Animation</label>
                <div class="style-option-grid">
                  <button class="style-option active" data-animation="none">None</button>
                  <button class="style-option" data-animation="pulse">Pulse</button>
                  <button class="style-option" data-animation="flicker">Flicker</button>
                  <button class="style-option" data-animation="wave">Wave</button>
                  <button class="style-option" data-animation="float">Float</button>
                </div>
              </div>

              <div class="control-group">
                <label class="control-label">Alignment</label>
                <div class="style-option-grid">
                  <button class="style-option active" data-alignment="center">⬅️➡️ Center</button>
                  <button class="style-option" data-alignment="left">⬅️ Left</button>
                  <button class="style-option" data-alignment="right">➡️ Right</button>
                  <button class="style-option" data-alignment="justify">↔️ Justify</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Export Controls -->
          <div class="section full-width">
            <h2><span class="section-icon">📥</span> Export</h2>
            <div class="button-controls">
              <button class="btn btn--success" id="downloadSvg">⬇️ Download SVG</button>
              <button class="btn" id="copySvgCode">📋 Copy SVG Code</button>
            </div>
          </div>
        </div>

        <!-- SYMBOLS TAB -->
        <div id="symbols" class="tab-content">
          <div class="main-grid">
            <!-- Text Area Section -->
            <div class="section full-width">
              <h2><span class="section-icon">✎</span> Your Text</h2>
              <textarea id="symbolOutputText"
                        placeholder="Click any symbol to insert it!"></textarea>
              <div class="button-controls">
                <button class="btn btn--success" id="symbolCopyBtn">📋 Copy All</button>
                <button class="btn" id="symbolSelectBtn">◉ Select All</button>
                <button class="btn btn--danger" id="symbolClearBtn">✕ Clear</button>
              </div>
            </div>

            <!-- Symbols Grid Container -->
            <div id="symbolsContainer" class="full-width"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Toolbar -->
    <div class="float-toolbar">
      <button class="float-toggle active"
              onclick="toggleWindow('mainWindow')" title="Main Window">🎨</button>
      <button class="float-toggle"
              onclick="toggleWindow('statsWindow')" title="Stats">📊</button>
    </div>

    <div class="copy-feedback" id="copyFeedback">✓ Copied to clipboard!</div>
  `;

  document.documentElement.appendChild(container);

  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('app.js');
  document.documentElement.appendChild(script);
}

function toggleStylizer() {
  injectStylizer();
  const win = document.getElementById('mainWindow');
  if (!win) return;
  win.style.display = (win.style.display === 'none') ? 'block' : 'none';
}

function stylizeSelection(style) {
  const el = document.activeElement;
  if (!el) return;

  const tag = el.tagName.toLowerCase();
  if (tag !== 'input' && tag !== 'textarea') return;
  if (el.type &&
      el.type !== 'text' &&
      el.type !== 'search' &&
      el.type !== 'email' &&
      el.type !== 'url') return;

  const start = el.selectionStart;
  const end = el.selectionEnd;
  if (start == null || end == null || start === end) return;

  const original = el.value;
  const selected = original.slice(start, end);

  const map = window.textStyles;
  if (!map || !map[style]) return;

  const styled = map[style](selected);

  el.value = original.slice(0, start) + styled + original.slice(end);
  const newEnd = start + styled.length;
  el.selectionStart = el.selectionEnd = newEnd;
}

// Messages from background.js
chrome.runtime.onMessage.addListener((msg) => {
  console.log('content got message:', msg);
  if (msg.type === 'TOGGLE_STYLIZER') {
    toggleStylizer();
  } else if (msg.type === 'STYLIZE_SELECTION') {
    stylizeSelection(msg.style);
  }
});
