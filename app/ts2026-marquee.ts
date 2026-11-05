export const TS2026_MARQUEE_ROOT_ID = "ts2026-marquee";
export const TS2026_MARQUEE_HERO_ID = "ts2026-marquee-video";
const SLIDE_ID = /^ts2026-marquee-video-(\d+)$/;
const PREFIX = "ts2026-marquee-prompts";

const SWEEP_ANIMATION = "ts2026-marquee-border-sweep";
const SWEEP_HOVER_RATE = 0.35;

const PHONE_QUERY = "(max-width: 767px)";
const TOUCH_QUERY = "(hover: none) and (pointer: coarse)";
const TABLET_QUERY = "(min-width: 768px) and (max-width: 1023px)";

export type Ts2026MarqueeOptions = {
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
  pulseDelay?: number;
  pulseIntroDelay?: number;
  hintDelay?: number;
  imageDuration?: number;
};

export type Ts2026MarqueeSlide = {
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
  hintOpen: "Choose a prompt below to see Studio in action",
  hintOpenDuration: 3500,
  pulseDelay: 400,
  pulseIntroDelay: 1000,
  hintDelay: 1000,
  imageDuration: 6000,
};

const STAR_SVG = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><g class="ts2026-marquee-spark ts2026-marquee-spark--main"><path d="M19.2187 16.1317L16.4604 17.5042C15.6317 17.9172 14.9614 18.5853 14.5471 19.4112L13.17 22.1604C12.975 22.5531 12.4103 22.5531 12.2153 22.1604L10.8382 19.4112C10.4239 18.5853 9.7536 17.9172 8.9249 17.5042L6.16662 16.1317C5.77258 15.9373 5.77258 15.3745 6.16662 15.1802L8.9249 13.8076C9.7536 13.3947 10.4239 12.7266 10.8382 11.9007L12.2153 9.1515C12.4103 8.75877 12.975 8.75877 13.17 9.1515L14.5471 11.9007C14.9614 12.7266 15.6317 13.3947 16.4604 13.8076L19.2187 15.1802C19.6127 15.3745 19.6127 15.9373 19.2187 16.1317Z" fill="url(#ts2026-marquee-spark-gradient)"/></g><g class="ts2026-marquee-spark ts2026-marquee-spark--echo ts2026-marquee-spark--top"><path d="M25.2349 8.6454L24.0528 8.05427C23.6953 7.88017 23.4109 7.58866 23.2322 7.23641L22.6391 6.0582C22.5579 5.88815 22.3141 5.88815 22.2288 6.0582L21.6357 7.23641C21.461 7.59271 21.1686 7.87612 20.8151 8.05427L19.633 8.6454C19.4624 8.72638 19.4624 8.96931 19.633 9.05433L20.8151 9.64546C21.1726 9.81956 21.457 10.1111 21.6357 10.4633L22.2288 11.6415C22.3101 11.8116 22.5538 11.8116 22.6391 11.6415L23.2322 10.4633C23.4069 10.107 23.6994 9.82361 24.0528 9.64546L25.2349 9.05433C25.4055 8.97335 25.4055 8.73042 25.2349 8.6454Z" fill="url(#ts2026-marquee-spark-gradient)"/></g><g class="ts2026-marquee-spark ts2026-marquee-spark--echo ts2026-marquee-spark--low"><path d="M25.2349 22.2454L24.0528 21.6543C23.6953 21.4802 23.4109 21.1887 23.2322 20.8364L22.6391 19.6582C22.5579 19.4881 22.3141 19.4881 22.2288 19.6582L21.6357 20.8364C21.461 21.1927 21.1686 21.4761 20.8151 21.6543L19.633 22.2454C19.4624 22.3264 19.4624 22.5693 19.633 22.6543L20.8151 23.2455C21.1726 23.4196 21.457 23.7111 21.6357 24.0633L22.2288 25.2415C22.3101 25.4116 22.5538 25.4116 22.6391 25.2415L23.2322 24.0633C23.4069 23.707 23.6994 23.4236 24.0528 23.2455L25.2349 22.6543C25.4055 22.5733 25.4055 22.3304 25.2349 22.2454Z" fill="url(#ts2026-marquee-spark-gradient)"/></g><defs><radialGradient id="ts2026-marquee-spark-gradient" cx="0" cy="0" r="1" gradientTransform="matrix(0.0471117 26.8433 -48.5825 0.0875902 15.6053 2.09453)" gradientUnits="userSpaceOnUse"><stop stop-color="#90D0FE"/><stop offset="0.413548" stop-color="#00B3FF"/><stop offset="1" stop-color="#022AC0"/></radialGradient></defs></svg>`;

const ARROW_SVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M6.02306 13.215L11.4406 7.79745C11.5874 7.65059 11.4732 7.40582 11.2774 7.40582H8.14438C7.94856 7.40582 7.8017 7.25896 7.8017 7.06314L7.8017 6.34516C7.8017 6.14934 7.94856 6.00248 8.14438 6.00248L13.8719 6.0188C14.0678 6.0188 14.2146 6.16566 14.2146 6.36148L14.2146 12.0727C14.2146 12.2685 14.0678 12.4154 13.8719 12.4154H13.1866C12.9908 12.4154 12.8439 12.2685 12.8439 12.0727L12.8439 8.9397C12.8276 8.72756 12.5828 8.61334 12.436 8.7602L7.01845 14.1777C6.8879 14.3083 6.67577 14.3246 6.54523 14.194L6.05569 13.7045C5.92515 13.574 5.89251 13.3455 6.02306 13.215V13.215Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/></svg>`;

const REPLAY_SVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M10.1409 5C11.5049 5 12.813 5.54183 13.7775 6.50631C14.7419 7.47078 15.2838 8.77889 15.2838 10.1429C15.2838 11.5068 14.7419 12.8149 13.7775 13.7794C12.813 14.7439 11.5049 15.2857 10.1409 15.2857C8.77693 15.2857 7.46883 14.7439 6.50436 13.7794C5.53988 12.8149 4.99805 11.5068 4.99805 10.1429H6.28376C6.28376 11.1658 6.69014 12.1469 7.41349 12.8703C8.13685 13.5936 9.11793 14 10.1409 14C11.1639 14 12.1449 13.5936 12.8683 12.8703C13.5917 12.1469 13.998 11.1658 13.998 10.1429C13.998 9.11988 13.5917 8.1388 12.8683 7.41545C12.1449 6.69209 11.1639 6.28571 10.1409 6.28571C9.04376 6.28571 8.30949 6.58196 7.76069 6.98602C7.64951 7.06788 7.54445 7.15519 7.44432 7.24725L8.3757 8.17863L7.75912 8.85718H4.99805L4.99805 6.09611L5.67659 5.47953L6.53472 6.33766C6.67848 6.20273 6.83252 6.07279 6.99839 5.95067C7.77913 5.37583 8.78351 5 10.1409 5Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/></svg>`;

const ARROW_RIGHT_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const PLUS_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8 2.5v11M2.5 8h11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

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
    clone.muted = true;
    clone.defaultMuted = true;
    clone.playsInline = true;
    clone.setAttribute("muted", "");
    clone.setAttribute("playsinline", "");
    if (!clone.hasAttribute("loop")) clone.loop = true;
    if (!clone.hasAttribute("preload")) clone.preload = "metadata";
  } else {
    clone.loading = "eager";
    clone.decoding = "async";
  }
  return clone;
}

function playVideo(video: HTMLVideoElement) {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  if (video.preload === "none") video.preload = "auto";
  if (video.readyState === 0) video.load();
  void video.play().catch(() => {});
}

function stopVideo(video: HTMLVideoElement) {
  video.pause();
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

function buildCard(slides: Ts2026MarqueeSlide[], options: Required<Ts2026MarqueeOptions>, ctaHref: string) {
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
  const add = el("span", `${PREFIX}__add`, PLUS_SVG);

  for (let i = 0; i < 3; i++) add.append(el("span", `${PREFIX}__ring`));
  add.setAttribute("aria-hidden", "true");

  const hint = el("span", `${PREFIX}__hint`);
  hint.id = `${PREFIX}-hint`;
  hint.setAttribute("role", "tooltip");
  const hintText = el("span", `${PREFIX}__hint-text`);
  hintText.textContent = options.hintIntro;
  const hintArrow = el("span", `${PREFIX}__hint-arrow`);
  hintArrow.setAttribute("aria-hidden", "true");
  hint.append(hintText, hintArrow);
  composer.append(placeholder, add, hint);

  const cta = el("div", `${PREFIX}__cta`);
  const ctaInner = el("div", `${PREFIX}__cta-inner`);
  const ctaLink = el("a", `${PREFIX}__cta-link`);
  ctaLink.href = ctaHref;
  const ctaAction = el("span", `${PREFIX}__cta-action`, ARROW_RIGHT_SVG);
  ctaAction.prepend(Object.assign(document.createElement("span"), { textContent: options.ctaLabel }));
  ctaLink.append(
    Object.assign(el("span", `${PREFIX}__cta-text`), { textContent: options.ctaText }),
    ctaAction,
  );
  ctaInner.append(ctaLink);
  cta.append(ctaInner);

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
  box.append(composer, panel, cta);
  card.append(box);
  return { card, box, composer, panel, hint, hintText, counter, buttons };
}

export function initTs2026Marquee(userOptions: Ts2026MarqueeOptions = {}): (() => void) | null {
  const phone = window.matchMedia?.(PHONE_QUERY);
  let teardown = mount(userOptions, phone?.matches ?? false);
  if (!teardown || !phone) return teardown;
  const onChange = (event: MediaQueryListEvent) => {
    teardown?.();
    teardown = mount(userOptions, event.matches);
  };
  phone.addEventListener("change", onChange);
  return () => {
    phone.removeEventListener("change", onChange);
    teardown?.();
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

  const ctaHref = options.ctaHref || hero.querySelector<HTMLAnchorElement>("a.cta_button[href]")?.href || "#";
  const { card, box, composer, panel, hint, hintText, counter, buttons } = buildCard(slides, options, ctaHref);

  let expanded = false;
  let mediaDone = false;
  let pulseDue = false;
  let hintDue = false;
  let hintSeen = false;
  let pulseTimer = 0;
  let hintTimer = 0;
  let openHint = false;
  let openHintTimer = 0;
  let active = 0;
  let playHeld = false;
  const sync = () => {
    const docked = Boolean(card.dataset.dock);
    const held = docked && (expanded || mediaDone);
    const cued = !hintSeen && !expanded && (!docked || mediaDone);
    const hinted = (cued && hintDue) || openHint;
    card.toggleAttribute("data-teaser", held);
    card.toggleAttribute("data-pulse", cued && pulseDue);
    card.toggleAttribute("data-hint", hinted);
    if (hinted) {
      hintText.textContent = openHint ? options.hintOpen : docked ? options.hint : options.hintIntro;
      card.toggleAttribute("data-hint-open", openHint);
      card.toggleAttribute("data-hint-below", !openHint);
    }
    if (hinted) composer.setAttribute("aria-describedby", hint.id);
    else composer.removeAttribute("aria-describedby");
    root.toggleAttribute("data-ts2026-marquee-dim", held);
    const current = clones.get(active);
    if (current instanceof HTMLVideoElement) {
      if (held || playHeld || document.hidden) current.pause();
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
  const showOpenHint = () => {
    hideOpenHint();
    openHint = true;
    sync();
    openHintTimer = window.setTimeout(() => {
      openHint = false;
      sync();
    }, options.hintOpenDuration);
  };
  const pinnedOpen = () => expanded && !card.dataset.dock;

  const setExpanded = (open: boolean) => {
    if (!open) hideOpenHint();
    expanded = open;
    card.dataset.state = open ? "expanded" : "collapsed";
    composer.setAttribute("aria-expanded", String(open));
    panel.toggleAttribute("inert", !open);
    if (open && (!card.dataset.dock || mediaDone)) hintSeen = true;
    fit();
    sync();
  };

  const disarmCue = () => {
    window.clearTimeout(pulseTimer);
    window.clearTimeout(hintTimer);
    pulseDue = false;
    hintDue = false;
  };
  const armCue = (delay: number) => {
    disarmCue();
    pulseTimer = window.setTimeout(() => {
      pulseDue = true;
      sync();
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
    sync();
    armCue(options.pulseDelay);
  };
  const watchMedia = (media: HTMLImageElement | HTMLVideoElement | undefined) => {
    unwatchMedia?.();
    unwatchMedia = null;
    window.clearTimeout(mediaTimer);
    if (!media) return;
    if (media instanceof HTMLVideoElement) {
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
      };
    } else {
      mediaTimer = window.setTimeout(onMediaDone, options.imageDuration);
      unwatchMedia = () => window.clearTimeout(mediaTimer);
    }
  };

  const select = (index: number) => {
    active = index;
    mediaDone = false;
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

  const reveal = (index: number) => {
    if (heroMedia) heroMedia.toggleAttribute("data-ts2026-marquee-active", index === 0);
    for (const [slideIndex, clone] of clones) {
      const isActive = slideIndex === index;
      clone.toggleAttribute("data-ts2026-marquee-active", isActive);
      if (clone instanceof HTMLVideoElement && !playHeld) {
        if (isActive) playVideo(clone);
        else stopVideo(clone);
      }
    }
    root.dataset.ts2026MarqueeActive = String(index);
  };

  const show = (index: number) => {
    select(index);
    reveal(index);
  };

  const release = () => {
    playHeld = false;
    for (const [slideIndex, clone] of clones) {
      if (slideIndex !== active && clone instanceof HTMLVideoElement) stopVideo(clone);
    }
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
    const same = index === active;
    playHeld = true;
    select(index);
    foldThenDock(() => {
      reveal(index);
      const incoming = clones.get(index);
      if (same || !incoming || reducedMotion()) release();
      else afterTransition(incoming, "opacity", 1000, release);
    });
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

  const onToggle = () => {
    if (pinnedOpen()) showOpenHint();
    else setExpanded(!expanded);
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

  return () => {
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
    for (const clone of clones.values()) {
      if (clone instanceof HTMLVideoElement) clone.pause();
      clone.remove();
    }
    card.remove();
    heroMedia?.removeAttribute("data-ts2026-marquee-slide");
    heroMedia?.removeAttribute("data-ts2026-marquee-active");
    stage.style.removeProperty("--ts2026-marquee-aspect");
    delete root.dataset.ts2026MarqueeReady;
    delete root.dataset.ts2026MarqueeActive;
    root.removeAttribute("data-ts2026-marquee-dim");
  };
}

if (typeof document !== "undefined" && document.currentScript) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initTs2026Marquee(), { once: true });
  } else {
    initTs2026Marquee();
  }
}
