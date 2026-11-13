// ts2026 marquee — built from app/ts2026-marquee.tsx by scripts/build-dist.mjs (React entry removed).
// Plain TypeScript, no imports: compile with `tsc marquee.ts --target es2017` and load the result as a classic <script>.
// It starts itself on DOMContentLoaded; window.Ts2026Marquee.init() re-runs it and returns a teardown function.
(() => {
const TS2026_MARQUEE_ROOT_ID = "ts2026-marquee";
const TS2026_MARQUEE_HERO_ID = "ts2026-marquee-video";
// The text blade whose headline and button feed the card's CTA; its own markup stays hidden.
const TS2026_MARQUEE_CTA_ID = "ts2026-marquee-dropdown-btn";
const SLIDE_ID = /^ts2026-marquee-video-(\d+)$/;
const PREFIX = "ts2026-marquee-prompts";

const SWEEP_ANIMATION = "ts2026-marquee-border-sweep";
const SWEEP_HOVER_RATE = 0.35;

const HAVE_CURRENT_DATA = 2;
const FRAME_EVENTS = ["loadeddata", "seeked", "canplay", "error"] as const;
// Longest a picked slide waits for its video's first frame before cutting to the slide's poster instead.
const FRAME_WAIT_MS = 4000;
// Longest the outgoing slide stays under an incoming video that has not shown its first frame yet.
const PRESENT_WAIT_MS = 1000;
const ACTIVE = "data-ts2026-marquee-active";
const ENTERING = "data-ts2026-marquee-entering";
const DIM = "data-ts2026-marquee-dim";
// A lighter veil under the CTA a finished docked slide shows.
const SOFT = "data-ts2026-marquee-soft";
// Set while the veil is lifting with a cut to the next slide, so it drops at once instead of fading.
const CUT = "data-ts2026-marquee-cut";
// Set while the window chrome is faded out of the active slide.
const CHROME_OUT = "data-ts2026-marquee-chrome-out";
// [from, until] seconds into a slide's video during which its app goes full-bleed: the window chrome and the
// prompt input fade out at `from` and fade back in at `until`, keyed by slide index: slide 3 hides them from 43s
// to 53s. Desktop and tablet only: on phones the menu bar and input stay on throughout.
const CHROME_OUT_AT: Record<number, readonly [number, number]> = { 3: [43, 53] };
// Set while the prompt input is faded out together with the chrome; it also comes back if the video ends first.
const INPUT_OUT = "data-ts2026-marquee-input-out";
// Set once the chrome has come back at `until`, so it fades in rather than snapping back.
const CHROME_BACK = "data-ts2026-marquee-chrome-back";
// After a slide that hid the input, the CTA unfolds once the video ends and at least this long after the input
// came back.
const CTA_AFTER_INPUT_MS = 2000;
// How long the chrome takes to fade; it starts early enough to be gone at the cut.
const CHROME_FADE_S = 0.25;
// How long the hint takes to fade out (its CSS hides it 0.3s after data-hint goes); the first screen's prompts
// wait this long before they unfold, so the two never overlap.
const HINT_OUT_MS = 300;

const PHONE_QUERY = "(max-width: 767px)";
const TOUCH_QUERY = "(hover: none) and (pointer: coarse)";
const TABLET_QUERY = "(min-width: 768px) and (max-width: 1023px)";
const MOUSE_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const BLOBS = "ts2026-marquee-blobs";
// Farthest a depth-1 pill travels, as a share of its set's width (≈23px on the 1440 design).
const BLOB_REACH = 0.016;
// How long the pills take to catch up with the cursor; larger is lazier.
const BLOB_LAG_MS = 280;

// [x, y, width, height, opacity, blur, depth] in each set's own units, lifted from the Figma backgrounds.
// Every pill is fully rounded, so its height is also its corner diameter; depth scales how far it drifts.
type Blob = readonly [number, number, number, number, number, number, number];
type BlobSet = { name: string; width: number; height: number; blobs: readonly Blob[] };

const BLOB_SETS: readonly BlobSet[] = [
  {
    name: "desktop",
    width: 1440,
    height: 1106,
    blobs: [
      [91, 64, 482, 126, 0.04, 10, 0.8],
      [161, 390, 212, 68, 0.05, 25, 0.4],
      [-34.8145, 253.399, 212, 110, 0.05, 10, 1.1],
      [1242.91, 106.76, 308, 108, 0.07, 10, 1],
      [781, -43, 298, 98, 0.05, 10, 0.6],
      [1340.19, 474.58, 218, 76, 0.1, 10, 1.4],
      [1066.186, 304, 170, 71, 0.05, 25, 0.3],
    ],
  },
  {
    name: "2k",
    width: 2560,
    height: 1300,
    blobs: [
      [173, 82, 482, 126, 0.04, 10, 0.8],
      [414, 454, 261, 86, 0.05, 25, 0.4],
      [-19, 315.399, 212, 110, 0.05, 10, 1.1],
      [2158, 168.76, 308, 108, 0.05, 25, 0.5],
      [1677, -30, 298, 98, 0.05, 10, 0.6],
      [2365, 492, 265, 121, 0.1, 10, 1.4],
      [1863, 345, 223, 93, 0.05, 25, 0.3],
    ],
  },
  {
    name: "tablet",
    width: 768,
    height: 1306,
    blobs: [
      [-91, 51.2435, 307.414, 80.3614, 0.04, 6.37789, 0.8],
      [46, 328, 135, 54, 0.05, 15.9447, 0.4],
      [-72, 172.041, 135.211, 70.1568, 0.05, 6.37789, 1.1],
      [696.916, 78.5154, 196.439, 68.8812, 0.07, 6.37789, 1],
      [402.316, -17, 190.061, 62.5033, 0.05, 6.37789, 0.6],
    ],
  },
  {
    name: "mobile",
    width: 375,
    height: 1064,
    blobs: [
      [176.867, -19, 134.411, 52, 0.08, 6, 0.6],
      [-136.422, 23, 242.546, 87, 0.08, 6, 0.9],
      [265.801, 398, 131.379, 61, 0.08, 10, 1.2],
      [-40.4141, 486, 212.228, 68, 0.05, 25, 0.4],
      [261.758, 148, 155.634, 50, 0.08, 25, 0.5],
    ],
  },
];

type Ts2026MarqueeOptions = {
  placeholder?: string;
  expanded?: boolean;
  heading?: string;
  counter?: string;
  initialSlide?: number;
  storageKey?: string;
  ctaText?: string;
  ctaLabel?: string;
  ctaHref?: string;
  hint?: string;
  hintIntro?: string;
  hintTouch?: string;
  hintIntroTouch?: string;
  hintOpen?: string;
  hintOpenDuration?: number;
  hintOpenDelay?: number;
  pulseDelay?: number;
  pulseIntroDelay?: number;
  hintDelay?: number;
  hintPhoneTimeout?: number;
  autoOpenDelay?: number;
  imageDuration?: number;
};

type Ts2026MarqueeSlide = {
  index: number;
  title: string;
  kind: "image" | "video";
  media: HTMLImageElement | HTMLVideoElement;
};

const DEFAULTS: Required<Ts2026MarqueeOptions> = {
  placeholder: "Explore your data, ask a question, or build a viz...",
  expanded: false,
  heading: "Choose a prompt to explore",
  counter: "{explored} of {total} explored",
  initialSlide: 0,
  storageKey: "ts2026-marquee:explored",
  ctaText: "Want to explore more?",
  ctaLabel: "Download for free",
  ctaHref: "",
  hint: "Click to explore more prompts",
  hintIntro: "Click to explore suggested prompts",
  hintTouch: "Tap to explore more prompts",
  hintIntroTouch: "Tap to explore suggested prompts",
  // Shown above the first screen's prompts while they are open; 0 keeps it up until a prompt is picked,
  // a positive value hides it that many ms after it shows.
  hintOpen: "Choose a prompt below to see Studio in action",
  hintOpenDuration: 0,
  // How long after the prompts start to unfold the hint above them shows (the unfold itself takes 0.5s).
  hintOpenDelay: 600,
  pulseDelay: 400,
  pulseIntroDelay: 1000,
  hintDelay: 1000,
  // Phones only: the "Tap to explore…" hint hides this long after it shows.
  hintPhoneTimeout: 15000,
  // The first screen opens its prompts by itself this long after load; 0 turns it off.
  autoOpenDelay: 4000,
  imageDuration: 6000,
};

const STAR_SVG = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><g class="ts2026-marquee-spark ts2026-marquee-spark--main"><path d="M19.2187 16.1317L16.4604 17.5042C15.6317 17.9172 14.9614 18.5853 14.5471 19.4112L13.17 22.1604C12.975 22.5531 12.4103 22.5531 12.2153 22.1604L10.8382 19.4112C10.4239 18.5853 9.7536 17.9172 8.9249 17.5042L6.16662 16.1317C5.77258 15.9373 5.77258 15.3745 6.16662 15.1802L8.9249 13.8076C9.7536 13.3947 10.4239 12.7266 10.8382 11.9007L12.2153 9.1515C12.4103 8.75877 12.975 8.75877 13.17 9.1515L14.5471 11.9007C14.9614 12.7266 15.6317 13.3947 16.4604 13.8076L19.2187 15.1802C19.6127 15.3745 19.6127 15.9373 19.2187 16.1317Z" fill="url(#ts2026-marquee-spark-gradient)"/></g><g class="ts2026-marquee-spark ts2026-marquee-spark--echo ts2026-marquee-spark--top"><path d="M25.2349 8.6454L24.0528 8.05427C23.6953 7.88017 23.4109 7.58866 23.2322 7.23641L22.6391 6.0582C22.5579 5.88815 22.3141 5.88815 22.2288 6.0582L21.6357 7.23641C21.461 7.59271 21.1686 7.87612 20.8151 8.05427L19.633 8.6454C19.4624 8.72638 19.4624 8.96931 19.633 9.05433L20.8151 9.64546C21.1726 9.81956 21.457 10.1111 21.6357 10.4633L22.2288 11.6415C22.3101 11.8116 22.5538 11.8116 22.6391 11.6415L23.2322 10.4633C23.4069 10.107 23.6994 9.82361 24.0528 9.64546L25.2349 9.05433C25.4055 8.97335 25.4055 8.73042 25.2349 8.6454Z" fill="url(#ts2026-marquee-spark-gradient)"/></g><g class="ts2026-marquee-spark ts2026-marquee-spark--echo ts2026-marquee-spark--low"><path d="M25.2349 22.2454L24.0528 21.6543C23.6953 21.4802 23.4109 21.1887 23.2322 20.8364L22.6391 19.6582C22.5579 19.4881 22.3141 19.4881 22.2288 19.6582L21.6357 20.8364C21.461 21.1927 21.1686 21.4761 20.8151 21.6543L19.633 22.2454C19.4624 22.3264 19.4624 22.5693 19.633 22.6543L20.8151 23.2455C21.1726 23.4196 21.457 23.7111 21.6357 24.0633L22.2288 25.2415C22.3101 25.4116 22.5538 25.4116 22.6391 25.2415L23.2322 24.0633C23.4069 23.707 23.6994 23.4236 24.0528 23.2455L25.2349 22.6543C25.4055 22.5733 25.4055 22.3304 25.2349 22.2454Z" fill="url(#ts2026-marquee-spark-gradient)"/></g><defs><radialGradient id="ts2026-marquee-spark-gradient" cx="0" cy="0" r="1" gradientTransform="matrix(0.0471117 26.8433 -48.5825 0.0875902 15.6053 2.09453)" gradientUnits="userSpaceOnUse"><stop stop-color="#90D0FE"/><stop offset="0.413548" stop-color="#00B3FF"/><stop offset="1" stop-color="#022AC0"/></radialGradient></defs></svg>`;

const ARROW_SVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M6.02306 13.215L11.4406 7.79745C11.5874 7.65059 11.4732 7.40582 11.2774 7.40582H8.14438C7.94856 7.40582 7.8017 7.25896 7.8017 7.06314L7.8017 6.34516C7.8017 6.14934 7.94856 6.00248 8.14438 6.00248L13.8719 6.0188C14.0678 6.0188 14.2146 6.16566 14.2146 6.36148L14.2146 12.0727C14.2146 12.2685 14.0678 12.4154 13.8719 12.4154H13.1866C12.9908 12.4154 12.8439 12.2685 12.8439 12.0727L12.8439 8.9397C12.8276 8.72756 12.5828 8.61334 12.436 8.7602L7.01845 14.1777C6.8879 14.3083 6.67577 14.3246 6.54523 14.194L6.05569 13.7045C5.92515 13.574 5.89251 13.3455 6.02306 13.215V13.215Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/></svg>`;

const REPLAY_SVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M10.1409 5C11.5049 5 12.813 5.54183 13.7775 6.50631C14.7419 7.47078 15.2838 8.77889 15.2838 10.1429C15.2838 11.5068 14.7419 12.8149 13.7775 13.7794C12.813 14.7439 11.5049 15.2857 10.1409 15.2857C8.77693 15.2857 7.46883 14.7439 6.50436 13.7794C5.53988 12.8149 4.99805 11.5068 4.99805 10.1429H6.28376C6.28376 11.1658 6.69014 12.1469 7.41349 12.8703C8.13685 13.5936 9.11793 14 10.1409 14C11.1639 14 12.1449 13.5936 12.8683 12.8703C13.5917 12.1469 13.998 11.1658 13.998 10.1429C13.998 9.11988 13.5917 8.1388 12.8683 7.41545C12.1449 6.69209 11.1639 6.28571 10.1409 6.28571C9.04376 6.28571 8.30949 6.58196 7.76069 6.98602C7.64951 7.06788 7.54445 7.15519 7.44432 7.24725L8.3757 8.17863L7.75912 8.85718H4.99805L4.99805 6.09611L5.67659 5.47953L6.53472 6.33766C6.67848 6.20273 6.83252 6.07279 6.99839 5.95067C7.77913 5.37583 8.78351 5 10.1409 5Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/></svg>`;

const ARROW_RIGHT_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const PLUS_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8 2.5v11M2.5 8h11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

const ARROW_UP_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8 13V3.25M3.75 7.25 8 3l4.25 4.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  html?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function readSlide(section: HTMLElement, index: number, phone: boolean): Ts2026MarqueeSlide | null {
  const title = section.querySelector(".display_caption")?.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const host = section.querySelector<HTMLElement>(".video__wrapper, .image__wrapper") ?? section;
  const preferred = phone ? ".mobile-tablet-only video" : ".desktop-only video";
  const video = host.querySelector<HTMLVideoElement>(preferred) ?? host.querySelector<HTMLVideoElement>("video");
  if (video) return { index, title, kind: "video", media: video };
  const img = host.querySelector<HTMLImageElement>("img");
  if (img) return { index, title, kind: "image", media: img };
  return null;
}

type Ts2026MarqueeCta = { text: string; label: string; href: string };

const cleanText = (node: Element | null | undefined) => node?.textContent?.replace(/\s+/g, " ").trim() ?? "";

// Lifts the CTA copy out of the dropdown-button blade: its headline becomes the card's text, its button the
// action. Anything missing there falls back to the options, then to the hero's own primary button.
function readCta(hero: HTMLElement, options: Required<Ts2026MarqueeOptions>): Ts2026MarqueeCta {
  const blade = document.getElementById(TS2026_MARQUEE_CTA_ID);
  const button = blade?.querySelector<HTMLAnchorElement>("a.cta_button[href]") ?? null;
  const text = cleanText(blade?.querySelector(".headline")) || options.ctaText;
  const label = cleanText(button) || button?.closest("pbc-button")?.getAttribute("data-link-text") || options.ctaLabel;
  const href =
    options.ctaHref || button?.href || hero.querySelector<HTMLAnchorElement>("a.cta_button[href]")?.href || "#";
  return { text, label, href };
}

function collectSlides(root: HTMLElement, phone: boolean): Ts2026MarqueeSlide[] {
  const slides: Ts2026MarqueeSlide[] = [];
  for (const section of root.querySelectorAll<HTMLElement>('[id^="ts2026-marquee-video-"]')) {
    const match = SLIDE_ID.exec(section.id);
    if (!match) continue;
    const slide = readSlide(section, Number(match[1]), phone);
    if (slide) slides.push(slide);
  }
  return slides.sort((a, b) => a.index - b.index);
}

function cloneMedia(slide: Ts2026MarqueeSlide): HTMLImageElement | HTMLVideoElement {
  const clone = slide.media.cloneNode(true) as HTMLImageElement | HTMLVideoElement;
  clone.classList.add(`${PREFIX}__media`);
  clone.removeAttribute("id");
  clone.dataset.ts2026MarqueeSlide = String(slide.index);
  if (clone instanceof HTMLVideoElement) {
    // The poster is the hero still, framed differently from the video, so it would flash before playback on
    // every cut. It is kept aside and only put on when the first frame is late (see showPoster).
    const poster = clone.getAttribute("poster");
    if (poster) clone.dataset.ts2026MarqueePoster = poster;
    clone.removeAttribute("poster");
    clone.muted = true;
    clone.defaultMuted = true;
    clone.playsInline = true;
    clone.setAttribute("muted", "");
    clone.setAttribute("playsinline", "");
    if (!clone.hasAttribute("loop")) clone.loop = true;
    // Buffer every slide up front, so a picked prompt cuts straight to a decoded first frame.
    clone.preload = "auto";
  } else {
    clone.loading = "eager";
    clone.decoding = "async";
  }
  return clone;
}

// Puts the CMS poster on a video whose first frame is still loading, so the cut shows a still rather than black.
function showPoster(video: HTMLVideoElement) {
  const poster = video.dataset.ts2026MarqueePoster;
  if (poster && !video.poster) video.poster = poster;
}

function playVideo(video: HTMLVideoElement) {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  if (video.preload === "none") video.preload = "auto";
  if (video.readyState === 0) video.load();
  void video.play().catch(() => {});
}

function stopVideo(video: HTMLVideoElement) {
  video.pause();
  if (video.currentTime === 0) return;
  try {
    video.currentTime = 0;
  } catch {
  }
}

function primeVideo(video: HTMLVideoElement) {
  stopVideo(video);
  if (video.preload === "none") video.preload = "auto";
  if (video.readyState === 0) video.load();
}

// Calls `done` once `media` has reached the screen: a playing video's first presented frame, otherwise two
// painted frames. Returns a function that skips the wait and calls `done` right away.
function whenPresented(media: HTMLImageElement | HTMLVideoElement | undefined, done: () => void): () => void {
  let settled = false;
  let raf = 0;
  let handle = 0;
  const settle = () => {
    if (settled) return;
    settled = true;
    cancelAnimationFrame(raf);
    window.clearTimeout(timer);
    if (handle && media instanceof HTMLVideoElement) media.cancelVideoFrameCallback(handle);
    done();
  };
  const timer = window.setTimeout(settle, PRESENT_WAIT_MS);
  if (media instanceof HTMLVideoElement && !media.paused && typeof media.requestVideoFrameCallback === "function") {
    handle = media.requestVideoFrameCallback(() => {
      handle = 0;
      raf = requestAnimationFrame(settle);
    });
  } else {
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(settle);
    });
  }
  return settle;
}

function loadExplored(key: string): Set<number> {
  if (!key) return new Set();
  try {
    const raw = window.localStorage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((n): n is number => Number.isInteger(n)) : []);
  } catch {
    return new Set();
  }
}

function saveExplored(key: string, explored: Set<number>) {
  if (!key) return;
  try {
    window.localStorage.setItem(key, JSON.stringify([...explored].sort((a, b) => a - b)));
  } catch {
  }
}

function buildCard(slides: Ts2026MarqueeSlide[], options: Required<Ts2026MarqueeOptions>, cta: Ts2026MarqueeCta) {
  const card = el("div", PREFIX);
  card.id = PREFIX;
  card.dataset.state = "collapsed";

  const box = el("div", `${PREFIX}__box`);
  const panelId = `${PREFIX}-panel`;

  const composer = el("button", `${PREFIX}__composer`);
  composer.type = "button";
  composer.setAttribute("aria-expanded", "false");
  composer.setAttribute("aria-controls", panelId);
  const placeholder = el("span", `${PREFIX}__placeholder`);
  placeholder.textContent = options.placeholder;
  const plus = el("span", `${PREFIX}__plus`, PLUS_SVG);
  plus.setAttribute("aria-hidden", "true");
  const add = el("span", `${PREFIX}__add`, ARROW_UP_SVG);
  add.setAttribute("aria-hidden", "true");

  const hint = el("span", `${PREFIX}__hint`);
  hint.id = `${PREFIX}-hint`;
  hint.setAttribute("role", "tooltip");
  const hintText = el("span", `${PREFIX}__hint-text`);
  hintText.textContent = options.hintIntro;
  const hintArrow = el("span", `${PREFIX}__hint-arrow`);
  hintArrow.setAttribute("aria-hidden", "true");
  hint.append(hintText, hintArrow);
  composer.append(plus, placeholder, add, hint);

  const ctaWrap = el("div", `${PREFIX}__cta`);
  const ctaInner = el("div", `${PREFIX}__cta-inner`);
  const ctaLink = el("a", `${PREFIX}__cta-link`);
  ctaLink.href = cta.href;
  ctaLink.setAttribute("aria-label", `${cta.label}: ${cta.text}`);
  const ctaAction = el("span", `${PREFIX}__cta-action`, ARROW_RIGHT_SVG);
  ctaAction.prepend(Object.assign(document.createElement("span"), { textContent: cta.label }));
  ctaLink.append(
    Object.assign(el("span", `${PREFIX}__cta-text`), { textContent: cta.text }),
    ctaAction,
  );
  ctaInner.append(ctaLink);
  ctaWrap.append(ctaInner);

  const panel = el("div", `${PREFIX}__panel`);
  panel.id = panelId;
  panel.setAttribute("inert", "");
  const inner = el("div", `${PREFIX}__panel-inner`);

  const header = el("div", `${PREFIX}__header`);
  const heading = el("span", `${PREFIX}__heading`);
  heading.textContent = options.heading;
  heading.id = `${PREFIX}-heading`;
  const counter = el("span", `${PREFIX}__counter`);
  counter.setAttribute("aria-live", "polite");
  header.append(heading, counter);

  const list = el("ul", `${PREFIX}__list`);
  list.setAttribute("role", "list");
  list.setAttribute("aria-labelledby", heading.id);
  const buttons: HTMLButtonElement[] = [];
  slides.forEach((slide, order) => {
    const item = el("li", `${PREFIX}__item`);
    item.style.setProperty("--ts2026-marquee-order", String(order));
    const button = el("button", `${PREFIX}__prompt`);
    button.type = "button";
    button.id = `${PREFIX}-${slide.index}`;
    button.dataset.ts2026MarqueeSlide = String(slide.index);
    button.dataset.ts2026MarqueeKind = slide.kind;
    button.setAttribute("aria-pressed", "false");
    button.append(
      el("span", `${PREFIX}__icon`, STAR_SVG),
      Object.assign(el("span", `${PREFIX}__label`), { textContent: slide.title }),
      el("span", `${PREFIX}__arrow`, ARROW_SVG),
    );
    item.append(button);
    list.append(item);
    buttons.push(button);
  });

  inner.append(header, list);
  panel.append(inner);
  box.append(composer, panel, ctaWrap);
  card.append(box);
  return { card, box, composer, panel, hint, hintText, counter, buttons };
}

const num = (value: number) => String(Math.round(value * 1000) / 1000);

function blobSetSvg(set: BlobSet): string {
  const filters: string[] = [];
  const pills: string[] = [];
  set.blobs.forEach(([x, y, width, height, opacity, blur, depth], i) => {
    const id = `${BLOBS}-${set.name}-${i}`;
    const pad = blur * 3;
    filters.push(
      `<filter id="${id}" filterUnits="userSpaceOnUse" x="${num(x - pad)}" y="${num(y - pad)}" width="${num(width + pad * 2)}" height="${num(height + pad * 2)}" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${blur}"/></filter>`,
    );
    // The drift goes on the outer group so the blur's filter region travels with the pill.
    pills.push(
      `<g class="${BLOBS}__blob" style="--ts2026-marquee-blob-depth:${depth}"><g opacity="${opacity}" filter="url(#${id})"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${height / 2}" fill="#fff"/></g></g>`,
    );
  });
  return `<svg class="${BLOBS}__set" data-set="${set.name}" viewBox="0 0 ${set.width} ${set.height}" preserveAspectRatio="xMidYMin slice" style="--ts2026-marquee-blob-amp:${num(set.width * BLOB_REACH)}px" focusable="false"><defs>${filters.join("")}</defs>${pills.join("")}</svg>`;
}

// Draws the background pills (xMidYMin slice matches the gradient's `cover` at `center top`)
// and eases them toward the cursor on mouse devices.
function mountBlobs(): (() => void) | null {
  const hero = document.getElementById(TS2026_MARQUEE_HERO_ID);
  if (!hero || hero.querySelector(`:scope > .${BLOBS}`)) return null;

  const layer = el("div", BLOBS, BLOB_SETS.map(blobSetSvg).join(""));
  layer.setAttribute("aria-hidden", "true");
  hero.prepend(layer);

  const mouse = window.matchMedia?.(MOUSE_QUERY);
  const reducedMotion = window.matchMedia?.(REDUCED_MOTION_QUERY);
  const enabled = () => (mouse?.matches ?? true) && !(reducedMotion?.matches ?? false);

  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let frame = 0;
  let last = 0;

  const paint = () => {
    layer.style.setProperty("--ts2026-marquee-blob-x", x.toFixed(4));
    layer.style.setProperty("--ts2026-marquee-blob-y", y.toFixed(4));
  };
  const step = (now: number) => {
    const ease = 1 - Math.exp(-Math.min(now - last, 100) / BLOB_LAG_MS);
    last = now;
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    const settled = Math.abs(targetX - x) < 0.0005 && Math.abs(targetY - y) < 0.0005;
    if (settled) {
      x = targetX;
      y = targetY;
    }
    paint();
    frame = settled ? 0 : requestAnimationFrame(step);
  };
  const aim = (nextX: number, nextY: number) => {
    targetX = nextX;
    targetY = nextY;
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(step);
  };
  const recenter = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    x = y = targetX = targetY = 0;
    paint();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === "touch" || !enabled()) return;
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    aim(clamp((event.clientX / window.innerWidth) * 2 - 1), clamp((event.clientY / window.innerHeight) * 2 - 1));
  };
  const onPointerLeave = () => aim(0, 0);
  const onPreferenceChange = () => {
    if (!enabled()) recenter();
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onPointerLeave);
  mouse?.addEventListener("change", onPreferenceChange);
  reducedMotion?.addEventListener("change", onPreferenceChange);

  return () => {
    window.removeEventListener("pointermove", onPointerMove);
    document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    mouse?.removeEventListener("change", onPreferenceChange);
    reducedMotion?.removeEventListener("change", onPreferenceChange);
    cancelAnimationFrame(frame);
    layer.remove();
  };
}

function initTs2026Marquee(userOptions: Ts2026MarqueeOptions = {}): (() => void) | null {
  const unmountBlobs = mountBlobs();
  const phone = window.matchMedia?.(PHONE_QUERY);
  let teardown = mount(userOptions, phone?.matches ?? false);
  const onChange = (event: MediaQueryListEvent) => {
    teardown?.();
    teardown = mount(userOptions, event.matches);
  };
  if (teardown) phone?.addEventListener("change", onChange);
  if (!teardown && !unmountBlobs) return null;
  return () => {
    phone?.removeEventListener("change", onChange);
    teardown?.();
    unmountBlobs?.();
  };
}

function mount(userOptions: Ts2026MarqueeOptions, phone: boolean): (() => void) | null {
  const options = { ...DEFAULTS, ...userOptions };
  if (window.matchMedia?.(TOUCH_QUERY).matches) {
    options.hint = userOptions.hint ?? options.hintTouch;
    options.hintIntro = userOptions.hintIntro ?? options.hintIntroTouch;
  }
  const root = document.getElementById(TS2026_MARQUEE_ROOT_ID);
  const hero = document.getElementById(TS2026_MARQUEE_HERO_ID);
  const stage = hero?.querySelector<HTMLElement>(".image__wrapper");
  if (!root || !hero || !stage || root.dataset.ts2026MarqueeReady) return null;

  const slides = collectSlides(root, phone);
  if (slides.length === 0) return null;

  const heroMedia = stage.querySelector<HTMLImageElement | HTMLVideoElement>("img, video");
  const width = heroMedia?.getAttribute("width");
  const height = heroMedia?.getAttribute("height");
  if (width && height) stage.style.setProperty("--ts2026-marquee-aspect", `${width} / ${height}`);
  heroMedia?.setAttribute("data-ts2026-marquee-slide", "0");

  const clones = new Map<number, HTMLImageElement | HTMLVideoElement>();
  for (const slide of slides) {
    const clone = cloneMedia(slide);
    clones.set(slide.index, clone);
    stage.append(clone);
  }

  // The window chrome laid over every slide, so the menu bar and sidebar stay crisp and identical across the
  // hero still and the videos.
  const chrome = el("div", `${PREFIX}__chrome`);
  chrome.setAttribute("aria-hidden", "true");
  stage.append(chrome);

  const cta = readCta(hero, options);
  const { card, box, composer, panel, hint, hintText, counter, buttons } = buildCard(slides, options, cta);

  let expanded = false;
  let mediaDone = false;
  let hintDue = false;
  let hintSeen = false;
  let pulseTimer = 0;
  let hintTimer = 0;
  let hintExpired = false;
  let hintExpireTimer = 0;
  let openHint = false;
  let openHintTimer = 0;
  let openTimer = 0;
  let active = 0;
  let playHeld = false;
  // False while a finished slide that hid the input waits CTA_AFTER_INPUT_MS before its CTA unfolds.
  let ctaDue = true;
  let ctaTimer = 0;
  const sync = () => {
    const docked = Boolean(card.dataset.dock);
    const held = docked && (expanded || (mediaDone && ctaDue));
    const cued = !hintSeen && !expanded && (!docked || mediaDone);
    const cueHint = cued && hintDue && !hintExpired;
    const hinted = cueHint || openHint;
    // Phones: the cue hint hides hintPhoneTimeout after it shows, until the cue is armed again.
    if (phone && cueHint && !hintExpireTimer) {
      hintExpireTimer = window.setTimeout(() => {
        hintExpireTimer = 0;
        hintExpired = true;
        sync();
      }, options.hintPhoneTimeout);
    } else if (!cueHint && hintExpireTimer) {
      window.clearTimeout(hintExpireTimer);
      hintExpireTimer = 0;
    }
    const current = clones.get(active);
    card.toggleAttribute("data-teaser", held);
    card.toggleAttribute("data-playing", Boolean(current) && !held && !playHeld && !mediaDone);
    card.toggleAttribute("data-hint", hinted);
    if (hinted) {
      hintText.textContent = openHint ? options.hintOpen : docked ? options.hint : options.hintIntro;
      card.toggleAttribute("data-hint-open", openHint);
      card.toggleAttribute("data-hint-below", !openHint);
    }
    if (hinted) composer.setAttribute("aria-describedby", hint.id);
    else composer.removeAttribute("aria-describedby");
    // The veil (dim and blur) is full under the open docked prompts and lighter under the CTA a finished slide
    // shows. While a picked slide waits for its cut, the veil may come on but never lifts off the outgoing slide:
    // it drops together with the cut.
    const dim = (docked && expanded) || (playHeld && root.hasAttribute(DIM));
    const soft = held && !dim;
    if (dim || soft) root.removeAttribute(CUT);
    root.toggleAttribute(DIM, dim);
    root.toggleAttribute(SOFT, soft);
    if (current instanceof HTMLVideoElement) {
      // A finished docked slide rests on its last frame, also while its CTA waits to unfold.
      if (held || playHeld || document.hidden || (docked && mediaDone)) current.pause();
      else playVideo(current);
    }
  };

  const panelInner = panel.firstElementChild as HTMLElement | null;
  const tablet = window.matchMedia?.(TABLET_QUERY);
  const fit = () => {
    let lift = 0;
    if (expanded && !card.dataset.dock && panelInner && tablet?.matches) {
      const style = getComputedStyle(card);
      const inset = parseFloat(style.getPropertyValue("--marquee-card-inset")) || 16;
      const pillH = parseFloat(style.getPropertyValue("--prompts-pill-h")) || 44;
      const openH = parseFloat(style.getPropertyValue("--prompts-open-h")) || pillH;
      const top = box.offsetTop;
      const overflow = top + openH + panelInner.scrollHeight - (card.clientHeight - inset);
      lift = Math.max(0, Math.min(Math.ceil(overflow), Math.floor(top - inset)));
    }
    if (lift) card.style.setProperty("--prompts-lift", `${lift}px`);
    else card.style.removeProperty("--prompts-lift");
  };
  const fitObserver = typeof ResizeObserver === "function" ? new ResizeObserver(fit) : null;
  fitObserver?.observe(card);

  const hideOpenHint = () => {
    window.clearTimeout(openHintTimer);
    openHint = false;
  };
  // One timer covers both the wait before the hint shows and, with hintOpenDuration, its time on screen.
  const showOpenHint = (delay = 0) => {
    hideOpenHint();
    const show = () => {
      openHint = true;
      sync();
      if (options.hintOpenDuration <= 0) return;
      openHintTimer = window.setTimeout(() => {
        openHint = false;
        sync();
      }, options.hintOpenDuration);
    };
    if (delay > 0) openHintTimer = window.setTimeout(show, delay);
    else show();
  };
  const pinnedOpen = () => expanded && !card.dataset.dock;

  const setExpanded = (open: boolean, byClick = false) => {
    window.clearTimeout(openTimer);
    openTimer = 0;
    if (!open) hideOpenHint();
    expanded = open;
    card.dataset.state = open ? "expanded" : "collapsed";
    composer.setAttribute("aria-expanded", String(open));
    panel.toggleAttribute("inert", !open);
    if (open && (!card.dataset.dock || mediaDone)) hintSeen = true;
    fit();
    sync();
    // Only a click on the composer brings "Choose a prompt below…" above the first screen's prompts, once they
    // have mostly unfolded; prompts that open by themselves stay without it.
    if (open && byClick && !card.dataset.dock) showOpenHint(options.hintOpenDelay);
  };

  const disarmCue = () => {
    window.clearTimeout(pulseTimer);
    window.clearTimeout(hintTimer);
    window.clearTimeout(hintExpireTimer);
    hintExpireTimer = 0;
    hintDue = false;
    hintExpired = false;
  };
  const armCue = (delay: number) => {
    disarmCue();
    pulseTimer = window.setTimeout(() => {
      hintTimer = window.setTimeout(() => {
        hintDue = true;
        sync();
      }, options.hintDelay);
    }, delay);
  };
  if (options.expanded) setExpanded(true);
  stage.append(card);

  const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  let cancelSettle: (() => void) | null = null;
  const afterTransition = (target: HTMLElement, property: string, timeout: number, done: () => void) => {
    cancelSettle?.();
    let timer = 0;
    const cleanup = () => {
      target.removeEventListener("transitionend", onEnd);
      window.clearTimeout(timer);
      cancelSettle = null;
    };
    const finish = () => {
      cleanup();
      done();
    };
    const onEnd = (event: TransitionEvent) => {
      if (event.target === target && event.propertyName === property) finish();
    };
    target.addEventListener("transitionend", onEnd);
    timer = window.setTimeout(finish, timeout);
    cancelSettle = cleanup;
  };

  const frameReady = (video: HTMLVideoElement) => video.readyState >= HAVE_CURRENT_DATA && !video.seeking;
  // Calls `done` once `media` has a frame to show. On a slow network that can take a while, so after FRAME_WAIT_MS
  // the video gets its CMS poster and the cut lands on that still instead of a black window; the frame
  // replaces it as soon as it is decoded.
  const whenFrameReady = (media: HTMLImageElement | HTMLVideoElement | undefined, done: () => void) => {
    cancelSettle?.();
    if (!(media instanceof HTMLVideoElement) || frameReady(media)) {
      done();
      return;
    }
    let timer = 0;
    const cleanup = () => {
      for (const type of FRAME_EVENTS) media.removeEventListener(type, onEvent);
      window.clearTimeout(timer);
      cancelSettle = null;
    };
    const finish = () => {
      cleanup();
      done();
    };
    const onEvent = (event: Event) => {
      if (event.type === "error" || frameReady(media)) finish();
    };
    for (const type of FRAME_EVENTS) media.addEventListener(type, onEvent);
    timer = window.setTimeout(() => {
      showPoster(media);
      finish();
    }, FRAME_WAIT_MS);
    cancelSettle = cleanup;
  };

  const dock = (): boolean => {
    if (card.dataset.dock) return false;
    if (expanded) setExpanded(false);
    const from = box.getBoundingClientRect().top;
    card.dataset.dock = "bottom";
    sync();
    const delta = from - box.getBoundingClientRect().top;
    if (!delta || reducedMotion()) return false;
    box.style.transition = "none";
    box.style.translate = `0 ${delta}px`;
    void box.offsetHeight;
    box.style.transition = "";
    box.style.translate = "";
    return true;
  };

  const foldThenDock = (onSettled: () => void) => {
    const wasExpanded = expanded;
    setExpanded(false);
    const slide = () => {
      if (!card.dataset.dock && dock()) afterTransition(box, "translate", 700, onSettled);
      else onSettled();
    };
    if (wasExpanded && !reducedMotion()) afterTransition(panel, "grid-template-rows", 700, slide);
    else slide();
  };

  const explored = loadExplored(options.storageKey);
  for (const index of explored) if (!clones.has(index)) explored.delete(index);

  const renderExplored = () => {
    for (const button of buttons) {
      const isExplored = explored.has(Number(button.dataset.ts2026MarqueeSlide));
      button.classList.toggle("is-explored", isExplored);
      const icon = button.querySelector<HTMLElement>(`.${PREFIX}__arrow`);
      const name = isExplored ? "replay" : "arrow";
      if (icon && icon.dataset.icon !== name) {
        icon.innerHTML = isExplored ? REPLAY_SVG : ARROW_SVG;
        icon.dataset.icon = name;
      }
    }
    counter.textContent = options.counter
      .replace("{explored}", String(explored.size))
      .replace("{total}", String(slides.length));
  };

  let mediaTimer = 0;
  let unwatchMedia: (() => void) | null = null;
  const onMediaDone = () => {
    unwatchMedia?.();
    unwatchMedia = null;
    mediaDone = true;
    window.clearTimeout(ctaTimer);
    // Brings the input back now if it is still out, so the wait below counts from its return.
    syncChrome();
    // A slide that hid the input unfolds its CTA (and the cue) CTA_AFTER_INPUT_MS after the input came back.
    const wait =
      card.dataset.dock && !phone && CHROME_OUT_AT[active] !== undefined && inputBackAt
        ? CTA_AFTER_INPUT_MS - (performance.now() - inputBackAt)
        : 0;
    if (wait > 0) {
      ctaDue = false;
      ctaTimer = window.setTimeout(() => {
        ctaDue = true;
        sync();
        armCue(options.pulseDelay);
      }, wait);
    } else {
      ctaDue = true;
      armCue(options.pulseDelay);
    }
    sync();
  };
  const watchMedia = (media: HTMLImageElement | HTMLVideoElement | undefined) => {
    unwatchMedia?.();
    unwatchMedia = null;
    window.clearTimeout(mediaTimer);
    if (!media) return;
    if (media instanceof HTMLVideoElement) {
      // Docked, the slide pauses under the CTA once it finishes, so play it through once and let it rest on its
      // last frame; looping would wrap to the first frame before the wrap is noticed and the video paused.
      const loop = media.loop;
      if (card.dataset.dock) media.loop = false;
      let last = 0;
      const onTimeUpdate = () => {
        if (media.currentTime + 0.5 < last) onMediaDone();
        last = media.currentTime;
      };
      media.addEventListener("ended", onMediaDone);
      media.addEventListener("timeupdate", onTimeUpdate);
      unwatchMedia = () => {
        media.removeEventListener("ended", onMediaDone);
        media.removeEventListener("timeupdate", onTimeUpdate);
        media.loop = loop;
      };
    } else {
      mediaTimer = window.setTimeout(onMediaDone, options.imageDuration);
      unwatchMedia = () => window.clearTimeout(mediaTimer);
    }
  };

  // The chrome follows the slide on screen (not the picked one, which waits for its cut): it fades out once
  // that video reaches its full-bleed cut and fades back in at the window's end; it snaps back when the video
  // wraps, rewinds or another slide cuts in.
  let shown = -1;
  let unwatchChrome: (() => void) | null = null;
  // When the input last came back after a slide hid it; 0 while it has not.
  let inputBackAt = 0;
  const syncChrome = () => {
    const span = phone ? undefined : CHROME_OUT_AT[shown];
    const current = clones.get(shown);
    const t = current instanceof HTMLVideoElement ? current.currentTime : -1;
    const out = span !== undefined && t >= span[0] - CHROME_FADE_S && t < span[1];
    root.toggleAttribute(CHROME_OUT, out);
    root.toggleAttribute(CHROME_BACK, span !== undefined && t >= span[1]);
    // The input fades out with the chrome and returns with it, or once the video has played to its end.
    const ended = (shown === active && mediaDone) || (current instanceof HTMLVideoElement && current.ended);
    const inputOut = out && !ended;
    if (root.hasAttribute(INPUT_OUT) && !inputOut) inputBackAt = performance.now();
    root.toggleAttribute(INPUT_OUT, inputOut);
  };
  const watchChrome = (index: number, video: HTMLImageElement | HTMLVideoElement | undefined) => {
    unwatchChrome?.();
    unwatchChrome = null;
    shown = index;
    syncChrome();
    if (phone || !(video instanceof HTMLVideoElement) || CHROME_OUT_AT[index] === undefined) return;
    let handle = 0;
    const perFrame = typeof video.requestVideoFrameCallback === "function";
    const onFrame = () => {
      syncChrome();
      handle = video.requestVideoFrameCallback(onFrame);
    };
    if (perFrame) handle = video.requestVideoFrameCallback(onFrame);
    video.addEventListener("timeupdate", syncChrome);
    unwatchChrome = () => {
      video.removeEventListener("timeupdate", syncChrome);
      if (handle) video.cancelVideoFrameCallback(handle);
    };
  };

  const select = (index: number) => {
    active = index;
    mediaDone = false;
    window.clearTimeout(ctaTimer);
    ctaDue = true;
    inputBackAt = 0;
    hintSeen = false;
    disarmCue();
    const next = clones.get(index);
    watchMedia(playHeld ? undefined : next);
    if (playHeld && next instanceof HTMLVideoElement) primeVideo(next);
    for (const button of buttons) {
      const isActive = Number(button.dataset.ts2026MarqueeSlide) === index;
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.toggle("is-active", isActive);
    }
    sync();
  };

  const slideMedia: [number, HTMLImageElement | HTMLVideoElement][] = [
    ...(heroMedia ? [[0, heroMedia] as [number, HTMLImageElement | HTMLVideoElement]] : []),
    ...clones,
  ];
  let finishSwap: (() => void) | null = null;

  // A hard cut, no fade: the incoming slide goes on top at once and the outgoing one stays visible under it
  // until the incoming has a frame on screen, so the window never shows an empty or half-faded box.
  const reveal = (index: number) => {
    finishSwap?.();
    let incoming: HTMLImageElement | HTMLVideoElement | undefined;
    const leaving: (HTMLImageElement | HTMLVideoElement)[] = [];
    for (const [slideIndex, media] of slideMedia) {
      if (slideIndex === index) incoming = media;
      else if (media.hasAttribute(ACTIVE)) leaving.push(media);
    }
    incoming?.setAttribute(ACTIVE, "");
    root.dataset.ts2026MarqueeActive = String(index);
    watchChrome(index, incoming);

    const finish = () => {
      finishSwap = null;
      incoming?.removeAttribute(ENTERING);
      for (const media of leaving) {
        media.removeAttribute(ACTIVE);
        if (media instanceof HTMLVideoElement) stopVideo(media);
      }
    };
    if (!incoming || leaving.length === 0) {
      finish();
      return;
    }
    incoming.setAttribute(ENTERING, "");
    finishSwap = whenPresented(incoming, finish);
  };

  const show = (index: number) => {
    select(index);
    reveal(index);
  };

  const release = () => {
    playHeld = false;
    watchMedia(clones.get(active));
    sync();
  };

  const onClick = (event: Event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(`.${PREFIX}__prompt`);
    if (!button) return;
    const index = Number(button.dataset.ts2026MarqueeSlide);
    explored.add(index);
    saveExplored(options.storageKey, explored);
    renderExplored();
    playHeld = true;
    select(index);
    foldThenDock(() =>
      whenFrameReady(clones.get(index), () => {
        root.setAttribute(CUT, "");
        release();
        reveal(index);
      }),
    );
  };
  card.addEventListener("click", onClick);

  const setSweepRate = (button: HTMLButtonElement, rate: number) => {
    for (const animation of button.getAnimations({ subtree: true })) {
      if ((animation as CSSAnimation).animationName === SWEEP_ANIMATION) animation.updatePlaybackRate(rate);
    }
  };
  const promptUnderPointer = (event: PointerEvent) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(`.${PREFIX}__prompt`);

    if (!button || button.contains(event.relatedTarget as Node | null)) return null;
    return button;
  };
  const onPointerOver = (event: PointerEvent) => {
    const button = promptUnderPointer(event);
    if (button) setSweepRate(button, SWEEP_HOVER_RATE);
  };
  const onPointerOut = (event: PointerEvent) => {
    const button = promptUnderPointer(event);
    if (button) setSweepRate(button, 1);
  };
  card.addEventListener("pointerover", onPointerOver);
  card.addEventListener("pointerout", onPointerOut);

  // On the first screen a showing hint fades out first and the prompts unfold once it is gone.
  const openPrompts = (byClick = false) => {
    if (expanded || openTimer) return;
    if (card.dataset.dock || !card.hasAttribute("data-hint") || reducedMotion()) {
      setExpanded(true, byClick);
      return;
    }
    hintSeen = true;
    sync();
    openTimer = window.setTimeout(() => setExpanded(true, byClick), HINT_OUT_MS);
  };

  const onToggle = () => {
    if (pinnedOpen()) showOpenHint();
    else if (expanded) setExpanded(false);
    else openPrompts(true);
  };
  composer.addEventListener("click", onToggle);

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !expanded || pinnedOpen()) return;
    setExpanded(false);
    composer.focus();
  };
  card.addEventListener("keydown", onKeydown);

  const onPointerDown = (event: PointerEvent) => {
    if (expanded && !pinnedOpen() && !card.contains(event.target as Node)) setExpanded(false);
  };
  document.addEventListener("pointerdown", onPointerDown);

  const onVisibility = sync;
  document.addEventListener("visibilitychange", onVisibility);

  root.dataset.ts2026MarqueeReady = "true";
  renderExplored();
  show(clones.has(options.initialSlide) ? options.initialSlide : 0);
  armCue(options.pulseIntroDelay);
  // Skipped if the visitor opened the prompts or picked one first. The hint fades out first, then the prompts
  // unfold (see openPrompts).
  const autoOpenTimer =
    options.autoOpenDelay > 0
      ? window.setTimeout(() => {
          if (!card.dataset.dock) openPrompts();
        }, options.autoOpenDelay)
      : 0;

  return () => {
    window.clearTimeout(autoOpenTimer);
    window.clearTimeout(openTimer);
    window.clearTimeout(ctaTimer);
    card.removeEventListener("click", onClick);
    card.removeEventListener("pointerover", onPointerOver);
    card.removeEventListener("pointerout", onPointerOut);
    composer.removeEventListener("click", onToggle);
    card.removeEventListener("keydown", onKeydown);
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("visibilitychange", onVisibility);
    fitObserver?.disconnect();
    cancelSettle?.();
    disarmCue();
    hideOpenHint();
    unwatchMedia?.();
    unwatchChrome?.();
    finishSwap?.();
    for (const clone of clones.values()) {
      if (clone instanceof HTMLVideoElement) clone.pause();
      clone.remove();
    }
    card.remove();
    chrome.remove();
    heroMedia?.removeAttribute("data-ts2026-marquee-slide");
    heroMedia?.removeAttribute(ACTIVE);
    stage.style.removeProperty("--ts2026-marquee-aspect");
    delete root.dataset.ts2026MarqueeReady;
    delete root.dataset.ts2026MarqueeActive;
    root.removeAttribute(DIM);
    root.removeAttribute(SOFT);
    root.removeAttribute(CUT);
    root.removeAttribute(CHROME_OUT);
    root.removeAttribute(INPUT_OUT);
    root.removeAttribute(CHROME_BACK);
  };
}

if (typeof document !== "undefined" && document.currentScript) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initTs2026Marquee(), { once: true });
  } else {
    initTs2026Marquee();
  }
}

Object.assign(window, {
  Ts2026Marquee: {
    init: initTs2026Marquee,
    ROOT_ID: TS2026_MARQUEE_ROOT_ID,
    HERO_ID: TS2026_MARQUEE_HERO_ID,
    CTA_ID: TS2026_MARQUEE_CTA_ID,
  },
});
})();
