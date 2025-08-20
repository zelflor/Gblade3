let lastFrameTime = performance.now();
let fps = 0;
let frameCount = 0;
let fpsInterval;

const overlayId = 'debug-overlay';

function initDebugOverlayModule() {
  createOverlay();
  startFPSCounter();
}

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.id = overlayId;
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '5px',
    left: '5px',
    padding: '8px 12px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#0f0',
    fontFamily: 'monospace',
    fontSize: '14px',
    zIndex: 9999,
    pointerEvents: 'none',
    userSelect: 'none',
    borderRadius: '4px',
  });
  overlay.textContent = 'FPS: --';

  document.body.appendChild(overlay);
}

function startFPSCounter() {
  function update() {
    const now = performance.now();
    const delta = now - lastFrameTime;
    frameCount++;

    if (delta >= 1000) {
      fps = Math.round((frameCount * 1000) / delta);
      frameCount = 0;
      lastFrameTime = now;

      const overlay = document.getElementById(overlayId);
      if (overlay) {
        overlay.textContent = `FPS: ${fps}`;
      }
    }

    requestAnimationFrame(update);
  }
  update();
}


initDebugOverlayModule();