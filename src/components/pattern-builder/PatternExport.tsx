import React from 'react';
import { PiDownload, PiPrinter, PiCopy } from 'react-icons/pi';
import type { Round, Stitch } from '../../types/pattern';

interface PatternExportProps {
  rounds: Round[];
}

function formatStitchPattern(stitches: Stitch[]): string {
  const groups: { type: string; count: number }[] = [];
  let currentGroup = { type: '', count: 0 };

  stitches.forEach((stitch) => {
    if (stitch.type === currentGroup.type) {
      currentGroup.count += stitch.count;
    } else {
      if (currentGroup.type) {
        groups.push({ type: currentGroup.type, count: currentGroup.count });
      }
      currentGroup = { type: stitch.type, count: stitch.count };
    }
  });
  if (currentGroup.type) {
    groups.push({ type: currentGroup.type, count: currentGroup.count });
  }

  const totalStitches = stitches.reduce((sum, stitch) => {
    if (stitch.type === 'inc') return sum + (stitch.count * 2);
    if (stitch.type === 'dec') return sum + Math.ceil(stitch.count / 2);
    return sum + stitch.count;
  }, 0);

  const repeatingPattern = detectRepeatingPattern(groups);
  if (repeatingPattern) {
    return `${repeatingPattern} (${totalStitches} sts)`;
  }

  const pattern = groups.map(g => `${g.count} ${g.type.toUpperCase()}`).join(', ');
  return `${pattern} (${totalStitches} sts)`;
}

function detectRepeatingPattern(groups: { type: string; count: number }[]): string | null {
  const commonPatterns = [
    { pattern: ['sc', 'inc'], minRepeat: 3 },
    { pattern: ['sc', 'sc', 'inc'], minRepeat: 2 },
    { pattern: ['sc', 'sc', 'sc', 'inc'], minRepeat: 2 },
  ];

  for (const { pattern, minRepeat } of commonPatterns) {
    const patternLength = pattern.length;
    if (groups.length % patternLength === 0) {
      const repetitions = groups.length / patternLength;
      if (repetitions >= minRepeat) {
        let matches = true;
        for (let i = 0; i < groups.length; i++) {
          if (groups[i].type !== pattern[i % patternLength]) {
            matches = false;
            break;
          }
        }
        if (matches) {
          const patternText = pattern.map((type, i) => 
            `${groups[i].count} ${type.toUpperCase()}`
          ).join(', ');
          return `(${patternText}) * repeat around`;
        }
      }
    }
  }
  return null;
}

function formatRoundText(round: Round, index: number): string {
  const roundNum = `R${index + 1}`;
  const pattern = formatStitchPattern(round.stitches);
  const notes = round.notes ? ` // ${round.notes}` : '';
  return `${roundNum}: ${pattern}${notes}`;
}

function detectRepeatedRounds(rounds: Round[]): { text: string; rounds: number[] }[] {
  const repeatedSections: { text: string; rounds: number[] }[] = [];
  let currentRepeat: number[] = [];
  let lastPattern = '';

  rounds.forEach((round, index) => {
    const currentPattern = formatStitchPattern(round.stitches);
    
    if (currentPattern === lastPattern) {
      if (currentRepeat.length === 0) {
        currentRepeat.push(index - 1);
      }
      currentRepeat.push(index);
    } else {
      if (currentRepeat.length > 1) {
        repeatedSections.push({
          text: `R${currentRepeat[0] + 1} - R${currentRepeat[currentRepeat.length - 1] + 1}: ${lastPattern}`,
          rounds: currentRepeat
        });
      }
      currentRepeat = [];
    }
    lastPattern = currentPattern;
  });

  if (currentRepeat.length > 1) {
    repeatedSections.push({
      text: `R${currentRepeat[0] + 1} - R${currentRepeat[currentRepeat.length - 1] + 1}: ${lastPattern}`,
      rounds: currentRepeat
    });
  }

  return repeatedSections;
}

function PatternExport({ rounds }: PatternExportProps) {
  const generatePatternText = () => {
    const repeatedSections = detectRepeatedRounds(rounds);
    const usedRounds = new Set(repeatedSections.flatMap(s => s.rounds));
    
    const formattedRounds: string[] = [];
    
    rounds.forEach((round, index) => {
      if (!usedRounds.has(index)) {
        formattedRounds.push(formatRoundText(round, index));
      }
    });

    repeatedSections.forEach(section => {
      formattedRounds.splice(section.rounds[0], section.rounds.length, section.text);
    });

    return formattedRounds.join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatePatternText());
  };

  const handleDownload = () => {
    const blob = new Blob([generatePatternText()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crochet-pattern.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Crochet Pattern</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
              .round { margin-bottom: 10px; }
              .notes { color: #666; font-style: italic; margin-left: 20px; }
            </style>
          </head>
          <body>
            <h1>Crochet Pattern</h1>
            <pre>${generatePatternText()}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="mt-6 flex space-x-2">
      <button
        onClick={handleCopy}
        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
      >
        <PiCopy className="w-4 h-4 mr-2" />
        Copy
      </button>
      <button
        onClick={handleDownload}
        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
      >
        <PiDownload className="w-4 h-4 mr-2" />
        Download
      </button>
      <button
        onClick={handlePrint}
        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
      >
        <PiPrinter className="w-4 h-4 mr-2" />
        Print
      </button>
    </div>
  );
}

export default PatternExport;