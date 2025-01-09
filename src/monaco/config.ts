export const monacoConfig = {
  language: 'wa',
  fontSize: 13,
  glyphMargin: false,
  automaticLayout: true,
  folding: false,
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
