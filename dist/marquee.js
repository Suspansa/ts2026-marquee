// ts2026 marquee — built from app/ts2026-marquee.tsx by scripts/build-dist.mjs (React entry removed).
// Plain TypeScript, no imports: compile with `tsc marquee.ts --target es2017` and load the result as a classic <script>.
// It starts itself on DOMContentLoaded; window.Ts2026Marquee.init() re-runs it and returns a teardown function.
(() => {
    const TS2026_MARQUEE_ROOT_ID = "ts2026-marquee";
    const TS2026_MARQUEE_HERO_ID = "ts2026-marquee-video";
    // The text blade whose headline and button feed the card's CTA; its own markup stays hidden.
    const TS2026_MARQUEE_CTA_ID = "ts2026-marquee-dropdown-btn";
    const SLIDE_ID = /^ts2026-marquee-video-(\d+)$/;
    // A slide's follow-up videos, keyed by slide index and listed in play order. They are not in the page's markup:
    // the script adds them and plays each one after the slide's own video (see startHandoff).
    const SLIDE_PARTS = {
        1: ["https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/how-is-arr-trending-2.mp4"],
    };
    const PREFIX = "ts2026-marquee-prompts";
    // The media blade phones show instead of the marquee's window, and the Vidyard script that plays its video.
    const MOBILE_ID = "ts2026-marquee-video-mobile";
    const VIDYARD_EMBED_SRC = "https://play.vidyard.com/embed/v4.js";
    // The frame that video is rebuilt in, inside the hero.
    const MOBILE_VIDEO = "ts2026-marquee-mobile-video";
    const SWEEP_ANIMATION = "ts2026-marquee-border-sweep";
    const SWEEP_HOVER_RATE = 0.35;
    const HAVE_CURRENT_DATA = 2;
    const FRAME_EVENTS = ["loadeddata", "seeked", "canplay", "error"];
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
    // to 53s.
    const CHROME_OUT_AT = { 3: [43, 53] };
    // Set while the prompt input is faded out together with the chrome or its sidebar rail; it also comes back if
    // the video ends first.
    const INPUT_OUT = "data-ts2026-marquee-input-out";
    // Set once the chrome has come back at `until`, so it fades in rather than snapping back.
    const CHROME_BACK = "data-ts2026-marquee-chrome-back";
    // After a slide that hid the input, the CTA unfolds once the video ends and at least this long after the input
    // came back.
    const CTA_AFTER_INPUT_MS = 2000;
    // Set while the chrome's sidebar rail is faded off the video on screen; the menu bar stays. The prompt input
    // fades out with it and comes back when the video ends.
    const SIDE_OUT = "data-ts2026-marquee-side-out";
    // Seconds into a video from which the sidebar rail stays hidden until another video cuts in, keyed by slide
    // index, then by part (0 is the slide's own video, n its nth follow-up): slide 2's video hides it at 7s.
    const SIDE_OUT_AT = { 2: { 0: 7 } };
    // While the sidebar rail is off, the prompt input comes back this many seconds before the video ends.
    const INPUT_BACK_BEFORE_END_S = 3;
    // How long the chrome takes to fade; it starts early enough to be gone at the cut.
    const CHROME_FADE_S = 0.25;
    // How long the hint takes to fade out (its CSS hides it 0.3s after data-hint goes); the first screen's prompts
    // wait this long before they unfold, so the two never overlap.
    const HINT_OUT_MS = 300;
    // Between a slide's parts a drawn cursor takes over from the one in the video: it shows where the video's cursor
    // was last seen, glides to the input's plus and clicks it, and the next part cuts in on that click.
    // [x, y] of the video cursor's last position, as shares of the video frame, keyed by slide index.
    const CURSOR_FROM = { 1: [0.201, 0.742] };
    const CURSOR_FROM_DEFAULT = [0.22, 0.82];
    // Seconds into a slide's video at which its cursor is gone (the first frame without it), keyed by slide index.
    // The drawn cursor takes over right there and the video rests on that frame; without an entry it waits for the end.
    const CURSOR_AT_S = { 1: 11.25 };
    // How fast the video's cursor is moving when it vanishes, in frame widths per second. The drawn cursor sets off
    // at that speed and eases into the plus, so the motion runs on unbroken.
    const CURSOR_SPEED = 1.35;
    // CURSOR_EASING starts at this many times the move's average speed (its first control point's y / x).
    const CURSOR_EASING = "cubic-bezier(0.3, 0.6, 0.3, 1)";
    const CURSOR_EASING_START = 2;
    const CURSOR_MOVE_MIN_MS = 150;
    const CURSOR_MOVE_MS = 550;
    // The cursor rests on the plus at least this long before it presses; it holds there longer only while the next
    // part has no frame yet, so the click and the cut always land together.
    const CURSOR_REST_MS = 120;
    // How long the press lasts; the next part cuts in when it lets go.
    const CURSOR_PRESS_MS = 160;
    const CURSOR_FADE_MS = 200;
    // Set on the card while the cursor presses the plus.
    const PRESSED = "data-ts2026-marquee-pressed";
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
    const BLOB_SETS = [
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
    const DEFAULTS = {
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
        // Shown above the first screen's open prompts once the composer is clicked; 0 keeps it up until a prompt is
        // picked, a positive value hides it that many ms after it shows.
        hintOpen: "Choose a prompt below to see Studio in action",
        hintOpenDuration: 0,
        // How long a finished slide stays sharp under its CTA before the soft veil (dim and blur) comes on.
        ctaBlurDelay: 6000,
        pulseDelay: 400,
        pulseIntroDelay: 1000,
        hintDelay: 1000,
        // The first screen opens its prompts by itself this long after load; 0 turns it off.
        autoOpenDelay: 4000,
        imageDuration: 6000,
    };
    const STAR_SVG = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><g class="ts2026-marquee-spark ts2026-marquee-spark--main"><path d="M19.2187 16.1317L16.4604 17.5042C15.6317 17.9172 14.9614 18.5853 14.5471 19.4112L13.17 22.1604C12.975 22.5531 12.4103 22.5531 12.2153 22.1604L10.8382 19.4112C10.4239 18.5853 9.7536 17.9172 8.9249 17.5042L6.16662 16.1317C5.77258 15.9373 5.77258 15.3745 6.16662 15.1802L8.9249 13.8076C9.7536 13.3947 10.4239 12.7266 10.8382 11.9007L12.2153 9.1515C12.4103 8.75877 12.975 8.75877 13.17 9.1515L14.5471 11.9007C14.9614 12.7266 15.6317 13.3947 16.4604 13.8076L19.2187 15.1802C19.6127 15.3745 19.6127 15.9373 19.2187 16.1317Z" fill="url(#ts2026-marquee-spark-gradient)"/></g><g class="ts2026-marquee-spark ts2026-marquee-spark--echo ts2026-marquee-spark--top"><path d="M25.2349 8.6454L24.0528 8.05427C23.6953 7.88017 23.4109 7.58866 23.2322 7.23641L22.6391 6.0582C22.5579 5.88815 22.3141 5.88815 22.2288 6.0582L21.6357 7.23641C21.461 7.59271 21.1686 7.87612 20.8151 8.05427L19.633 8.6454C19.4624 8.72638 19.4624 8.96931 19.633 9.05433L20.8151 9.64546C21.1726 9.81956 21.457 10.1111 21.6357 10.4633L22.2288 11.6415C22.3101 11.8116 22.5538 11.8116 22.6391 11.6415L23.2322 10.4633C23.4069 10.107 23.6994 9.82361 24.0528 9.64546L25.2349 9.05433C25.4055 8.97335 25.4055 8.73042 25.2349 8.6454Z" fill="url(#ts2026-marquee-spark-gradient)"/></g><g class="ts2026-marquee-spark ts2026-marquee-spark--echo ts2026-marquee-spark--low"><path d="M25.2349 22.2454L24.0528 21.6543C23.6953 21.4802 23.4109 21.1887 23.2322 20.8364L22.6391 19.6582C22.5579 19.4881 22.3141 19.4881 22.2288 19.6582L21.6357 20.8364C21.461 21.1927 21.1686 21.4761 20.8151 21.6543L19.633 22.2454C19.4624 22.3264 19.4624 22.5693 19.633 22.6543L20.8151 23.2455C21.1726 23.4196 21.457 23.7111 21.6357 24.0633L22.2288 25.2415C22.3101 25.4116 22.5538 25.4116 22.6391 25.2415L23.2322 24.0633C23.4069 23.707 23.6994 23.4236 24.0528 23.2455L25.2349 22.6543C25.4055 22.5733 25.4055 22.3304 25.2349 22.2454Z" fill="url(#ts2026-marquee-spark-gradient)"/></g><defs><radialGradient id="ts2026-marquee-spark-gradient" cx="0" cy="0" r="1" gradientTransform="matrix(0.0471117 26.8433 -48.5825 0.0875902 15.6053 2.09453)" gradientUnits="userSpaceOnUse"><stop stop-color="#90D0FE"/><stop offset="0.413548" stop-color="#00B3FF"/><stop offset="1" stop-color="#022AC0"/></radialGradient></defs></svg>`;
    const ARROW_SVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M6.02306 13.215L11.4406 7.79745C11.5874 7.65059 11.4732 7.40582 11.2774 7.40582H8.14438C7.94856 7.40582 7.8017 7.25896 7.8017 7.06314L7.8017 6.34516C7.8017 6.14934 7.94856 6.00248 8.14438 6.00248L13.8719 6.0188C14.0678 6.0188 14.2146 6.16566 14.2146 6.36148L14.2146 12.0727C14.2146 12.2685 14.0678 12.4154 13.8719 12.4154H13.1866C12.9908 12.4154 12.8439 12.2685 12.8439 12.0727L12.8439 8.9397C12.8276 8.72756 12.5828 8.61334 12.436 8.7602L7.01845 14.1777C6.8879 14.3083 6.67577 14.3246 6.54523 14.194L6.05569 13.7045C5.92515 13.574 5.89251 13.3455 6.02306 13.215V13.215Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/></svg>`;
    const REPLAY_SVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M10.1409 5C11.5049 5 12.813 5.54183 13.7775 6.50631C14.7419 7.47078 15.2838 8.77889 15.2838 10.1429C15.2838 11.5068 14.7419 12.8149 13.7775 13.7794C12.813 14.7439 11.5049 15.2857 10.1409 15.2857C8.77693 15.2857 7.46883 14.7439 6.50436 13.7794C5.53988 12.8149 4.99805 11.5068 4.99805 10.1429H6.28376C6.28376 11.1658 6.69014 12.1469 7.41349 12.8703C8.13685 13.5936 9.11793 14 10.1409 14C11.1639 14 12.1449 13.5936 12.8683 12.8703C13.5917 12.1469 13.998 11.1658 13.998 10.1429C13.998 9.11988 13.5917 8.1388 12.8683 7.41545C12.1449 6.69209 11.1639 6.28571 10.1409 6.28571C9.04376 6.28571 8.30949 6.58196 7.76069 6.98602C7.64951 7.06788 7.54445 7.15519 7.44432 7.24725L8.3757 8.17863L7.75912 8.85718H4.99805L4.99805 6.09611L5.67659 5.47953L6.53472 6.33766C6.67848 6.20273 6.83252 6.07279 6.99839 5.95067C7.77913 5.37583 8.78351 5 10.1409 5Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/></svg>`;
    const ARROW_RIGHT_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const PLUS_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8 2.5v11M2.5 8h11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
    // The macOS arrow the videos are recorded with; its tip is the box's top-left corner.
    const CURSOR_SVG = `<svg viewBox="0 0 22 33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M1.5 1.5v25.2l6.1-5.6 4.6 10.3 4.3-1.9-4.5-10.1h8.3L1.5 1.5Z" fill="#000" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
    const ARROW_UP_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8 13V3.25M3.75 7.25 8 3l4.25 4.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    function el(tag, className, html) {
        const node = document.createElement(tag);
        node.className = className;
        if (html !== undefined)
            node.innerHTML = html;
        return node;
    }
    function readVideo(section) {
        var _a, _b;
        const host = (_a = section.querySelector(".video__wrapper, .image__wrapper")) !== null && _a !== void 0 ? _a : section;
        // Test: phones play the desktop videos too.
        return (_b = host.querySelector(".desktop-only video")) !== null && _b !== void 0 ? _b : host.querySelector("video");
    }
    function partVideo(src) {
        const video = document.createElement("video");
        const source = document.createElement("source");
        source.src = src;
        source.type = "video/mp4";
        video.append(source);
        return video;
    }
    function readSlide(section, index) {
        var _a, _b, _c, _d, _e;
        const title = (_c = (_b = (_a = section.querySelector(".display_caption")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.replace(/\s+/g, " ").trim()) !== null && _c !== void 0 ? _c : "";
        const host = (_d = section.querySelector(".video__wrapper, .image__wrapper")) !== null && _d !== void 0 ? _d : section;
        const video = readVideo(section);
        if (video)
            return { index, title, kind: "video", media: video, parts: ((_e = SLIDE_PARTS[index]) !== null && _e !== void 0 ? _e : []).map(partVideo) };
        const img = host.querySelector("img");
        if (img)
            return { index, title, kind: "image", media: img, parts: [] };
        return null;
    }
    const cleanText = (node) => { var _a, _b; return (_b = (_a = node === null || node === void 0 ? void 0 : node.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\s+/g, " ").trim()) !== null && _b !== void 0 ? _b : ""; };
    // Lifts the CTA copy out of the dropdown-button blade: its headline becomes the card's text, its button the
    // action. Anything missing there falls back to the options, then to the hero's own primary button.
    function readCta(hero, options) {
        var _a, _b, _c;
        const blade = document.getElementById(TS2026_MARQUEE_CTA_ID);
        const button = (_a = blade === null || blade === void 0 ? void 0 : blade.querySelector("a.cta_button[href]")) !== null && _a !== void 0 ? _a : null;
        const text = cleanText(blade === null || blade === void 0 ? void 0 : blade.querySelector(".headline")) || options.ctaText;
        const label = cleanText(button) || ((_b = button === null || button === void 0 ? void 0 : button.closest("pbc-button")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-link-text")) || options.ctaLabel;
        const href = options.ctaHref || (button === null || button === void 0 ? void 0 : button.href) || ((_c = hero.querySelector("a.cta_button[href]")) === null || _c === void 0 ? void 0 : _c.href) || "#";
        return { text, label, href };
    }
    function collectSlides(root) {
        const slides = [];
        for (const section of root.querySelectorAll('[id^="ts2026-marquee-video-"]')) {
            const match = SLIDE_ID.exec(section.id);
            if (!match)
                continue;
            const slide = readSlide(section, Number(match[1]));
            if (slide)
                slides.push(slide);
        }
        return slides.sort((a, b) => a.index - b.index);
    }
    function cloneMedia(media, index) {
        const clone = media.cloneNode(true);
        clone.classList.add(`${PREFIX}__media`);
        clone.removeAttribute("id");
        clone.dataset.ts2026MarqueeSlide = String(index);
        if (clone instanceof HTMLVideoElement) {
            // The poster is the hero still, framed differently from the video, so it would flash before playback on
            // every cut. It is kept aside and only put on when the first frame is late (see showPoster).
            const poster = clone.getAttribute("poster");
            if (poster)
                clone.dataset.ts2026MarqueePoster = poster;
            clone.removeAttribute("poster");
            clone.muted = true;
            clone.defaultMuted = true;
            clone.playsInline = true;
            clone.setAttribute("muted", "");
            clone.setAttribute("playsinline", "");
            if (!clone.hasAttribute("loop"))
                clone.loop = true;
            // Buffer every slide up front, so a picked prompt cuts straight to a decoded first frame.
            clone.preload = "auto";
        }
        else {
            clone.loading = "eager";
            clone.decoding = "async";
        }
        return clone;
    }
    // Puts the CMS poster on a video whose first frame is still loading, so the cut shows a still rather than black.
    function showPoster(video) {
        const poster = video.dataset.ts2026MarqueePoster;
        if (poster && !video.poster)
            video.poster = poster;
    }
    function playVideo(video) {
        var _a;
        if ((_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(prefers-reduced-motion: reduce)").matches)
            return;
        if (video.preload === "none")
            video.preload = "auto";
        if (video.readyState === 0)
            video.load();
        void video.play().catch(() => { });
    }
    function stopVideo(video) {
        video.pause();
        if (video.currentTime === 0)
            return;
        try {
            video.currentTime = 0;
        }
        catch (_a) {
        }
    }
    function primeVideo(video) {
        stopVideo(video);
        if (video.preload === "none")
            video.preload = "auto";
        if (video.readyState === 0)
            video.load();
    }
    // Calls `done` once `media` has reached the screen: a playing video's first presented frame, otherwise two
    // painted frames. Returns a function that skips the wait and calls `done` right away.
    function whenPresented(media, done) {
        let settled = false;
        let raf = 0;
        let handle = 0;
        const settle = () => {
            if (settled)
                return;
            settled = true;
            cancelAnimationFrame(raf);
            window.clearTimeout(timer);
            if (handle && media instanceof HTMLVideoElement)
                media.cancelVideoFrameCallback(handle);
            done();
        };
        const timer = window.setTimeout(settle, PRESENT_WAIT_MS);
        if (media instanceof HTMLVideoElement && !media.paused && typeof media.requestVideoFrameCallback === "function") {
            handle = media.requestVideoFrameCallback(() => {
                handle = 0;
                raf = requestAnimationFrame(settle);
            });
        }
        else {
            raf = requestAnimationFrame(() => {
                raf = requestAnimationFrame(settle);
            });
        }
        return settle;
    }
    function loadExplored(key) {
        if (!key)
            return new Set();
        try {
            const raw = window.localStorage.getItem(key);
            const parsed = raw ? JSON.parse(raw) : [];
            return new Set(Array.isArray(parsed) ? parsed.filter((n) => Number.isInteger(n)) : []);
        }
        catch (_a) {
            return new Set();
        }
    }
    function saveExplored(key, explored) {
        if (!key)
            return;
        try {
            window.localStorage.setItem(key, JSON.stringify([...explored].sort((a, b) => a - b)));
        }
        catch (_a) {
        }
    }
    function buildCard(slides, options, cta) {
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
        ctaLink.append(Object.assign(el("span", `${PREFIX}__cta-text`), { textContent: cta.text }), ctaAction);
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
        const buttons = [];
        slides.forEach((slide, order) => {
            const item = el("li", `${PREFIX}__item`);
            item.style.setProperty("--ts2026-marquee-order", String(order));
            const button = el("button", `${PREFIX}__prompt`);
            button.type = "button";
            button.id = `${PREFIX}-${slide.index}`;
            button.dataset.ts2026MarqueeSlide = String(slide.index);
            button.dataset.ts2026MarqueeKind = slide.kind;
            button.setAttribute("aria-pressed", "false");
            button.append(el("span", `${PREFIX}__icon`, STAR_SVG), Object.assign(el("span", `${PREFIX}__label`), { textContent: slide.title }), el("span", `${PREFIX}__arrow`, ARROW_SVG));
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
    const num = (value) => String(Math.round(value * 1000) / 1000);
    function blobSetSvg(set) {
        const filters = [];
        const pills = [];
        set.blobs.forEach(([x, y, width, height, opacity, blur, depth], i) => {
            const id = `${BLOBS}-${set.name}-${i}`;
            const pad = blur * 3;
            filters.push(`<filter id="${id}" filterUnits="userSpaceOnUse" x="${num(x - pad)}" y="${num(y - pad)}" width="${num(width + pad * 2)}" height="${num(height + pad * 2)}" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${blur}"/></filter>`);
            // The drift goes on the outer group so the blur's filter region travels with the pill.
            pills.push(`<g class="${BLOBS}__blob" style="--ts2026-marquee-blob-depth:${depth}"><g opacity="${opacity}" filter="url(#${id})"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${height / 2}" fill="#fff"/></g></g>`);
        });
        return `<svg class="${BLOBS}__set" data-set="${set.name}" viewBox="0 0 ${set.width} ${set.height}" preserveAspectRatio="xMidYMin slice" style="--ts2026-marquee-blob-amp:${num(set.width * BLOB_REACH)}px" focusable="false"><defs>${filters.join("")}</defs>${pills.join("")}</svg>`;
    }
    // Draws the background pills (xMidYMin slice matches the gradient's `cover` at `center top`)
    // and eases them toward the cursor on mouse devices.
    function mountBlobs() {
        var _a, _b;
        const hero = document.getElementById(TS2026_MARQUEE_HERO_ID);
        if (!hero || hero.querySelector(`:scope > .${BLOBS}`))
            return null;
        const layer = el("div", BLOBS, BLOB_SETS.map(blobSetSvg).join(""));
        layer.setAttribute("aria-hidden", "true");
        hero.prepend(layer);
        const mouse = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, MOUSE_QUERY);
        const reducedMotion = (_b = window.matchMedia) === null || _b === void 0 ? void 0 : _b.call(window, REDUCED_MOTION_QUERY);
        const enabled = () => { var _a, _b; return ((_a = mouse === null || mouse === void 0 ? void 0 : mouse.matches) !== null && _a !== void 0 ? _a : true) && !((_b = reducedMotion === null || reducedMotion === void 0 ? void 0 : reducedMotion.matches) !== null && _b !== void 0 ? _b : false); };
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
        const step = (now) => {
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
        const aim = (nextX, nextY) => {
            targetX = nextX;
            targetY = nextY;
            if (frame)
                return;
            last = performance.now();
            frame = requestAnimationFrame(step);
        };
        const recenter = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            x = y = targetX = targetY = 0;
            paint();
        };
        const onPointerMove = (event) => {
            if (event.pointerType === "touch" || !enabled())
                return;
            const clamp = (value) => Math.max(-1, Math.min(1, value));
            aim(clamp((event.clientX / window.innerWidth) * 2 - 1), clamp((event.clientY / window.innerHeight) * 2 - 1));
        };
        const onPointerLeave = () => aim(0, 0);
        const onPreferenceChange = () => {
            if (!enabled())
                recenter();
        };
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onPointerLeave);
        mouse === null || mouse === void 0 ? void 0 : mouse.addEventListener("change", onPreferenceChange);
        reducedMotion === null || reducedMotion === void 0 ? void 0 : reducedMotion.addEventListener("change", onPreferenceChange);
        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            document.documentElement.removeEventListener("pointerleave", onPointerLeave);
            mouse === null || mouse === void 0 ? void 0 : mouse.removeEventListener("change", onPreferenceChange);
            reducedMotion === null || reducedMotion === void 0 ? void 0 : reducedMotion.removeEventListener("change", onPreferenceChange);
            cancelAnimationFrame(frame);
            layer.remove();
        };
    }
    // Wider screens hide the mobile video, so it must not keep playing there. A phone turned to landscape counts as
    // wider too, so a video that is playing full screen is left alone.
    function pauseMobileVideo() {
        var _a, _b, _c, _d, _e;
        const uuid = (_a = document.querySelector(`.${MOBILE_VIDEO} [data-uuid]`)) === null || _a === void 0 ? void 0 : _a.dataset.uuid;
        if (!uuid || ((_b = document.fullscreenElement) === null || _b === void 0 ? void 0 : _b.closest(`.${MOBILE_VIDEO}`)))
            return;
        for (const player of (_d = (_c = window.VidyardV4) === null || _c === void 0 ? void 0 : _c.players) !== null && _d !== void 0 ? _d : []) {
            if (player.uuid === uuid)
                (_e = player.pause) === null || _e === void 0 ? void 0 : _e.call(player);
        }
    }
    // The mobile blade's video. The CMS marks it up as <pbc-vidyard-player video-uuid="…">, which stays empty unless
    // the site's own player script picks it up, so it is rebuilt as Vidyard's native inline embed: a poster image
    // that Vidyard's embed script turns into the player. It goes into the hero, where the marquee's window sits on
    // wider screens, so the hero's blue background runs down to the video's bottom edge; the blade it came from
    // stays hidden. Runs once; later calls find nothing left to move.
    function mountMobileVideo() {
        var _a;
        const host = document.querySelector(`#${MOBILE_ID} [video-uuid]`);
        const uuid = host === null || host === void 0 ? void 0 : host.getAttribute("video-uuid");
        const stage = document.querySelector(`#${TS2026_MARQUEE_HERO_ID} .image__wrapper`);
        if (!host || !uuid || !stage)
            return;
        const poster = document.createElement("img");
        poster.className = "vidyard-player-embed";
        poster.src = `https://play.vidyard.com/${encodeURIComponent(uuid)}.jpg`;
        poster.alt = "";
        poster.dataset.uuid = uuid;
        poster.dataset.v = "4";
        poster.dataset.type = "inline";
        poster.style.cssText = "width: 100%; margin: auto; display: block;";
        // The embed script hides the image and puts the player next to it, so the rounded corners go on a wrapper;
        // the same still behind it covers the moment the player takes to load.
        const screen = el("div", "video__asset");
        screen.style.background = `url("${poster.src}") center / cover no-repeat`;
        screen.append(poster);
        // The translucent frame the marquee's window has, around the video.
        const frame = el("div", MOBILE_VIDEO);
        frame.append(screen);
        stage.after(frame);
        // A tap on the player belongs to Vidyard's iframe and never shows up on this page. Browser device emulators
        // that show the phone zoomed out hand it to this page instead, as a click on the iframe element, and the
        // player never hears of it: Play looks dead there. Such a click is passed on as play/pause.
        let playing = false;
        let watched;
        let queued = false;
        frame.addEventListener("click", (event) => {
            var _a, _b, _c, _d, _e, _f, _g;
            if (!(event.target instanceof HTMLIFrameElement))
                return;
            const player = (_b = (_a = window.VidyardV4) === null || _a === void 0 ? void 0 : _a.players) === null || _b === void 0 ? void 0 : _b.find((item) => item.uuid === uuid);
            if (!player)
                return;
            if (watched !== player) {
                watched = player;
                (_c = player.on) === null || _c === void 0 ? void 0 : _c.call(player, "play", () => (playing = true));
                (_d = player.on) === null || _d === void 0 ? void 0 : _d.call(player, "pause", () => (playing = false));
            }
            // A tap before Play shows up reaches a player that is still loading, which refuses play/pause with a console
            // error. That tap starts the video once the player is ready instead.
            if (player.ready && !player.ready()) {
                if (!queued) {
                    queued = true;
                    (_e = player.on) === null || _e === void 0 ? void 0 : _e.call(player, "ready", () => {
                        var _a;
                        queued = false;
                        (_a = player.play) === null || _a === void 0 ? void 0 : _a.call(player);
                    });
                }
                return;
            }
            if (playing)
                (_f = player.pause) === null || _f === void 0 ? void 0 : _f.call(player);
            else
                (_g = player.play) === null || _g === void 0 ? void 0 : _g.call(player);
        });
        host.remove();
        // An embed script that is already up only renders images added later when asked to; one still loading, or
        // added here, picks the image up by itself.
        const vidyard = window.VidyardV4;
        if ((_a = vidyard === null || vidyard === void 0 ? void 0 : vidyard.api) === null || _a === void 0 ? void 0 : _a.renderDOMPlayers) {
            vidyard.api.renderDOMPlayers();
        }
        else if (!document.querySelector(`script[src="${VIDYARD_EMBED_SRC}"]`)) {
            const script = document.createElement("script");
            script.async = true;
            script.src = VIDYARD_EMBED_SRC;
            document.head.append(script);
        }
    }
    function initTs2026Marquee(userOptions = {}) {
        var _a;
        const unmountBlobs = mountBlobs();
        if (!document.getElementById(TS2026_MARQUEE_ROOT_ID))
            return unmountBlobs;
        // Phones show the CMS's own mobile video blade in place of the marquee's window, so the marquee does not run
        // there at all: no video clones, no prompt card, no cursor. Only that blade's video is set up.
        const phone = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, PHONE_QUERY);
        const start = () => {
            if (!(phone === null || phone === void 0 ? void 0 : phone.matches)) {
                pauseMobileVideo();
                return mount(userOptions);
            }
            mountMobileVideo();
            return null;
        };
        let teardown = start();
        const onChange = () => {
            teardown === null || teardown === void 0 ? void 0 : teardown();
            teardown = start();
        };
        phone === null || phone === void 0 ? void 0 : phone.addEventListener("change", onChange);
        return () => {
            phone === null || phone === void 0 ? void 0 : phone.removeEventListener("change", onChange);
            teardown === null || teardown === void 0 ? void 0 : teardown();
            unmountBlobs === null || unmountBlobs === void 0 ? void 0 : unmountBlobs();
        };
    }
    function mount(userOptions) {
        var _a, _b, _c, _d;
        const options = Object.assign(Object.assign({}, DEFAULTS), userOptions);
        if ((_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, TOUCH_QUERY).matches) {
            options.hint = (_b = userOptions.hint) !== null && _b !== void 0 ? _b : options.hintTouch;
            options.hintIntro = (_c = userOptions.hintIntro) !== null && _c !== void 0 ? _c : options.hintIntroTouch;
        }
        const root = document.getElementById(TS2026_MARQUEE_ROOT_ID);
        const hero = document.getElementById(TS2026_MARQUEE_HERO_ID);
        const stage = hero === null || hero === void 0 ? void 0 : hero.querySelector(".image__wrapper");
        if (!root || !hero || !stage || root.dataset.ts2026MarqueeReady)
            return null;
        const slides = collectSlides(root);
        if (slides.length === 0)
            return null;
        const heroMedia = stage.querySelector("img, video");
        const width = heroMedia === null || heroMedia === void 0 ? void 0 : heroMedia.getAttribute("width");
        const height = heroMedia === null || heroMedia === void 0 ? void 0 : heroMedia.getAttribute("height");
        if (width && height)
            stage.style.setProperty("--ts2026-marquee-aspect", `${width} / ${height}`);
        heroMedia === null || heroMedia === void 0 ? void 0 : heroMedia.setAttribute("data-ts2026-marquee-slide", "0");
        const clones = new Map();
        // Each slide's follow-up videos; they play once, after the slide's own video.
        const partClones = new Map();
        for (const slide of slides) {
            const clone = cloneMedia(slide.media, slide.index);
            clones.set(slide.index, clone);
            stage.append(clone);
            const parts = slide.parts.map((video) => {
                const part = cloneMedia(video, slide.index);
                part.loop = false;
                stage.append(part);
                return part;
            });
            if (parts.length)
                partClones.set(slide.index, parts);
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
        let openHint = false;
        let openHintTimer = 0;
        let openTimer = 0;
        let active = 0;
        // Which video of the active slide is on: 0 is its own, n its nth follow-up.
        let part = 0;
        // True while the drawn cursor travels to the plus between two parts.
        let handoff = false;
        const mediaOf = (index) => { var _a, _b; return (_b = (index === active && part > 0 ? (_a = partClones.get(index)) === null || _a === void 0 ? void 0 : _a[part - 1] : undefined)) !== null && _b !== void 0 ? _b : clones.get(index); };
        let playHeld = false;
        // False while a finished slide that hid the input waits CTA_AFTER_INPUT_MS before its CTA unfolds.
        let ctaDue = true;
        let ctaTimer = 0;
        // The soft veil under the CTA waits ctaBlurDelay after the CTA shows.
        let softDue = false;
        let softTimer = 0;
        const sync = () => {
            const docked = Boolean(card.dataset.dock);
            const held = docked && (expanded || (mediaDone && ctaDue));
            const cued = !hintSeen && !expanded && (!docked || mediaDone);
            const hinted = (cued && hintDue) || openHint;
            const current = mediaOf(active);
            card.toggleAttribute("data-teaser", held);
            card.toggleAttribute("data-playing", Boolean(current) && !held && !playHeld && !mediaDone);
            card.toggleAttribute("data-hint", hinted);
            if (hinted) {
                hintText.textContent = openHint ? options.hintOpen : docked ? options.hint : options.hintIntro;
                card.toggleAttribute("data-hint-open", openHint);
                card.toggleAttribute("data-hint-below", !openHint);
            }
            if (hinted)
                composer.setAttribute("aria-describedby", hint.id);
            else
                composer.removeAttribute("aria-describedby");
            // The veil (dim and blur) is full under the open docked prompts and lighter under the CTA a finished slide
            // shows, ctaBlurDelay after that CTA comes up. While a picked slide waits for its cut, the veil may come on but never lifts off the outgoing slide:
            // it drops together with the cut.
            const dim = (docked && expanded) || (playHeld && root.hasAttribute(DIM));
            const ctaUp = docked && mediaDone && ctaDue;
            if (!ctaUp) {
                window.clearTimeout(softTimer);
                softTimer = 0;
                softDue = false;
            }
            else if (!softDue && !softTimer) {
                if (options.ctaBlurDelay > 0) {
                    softTimer = window.setTimeout(() => {
                        softTimer = 0;
                        softDue = true;
                        sync();
                    }, options.ctaBlurDelay);
                }
                else
                    softDue = true;
            }
            const soft = held && !dim && (softDue || !ctaUp);
            if (dim || soft)
                root.removeAttribute(CUT);
            root.toggleAttribute(DIM, dim);
            root.toggleAttribute(SOFT, soft);
            if (current instanceof HTMLVideoElement) {
                // A finished docked slide rests on its last frame, also while its CTA waits to unfold.
                // Between two parts the finished one rests on its last frame too; play() would restart it.
                if (held || playHeld || handoff || document.hidden || (docked && mediaDone))
                    current.pause();
                else
                    playVideo(current);
            }
        };
        const panelInner = panel.firstElementChild;
        const tablet = (_d = window.matchMedia) === null || _d === void 0 ? void 0 : _d.call(window, TABLET_QUERY);
        const fit = () => {
            let lift = 0;
            if (expanded && !card.dataset.dock && panelInner && (tablet === null || tablet === void 0 ? void 0 : tablet.matches)) {
                const style = getComputedStyle(card);
                const inset = parseFloat(style.getPropertyValue("--marquee-card-inset")) || 16;
                const pillH = parseFloat(style.getPropertyValue("--prompts-pill-h")) || 44;
                const openH = parseFloat(style.getPropertyValue("--prompts-open-h")) || pillH;
                const top = box.offsetTop;
                const overflow = top + openH + panelInner.scrollHeight - (card.clientHeight - inset);
                lift = Math.max(0, Math.min(Math.ceil(overflow), Math.floor(top - inset)));
            }
            if (lift)
                card.style.setProperty("--prompts-lift", `${lift}px`);
            else
                card.style.removeProperty("--prompts-lift");
        };
        const fitObserver = typeof ResizeObserver === "function" ? new ResizeObserver(fit) : null;
        fitObserver === null || fitObserver === void 0 ? void 0 : fitObserver.observe(card);
        const hideOpenHint = () => {
            window.clearTimeout(openHintTimer);
            openHint = false;
        };
        const showOpenHint = () => {
            hideOpenHint();
            openHint = true;
            sync();
            if (options.hintOpenDuration <= 0)
                return;
            openHintTimer = window.setTimeout(() => {
                openHint = false;
                sync();
            }, options.hintOpenDuration);
        };
        const pinnedOpen = () => expanded && !card.dataset.dock;
        const setExpanded = (open) => {
            window.clearTimeout(openTimer);
            openTimer = 0;
            if (!open)
                hideOpenHint();
            expanded = open;
            card.dataset.state = open ? "expanded" : "collapsed";
            composer.setAttribute("aria-expanded", String(open));
            panel.toggleAttribute("inert", !open);
            if (open && (!card.dataset.dock || mediaDone))
                hintSeen = true;
            fit();
            sync();
        };
        const disarmCue = () => {
            window.clearTimeout(pulseTimer);
            window.clearTimeout(hintTimer);
            hintDue = false;
        };
        const armCue = (delay) => {
            disarmCue();
            pulseTimer = window.setTimeout(() => {
                hintTimer = window.setTimeout(() => {
                    hintDue = true;
                    sync();
                }, options.hintDelay);
            }, delay);
        };
        if (options.expanded)
            setExpanded(true);
        stage.append(card);
        const cursor = el("div", `${PREFIX}__cursor`, CURSOR_SVG);
        cursor.setAttribute("aria-hidden", "true");
        stage.append(cursor);
        // A 1px, all but invisible pulse that runs while a slide plays (see its CSS): on 120Hz screens Chromium hands a
        // video that is the only thing moving to the screen unevenly, every 3rd and 5th refresh instead of every 4th,
        // and its smooth stretches (slide 3's last seconds) judder as if they paused. Any running compositor animation
        // evens that out.
        const ticker = el("div", `${PREFIX}__ticker`);
        ticker.setAttribute("aria-hidden", "true");
        stage.append(ticker);
        const reducedMotion = () => { var _a, _b; return (_b = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(prefers-reduced-motion: reduce)").matches) !== null && _b !== void 0 ? _b : false; };
        let cancelSettle = null;
        const afterTransition = (target, property, timeout, done) => {
            cancelSettle === null || cancelSettle === void 0 ? void 0 : cancelSettle();
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
            const onEnd = (event) => {
                if (event.target === target && event.propertyName === property)
                    finish();
            };
            target.addEventListener("transitionend", onEnd);
            timer = window.setTimeout(finish, timeout);
            cancelSettle = cleanup;
        };
        const frameReady = (video) => video.readyState >= HAVE_CURRENT_DATA && !video.seeking;
        // Calls `done` once `media` has a frame to show. On a slow network that can take a while, so after FRAME_WAIT_MS
        // the video gets its CMS poster and the cut lands on that still instead of a black window; the frame
        // replaces it as soon as it is decoded.
        const whenFrameReady = (media, done) => {
            cancelSettle === null || cancelSettle === void 0 ? void 0 : cancelSettle();
            if (!(media instanceof HTMLVideoElement) || frameReady(media)) {
                done();
                return;
            }
            let timer = 0;
            const cleanup = () => {
                for (const type of FRAME_EVENTS)
                    media.removeEventListener(type, onEvent);
                window.clearTimeout(timer);
                cancelSettle = null;
            };
            const finish = () => {
                cleanup();
                done();
            };
            const onEvent = (event) => {
                if (event.type === "error" || frameReady(media))
                    finish();
            };
            for (const type of FRAME_EVENTS)
                media.addEventListener(type, onEvent);
            timer = window.setTimeout(() => {
                showPoster(media);
                finish();
            }, FRAME_WAIT_MS);
            cancelSettle = cleanup;
        };
        const dock = () => {
            if (card.dataset.dock)
                return false;
            if (expanded)
                setExpanded(false);
            const from = box.getBoundingClientRect().top;
            card.dataset.dock = "bottom";
            sync();
            const delta = from - box.getBoundingClientRect().top;
            if (!delta || reducedMotion())
                return false;
            box.style.transition = "none";
            box.style.translate = `0 ${delta}px`;
            void box.offsetHeight;
            box.style.transition = "";
            box.style.translate = "";
            return true;
        };
        const foldThenDock = (onSettled) => {
            const wasExpanded = expanded;
            setExpanded(false);
            const slide = () => {
                if (!card.dataset.dock && dock())
                    afterTransition(box, "translate", 700, onSettled);
                else
                    onSettled();
            };
            if (wasExpanded && !reducedMotion())
                afterTransition(panel, "grid-template-rows", 700, slide);
            else
                slide();
        };
        const explored = loadExplored(options.storageKey);
        for (const index of explored)
            if (!clones.has(index))
                explored.delete(index);
        const renderExplored = () => {
            for (const button of buttons) {
                const isExplored = explored.has(Number(button.dataset.ts2026MarqueeSlide));
                button.classList.toggle("is-explored", isExplored);
                const icon = button.querySelector(`.${PREFIX}__arrow`);
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
        let unwatchMedia = null;
        const onMediaDone = () => {
            unwatchMedia === null || unwatchMedia === void 0 ? void 0 : unwatchMedia();
            unwatchMedia = null;
            mediaDone = true;
            window.clearTimeout(ctaTimer);
            // Brings the input back now if it is still out, so the wait below counts from its return.
            syncChrome();
            // A slide that hid the input unfolds its CTA (and the cue) CTA_AFTER_INPUT_MS after the input came back.
            const wait = card.dataset.dock && inputBackAt
                ? CTA_AFTER_INPUT_MS - (performance.now() - inputBackAt)
                : 0;
            if (wait > 0) {
                ctaDue = false;
                ctaTimer = window.setTimeout(() => {
                    ctaDue = true;
                    sync();
                    armCue(options.pulseDelay);
                }, wait);
            }
            else {
                ctaDue = true;
                armCue(options.pulseDelay);
            }
            sync();
        };
        // A docked slide with a follow-up video hands over to it; anything else is done.
        const onPartDone = () => {
            var _a;
            const next = (_a = partClones.get(active)) === null || _a === void 0 ? void 0 : _a[part];
            if (next && card.dataset.dock)
                startHandoff(next);
            else
                onMediaDone();
        };
        const watchMedia = (media) => {
            var _a;
            unwatchMedia === null || unwatchMedia === void 0 ? void 0 : unwatchMedia();
            unwatchMedia = null;
            window.clearTimeout(mediaTimer);
            if (!media)
                return;
            if (media instanceof HTMLVideoElement) {
                // Docked, the slide pauses under the CTA once it finishes, so play it through once and let it rest on its
                // last frame; looping would wrap to the first frame before the wrap is noticed and the video paused.
                const loop = media.loop;
                if (card.dataset.dock)
                    media.loop = false;
                // Load the part that follows while this one plays, so it is ready by the cursor's click.
                const after = card.dataset.dock ? (_a = partClones.get(active)) === null || _a === void 0 ? void 0 : _a[part] : undefined;
                if (after && after !== media)
                    primeVideo(after);
                // The drawn cursor takes over on the first frame the video's own cursor is gone, not at the very end, so
                // there is never a frame with no cursor at all. Frame callbacks catch that frame exactly; timeupdate, a few
                // times a second, backs them up where they do not run.
                const takeover = after && part === 0 ? CURSOR_AT_S[active] : undefined;
                let last = 0;
                const onTimeUpdate = () => {
                    if (media.currentTime + 0.5 < last)
                        onMediaDone();
                    else if (takeover !== undefined && media.currentTime >= takeover)
                        onPartDone();
                    last = media.currentTime;
                };
                let frameHandle = 0;
                if (takeover !== undefined && typeof media.requestVideoFrameCallback === "function") {
                    const onFrame = (_now, frame) => {
                        frameHandle = 0;
                        if (frame.mediaTime >= takeover)
                            onPartDone();
                        else
                            frameHandle = media.requestVideoFrameCallback(onFrame);
                    };
                    frameHandle = media.requestVideoFrameCallback(onFrame);
                }
                media.addEventListener("ended", onPartDone);
                media.addEventListener("timeupdate", onTimeUpdate);
                unwatchMedia = () => {
                    if (frameHandle)
                        media.cancelVideoFrameCallback(frameHandle);
                    media.removeEventListener("ended", onPartDone);
                    media.removeEventListener("timeupdate", onTimeUpdate);
                    media.loop = loop;
                };
            }
            else {
                mediaTimer = window.setTimeout(onMediaDone, options.imageDuration);
                unwatchMedia = () => window.clearTimeout(mediaTimer);
            }
        };
        // The chrome follows the slide on screen (not the picked one, which waits for its cut): it fades out once
        // that video reaches its full-bleed cut and fades back in at the window's end; it snaps back when the video
        // wraps, rewinds or another slide cuts in.
        let shown = -1;
        // The video on screen and which part of its slide it is, for SIDE_OUT_AT.
        let shownMedia;
        let shownPart = 0;
        let unwatchChrome = null;
        // When the input last came back after a slide hid it; 0 while it has not.
        let inputBackAt = 0;
        const syncChrome = () => {
            var _a;
            const span = CHROME_OUT_AT[shown];
            const current = clones.get(shown);
            const t = current instanceof HTMLVideoElement ? current.currentTime : -1;
            const out = span !== undefined && t >= span[0] - CHROME_FADE_S && t < span[1];
            root.toggleAttribute(CHROME_OUT, out);
            root.toggleAttribute(CHROME_BACK, span !== undefined && t >= span[1]);
            const sideAt = (_a = SIDE_OUT_AT[shown]) === null || _a === void 0 ? void 0 : _a[shownPart];
            const sideT = shownMedia instanceof HTMLVideoElement ? shownMedia.currentTime : -1;
            const sideOut = sideAt !== undefined && sideT >= sideAt - CHROME_FADE_S;
            root.toggleAttribute(SIDE_OUT, sideOut);
            // The input fades out with the chrome or the sidebar rail; it returns with the chrome, or INPUT_BACK_BEFORE_END_S
            // before the video ends (the rail stays off).
            const duration = shownMedia instanceof HTMLVideoElement ? shownMedia.duration : NaN;
            const sideBack = Number.isFinite(duration) && sideT >= duration - INPUT_BACK_BEFORE_END_S;
            const ended = (shown === active && mediaDone) ||
                (current instanceof HTMLVideoElement && current.ended) ||
                (shownMedia instanceof HTMLVideoElement && shownMedia.ended);
            const inputOut = (out || (sideOut && !sideBack)) && !ended;
            if (root.hasAttribute(INPUT_OUT) && !inputOut)
                inputBackAt = performance.now();
            root.toggleAttribute(INPUT_OUT, inputOut);
        };
        const watchChrome = (index, video) => {
            var _a;
            unwatchChrome === null || unwatchChrome === void 0 ? void 0 : unwatchChrome();
            unwatchChrome = null;
            shown = index;
            shownMedia = video;
            shownPart = index === active ? part : 0;
            syncChrome();
            if (!(video instanceof HTMLVideoElement))
                return;
            if (CHROME_OUT_AT[index] === undefined && ((_a = SIDE_OUT_AT[index]) === null || _a === void 0 ? void 0 : _a[shownPart]) === undefined)
                return;
            let handle = 0;
            const perFrame = typeof video.requestVideoFrameCallback === "function";
            const onFrame = () => {
                syncChrome();
                handle = video.requestVideoFrameCallback(onFrame);
            };
            if (perFrame)
                handle = video.requestVideoFrameCallback(onFrame);
            video.addEventListener("timeupdate", syncChrome);
            unwatchChrome = () => {
                video.removeEventListener("timeupdate", syncChrome);
                if (handle)
                    video.cancelVideoFrameCallback(handle);
            };
        };
        const select = (index) => {
            cancelHandoff();
            active = index;
            part = 0;
            mediaDone = false;
            window.clearTimeout(ctaTimer);
            ctaDue = true;
            inputBackAt = 0;
            hintSeen = false;
            disarmCue();
            const next = clones.get(index);
            watchMedia(playHeld ? undefined : next);
            if (playHeld && next instanceof HTMLVideoElement)
                primeVideo(next);
            for (const button of buttons) {
                const isActive = Number(button.dataset.ts2026MarqueeSlide) === index;
                button.setAttribute("aria-pressed", String(isActive));
                button.classList.toggle("is-active", isActive);
            }
            sync();
        };
        const allMedia = [
            ...(heroMedia ? [heroMedia] : []),
            ...clones.values(),
            ...[...partClones.values()].flat(),
        ];
        let finishSwap = null;
        // A hard cut, no fade: the incoming slide goes on top at once and the outgoing one stays visible under it
        // until the incoming has a frame on screen, so the window never shows an empty or half-faded box.
        const reveal = (index) => {
            finishSwap === null || finishSwap === void 0 ? void 0 : finishSwap();
            const incoming = index === 0 && !clones.has(0) ? (heroMedia !== null && heroMedia !== void 0 ? heroMedia : undefined) : mediaOf(index);
            const leaving = allMedia.filter((media) => media !== incoming && media.hasAttribute(ACTIVE));
            incoming === null || incoming === void 0 ? void 0 : incoming.setAttribute(ACTIVE, "");
            root.dataset.ts2026MarqueeActive = String(index);
            watchChrome(index, incoming);
            const finish = () => {
                finishSwap = null;
                incoming === null || incoming === void 0 ? void 0 : incoming.removeAttribute(ENTERING);
                for (const media of leaving) {
                    media.removeAttribute(ACTIVE);
                    if (media instanceof HTMLVideoElement)
                        stopVideo(media);
                }
            };
            if (!incoming || leaving.length === 0) {
                finish();
                return;
            }
            incoming.setAttribute(ENTERING, "");
            finishSwap = whenPresented(incoming, finish);
        };
        const show = (index) => {
            select(index);
            reveal(index);
        };
        const release = () => {
            playHeld = false;
            watchMedia(mediaOf(active));
            sync();
        };
        // Between two parts of a slide: the cursor picks up where the video's cursor left off, glides to the input's
        // plus and presses it; the next part cuts in as the press lets go, and the cursor fades out over it.
        let handoffTimer = 0;
        let cursorMove = null;
        const hideCursor = () => {
            window.clearTimeout(handoffTimer);
            cursorMove === null || cursorMove === void 0 ? void 0 : cursorMove.cancel();
            cursorMove = null;
            cursor.removeAttribute("data-on");
            cursor.removeAttribute(PRESSED);
            card.removeAttribute(PRESSED);
        };
        const cancelHandoff = () => {
            if (!handoff)
                return;
            handoff = false;
            hideCursor();
        };
        const startHandoff = (next) => {
            var _a;
            const from = mediaOf(active);
            unwatchMedia === null || unwatchMedia === void 0 ? void 0 : unwatchMedia();
            unwatchMedia = null;
            handoff = true;
            primeVideo(next);
            sync();
            const play = () => {
                if (!handoff)
                    return;
                whenFrameReady(next, () => {
                    if (!handoff)
                        return;
                    handoff = false;
                    part += 1;
                    cursor.removeAttribute(PRESSED);
                    card.removeAttribute(PRESSED);
                    watchMedia(next);
                    reveal(active);
                    sync();
                    handoffTimer = window.setTimeout(hideCursor, CURSOR_FADE_MS);
                    cursor.removeAttribute("data-on");
                });
            };
            const press = () => {
                if (!handoff)
                    return;
                card.setAttribute(PRESSED, "");
                handoffTimer = window.setTimeout(play, CURSOR_PRESS_MS);
            };
            const plus = composer.querySelector(`.${PREFIX}__plus`);
            const frame = from === null || from === void 0 ? void 0 : from.getBoundingClientRect();
            const target = plus === null || plus === void 0 ? void 0 : plus.getBoundingClientRect();
            if (!frame || !target || !frame.width || !target.width || reducedMotion()) {
                play();
                return;
            }
            const origin = stage.getBoundingClientRect();
            const [fx, fy] = (_a = CURSOR_FROM[active]) !== null && _a !== void 0 ? _a : CURSOR_FROM_DEFAULT;
            // The video fills its box's width; its height follows from its own aspect ratio.
            const ratio = from instanceof HTMLVideoElement && from.videoWidth ? from.videoHeight / from.videoWidth : 0;
            const frameHeight = ratio ? frame.width * ratio : frame.height;
            const at = (x, y) => `${num(x - origin.left)}px ${num(y - origin.top)}px`;
            const sx = frame.left + frame.width * fx;
            const sy = frame.top + frameHeight * fy;
            const ex = target.left + target.width / 2;
            const ey = target.top + target.height / 2;
            // Long enough that the move sets off at the video cursor's own speed.
            const speed = (CURSOR_SPEED * frame.width) / 1000;
            const move = Math.min(CURSOR_MOVE_MS, Math.max(CURSOR_MOVE_MIN_MS, (CURSOR_EASING_START * Math.hypot(ex - sx, ey - sy)) / speed));
            const end = at(ex, ey);
            cursor.style.translate = end;
            cursor.setAttribute("data-on", "");
            cursorMove = cursor.animate([{ translate: at(sx, sy) }, { translate: end }], {
                duration: move,
                easing: CURSOR_EASING,
            });
            // Press only once the next part has a frame, so the cut follows the click at once.
            handoffTimer = window.setTimeout(() => {
                if (handoff)
                    whenFrameReady(next, press);
            }, move + CURSOR_REST_MS);
        };
        const onClick = (event) => {
            const button = event.target.closest(`.${PREFIX}__prompt`);
            if (!button)
                return;
            const index = Number(button.dataset.ts2026MarqueeSlide);
            explored.add(index);
            saveExplored(options.storageKey, explored);
            renderExplored();
            playHeld = true;
            select(index);
            foldThenDock(() => whenFrameReady(clones.get(index), () => {
                root.setAttribute(CUT, "");
                release();
                reveal(index);
            }));
        };
        card.addEventListener("click", onClick);
        const setSweepRate = (button, rate) => {
            for (const animation of button.getAnimations({ subtree: true })) {
                if (animation.animationName === SWEEP_ANIMATION)
                    animation.updatePlaybackRate(rate);
            }
        };
        const promptUnderPointer = (event) => {
            const button = event.target.closest(`.${PREFIX}__prompt`);
            if (!button || button.contains(event.relatedTarget))
                return null;
            return button;
        };
        const onPointerOver = (event) => {
            const button = promptUnderPointer(event);
            if (button)
                setSweepRate(button, SWEEP_HOVER_RATE);
        };
        const onPointerOut = (event) => {
            const button = promptUnderPointer(event);
            if (button)
                setSweepRate(button, 1);
        };
        card.addEventListener("pointerover", onPointerOver);
        card.addEventListener("pointerout", onPointerOut);
        // On the first screen a showing hint fades out first and the prompts unfold once it is gone.
        const openPrompts = () => {
            if (expanded || openTimer)
                return;
            if (card.dataset.dock || !card.hasAttribute("data-hint") || reducedMotion()) {
                setExpanded(true);
                return;
            }
            hintSeen = true;
            sync();
            openTimer = window.setTimeout(() => setExpanded(true), HINT_OUT_MS);
        };
        // "Choose a prompt below…" shows only on a click on the composer whose first-screen prompts are already open;
        // opening them, by a click or by themselves, never brings it up.
        const onToggle = () => {
            if (pinnedOpen())
                showOpenHint();
            else if (expanded)
                setExpanded(false);
            else
                openPrompts();
        };
        composer.addEventListener("click", onToggle);
        const onKeydown = (event) => {
            if (event.key !== "Escape" || !expanded || pinnedOpen())
                return;
            setExpanded(false);
            composer.focus();
        };
        card.addEventListener("keydown", onKeydown);
        const onPointerDown = (event) => {
            if (expanded && !pinnedOpen() && !card.contains(event.target))
                setExpanded(false);
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
        const autoOpenTimer = options.autoOpenDelay > 0
            ? window.setTimeout(() => {
                if (!card.dataset.dock)
                    openPrompts();
            }, options.autoOpenDelay)
            : 0;
        return () => {
            window.clearTimeout(autoOpenTimer);
            window.clearTimeout(softTimer);
            window.clearTimeout(openTimer);
            window.clearTimeout(ctaTimer);
            card.removeEventListener("click", onClick);
            card.removeEventListener("pointerover", onPointerOver);
            card.removeEventListener("pointerout", onPointerOut);
            composer.removeEventListener("click", onToggle);
            card.removeEventListener("keydown", onKeydown);
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("visibilitychange", onVisibility);
            fitObserver === null || fitObserver === void 0 ? void 0 : fitObserver.disconnect();
            cancelSettle === null || cancelSettle === void 0 ? void 0 : cancelSettle();
            disarmCue();
            hideOpenHint();
            unwatchMedia === null || unwatchMedia === void 0 ? void 0 : unwatchMedia();
            unwatchChrome === null || unwatchChrome === void 0 ? void 0 : unwatchChrome();
            finishSwap === null || finishSwap === void 0 ? void 0 : finishSwap();
            cancelHandoff();
            hideCursor();
            for (const clone of [...clones.values(), ...[...partClones.values()].flat()]) {
                if (clone instanceof HTMLVideoElement)
                    clone.pause();
                clone.remove();
            }
            cursor.remove();
            card.remove();
            ticker.remove();
            chrome.remove();
            heroMedia === null || heroMedia === void 0 ? void 0 : heroMedia.removeAttribute("data-ts2026-marquee-slide");
            heroMedia === null || heroMedia === void 0 ? void 0 : heroMedia.removeAttribute(ACTIVE);
            stage.style.removeProperty("--ts2026-marquee-aspect");
            delete root.dataset.ts2026MarqueeReady;
            delete root.dataset.ts2026MarqueeActive;
            root.removeAttribute(DIM);
            root.removeAttribute(SOFT);
            root.removeAttribute(CUT);
            root.removeAttribute(CHROME_OUT);
            root.removeAttribute(SIDE_OUT);
            root.removeAttribute(INPUT_OUT);
            root.removeAttribute(CHROME_BACK);
        };
    }
    if (typeof document !== "undefined" && document.currentScript) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => initTs2026Marquee(), { once: true });
        }
        else {
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
