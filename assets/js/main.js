const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll("[data-scroll]");
const sectionLinks = new Map(Array.from(navLinks, (link) => [link.dataset.scroll, link]));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const activateNav = (sectionId) => {
  sectionLinks.forEach((link, key) => {
    link.classList.toggle("is-active", key === sectionId);
  });
};

document.querySelectorAll(".reveal").forEach((element) => {
  if (reduceMotion) {
    element.classList.add("is-visible");
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealObserver.observe(element);
});

if (!reduceMotion) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateNav(entry.target.dataset.section);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "-25% 0px -55% 0px",
    },
  );

  document.querySelectorAll("[data-section]").forEach((section) => {
    sectionObserver.observe(section);
  });
}

activateNav(window.location.hash ? window.location.hash.replace("#", "") : "home");

window.addEventListener("hashchange", () => {
  activateNav(window.location.hash ? window.location.hash.replace("#", "") : "home");
});

const aboutLayout = document.querySelector(".about-layout");
const aboutLinkSvg = aboutLayout?.querySelector(".about-linkmap");
const aboutLinkGlow = aboutLinkSvg?.querySelector(".about-linkmap__glow");
const aboutLinkPath = aboutLinkSvg?.querySelector(".about-linkmap__path");
const aboutLinkNode = aboutLinkSvg?.querySelector(".about-linkmap__node");
const aboutButtons = aboutLayout
  ? Array.from(aboutLayout.querySelectorAll("[data-about-link]"))
  : [];
const aboutPanels = aboutLayout
  ? new Map(
      Array.from(aboutLayout.querySelectorAll("[data-about-panel]"), (panel) => [
        panel.dataset.aboutPanel,
        panel,
      ]),
    )
  : new Map();

if (aboutLayout && aboutLinkSvg && aboutLinkGlow && aboutLinkPath && aboutLinkNode) {
  let activeAboutKey = "";

  const setAboutViewBox = () => {
    const bounds = aboutLayout.getBoundingClientRect();
    aboutLinkSvg.setAttribute("viewBox", `0 0 ${Math.max(1, bounds.width)} ${Math.max(1, bounds.height)}`);
  };

  const clearAboutActive = () => {
    activeAboutKey = "";
    aboutLayout.classList.remove("is-linked");
    aboutButtons.forEach((button) => button.classList.remove("is-active"));
    aboutPanels.forEach((panel) => panel.classList.remove("is-active"));
  };

  const drawAboutLink = (key) => {
    const trigger = aboutButtons.find((button) => button.dataset.aboutLink === key);
    const panel = aboutPanels.get(key);
    if (!trigger || !panel || window.innerWidth <= 900) {
      clearAboutActive();
      return;
    }

    activeAboutKey = key;
    setAboutViewBox();

    aboutButtons.forEach((button) => {
      button.classList.toggle("is-active", button === trigger);
    });
    aboutPanels.forEach((linkedPanel, panelKey) => {
      linkedPanel.classList.toggle("is-active", panelKey === key);
    });
    aboutLayout.classList.add("is-linked");

    const layoutRect = aboutLayout.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();

    const startX = triggerRect.right - layoutRect.left + 10;
    const startY = triggerRect.top - layoutRect.top + triggerRect.height / 2;
    const endX = panelRect.left - layoutRect.left + 12;
    const endY = panelRect.top - layoutRect.top + panelRect.height / 2;
    const elbowX = Math.max(startX + 28, Math.min(startX + (endX - startX) * 0.34, endX - 26));
    const pathData = `M ${startX} ${startY} L ${elbowX} ${startY} L ${elbowX} ${endY} L ${endX} ${endY}`;

    aboutLinkGlow.setAttribute("d", pathData);
    aboutLinkPath.setAttribute("d", pathData);
    aboutLinkNode.setAttribute("cx", `${endX}`);
    aboutLinkNode.setAttribute("cy", `${endY}`);
  };

  aboutButtons.forEach((button) => {
    const key = button.dataset.aboutLink;
    button.addEventListener("mouseenter", () => drawAboutLink(key));
    button.addEventListener("focus", () => drawAboutLink(key));
  });

  aboutPanels.forEach((panel, key) => {
    panel.addEventListener("mouseenter", () => drawAboutLink(key));
    panel.addEventListener("focusin", () => drawAboutLink(key));
  });

  aboutLayout.addEventListener("mouseleave", () => {
    clearAboutActive();
  });

  aboutLayout.addEventListener("focusout", (event) => {
    if (!aboutLayout.contains(event.relatedTarget)) {
      clearAboutActive();
    }
  });

  window.addEventListener("resize", () => {
    if (activeAboutKey) {
      drawAboutLink(activeAboutKey);
    }
  });

  setAboutViewBox();
}

const heroPlanet = document.querySelector(".hero-planet");
const finePointer = window.matchMedia("(pointer: fine)").matches;
const heroTraceSvg = heroPlanet?.querySelector(".hero-traces");
const orbitNodes = heroPlanet ? Array.from(heroPlanet.querySelectorAll(".orbit")) : [];
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const orbitPresets = [
  {
    key: "orbit--github",
    radius: 0.242,
    ringTeeth: 84,
    wheelTeeth: 30,
    penRatio: 0.72,
    phase: 0.55,
    rotation: -0.16,
    speed: 0.00016,
    shiftX: -0.018,
    shiftY: 0.02,
    stroke: "rgba(168, 196, 255, 0.38)",
    trail: "rgba(182, 206, 255, 0.98)",
    dash: "2 6",
  },
  {
    key: "orbit--linkedin",
    radius: 0.258,
    ringTeeth: 90,
    wheelTeeth: 32,
    penRatio: 0.74,
    phase: 2.18,
    rotation: 0.92,
    speed: 0.000145,
    shiftX: -0.028,
    shiftY: -0.026,
    stroke: "rgba(124, 177, 255, 0.34)",
    trail: "rgba(132, 186, 255, 0.96)",
    dash: "3 7",
  },
  {
    key: "orbit--ucla",
    radius: 0.264,
    ringTeeth: 92,
    wheelTeeth: 31,
    penRatio: 0.73,
    phase: 3.42,
    rotation: -0.88,
    speed: 0.000138,
    shiftX: 0.034,
    shiftY: -0.072,
    stroke: "rgba(142, 196, 255, 0.32)",
    trail: "rgba(178, 217, 255, 0.96)",
    dash: "2 7",
  },
  {
    key: "orbit--email",
    radius: 0.235,
    ringTeeth: 88,
    wheelTeeth: 35,
    penRatio: 0.69,
    phase: 4.62,
    rotation: 1.78,
    speed: 0.00017,
    shiftX: 0.046,
    shiftY: 0.064,
    stroke: "rgba(247, 191, 145, 0.32)",
    trail: "rgba(255, 201, 156, 0.96)",
    dash: "2 5",
  },
  {
    key: "orbit--resume",
    radius: 0.27,
    ringTeeth: 96,
    wheelTeeth: 36,
    penRatio: 0.77,
    phase: 1.14,
    rotation: -1.08,
    speed: 0.000135,
    shiftX: 0.04,
    shiftY: -0.02,
    stroke: "rgba(255, 204, 162, 0.34)",
    trail: "rgba(255, 211, 173, 0.96)",
    dash: "3 6",
  },
  {
    key: "orbit--fish",
    radius: 0.248,
    ringTeeth: 80,
    wheelTeeth: 28,
    penRatio: 0.71,
    phase: 3.36,
    rotation: 2.42,
    speed: 0.000155,
    shiftX: -0.012,
    shiftY: -0.012,
    stroke: "rgba(146, 200, 255, 0.34)",
    trail: "rgba(159, 208, 255, 0.96)",
    dash: "2 6",
  },
];

const orbitState = orbitNodes.map((node) => ({
  node,
  preset: orbitPresets.find((preset) => node.classList.contains(preset.key)),
  history: [],
  tracePath: null,
  tailGlowPath: null,
  tailPath: null,
  dot: null,
}));

const getSpirographTurns = (preset) => preset.wheelTeeth / gcd(preset.ringTeeth, preset.wheelTeeth);

const getOrbitPoint = (preset, theta, bounds) => {
  const scale = Math.min(bounds.width, bounds.height);
  const R = preset.radius * scale;
  const r = R * (preset.wheelTeeth / preset.ringTeeth);
  const d = r * preset.penRatio;
  const angle = theta + preset.phase;
  const ratio = (R + r) / r;
  const baseX = (R + r) * Math.cos(angle) - d * Math.cos(ratio * angle);
  const baseY = (R + r) * Math.sin(angle) - d * Math.sin(ratio * angle);
  const cosRotation = Math.cos(preset.rotation);
  const sinRotation = Math.sin(preset.rotation);
  const x = baseX * cosRotation - baseY * sinRotation + preset.shiftX * scale;
  const y = baseX * sinRotation + baseY * cosRotation + preset.shiftY * scale;

  return { x, y };
};

const buildHeroTraces = () => {
  if (!heroPlanet || !heroTraceSvg || orbitState.length === 0) {
    return;
  }

  const bounds = heroPlanet.getBoundingClientRect();
  const width = Math.max(1, Math.round(bounds.width));
  const height = Math.max(1, Math.round(bounds.height));
  heroTraceSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  heroTraceSvg.innerHTML = "";

  orbitState.forEach((state, index) => {
    const { preset } = state;
    if (!preset) {
      return;
    }

    const turns = getSpirographTurns(preset);
    const steps = Math.max(960, turns * 540);
    const totalTheta = Math.PI * 2 * turns;
    const points = [];
    for (let step = 0; step <= steps; step += 1) {
      const theta = (totalTheta * step) / steps;
      const point = getOrbitPoint(preset, theta, bounds);
      points.push(`${step === 0 ? "M" : "L"} ${width / 2 + point.x} ${height / 2 + point.y}`);
    }

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "trace-static");
    path.setAttribute("d", points.join(" "));
    path.setAttribute("stroke", preset.stroke);
    if (preset.dash) {
      path.setAttribute("stroke-dasharray", preset.dash);
    }
    heroTraceSvg.appendChild(path);

    const tailGlowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tailGlowPath.setAttribute("class", "trace-tail-glow");
    tailGlowPath.setAttribute("stroke", preset.trail);
    heroTraceSvg.appendChild(tailGlowPath);

    const tailPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tailPath.setAttribute("class", "trace-tail");
    tailPath.setAttribute("stroke", preset.trail);
    heroTraceSvg.appendChild(tailPath);

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("class", "trace-dot");
    dot.setAttribute("r", "3.2");
    dot.setAttribute("fill", preset.trail);
    heroTraceSvg.appendChild(dot);

    state.tracePath = path;
    state.tailGlowPath = tailGlowPath;
    state.tailPath = tailPath;
    state.dot = dot;
    state.history = [];
  });
};

if (heroPlanet && finePointer && !reduceMotion) {
  const resetHeroTilt = () => {
    heroPlanet.style.setProperty("--scene-rotate-x", "0deg");
    heroPlanet.style.setProperty("--scene-rotate-y", "0deg");
    heroPlanet.style.setProperty("--card-rotate-x", "0deg");
    heroPlanet.style.setProperty("--card-rotate-y", "0deg");
    heroPlanet.style.setProperty("--card-shift-x", "0px");
    heroPlanet.style.setProperty("--card-shift-y", "0px");
    heroPlanet.style.setProperty("--core-shift-x", "0px");
    heroPlanet.style.setProperty("--core-shift-y", "0px");
    heroPlanet.style.setProperty("--card-glow-x", "72%");
    heroPlanet.style.setProperty("--card-glow-y", "18%");
  };

  const updateHeroTilt = (event) => {
    const bounds = heroPlanet.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;
    const normalizedX = (relativeX - 0.5) * 2;
    const normalizedY = (relativeY - 0.5) * 2;

    heroPlanet.style.setProperty("--scene-rotate-x", `${normalizedY * -6}deg`);
    heroPlanet.style.setProperty("--scene-rotate-y", `${normalizedX * 7}deg`);
    heroPlanet.style.setProperty("--card-rotate-x", `${normalizedY * -7}deg`);
    heroPlanet.style.setProperty("--card-rotate-y", `${normalizedX * 9}deg`);
    heroPlanet.style.setProperty("--card-shift-x", `${normalizedX * 18}px`);
    heroPlanet.style.setProperty("--card-shift-y", `${normalizedY * 12}px`);
    heroPlanet.style.setProperty("--core-shift-x", `${normalizedX * 24}px`);
    heroPlanet.style.setProperty("--core-shift-y", `${normalizedY * 18}px`);
    heroPlanet.style.setProperty("--card-glow-x", `${50 + normalizedX * 18}%`);
    heroPlanet.style.setProperty("--card-glow-y", `${24 + normalizedY * 14}%`);
  };

  resetHeroTilt();
  heroPlanet.addEventListener("pointermove", updateHeroTilt);
  heroPlanet.addEventListener("pointerleave", resetHeroTilt);
}

if (heroPlanet && orbitState.length > 0) {
  const updateOrbitPositions = (time = 0) => {
    const bounds = heroPlanet.getBoundingClientRect();

    orbitState.forEach((state) => {
      const { node, preset } = state;
      if (!preset) {
        return;
      }

      const theta = time * preset.speed;
      const point = getOrbitPoint(preset, theta, bounds);
      node.style.setProperty("--orbit-x", `${point.x}px`);
      node.style.setProperty("--orbit-y", `${point.y}px`);

      state.history.push(point);
      if (state.history.length > 28) {
        state.history.shift();
      }

      const trailData = state.history
        .map((trailPoint, index) => {
          const x = bounds.width / 2 + trailPoint.x;
          const y = bounds.height / 2 + trailPoint.y;
          return `${index === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ");

      state.tailGlowPath?.setAttribute("d", trailData);
      state.tailPath?.setAttribute("d", trailData);
      state.dot?.setAttribute("cx", `${bounds.width / 2 + point.x}`);
      state.dot?.setAttribute("cy", `${bounds.height / 2 + point.y}`);
    });
  };

  const syncHeroOrbits = () => {
    buildHeroTraces();
    updateOrbitPositions(performance.now());
  };

  syncHeroOrbits();
  window.addEventListener("resize", syncHeroOrbits);

  if (!reduceMotion) {
    const animateOrbits = (time) => {
      updateOrbitPositions(time);
      requestAnimationFrame(animateOrbits);
    };

    requestAnimationFrame(animateOrbits);
  }
}

const canvas = document.querySelector(".starfield");
const context = canvas?.getContext("2d");

if (canvas && context) {
  const stars = [];
  const pulses = [];

  const random = (min, max) => Math.random() * (max - min) + min;

  const buildStars = () => {
    const count = window.innerWidth > 960 ? 170 : 110;
    stars.length = 0;
    pulses.length = 0;

    for (let index = 0; index < count; index += 1) {
      stars.push({
        x: random(0, window.innerWidth),
        y: random(0, window.innerHeight),
        size: random(0.6, 1.9),
        alpha: random(0.2, 0.85),
        drift: random(0.0005, 0.0025),
      });
    }

    for (let index = 0; index < 3; index += 1) {
      pulses.push({
        x: random(window.innerWidth * 0.15, window.innerWidth * 0.85),
        y: random(window.innerHeight * 0.08, window.innerHeight * 0.65),
        radius: random(140, 260),
        hue: index % 2 === 0 ? "255, 132, 82" : "106, 182, 255",
      });
    }
  };

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars();
  };

  const draw = (time) => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    pulses.forEach((pulse, index) => {
      const gradient = context.createRadialGradient(
        pulse.x,
        pulse.y,
        0,
        pulse.x,
        pulse.y,
        pulse.radius + Math.sin(time * 0.00025 + index) * 18,
      );

      gradient.addColorStop(0, `rgba(${pulse.hue}, 0.09)`);
      gradient.addColorStop(0.45, `rgba(${pulse.hue}, 0.04)`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      context.fillStyle = gradient;
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    });

    stars.forEach((star, index) => {
      const flicker = 0.65 + Math.sin(time * star.drift + index) * 0.35;
      context.globalAlpha = star.alpha * flicker;
      context.fillStyle = index % 10 === 0 ? "#8fc6ff" : "#ffffff";
      context.beginPath();
      context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      context.fill();
    });

    context.globalAlpha = 1;
    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize);

  if (!reduceMotion) {
    requestAnimationFrame(draw);
  } else {
    draw(0);
  }
}
