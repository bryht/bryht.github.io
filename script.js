/* ============================================================
   Bryht Tech — interactions
   - warp starfield (canvas)
   - scroll reveals
   - animated stat counters
   - nav background on scroll
   ============================================================ */

/* ---------- Warp starfield ---------- */
(function starfield() {
  const canvas = document.getElementById("space");
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w, h, cx, cy, stars;
  const STAR_COUNT = 520;
  let speed = 0.35;          // base warp speed
  let targetSpeed = 0.35;
  const mouse = { x: 0, y: 0 };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cx = w / 2;
    cy = h / 2;
  }

  function makeStar() {
    return {
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * w,
      pz: 0,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: STAR_COUNT }, makeStar);
  }

  const palette = ["#ffffff", "#bcd0ff", "#9fe9ff", "#d7c3ff", "#ffc8e6"];

  function frame() {
    // soft trail fade for a sense of motion
    ctx.fillStyle = "rgba(3, 4, 12, 0.35)";
    ctx.fillRect(0, 0, w, h);

    speed += (targetSpeed - speed) * 0.05;

    // gentle parallax follow of the cursor
    const ox = mouse.x * 0.04;
    const oy = mouse.y * 0.04;

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.pz = s.z;
      s.z -= speed * 14;

      if (s.z < 1) {
        s.x = (Math.random() - 0.5) * w;
        s.y = (Math.random() - 0.5) * h;
        s.z = w;
        s.pz = s.z;
      }

      const sx = (s.x / s.z) * w + cx + ox;
      const sy = (s.y / s.z) * h + cy + oy;
      const px = (s.x / s.pz) * w + cx + ox;
      const py = (s.y / s.pz) * h + cy + oy;

      const r = Math.max(0.4, (1 - s.z / w) * 2.4);
      const alpha = Math.min(1, (1 - s.z / w) * 1.4);

      ctx.strokeStyle = palette[i % palette.length];
      ctx.globalAlpha = alpha;
      ctx.lineWidth = r;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(sx, sy);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX - cx;
    mouse.y = e.clientY - cy;
  });
  // brief warp burst on scroll for liveliness
  let warpTimer;
  window.addEventListener(
    "scroll",
    () => {
      targetSpeed = 1.6;
      clearTimeout(warpTimer);
      warpTimer = setTimeout(() => (targetSpeed = 0.35), 220);
    },
    { passive: true }
  );

  init();
  if (reduce) {
    // draw a single static frame
    ctx.fillStyle = "#03040c";
    ctx.fillRect(0, 0, w, h);
    for (const s of stars) {
      const sx = (s.x / s.z) * w + cx;
      const sy = (s.y / s.z) * h + cy;
      ctx.fillStyle = "#cdd9ff";
      ctx.globalAlpha = 1 - s.z / w;
      ctx.fillRect(sx, sy, 1.4, 1.4);
    }
  } else {
    frame();
  }
})();

/* ---------- Scroll reveals ---------- */
(function reveals() {
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger within a group
          setTimeout(() => entry.target.classList.add("in"), i * 90);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  items.forEach((el) => io.observe(el));
})();

/* ---------- Animated stat counters ---------- */
(function counters() {
  const nums = document.querySelectorAll(".stat-num");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || "";
        if (target === 0) {
          el.textContent = suffix; // for the ∞ "limits" stat
          io.unobserve(el);
          return;
        }
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const tick = () => {
          cur += step;
          if (cur >= target) {
            el.textContent = target + suffix;
          } else {
            el.textContent = cur + suffix;
            requestAnimationFrame(tick);
          }
        };
        tick();
        io.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  nums.forEach((el) => io.observe(el));
})();

/* ---------- Nav background on scroll ---------- */
(function navScroll() {
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
