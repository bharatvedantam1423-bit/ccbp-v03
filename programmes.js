/* Hero to programmes: the hero pins and its layers drift apart as you scroll, then the "Explore Programs"
   button grows into a window the camera pushes through. Inside it the programmes stack on the vertical
   axis: scrolling on folds the open programme into a rail above and opens the next. Needs GSAP +
   ScrollTrigger; rides the page's Lenis (window.NW.lenis) when there is one. */

/* learner faces, cropped from NxtWave's own photos */
const PG_FACES = Array.from({ length: 13 }, (_, i) => `assets/programmes/faces/f${String(i).padStart(2, "0")}.webp`);
const PG_IC = (k) => `assets/programmes/icons/${k}.svg`;
const PG_FIG = (f) => `assets/programmes/fig/${f}`;

/* Programme content, as in Figma 8070:10931. Colours are the Figma fills.
   pos = horizontal focus of the landscape photo inside the portrait card, so the students stay in frame.
   back = the side the card flips to (Figma 1089:356): its own photo (fit = object-position) and stat card (at = its place on the card). */
const PROGRAMMES = [
  { name: "NxtWave Academy", short: "Academy", caption: "Build software skills alongside your studies.",
    tint: "#edf2fb", accent: "#2563eb", btn: "#2563eb", btnHover: "#1d4ed8",
    headGrad: "linear-gradient(109.72deg,#0f182d 10.83%,#235be1 104.11%)",
    logo: PG_FIG("academy-logo.png"), photo: PG_FIG("academy-home.webp"), pos: "31%", photoAlt: "A student learning on his laptop at home",
    headline: ["Become a Highly-paid", "Gen AI Engineer"],
    features: [["file", "50+ Real-world AI Projects"], ["users", "Learn from IITians &amp; MAANG Professionals"], ["briefcase", "End-to-End Placement Support"]],
    stat: { fig: "36000+", cap: "Students Preparing for AI Careers", side: "left", bg: "#dbeafe", grad: "linear-gradient(115.32deg,#0f182d 10.83%,#235be1 104.11%)" },
    back: { photo: PG_FIG("academy-back.webp"), fit: "50% 0",
      stat: { fig: "50+", cap: "Real-world AI Projects", at: "right:-90.5px;top:112px", w: 181, bg: "#dbeafe", grad: "linear-gradient(115.32deg,#0f182d 10.83%,#235be1 104.11%)" } },
    cta: "Explore Academy", href: "https://www.ccbp.in/academy" },
  { name: "NxtWave Intensive", short: "Intensive", caption: "Get software training with placement support.",
    tint: "#eeedff", accent: "#4f46e5", btn: "#4f46e5", btnHover: "#4338ca",
    headGrad: "linear-gradient(109.72deg,#1b1851 10.83%,#2116db 104.11%)",
    logo: PG_FIG("intensive-logo.png"), photo: PG_FIG("intensive-class.webp"), pos: "10%", photoAlt: "An Intensive student taking notes at her laptop in a classroom",
    headline: ["Get Software Training", "with Placement Support"],
    features: [["grad", "For 2025, 2026 &amp; 2027 Graduates"], ["building", "Learn Online or at Our Training Centers"], ["book-i", "Open to Any Branch, Any Degree"]],
    stat: { fig: "04", cap: "Cities with Training Centers", side: "right", bg: "#fff", border: "1px solid #e2e8f0", grad: "linear-gradient(115.02deg,#1b1851 10.83%,#2116db 104.11%)" },
    back: { photo: PG_FIG("intensive-back.webp"), fit: "50% 50%",
      stat: { fig: "Placement Drives", cap: "Happening Every Month", at: "left:-90.5px;top:395px", w: 193, bg: "#f1dbfe", grad: "linear-gradient(104.34deg,#0f182d 10.83%,#235be1 104.11%)" } },
    cta: "Explore Intensive", href: "https://www.ccbp.in/intensive" },
  { name: "NxtWave Institute of Advanced Technologies", short: "NIAT", caption: "Start your journey in AI/ML, Robotics, Data Science &amp; more.",
    tint: "#ffecec", accent: "#991b1b", btn: "#991b1b", btnHover: "#7f1d1d",
    headGrad: "linear-gradient(109.72deg,#360c0c 10.83%,#cf0707 104.11%)",
    logo: PG_FIG("niat-logo.svg"), photo: PG_FIG("niat-lab.webp"), pos: "43%", photoAlt: "Two NIAT students building a robot car in a lab",
    headline: ["Build Your Degree and", "Tech Career Together"],
    features: [["cpu", "Learn AI/ML, Robotics, Data Science &amp; More"], ["rocket", "Industry-Ready Upskilling"], ["book-n", "Designed for Students After 12th"]],
    stat: { fig: "35+", cap: "UGC-approved institutions", side: "left", bg: "#fffefe", grad: "linear-gradient(115.32deg,#0f182d 10.83%,#235be1 104.11%)" },
    back: { photo: PG_FIG("niat-back.webp"), fit: "50% 50%",
      stat: { fig: "1200+", cap: "AI-powered<br>Projects Built", at: "right:-40.77px;top:89.5px", w: 118, bg: "#fff", grad: "linear-gradient(105.27deg,#0f182d 10.83%,#235be1 104.11%)" } },
    cta: "Explore NIAT", href: "#" },
];

(() => {
  const stage = document.getElementById("hero"), portal = document.getElementById("programmes");
  const vdeck = portal && portal.querySelector(".vdeck");
  if (!stage || !vdeck || !window.gsap || !window.ScrollTrigger) return;
  const P = PROGRAMMES;
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const VISIBLE = 4;   /* faces in view in a stat card; one more waits hidden at the end of the row */

  /* each programme starts its face pool at a different learner */
  const pools = P.map((_, i) => [...PG_FACES.slice(i * 4), ...PG_FACES.slice(0, i * 4)]);

  vdeck.innerHTML = P.map((p, i) => {
    const s = p.stat;
    return `
    <article class="band${i === 0 ? " is-first" : ""}" style="--tint:${p.tint};--accent:${p.accent};--btn:${p.btn};--btn-hover:${p.btnHover};--head-grad:${p.headGrad};--stat-bg:${s.bg};--stat-grad:${s.grad};--pos:${p.pos}${s.border ? `;--stat-border:${s.border}` : ""}">
      <button class="band__bar" type="button" data-go="p${i}" aria-label="Open ${p.name}">
        <b>${p.short}</b><em>${p.caption}</em>
        <span class="go"><span>View programme</span><i>${ARROW}</i></span></button>
      <div class="band__full">
        <div class="frame">
          <div class="f-text">
            <img class="f-logo" src="${p.logo}" alt="${p.name}">
            <div class="f-body">
              <div class="f-top">
                <p class="f-chip"><img src="${PG_IC("calendar")}" alt=""><span>Next Batch: <b>10th Nov, 2025</b></span></p>
                <h3 class="f-head">${p.headline.map((l) => `<span class="ln"><span>${l}</span></span>`).join("")}</h3>
                <ul class="f-list">${p.features.map(([k, f]) => `<li><span class="ic"><img src="${PG_IC(k)}" alt=""></span><span class="tx">${f}</span></li>`).join("")}</ul>
              </div>
              <a class="f-cta" href="${p.href}">${p.cta}${ARROW}</a>
            </div>
          </div>
          <div class="f-media">
            <div class="f-flip"><div class="f-card">
              <div class="f-face is-front">
                <figure class="f-photo"><img src="${p.photo}" alt="${p.photoAlt}" loading="lazy"></figure>
                <div class="f-pop is-${s.side}"><div class="f-stat">
                  <div class="faces" aria-hidden="true"><div class="faces__row">${pools[i].slice(0, VISIBLE + 1).map((f) => `<img src="${f}" alt="">`).join("")}</div></div>
                  <div><strong>${s.fig}</strong><span>${s.cap}</span></div>
                </div></div>
              </div>
              <div class="f-face is-back" aria-hidden="true">
                <figure class="f-photo"><img src="${p.back.photo}" alt="" loading="lazy" style="object-position:${p.back.fit}"></figure>
                <div class="f-pop is-back" style="${p.back.stat.at}"><div class="f-stat" style="width:${p.back.stat.w}px;--stat-bg:${p.back.stat.bg};--stat-grad:${p.back.stat.grad}">
                  <div><strong>${p.back.stat.fig}</strong><span>${p.back.stat.cap}</span></div>
                </div></div>
              </div>
            </div></div>
          </div>
        </div>
      </div>
    </article>`;
  }).join("");

  const bands = [...vdeck.children], q = (el, s) => el.querySelector(s);
  const bars = bands.map((b) => q(b, ".band__bar")), fulls = bands.map((b) => q(b, ".band__full"));

  /* the Figma frame is 1440 x 800; scale it to the space between the rails */
  const narrow = () => innerWidth <= 860, BAR = () => (narrow() ? 52 : 64);
  const measure = () => {
    const h = stage.clientHeight - 2 * BAR(), w = stage.clientWidth;
    vdeck.style.setProperty("--fh", h + "px");
    vdeck.style.setProperty("--s", Math.min(w / 1440, h / 800, 1.25).toFixed(4));
  };
  measure(); addEventListener("resize", measure);

  /* photo card follows the pointer anywhere over the open programme (text and CTA included): the card
     tilts toward it, the picture drifts the other way inside its frame and the stat card floats a little
     further, so the three read as layers. Size never changes. */
  if (!RM && matchMedia("(hover: hover)").matches) bands.forEach((b, i) => {
    const area = fulls[i], media = q(b, ".f-media"), img = b.querySelectorAll(".f-photo img"), stat = b.querySelectorAll(".f-stat");
    const ease = { duration: 0.8, ease: "power3.out", overwrite: "auto" };
    gsap.set(media, { transformPerspective: 1100 });
    area.addEventListener("pointerenter", () => gsap.to(img, { scale: 1.07, ...ease }));
    area.addEventListener("pointermove", (e) => {
      const r = area.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(media, { rotationY: x * 9, rotationX: -y * 7, ...ease });
      gsap.to(img, { x: -x * 18, y: -y * 18, ...ease });
      gsap.to(stat, { x: x * 14, y: y * 10, ...ease });
    });
    area.addEventListener("pointerleave", () => {
      const back = { duration: 1, ease: "power3.out", overwrite: "auto" };
      gsap.to(media, { rotationY: 0, rotationX: 0, ...back });
      gsap.to(img, { x: 0, y: 0, scale: 1, ...back });
      gsap.to(stat, { x: 0, y: 0, ...back });
    });
  });

  /* stat card faces: four in view. Every 2.4s the first learner steps out, the stack slides one place left
     and the next learner pops in at the end; the one who left is recycled as the hidden fifth with a new face.
     Runs on GSAP's clock, so it pauses in a background tab instead of piling up, and only for the open
     programme, and holds while the card is hovered. */
  const STEP = 28 - 9.625;
  const stacks = bands.flatMap((b, i) => [...b.querySelectorAll(".faces__row")].map((row) => {
    gsap.set(row.children[VISIBLE], { scale: 0.4, opacity: 0 });
    return { row, card: b, full: fulls[i], pool: pools[i], next: VISIBLE + 1, busy: false };
  }));
  const isOpen = (el) => getComputedStyle(el).visibility === "visible" && +getComputedStyle(el).opacity > 0.5;
  const cycle = (s) => {
    const first = s.row.children[0], incoming = s.row.children[VISIBLE];
    s.busy = true;
    gsap.timeline({ onComplete: () => {
        s.row.appendChild(first);
        first.src = s.pool[s.next++ % s.pool.length];
        gsap.set(s.row, { x: 0 });
        gsap.set(first, { scale: 0.4, opacity: 0 });
        s.busy = false;
      } })
      .to(first, { scale: 0.6, opacity: 0, duration: 0.35, ease: "power2.in" }, 0)
      .to(s.row, { x: -STEP, duration: 0.6, ease: "power3.inOut" }, 0.1)
      .to(incoming, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, 0.3);
  };
  const tick = () => {
    const r = stage.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight)
      stacks.forEach((s) => { if (!s.busy && isOpen(s.full) && !q(s.card, ".f-stat:hover")) cycle(s); });
    gsap.delayedCall(2.4, tick);
  };
  if (!RM) gsap.delayedCall(2.4, tick);

  /* card flip, after Framer University's "3D Flipping Project Card": the open programme's card
     turns left to right (rotateY 180, perspective 1200) in 1s on a sharp in-out curve, from the front
     (photo + stat card) to the back from Figma 1089:356 and back again. Each stat card floats 70px off its
     face, so it turns with the card as a layer in front of the photo; the leaving one shrinks to 0.6 and
     drifts toward the card's centre, the arriving one grows back from there. */
  const bezier = (x1, y1, x2, y2) => (t) => {
    const f = (a, b, u) => ((1 - 3 * b + 3 * a) * u + (3 * b - 6 * a)) * u * u + 3 * a * u;
    let lo = 0, hi = 1, u = t;
    for (let k = 0; k < 24; k++) { u = (lo + hi) / 2; if (f(x1, x2, u) < t) lo = u; else hi = u; }
    return f(y1, y2, u);
  };
  const FLIP = { duration: 1, ease: bezier(0.93, 0.03, 0.23, 0.99) };
  const flippers = bands.map((b, i) => {
    const pops = [...b.querySelectorAll(".f-pop")];
    const inward = (p) => (p.classList.contains("is-left") || p.style.left ? 15 : -15);
    return { card: q(b, ".f-card"), stats: pops.map((p) => q(p, ".f-stat")), drift: pops.map(inward), full: fulls[i], side: 0, tl: null };
  });
  /* timing: when a programme opens (from the hero, or from the programme before it) it starts on its front
     face and flips once its reveal has settled, then again every 5s while it stays open. A programme that
     closes goes back to its front face, ready to flip again next time it opens. */
  const EVERY = 5, FIRST = 1.3, now = () => gsap.ticker.time;
  const flipOnce = (f) => {
    const out = f.side, inn = 1 - f.side;
    f.side = inn;
    f.tl = gsap.timeline({ defaults: FLIP })
      .to(f.card, { rotationY: "+=180" }, 0)
      .fromTo(f.stats[out], { scale: 1, xPercent: 0 }, { scale: 0.6, xPercent: f.drift[out] }, 0)
      .fromTo(f.stats[inn], { scale: 0.6, xPercent: f.drift[inn] }, { scale: 1, xPercent: 0 }, 0);
  };
  const toFront = (f) => {
    if (f.tl) f.tl.kill();
    f.side = 0; f.tl = null;
    gsap.set(f.card, { rotationY: 0 });
    gsap.set(f.stats, { scale: 1, xPercent: 0 });
  };
  const watch = () => {
    const r = stage.getBoundingClientRect(), onScreen = r.bottom > 0 && r.top < innerHeight;
    flippers.forEach((f) => {
      const open = onScreen && isOpen(f.full);
      if (open && !f.open) f.next = now() + FIRST;
      else if (!open && f.open) toFront(f);
      f.open = open;
      if (open && now() >= f.next && !(f.tl && f.tl.isActive())) { flipOnce(f); f.next = now() + EVERY; }
    });
    gsap.delayedCall(0.15, watch);
  };
  if (!RM) watch();

  /* ---- scroll plumbing: the page's one Lenis drives ScrollTrigger ---- */
  gsap.registerPlugin(ScrollTrigger);
  const lenis = (window.NW && NW.lenis) || null;
  if (lenis) lenis.on("scroll", ScrollTrigger.update);

  const hq = (s) => stage.querySelector(s);
  const veil = q(portal, ".portal__veil"), nav = document.querySelector(".site-nav .hx-nav");
  const cta = hq(".h-btn--pri"), scene = hq(".hb-in"), hcopy = hq(".h-copy"), video = hq(".hb video");
  const head = hq(".h-head"), stats = hq(".h-sw"), ctas = hq(".h-cw");

  /* card and text appear: logo, chip, headline lines rising out of their masks, features, CTA;
     the photo card unmasks, then the stat card settles in */
  const reveal = (i) => {
    const f = fulls[i];
    return gsap.timeline()
      .fromTo(f, { visibility: "hidden" }, { visibility: "visible", y: 0, opacity: 1, duration: 0, immediateRender: false })
      .fromTo(q(f, ".f-logo"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.05)
      .fromTo(q(f, ".f-chip"), { opacity: 0, y: 14, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, 0.12)
      .fromTo(f.querySelectorAll(".f-head .ln > span"), { yPercent: 105 }, { yPercent: 0, duration: 0.75, stagger: 0.08, ease: "power4.out" }, 0.16)
      .fromTo(f.querySelectorAll(".f-list li"), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" }, 0.34)
      .fromTo(f.querySelectorAll(".f-list .ic"), { scale: 0.7 }, { scale: 1, duration: 0.5, stagger: 0.07, ease: "back.out(2)", clearProps: "transform" }, 0.34)
      .fromTo(q(f, ".f-cta"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", clearProps: "transform" }, 0.55)
      .fromTo(f.querySelectorAll(".f-photo"), { clipPath: "inset(6% 5% 6% 5% round 24px)", y: 30, opacity: 0.4 }, { clipPath: "inset(0% 0% 0% 0% round 24px)", y: 0, opacity: 1, duration: 1, ease: "power3.out", clearProps: "clipPath" }, 0.05)
      .fromTo(f.querySelectorAll(".f-photo img"), { scale: 1.12 }, { scale: 1, duration: 1.2, ease: "power2.out", clearProps: "transform" }, 0.05)
      .fromTo(f.querySelectorAll(".f-stat"), { opacity: 0, y: 26, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)", clearProps: "transform" }, 0.6);
  };
  /* the open programme lifts away with the page, softening as it goes */
  const conceal = (i) => gsap.timeline()
    .fromTo(fulls[i], { y: 0, opacity: 1 }, { y: () => -0.32 * stage.clientHeight, opacity: 0, duration: 0.9, ease: "power2.in", immediateRender: false }, 0)
    .fromTo(fulls[i], { visibility: "visible" }, { visibility: "hidden", duration: 0, immediateRender: false });

  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

  /* ---- hero parallax: pinned, so the layers drift up at different rates as you scroll —
     the headline fastest, the film slowest, which reads as depth ---- */
  /* every scroll step names both its start and end values: a refresh (a resize, or a phone's address bar
     showing or hiding) re-records starts, and a start recorded mid-scroll would stick on the way back up */
  const FT = (t, a, b, at) => tl.fromTo(t, a, { ...b, immediateRender: false }, at);
  tl.addLabel("start", 0);
  FT(scene, { yPercent: 0, scale: 1 }, { yPercent: -4, scale: 1.04, duration: 0.5, ease: "none" }, 0);
  FT(head, { y: 0 }, { y: -56, duration: 0.5, ease: "none" }, 0);
  FT(stats, { y: 0 }, { y: -38, duration: 0.5, ease: "none" }, 0);
  FT(ctas, { y: 0 }, { y: -22, duration: 0.5, ease: "none" }, 0);

  /* ---- the window: one progress value drives its box and its corners ---- */
  let from = null;
  const ctaBox = () => { const a = cta.getBoundingClientRect(), b = stage.getBoundingClientRect(); return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height }; };
  ScrollTrigger.addEventListener("refreshInit", () => (from = null));
  const win = { p: 0 };
  const lerp = (a, b, t) => a + (b - a) * t;
  const drawWindow = () => {
    from = from || ctaBox();
    const W = stage.clientWidth, H = stage.clientHeight, p = win.p;
    const x = lerp(from.x, 0, p), y = lerp(from.y, 0, p), w = lerp(from.w, W, p), h = lerp(from.h, H, p);
    const r = lerp(16, 0, p) + 28 * Math.sin(Math.PI * Math.min(1, p * 1.15));
    portal.style.clipPath = `inset(${y}px ${W - x - w}px ${H - y - h}px ${x}px round ${r}px)`;
  };

  /* 1 · the button becomes the way in: its label fades, the window grows from its exact box to the
     full screen, the hero copy lifts away and the film falls back behind the glass. The blue of the
     button carries into the window and clears as Academy shows through. */
  const T0 = 0.5;
  FT(portal, { visibility: "hidden" }, { visibility: "visible", duration: 0 }, T0);
  FT(cta, { color: "rgba(255,255,255,1)" }, { color: "rgba(255,255,255,0)", duration: 0.1 }, T0 - 0.1);
  FT(cta, { visibility: "visible" }, { visibility: "hidden", duration: 0 }, T0);
  FT(head, { opacity: 1, y: -56 }, { opacity: 0, y: -100, duration: 0.35, ease: "power2.in" }, T0);
  FT(stats, { opacity: 1, y: -38 }, { opacity: 0, y: -64, duration: 0.35, ease: "power2.in" }, T0 + 0.03);
  FT(hq(".h-btn--sec"), { opacity: 1 }, { opacity: 0, duration: 0.2 }, T0);
  if (nav) FT(nav, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25 }, T0);
  FT(scene, { scale: 1.04, opacity: 1 }, { scale: 1.16, opacity: 0.55, duration: 1, ease: "power2.in" }, T0);
  tl.fromTo(win, { p: 0 }, { p: 1, duration: 1, ease: "power3.inOut", onUpdate: drawWindow, onStart: () => { from = null; drawWindow(); } }, T0)
    .fromTo(vdeck, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: "power3.out", immediateRender: false }, T0 + 0.2)
    .fromTo(veil, { opacity: 1 }, { opacity: 0, duration: 0.45, ease: "power1.inOut" }, T0 + 0.2)
    .fromTo(bars[0], { opacity: 1 }, { opacity: 0, duration: 0.2, immediateRender: false }, T0)
    .fromTo([bars[1], bars[2]], { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }, T0 + 0.75)
    .add(reveal(0), T0 + 0.5)
    .addLabel("p0", T0 + 1.8);

  /* 2 · down the axis: the open programme folds into a rail above, the next one opens */
  const step = (a, b, at) => {
    tl.add(conceal(a), at)
      .fromTo(bands[a], { flexGrow: 1, flexBasis: "0px" }, { flexGrow: 0, flexBasis: () => BAR() + "px", duration: 1, ease: "power3.inOut", immediateRender: false }, at + 0.1)
      .fromTo(bands[b], { flexGrow: 0, flexBasis: () => BAR() + "px" }, { flexGrow: 1, flexBasis: "0px", duration: 1, ease: "power3.inOut", immediateRender: false }, at + 0.1)
      .fromTo(bars[b], { opacity: 1 }, { opacity: 0, duration: 0.25, immediateRender: false }, at)
      .fromTo(bars[a], { opacity: 0 }, { opacity: 1, duration: 0.35, immediateRender: false }, at + 0.75)
      .add(reveal(b), at + 0.45)
      .addLabel("p" + b, at + 2.0);
  };
  step(0, 1, tl.labels.p0 + 0.2);
  step(1, 2, tl.labels.p1 + 0.2);
  tl.to({}, { duration: 0.5 });

  /* ---- pin + settle. scrub 0.8: the timeline trails the scroll by 0.8s, subtly smooth ---- */
  const st = ScrollTrigger.create({
    trigger: stage, start: "top top", end: () => "+=" + innerHeight * 0.8 * tl.duration(),
    pin: true, scrub: RM ? true : 0.8, animation: tl, invalidateOnRefresh: true,
    /* a refresh re-renders the timeline without firing tween callbacks, so redraw the window from its current progress */
    onRefresh: () => { from = null; drawWindow(); },
  });
  /* on every frame the timeline moves, so a fast jump can never leave the window at a stale size;
     and once the window fills the screen the film behind it rests */
  let covered = false;
  tl.eventCallback("onUpdate", () => {
    if (tl.time() >= T0) drawWindow();
    const c = tl.time() >= T0 + 1;
    if (c === covered || !video || RM) return;
    covered = c;
    if (c) video.pause(); else { const pr = video.play(); if (pr && pr.catch) pr.catch(() => {}); }
  });
  const at = (t) => st.start + (st.end - st.start) * (t / tl.duration());
  let going = false, idle = 0;
  const go = (label) => {
    const y = at(tl.labels[label]);
    if (!lenis) return scrollTo({ top: y, behavior: RM ? "auto" : "smooth" });
    going = true;
    lenis.scrollTo(y, { duration: 1.1, force: true, onComplete: () => setTimeout(() => (going = false), 50) });
  };
  /* leaving the hero takes only a nudge; between programmes, 20% of the way decides it */
  const settle = () => {
    const y = lenis.scroll;
    if (going || y <= st.start + 2 || y >= st.end - 2) return;
    const t = ((y - st.start) / (st.end - st.start)) * tl.duration();
    const stops = Object.entries(tl.labels).sort((a, b) => a[1] - b[1]);
    if (stops.some(([, v]) => Math.abs(v - t) < 0.03)) return;
    const next = stops.find(([, v]) => v > t + 0.02), prev = [...stops].reverse().find(([, v]) => v < t - 0.02);
    if (!next && lenis.direction > 0) return;
    if (!prev || !next) return go((next || prev)[0]);
    const f = (t - prev[1]) / (next[1] - prev[1]);
    const fwd = prev[0] === "start" ? 0.06 : 0.2;
    go((lenis.direction > 0 ? f > fwd : f > 0.8) ? next[0] : prev[0]);
  };
  if (lenis) lenis.on("scroll", () => { clearTimeout(idle); if (!going) idle = setTimeout(settle, 140); });
  addEventListener("resize", () => { from = null; });
  /* "Explore Programs", the nav's Programmes link and the rails all travel the timeline. Caught in the
     capture phase so Lenis's own anchor handling never sees the click. */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-go]");
    if (!t) return;
    e.preventDefault(); e.stopPropagation(); go(t.dataset.go);
  }, true);

  /* pointer parallax on the hero: the film leans away from the cursor, the copy a touch toward it */
  if (!RM && matchMedia("(hover: hover)").matches) {
    const qs = [gsap.quickTo(scene, "x", { duration: 1.2, ease: "power3.out" }), gsap.quickTo(scene, "y", { duration: 1.2, ease: "power3.out" }),
      gsap.quickTo(hcopy, "x", { duration: 1.2, ease: "power3.out" }), gsap.quickTo(hcopy, "y", { duration: 1.2, ease: "power3.out" })];
    stage.addEventListener("pointermove", (e) => {
      if (tl.time() > T0) return;
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      qs[0](-x * 22); qs[1](-y * 12); qs[2](x * 8); qs[3](y * 5);
    });
    stage.addEventListener("pointerleave", () => qs.forEach((f) => f(0)));
  }

  addEventListener("load", () => ScrollTrigger.refresh());
  window.NW = Object.assign(window.NW || {}, { programmes: { tl, st, go } });
})();
