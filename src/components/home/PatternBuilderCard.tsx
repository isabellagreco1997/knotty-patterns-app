import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiPencilSimple, PiArrowRight, PiCheck, PiPlayCircle, PiPause, PiPlus, PiMinus, PiDownload, PiCopy } from 'react-icons/pi';
import Mock from '../../../public/mock.png';
import video from '../../../public/video.mp4';

// Video Demo Component
function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    const video = document.getElementById('demo-video') as HTMLVideoElement;
    if (video) {
        video.volume = 0.5;
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video mb-8">
      <video
        id="demo-video"
        className="w-full h-full object-cover"
        src={video}
        poster={Mock}
        loop
        playsInline
      >
        Your browser does not support the video tag.
      </video>
      <button
        onClick={handleVideoClick}
        className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/40 transition-colors group"
      >
        {isPlaying ? (
          <PiPause className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        ) : (
          <PiPlayCircle className="w-16 h-16 text-white" />
        )}
      </button>
     
    </div>
  );
}

// Stitch Controls Component
interface StitchControlsProps {
  selectedStitch: string;
  onStitchSelect: (stitch: string) => void;
}

function StitchControls({ selectedStitch, onStitchSelect }: StitchControlsProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Common Stitches
      </label>
      <div className="flex flex-wrap gap-2">
        {['sc', 'dc', 'hdc', 'inc', 'dec'].map((stitch) => (
          <button
            key={stitch}
            onClick={() => onStitchSelect(stitch)}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              selectedStitch === stitch
                ? 'bg-primary-600 text-white'
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            }`}
          >
            {stitch}
          </button>
        ))}
      </div>
    </div>
  );
}

// Count Controls Component
interface CountControlsProps {
  count: number;
  onCountChange: (count: number) => void;
}

function CountControls({ count, onCountChange }: CountControlsProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Stitch Count
      </label>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onCountChange(Math.max(1, count - 1))}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <PiMinus className="w-4 h-4" />
          </button>
          <span className="text-sm font-mono w-8 text-center">{count}</span>
          <button 
            onClick={() => onCountChange(count + 1)}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <PiPlus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-sm text-gray-500">stitches</span>
      </div>
    </div>
  );
}

// Pattern Preview Component
interface PatternPreviewProps {
  count: number;
  stitch: string;
}

function PatternPreview({ count, stitch }: PatternPreviewProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Pattern Preview
      </label>
      <div className="space-y-2 text-sm text-gray-600 font-mono">
        <div>Magic ring with 6 sc (6)</div>
        <div>Round 1: inc in each st (12)</div>
        <div>Round 2: *sc, inc* repeat 6 times (18)</div>
        <div className="text-primary-600">
          Round 3: {count} {stitch} ({count} sts)
        </div>
      </div>
    </div>
  );
}

// Export Options Component
function ExportOptions() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Export Options
      </label>
      <div className="flex gap-2">
        <button className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm hover:bg-primary-200 transition-colors">
          <PiDownload className="w-4 h-4 mr-1" />
          PDF
        </button>
        <button className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm hover:bg-primary-200 transition-colors">
          <PiCopy className="w-4 h-4 mr-1" />
          Copy
        </button>
      </div>
    </div>
  );
}

// Main Component
export default function PatternBuilderCard() {
  const [stitchCount, setStitchCount] = useState(6);
  const [selectedStitch, setSelectedStitch] = useState('sc');

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden md:m-20 m-6">
      {/* Video Demo at the top */}
      <div className='px-6 md:px-10 pt-6 md:pt-10'> <VideoDemo /></div>
     

      <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left Column - Content */}
        <div className="space-y-8">
          <div>
            <div className="text-primary-500 font-medium mb-4">Professional Pattern Builder</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Create Beautiful Patterns
            </h2>
            <p className="text-lg text-gray-600">
              Design professional crochet patterns with our intuitive builder. Automatic stitch counting, 
              round tracking, and export options make pattern creation a breeze.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Drag-and-drop stitch builder',
              'Automatic stitch counting',
              'Export to PDF and print',
              'Multiple pattern sections',
              'Custom notes & instructions'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <PiCheck className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <Link
            to="/pattern-builder"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <PiPencilSimple className="w-5 h-5 mr-2" />
            Try Pattern Builder
            <PiArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Right Column - Builder Interface */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="space-y-4">
            <StitchControls
              selectedStitch={selectedStitch}
              onStitchSelect={setSelectedStitch}
            />
            <CountControls
              count={stitchCount}
              onCountChange={setStitchCount}
            />
            <PatternPreview
              count={stitchCount}
              stitch={selectedStitch}
            />
            <ExportOptions />
          </div>
        </div>
      </div>
    </div>
  );
}