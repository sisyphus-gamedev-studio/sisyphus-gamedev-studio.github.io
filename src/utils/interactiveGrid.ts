function animateGridLayers(section: HTMLElement): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const layers = section.querySelectorAll<HTMLElement>(".grid-layer");
  if (!layers.length) return () => {};

  const states = Array.from(layers).map((_, i) => ({
    x: 0, y: 0,
    tx: 0, ty: 0,
    speed: i === 0 ? 0.018 : 0.011,
    amp: i === 0 ? 12 : 20,
    timer: 0,
    interval: i === 0 ? 1800 : 2600,
  }));

  let raf = 0;
  let last = performance.now();

  function pickTarget(s: typeof states[0]) {
    const a = s.amp;
    s.tx = (Math.random() * 2 - 1) * a;
    s.ty = (Math.random() * 2 - 1) * a;
  }

  states.forEach(pickTarget);

  function tick(now: number) {
    const dt = now - last;
    last = now;

    layers.forEach((el, i) => {
      const s = states[i];
      s.timer += dt;
      if (s.timer >= s.interval) {
        s.timer = 0;
        pickTarget(s);
      }
      s.x += (s.tx - s.x) * s.speed * (dt / 16);
      s.y += (s.ty - s.y) * s.speed * (dt / 16);
      el.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`;
    });

    raf = requestAnimationFrame(tick);
  }

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

export function initInteractiveGrid(section: HTMLElement) {
  const canvas = section.querySelector<HTMLCanvasElement>(".interactive-grid-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const CELL = 32;
  let mouse = { x: -9999, y: -9999 };
  let raf = 0;
  let active = false;

  function resize() {
    canvas!.width = section.offsetWidth;
    canvas!.height = section.offsetHeight;
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(section);

  function draw() {
    const w = canvas!.width;
    const h = canvas!.height;
    ctx!.clearRect(0, 0, w, h);

    const radius = 160;
    const mx = mouse.x;
    const my = mouse.y;
    const startX = Math.floor((mx - radius) / CELL) * CELL;
    const startY = Math.floor((my - radius) / CELL) * CELL;

    // collect opaque child rects to exclude from drawing
    const sectionRect = section.getBoundingClientRect();
    const excludes: DOMRect[] = [];
    section.querySelectorAll<HTMLElement>("[data-grid-exclude]").forEach((el) => {
      const r = el.getBoundingClientRect();
      excludes.push(new DOMRect(
        r.left - sectionRect.left,
        r.top - sectionRect.top,
        r.width,
        r.height,
      ));
    });

    ctx!.save();
    // clip: full canvas minus excluded rects
    ctx!.beginPath();
    ctx!.rect(0, 0, w, h);
    excludes.forEach((r) => {
      // subtract by winding rule — add rect in opposite direction
      ctx!.moveTo(r.x, r.y);
      ctx!.lineTo(r.x, r.y + r.height);
      ctx!.lineTo(r.x + r.width, r.y + r.height);
      ctx!.lineTo(r.x + r.width, r.y);
      ctx!.closePath();
    });
    ctx!.clip("evenodd");

    ctx!.lineWidth = 1;

    for (let x = startX; x <= mx + radius; x += CELL) {
      for (let y = startY; y <= my + radius; y += CELL) {
        const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
        if (dist > radius) continue;
        const alpha = (1 - dist / radius) * 0.22;
        ctx!.strokeStyle = `rgba(248,126,15,${alpha})`;

        ctx!.beginPath();
        ctx!.moveTo(x, y - CELL / 2);
        ctx!.lineTo(x, y + CELL / 2);
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.moveTo(x - CELL / 2, y);
        ctx!.lineTo(x + CELL / 2, y);
        ctx!.stroke();
      }
    }

    ctx!.restore();
    raf = requestAnimationFrame(draw);
  }

  function onMove(e: MouseEvent) {
    const rect = section.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    if (!active) {
      active = true;
      canvas!.style.opacity = "1";
      draw();
    }
  }

  function onLeave() {
    active = false;
    canvas!.style.opacity = "0";
    cancelAnimationFrame(raf);
    mouse = { x: -9999, y: -9999 };
  }

  section.addEventListener("mousemove", onMove, { passive: true });
  section.addEventListener("mouseleave", onLeave);

  const stopDrift = animateGridLayers(section);

  return () => {
    cancelAnimationFrame(raf);
    stopDrift();
    section.removeEventListener("mousemove", onMove);
    section.removeEventListener("mouseleave", onLeave);
    ro.disconnect();
  };
}
