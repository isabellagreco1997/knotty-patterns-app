<diff>@@ -1,1 +1,1 @@
-import React, { useState } from 'react';
+import React from 'react';
@@ -2,1 +2,2 @@
-import { PiBook, PiCaretDown, PiCaretUp, PiYoutubeLogo, PiWarning, PiCheckCircle } from 'react-icons/pi';
+import { PiBook, PiArrowRight } from 'react-icons/pi';
+import { Link } from 'react-router-dom';
@@ -4,0 +5,1 @@
+import { stitchData } from '../data/stitchData';
@@ -6,290 +7,0 @@
-interface StitchCategory {
-  name: string;
-  stitches: {
-    name: string;
-    abbreviation: string;
-    description: string;
-    difficulty: 'beginner' | 'intermediate' | 'advanced';
-    steps: string[];
-    tips: string[];
-    commonMistakes?: string[];
-    videoUrl?: string;
-    usedFor?: string[];
-  }[];
-}
-
-const stitchCategories: StitchCategory[] = [
-  {
-    name: 'Basic Stitches',
-    stitches: [
-      {
-        name: 'Chain Stitch',
-        abbreviation: 'ch',
-        description: 'The foundation of most crochet projects. Creates a chain of loops that other stitches can be worked into.',
-        difficulty: 'beginner',
-        steps: [
-          'Make a slip knot and place it on your hook',
-          'Yarn over (wrap the yarn around your hook)',
-          'Pull the yarn through the loop on your hook',
-          'Repeat steps 2-3 for desired length'
-        ],
-        tips: [
-          'Keep your tension consistent for even chains',
-          'Count your chains carefully - a common source of mistakes',
-          'Don\'t make your chains too tight'
-        ],
-        commonMistakes: [
-          'Chains too tight or too loose',
-          'Miscounting chains',
-          'Twisting the chain'
-        ],
-        videoUrl: 'https://www.youtube.com/watch?v=7v-mssy5rKU',
-        usedFor: [
-          'Starting most crochet projects',
-          'Creating spaces in patterns',
-          'Making button loops'
-        ]
-      },
-      {
-        name: 'Single Crochet',
-        abbreviation: 'sc',
-        description: 'A basic stitch that creates a tight, solid fabric. Perfect for amigurumi.',
-        difficulty: 'beginner',
-        steps: [
-          'Insert hook into the next stitch',
-          'Yarn over',
-          'Pull through stitch (2 loops on hook)',
-          'Yarn over',
-          'Pull through both loops'
-        ],
-        tips: [
-          'Keep your tension even',
-          'Make sure to work into the correct stitch',
-          'Count your stitches regularly'
-        ],
-        commonMistakes: [
-          'Skipping stitches',
-          'Working too tightly',
-          'Missing the turning chain'
-        ],
-        videoUrl: 'https://www.youtube.com/watch?v=aAxGTnVNJiE',
-        usedFor: [
-          'Amigurumi',
-          'Sturdy fabric for bags',
-          'Washcloths and dishcloths'
-        ]
-      },
-      // ... other basic stitches with similar detailed information
-    ]
-  },
-  // ... other categories with similar detailed information
-];
-
-function DifficultyBadge({ difficulty }: { difficulty: 'beginner' | 'intermediate' | 'advanced' }) {
-  const colors = {
-    beginner: 'bg-green-100 text-green-800',
-    intermediate: 'bg-yellow-100 text-yellow-800',
-    advanced: 'bg-red-100 text-red-800'
-  };
-
-  return (
-    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[difficulty]}`}>
-      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
-    </span>
-  );
-}
-
-interface StitchDetailProps {
-  stitch: StitchCategory['stitches'][0];
-  isOpen: boolean;
-  onToggle: () => void;
-}
-
-function StitchDetail({ stitch, isOpen, onToggle }: StitchDetailProps) {
-  return (
-    <div className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
-      <div className="flex items-start justify-between mb-2">
-        <div className="flex-1">
-          <div className="flex items-center justify-between">
-            <div>
-              <h3 className="text-lg font-semibold text-gray-900">
-                {stitch.name}
-              </h3>
-              <p className="text-sm text-primary-600 font-mono">
-                {stitch.abbreviation}
-              </p>
-            </div>
-            <div className="flex items-center space-x-4">
-              <DifficultyBadge difficulty={stitch.difficulty} />
-              <button
-                onClick={onToggle}
-                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
-              >
-                {isOpen ? (
-                  <PiCaretUp className="w-5 h-5 text-gray-500" />
-                ) : (
-                  <PiCaretDown className="w-5 h-5 text-gray-500" />
-                )}
-              </button>
-            </div>
-          </div>
-          <p className="text-gray-600 mt-2">
-            {stitch.description}
-          </p>
-        </div>
-      </div>
-
-      {isOpen && (
-        <div className="mt-4 space-y-6">
-          {/* Steps */}
-          <div>
-            <h4 className="font-medium text-gray-900 mb-2">Steps</h4>
-            <ol className="list-decimal list-inside space-y-2">
-              {stitch.steps.map((step, index) => (
-                <li key={index} className="text-gray-600">
-                  {step}
-                </li>
-              ))}
-            </ol>
-          </div>
-
-          {/* Tips */}
-          <div>
-            <h4 className="font-medium text-gray-900 mb-2">Tips</h4>
-            <ul className="space-y-2">
-              {stitch.tips.map((tip, index) => (
-                <li key={index} className="flex items-start">
-                  <PiCheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
-                  <span className="text-gray-600">{tip}</span>
-                </li>
-              ))}
-            </ul>
-          </div>
-
-          {/* Common Mistakes */}
-          {stitch.commonMistakes && (
-            <div>
-              <h4 className="font-medium text-gray-900 mb-2">Common Mistakes to Avoid</h4>
-              <ul className="space-y-2">
-                {stitch.commonMistakes.map((mistake, index) => (
-                  <li key={index} className="flex items-start">
-                    <PiWarning className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
-                    <span className="text-gray-600">{mistake}</span>
-                  </li>
-                ))}
-              </ul>
-            </div>
-          )}
-
-          {/* Used For */}
-          {stitch.usedFor && (
-            <div>
-              <h4 className="font-medium text-gray-900 mb-2">Common Uses</h4>
-              <ul className="list-disc list-inside space-y-1">
-                {stitch.usedFor.map((use, index) => (
-                  <li key={index} className="text-gray-600">
-                    {use}
-                  </li>
-                ))}
-              </ul>
-            </div>
-          )}
-
-          {/* Video Tutorial */}
-          {stitch.videoUrl && (
-            <div>
-              <a
-                href={stitch.videoUrl}
-                target="_blank"
-                rel="noopener noreferrer"
-                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
-              >
-                <PiYoutubeLogo className="w-5 h-5 mr-2" />
-                Watch Video Tutorial
-              </a>
-            </div>
-          )}
-        </div>
-      )}
-    </div>
-  );
-}
-
@@ -297,1 +8,1 @@
-  const [openStitches, setOpenStitches] = useState<Record<string, boolean>>({});
+  // Group stitches by category
@@ -299,5 +10,8 @@
-  const toggleStitch = (stitchName: string) => {
-    setOpenStitches(prev => ({
-      ...prev,
-      [stitchName]: !prev[stitchName]
-    }));
+  const stitchCategories = stitchData.reduce((acc, stitch) => {
+    if (!acc[stitch.category]) {
+      acc[stitch.category] = [];
+    }
+    acc[stitch.category].push(stitch);
+    return acc;
+  }, {} as Record<string, typeof stitchData>);
@@ -337,1 +51,1 @@
-            {stitchCategories.map((category) => (
+            {Object.entries(stitchCategories).map(([categoryName, stitches]) => (
@@ -339,1 +53,1 @@
-                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
+                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
@@ -341,1 +55,1 @@
-                  {category.name}
+                  {categoryName}
@@ -343,1 +57,1 @@
-                <div className="space-y-8">
+                <div className="grid md:grid-cols-2 gap-6">
@@ -345,7 +59,25 @@
-                  {category.stitches.map((stitch) => (
-                    <StitchDetail
-                      key={stitch.name}
-                      stitch={stitch}
-                      isOpen={openStitches[stitch.name] || false}
-                      onToggle={() => toggleStitch(stitch.name)}
-                    />
+                  {stitches.map((stitch) => (
+                    <Link
+                      key={stitch.slug}
+                      to={`/stitch/${stitch.slug}`}
+                      className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
+                    >
+                      <div className="flex justify-between items-start mb-2">
+                        <div>
+                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
+                            {stitch.name}
+                          </h3>
+                          <p className="text-sm text-primary-600 font-mono">
+                            {stitch.abbreviation}
+                          </p>
+                        </div>
+                        <PiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all" />
+                      </div>
+                      <p className="text-gray-600 line-clamp-2">
+                        {stitch.description}
+                      </p>
+                    </Link>
</diff></file>
</boltArtifact>

I've created:

1. Individual stitch detail pages with comprehensive information
2. A data file containing all stitch information
3. Updated the stitch glossary to show a grid of stitch cards that link to their detail pages
4. Added proper routing for the stitch detail pages

The stitch glossary now serves as an index/overview page, while each stitch has its own dedicated page with full details, making it easier to read and reference speci