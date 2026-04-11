const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    return target ? { link, section: target } : null;
  })
  .filter(Boolean);

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const open = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const active = `#${entry.target.id}`;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === active);
      });
    });
  },
  {
    threshold: 0.42,
    rootMargin: "-10% 0px -30% 0px",
  }
);

sections.forEach(({ section }) => {
  sectionObserver.observe(section);
});

const canvas = document.getElementById("spirodemo");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const frame = canvas.parentElement;

  let width = 0;
  let height = 0;
  let centerX = 0;
  let centerY = 0;
  let time = 0;
  let lastPoint = null;
  let activePalette = "moss";

  const state = {
    rotors: 3,
    speed: 1,
    complexity: 4,
    trail: 0.04,
  };

  const palettes = {
    moss: ["#2d4a3e", "#60736d", "#96a4a0", "#d9dfdd"],
    mist: ["#61757f", "#8c9ca4", "#b4c0c5", "#dde2e2"],
    ember: ["#675448", "#8a7468", "#afa79c", "#ddd7cf"],
    ink: ["#273439", "#52656d", "#87969b", "#d2d7d7"],
  };

  const trailCanvas = document.createElement("canvas");
  const trailCtx = trailCanvas.getContext("2d");

  const valueMap = {
    rotors: document.getElementById("val-rotors"),
    speed: document.getElementById("val-speed"),
    complexity: document.getElementById("val-complex"),
    trail: document.getElementById("val-trail"),
  };

  const updateValue = (key) => {
    const el = valueMap[key];
    if (!el) {
      return;
    }

    if (key === "speed") {
      el.textContent = state[key].toFixed(1);
      return;
    }

    if (key === "trail") {
      el.textContent = state[key].toFixed(2);
      return;
    }

    el.textContent = String(state[key]);
  };

  const resize = () => {
    const bounds = frame.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    width = Math.max(1, Math.floor(bounds.width));
    height = Math.max(1, Math.floor(bounds.height));
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    trailCanvas.width = Math.floor(width * ratio);
    trailCanvas.height = Math.floor(height * ratio);
    trailCtx.setTransform(ratio, 0, 0, ratio, 0, 0);

    centerX = width / 2;
    centerY = height / 2;
    lastPoint = null;
    trailCtx.clearRect(0, 0, width, height);
  };

  const rotorConfig = () => {
    const config = [];
    const baseRadius = Math.min(width, height) * 0.24;

    for (let i = 0; i < state.rotors; i += 1) {
      config.push({
        radius: baseRadius / (1 + i * 0.66),
        frequency: state.complexity * (i + 1) * 0.48 + (i % 2 === 0 ? 0.55 : -0.35),
        phase: (Math.PI * 2 * i) / state.rotors,
      });
    }

    return config;
  };

  const pointAt = (sample) => {
    let x = centerX;
    let y = centerY;
    rotorConfig().forEach((rotor) => {
      x += rotor.radius * Math.cos(rotor.frequency * sample + rotor.phase);
      y += rotor.radius * Math.sin(rotor.frequency * sample + rotor.phase);
    });
    return [x, y];
  };

  const paintBackdrop = () => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(255,255,255,0.72)");
    gradient.addColorStop(1, "rgba(220,217,209,0.9)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(31, 41, 42, 0.06)";
    ctx.lineWidth = 1;
    const step = Math.max(56, Math.floor(width / 8));

    for (let x = step; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = step; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const draw = () => {
    trailCtx.fillStyle = `rgba(233, 231, 223, ${state.trail})`;
    trailCtx.fillRect(0, 0, width, height);

    const palette = palettes[activePalette];

    for (let step = 0; step < 4; step += 1) {
      time += state.speed * 0.008;
      const nextPoint = pointAt(time);

      if (lastPoint) {
        const shade = palette[Math.floor((time * 18) % palette.length)];
        trailCtx.strokeStyle = shade;
        trailCtx.lineWidth = 1.35;
        trailCtx.beginPath();
        trailCtx.moveTo(lastPoint[0], lastPoint[1]);
        trailCtx.lineTo(nextPoint[0], nextPoint[1]);
        trailCtx.stroke();
      }

      lastPoint = nextPoint;
    }

    ctx.clearRect(0, 0, width, height);
    paintBackdrop();
    ctx.drawImage(trailCanvas, 0, 0, width, height);

    let anchorX = centerX;
    let anchorY = centerY;

    rotorConfig().forEach((rotor, index) => {
      const endX = anchorX + rotor.radius * Math.cos(rotor.frequency * time + rotor.phase);
      const endY = anchorY + rotor.radius * Math.sin(rotor.frequency * time + rotor.phase);

      ctx.strokeStyle = "rgba(31, 41, 42, 0.09)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(anchorX, anchorY, rotor.radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = palette[index % palette.length];
      ctx.beginPath();
      ctx.arc(endX, endY, 3.2, 0, Math.PI * 2);
      ctx.fill();

      anchorX = endX;
      anchorY = endY;
    });

    requestAnimationFrame(draw);
  };

  const bindRange = (id, key) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    element.addEventListener("input", () => {
      state[key] = Number(element.value);
      updateValue(key);
      lastPoint = null;
      trailCtx.clearRect(0, 0, width, height);
    });
  };

  bindRange("ctrl-rotors", "rotors");
  bindRange("ctrl-speed", "speed");
  bindRange("ctrl-complex", "complexity");
  bindRange("ctrl-trail", "trail");

  document.querySelectorAll(".swatch").forEach((button) => {
    button.addEventListener("click", () => {
      activePalette = button.dataset.palette || "moss";
      document.querySelectorAll(".swatch").forEach((swatch) => {
        swatch.classList.toggle("is-active", swatch === button);
      });
      lastPoint = null;
      trailCtx.clearRect(0, 0, width, height);
    });
  });

  Object.keys(state).forEach(updateValue);
  resize();
  window.addEventListener("resize", resize);
  draw();
}
