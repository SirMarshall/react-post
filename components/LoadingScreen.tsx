import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  isFinishing: boolean;
  onTransitionEnd: () => void;
}

const BOOT_MESSAGES = [
  'Flash BIOS 2.0 Release 25.0',
  'Copyright 2001-2025 Select Electronic Consulting LLC',
  'All Rights Reserved',
  '',
  'CPU = Zilog(tm) Z80 2.5 MHz',
  'Memory Test: 64000K OK',
  '',
  'Initializing Kernel v1.0...',
  'Loading drivers... [OK]',
  'Checking file system... [OK]',
  'Mounting virtual drives... [OK]',
  '',
  'POST Completed with [0] errors',
  'Starting graphical interface...',
];

const PROGRESS_BAR_WIDTH = 50;

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isFinishing, onTransitionEnd }) => {
  // State for typing effect
  const [lines, setLines] = useState<string[]>(Array(BOOT_MESSAGES.length).fill(''));
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  // State for progress bar and exit animation
  const [progress, setProgress] = useState(0);
  const [startExitAnimation, setStartExitAnimation] = useState(false);

  // Typing effect
  useEffect(() => {
    if (typingComplete) return;

    const typingSpeed = 30; // ms

    const typingTimer = setTimeout(() => {
        const lineIdx = currentLineIndex;
        const charIdx = currentCharIndex;
        const currentMessage = BOOT_MESSAGES[lineIdx];

        // This condition handles moving to the progress bar
        if (lineIdx >= BOOT_MESSAGES.length) {
            setTypingComplete(true);
            return;
        }
        
        // Handle empty lines by skipping them instantly
        if (currentMessage.length === 0) {
            setCurrentLineIndex(lineIdx + 1);
            return;
        }

        // Handle end of a line
        if (charIdx >= currentMessage.length) {
            setCurrentLineIndex(lineIdx + 1);
            setCurrentCharIndex(0);
            return;
        }

        // Type the next character
        setLines(prevLines => {
            const newLines = [...prevLines];
            newLines[lineIdx] = currentMessage.substring(0, charIdx + 1);
            return newLines;
        });
        setCurrentCharIndex(charIdx + 1);

    }, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [currentLineIndex, currentCharIndex, typingComplete]);

  // Progress bar effect
  useEffect(() => {
    if (typingComplete) {
      const progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev < 100) {
            return prev + 1;
          }
          clearInterval(progressTimer);
          return 100;
        });
      }, 30);
      return () => clearInterval(progressTimer);
    }
  }, [typingComplete]);
  
  // Exit animation effect
  useEffect(() => {
    if (isFinishing && progress === 100) {
      setStartExitAnimation(true);
      const exitTimer = setTimeout(onTransitionEnd, 1200); // Match animation duration
      return () => clearTimeout(exitTimer);
    }
  }, [isFinishing, progress, onTransitionEnd]);

  const filledBlocks = Math.floor((progress / 100) * PROGRESS_BAR_WIDTH);
  const emptyBlocks = PROGRESS_BAR_WIDTH - filledBlocks;
  const progressBar = `[${'█'.repeat(filledBlocks)}${'-'.repeat(emptyBlocks)}] ${progress}%`;

  return (
    <div
      className={`fixed inset-0 bg-black text-green-400 flex items-center justify-center z-50 transition-opacity duration-300 crt-convex-effect ${startExitAnimation ? 'animate-crt-off' : ''}`}
    >
      {/* CRT Effects Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.4),rgba(0,0,0,0.4)_1px,transparent_1px,transparent_3px)] animate-flicker"></div>
        {/* Moving Scanline - Made more subtle */}
        <div className="absolute left-0 w-full h-1 bg-green-400/10 opacity-60 shadow-[0_0_8px_1px_rgba(50,255,50,0.2)] animate-scanline"></div>
      </div>

      <div className="w-full max-w-4xl p-8 drop-shadow-[0_0_5px_rgba(50,255,50,0.4)] crt-content-magnified">
        {BOOT_MESSAGES.map((_, i) => (
          <p key={i} className="whitespace-pre h-6">
            {lines[i]}
            {/* Show cursor only on the line currently being typed */}
            {i === currentLineIndex && !typingComplete && <span className="animate-blink">█</span>}
          </p>
        ))}
        {/* When typing is done, show the progress bar on a new line */}
        {typingComplete && (
            <p className="whitespace-pre h-6">
                {progressBar}
                {progress < 100 && <span className="animate-blink">█</span>}
            </p>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;