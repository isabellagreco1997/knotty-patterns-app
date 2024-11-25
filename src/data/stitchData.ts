interface Stitch {
    name: string;
    slug: string;
    abbreviation: string;
    description: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    height: string;
    steps: string[];
    tips: string[];
    commonMistakes?: string[];
    videoUrl?: string;
    usedFor?: string[];
    relatedStitches?: string[];
  }
  
  export const stitchData: Stitch[] = [
    {
      name: 'Chain Stitch',
      slug: 'chain-stitch',
      abbreviation: 'ch',
      description: 'The foundation of most crochet projects. Creates a chain of loops that other stitches can be worked into.',
      category: 'Basic Stitches',
      difficulty: 'beginner',
      height: 'Foundation stitch',
      steps: [
        'Make a slip knot and place it on your hook',
        'Yarn over (wrap the yarn around your hook)',
        'Pull the yarn through the loop on your hook',
        'Repeat steps 2-3 for desired length'
      ],
      tips: [
        'Keep your tension consistent for even chains',
        'Count your chains carefully - a common source of mistakes',
        'Don\'t make your chains too tight',
        'Mark your starting chain with a stitch marker for longer projects'
      ],
      commonMistakes: [
        'Chains too tight or too loose',
        'Miscounting chains',
        'Twisting the chain',
        'Forgetting to count the slip knot as a chain'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=7v-mssy5rKU',
      usedFor: [
        'Starting most crochet projects',
        'Creating spaces in patterns',
        'Making button loops',
        'Foundation for most crochet projects',
        'Creating decorative edging'
      ],
      relatedStitches: ['sc', 'sl st', 'fsc']
    },
    {
      name: 'Single Crochet',
      slug: 'single-crochet',
      abbreviation: 'sc',
      description: 'A basic stitch that creates a tight, solid fabric. Perfect for amigurumi and projects requiring sturdiness.',
      category: 'Basic Stitches',
      difficulty: 'beginner',
      height: 'Short',
      steps: [
        'Insert hook into the next stitch',
        'Yarn over',
        'Pull through stitch (2 loops on hook)',
        'Yarn over',
        'Pull through both loops'
      ],
      tips: [
        'Keep your tension even',
        'Make sure to work into the correct stitch',
        'Count your stitches regularly',
        'Use stitch markers for the first and last stitch of rows'
      ],
      commonMistakes: [
        'Skipping stitches',
        'Working too tightly',
        'Missing the turning chain',
        'Increasing or decreasing accidentally'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=aAxGTnVNJiE',
      usedFor: [
        'Amigurumi',
        'Sturdy fabric for bags',
        'Washcloths and dishcloths',
        'Dense fabric projects',
        'Borders and edging'
      ],
      relatedStitches: ['hdc', 'dc', 'sl st']
    },
    // Add more stitches following the same pattern...
  ];