import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import PatternStarter from '../components/pattern-builder/PatternStarter';
import StitchPanel from '../components/pattern-builder/StitchPanel';
import CurrentRound from '../components/pattern-builder/CurrentRound';
import PatternDisplay from '../components/pattern-builder/PatternDisplay';
import PatternExport from '../components/pattern-builder/PatternExport';
import PatternSettings from '../components/pattern-builder/PatternSettings';
import StitchGuide from '../components/pattern-builder/StitchGuide';
import CrochetPreview from '../components/pattern-builder/CrochetPreview';
import type { Round, Pattern, Stitch } from '../types/pattern';

function PatternBuilder() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [pattern, setPattern] = useState<Pattern>({
    name: 'Untitled Pattern',
    description: '',
    difficulty: 'beginner',
    hookSize: '4.0mm',
    yarnWeight: 'worsted',
    rounds: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: user?.id || '',
  });
  const [currentRound, setCurrentRound] = useState<Round>({
    id: '1',
    stitches: [],
    notes: '',
  });
  const [editingRoundId, setEditingRoundId] = useState<string | null>(null);

  const handlePatternStart = (type: 'magic-ring' | 'chain' | 'custom' | 'stitch', config: { count: number; text: string; stitchType: string }) => {
    let firstRound: Round;

    switch (type) {
      case 'magic-ring':
        firstRound = {
          id: '1',
          stitches: [{
            id: '1',
            type: 'sc',
            count: config.count,
          }],
          notes: `Magic ring with ${config.count} sc (${config.count} sts)`,
        };
        break;
      case 'chain':
        firstRound = {
          id: '1',
          stitches: [{
            id: '1',
            type: 'ch',
            count: config.count,
          }],
          notes: `Chain ${config.count} (${config.count} sts)`,
        };
        break;
      case 'stitch':
        firstRound = {
          id: '1',
          stitches: [{
            id: '1',
            type: config.stitchType,
            count: config.count,
          }],
          notes: `${config.count} ${config.stitchType} (${config.count} sts)`,
        };
        break;
      case 'custom':
        firstRound = {
          id: '1',
          stitches: [],
          notes: config.text,
        };
        break;
      default:
        return;
    }

    setPattern({
      ...pattern,
      rounds: [firstRound]
    });
    setCurrentRound({
      id: '2',
      stitches: [],
      notes: '',
    });
  };

  const addStitch = (type: string) => {
    const newStitch: Stitch = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      count: 1,
    };
    setCurrentRound({
      ...currentRound,
      stitches: [...currentRound.stitches, newStitch],
    });
  };

  const updateStitchCount = (stitchId: string, count: number) => {
    setCurrentRound({
      ...currentRound,
      stitches: currentRound.stitches.map((s) =>
        s.id === stitchId ? { ...s, count } : s
      ),
    });
  };

  const deleteStitch = (stitchId: string) => {
    setCurrentRound({
      ...currentRound,
      stitches: currentRound.stitches.filter((s) => s.id !== stitchId),
    });
  };

  const updateStitchNote = (stitchId: string, note: string) => {
    setCurrentRound({
      ...currentRound,
      stitches: currentRound.stitches.map((s) =>
        s.id === stitchId ? { ...s, note } : s
      ),
    });
  };

  const updateHeaderNote = (note: string) => {
    setCurrentRound({
      ...currentRound,
      headerNote: note,
    });
  };

  const updateFooterNote = (note: string) => {
    setCurrentRound({
      ...currentRound,
      footerNote: note,
    });
  };

  const updateNotes = (notes: string) => {
    setCurrentRound({ ...currentRound, notes });
  };

  const completeRound = (updatedRound: Round) => {
    if (updatedRound.stitches.length === 0) return;
    
    setPattern({
      ...pattern,
      rounds: [...pattern.rounds, updatedRound],
      updatedAt: new Date(),
    });
    setCurrentRound({
      id: (pattern.rounds.length + 2).toString(),
      stitches: [],
      notes: '',
    });
  };

  const editRound = (roundId: string) => {
    const round = pattern.rounds.find(r => r.id === roundId);
    if (round) {
      setEditingRoundId(roundId);
      setCurrentRound(round);
      setPattern({
        ...pattern,
        rounds: pattern.rounds.filter((r) => r.id !== roundId),
      });
    }
  };

  const deleteRound = (roundId: string) => {
    setPattern({
      ...pattern,
      rounds: pattern.rounds.filter((r) => r.id !== roundId),
      updatedAt: new Date(),
    });
  };

  const handleReorderRounds = (startIndex: number, endIndex: number) => {
    const newRounds = Array.from(pattern.rounds);
    const [removed] = newRounds.splice(startIndex, 1);
    newRounds.splice(endIndex, 0, removed);
    setPattern({ ...pattern, rounds: newRounds });
  };

  const handleDuplicateRound = (roundId: string) => {
    const roundToDuplicate = pattern.rounds.find(r => r.id === roundId);
    if (roundToDuplicate) {
      const newRound = {
        ...roundToDuplicate,
        id: `${pattern.rounds.length + 1}`,
        stitches: roundToDuplicate.stitches.map(s => ({ ...s, id: Math.random().toString(36).substr(2, 9) }))
      };
      setPattern({
        ...pattern,
        rounds: [...pattern.rounds, newRound]
      });
    }
  };

  const updatePatternSettings = (settings: Partial<Pattern>) => {
    setPattern({
      ...pattern,
      ...settings,
      updatedAt: new Date(),
    });
  };

  const savePattern = async () => {
    // TODO: Implement pattern saving to backend
    console.log('Saving pattern:', pattern);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <PatternSettings
              pattern={pattern}
              onUpdate={updatePatternSettings}
            />

            {/* Pattern Starter - Always visible */}
            <PatternStarter onStart={handlePatternStart} />

            <StitchPanel onStitchSelect={addStitch} />
            
            <CurrentRound
              round={currentRound}
              onComplete={completeRound}
              onUpdateCount={updateStitchCount}
              onUpdateNotes={updateNotes}
              onDeleteStitch={deleteStitch}
              onUpdateStitchNote={updateStitchNote}
              onUpdateHeaderNote={updateHeaderNote}
              onUpdateFooterNote={updateFooterNote}
            />

            <PatternDisplay
              rounds={pattern.rounds}
              onEdit={editRound}
              onDelete={deleteRound}
              onDuplicate={handleDuplicateRound}
              onReorder={handleReorderRounds}
              language="en"
            />

            <PatternExport rounds={pattern.rounds} />

            <button
              onClick={savePattern}
              className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Save Pattern
            </button>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="space-y-6">
            <CrochetPreview rounds={pattern.rounds} currentRound={currentRound} />
            <StitchGuide />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatternBuilder;