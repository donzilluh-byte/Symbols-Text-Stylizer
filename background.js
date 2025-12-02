// content.js

let stylizerInjected = false;

function injectStylizer() {
  if (stylizerInjected) return;
  stylizerInjected = true;

  // Create container
  const container = document.createElement("div");
  container.id = "symbols-text-stylizer-root";

  // Minimal HTML shell using your existing body markup
  container.innerHTML = `
    <div class="floating-window active" id="mainWindow">
      <!-- paste everything that is currently inside <body> ... </body> EXCEPT scripts -->
      <!-- i.e., your floating window, tabs, sections, toolbar, copy-feedback, etc. -->
      ${/* keep exactly the markup you showed (mainWindow, toolbar, copy-feedback) */""}
    </div>
    <div class="float-toolbar">
      <button class="float-toggle active" onclick="toggleWindow('mainWindow')" title="Main Window">🎨</button>
      <button class="float-toggle" onclick="toggleWindow('statsWindow')" title="Stats">📊</button>
    </div>
    <div class="copy-feedback" id="copyFeedback">✓ Copied to clipboard!</div>
  `;

  document.documentElement.appendChild(container);

  // Inject your existing JS
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("app.js");
  document.documentElement.appendChild(script);
}

// Toggle show/hide using your existing CSS class
function toggleStylizer() {
  injectStylizer();
  const mainWindow = document.getElementById("mainWindow");
  if (!mainWindow) return;
  mainWindow.classList.toggle("active");
}

// Listen to messages from background
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "TOGGLE_STYLIZER") {
    toggleStylizer();
  }
});
