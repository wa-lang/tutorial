export const monacoConfig = {
  fontSize: 14,
  glyphMargin: false,
  automaticLayout: true,
  folding: true,
  lineDecorationsWidth: 10,
  lineNumbersMinChars: 3,
  fontFamily: 'DM Mono, monospace',
  minimap: { enabled: false },
  padding: {
    top: 8,
  },
  overviewRulerLanes: 0,
  fixedOverflowWidgets: true,
}

export const langConfig = {
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"', notIn: ['string', 'comment'] },
    { open: '\'', close: '\'', notIn: ['string', 'comment'] },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: '\'', close: '\'' },
  ],
}
