// background.js

chrome.commands.onCommand.addListener((command) => {
  console.log('onCommand:', command);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !tab.id) return;

    if (command === 'toggle-stylizer') {
      chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_STYLIZER' });
    } else if (command === 'stylize-selection-bold') {
      chrome.tabs.sendMessage(tab.id, { type: 'STYLIZE_SELECTION', style: 'bold' });
    } else if (command === 'stylize-selection-cursive') {
      chrome.tabs.sendMessage(tab.id, { type: 'STYLIZE_SELECTION', style: 'cursive' });
    }
  });
});
