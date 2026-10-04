import './style.css';
import { ScrollytellingEngine } from './canvas-sequence.js';
import { initInteractiveFeatures } from './interactive-features.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize full scrollytelling canvas sequence
  const engine = new ScrollytellingEngine();

  // Initialize all interactive modules
  initInteractiveFeatures();

  console.log('MM Boards & Laminates Experience Initialized.');
});
