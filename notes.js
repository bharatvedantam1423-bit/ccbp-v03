/* Design notes: the switch in the bottom-left corner shows or hides a card annotating the section in view.
   The hero's notes show until a programme opens inside the "Explore Programs" window, then the programmes'
   notes, then each section below as its top passes 40% of the screen. Only sections on the page are
   numbered and counted. The switch's state is remembered per browser. */
const DESIGN_NOTES = [
  { id: "hero", name: "Hero",
    body: [
      "The bright, open environment presents the future of tech as inviting and full of possibility. Repeating arches create a sense of moving forward, connecting the visual to NxtWave’s message of growth and preparation.",
      "The centred headline keeps that message clear. Hiring figures add reassurance, while the two actions let visitors explore independently or seek guidance.",
    ],
    principles: [
      ["Visual Hierarchy", "The headline, proof, and actions establish a clear reading order."],
      ["Gestalt Continuity", "The arches and perspective guide the eye towards the centre."],
      ["Social Proof", "Learner hiring figures and company counts support confidence in the message."],
    ] },
  { id: "programmes", name: "Three Programmes",
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

  /* sections 3 onward: copied verbatim from ccbp-finalv02's design notes. An entry only shows when a
     section with that id is on the page ('student-projects' waits until that section is built). */
  { id: 'recognised-by', name: 'Recognised By',
    body: [`Confidence arrives at the exact moment it is most useful: right after the visitor has picked a programme and is deciding whether to act. Government and industry bodies do this in a single glance, with no reading required.`],
    principles: [
      ['Authority Bias', `Recognised institutions carry weight that self-description cannot.`],
      ['Cognitive Load', `Four marks say more, faster, than a paragraph.`] ] },

  { id: 'recognition', name: 'Awards & Recognition',
    body: [`A celebration moment. The grand treatment communicates pride, and pride reads as confidence in a way a small badge row never can. Real photographs of the founders on stage and on a national magazine cover make the recognition vivid and concrete. Placed where the page needs a lift, it gives the scroll a high point and keeps momentum into the sections that follow.`],
    principles: [
      ['Von Restorff Effect', `The section that looks different is the one people remember.`],
      ['Concreteness Effect', `Real photos are believed faster than claims.`] ] },

  { id: 'national-recognition', name: 'National Level Recognition',
    body: [`The same credibility, now seen from the learner’s side: the Union Education Minister honouring NxtWave students. It moves recognition from the company to the students, so a visitor sees people like themselves being honoured. The national emblem and a named minister make the moment instantly readable.`],
    principles: [
      ['Halo Effect', `A respected figure’s approval extends to everything connected to it.`],
      ['Similarity Bias', `Outcomes land harder when they happen to people like you.`] ] },

  { id: 'hiring-network', name: '3,000+ Companies Hiring',
    body: [`The headline makes the claim, the moving logo strip shows it — proof and statement arriving together. Motion communicates scale without asking anyone to read a list, and keeps the eye engaged through a section that is usually static.`],
    principles: [
      ['Jakob’s Law', `Visitors expect a hiring strip here and find it exactly where they look for it.`],
      ['Social Proof', `Thousands of companies hiring makes the choice feel safe.`] ] },

  { id: 'team', name: 'Taught',
    body: [`A scroll-driven storyboard that follows one learner being supported at each stage — IIT trainers, mentors, career coaches, working product developers. The animation turns the teaching team into a journey, which is far more memorable than names on a grid and gives the visitor a reason to scroll all the way through. Real faces with real industry roles show exactly who will be beside the learner.`],
    principles: [
      ['Storytelling Effect', `Sequences are understood and remembered better than lists.`],
      ['Law of Common Fate', `Elements moving together read as one support system.`] ] },

  { id: 'career-transformations', name: 'Career Transformations',
    body: [`Proof at scale. A rolling feed of placed learners with their CTC shows the breadth of outcomes. Faces and numbers together: the photo makes it a real person, the CTC makes it a real result. Written testimonials sit alongside, so the section carries both volume and voice.`],
    principles: [
      ['Bandwagon Effect', `The more people a visitor sees doing this, the more natural joining feels.`],
      ['Law of Similarity', `Repeated cards read as one large body of evidence.`] ] },

  /* Section 9 — no such section on the page yet; kept so it appears when built. */
  { id: 'student-projects', name: 'Student Projects',
    body: [`Visual proof first. A carousel of real projects shows what learners build, in the time it takes to read a headline. It turns “you will build real things” into something the visitor can see for themselves.`],
    principles: [
      ['Picture Superiority Effect', `Images are remembered far better than words.`],
      ['Concreteness Effect', `Visible, specific work is believed readily.`] ] },

  { id: 'masterclasses', name: 'Masterclasses',
    body: [`Senior people from world-class companies, shown teaching rather than listed. Video plus names: the video shows them in the room, the list shows who they are and where they work. It widens the answer to “who is in my corner” beyond the core trainers.`],
    principles: [
      ['Authority Bias', `Recognised companies carry weight without explanation.`],
      ['Multimedia Effect', `Video and words together are absorbed better than words alone.`] ] },

  { id: 'learner-experiences', name: 'Student Video Testimonials',
    body: [`Video is where facts become belief. By this point the visitor knows what NxtWave does; here they hear it from someone who lived it. Each video is one full career transformation in the learner’s own voice.`],
    principles: [
      ['Identifiable Victim Effect', `One person’s story moves people more than a statistic.`],
      ['Emotional Contagion', `A learner’s relief on camera becomes the visitor’s hope.`] ] },

  { id: 'what-companies-look-for', name: 'Our USPs',
    body: [`The offering shown visually, one idea per card, so the whole picture is absorbed without reading a block of text. The eye moves card to card and assembles the offer effortlessly.`],
    principles: [
      ['Miller’s Law', `A small set of items fits comfortably in working memory.`],
      ['Law of Common Region', `A shared boundary makes each card read as one clear idea.`] ] },

  { id: 'hiring-teams', name: 'Hiring Partner Perspective',
    body: [`The same conviction as Section 11, from the other side of the table: hiring managers explaining why they keep coming back. Learner stories say “I got the job.” This section says “we would hire again.”`],
    principles: [
      ['Source Credibility', `A claim carries more when the speaker has nothing to gain.`],
      ['Social Proof', `Many companies choosing the same source of talent reads as the safe choice.`] ] },

  { id: 'investors', name: 'Investors & VCs',
    body: [`Serious global investors backing the company, shown large so the point lands in a glance. It adds a financial dimension to the credibility already built in Sections 3–5.`],
    principles: [
      ['Halo Effect', `Respected backers lend their reputation.`],
      ['Visual Hierarchy', `Size signals importance and tells the eye this matters.`] ] },

  { id: 'featured-in-media', name: 'Media',
    body: [`NxtWave’s presence across press, television and national newspapers, in logos large enough to recognise instantly.`],
    principles: [
      ['Mere-Exposure Effect', `Familiar names are trusted faster.`],
      ['Authority Bias', `Established publications carry credibility of their own.`] ] },
];

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

  const items = DESIGN_NOTES.filter((d) => document.getElementById(d.id));
  const pad = (n) => String(n).padStart(2, "0");
  const render = (i) => {
    const d = items[i];
    body.innerHTML = `
      <p class="dn__n"><b>${pad(i + 1)}</b> / ${pad(items.length)}</p>
      <h2 class="dn__h">${d.name}</h2>
      ${d.body.map((t) => `<p class="dn__p">${t}</p>`).join("")}
      <p class="dn__sub">Design &amp; UX principles</p>
      <ul class="dn__list">${d.principles.map(([h, t]) => `<li><b>${h}</b><span>${t}</span></li>`).join("")}</ul>`;
    card.scrollTop = 0;
  };

  /* which section is in view: the last section below the programmes whose top has passed 40% of the
     screen; above those, the programmes once one of them is open, else the hero */
  const fulls = () => document.querySelectorAll("#programmes .band__full");
  const current = () => {
    const mark = innerHeight * 0.4;
    for (let i = items.length - 1; i >= 2; i--) if (document.getElementById(items[i].id).getBoundingClientRect().top <= mark) return i;
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
