// Small shared icon vocabulary for the board and its request panel.
const paths = {
  board: '<path d="m3 8 9-5 9 5M4 9h16M5 20h14M7 10v7m5-7v7m5-7v7M3 21h18"/>',
  game: '<path d="M7 8h10a4 4 0 0 1 4 4v5a2 2 0 0 1-3 1l-3-2H9l-3 2a2 2 0 0 1-3-1v-5a4 4 0 0 1 4-4Z"/><path d="M6 12h4m-2-2v4m8-2h.01m2 2h.01"/>',
  theory: '<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15"/>',
  lab: '<path d="M9 3h6m-5 0v7l-6 9a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2l-6-9V3M7 16h10"/>',
  skill: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  other: '<path d="M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 2H9s0-1-1-2Z"/>',
  send: '<path d="m21 3-7 18-4-7-7-4 18-7ZM10 14 21 3"/>',
  chat: '<path d="M21 11a8 8 0 0 1-8 8H7l-4 3V7a4 4 0 0 1 4-4h6a8 8 0 0 1 8 8Z"/><path d="M7 8h10M7 12h7"/>',
  up: '<path d="m6 14 6-6 6 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  reload: '<path d="M20 7a9 9 0 1 0 1 9M20 3v5h-5"/>',
};
export function boardIcon(name) {
  return `<svg class="ai-board-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || paths.other}</svg>`;
}
