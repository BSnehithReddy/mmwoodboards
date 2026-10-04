/**
 * MM BOARDS & LAMINATES - SCROLLYTELLING CANVAS SEQUENCE ENGINE
 * High-performance 300-frame hardware-accelerated image sequence renderer
 * with DPR scaling, progressive preloading, and smooth lerp interpolation.
 */

export class ScrollytellingEngine {
  constructor(options = {}) {
    this.canvas = document.getElementById('scrolly-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    
    this.container = document.querySelector('.scrolly-container');
    this.loaderElement = document.querySelector('.sequence-loader');
    this.loaderBar = document.querySelector('.loader-progress');
    this.loaderText = document.querySelector('.loader-text');
    this.scrollThumb = document.querySelector('.scroll-track-thumb');
    this.scrollStagePill = document.querySelector('.scroll-stage-pill');
    
    this.totalFrames = 300;
    this.images = new Array(this.totalFrames);
    this.loadedCount = 0;
    this.currentFrameIndex = 1;
    this.targetFrameIndex = 1;
    
    this.scrollProgress = 0;
    this.targetScrollProgress = 0;
    
    // Beat elements
    this.beats = [
      { id: 'beat-hero', start: 0.0, end: 0.16, stageName: '01 / HERO' },
      { id: 'beat-engineering', start: 0.16, end: 0.42, stageName: '02 / ENGINEERING' },
      { id: 'beat-durability', start: 0.42, end: 0.66, stageName: '03 / 72H BWP' },
      { id: 'beat-standards', start: 0.66, end: 0.84, stageName: '04 / INTEGRITY' },
      { id: 'beat-reassembly', start: 0.84, end: 1.00, stageName: '05 / REASSEMBLY' },
    ];
    
    this.beatDoms = this.beats.map(b => ({
      ...b,
      el: document.getElementById(b.id)
    }));

    this.init();
  }

  getFrameUrl(index) {
    const padded = String(index).padStart(3, '0');
    return `/sequence/ezgif-frame-${padded}.jpg`;
  }

  init() {
    this.setupResize();
    this.bindEvents();
    this.startProgressivePreload();
    this.startRenderLoop();
  }

  setupResize() {
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = window.innerWidth * dpr;
      this.canvas.height = window.innerHeight * dpr;
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.imageSmoothingQuality = 'high';
      this.drawCurrentFrame();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
  }

  startProgressivePreload() {
    // Step 1: Preload Frame 1 immediately for instant first-paint
    const firstImg = new Image();
    firstImg.src = this.getFrameUrl(1);
    firstImg.onload = () => {
      this.images[0] = firstImg;
      this.loadedCount++;
      this.drawCurrentFrame();
      
      // Step 2: Preload keyframes (every 6th frame) for responsive scrubbing
      this.preloadBatch(this.getKeyframeIndices(), () => {
        // Step 3: Stream all remaining frames in the background
        const remaining = [];
        for (let i = 1; i <= this.totalFrames; i++) {
          if (!this.images[i - 1]) remaining.push(i);
        }
        this.preloadBatch(remaining, () => {
          if (this.loaderElement) {
            this.loaderElement.classList.add('loaded');
          }
        });
      });
    };
  }

  getKeyframeIndices() {
    const indices = [];
    for (let i = 1; i <= this.totalFrames; i += 6) {
      indices.push(i);
    }
    if (!indices.includes(this.totalFrames)) indices.push(this.totalFrames);
    return indices;
  }

  preloadBatch(indices, onComplete) {
    let batchLoaded = 0;
    const batchTotal = indices.length;

    if (batchTotal === 0) {
      if (onComplete) onComplete();
      return;
    }

    indices.forEach(frameIdx => {
      if (this.images[frameIdx - 1]) {
        batchLoaded++;
        if (batchLoaded >= batchTotal && onComplete) onComplete();
        return;
      }

      const img = new Image();
      img.src = this.getFrameUrl(frameIdx);
      img.onload = () => {
        this.images[frameIdx - 1] = img;
        this.loadedCount++;
        batchLoaded++;
        this.updateLoaderUI();

        if (batchLoaded >= batchTotal && onComplete) {
          onComplete();
        }
      };
      img.onerror = () => {
        batchLoaded++;
        if (batchLoaded >= batchTotal && onComplete) {
          onComplete();
        }
      };
    });
  }

  updateLoaderUI() {
    const percent = Math.min(Math.round((this.loadedCount / this.totalFrames) * 100), 100);
    if (this.loaderBar) {
      this.loaderBar.style.width = `${percent}%`;
    }
    if (this.loaderText) {
      this.loaderText.textContent = `Plywood 3D Engine: ${percent}%`;
    }
  }

  bindEvents() {
    // Track scroll
    const onScroll = () => {
      if (!this.container) return;
      const rect = this.container.getBoundingClientRect();
      const scrollableDist = this.container.offsetHeight - window.innerHeight;
      
      if (scrollableDist <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDist));
      this.targetScrollProgress = progress;

      // Update right-side scroll thumb
      if (this.scrollThumb) {
        this.scrollThumb.style.top = `${progress * 116}px`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /**
   * Map scroll progress (0..1) to frame index (1..300)
   * 0.0 - 0.16: Frame 1 to 80 (Assembled hero beauty angle)
   * 0.16 - 0.42: Frame 80 to 180 (Plies drift apart into multi-ply Gurjan layers)
   * 0.42 - 0.66: Frame 180 to 240 (Explosion reaches maximum clarity, showing resin bonds)
   * 0.66 - 0.84: Frame 240 to 300 (Annotated technical layers with neon rim light)
   * 0.84 - 1.00: Frame 300 down to 100 (Reassembly: layers glide back into monolithic block!)
   */
  computeFrameIndex(progress) {
    let frame = 1;

    if (progress <= 0.16) {
      const localT = progress / 0.16;
      frame = 1 + localT * (80 - 1);
    } else if (progress <= 0.42) {
      const localT = (progress - 0.16) / (0.42 - 0.16);
      frame = 80 + localT * (180 - 80);
    } else if (progress <= 0.66) {
      const localT = (progress - 0.42) / (0.66 - 0.42);
      frame = 180 + localT * (240 - 180);
    } else if (progress <= 0.84) {
      const localT = (progress - 0.66) / (0.84 - 0.66);
      frame = 240 + localT * (300 - 240);
    } else {
      // Reassembly: Glide from frame 300 back towards monolithic state frame 100
      const localT = (progress - 0.84) / (1.00 - 0.84);
      frame = 300 - localT * (300 - 100);
    }

    return Math.max(1, Math.min(this.totalFrames, Math.round(frame)));
  }

  startRenderLoop() {
    const loop = () => {
      // Smooth lerp on scroll progress for buttery liquid physics
      const diff = this.targetScrollProgress - this.scrollProgress;
      this.scrollProgress += diff * 0.12;

      this.targetFrameIndex = this.computeFrameIndex(this.scrollProgress);

      if (this.currentFrameIndex !== this.targetFrameIndex) {
        this.currentFrameIndex = this.targetFrameIndex;
        this.drawCurrentFrame();
      }

      this.updateStoryBeats(this.scrollProgress);

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  drawCurrentFrame() {
    const targetIdx = this.currentFrameIndex;
    let img = this.images[targetIdx - 1];

    // If target frame isn't loaded yet, fall back to the nearest available keyframe
    if (!img || !img.complete) {
      img = this.findNearestLoadedFrame(targetIdx);
    }

    if (!img || !img.complete) return;

    const canvas = this.canvas;
    const ctx = this.ctx;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Compute aspect-ratio fitting
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      // Screen is wider than image
      drawHeight = canvas.height * 0.94;
      drawWidth = drawHeight * imgRatio;
    } else {
      // Screen is taller than image (mobile / portrait)
      drawWidth = canvas.width * 0.94;
      drawHeight = drawWidth / imgRatio;
    }

    offsetX = (canvas.width - drawWidth) / 2;
    offsetY = (canvas.height - drawHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  findNearestLoadedFrame(targetIdx) {
    for (let offset = 1; offset < this.totalFrames; offset++) {
      const lower = targetIdx - offset;
      if (lower >= 1 && this.images[lower - 1] && this.images[lower - 1].complete) {
        return this.images[lower - 1];
      }
      const upper = targetIdx + offset;
      if (upper <= this.totalFrames && this.images[upper - 1] && this.images[upper - 1].complete) {
        return this.images[upper - 1];
      }
    }
    return null;
  }

  updateStoryBeats(progress) {
    this.beatDoms.forEach(beat => {
      const isCurrent = progress >= beat.start && progress < beat.end;
      if (beat.el) {
        if (isCurrent) {
          beat.el.classList.add('active');
        } else {
          beat.el.classList.remove('active');
        }
      }
      if (isCurrent && this.scrollStagePill) {
        this.scrollStagePill.textContent = beat.stageName;
      }
    });
  }
}
