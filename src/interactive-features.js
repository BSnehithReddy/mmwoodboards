/**
 * MM WOOD BOARDS & LAMINATES - INTERACTIVE ARCHITECTURAL MODULES
 * Features:
 * 1. Grade Comparator (IS:710 Solitaire Marine vs IS:303 BWR/MR vs IS:5509 vs Chequered)
 * 2. 7-Layer Wood Anatomy Explorer
 * 3. 72-Hour BWP Lab Simulation
 * 4. Instant Quote & Technical Estimator Modal
 */

export function initInteractiveFeatures() {
  initNavbarScroll();
  initGradeComparator();
  initLayerExplorer();
  initLabSimulation();
  initQuoteCalculatorModal();
}

/**
 * Apple-style navbar transition on scroll
 */
function initNavbarScroll() {
  const nav = document.querySelector('.apple-nav');
  if (!nav) return;

  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Mobile menu toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = 'var(--nav-height)';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(10, 10, 14, 0.96)';
      navLinks.style.padding = '1.5rem 2rem';
      navLinks.style.borderBottom = '1px solid var(--border-subtle)';
    });
  }
}

/**
 * 1. Grade Comparator Data & Switcher
 */
const GRADES_DATA = {
  'marine-710': {
    code: 'IS:710 • MM MARINE GRADE',
    name: 'MM Marine (IS:710) Plywood',
    description: 'The pinnacle of structural plywood. Manufactured using selected high-density Gurjan timber veneers bonded with undiluted Phenol Formaldehyde synthetic resin under extreme temperature and pressure. Fully compliant with 72-hour boiling water testing without layer separation.',
    image: '/images/products/gurjan-club-marine.png',
    badge: 'FLAGSHIP IS:710',
    specs: [
      { label: 'Boiling Water Test', value: '72 Hours (Zero Delamination)', highlight: true },
      { label: 'Bonding Adhesive', value: 'Unextended Synthetic PF Resin' },
      { label: 'Core Timber', value: '100% Calibrated Gurjan Hardwood' },
      { label: 'Screw Holding Strength', value: '> 2,800 N' },
      { label: 'Preservative Treatment', value: 'Vacuum Pressure Impregnation' },
      { label: 'Warranty Coverage', value: '25-Year Replacement Guarantee', highlight: true },
    ]
  },
  'bwr-303': {
    code: 'IS:303 • MM BWR GRADE',
    name: 'MM BWR (IS:303) Plywood',
    description: 'Designed for wet zones and kitchen cabinetry. Formulated with fortified phenolic adhesives that resist moisture, steam, and intermittent hot water exposure with high dimensional tolerance and termite defense.',
    image: '/images/products/tree-leaf-marine.png',
    badge: 'PREMIUM IS:303',
    specs: [
      { label: 'Boiling Water Test', value: '8 Hours (Hydrothermal Proof)', highlight: true },
      { label: 'Bonding Adhesive', value: 'Fortified Phenol Formaldehyde' },
      { label: 'Core Timber', value: 'Selected Hardwood Alternate Plies' },
      { label: 'Screw Holding Strength', value: '> 2,400 N' },
      { label: 'Preservative Treatment', value: 'Micro-encapsulated Anti-Borer' },
      { label: 'Warranty Coverage', value: '15-Year Replacement Guarantee', highlight: true },
    ]
  },
  'mr-303': {
    code: 'IS:303 • COMMERCIAL MR GRADE',
    name: 'Commercial Moisture Resistant (MR)',
    description: 'Engineered for premium dry-area architectural woodwork, modular furniture, and living room wall claddings. Utilizes high-solid Melamine Urea Formaldehyde (MUF) resin with exceptional planar stability.',
    image: '/images/products/machinability-care.png',
    badge: 'INTERIOR IS:303',
    specs: [
      { label: 'Warm Water Test', value: '3 Hours at 60°C Compliant', highlight: true },
      { label: 'Bonding Adhesive', value: 'Synthetic MUF Resin' },
      { label: 'Core Timber', value: 'Kiln-Dried Hardwood Plies' },
      { label: 'Screw Holding Strength', value: '> 2,100 N' },
      { label: 'Preservative Treatment', value: 'Surface & Glue-Line Protection' },
      { label: 'Warranty Coverage', value: '10-Year Guarantee', highlight: true },
    ]
  },
  'fire-5509': {
    code: 'IS:5509 • FIRE-SHIELD MARINE',
    name: 'Fire Retardant Marine Plywood',
    description: 'Treated with specialized nano-chemical flame retardants that suppress ignition, slow flame propagation, and self-extinguish upon flame removal. Engineered for luxury hotels, commercial theaters, and maritime vessels.',
    image: '/images/products/fire-retardant-marine.png',
    badge: 'SAFETY CERTIFIED',
    specs: [
      { label: 'Flame Penetration', value: '> 30 Minutes Resistance', highlight: true },
      { label: 'Rate of Burning', value: '< 20 Minutes / cm' },
      { label: 'Smoke Toxicity', value: 'Zero Toxic Gas Emission' },
      { label: 'Bonding Adhesive', value: 'Fire-Retardant Modified PF' },
      { label: 'Core Timber', value: 'Heavy Hardwood Matrix' },
      { label: 'Warranty Coverage', value: '20-Year Guarantee', highlight: true },
    ]
  },
  'chequered': {
    code: 'INDUSTRIAL GRADE • HIGH-TRACTION',
    name: 'Heavy-Duty Chequered Floorboard',
    description: 'Heavy structural plywood imprinted with a diamond friction-chequered pattern on the wear face. Widely specified for bus and heavy vehicle flooring, rail wagons, container decks, and factory mezzanines.',
    image: '/images/products/chequered-plywood.png',
    badge: 'INDUSTRIAL HIGH-LOAD',
    specs: [
      { label: 'Surface Friction', value: 'High Grip Chequered Profile', highlight: true },
      { label: 'Impact Resistance', value: 'Severe Dynamic Load Rated' },
      { label: 'Bonding Adhesive', value: 'High-Solid Phenolic Film' },
      { label: 'Core Timber', value: 'High-Density Gurjan & Hardwood' },
      { label: 'Water Proofing', value: '100% Boiling Water Proof' },
      { label: 'Warranty Coverage', value: '15-Year Industrial Warranty', highlight: true },
    ]
  },
  'shuttering-ffsp': {
    code: 'IS:4990 • FILM FACED SHUTTERING',
    name: 'Film Faced Shuttering Plywood (FFSP)',
    description: 'Engineered for concrete formwork with ultra-smooth mirrored phenolic overlay. Calibrated to withstand severe hydrostatic pressure and multiple re-casting cycles for high-rise architectural engineering.',
    image: '/images/products/film-faced-shuttering.png',
    badge: 'CONSTRUCTION GRADE',
    specs: [
      { label: 'Re-use Repetitions', value: 'Up to 30+ Casting Cycles', highlight: true },
      { label: 'Surface Overlay', value: '120 GSM Phenolic Film' },
      { label: 'Edge Sealing', value: 'Silicone Acrylic Water Repellent' },
      { label: 'Core Timber', value: 'Heavy Hardwood Calibrated' },
      { label: 'Concrete Finish', value: 'Mirror Architectural Sheen' },
      { label: 'Warranty Coverage', value: 'Heavy Infrastructure Performance', highlight: true },
    ]
  },
  'flush-doors': {
    code: 'IS:2202 • STRUCTURAL SOLID CORE',
    name: 'Architectural Solid Core Flush Doors',
    description: 'Constructed with kiln-seasoned hardwood internal battens, preservative-treated stiles and rails, and bonded with thermosetting synthetic PF adhesive for zero warping and enduring acoustic seclusion.',
    image: '/images/products/flush-doors.png',
    badge: 'ARCHITECTURAL DOORS',
    specs: [
      { label: 'Internal Core', value: 'Kiln-Seasoned Pinewood / Hardwood', highlight: true },
      { label: 'Internal Framing', value: 'Perimeter Solid Hardwood Rails' },
      { label: 'Bonding Adhesive', value: 'Type 1 BWP Synthetic PF Resin' },
      { label: 'Face Finish', value: 'Selected Natural Teak / Gurjan' },
      { label: 'Dimensional Stability', value: 'Zero Warp / Zero Sagging' },
      { label: 'Warranty Coverage', value: '20-Year Replacement Guarantee', highlight: true },
    ]
  }
};

function initGradeComparator() {
  const tabButtons = document.querySelectorAll('.grade-tab-btn');
  const codeEl = document.getElementById('grade-code');
  const nameEl = document.getElementById('grade-name');
  const descEl = document.getElementById('grade-desc');
  const badgeEl = document.getElementById('grade-badge');
  const visualImg = document.getElementById('grade-img');
  const specsContainer = document.getElementById('grade-specs');

  if (!tabButtons.length || !codeEl) return;

  const renderGrade = (gradeKey) => {
    const data = GRADES_DATA[gradeKey];
    if (!data) return;

    codeEl.textContent = data.code;
    nameEl.textContent = data.name;
    descEl.textContent = data.description;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (visualImg) visualImg.src = data.image;

    if (specsContainer) {
      specsContainer.innerHTML = data.specs.map(s => `
        <div class="spec-cell">
          <span class="spec-label">${s.label}</span>
          <span class="spec-value ${s.highlight ? 'highlight' : ''}">${s.value}</span>
        </div>
      `).join('');
    }
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grade = btn.getAttribute('data-grade');
      renderGrade(grade);
    });
  });

  // Initial render
  renderGrade('marine-710');
}

/**
 * 2. 7-Layer Wood Anatomy Explorer
 */
const LAYERS_DATA = [
  {
    num: '1',
    name: 'Top Face Veneer',
    grain: '0° Longitudinal',
    badge: 'SURFACE GRADE A',
    title: 'Precision Face Veneer (0.6mm Gurjan)',
    text: 'Hand-graded natural Gurjan timber veneer selected for seamless texture and minimal grain distortion. Treated for natural wood sheen and branded with the authentic MM WOOD Boards hallmark.',
    metrics: [
      { label: 'Thickness', val: '0.60 mm' },
      { label: 'Grain Vector', val: '0° Axis' },
      { label: 'Finish', val: 'Ultra-Smooth Sanded' }
    ]
  },
  {
    num: '2',
    name: 'Cross-Banded Core Layer 1',
    grain: '90° Latitudinal',
    badge: 'SHEAR BALANCE',
    title: 'Cross-Grain Structural Ply (1.8mm)',
    text: 'Oriented exactly perpendicular (90°) to the face veneer to neutralize lateral swelling and moisture expansion. Impregnated with synthetic PF resin.',
    metrics: [
      { label: 'Thickness', val: '1.80 mm' },
      { label: 'Shear Modulus', val: '920 N/mm²' },
      { label: 'Bond Type', val: '100% PF Adhesive' }
    ]
  },
  {
    num: '3',
    name: 'Inner Core Layer 1',
    grain: '0° Longitudinal',
    badge: 'HIGH-DENSITY HARDWOOD',
    title: 'High-Density Gurjan Core Ply (2.2mm)',
    text: 'Dense, core-gap-free hardwood veneer layer. Eliminates internal voids and air pockets, ensuring uninterrupted acoustic and structural integrity across the entire board.',
    metrics: [
      { label: 'Thickness', val: '2.20 mm' },
      { label: 'Density', val: '840 kg/m³' },
      { label: 'Defect Rate', val: '0.00% (Gapless)' }
    ]
  },
  {
    num: '4',
    name: 'Center Core Layer (Neutral Axis)',
    grain: '90° Center Anchor',
    badge: 'NEUTRAL AXIS KEY',
    title: 'Central Structural Anchor Layer',
    text: 'The geometric and mechanical center of the multi-ply matrix. Absorbs bending and compressive loads when the board is flexed, preventing shear fracture at high load.',
    metrics: [
      { label: 'Thickness', val: '2.50 mm' },
      { label: 'Tensile Strength', val: '1,650 N' },
      { label: 'Resin Impregnation', val: 'Vacuum Autoclaved' }
    ]
  },
  {
    num: '5',
    name: 'Inner Core Layer 2',
    grain: '0° Longitudinal',
    badge: 'BALANCED COMPRESSION',
    title: 'Mirror Core Layer (2.2mm Gurjan)',
    text: 'Mirrors Layer 3 with exact volumetric density and thickness, guaranteeing that thermal or moisture gradients do not induce asymmetric curvature or bowing.',
    metrics: [
      { label: 'Thickness', val: '2.20 mm' },
      { label: 'Density', val: '840 kg/m³' },
      { label: 'Moisture Stability', val: '± 0.2%' }
    ]
  },
  {
    num: '6',
    name: 'Cross-Banded Core Layer 2',
    grain: '90° Latitudinal',
    badge: 'OPPOSING TENSILE GRIP',
    title: 'Opposing Cross-Grain Barrier (1.8mm)',
    text: 'Symmetrically balances Layer 2 to ensure equal screw-holding torque from both sides of the panel. Fortified with anti-termite micro-capsules.',
    metrics: [
      { label: 'Thickness', val: '1.80 mm' },
      { label: 'Screw Retention', val: '> 2,750 N' },
      { label: 'Borer Defense', val: 'Immune' }
    ]
  },
  {
    num: '7',
    name: 'Bottom Face Veneer',
    grain: '0° Longitudinal',
    badge: 'CALIBRATED BASE',
    title: 'Bottom Face Veneer (0.6mm)',
    text: 'Matched backing veneer that closes the balanced 7-ply sandwich. Imprinted with batch verification, IS:710 certification number, and 25-Year Guarantee warranty mark.',
    metrics: [
      { label: 'Thickness', val: '0.60 mm' },
      { label: 'Calibration', val: '± 0.15 mm' },
      { label: 'Seal Mark', val: 'Authentic MM Hallmark' }
    ]
  }
];

function initLayerExplorer() {
  const strips = document.querySelectorAll('.layer-strip');
  const badgeEl = document.getElementById('layer-badge');
  const titleEl = document.getElementById('layer-title');
  const textEl = document.getElementById('layer-text');
  const metricsEl = document.getElementById('layer-metrics');

  if (!strips.length || !titleEl) return;

  const renderLayer = (index) => {
    const data = LAYERS_DATA[index];
    if (!data) return;

    if (badgeEl) badgeEl.textContent = data.badge;
    titleEl.textContent = data.title;
    textEl.textContent = data.text;

    if (metricsEl) {
      metricsEl.innerHTML = data.metrics.map(m => `
        <div class="metric-item">
          <span class="metric-label">${m.label}</span>
          <span class="metric-val">${m.val}</span>
        </div>
      `).join('');
    }
  };

  strips.forEach((strip, idx) => {
    strip.addEventListener('click', () => {
      strips.forEach(s => s.classList.remove('selected'));
      strip.classList.add('selected');
      renderLayer(idx);
    });
  });

  // Initial render
  renderLayer(0);
}

/**
 * 3. 72-Hour BWP Lab Simulation (Interactive Thermal Scrubber)
 * High-performance 300-frame hardware-accelerated scrubber engine
 * with progressive preloading, auto-playback, and live telemetry.
 */
class ThermalScrubberViewer {
  constructor() {
    this.canvas = document.getElementById('thermal-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.poster = document.getElementById('thermal-fallback-img');
    this.slider = document.getElementById('lab-time-slider');
    this.timeDisplay = document.getElementById('lab-time-display');
    this.tempDisplay = document.getElementById('lab-temp-val');
    this.delamStatus = document.getElementById('lab-delam-status');
    this.delamPercent = document.getElementById('lab-delam-percent');
    this.frameCounter = document.getElementById('thermal-frame-counter');
    this.playBtn = document.getElementById('thermal-play-btn');
    this.loader = document.getElementById('thermal-loader');
    this.milestoneBtns = document.querySelectorAll('.thermal-milestone-btn');
    this.telemetryTemp = document.getElementById('telemetry-temp');
    this.telemetryResin = document.getElementById('telemetry-resin');
    this.telemetryDelam = document.getElementById('telemetry-delam');

    this.totalFrames = 300;
    this.images = new Array(this.totalFrames);
    this.loadedCount = 0;
    this.currentFrame = 300; // Default at 72 hours
    this.isPlaying = false;
    this.animId = null;

    this.init();
  }

  getFrameUrl(index) {
    const padded = String(index).padStart(3, '0');
    return `/images/thermal-sequence/ezgif-frame-${padded}.jpg`;
  }

  init() {
    this.setupResize();
    this.bindEvents();
    this.startPreload();
    this.updateStateFromSlider(true);
  }

  setupResize() {
    const handleResize = () => {
      const container = this.canvas.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.round(rect.width * dpr);
      this.canvas.height = Math.round(rect.height * dpr);
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.imageSmoothingQuality = 'high';
      this.drawFrame(this.currentFrame);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    if (window.ResizeObserver) {
      new ResizeObserver(handleResize).observe(this.canvas.parentElement);
    }
    handleResize();
  }

  bindEvents() {
    if (this.slider) {
      this.slider.addEventListener('input', () => {
        if (this.isPlaying) this.pause();
        this.updateStateFromSlider(false);
      });
    }

    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => {
        this.togglePlay();
      });
    }

    this.milestoneBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isPlaying) this.pause();
        const targetHours = parseFloat(btn.dataset.hours);
        this.smoothAnimateToHours(targetHours);
      });
    });
  }

  startPreload() {
    // Phase 1: Load anchor frames immediately (300, 1, 34, 101, 201)
    const anchorFrames = [300, 1, 34, 101, 201];
    let anchorsDone = 0;

    anchorFrames.forEach(idx => {
      const img = new Image();
      img.src = this.getFrameUrl(idx);
      img.onload = () => {
        this.images[idx - 1] = img;
        this.loadedCount++;
        anchorsDone++;
        if (idx === this.currentFrame) {
          this.drawFrame(this.currentFrame);
        }

        if (anchorsDone === anchorFrames.length) {
          // Phase 2: Stream keyframes (every 5th frame)
          const keyframes = [];
          for (let i = 1; i <= this.totalFrames; i += 5) {
            if (!this.images[i - 1]) keyframes.push(i);
          }
          this.loadBatch(keyframes, () => {
            // Phase 3: Stream all remaining frames
            const remaining = [];
            for (let i = 1; i <= this.totalFrames; i++) {
              if (!this.images[i - 1]) remaining.push(i);
            }
            this.loadBatch(remaining, () => {
              if (this.loader) {
                this.loader.classList.add('ready');
                this.loader.innerHTML = `
                  <span class="mini-loader-dot" style="background:#00d6ff; box-shadow:0 0 8px #00d6ff;"></span>
                  <span class="loader-status-text">300 Frames Ready</span>
                `;
                setTimeout(() => {
                  if (this.loader) this.loader.style.opacity = '0';
                }, 2500);
              }
            });
          });
        }
      };
      img.onerror = () => {
        anchorsDone++;
      };
    });
  }

  loadBatch(indices, onComplete) {
    let batchDone = 0;
    const batchTotal = indices.length;
    if (batchTotal === 0) {
      if (onComplete) onComplete();
      return;
    }

    indices.forEach(idx => {
      if (this.images[idx - 1]) {
        batchDone++;
        if (batchDone >= batchTotal && onComplete) onComplete();
        return;
      }

      const img = new Image();
      img.src = this.getFrameUrl(idx);
      img.onload = () => {
        this.images[idx - 1] = img;
        this.loadedCount++;
        batchDone++;
        this.updateLoaderUI();
        if (batchDone >= batchTotal && onComplete) onComplete();
      };
      img.onerror = () => {
        batchDone++;
        if (batchDone >= batchTotal && onComplete) onComplete();
      };
    });
  }

  updateLoaderUI() {
    if (!this.loader) return;
    const percent = Math.min(100, Math.round((this.loadedCount / this.totalFrames) * 100));
    const textEl = this.loader.querySelector('.loader-status-text');
    if (textEl) {
      textEl.textContent = `Thermal 3D Sync: ${percent}%`;
    }
  }

  drawFrame(index) {
    let img = this.images[index - 1];
    if (!img || !img.complete) {
      img = this.findNearestLoaded(index);
    }

    if (!img || !img.complete) return;

    const ctx = this.ctx;
    const canvas = this.canvas;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawW, drawH, ox, oy;
    if (canvasRatio > imgRatio) {
      drawW = canvas.width;
      drawH = drawW / imgRatio;
      ox = 0;
      oy = (canvas.height - drawH) / 2;
    } else {
      drawH = canvas.height;
      drawW = drawH * imgRatio;
      ox = (canvas.width - drawW) / 2;
      oy = 0;
    }

    ctx.drawImage(img, ox, oy, drawW, drawH);

    // Hide fallback poster once canvas has actively rendered
    if (this.poster && !this.poster.classList.contains('hidden')) {
      this.poster.classList.add('hidden');
    }
  }

  findNearestLoaded(index) {
    for (let offset = 1; offset < this.totalFrames; offset++) {
      const lower = index - offset;
      if (lower >= 1 && this.images[lower - 1] && this.images[lower - 1].complete) {
        return this.images[lower - 1];
      }
      const upper = index + offset;
      if (upper <= this.totalFrames && this.images[upper - 1] && this.images[upper - 1].complete) {
        return this.images[upper - 1];
      }
    }
    return null;
  }

  updateStateFromSlider(immediate = false) {
    if (!this.slider) return;
    const hours = parseFloat(this.slider.value);

    if (this.timeDisplay) {
      this.timeDisplay.textContent = `${hours.toFixed(1)} Hours`;
    }

    // Map 0..72 hours linearly to frame 1..300
    const frameIndex = Math.max(1, Math.min(300, Math.round(1 + (hours / 72) * 299)));
    this.currentFrame = frameIndex;
    this.drawFrame(frameIndex);

    if (this.frameCounter) {
      this.frameCounter.textContent = `FRAME ${String(frameIndex).padStart(3, '0')} / 300`;
    }

    // Dynamic Temperature
    let temp = 100.0;
    let tempLabel = '100°C Boiling';
    if (hours <= 0.5) {
      temp = 25.0;
      tempLabel = '25°C Ambient';
    } else if (hours < 2) {
      temp = 25.0 + (hours / 2) * 75.0;
      tempLabel = `${Math.round(temp)}°C Heating`;
    }

    if (this.tempDisplay) {
      this.tempDisplay.textContent = tempLabel;
    }
    if (this.telemetryTemp) {
      this.telemetryTemp.textContent = `${temp.toFixed(1)} °C`;
    }

    // Telemetry & Status
    if (hours < 8) {
      if (this.delamStatus) this.delamStatus.textContent = 'Initial Hydrothermal Soak • Zero Swelling';
      if (this.telemetryResin) this.telemetryResin.textContent = '100% PF Bonded';
    } else if (hours < 24) {
      if (this.delamStatus) this.delamStatus.textContent = 'BWR Standard Exceeded • Glue-line Intact';
      if (this.telemetryResin) this.telemetryResin.textContent = '100% PF Cross-linked';
    } else if (hours < 48) {
      if (this.delamStatus) this.delamStatus.textContent = 'Extended Immersion • Zero Delamination';
      if (this.telemetryResin) this.telemetryResin.textContent = 'High-Solid PF Cured';
    } else if (hours < 71.9) {
      if (this.delamStatus) this.delamStatus.textContent = 'Deep PF Resin Cross-linking Verified';
      if (this.telemetryResin) this.telemetryResin.textContent = '100% Retained Modulus';
    } else {
      if (this.delamStatus) this.delamStatus.textContent = 'PASSED IS:710 72-HR MANDATE';
      if (this.telemetryResin) this.telemetryResin.textContent = '100% Calibrated Gurjan';
    }

    if (this.delamPercent) this.delamPercent.textContent = '0.0%';
    if (this.telemetryDelam) this.telemetryDelam.textContent = '0.00 mm (Zero)';

    // Update active milestone button
    this.milestoneBtns.forEach(btn => {
      const btnHours = parseFloat(btn.dataset.hours);
      if (Math.abs(btnHours - hours) < 2.0) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  smoothAnimateToHours(targetHours) {
    if (!this.slider) return;
    const startHours = parseFloat(this.slider.value);
    const diff = targetHours - startHours;
    const startTime = performance.now();
    const duration = 400; // 400ms smooth transition

    const animStep = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startHours + diff * ease;

      this.slider.value = current.toFixed(2);
      this.updateStateFromSlider(false);

      if (progress < 1) {
        requestAnimationFrame(animStep);
      }
    };

    requestAnimationFrame(animStep);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    if (this.playBtn) {
      this.playBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        <span>Pause Test</span>
      `;
      this.playBtn.classList.add('playing');
    }

    // If already at or near 72 hours, loop back to 0
    if (parseFloat(this.slider.value) >= 71.9) {
      this.slider.value = 0;
    }

    let lastTime = performance.now();
    const durationMs = 12000; // 12 seconds for full 72-hour test
    const speed = 72 / (durationMs / 1000); // hours per second

    const step = (now) => {
      if (!this.isPlaying) return;
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      let currentVal = parseFloat(this.slider.value) + speed * dt;
      if (currentVal >= 72) {
        currentVal = 72;
        this.slider.value = 72;
        this.updateStateFromSlider(false);
        this.pause();
        return;
      }

      this.slider.value = currentVal.toFixed(2);
      this.updateStateFromSlider(false);

      if (this.isPlaying) {
        this.animId = requestAnimationFrame(step);
      }
    };

    this.animId = requestAnimationFrame(step);
  }

  pause() {
    this.isPlaying = false;
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.playBtn) {
      this.playBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span>Auto-Run Test</span>
      `;
      this.playBtn.classList.remove('playing');
    }
  }
}

function initLabSimulation() {
  new ThermalScrubberViewer();
}

/**
 * 4. Instant Quote & Technical Estimator Modal
 */
function initQuoteCalculatorModal() {
  const modal = document.getElementById('quote-modal');
  const openButtons = document.querySelectorAll('.open-quote-modal-btn');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Calculator logic
  const gradeSelect = document.getElementById('calc-grade');
  const sizeSelect = document.getElementById('calc-size');
  const quantityInput = document.getElementById('calc-quantity');
  const thicknessButtons = document.querySelectorAll('.thickness-btn');

  const totalSqftDisplay = document.getElementById('calc-total-sqft');
  const totalWeightDisplay = document.getElementById('calc-total-weight');
  const densityDisplay = document.getElementById('calc-density-val');
  const whatsappBtn = document.getElementById('btn-whatsapp-quote');
  const emailBtn = document.getElementById('btn-email-quote');

  let selectedThickness = 19; // mm

  thicknessButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      thicknessButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedThickness = parseFloat(btn.getAttribute('data-thick'));
      recalculate();
    });
  });

  const recalculate = () => {
    const sizeSqft = parseFloat(sizeSelect ? sizeSelect.value : 32);
    const qty = Math.max(1, parseInt(quantityInput ? quantityInput.value : 50, 10));
    const grade = gradeSelect ? gradeSelect.value : 'Solitaire IS:710 Marine';

    const totalSqft = sizeSqft * qty;
    
    // Density approximation in kg/m3: Gurjan Marine = 820 kg/m3, Commercial = 750 kg/m3
    const density = grade.includes('710') ? 820 : 760;
    
    // Weight = area(m2) * thickness(m) * density(kg/m3)
    const areaM2 = totalSqft * 0.092903;
    const thicknessM = selectedThickness / 1000;
    const totalWeightKg = Math.round(areaM2 * thicknessM * density);

    if (totalSqftDisplay) totalSqftDisplay.textContent = `${totalSqft.toLocaleString()} sq.ft`;
    if (totalWeightDisplay) totalWeightDisplay.textContent = `~${totalWeightKg.toLocaleString()} kg`;
    if (densityDisplay) densityDisplay.textContent = `${density} kg/m³`;

    const dimensions = sizeSelect && sizeSelect.options[sizeSelect.selectedIndex] ? sizeSelect.options[sizeSelect.selectedIndex].text : '8 ft × 4 ft (32 sq.ft)';

    // Update WhatsApp dynamic RFQ link
    if (whatsappBtn) {
      const message = `Hello MM WOOD Boards & Laminates Private Limited (Hyderabad),\n\n*REQUEST FOR QUOTATION (RFQ)*\n• Board Grade: ${grade}\n• Sheet Dimensions: ${dimensions}\n• Thickness: ${selectedThickness} mm\n• Total Sheet Count: ${qty} Sheets (${totalSqft.toLocaleString()} sq.ft)\n• Estimated Weight: ~${totalWeightKg.toLocaleString()} kg\n\nPlease share official commercial quotation and delivery lead time for Hyderabad / South India.`;
      whatsappBtn.href = `https://api.whatsapp.com/send?phone=917207806126&text=${encodeURIComponent(message)}`;
    }

    // Update Email dynamic RFQ link
    if (emailBtn) {
      const emailSubject = `Commercial RFQ Specification: ${grade} (${qty} Sheets)`;
      const emailBody = `To: MM WOOD Boards & Laminates Private Limited (Hyderabad Headquarters)\nCorporate Email: mmwoodboardsandlaminates@gmail.com\n\nOFFICIAL COMMERCIAL RFQ / SPECIFICATION ESTIMATE:\n--------------------------------------------------\n• Board Grade: ${grade}\n• Dimensions: ${dimensions}\n• Calibrated Thickness: ${selectedThickness} mm\n• Quantity: ${qty} Sheets (${totalSqft.toLocaleString()} sq.ft)\n• Estimated Bundle Weight: ~${totalWeightKg.toLocaleString()} kg\n• Panel Density: ${density} kg/m³\n• Dispatch Depot: Hyderabad Central\n\nKindly provide an official commercial quotation, contractor pricing, and estimated dispatch schedule to our project site.\n\nClient / Architect Details:\nName:\nFirm / Organization:\nDelivery Location / Project Site:\nContact Number:`;
      emailBtn.href = `mailto:mmwoodboardsandlaminates@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    }
  };

  if (gradeSelect) gradeSelect.addEventListener('change', recalculate);
  if (sizeSelect) sizeSelect.addEventListener('change', recalculate);
  if (quantityInput) quantityInput.addEventListener('input', recalculate);

  recalculate();
}
