import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiDownload, PiPrinter, PiCopy, PiFilePdf, PiSparkle } from 'react-icons/pi';
import { useSubscriptionStatus } from '../../hooks/useSubscriptionStatus';
import type { Round, Pattern } from '../../types/pattern';
import jsPDF from 'jspdf';
interface PatternExportProps {
  pattern: Pattern;
  rounds: Round[];
}

const translations = {
  round: 'Round',
  stitches: 'sts',
  inc: 'inc',
  dec: 'dec',
};

function formatPatternHeader(pattern: Pattern): string {
  let header = `${pattern.name}\n\n`;
  
  if (pattern.description) {
    header += `${pattern.description}\n\n`;
  }
  
  header += 'Materials:\n';
  header += `• Hook Size: ${pattern.hookSize}\n`;
  header += `• Yarn Weight: ${pattern.yarnWeight}\n`;
  
  if (pattern.gauge) {
    header += `• Gauge: ${pattern.gauge}\n`;
  }
  
  if (pattern.materials?.length) {
    pattern.materials.forEach(material => {
      header += `• ${material}\n`;
    });
  }
  
  header += `\nDifficulty: ${pattern.difficulty}\n\n`;
  
  return header;
}

function formatRoundInstructions(round: Round): string {
  if (round.isText) {
    return round.notes || '';
  }

  const stitchPattern = round.stitches.map(s => {
    const note = s.note || {};
    const parts = [];

    if (note.beforeNote) parts.push(note.beforeNote);
    if (note.before) parts.push(note.before);

    if (s.type === 'skip') {
      const skipType = note.skipType || 'sc';
      parts.push(`skip ${s.count} ${skipType}`);
    } else {
      parts.push(`${s.count} ${s.type}`);
    }

    if (note.after) parts.push(note.after);
    if (note.afterNote) parts.push(note.afterNote);

    return parts.join(' ');
  }).join(', ');

  const totalStitches = calculateTotalStitches(round);
  return `${stitchPattern} (${totalStitches} ${translations.stitches})`;
}

function calculateTotalStitches(round: Round): number {
  if (round.isText) return 0;

  return round.stitches.reduce((total, stitch) => {
    if (stitch.type === 'skip') return total;
    if (stitch.type === 'inc') return total + (stitch.count * 2);
    if (stitch.type === 'dec') return total + Math.ceil(stitch.count / 2);
    return total + stitch.count;
  }, 0);
}

function getRoundNumber(rounds: Round[], currentIndex: number): number {
  return rounds.slice(0, currentIndex + 1).filter(r => !r.isText).length;
}

function generateFormattedPattern(pattern: Pattern): string {
  let formattedContent = formatPatternHeader(pattern);

  pattern.sections.forEach((section) => {
    formattedContent += `${section.name}\n\n`;

    section.rounds.forEach((round, index) => {
      if (round.headerNote) {
        formattedContent += `${round.headerNote}\n`;
      }

      if (round.isText) {
        formattedContent += `${round.notes}\n`;
      } else {
        const roundNum = getRoundNumber(section.rounds, index);
        formattedContent += `${translations.round} ${roundNum}: ${formatRoundInstructions(round)}`;
      }

      if (round.footerNote) {
        formattedContent += `\n${round.footerNote}`;
      }

      formattedContent += '\n\n';
    });

    formattedContent += '\n';
  });

  return formattedContent.trim();
}

function generatePDF(pattern: Pattern): jsPDF {
  const pdf = new jsPDF({
    unit: 'in',
    format: 'letter'
  });

  pdf.setFont('helvetica', 'normal');
  
  // Title
  pdf.setFontSize(24);
  pdf.text(pattern.name, 1, 1);
  
  // Content
  pdf.setFontSize(12);
  const content = generateFormattedPattern(pattern);
  const lines = content.split('\n');
  let y = 1.5;
  
  lines.forEach(line => {
    if (y > 10) {
      pdf.addPage();
      y = 1;
    }
    
    const textLines = pdf.splitTextToSize(line, 6.5);
    textLines.forEach(textLine => {
      pdf.text(textLine, 1, y);
      y += 0.2;
    });
    y += 0.1;
  });

  return pdf;
}

function PDFPreviewModal({ isOpen, onClose, pattern }: { isOpen: boolean; onClose: () => void; pattern: Pattern }) {
  if (!isOpen) return null;

  const content = generateFormattedPattern(pattern);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">PDF Preview</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-auto p-8 bg-white shadow-inner">
          <div className="max-w-[8.5in] mx-auto bg-white whitespace-pre-wrap font-serif">
            {content.split('\n').map((line, i) => (
              <p key={i} className="leading-relaxed">
                {line || <br />}
              </p>
            ))}
          </div>
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PatternExport({ pattern }: PatternExportProps) {
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const { status: subscriptionStatus } = useSubscriptionStatus();
  const isPremium = subscriptionStatus === 'active';

  const handleCopy = () => {
    const content = generateFormattedPattern(pattern);
    navigator.clipboard.writeText(content);
  };

  const handleDownload = () => {
    if (!isPremium) return;
    const pdf = generatePDF(pattern);
    pdf.save('crochet-pattern.pdf');
  };

  const handlePrint = () => {
    if (!isPremium) return;
    const pdf = generatePDF(pattern);
    pdf.autoPrint();
    window.open(pdf.output('bloburl'), '_blank');
  };

  const PremiumFeatureButton = ({ onClick, icon, text }: { onClick: () => void, icon: React.ReactNode, text: string }) => (
    <div className="group relative">
      <Link
        to="/pricing"
        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
      >
        {icon}
        {text}
      </Link>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Available with Premium
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="border-8 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
        >
          <PiCopy className="w-4 h-4 mr-2" />
          Copy
        </button>

        {isPremium ? (
          <>
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              <PiDownload className="w-4 h-4 mr-2" />
              Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              <PiPrinter className="w-4 h-4 mr-2" />
              Print
            </button>
            <button
              onClick={() => setShowPDFPreview(true)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              <PiFilePdf className="w-4 h-4 mr-2" />
              PDF Preview
            </button>
          </>
        ) : (
          <>
            <PremiumFeatureButton
              onClick={() => {}}
              icon={<PiDownload className="w-4 h-4 mr-2" />}
              text="Download PDF"
            />
            <PremiumFeatureButton
              onClick={() => {}}
              icon={<PiPrinter className="w-4 h-4 mr-2" />}
              text="Print"
            />
            <PremiumFeatureButton
              onClick={() => {}}
              icon={<PiFilePdf className="w-4 h-4 mr-2" />}
              text="PDF Preview"
            />
          </>
        )}
      </div>

      {isPremium && (
        <PDFPreviewModal
          isOpen={showPDFPreview}
          onClose={() => setShowPDFPreview(false)}
          pattern={pattern}
        />
      )}
    </>
  );
}