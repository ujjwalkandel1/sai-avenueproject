# Scroll Interface Task

## Overview
This project implements a dynamic scrollable interface with vertical and horizontal sections that render elements on-demand with a 500ms delay between items. The solution uses React with TypeScript in a React Js.

## Key Features
- Dynamic rendering during scroll
- Smooth transition between vertical and horizontal scrolling
- 500ms delay between element appearances
- Three distinct sections (1-20 vertical, 21-30 horizontal, 31-50 vertical)
- Clean TypeScript implementation

## How to Run

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
git clone https://github.com/your-username/scroll-interface.git
cd scroll-interface
npm install
```

### Development
```bash
npm run dev
```
Open http://localhost:3000 in your browser

### Production Build
```bash
npm run build
npm start
```

## Approach
1. **Dynamic Rendering**:
   - Used React hooks (useState, useEffect, useRef) to manage state
   - Implemented scroll event listeners to trigger rendering
   - Added 500ms delay using setTimeout

2. **Scroll Direction Switching**:
   - Tracked current section based on rendered items
   - Applied different CSS classes for vertical/horizontal layouts
   - Used Tailwind CSS for responsive styling

3. **Performance**:
   - Only rendered visible items
   - Cleaned up event listeners and timers
   - Implemented loading states

## Assumptions
- Modern browser support (Chrome, Firefox, Edge latest versions)
- Standard viewport sizes (mobile not specifically optimized)
- No requirement for server-side rendering

## Limitations
- Basic scroll detection (could be enhanced with Intersection Observer)
- No touch event handling for mobile devices
- Simple loading indicator (could be more sophisticated)

## Future Improvements
- Add virtualization for very large lists
- Implement touch support for mobile
- Add navigation controls
- Make configuration more flexible through props
