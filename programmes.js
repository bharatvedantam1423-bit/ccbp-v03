/* S2 programmes: the section scrolls in under the hero as before, then pins. The first programme's frame
   plays in as the section arrives; from there, scrolling folds the open programme into a rail above and
   opens the next. Needs GSAP + ScrollTrigger; rides the page's Lenis (window.NW.lenis) when there is one. */

/* learner faces, cropped from NxtWave's own photos */
const PG_FACES = Array.from({ length: 13 }, (_, i) => `assets/programmes/faces/f${String(i).padStart(2, "0")}.webp`);
const PG_IC = (k) => `assets/programmes/icons/${k}.svg`;
const PG_FIG = (f) => `assets/programmes/fig/${f}`;

/* Programme content, as in Figma 8070:10931. Colours are the Figma fills.
   pos = horizontal focus of the landscape photo inside the portrait card, so the students stay in frame. */
const PROGRAMMES = [
  { name: "NxtWave Academy", short: "Academy", caption: "Build software skills alongside your studies.",
    tint: "#edf2fb", accent: "#2563eb", btn: "#2563eb", btnHover: "#1d4ed8",
    headGrad: "linear-gradient(109.72deg,#0f182d 10.83%,#235be1 104.11%)",
    logo: PG_FIG("academy-logo.png"), photo: PG_FIG("academy-home.webp"), pos: "31%", photoAlt: "A student learning on his laptop at home",
    headline: ["Become a Highly-paid", "Gen AI Engineer"],
    features: [["file", "50+ Real-world AI Projects"], ["users", "Learn from IITians &amp; MAANG Professionals"], ["briefcase", "End-to-End Placement Support"]],
    stat: { fig: "36000+", cap: "Students Preparing for AI Careers", side: "left", bg: "#dbeafe", grad: "linear-gradient(115.32deg,#0f182d 10.83%,#235be1 104.11%)" },
    cta: "Explore Academy", href: "https://www.ccbp.in/academy" },
  { name: "NxtWave Intensive", short: "Intensive", caption: "Get software training with placement support.",
    tint: "#eeedff", accent: "#4f46e5", btn: "#4f46e5", btnHover: "#4338ca",
    headGrad: "linear-gradient(109.72deg,#1b1851 10.83%,#2116db 104.11%)",
    logo: PG_FIG("intensive-logo.png"), photo: PG_FIG("intensive-class.webp"), pos: "10%", photoAlt: "An Intensive student taking notes at her laptop in a classroom",
    headline: ["Get Software Training", "with Placement Support"],
    features: [["grad", "For 2025, 2026 &amp; 2027 Graduates"], ["building", "Learn Online or at Our Training Centers"], ["book-i", "Open to Any Branch, Any Degree"]],
    stat: { fig: "04", cap: "Cities with Training Centers", side: "right", bg: "#fff", border: "1px solid #e2e8f0", grad: "linear-gradient(115.02deg,#1b1851 10.83%,#2116db 104.11%)" },
    cta: "Explore Intensive", href: "https://www.ccbp.in/intensive" },
  { name: "NxtWave Institute of Advanced Technologies", short: "NIAT", caption: "Start your journey in AI/ML, Robotics, Data Science &amp; more.",
    tint: "#ffecec", accent: "#991b1b", btn: "#991b1b", btnHover: "#7f1d1d",
    headGrad: "linear-gradient(109.72deg,#360c0c 10.83%,#cf0707 104.11%)",
    logo: PG_FIG("niat-logo.svg"), photo: PG_FIG("niat-lab.webp"), pos: "43%", photoAlt: "Two NIAT students building a robot car in a lab",
    headline: ["Build Your Degree and", "Tech Career Together"],
    features: [["cpu", "Learn AI/ML, Robotics, Data Science &amp; More"], ["rocket", "Industry-Ready Upskilling"], ["book-n", "Designed for Students After 12th"]],
    stat: { fig: "35+", cap: "UGC-approved institutions", side: "left", bg: "#fffefe", grad: "linear-gradient(115.32deg,#0f182d 10.83%,#235be1 104.11%)" },
    cta: "Explore NIAT", href: "#" },
];

(() => {
  const stage = document.getElementById("programmes"), vdeck = stage && stage.querySelector(".vdeck");
  if (!vdeck || !window.gsap || !window.ScrollTrigger) return;
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
        <span class="i">0${i + 1}</span><b>${p.short}</b><em>${p.caption}</em>
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
            <figure class="f-photo"><img src="${p.photo}" alt="${p.photoAlt}" loading="lazy"></figure>
            <div class="f-stat is-${s.side}">
              <div class="faces" aria-hidden="true"><div class="faces__row">${pools[i].slice(0, VISIBLE + 1).map((f) => `<img src="${f}" alt="">`).join("")}</div></div>
              <div><strong>${s.fig}</strong><span>${s.cap}</span></div>
            </div>
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

  /* photo card hover: the card tilts toward the pointer, the picture drifts the other way inside
     its frame and the stat card floats a little further, so the three read as layers. Size never changes. */
  if (!RM && matchMedia("(hover: hover)").matches) bands.forEach((b) => {
    const media = q(b, ".f-media"), img = q(b, ".f-photo img"), stat = q(b, ".f-stat");
    const ease = { duration: 0.8, ease: "power3.out", overwrite: "auto" };
    gsap.set(media, { transformPerspective: 1100 });
    media.addEventListener("pointerenter", () => gsap.to(img, { scale: 1.07, ...ease }));
    media.addEventListener("pointermove", (e) => {
      const r = media.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(media, { rotationY: x * 9, rotationX: -y * 7, ...ease });
      gsap.to(img, { x: -x * 18, y: -y * 18, ...ease });
      gsap.to(stat, { x: x * 14, y: y * 10, ...ease });
    });
    media.addEventListener("pointerleave", () => {
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
  const stacks = bands.map((b, i) => {
    const row = q(b, ".faces__row");
    gsap.set(row.children[VISIBLE], { scale: 0.4, opacity: 0 });
    return { row, card: q(b, ".f-stat"), full: fulls[i], pool: pools[i], next: VISIBLE + 1, busy: false };
  });
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
      stacks.forEach((s) => { if (!s.busy && isOpen(s.full) && !s.card.matches(":hover")) cycle(s); });
    gsap.delayedCall(2.4, tick);
  };
  if (!RM) gsap.delayedCall(2.4, tick);

  /* ---- scroll plumbing: the page's one Lenis drives ScrollTrigger ---- */
  gsap.registerPlugin(ScrollTrigger);
  const lenis = (window.NW && NW.lenis) || null;
  if (lenis) lenis.on("scroll", ScrollTrigger.update);

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
      .fromTo(q(f, ".f-photo"), { clipPath: "inset(6% 5% 6% 5% round 24px)", y: 30, opacity: 0.4 }, { clipPath: "inset(0% 0% 0% 0% round 24px)", y: 0, opacity: 1, duration: 1, ease: "power3.out", clearProps: "clipPath" }, 0.05)
      .fromTo(q(f, ".f-photo img"), { scale: 1.12 }, { scale: 1, duration: 1.2, ease: "power2.out", clearProps: "transform" }, 0.05)
      .fromTo(q(f, ".f-stat"), { opacity: 0, y: 26, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)", clearProps: "transform" }, 0.6);
  };
  /* the open programme lifts away with the page, softening as it goes */
  const conceal = (i) => gsap.timeline()
    .fromTo(fulls[i], { y: 0, opacity: 1 }, { y: () => -0.32 * stage.clientHeight, opacity: 0, duration: 0.9, ease: "power2.in", immediateRender: false }, 0)
    .fromTo(fulls[i], { visibility: "visible" }, { visibility: "hidden", duration: 0, immediateRender: false });

  /* 1 · arriving: the hero's own scroll-away plays as before; once the section is most of the way up,
     Academy's frame plays in on its own clock (not scrubbed). Scrolling back into the hero resets it,
     so it plays again next time. The open programme's rail stays out of sight. */
  gsap.set(bars[0], { opacity: 0 });
  const intro = reveal(0).pause(0);
  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
  ScrollTrigger.create({
    trigger: stage, start: "top 45%",
    onEnter: () => {
      if (!RM && tl.time() < 0.05) return intro.restart();
      /* arriving already past Academy (a reload mid-section): finish the intro, then let the
         scrubbed timeline re-apply its state over it */
      intro.progress(1);
      const t = tl.time();
      tl.time(0, true).time(t, true);
    },
    onLeaveBack: () => intro.pause(0),
  });

  /* 2 · down the axis, scrubbed while pinned: the open programme folds into a rail above, the next one opens */
  tl.addLabel("p0", 0);
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
  });
  const at = (t) => st.start + (st.end - st.start) * (t / tl.duration());
  let going = false, idle = 0;
  const go = (label) => {
    const y = at(tl.labels[label]);
    if (!lenis) return scrollTo({ top: y, behavior: RM ? "auto" : "smooth" });
    going = true;
    lenis.scrollTo(y, { duration: 1.1, onComplete: () => setTimeout(() => (going = false), 50) });
  };
  /* between programmes, 20% of the way decides it */
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
    go((lenis.direction > 0 ? f > 0.2 : f > 0.8) ? next[0] : prev[0]);
  };
  if (lenis) lenis.on("scroll", () => { clearTimeout(idle); if (!going) idle = setTimeout(settle, 140); });
  stage.addEventListener("click", (e) => {
    const t = e.target.closest("[data-go]");
    if (!t) return;
    e.preventDefault(); go(t.dataset.go);
  });

  addEventListener("load", () => ScrollTrigger.refresh());
  window.NW = Object.assign(window.NW || {}, { programmes: { tl, st, go } });
})();
