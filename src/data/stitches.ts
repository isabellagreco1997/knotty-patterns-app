export const stitchTypes = [
  { id: 'sc', name: 'Single Crochet', abbr: 'sc' },
  { id: 'dc', name: 'Double Crochet', abbr: 'dc' },
  { id: 'hdc', name: 'Half Double Crochet', abbr: 'hdc' },
  { id: 'tr', name: 'Triple Crochet', abbr: 'tr' },
  { id: 'sl-st', name: 'Slip Stitch', abbr: 'sl st' },
  { id: 'ch', name: 'Chain', abbr: 'ch' },
  { id: 'inc', name: 'Increase', abbr: 'inc' },
  { id: 'dec', name: 'Decrease', abbr: 'dec' },
  { id: 'skip', name: 'Skip Stitch', abbr: 'skip' },
  { id: 'fpdc', name: 'Front Post Double Crochet', abbr: 'fpdc' },
  { id: 'bpdc', name: 'Back Post Double Crochet', abbr: 'bpdc' },
  { id: 'shell', name: 'Shell Stitch', abbr: 'shell' },
  { id: 'picot', name: 'Picot', abbr: 'picot' },
];

// Keep track of custom stitches added during the session
export const customStitches = new Set<string>();

export function addCustomStitch(stitch: string) {
  customStitches.add(stitch.toLowerCase());
}