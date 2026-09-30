/* Design notes: the switch in the bottom-left corner shows or hides a card annotating the section in view.
   The hero's notes show until a programme opens inside the "Explore Programs" window; from then on the
   programmes' notes. The switch's state is remembered per browser. */
const DESIGN_NOTES = [
  { n: "01", title: "Hero",
    body: [
      "The bright, open environment presents the future of tech as inviting and full of possibility. Repeating arches create a sense of moving forward, connecting the visual to NxtWave’s message of growth and preparation.",
      "The centred headline keeps that message clear. Hiring figures add reassurance, while the two actions let visitors explore independently or seek guidance.",
    ],
    principles: [
      ["Visual Hierarchy", "The headline, proof, and actions establish a clear reading order."],
      ["Gestalt Continuity", "The arches and perspective guide the eye towards the centre."],
      ["Social Proof", "Learner hiring figures and company counts support confidence in the message."],
    ] },
  { n: "02", title: "Three Programmes",
    body: [
      "The accordion gives each programme space to explain its value while keeping the other choices within reach. Short summaries introduce the paths; opening one reveals its benefits and next action.",
      "Learner photography makes the experience relatable. Distinct programme colours support recognition, while the badges highlight relevant evidence. The intended feeling is clarity: “I can see where I fit.”",
    ],
    principles: [
      ["Progressive Disclosure", "One programme’s details appear at a time, keeping the section manageable."],
      ["Hick’s Law", "Three clearly described paths and consistent actions simplify the decision."],
      ["Recognition over Recall", "Visible names and summaries help visitors identify and revisit each option."],
      ["Visual Hierarchy", "The expanded panel guides attention from the programme’s value to its benefits and action."],
    ] },
];
const DESIGN_NOTES_TOTAL = 14;

(() => {
  const KEY = "nw-design-notes";
  const store = { get() { try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; } },
    set(v) { try { localStorage.setItem(KEY, v ? "1" : "0"); } catch (e) {} } };

  const root = document.createElement("aside");
  root.className = "dn";
  root.setAttribute("aria-label", "Design notes");
  root.innerHTML = `
    <div class="dn__card" id="dn-card" data-lenis-prevent aria-live="polite"><div class="dn__body"></div></div>
    <button class="dn__sw" type="button" role="switch" aria-checked="false" aria-controls="dn-card">
      <span class="dn__track" aria-hidden="true"></span><span>Design notes</span></button>`;
  document.body.appendChild(root);
  const sw = root.querySelector(".dn__sw"), card = root.querySelector(".dn__card"), body = root.querySelector(".dn__body");

  const render = (i) => {
    const d = DESIGN_NOTES[i];
    body.innerHTML = `
      <p class="dn__n"><b>${d.n}</b> / ${DESIGN_NOTES_TOTAL}</p>
      <h2 class="dn__h">${d.title}</h2>
      ${d.body.map((t) => `<p class="dn__p">${t}</p>`).join("")}
      <p class="dn__sub">Design &amp; UX principles</p>
      <ul class="dn__list">${d.principles.map(([h, t]) => `<li><b>${h}</b><span>${t}</span></li>`).join("")}</ul>`;
    card.scrollTop = 0;
  };

  /* which section is in view: the programmes once one of them is open, else the hero */
  const fulls = () => document.querySelectorAll("#programmes .band__full");
  const current = () => {
    for (const f of fulls()) { const cs = getComputedStyle(f); if (cs.visibility === "visible" && +cs.opacity > 0.5) return 1; }
    return 0;
  };

  let shown = -1, swapT = 0;
  const show = (i, animate) => {
    if (i === shown) return;
    shown = i;
    clearTimeout(swapT);
    if (!animate) { render(i); return; }
    body.classList.add("is-swap");
    swapT = setTimeout(() => { render(i); body.classList.remove("is-swap"); }, 220);
  };

  const setOn = (on) => {
    root.classList.toggle("is-on", on);
    sw.setAttribute("aria-checked", String(on));
    card.setAttribute("aria-hidden", String(!on));
    store.set(on);
    if (on) show(current(), false);
  };
  sw.addEventListener("click", () => setOn(!root.classList.contains("is-on")));

  const watch = () => { if (root.classList.contains("is-on")) show(current(), true); };
  setInterval(watch, 200);
  show(current(), false);
  setOn(store.get());
})();
