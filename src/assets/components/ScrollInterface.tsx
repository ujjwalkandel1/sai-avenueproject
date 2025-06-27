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
  useEffect(() => {
    autoScrollRef.current = autoScroll;
  }, [autoScroll]);

  const sections = [
    { start: 1, end: 20, direction: 'vertical' },
    { start: 21, end: 30, direction: 'horizontal' },
    { start: 31, end: 50, direction: 'vertical' }
  ];

  const getCurrentSection = useCallback((lastItem: number) => {
    return sections.find(section => 
      lastItem >= section.start && lastItem < section.end
    ) || sections[sections.length - 1];
  }, [sections]);

  const scrollToNewItem = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const currentSection = getCurrentSection(items[items.length - 1]);
    
    if (currentSection.direction === 'horizontal') {
      container.scrollLeft = container.scrollWidth;
    } else {
      container.scrollTop = container.scrollHeight;
    }
  }, [items, getCurrentSection]);

  const loadItems = useCallback(() => {
    if (isLoading) return;

    const lastItem = items[items.length - 1];
    const currentSection = getCurrentSection(lastItem);

    if (lastItem >= currentSection.end) {
      setAutoScroll(false); // Stop auto-scroll when reaching the end
      return;
    }

    setIsLoading(true);

    timerRef.current = window.setTimeout(() => {
      const newItem = lastItem + 1;
      setItems(prev => [...prev, newItem]);
      
      const newSection = getCurrentSection(newItem);
      setIsHorizontal(newSection.direction === 'horizontal');
      
      setIsLoading(false);

      // Auto-scroll to new item if auto-scroll is enabled
      if (autoScrollRef.current) {
        scrollToNewItem();
      }
    }, 500);
  }, [items, isLoading, getCurrentSection, scrollToNewItem]);

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll) return;

    const autoScrollInterval = window.setInterval(() => {
      if (!isLoading) {
        loadItems();
      }
    }, 1000); // Check every second if we should load next item

    return () => {
      window.clearInterval(autoScrollInterval);
    };
  }, [autoScroll, isLoading, loadItems]);

  // Manual scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // When user scrolls manually, pause auto-scroll temporarily
      setAutoScroll(false);
      
      const { scrollTop, scrollLeft, clientHeight, clientWidth, scrollHeight, scrollWidth } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
      const isAtRight = scrollLeft + clientWidth >= scrollWidth - 50;

      if ((!isHorizontal && isAtBottom) || (isHorizontal && isAtRight)) {
        loadItems();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isHorizontal, loadItems]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

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