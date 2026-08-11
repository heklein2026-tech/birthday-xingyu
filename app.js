/**
 * 王星宇 · 23 岁生日祝福站
 */

(function () {
  "use strict";

  const WISHES = [
    { zh: "明媚", en: "Brightness" },
    { zh: "自由", en: "Freedom" },
    { zh: "勇敢", en: "Courage" },
    { zh: "昂扬", en: "Uplifting" },
    { zh: "坚韧", en: "Toughness" },
    { zh: "温柔", en: "Tenderness" },
    { zh: "迷人", en: "Charming" },
    { zh: "优雅", en: "Grace" },
    { zh: "可爱", en: "Lovely" },
    { zh: "惊艳", en: "Stunning" },
    { zh: "绚丽", en: "Gorgeous" },
    { zh: "璀璨", en: "Radiant" },
  ];

  // 12 颗星：更清晰的爱心轮廓（双叶 + 底部尖端）
  function buildHeartTaps(count) {
    var taps = [];
    for (var i = 0; i < count; i++) {
      // 从底部尖端起均匀取样
      var t = (i / count) * Math.PI * 2 + Math.PI;
      var x = 16 * Math.pow(Math.sin(t), 3);
      var y = -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );
      // 横向拉开双叶，纵向加深凹陷与尖端，比椭圆更像爱心
      taps.push({
        left: 50 + x * 2.85,
        top: 41 + y * 2.25,
      });
    }
    return taps;
  }
  const STAR_TAPS = buildHeartTaps(12);

  // 12 个互不相同的星形图标（参考图二风格）
  const STAR_ICONS = [
    // 1 三星簇
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M32 8l2.2 6.8H41l-5.6 4.1 2.1 6.7L32 21.5l-5.5 4.1 2.1-6.7-5.6-4.1h6.8zm-14 18l1.5 4.6h4.7l-3.8 2.8 1.4 4.5-3.8-2.8-3.8 2.8 1.4-4.5-3.8-2.8h4.7zm28 0l1.5 4.6h4.7l-3.8 2.8 1.4 4.5-3.8-2.8-3.8 2.8 1.4-4.5-3.8-2.8h4.7zm-14 12l1.8 5.4H54l-4.5 3.3 1.7 5.3L32 48.2 26.8 52l1.7-5.3-4.5-3.3h5.8z"/></svg>',
    // 2 八角光芒
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M32 4l3 14 14 3-14 3-3 14-3-14-14-3 14-3zm0 18l1.6 7.4 7.4 1.6-7.4 1.6L32 50l-1.6-7.4-7.4-1.6 7.4-1.6z"/><circle cx="12" cy="18" r="1.5" fill="currentColor"/><circle cx="52" cy="18" r="1.5" fill="currentColor"/><circle cx="14" cy="46" r="1.3" fill="currentColor"/><circle cx="50" cy="46" r="1.3" fill="currentColor"/></svg>',
    // 3 四星环绕
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M32 14l2.8 8.6H44l-7.2 5.2 2.8 8.6L32 31.2 24.4 36.4l2.8-8.6L20 22.6h9.2z"/><path fill="currentColor" d="M14 8l1.2 3.6H19l-3.1 2.2 1.2 3.6L14 15.2 10.9 17.4l1.2-3.6L9 11.6h3.8zm36 0l1.2 3.6H55l-3.1 2.2 1.2 3.6L50 15.2 46.9 17.4l1.2-3.6L45 11.6h3.8zM14 44l1.2 3.6H19l-3.1 2.2 1.2 3.6L14 51.2 10.9 53.4l1.2-3.6L9 47.6h3.8zm36 0l1.2 3.6H55l-3.1 2.2 1.2 3.6L50 51.2 46.9 53.4l1.2-3.6L45 47.6h3.8z"/></svg>',
    // 4 十字星尖
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M32 6l1.4 18.6L52 32l-18.6 1.4L32 58l-1.4-24.6L12 32l18.6-1.4z"/><path fill="currentColor" d="M32 2l1 4-1 4-1-4zm0 48l1 4-1 4-1-4zM6 31l4 1-4 1-4-1zm48 0l4 1-4 1-4-1z"/></svg>',
    // 5 太阳放射
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M32 10l1.8 9.2L43 21l-9.2 1.8L32 32l-1.8-9.2L21 21l9.2-1.8zm0-6l1 5-1 5-1-5zm0 46l1 5-1 5-1-5zM8 31l5 1-5 1-5-1zm48 0l5 1-5 1-5-1zM14 14l4 3-3 4-4-3zm32 32l4 3-3 4-4-3zM50 14l-4 3 3 4 4-3zM14 50l-4 3 3 4 4-3z"/></svg>',
    // 6 叠闪三星
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" opacity=".55" d="M22 16l2 6h6.5l-5.2 3.8 2 6.2L22 28.2 16.7 32l2-6.2L13.5 22H20z"/><path fill="currentColor" opacity=".7" d="M42 14l2.2 6.6H51l-5.4 4 2.1 6.5L42 27.1 36.3 31l2.1-6.5L33 20.6h6.8z"/><path fill="currentColor" d="M32 28l2.6 8H43l-6.8 5 2.6 8L32 44l-6.8 5 2.6-8L21 36h8.4z"/></svg>',
    // 7 菱形星簇
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M32 8l6 12 12 6-12 6-6 12-6-12-12-6 12-6z"/><path fill="currentColor" d="M14 40l3.5 7 7 3.5-7 3.5-3.5 7-3.5-7-7-3.5 7-3.5z"/><path fill="currentColor" d="M50 38l2.8 5.6 5.6 2.8-5.6 2.8L50 55l-2.8-5.8-5.6-2.8 5.6-2.8z"/></svg>',
    // 8 细十字加点
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M32 4c.8 8 1.6 16 1.6 28S32.8 52 32 60c-.8-8-1.6-16-1.6-28S31.2 12 32 4zm-28 28c8-.8 16-1.6 28-1.6S52 31.2 60 32c-8 .8-16 1.6-28 1.6S12 32.8 4 32z"/><circle cx="20" cy="20" r="1.4" fill="currentColor"/><circle cx="44" cy="20" r="1.4" fill="currentColor"/><circle cx="20" cy="44" r="1.4" fill="currentColor"/><circle cx="44" cy="44" r="1.4" fill="currentColor"/></svg>',
    // 9 尖角六芒
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M32 6l4.2 14.4L50.8 22 38.4 31l3.2 15.2L32 38.6 22.4 46.2 25.6 31 13.2 22l14.6-1.6z"/><path fill="currentColor" d="M12 12l1.3 2.6 2.6.6-2.2 1.6.7 2.7L12 18l-2.4 1.5.7-2.7-2.2-1.6 2.6-.6zm40 0l1.3 2.6 2.6.6-2.2 1.6.7 2.7L52 18l-2.4 1.5.7-2.7-2.2-1.6 2.6-.6zM12 48l1.3 2.6 2.6.6-2.2 1.6.7 2.7L12 54l-2.4 1.5.7-2.7-2.2-1.6 2.6-.6zm40 0l1.3 2.6 2.6.6-2.2 1.6.7 2.7L52 54l-2.4 1.5.7-2.7-2.2-1.6 2.6-.6z"/></svg>',
    // 10 轨道星
    '<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="32" rx="22" ry="10" fill="none" stroke="currentColor" stroke-width="1.8" transform="rotate(-28 32 32)"/><path fill="currentColor" d="M32 16l2.4 7.4H42l-6.2 4.5 2.4 7.3L32 30.7 25.8 35.2l2.4-7.3L22 23.4h7.6z"/></svg>',
    // 11 环绕星
    '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="14" fill="none" stroke="currentColor" stroke-width="2.2"/><path fill="currentColor" d="M32 10l2.6 8H43l-6.8 5 2.6 8L32 26l-6.8 5 2.6-8L21 18h8.4z"/><circle cx="32" cy="50" r="1.6" fill="currentColor"/><circle cx="14" cy="32" r="1.4" fill="currentColor"/><circle cx="50" cy="32" r="1.4" fill="currentColor"/></svg>',
    // 12 流星
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M42 8l3.2 9.8H56l-8.4 6.1 3.2 9.9L42 27.7 33.2 33.8l3.2-9.9L28 17.8h10.8z"/><path fill="currentColor" d="M8 44l14-6.5 2 2.2L10 48zm4 8l16-8 1.8 2.2-16 8zm6 6l12-5.5 1.5 2-12 5.5z"/></svg>',
  ];

  const intro = document.getElementById("intro");
  const envelope = document.getElementById("envelope");
  const journey = document.getElementById("journey");
  const musicBtn = document.getElementById("musicBtn");
  const playCta = document.getElementById("playCta");
  const bgMusic = document.getElementById("bgMusic");
  const wishStars = document.getElementById("wishStars");
  const wishFragments = document.getElementById("wishFragments");
  const starWords = document.getElementById("starWords");
  const starHint = document.getElementById("starHint");
  const starTitle = document.getElementById("starTitle");
  const starTitleEn = document.getElementById("starTitleEn");
  const meteor = document.getElementById("meteor");
  const starStop = document.getElementById("starStop");
  const petalsEl = document.getElementById("petals");
  const finalePetals = document.getElementById("finalePetals");
  const starsCanvas = document.getElementById("starsCanvas");
  const finale = document.getElementById("finale");

  let opened = false;
  let litCount = 0;
  let musicReady = false;
  let meteorDone = false;
  let rafStars = 0;

  document.body.classList.add("intro-mode");

  /* ---------- 花瓣 ---------- */
  function spawnPetals(container, count) {
    if (!container) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = container === finalePetals ? "finale-petal" : "petal";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 7 + Math.random() * 7 + "s";
      p.style.animationDelay = Math.random() * 6 + "s";
      p.style.width = 7 + Math.random() * 7 + "px";
      p.style.height = 10 + Math.random() * 8 + "px";
      frag.appendChild(p);
    }
    container.appendChild(frag);
  }

  spawnPetals(petalsEl, 14);

  /* ---------- 背景星空 canvas ---------- */
  const ctx = starsCanvas ? starsCanvas.getContext("2d") : null;
  const bgStars = [];

  function resizeCanvas() {
    if (!starsCanvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    starsCanvas.width = window.innerWidth * dpr;
    starsCanvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initBgStars() {
    bgStars.length = 0;
    const n = 80;
    for (let i = 0; i < n; i++) {
      bgStars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.72,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random(),
        s: 0.004 + Math.random() * 0.01,
      });
    }
  }

  function drawBgStars(t) {
    if (!ctx || !starsCanvas) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const s of bgStars) {
      const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(t * s.s + s.a * 10));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(242, 233, 216, ${twinkle})`;
      ctx.fill();
    }
    rafStars = requestAnimationFrame(drawBgStars);
  }

  resizeCanvas();
  initBgStars();
  window.addEventListener("resize", function () {
    resizeCanvas();
    initBgStars();
  });

  /* ---------- 昼夜滚动 ---------- */
  function setPhaseVars(phase) {
    const doc = document.documentElement;
    doc.style.setProperty("--phase", String(phase));
    const dusk = Math.max(0, 1 - Math.abs(phase - 0.55) * 2.8);
    doc.style.setProperty("--dusk-opacity", String(dusk));
    document.body.classList.toggle("is-night", phase > 0.48);
  }

  function updatePhase() {
    if (!opened) {
      setPhaseVars(0.08);
      return;
    }
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    // 旅程从日间缓入夜间
    const phase = 0.12 + p * 0.88;
    setPhaseVars(phase);

    const theme = phase > 0.55 ? "#0c1228" : phase > 0.35 ? "#c07090" : "#7EB8C9";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme);

    // 终章花瓣
    if (finale) {
      const rect = finale.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.65;
      if (inView && finalePetals && !finalePetals.classList.contains("is-active")) {
        spawnPetals(finalePetals, 18);
        finalePetals.classList.add("is-active");
      }
    }
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updatePhase();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  /* ---------- 拆信封 ---------- */
  function openJourney() {
    if (opened) return;
    opened = true;
    envelope.classList.add("is-opening");
    // iOS：必须在用户手势里启动音频
    startMusic();

    window.setTimeout(function () {
      intro.classList.add("is-leaving");
      window.setTimeout(function () {
        intro.hidden = true;
        document.body.classList.remove("intro-mode");
        journey.hidden = false;
        journey.classList.add("is-visible");
        updatePhase();
        rafStars = requestAnimationFrame(drawBgStars);
        startHeartScene();
        // 拆信封后立刻落到爱心屏（避免停在空白处）
        jumpToHeart();
      }, 650);
    }, 900);
  }

  envelope.addEventListener("click", openJourney);
  envelope.addEventListener(
    "touchend",
    function (e) {
      e.preventDefault();
      openJourney();
    },
    { passive: false }
  );

  /* ---------- 点星：背景可点大星点 ---------- */
  function ensureStarGradient() {
    if (document.getElementById("starMetalDefs")) return;
    var wrap = document.createElement("div");
    wrap.id = "starMetalDefs";
    wrap.setAttribute("aria-hidden", "true");
    wrap.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;";
    wrap.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg">' +
      "<defs>" +
      '<linearGradient id="starMetal" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#ffffff"/>' +
      '<stop offset="35%" stop-color="#fff3c8"/>' +
      '<stop offset="70%" stop-color="#f0c878"/>' +
      '<stop offset="100%" stop-color="#d4a04a"/>' +
      "</linearGradient>" +
      '<radialGradient id="starGlow" cx="35%" cy="30%" r="70%">' +
      '<stop offset="0%" stop-color="#ffffff"/>' +
      '<stop offset="45%" stop-color="#ffe9a8"/>' +
      '<stop offset="100%" stop-color="#e8b860"/>' +
      "</radialGradient>" +
      "</defs></svg>";
    document.body.appendChild(wrap);
  }

  function buildWishStars() {
    if (!wishStars) return;
    ensureStarGradient();
    wishStars.innerHTML = "";
    WISHES.forEach(function (pair, i) {
      var pos = STAR_TAPS[i] || STAR_TAPS[0];
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sky-tap";
      btn.setAttribute("aria-label", "点亮：" + pair.zh + " / " + pair.en);
      btn.dataset.zh = pair.zh;
      btn.dataset.en = pair.en;
      btn.dataset.index = String(i);
      btn.style.left = pos.left + "%";
      btn.style.top = pos.top + "%";
      btn.innerHTML =
        '<span class="sky-tap-icon" aria-hidden="true">' +
        (STAR_ICONS[i] || STAR_ICONS[0]) +
        "</span>" +
        '<span class="sky-tap-wave" aria-hidden="true"></span>' +
        '<span class="sky-tap-wave delay" aria-hidden="true"></span>';
      btn.addEventListener("click", onStarTap);
      wishStars.appendChild(btn);
    });
  }

  function spawnSkyWord(zh, en, nearBtn) {
    var layer = starWords || (starStop && starStop.querySelector(".star-words"));
    if (!layer) return;

    var el = document.createElement("span");
    el.className = "sky-word";
    el.innerHTML =
      '<span class="sky-zh">' +
      zh +
      '</span><span class="sky-en">' +
      en +
      "</span>";

    var left = 50;
    var top = 40;
    if (nearBtn) {
      left = parseFloat(nearBtn.style.left) || 50;
      top = parseFloat(nearBtn.style.top) || 40;
      // 词语出现在星点旁，避免挡住下一颗星
      left = Math.max(4, Math.min(78, left + (left < 50 ? 6 : -18)));
      top = Math.max(6, Math.min(78, top - 6));
    }

    el.style.left = left + "%";
    el.style.top = top + "%";
    el.style.setProperty("--drift", (Math.random() * 8 - 4) + "px");
    el.style.setProperty("--rise", -(8 + Math.random() * 10) + "px");

    layer.appendChild(el);
    window.setTimeout(function () {
      el.classList.add("is-show");
    }, 20);
  }

  function onStarTap(e) {
    var btn = e.currentTarget;
    if (btn.classList.contains("is-lit")) return;
    btn.classList.add("is-lit");
    litCount += 1;

    var zh = btn.dataset.zh;
    var en = btn.dataset.en;
    spawnSkyWord(zh, en, btn);

    if (litCount >= WISHES.length) {
      if (starTitle) {
        starTitle.textContent = "你是我夜空中最亮的星";
        starTitle.classList.remove("is-complete");
        void starTitle.offsetWidth;
        starTitle.classList.add("is-complete");
      }
      if (starTitleEn) {
        starTitleEn.hidden = false;
        starTitleEn.classList.remove("is-show");
        window.requestAnimationFrame(function () {
          starTitleEn.classList.add("is-show");
        });
      }
      if (starHint) starHint.textContent = "十二颗星都亮了 —— 继续向下";
      shootMeteor();
      startMeteorShower();
      // 中央文案出现 1 秒后，淡出词语与星点，只留中间一句（仍可下滑）
      window.setTimeout(function () {
        if (starStop) starStop.classList.add("is-star-focus");
      }, 1000);
    } else if (starHint) {
      starHint.textContent = "已点亮 " + litCount + " / " + WISHES.length;
    }
  }

  function shootMeteor() {
    if (meteorDone || !meteor) return;
    meteorDone = true;
    meteor.classList.remove("is-shooting");
    void meteor.offsetWidth;
    meteor.classList.add("is-shooting");
  }

  function startMeteorShower() {
    var layer = document.getElementById("meteorShower");
    if (!layer || layer.dataset.ready === "1") return;
    layer.dataset.ready = "1";
    layer.innerHTML = "";
    // 布满整屏：从右上到左下多条轨迹
    for (var i = 0; i < 36; i++) {
      var s = document.createElement("span");
      s.style.left = -5 + Math.random() * 120 + "%";
      s.style.top = -25 + Math.random() * 90 + "%";
      s.style.width = 100 + Math.random() * 160 + "px";
      s.style.height = 1.5 + Math.random() * 1.5 + "px";
      s.style.animationDuration = 2.2 + Math.random() * 3.2 + "s";
      s.style.animationDelay = Math.random() * 4.5 + "s";
      layer.appendChild(s);
    }
    layer.classList.add("is-on");
  }

  buildWishStars();

  /* ---------- 照片入场 ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".photo-frame").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".photo-frame").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ---------- 音乐 ---------- */
  let audioMissing = false;
  const TRACK_MAIN = "assets/audio/才二十三.mp3";
  const TRACK_BDAY = "assets/audio/happy-birthday.mp3";
  let currentTrackSrc = TRACK_MAIN;
  let giftMusicOn = false;

  function setPlayingUI(playing) {
    musicBtn.classList.toggle("is-playing", playing);
    musicBtn.setAttribute("aria-label", playing ? "暂停音乐" : "播放音乐");
    if (audioMissing) {
      musicBtn.querySelector(".music-label").textContent = "无音频";
      playCta.querySelector("span").textContent = "请放入 才二十三.mp3";
      return;
    }
    musicBtn.querySelector(".music-label").textContent = playing ? "播放中" : "音乐";
    playCta.classList.toggle("is-playing", playing);
    if (giftMusicOn) {
      playCta.querySelector("span").textContent = playing
        ? "正在播放生日歌"
        : "播放生日歌";
    } else {
      playCta.querySelector("span").textContent = playing
        ? "正在播放 才二十三"
        : "播放 才二十三";
    }
  }

  async function switchMusic(src, opts) {
    opts = opts || {};
    if (!bgMusic || audioMissing) return false;
    var forcePlay = !!opts.forcePlay;
    var keepPaused = !!opts.keepPaused;
    var needReload = currentTrackSrc !== src;
    currentTrackSrc = src;
    try {
      if (needReload) {
        bgMusic.pause();
        var source = bgMusic.querySelector("source");
        if (source) source.setAttribute("src", src);
        bgMusic.src = src;
        bgMusic.load();
      }
      bgMusic.volume = 0.85;
      if (!keepPaused && (forcePlay || !bgMusic.paused || needReload)) {
        await bgMusic.play();
        musicReady = true;
        setPlayingUI(true);
      } else if (bgMusic.paused) {
        setPlayingUI(false);
      } else {
        setPlayingUI(true);
      }
      return true;
    } catch (err) {
      console.warn("Audio switch failed:", err);
      return false;
    }
  }

  async function startMusic() {
    if (!bgMusic || audioMissing) return false;
    try {
      bgMusic.volume = 0.85;
      if (bgMusic.paused) {
        await bgMusic.play();
      }
      musicReady = true;
      setPlayingUI(true);
      return true;
    } catch (err) {
      console.warn("Audio play failed:", err);
      return false;
    }
  }

  async function toggleMusic() {
    if (!bgMusic) return;
    if (audioMissing) {
      setPlayingUI(false);
      return;
    }
    try {
      if (bgMusic.paused) {
        await startMusic();
      } else {
        bgMusic.pause();
        setPlayingUI(false);
      }
    } catch (err) {
      audioMissing = true;
      setPlayingUI(false);
      console.warn("Audio play failed:", err);
    }
  }

  musicBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMusic();
  });
  playCta.addEventListener("click", toggleMusic);

  bgMusic.addEventListener("ended", function () {
    setPlayingUI(false);
  });
  bgMusic.addEventListener("pause", function () {
    if (!bgMusic.ended) setPlayingUI(false);
  });
  bgMusic.addEventListener("play", function () {
    setPlayingUI(true);
  });
  bgMusic.addEventListener("error", function () {
    audioMissing = true;
    setPlayingUI(false);
  });

  // 进页即尝试自动播放（桌面/部分安卓可用；iOS 通常会拦，拆信封时会再启）
  startMusic();
  document.addEventListener(
    "visibilitychange",
    function () {
      if (!document.hidden && musicReady && bgMusic.paused && !audioMissing) {
        startMusic();
      }
    },
    false
  );

  /* ---------- 照片：jpg 缺失时回退 svg 占位 ---------- */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function onErr() {
      img.removeEventListener("error", onErr);
      const fb = img.getAttribute("data-fallback");
      if (fb && img.src.indexOf(fb) === -1) {
        img.src = fb;
      } else {
        img.classList.add("missing");
      }
    });
  });

  /* ---------- 启程页：文档同款动态粒子爱心 + 底部烟花 ---------- */
  const HEART_COLOR = "#fd708f";
  const CANVAS_SIZE = 640;
  const CANVAS_CENTER = CANVAS_SIZE / 2;
  const IMAGE_ENLARGE = 11;

  const fxCanvas = document.getElementById("fxCanvas");
  const heartCanvas = document.getElementById("heartCanvas");
  const heartHit = document.getElementById("heartHit");
  const heartLove = document.getElementById("heartLove");
  const heartHint = document.getElementById("heartHint");
  const startStop = document.getElementById("startStop");
  const fxCtx = fxCanvas ? fxCanvas.getContext("2d", { alpha: true }) : null;
  const heartCtx = heartCanvas ? heartCanvas.getContext("2d", { alpha: true }) : null;

  const FX_COLORS = ["#fd708f", "#ff9bb0", "#ffd0e0", "#fff0f4", "#ffc8a0"];
  const FOCAL = 420;
  const particles = [];
  let fxRaf = 0;
  let heartTimer = 0;
  let sceneActive = false;
  let fxVisible = true;
  let fxBurstTimer = 0;
  let fxW = 0;
  let fxH = 0;
  let heartShown = false;
  let heartEngine = null;
  let renderFrame = 0;

  function heartFunction(t, shrinkRatio) {
    shrinkRatio = shrinkRatio == null ? IMAGE_ENLARGE : shrinkRatio;
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = -(
      15 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );
    x = x * shrinkRatio + CANVAS_CENTER;
    y = y * shrinkRatio + CANVAS_CENTER;
    return [x, y];
  }

  function scatterInside(x, y, beta) {
    beta = beta == null ? 0.15 : beta;
    const ratioX = -beta * Math.log(Math.random() || 0.0001);
    const ratioY = -beta * Math.log(Math.random() || 0.0001);
    const dx = ratioX * (x - CANVAS_CENTER);
    const dy = ratioY * (y - CANVAS_CENTER);
    return [x - dx, y - dy];
  }

  function shrinkPoint(x, y, ratio) {
    const dist = Math.pow(
      Math.pow(x - CANVAS_CENTER, 2) + Math.pow(y - CANVAS_CENTER, 2),
      0.6
    );
    const force = -1 / Math.max(dist, 0.001);
    const dx = ratio * force * (x - CANVAS_CENTER);
    const dy = ratio * force * (y - CANVAS_CENTER);
    return [x - dx, y - dy];
  }

  function curve(p) {
    return (2 * (2 * Math.sin(4 * p))) / (2 * Math.PI);
  }

  function calcPosition(x, y, ratio) {
    const dist = Math.pow(
      Math.pow(x - CANVAS_CENTER, 2) + Math.pow(y - CANVAS_CENTER, 2),
      0.52
    );
    const force = 1 / Math.max(dist, 0.001);
    const dx = ratio * force * (x - CANVAS_CENTER) + (Math.random() * 4 - 2);
    const dy = ratio * force * (y - CANVAS_CENTER) + (Math.random() * 4 - 2);
    return [x - dx, y - dy];
  }

  function createHeart(generateFrame) {
    generateFrame = generateFrame || 20;
    const points = [];
    const edgeDiffusion = [];
    const centerDiffusion = [];
    const allPoints = {};

    // 轮廓
    for (let i = 0; i < 1600; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = heartFunction(t);
      points.push(p);
    }
    // 边缘扩散
    for (let i = 0; i < points.length; i++) {
      for (let k = 0; k < 3; k++) {
        edgeDiffusion.push(scatterInside(points[i][0], points[i][1], 0.3));
      }
    }
    // 内部填充
    for (let i = 0; i < 3200; i++) {
      const src = points[(Math.random() * points.length) | 0];
      centerDiffusion.push(scatterInside(src[0], src[1], 0.2));
    }

    function calc(frame) {
      const ratio = 15 * curve((frame / 15) * Math.PI);
      const haloRadius = (4 + 6 * (1 + curve((frame / 15) * Math.PI))) | 0;
      const haloNumber =
        (1800 + 2200 * Math.abs(Math.pow(curve((frame / 15) * Math.PI), 2))) | 0;
      const framePoints = [];
      const haloSet = {};

      for (let i = 0; i < haloNumber; i++) {
        const t = Math.random() * Math.PI * 2;
        let hp = heartFunction(t, 11.5);
        hp = shrinkPoint(hp[0], hp[1], haloRadius);
        const key = (hp[0] | 0) + "," + (hp[1] | 0);
        if (!haloSet[key]) {
          haloSet[key] = true;
          const x = hp[0] + ((Math.random() * 33) | 0) - 16;
          const y = hp[1] + ((Math.random() * 33) | 0) - 16;
          const size = Math.random() > 0.66 ? 1 : 2;
          framePoints.push(x, y, size);
        }
      }

      for (let i = 0; i < points.length; i++) {
        const p = calcPosition(points[i][0], points[i][1], ratio);
        framePoints.push(p[0], p[1], 1 + ((Math.random() * 2) | 0));
      }
      for (let i = 0; i < edgeDiffusion.length; i++) {
        const p = calcPosition(edgeDiffusion[i][0], edgeDiffusion[i][1], ratio);
        framePoints.push(p[0], p[1], 1 + ((Math.random() * 2) | 0));
      }
      for (let i = 0; i < centerDiffusion.length; i++) {
        const p = centerDiffusion[i];
        framePoints.push(p[0], p[1], 1 + ((Math.random() * 2) | 0));
      }

      allPoints[frame] = framePoints;
    }

    for (let f = 0; f < generateFrame; f++) calc(f);

    return {
      generateFrame: generateFrame,
      allPoints: allPoints,
      render: function (ctx, frame) {
        const data = allPoints[frame % generateFrame];
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.fillStyle = HEART_COLOR;
        for (let i = 0; i < data.length; i += 3) {
          const x = data[i];
          const y = data[i + 1];
          const size = data[i + 2];
          ctx.fillRect(x, y, size, size);
        }
      },
    };
  }

  function drawHeartFrame() {
    if (!sceneActive || !heartCtx || !heartEngine) return;
    if (fxVisible) {
      heartEngine.render(heartCtx, renderFrame);
      renderFrame += 1;
    }
    heartTimer = window.setTimeout(drawHeartFrame, 160);
  }

  function resizeFx() {
    if (!fxCanvas || !startStop) return;
    const rect = startStop.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    fxW = Math.max(1, Math.floor(rect.width));
    fxH = Math.max(1, Math.floor(rect.height || window.innerHeight));
    fxCanvas.width = fxW * dpr;
    fxCanvas.height = fxH * dpr;
    fxCanvas.style.width = fxW + "px";
    fxCanvas.style.height = fxH + "px";
    if (fxCtx) fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function projectFx(p) {
    const scale = FOCAL / (FOCAL + p.z);
    return {
      x: fxW * 0.5 + p.x * scale,
      y: fxH * 0.55 + p.y * scale,
      s: scale,
    };
  }

  function spawnBurst(ox, oy, oz, power) {
    const color = FX_COLORS[(Math.random() * FX_COLORS.length) | 0];
    const count = 42 + ((Math.random() * 28) | 0);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = (1.8 + Math.random() * 3.2) * power;
      particles.push({
        x: ox,
        y: oy,
        z: oz,
        vx: Math.sin(phi) * Math.cos(theta) * speed,
        vy: Math.sin(phi) * Math.sin(theta) * speed * 0.75 - 0.35,
        vz: Math.cos(phi) * speed,
        life: 1,
        decay: 0.014 + Math.random() * 0.018,
        size: 1.2 + Math.random() * 2.2,
        color: color,
      });
    }
  }

  function launchFirework() {
    spawnBurst(
      (Math.random() - 0.5) * fxW * 0.55,
      -30 - Math.random() * 70,
      Math.random() * 100,
      0.9 + Math.random() * 0.35
    );
  }

  function tickFx(now) {
    if (!sceneActive || !fxCtx) return;
    fxRaf = requestAnimationFrame(tickFx);
    if (!fxVisible) {
      fxCtx.clearRect(0, 0, fxW, fxH);
      return;
    }
    fxCtx.clearRect(0, 0, fxW, fxH);
    fxCtx.globalCompositeOperation = "lighter";
    if (
      particles.length < 200 &&
      (!fxBurstTimer || now - fxBurstTimer > 900)
    ) {
      fxBurstTimer = now;
      launchFirework();
      if (Math.random() > 0.45) {
        window.setTimeout(function () {
          if (sceneActive && fxVisible) launchFirework();
        }, 220);
      }
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      p.vy += 0.048;
      p.life -= p.decay;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      const scr = projectFx(p);
      fxCtx.globalAlpha = Math.max(0, p.life);
      fxCtx.fillStyle = p.color;
      fxCtx.beginPath();
      fxCtx.arc(scr.x, scr.y, Math.max(0.5, p.size * scr.s), 0, Math.PI * 2);
      fxCtx.fill();
    }
    fxCtx.globalAlpha = 1;
    fxCtx.globalCompositeOperation = "source-over";
  }

  function revealLove() {
    heartLove.classList.add("is-show");
    if (heartHint) heartHint.classList.add("is-hide");
    heartHit.classList.remove("is-pulse");
    void heartHit.offsetWidth;
    heartHit.classList.add("is-pulse");
    heartShown = true;
  }

  function jumpToHeart() {
    window.scrollTo(0, 0);
    if (startStop && startStop.scrollIntoView) {
      startStop.scrollIntoView({ behavior: "auto", block: "start" });
    }
    // 再保险一次：下一帧强制回顶，避免开场动画把滚动位置带偏
    requestAnimationFrame(function () {
      window.scrollTo(0, 0);
      if (startStop) startStop.scrollIntoView({ behavior: "auto", block: "start" });
    });
    window.setTimeout(function () {
      window.scrollTo(0, 0);
    }, 50);
  }

  function startHeartScene() {
    if (!heartCanvas || !heartCtx || sceneActive) return;
    sceneActive = true;
    fxVisible = true;
    heartCanvas.width = CANVAS_SIZE;
    heartCanvas.height = CANVAS_SIZE;
    // 透明底，透出原来的海岸天空
    heartCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    heartEngine = createHeart(20);
    renderFrame = 0;
    drawHeartFrame();

    resizeFx();
    particles.length = 0;
    launchFirework();
    window.setTimeout(launchFirework, 280);
    window.setTimeout(launchFirework, 560);
    fxBurstTimer = performance.now();
    fxRaf = requestAnimationFrame(tickFx);

    if (heartHit) heartHit.addEventListener("click", revealLove);

    if ("IntersectionObserver" in window && startStop) {
      const io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            fxVisible = entry.isIntersecting && entry.intersectionRatio > 0.12;
          });
        },
        { threshold: [0, 0.12, 0.4] }
      );
      io.observe(startStop);
    }

    window.addEventListener("resize", resizeFx, { passive: true });
  }

  /* ---------- 生日吹蜡烛 · 5 环节礼物流程 ---------- */
  const giftModal = document.getElementById("giftModal");
  const giftOpenBtn = document.getElementById("giftOpenBtn");
  const giftPetals = document.getElementById("giftPetals");
  const giftConfetti = document.getElementById("giftConfetti");
  const cakeWrap = document.getElementById("cakeWrap");
  const blowFill = document.getElementById("blowFill");
  const blowWave = document.getElementById("blowWave");
  const blowRipples = document.getElementById("blowRipples");
  const blowHint = document.getElementById("blowHint");
  const treasureBox = document.getElementById("treasureBox");
  const giftCard = document.getElementById("giftCard");
  const giftGallery = document.getElementById("giftGallery");
  const candle2 = document.getElementById("candle2");
  const flame2 = document.getElementById("flame2");

  let giftStep = 1;
  let blowProgress = 0;
  let blowing = false;
  let blowDone = false;
  let blowRaf = 0;
  let currentTrack = "";

  // 快递详情：优先快递100（可直达物流轨迹）；并附带菜鸟裹裹查件入口
  function buildTrackUrls(mailNo) {
    var no = encodeURIComponent(mailNo);
    return {
      detail: "https://m.kuaidi100.com/result.jsp?nu=" + no,
      guoguo: "https://m.guoguo-app.com/guoguowap/default.html",
    };
  }

  function getGiftIndex() {
    if (!giftGallery) return 0;
    var items = giftGallery.querySelectorAll(".gift-item");
    if (!items.length) return 0;
    var step = Math.max(items[0].offsetWidth + 12, 1);
    return Math.max(
      0,
      Math.min(items.length - 1, Math.round(giftGallery.scrollLeft / step))
    );
  }

  function syncGiftUI() {
    if (!giftGallery) return;
    var items = giftGallery.querySelectorAll(".gift-item");
    var idx = getGiftIndex();
    var giftDots = document.getElementById("giftDots");
    var giftPrev = document.getElementById("giftPrev");
    var giftNext = document.getElementById("giftNext");
    if (giftDots) {
      giftDots.querySelectorAll("span").forEach(function (dot, i) {
        dot.classList.toggle("is-on", i === idx);
      });
    }
    if (giftPrev) giftPrev.disabled = idx <= 0;
    if (giftNext) giftNext.disabled = idx >= items.length - 1;
    items.forEach(function (el, i) {
      el.classList.toggle("is-active", i === idx);
      if (i !== idx) el.classList.remove("is-flipped");
    });
    var cur = items[idx];
    if (cur) currentTrack = cur.getAttribute("data-track") || "";
  }

  function scrollGiftBy(delta) {
    if (!giftGallery) return;
    var items = giftGallery.querySelectorAll(".gift-item");
    if (!items.length) return;
    var next = Math.max(0, Math.min(items.length - 1, getGiftIndex() + delta));
    var gap = 12;
    var left = next * (items[0].offsetWidth + gap);
    if (giftGallery.scrollTo) {
      giftGallery.scrollTo({ left: left, behavior: "smooth" });
    } else {
      giftGallery.scrollLeft = left;
    }
  }

  async function copyTrack(btn) {
    if (!currentTrack) return;
    var ok = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentTrack);
        ok = true;
      }
    } catch (err) {
      ok = false;
    }
    if (!ok) {
      var ta = document.createElement("textarea");
      ta.value = currentTrack;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(ta);
    }
    if (btn) {
      btn.textContent = ok ? "已复制" : "复制失败，请长按单号";
      btn.classList.toggle("is-copied", ok);
      window.setTimeout(function () {
        btn.textContent = "复制单号";
        btn.classList.remove("is-copied");
      }, 1600);
    }
  }

  if (giftGallery) {
    giftGallery.addEventListener("click", function (e) {
      var front = e.target.closest(".gift-flip-front");
      if (front) {
        var item = front.closest(".gift-item");
        if (!item) return;
        item.classList.toggle("is-flipped");
        currentTrack = item.getAttribute("data-track") || "";
        return;
      }
      var backOnly = e.target.closest(".gift-flip-back-btn");
      if (backOnly) {
        var backItem = backOnly.closest(".gift-item");
        if (backItem) backItem.classList.remove("is-flipped");
        return;
      }
      var copyBtn = e.target.closest(".track-copy");
      if (copyBtn) {
        e.preventDefault();
        currentTrack =
          copyBtn.getAttribute("data-track") ||
          (copyBtn.closest(".gift-item") &&
            copyBtn.closest(".gift-item").getAttribute("data-track")) ||
          "";
        copyTrack(copyBtn);
      }
    });

    giftGallery.addEventListener("scroll", syncGiftUI, { passive: true });
  }

  var giftPrevBtn = document.getElementById("giftPrev");
  var giftNextBtn = document.getElementById("giftNext");
  if (giftPrevBtn) giftPrevBtn.addEventListener("click", function () { scrollGiftBy(-1); });
  if (giftNextBtn) giftNextBtn.addEventListener("click", function () { scrollGiftBy(1); });

  // 默认选中第一件礼物单号
  currentTrack = "313082364457335";
  syncGiftUI();

  function spawnGiftPetals(count) {
    if (!giftPetals) return;
    giftPetals.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "gift-petal";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 6 + Math.random() * 7 + "s";
      p.style.animationDelay = Math.random() * 4 + "s";
      giftPetals.appendChild(p);
    }
  }

  function burstConfetti() {
    if (!giftConfetti) return;
    giftConfetti.innerHTML = "";
    const colors = ["#f0d48a", "#fd708f", "#c48ad0", "#ffe9b8", "#7cf0ff", "#e04555"];
    for (let i = 0; i < 42; i++) {
      const s = document.createElement("span");
      s.className = "gift-spark";
      s.style.left = 40 + Math.random() * 20 + "%";
      s.style.top = 42 + Math.random() * 10 + "%";
      s.style.background = colors[i % colors.length];
      s.style.setProperty("--dx", (Math.random() - 0.5) * 260 + "px");
      s.style.setProperty("--dy", -80 - Math.random() * 220 + "px");
      s.style.animationDelay = Math.random() * 0.2 + "s";
      giftConfetti.appendChild(s);
    }
  }

  function buildBlowWave() {
    if (!blowWave) return;
    blowWave.innerHTML = "";
    for (let i = 0; i < 18; i++) {
      blowWave.appendChild(document.createElement("span"));
    }
  }

  function setGiftStep(step) {
    giftStep = step;
    document.querySelectorAll(".gift-step").forEach(function (el) {
      el.classList.toggle("is-active", Number(el.getAttribute("data-step")) === step);
    });
    if (step === 2) {
      var wishStar = document.getElementById("wishStar");
      if (wishStar) {
        wishStar.classList.remove("is-glow");
        void wishStar.offsetWidth;
        wishStar.classList.add("is-glow");
      }
    }
    if (step === 3) {
      blowProgress = 0;
      blowDone = false;
      if (blowFill) blowFill.style.width = "0%";
      if (candle2) candle2.classList.add("is-lit");
      if (flame2) flame2.style.opacity = "1";
      if (blowHint) blowHint.textContent = "按住屏幕吹气";
    }
    if (step === 4) {
      burstConfetti();
      spawnGiftPetals(18);
    }
    if (step === 6 && giftCard) {
      giftCard.classList.remove("is-in");
      void giftCard.offsetWidth;
      giftCard.classList.add("is-in");
      if (giftGallery) {
        giftGallery.scrollLeft = 0;
      }
      window.setTimeout(syncGiftUI, 30);
    }
  }

  function openGiftModal() {
    if (!giftModal) return;
    giftModal.hidden = false;
    document.body.classList.add("gift-lock");
    giftMusicOn = true;
    switchMusic(TRACK_BDAY, { forcePlay: true });
    spawnGiftPetals(16);
    buildBlowWave();
    setGiftStep(1);
    if (cakeWrap) {
      cakeWrap.classList.remove("is-enter");
      void cakeWrap.offsetWidth;
      cakeWrap.classList.add("is-enter");
    }
  }

  function closeGiftModal() {
    if (!giftModal) return;
    giftModal.hidden = true;
    document.body.classList.remove("gift-lock");
    if (giftConfetti) giftConfetti.innerHTML = "";
    giftMusicOn = false;
    switchMusic(TRACK_MAIN, { forcePlay: true });
    openChatModal();
  }

  function openChatModal() {
    var chatModal = document.getElementById("chatModal");
    if (!chatModal) return;
    chatModal.hidden = false;
    document.body.classList.add("chat-lock");
    window.requestAnimationFrame(function () {
      chatModal.classList.add("is-show");
    });
  }

  function closeChatModal() {
    var chatModal = document.getElementById("chatModal");
    if (!chatModal) return;
    chatModal.classList.remove("is-show");
    document.body.classList.remove("chat-lock");
    window.setTimeout(function () {
      chatModal.hidden = true;
    }, 280);
  }

  function openWeChatChat() {
    // 唤起微信 App（手机端有效；浏览器可能拦截）
    try {
      window.location.href = "weixin://";
    } catch (err) {
      console.warn("Open WeChat failed:", err);
    }
    window.setTimeout(function () {
      var tip = document.getElementById("chatTip");
      if (tip && !document.hidden) tip.hidden = false;
    }, 900);
  }

  function tickBlow() {
    if (!blowing || blowDone || giftStep !== 3) return;
    blowProgress = Math.min(100, blowProgress + 1.35);
    if (blowFill) blowFill.style.width = blowProgress + "%";
    if (blowRipples) blowRipples.classList.add("is-on");
    if (blowProgress >= 100) {
      blowDone = true;
      blowing = false;
      if (blowRipples) blowRipples.classList.remove("is-on");
      if (candle2) {
        candle2.classList.remove("is-lit");
        candle2.classList.add("is-out");
      }
      if (flame2) flame2.style.opacity = "0";
      if (blowHint) blowHint.textContent = "蜡烛熄灭了…";
      window.setTimeout(function () {
        setGiftStep(4);
      }, 700);
      return;
    }
    blowRaf = requestAnimationFrame(tickBlow);
  }

  function startBlow() {
    if (giftStep !== 3 || blowDone) return;
    blowing = true;
    cancelAnimationFrame(blowRaf);
    blowRaf = requestAnimationFrame(tickBlow);
  }

  function stopBlow() {
    blowing = false;
    if (blowRipples) blowRipples.classList.remove("is-on");
  }

  if (giftOpenBtn) giftOpenBtn.addEventListener("click", openGiftModal);

  const btnStartWish = document.getElementById("btnStartWish");
  if (btnStartWish) {
    btnStartWish.addEventListener("click", function () {
      if (cakeWrap) {
        cakeWrap.classList.add("is-pop");
        window.setTimeout(function () {
          cakeWrap.classList.remove("is-pop");
        }, 450);
      }
      window.setTimeout(function () {
        setGiftStep(2);
      }, 280);
    });
  }

  const btnWishDone = document.getElementById("btnWishDone");
  if (btnWishDone) {
    btnWishDone.addEventListener("click", function () {
      var wishStar = document.getElementById("wishStar");
      if (wishStar) wishStar.classList.add("is-grant");
      window.setTimeout(function () {
        setGiftStep(3);
      }, 420);
    });
  }

  const btnClaimGift = document.getElementById("btnClaimGift");
  if (btnClaimGift) {
    btnClaimGift.addEventListener("click", function () {
      btnClaimGift.classList.add("is-glow");
      window.setTimeout(function () {
        setGiftStep(5);
      }, 350);
    });
  }

  const btnOpenGift = document.getElementById("btnOpenGift");
  if (btnOpenGift) {
    btnOpenGift.addEventListener("click", function () {
      if (treasureBox) treasureBox.classList.add("is-open");
      window.setTimeout(function () {
        setGiftStep(6);
      }, 650);
    });
  }

  const btnCloseGift = document.getElementById("btnCloseGift");
  if (btnCloseGift) btnCloseGift.addEventListener("click", closeGiftModal);

  const chatOpenBtn = document.getElementById("chatOpenBtn");
  if (chatOpenBtn) {
    chatOpenBtn.addEventListener("click", openWeChatChat);
  }
  const chatLaterBtn = document.getElementById("chatLaterBtn");
  if (chatLaterBtn) chatLaterBtn.addEventListener("click", closeChatModal);

  // 环节3：按住吹气（整框可操作）
  if (giftModal) {
    giftModal.addEventListener("pointerdown", function (e) {
      if (giftStep !== 3) return;
      if (e.target.closest(".gift-btn")) return;
      startBlow();
    });
    giftModal.addEventListener("pointerup", stopBlow);
    giftModal.addEventListener("pointercancel", stopBlow);
    giftModal.addEventListener("pointerleave", stopBlow);
  }

  /* 初始 phase */
  updatePhase();
})();
