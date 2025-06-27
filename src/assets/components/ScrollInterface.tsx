import { useState, useEffect, useRef, useCallback } from 'react';

const ScrollInterface = () => {
  const [items, setItems] = useState<number[]>([1]);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true); // Auto-scroll enabled by default
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const autoScrollRef = useRef(autoScroll);

  // Update the ref when autoScroll state changes


  return (
    <div className="relative h-screen w-screen">
      <div
        ref={containerRef}
        className={`h-full w-full ${
          isHorizontal 
            ? 'overflow-x-auto overflow-y-hidden whitespace-nowrap' 
            : 'overflow-y-auto overflow-x-hidden flex flex-col'
        }`}
        style={{ scrollBehavior: 'smooth' }}
      >
        {items.map((item) => (
          <div
            key={item}
            className={`${
              isHorizontal
                ? 'inline-block h-full w-screen'
                : 'w-full h-screen'
            } flex items-center justify-center text-4xl font-bold border border-gray-200`}
            style={{
              backgroundColor: `hsl(${(item * 10) % 360}, 70%, 80%)`,
              flex: '0 0 auto'
            }}
          >
            {item}
          </div>
        ))}
        {isLoading && (
          <div className={`${
            isHorizontal ? 'inline-block' : 'block'
          } w-full h-screen flex items-center justify-center`}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      
      {/* Auto-scroll control button */}
      <button
        onClick={() => setAutoScroll(!autoScroll)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md z-10"
      >
        {autoScroll ? 'Pause' : 'Resume'} Auto-scroll
      </button>
    </div>
  );
};

export default ScrollInterface;