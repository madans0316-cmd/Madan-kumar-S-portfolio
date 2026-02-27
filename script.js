// PAGE LOADER
window.addEventListener("load", () =>
  setTimeout(
    () => document.getElementById("pgLoader").classList.add("gone"),
    1400,
  ),
);

// CURSOR
const cDot = document.getElementById("cDot"),
  cRing = document.getElementById("cRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cDot.style.left = mx + "px";
  cDot.style.top = my + "px";
});
(function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cRing.style.left = rx + "px";
  cRing.style.top = ry + "px";
  requestAnimationFrame(animCursor);
})();
document
  .querySelectorAll(
    "a,button,.btn,.skill-block,.project-card,.photo-area,.stat-item,.hero-tag,.works-row,.info-card,.nav-initials",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cur-h"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cur-h"),
    );
  });
document.addEventListener("mousedown", () =>
  document.body.classList.add("cur-c"),
);
document.addEventListener("mouseup", () =>
  document.body.classList.remove("cur-c"),
);

// SCROLL PROGRESS
const spBar = document.getElementById("spBar");
window.addEventListener(
  "scroll",
  () => {
    const pct =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    spBar.style.width = pct + "%";
  },
  { passive: true },
);

// NAV SCROLL + ACTIVE
const mNav = document.getElementById("mNav");
const secList = document.querySelectorAll("section[id]");
window.addEventListener(
  "scroll",
  () => {
    mNav.classList.toggle("scrolled", window.scrollY > 40);
    let cur = "";
    secList.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    document.querySelectorAll(".nav-links a").forEach((a) => {
      a.style.color =
        a.getAttribute("href") === "#" + cur && !a.classList.contains("nav-cta")
          ? "var(--accent)"
          : "";
    });
  },
  { passive: true },
);

// REVEAL OBSERVER
const rvObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("vis");
        rvObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => rvObs.observe(el));

// EYEBROW LINE OBSERVER
document.querySelectorAll(".section-eyebrow").forEach((el) => {
  const o = new IntersectionObserver(
    (en) => {
      en.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("ey-vis");
          o.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  o.observe(el);
});

// SKILL BARS
const skObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".skill-fill").forEach((f, i) => {
          setTimeout(() => {
            f.style.width = f.dataset.w + "%";
            f.classList.add("do-shimmer");
          }, i * 160);
        });
        skObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 },
);
document.querySelectorAll(".skill-block").forEach((el) => skObs.observe(el));

// COUNTER ANIMATION
const ctObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target,
          target = Number.parseFloat(el.dataset.target),
          dec = Number.parseInt(el.dataset.dec || "0", 10),
          suf = el.dataset.suffix || "",
          dur = 1800,
          start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / dur, 1),
            eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (eased * target).toFixed(dec) + suf;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        ctObs.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll("[data-target]").forEach((el) => ctObs.observe(el));

// PHOTO CARD 3D TILT
const pCard = document.getElementById("pCard");
if (pCard) {
  pCard.addEventListener("mousemove", (e) => {
    const r = pCard.getBoundingClientRect(),
      cx = r.left + r.width / 2,
      cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2),
      dy = (e.clientY - cy) / (r.height / 2);
    pCard.style.transform = `perspective(900px) rotateY(${dx * 9}deg) rotateX(${-dy * 7}deg) scale(1.025)`;
  });
  pCard.addEventListener("mouseleave", () => {
    pCard.style.transition = "transform .65s cubic-bezier(.22,1,.36,1)";
    pCard.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale(1)";
  });
  pCard.addEventListener(
    "mouseenter",
    () => (pCard.style.transition = "transform .08s linear"),
  );
}

// PHOTO UPLOAD
function uploadPhoto(e) {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = (ev) => {
    const img = document.getElementById("heroPhoto");
    img.src = ev.target.result;
    img.style.display = "block";
    document.getElementById("photoPlaceholder").style.display = "none";
  };
  r.readAsDataURL(f);
}

// FORM SUBMIT
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("subBtn");
  btn.innerHTML =
    '<span class="btn-shine"></span>&#10003; Message Sent Successfully';
  btn.style.background = "#166534";
  btn.style.boxShadow = "0 8px 24px rgba(22,101,52,.3)";
  setTimeout(() => {
    btn.innerHTML = '<span class="btn-shine"></span>Send Message';
    btn.style.background = "";
    btn.style.boxShadow = "";
    e.target.reset();
  }, 3500);
}

// MAGNETIC BUTTONS
document.querySelectorAll(".btn,.btn-submit").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect(),
      dx = (e.clientX - r.left - r.width / 2) * 0.22,
      dy = (e.clientY - r.top - r.height / 2) * 0.22;
    btn.style.transform = `translate(${dx}px,${dy - 2}px) scale(1.03)`;
  });
  btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
});
