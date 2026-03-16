const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".nav-toggle");
const currentPage = document.body.dataset.page;
const nonoToggle = document.querySelector("[data-nono-toggle]");
const nonoPanel = document.getElementById("nono-panel");

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

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === currentPage) {
    link.classList.add("is-active");
  }
});

if (nonoToggle && nonoPanel) {
  const setNonoOpen = (isOpen) => {
    nonoPanel.hidden = !isOpen;
    nonoToggle.classList.toggle("is-awake", isOpen);
    nonoToggle.setAttribute("aria-expanded", String(isOpen));
  };

  setNonoOpen(false);

  nonoToggle.addEventListener("click", () => {
    const isOpen = nonoPanel.hidden;
    setNonoOpen(isOpen);
  });

  document.addEventListener("click", (event) => {
    if (!nonoPanel.hidden && !nonoPanel.contains(event.target) && !nonoToggle.contains(event.target)) {
      setNonoOpen(false);
    }
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let observer = null;

if (!reduceMotion) {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
    },
  );
}

document.querySelectorAll(".reveal").forEach((element) => {
  if (!observer) {
    element.classList.add("is-visible");
    return;
  }

  observer.observe(element);
});
