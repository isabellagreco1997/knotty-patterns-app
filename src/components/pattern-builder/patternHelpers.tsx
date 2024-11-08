// Import necessary types
import { Round } from '../types/pattern';

// Define the type for the configuration object
interface PatternStartConfig {
  count: number;
  text: string;
  stitchType: string;
}

// Helper function to generate the first round
export const generateFirstRound = (
  type: 'magic-ring' | 'chain' | 'custom' | 'stitch',
  config: PatternStartConfig
): Round | null => {
  let firstRound: Round;

  switch (type) {
    case 'magic-ring':
      firstRound = {
        id: '1',
        stitches: [
          {
            id: '1',
            type: 'sc',
            count: config.count,
          },
        ],
        notes: `Magic ring with ${config.count} sc (${config.count} sts)`,
      };
      break;
    case 'chain':
      firstRound = {
        id: '1',
        stitches: [
          {
            id: '1',
            type: 'ch',
            count: config.count,
          },
        ],
        notes: `Chain ${config.count} (${config.count} sts)`,
      };
      break;
    case 'stitch':
      firstRound = {
        id: '1',
        stitches: [
          {
            id: '1',
            type: config.stitchType,
            count: config.count,
          },
        ],
        notes: `${config.count} ${config.stitchType} (${config.count} sts)`,
      };
      break;
    case 'custom':
      firstRound = {
        id: '1',
        stitches: [],
        notes: config.text,
        isText: true,
      };
      break;
    default:
      return null;
  }

  return firstRound;
};
