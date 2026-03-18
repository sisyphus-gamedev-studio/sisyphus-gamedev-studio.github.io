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
  const stopDrift = animateGridLayers(section);
  return () => stopDrift();
}
