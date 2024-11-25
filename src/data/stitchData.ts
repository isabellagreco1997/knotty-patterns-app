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
      relatedStitches: ['single-crochet', 'slip-stitch', 'foundation-single-crochet']
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
      relatedStitches: ['half-double-crochet', 'double-crochet', 'slip-stitch']
    },
    {
      name: 'Double Crochet',
      slug: 'double-crochet',
      abbreviation: 'dc',
      description: 'A taller stitch that creates a more open, drapey fabric. Great for blankets and garments.',
      category: 'Basic Stitches',
      difficulty: 'beginner',
      height: 'Tall',
      steps: [
        'Yarn over',
        'Insert hook into next stitch',
        'Yarn over and pull through stitch (3 loops on hook)',
        'Yarn over and pull through 2 loops (2 loops on hook)',
        'Yarn over and pull through remaining 2 loops'
      ],
      tips: [
        'Remember to yarn over before inserting hook',
        'Keep tension consistent throughout the stitch',
        'Pay attention to your turning chains',
        'Practice the rhythm of the stitch'
      ],
      commonMistakes: [
        'Forgetting initial yarn over',
        'Inconsistent tension',
        'Wrong turning chain height',
        'Skipping stitches'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=5xKssKskNzo',
      usedFor: [
        'Blankets',
        'Sweaters',
        'Shawls',
        'Open-work patterns',
        'Quick-working projects'
      ],
      relatedStitches: ['half-double-crochet', 'treble-crochet', 'single-crochet']
    },
    {
      name: 'Half Double Crochet',
      slug: 'half-double-crochet',
      abbreviation: 'hdc',
      description: 'A medium-height stitch that provides a nice balance between single and double crochet.',
      category: 'Basic Stitches',
      difficulty: 'beginner',
      height: 'Medium',
      steps: [
        'Yarn over',
        'Insert hook into next stitch',
        'Yarn over and pull through stitch (3 loops on hook)',
        'Yarn over and pull through all 3 loops'
      ],
      tips: [
        'Watch your tension on the final pull-through',
        'Keep track of the third loop',
        'Use stitch markers for row beginnings',
        'Practice consistent tension'
      ],
      commonMistakes: [
        'Pulling too tight on final step',
        'Forgetting initial yarn over',
        'Working into wrong loops',
        'Inconsistent tension'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=wLqHPO3IDAg',
      usedFor: [
        'Hats',
        'Scarves',
        'Baby items',
        'Textured patterns',
        'Borders'
      ],
      relatedStitches: ['single-crochet', 'double-crochet']
    },
    {
      name: 'Treble Crochet',
      slug: 'treble-crochet',
      abbreviation: 'tr',
      description: 'An extra tall stitch that creates a very open, lacy fabric. Perfect for creating dramatic height and openwork patterns.',
      category: 'Basic Stitches',
      difficulty: 'intermediate',
      height: 'Extra Tall',
      steps: [
        'Yarn over twice',
        'Insert hook into next stitch',
        'Yarn over and pull through stitch (4 loops on hook)',
        'Yarn over and pull through 2 loops (3 loops on hook)',
        'Yarn over and pull through 2 loops (2 loops on hook)',
        'Yarn over and pull through remaining 2 loops'
      ],
      tips: [
        'Count your yarn overs at the start',
        'Maintain even tension through all steps',
        'Use a longer turning chain (4 chains)',
        'Practice the rhythm of working through loops'
      ],
      commonMistakes: [
        'Missing one of the initial yarn overs',
        'Losing track of loop sequence',
        'Incorrect turning chain height',
        'Uneven tension in tall stitches'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=2X4A7E4rKLE',
      usedFor: [
        'Lacy shawls',
        'Summer garments',
        'Decorative edgings',
        'Open-work patterns',
        'Statement pieces'
      ],
      relatedStitches: ['double-crochet', 'double-treble-crochet']
    },
    {
      name: 'Slip Stitch',
      slug: 'slip-stitch',
      abbreviation: 'sl st',
      description: 'The shortest and flattest of all crochet stitches, used for joining, seaming, and creating subtle texture.',
      category: 'Basic Stitches',
      difficulty: 'beginner',
      height: 'Very Short',
      steps: [
        'Insert hook into next stitch',
        'Yarn over',
        'Pull yarn through both the stitch and the loop on your hook in one motion'
      ],
      tips: [
        'Keep stitches loose for easier working',
        'Use for invisible seaming',
        'Great for color changes',
        'Can create interesting textures when worked in rows'
      ],
      commonMistakes: [
        'Working too tightly',
        'Skipping stitches',
        'Inconsistent tension',
        'Confusing with single crochet'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=AFk-fdAowbY',
      usedFor: [
        'Joining rounds',
        'Seaming pieces together',
        'Creating subtle texture',
        'Moving yarn position',
        'Finishing edges'
      ],
      relatedStitches: ['single-crochet', 'chain-stitch']
    },
    {
      name: 'Shell Stitch',
      slug: 'shell-stitch',
      abbreviation: 'shell',
      description: 'A decorative stitch pattern made by working multiple stitches into the same stitch, creating a fan or shell shape.',
      category: 'Decorative Stitches',
      difficulty: 'intermediate',
      height: 'Variable',
      steps: [
        'Skip specified number of stitches',
        'Work 5 double crochet stitches into same stitch',
        'Skip specified number of stitches',
        'Single crochet into next stitch',
        'Repeat pattern'
      ],
      tips: [
        'Maintain even spacing between shells',
        'Keep consistent stitch count in each shell',
        'Watch your tension for uniform shells',
        'Use stitch markers to track pattern repeat'
      ],
      commonMistakes: [
        'Uneven shell sizes',
        'Incorrect stitch spacing',
        'Losing pattern rhythm',
        'Inconsistent stitch count in shells'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=R3u-94QzOFE',
      usedFor: [
        'Decorative edges',
        'Baby blankets',
        'Shawls',
        'Fashion accessories',
        'Home decor items'
      ],
      relatedStitches: ['double-crochet', 'v-stitch', 'fan-stitch']
    },
    {
      name: 'Popcorn Stitch',
      slug: 'popcorn-stitch',
      abbreviation: 'pc',
      description: 'A dimensional stitch that creates raised, bubble-like clusters by working multiple stitches into the same stitch and joining them at the top.',
      category: 'Textured Stitches',
      difficulty: 'advanced',
      height: 'Dimensional',
      steps: [
        'Work 5 double crochet stitches into same stitch',
        'Remove hook from last stitch',
        'Insert hook into first double crochet',
        'Pick up dropped loop',
        'Pull through first stitch'
      ],
      tips: [
        'Keep tension loose enough to work into same stitch',
        'Don\'t pull too tight when joining',
        'Use stitch markers for complex patterns',
        'Practice maintaining even popcorn sizes'
      ],
      commonMistakes: [
        'Popcorns too tight or loose',
        'Uneven popcorn sizes',
        'Losing stitch count',
        'Incorrect joining technique'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=vJxZYL1pG8I',
      usedFor: [
        'Textured blankets',
        'Winter accessories',
        'Children\'s items',
        'Decorative panels',
        'Statement pieces'
      ],
      relatedStitches: ['puff-stitch', 'bobble-stitch', 'cluster-stitch']
    },
    {
      name: 'Puff Stitch',
      slug: 'puff-stitch',
      abbreviation: 'puff',
      description: 'A decorative stitch that creates a raised, puffy texture by working multiple yarn overs into the same stitch.',
      category: 'Textured Stitches',
      difficulty: 'intermediate',
      height: 'Dimensional',
      steps: [
        'Yarn over',
        'Insert hook into stitch',
        'Yarn over and pull up a loop (3 loops on hook)',
        'Repeat steps 1-3 three more times in same stitch',
        'Yarn over and pull through all loops on hook'
      ],
      tips: [
        'Pull up loops to same height',
        'Don\'t pull final yarn over too tight',
        'Use stitch markers between puffs',
        'Maintain consistent loop height'
      ],
      commonMistakes: [
        'Uneven loop heights',
        'Too tight final pull-through',
        'Inconsistent puff sizes',
        'Wrong number of loops'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=G_-ZXWADEi8',
      usedFor: [
        'Textured blankets',
        'Decorative edges',
        'Winter accessories',
        'Home decor',
        'Fashion items'
      ],
      relatedStitches: ['popcorn-stitch', 'bobble-stitch', 'cluster-stitch']
    },
    {
      name: 'Front Post Double Crochet',
      slug: 'front-post-double-crochet',
      abbreviation: 'fpdc',
      description: 'A textural stitch worked around the post of the stitch below from front to back, creating raised vertical lines.',
      category: 'Textured Stitches',
      difficulty: 'intermediate',
      height: 'Tall',
      steps: [
        'Yarn over',
        'Insert hook from front to back around post of stitch below',
        'Yarn over and pull up a loop',
        'Complete as regular double crochet'
      ],
      tips: [
        'Maintain consistent tension',
        'Work around entire post of stitch',
        'Keep stitches loose enough',
        'Watch your pattern rhythm'
      ],
      commonMistakes: [
        'Working too tightly',
        'Incorrect post placement',
        'Losing stitch count',
        'Inconsistent tension'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=jW8cLPXGA9g',
      usedFor: [
        'Cable patterns',
        'Ribbing',
        'Textured panels',
        'Sweaters',
        'Winter accessories'
      ],
      relatedStitches: ['back-post-double-crochet', 'double-crochet', 'front-post-treble']
    },
    {
        name: 'Back Post Double Crochet',
        slug: 'back-post-double-crochet',
        abbreviation: 'bpdc',
        description: 'Similar to front post double crochet but worked from back to front, creating recessed vertical lines.',
        category: 'Textured Stitches',
        difficulty: 'intermediate',
        height: 'Tall',
        steps: [
          'Yarn over',
          'Insert hook from back to front around post of stitch below',
          'Yarn over and pull up a loop',
          'Complete as regular double crochet'
        ],
        tips: [
          'Work in conjunction with front post stitches for ribbing',
          'Keep tension consistent',
          'Watch stitch placement carefully',
          'Practice maintaining stitch height'
        ],
        commonMistakes: [
          'Incorrect post placement',
          'Inconsistent tension',
          'Working too tightly',
          'Mixing up front and back post stitches'
        ],
        videoUrl: 'https://www.youtube.com/watch?v=jW8cLPXGA9g',
        usedFor: [
          'Ribbing patterns',
          'Textured fabrics',
          'Cable designs',
          'Sweaters',
          'Winter accessories'
        ],
        relatedStitches: ['front-post-double-crochet', 'double-crochet', 'back-post-treble']
      },
      {
        name: 'Bobble Stitch',
        slug: 'bobble-stitch',
        abbreviation: 'bob',
        description: 'A dimensional stitch that creates small, rounded bumps by working several unfinished double crochet stitches together.',
        category: 'Textured Stitches',
        difficulty: 'intermediate',
        height: 'Dimensional',
        steps: [
          'Work 5 incomplete double crochet stitches into same stitch',
          'Yarn over',
          'Pull through all loops on hook',
          'Chain 1 to secure'
        ],
        tips: [
          'Keep bobbles same size',
          'Don\'t pull securing chain too tight',
          'Space bobbles evenly',
          'Work into correct loops of previous row'
        ],
        commonMistakes: [
          'Uneven bobble sizes',
          'Too tight securing chain',
          'Incorrect stitch count',
          'Poor spacing'
        ],
        videoUrl: 'https://www.youtube.com/watch?v=H_QX9YG8_Y8',
        usedFor: [
          'Textured blankets',
          'Children\'s items',
          'Decorative borders',
          'Winter accessories',
          'Home decor'
        ],
        relatedStitches: ['popcorn-stitch', 'puff-stitch', 'cluster-stitch']
      },
      {
        name: 'V-Stitch',
        slug: 'v-stitch',
        abbreviation: 'v-st',
        description: 'A decorative stitch made by working two double crochet stitches with a chain space between them, creating a V shape.',
        category: 'Decorative Stitches',
        difficulty: 'beginner',
        height: 'Tall',
        steps: [
          'Double crochet in indicated stitch',
          'Chain 1',
          'Double crochet in same stitch',
          'Skip next stitch(es)',
          'Repeat pattern'
        ],
        tips: [
          'Keep chain spaces consistent',
          'Watch stitch spacing',
          'Maintain even tension',
          'Count stitches carefully'
        ],
        commonMistakes: [
          'Inconsistent chain spaces',
          'Wrong stitch spacing',
          'Uneven V shapes',
          'Skipping too many stitches'
        ],
        videoUrl: 'https://www.youtube.com/watch?v=ZweszWVWWz0',
        usedFor: [
          'Lacy patterns',
          'Shawls',
          'Summer garments',
          'Decorative edging',
          'Light blankets'
        ],
        relatedStitches: ['double-crochet', 'shell-stitch', 'fan-stitch']
      },
      {
        name: 'Cluster Stitch',
        slug: 'cluster-stitch',
        abbreviation: 'cl',
        description: 'A textured stitch made by working several incomplete stitches together, similar to a bobble but worked over multiple stitches.',
        category: 'Textured Stitches',
        difficulty: 'advanced',
        height: 'Dimensional',
        steps: [
          'Work first incomplete double crochet',
          'Work second incomplete double crochet in next stitch',
          'Work third incomplete double crochet in next stitch',
          'Yarn over and pull through all loops'
        ],
        tips: [
          'Keep tension loose for easier working',
          'Count incomplete stitches carefully',
          'Maintain consistent cluster size',
          'Watch base stitch placement'
        ],
        commonMistakes: [
          'Inconsistent cluster sizes',
          'Wrong number of incomplete stitches',
          'Too tight tension',
          'Poor stitch placement'
        ],
        videoUrl: 'https://www.youtube.com/watch?v=EmLjwgC2_yc',
        usedFor: [
          'Textured fabrics',
          'Winter garments',
          'Decorative panels',
          'Blankets',
          'Accessories'
        ],
        relatedStitches: ['bobble-stitch', 'popcorn-stitch', 'puff-stitch']
      },
      {
        name: 'Foundation Single Crochet',
        slug: 'foundation-single-crochet',
        abbreviation: 'fsc',
        description: 'A technique that creates the foundation chain and first row of single crochet stitches simultaneously.',
        category: 'Foundation Techniques',
        difficulty: 'intermediate',
        height: 'Short',
        steps: [
          'Chain 2',
          'Insert hook in first chain',
          'Pull up a loop (creates chain)',
          'Yarn over and pull through one loop (secures chain)',
          'Yarn over and pull through both loops (completes single crochet)'
        ],
        tips: [
          'Keep tension consistent',
          'Practice identifying parts of stitch',
          'Work slowly until comfortable',
          'Count stitches carefully'
        ],
        commonMistakes: [
          'Incorrect loop identification',
          'Inconsistent tension',
          'Losing count of stitches',
          'Wrong insertion point'
        ],
        videoUrl: 'https://www.youtube.com/watch?v=SyjAiEhFFYQ',
        usedFor: [
          'Starting projects',
          'Avoiding tight starting chains',
          'Creating stretchy edges',
          'Foundation rows'
        ],
        relatedStitches: ['chain-stitch', 'single-crochet', 'foundation-double-crochet']
      }
  ];