const DATA_URL = '../data/repos.json';

let allRepos = [];
let languages = new Set();
let bookmarkedRepos = new Set();
let showBookmarksOnly = false;
let currentModalRepo = null;
let currentLang = 'zh';
let isLoading = true;
let filteredRepos = [];
let visibleStart = 0;
let visibleCount = 50;
const CARD_HEIGHT = 180;
const BUFFER = 5;

const LANG_ICONS = {
  'Python': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.48 2 6 4.24 6 6v2h6v1H5.5C3.02 9 2 10.02 2 12.5v1C2 15.98 3.02 17 5.5 17H6v2c0 1.76.48 4 6 4s6-2.24 6-4v-2h.5c2.48 0 3.5-1.02 3.5-3.5v-1c0-2.48-1.02-3.5-3.5-3.5H18V6c0-1.76-.48-4-6-4zm-2 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 4H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>`,
  'JavaScript': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 10l2 2 4-4"/></svg>`,
  'TypeScript': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V9h2.5c1.5 0 2.5.83 2.5 2.5s-1 2.5-2.5 2.5H9"/></svg>`,
  'Go': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
  'Rust': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg>`,
  'Java': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3h8l-1 9H9L8 3z"/><path d="M7 12c0-2 1.5-4 5-4s5 2 5 4-1.5 4-5 4-5-2-5-4z"/><path d="M9 21h6l-1-8h-4L9 21z"/></svg>`,
  'C++': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l-9 4.5v9L12 20l9-4.5v-9L12 2z"/><path d="M12 22V10"/><path d="M20 7.5L12 10 4 7.5"/></svg>`,
  'C': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h-4V6H8c-2.21 0-4 1.79-4 4v8c0 2.21 1.79 4 4 4h6v-2h-6c-1.1 0-2-.9-2-2v-2h2v-2h4v2h2V8z"/></svg>`,
  'C#': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"/></svg>`,
  'Ruby': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"/><path d="M12 22V12"/><path d="M3 7l9 5 9-5"/></svg>`,
  'PHP': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="12" rx="9" ry="5"/><path d="M4 10V8c0-2 1.5-3 4-3h8c2.5 0 4 1 4 3v2"/><path d="M4 14v2c0 2 1.5 3 4 3h8c2.5 0 4-1 4-3v-2"/></svg>`,
  'Swift': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4l8 16L20 4"/><path d="M4 4h16"/></svg>`,
  'Kotlin': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"/></svg>`,
  'Dart': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 20l7-16L19 4"/><path d="M5 20h14L12 12"/></svg>`,
  'Jupyter Notebook': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h4v4H7z"/><path d="M13 7h4"/><path d="M13 11h4"/><path d="M7 15h10"/></svg>`,
  'HTML': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 3l2 18 6-3 6 3 2-18H4z"/><path d="M8 8h8l-.5 5.5L12 15l-3.5-1.5L8 8z"/></svg>`,
  'CSS': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 3l2 18 6-3 6 3 2-18H4z"/><path d="M8 9l1 7 3-1.5 2 2.5H8"/></svg>`,
  'Shell': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 17l6-6-6-6"/><path d="M12 19h8"/></svg>`,
  'Unknown': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="4"/></svg>`
};

const I18N = {
  zh: {
    searchPlaceholder: '搜索项目名称或描述...',
    languageLabel: '语言',
    sortLabel: '排序',
    sortScore: '综合评分',
    sortStars: 'Stars',
    sortForks: 'Forks',
    sortToday: '今日增长',
    sortRising: '飙升指数',
    starsLabel: 'Stars ≥',
    forksLabel: 'Forks ≥',
    scoreLabel: '评分 ≥',
    resetBtn: '重置',
    myBookmarks: '我的收藏',
    exportBtn: '导出',
    repoCount: '个项目',
    totalStars: '总 Stars',
    langCount: '种语言',
    lastUpdated: '数据更新',
    noResults: '没有找到符合条件的项目',
    noBookmarks: '暂无收藏项目',
    loadError: '无法加载数据',
    fileProtocolTip: '当前通过 file:// 协议直接打开页面。请通过本地服务器访问：',
    runScraperTip: '请先在项目根目录运行',
    openInGithub: '在 GitHub 查看',
    copyUrl: '复制 URL',
    copied: '已复制',
    dataSource: '数据来源:',
    footerText: '评分算法 · Stars + Fork率 + 增长加速度',
    title: 'GitHub',
    titleMuted: '宝藏仓库',
    subtitle: '发现 2026 年优质项目 · 多维度智能筛选',
    bookmarkEmpty: '暂无收藏项目',
    topLanguages: '热门语言',
    scoreUnit: '评分',
    forkRatio: 'Fork率',
    compareTitle: '项目对比',
    compareSelect: '已选择',
    compareBtn: '对比',
    compareClear: '清空',
    compareVs: 'VS',
    discoverTreasure: '发现宝藏',
    smartRecommend: '智能推荐',
    savePreset: '保存预设',
    cloneCommand: 'Clone 命令',
    recommendTitle: '智能推荐',
    license: '许可证',
    licenseFull: '开源协议',
    keyboardHelp: '键盘快捷键',
    pressKey: '按',
    searchPreview: '搜索预览',
    active: '活跃',
    veryActive: '很活跃',
    stale: '不活跃',
    never: '从未更新',
    share: '分享',
    shareTo: '分享到',
    activityUpdated: '最近更新',
    activityNever: '无更新记录',
    copiedLink: '已复制链接',
    inspirationMode: '灵感模式',
    inspirationTitle: '灵感发现',
    inspirationDesc: '左右滑动探索宝藏项目',
    inspirationNext: '下一个',
    inspirationPrev: '上一个',
    inspirationBookmark: '收藏',
    inspirationOpen: '打开',
    inspirationSkip: '跳过',
    inspirationUndo: '撤销',
    inspirationRedo: '重做',
    inspirationAutoPlay: '自动播放',
    inspirationPause: '暂停',
    inspirationKeyboardHelp: '键盘快捷键'
  },
  en: {
    searchPlaceholder: 'Search projects...',
    languageLabel: 'Language',
    sortLabel: 'Sort',
    sortScore: 'Score',
    sortStars: 'Stars',
    sortForks: 'Forks',
    sortToday: 'Today',
    sortRising: 'Rising',
    starsLabel: 'Stars ≥',
    forksLabel: 'Forks ≥',
    scoreLabel: 'Score ≥',
    resetBtn: 'Reset',
    myBookmarks: 'Bookmarks',
    exportBtn: 'Export',
    repoCount: 'repos',
    totalStars: 'Total Stars',
    langCount: 'languages',
    lastUpdated: 'Updated',
    noResults: 'No matching projects',
    noBookmarks: 'No bookmarks yet',
    loadError: 'Failed to load data',
    fileProtocolTip: 'Currently opening via file://. Please serve via local server:',
    runScraperTip: 'Run first in project root',
    openInGithub: 'View on GitHub',
    copyUrl: 'Copy URL',
    copied: 'Copied!',
    dataSource: 'Source:',
    footerText: 'Score: Stars + Fork Rate + Growth',
    title: 'GitHub',
    titleMuted: 'Treasure',
    subtitle: 'Discover quality 2026 projects · Smart filtering',
    bookmarkEmpty: 'No bookmarks yet',
    topLanguages: 'Top Languages',
    scoreUnit: 'Score',
    forkRatio: 'Fork Rate',
    compareTitle: 'Compare Projects',
    compareSelect: 'Selected',
    compareBtn: 'Compare',
    compareClear: 'Clear',
    compareVs: 'VS',
    discoverTreasure: 'Discover',
    smartRecommend: 'Recommend',
    savePreset: 'Save Preset',
    cloneCommand: 'Clone Command',
    recommendTitle: 'Smart Recommendations',
    license: 'License',
    licenseFull: 'Open Source License',
    keyboardHelp: 'Keyboard Shortcuts',
    pressKey: 'Press',
    searchPreview: 'Search Preview',
    active: 'Active',
    veryActive: 'Very Active',
    stale: 'Stale',
    never: 'No updates',
    share: 'Share',
    shareTo: 'Share to',
    activityUpdated: 'Updated',
    activityNever: 'No update record',
    copiedLink: 'Link copied',
    inspirationMode: 'Inspiration Mode',
    inspirationTitle: 'Discover',
    inspirationDesc: 'Swipe left/right to explore treasures',
    inspirationNext: 'Next',
    inspirationPrev: 'Previous',
    inspirationBookmark: 'Bookmark',
    inspirationOpen: 'Open',
    inspirationSkip: 'Skip',
    inspirationUndo: 'Undo',
    inspirationRedo: 'Redo',
    inspirationAutoPlay: 'Auto-play',
    inspirationPause: 'Pause',
    inspirationKeyboardHelp: 'Keyboard Shortcuts'
  }
};

function t(key) {
  return I18N[currentLang][key] || key;
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.body.dataset.theme = theme;
}

function toggleTheme() {
  const current = document.body.dataset.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  localStorage.setItem('theme', next);
}

function initLanguage() {
  const saved = localStorage.getItem('language');
  currentLang = saved || 'zh';
  applyTranslations();
}

function toggleLanguage() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('language', currentLang);
  applyTranslations();
  applyTranslationsToUI();
}

function applyTranslations() {
  document.title = `${t('title')} ${t('titleMuted')}`;
}

function applyTranslationsToUI() {
  document.querySelector('.title').innerHTML = `${t('title')} <span class="title-muted">${t('titleMuted')}</span>`;
  document.querySelector('.subtitle').textContent = t('subtitle');
  document.querySelector('.footer p').textContent = t('footerText');

  document.getElementById('searchInput').placeholder = t('searchPlaceholder');
  document.querySelector('label[for="languageFilter"]').textContent = t('languageLabel');
  document.querySelector('label[for="sortFilter"]').textContent = t('sortLabel');

  const sortSelect = document.getElementById('sortFilter');
  sortSelect.options[0].text = t('sortScore');
  sortSelect.options[1].text = t('sortStars');
  sortSelect.options[2].text = t('sortForks');
  sortSelect.options[3].text = t('sortToday');

  document.querySelector('#starsRange').closest('.range-item').querySelector('label').innerHTML =
    `${t('starsLabel')} <span id="starsValue">${document.getElementById('starsValue').textContent}</span>`;
  document.querySelector('#forksRange').closest('.range-item').querySelector('label').innerHTML =
    `${t('forksLabel')} <span id="forksValue">${document.getElementById('forksValue').textContent}</span>`;
  document.querySelector('#scoreRange').closest('.range-item').querySelector('label').innerHTML =
    `${t('scoreLabel')} <span id="scoreValue">${document.getElementById('scoreValue').textContent}</span>`;
  document.getElementById('resetFilters').innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
    ${t('resetBtn')}
  `;

  document.getElementById('bookmarkToggle').innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
    ${t('myBookmarks')}
  `;

  const statsLabel = document.querySelectorAll('.stat-label');
  statsLabel[0].textContent = t('repoCount');
  statsLabel[1].textContent = t('totalStars');
  statsLabel[2].textContent = t('langCount');
  statsLabel[3].textContent = t('lastUpdated');

  const modalGithubLink = document.getElementById('modalGithubLink');
  if (modalGithubLink) modalGithubLink.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    ${t('openInGithub')}
  `;

  const langFilter = document.getElementById('languageFilter');
  if (langFilter) {
    const selected = langFilter.value;
    populateLanguageFilter();
    langFilter.value = selected;
  }

  if (showBookmarksOnly) {
    const grid = document.getElementById('repoGrid');
    if (grid.querySelector('.loading span')) {
      grid.innerHTML = `
        <div class="loading">
          <span style="color: var(--text-muted);">${t('noBookmarks')}</span>
        </div>
      `;
    }
  }
}

function loadBookmarks() {
  try {
    const saved = localStorage.getItem('bookmarkedRepos');
    if (saved) {
      bookmarkedRepos = new Set(JSON.parse(saved));
    }
  } catch (e) {
    bookmarkedRepos = new Set();
  }
}

function saveBookmarks() {
  localStorage.setItem('bookmarkedRepos', JSON.stringify([...bookmarkedRepos]));
}

function toggleBookmark(repoName, fromCard = false) {
  const wasBookmarked = bookmarkedRepos.has(repoName);
  if (wasBookmarked) {
    bookmarkedRepos.delete(repoName);
  } else {
    bookmarkedRepos.add(repoName);
  }
  saveBookmarks();
  updateBookmarkUI(repoName);

  if (!wasBookmarked && fromCard) {
    const card = document.querySelector(`.repo-card[data-repo="${repoName}"]`);
    if (card) {
      card.classList.add('bookmark-added');
      setTimeout(() => card.classList.remove('bookmark-added'), 600);
    }
  }

  if (showBookmarksOnly) {
    filterAndSort();
  }
}

function updateBookmarkUI(repoName) {
  document.querySelectorAll(`.card-bookmark[data-repo="${repoName}"]`).forEach(btn => {
    if (bookmarkedRepos.has(repoName)) {
      btn.classList.add('bookmarked');
    } else {
      btn.classList.remove('bookmarked');
    }
  });
  if (currentModalRepo && currentModalRepo.name === repoName) {
    const modalBtn = document.getElementById('modalBookmark');
    if (bookmarkedRepos.has(repoName)) {
      modalBtn.classList.add('bookmarked');
    } else {
      modalBtn.classList.remove('bookmarked');
    }
  }
}

function openModal(repo) {
  currentModalRepo = repo;
  const overlay = document.getElementById('modalOverlay');
  const icon = LANG_ICONS[repo.language] || LANG_ICONS['Unknown'];
  const [author, name] = repo.name.split('/');

  document.getElementById('modalIcon').innerHTML = icon;
  document.getElementById('modalTitle').textContent = name;
  document.getElementById('modalAuthor').textContent = author;
  document.getElementById('modalDesc').textContent = repo.description || (currentLang === 'zh' ? '暂无描述' : 'No description');

  const forkRatio = repo.stars > 0 ? ((repo.forks / repo.stars) * 100).toFixed(1) : '0';

  document.getElementById('modalStats').innerHTML = `
    <div class="modal-stat-item">
      <span class="value">${fmtNum(repo.stars)}</span>
      <span class="label">Stars</span>
    </div>
    <div class="modal-stat-item">
      <span class="value">${fmtNum(repo.forks)}</span>
      <span class="label">Forks</span>
    </div>
    <div class="modal-stat-item">
      <span class="value">${forkRatio}%</span>
      <span class="label">${t('forkRatio')}</span>
    </div>
    <div class="modal-stat-item">
      <span class="value">${fmtNum(repo.score)}</span>
      <span class="label">${t('scoreUnit')}</span>
    </div>
  `;

  document.getElementById('modalSource').textContent = `${t('dataSource')} ${repo.source || 'unknown'}`;
  document.getElementById('modalGithubLink').href = repo.url;

  const bookmarkBtn = document.getElementById('modalBookmark');
  if (bookmarkedRepos.has(repo.name)) {
    bookmarkBtn.classList.add('bookmarked');
  } else {
    bookmarkBtn.classList.remove('bookmarked');
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  currentModalRepo = null;
}

async function loadRepos(retryCount = 0) {
  const grid = document.getElementById('repoGrid');
  isLoading = true;
  renderSkeleton();

  const DATA_URLS = [DATA_URL, './data/repos.json', 'data/repos.json'];
  const MAX_RETRIES = 2;

  try {
    let response;
    for (const url of DATA_URLS) {
      try {
        response = await fetch(url);
        if (response.ok) break;
      } catch (e) {}
    }
    if (!response || !response.ok) throw new Error('Data file not found');
    const json = await response.json();

    allRepos = json.repos || [];
    isLoading = false;
    updateStats(json.fetched_at);
    extractLanguages();
    populateLanguageFilter();
    updateRangeMaxValues();
    filterAndSort();

  } catch (error) {
    // Retry with backoff
    if (retryCount < MAX_RETRIES) {
      const delay = (retryCount + 1) * 2000;
      setTimeout(() => loadRepos(retryCount + 1), delay);
      return;
    }

    isLoading = false;
    const isFileProtocol = window.location.protocol === 'file:';
    grid.innerHTML = `
      <div class="loading" style="flex-direction: column; gap: 10px;">
        <span style="color: var(--text-muted); font-size: 0.95rem; font-weight: 500;">${t('loadError')}</span>
        <span style="color: var(--text-muted); font-size: 0.8rem; max-width: 420px; text-align: center; line-height: 1.5;">
          ${isFileProtocol
            ? `${t('fileProtocolTip')}<br><code style="background: var(--bg-soft); padding: 2px 6px; border-radius: 4px;">cd web && python3 -m http.server 8000</code>`
            : `${t('runScraperTip')}<br><code style="background: var(--bg-soft); padding: 2px 6px; border-radius: 4px;">python3 scripts/scrape.py</code>`
          }
        </span>
        <button onclick="loadRepos(0)" style="margin-top: 8px; padding: 8px 20px; background: var(--text); color: var(--bg); border: none; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; font-family: var(--font-sans);">
          ${currentLang === 'zh' ? '重试' : 'Retry'}
        </button>
      </div>
    `;
  }
}

function renderSkeleton() {
  const grid = document.getElementById('repoGrid');
  grid.innerHTML = Array(6).fill(0).map(() => `
    <div class="repo-card skeleton">
      <div class="skeleton-header">
        <div class="skeleton-icon"></div>
        <div class="skeleton-info">
          <div class="skeleton-line" style="width: 60%"></div>
          <div class="skeleton-line" style="width: 40%"></div>
        </div>
      </div>
      <div class="skeleton-line" style="width: 100%"></div>
      <div class="skeleton-line" style="width: 80%"></div>
      <div class="skeleton-stats">
        <div class="skeleton-badge"></div>
        <div class="skeleton-badge"></div>
        <div class="skeleton-badge"></div>
      </div>
    </div>
  `).join('');
}

function updateStats(fetchedAt) {
  document.getElementById('repoCount').textContent = allRepos.length;
  document.getElementById('totalStars').textContent = fmtNum(
    allRepos.reduce((s, r) => s + r.stars, 0)
  );
  document.getElementById('langCount').textContent = new Set(allRepos.map(r => r.language)).size;
  document.getElementById('lastUpdated').textContent = fmtDate(fetchedAt);

  const freshnessEl = document.getElementById('dataFreshness');
  if (freshnessEl && fetchedAt) {
    const fetched = new Date(fetchedAt);
    const now = new Date();
    const hoursDiff = (now - fetched) / (1000 * 60 * 60);
    let freshnessText;
    if (hoursDiff < 1) {
      freshnessText = currentLang === 'zh' ? '刚刚更新' : 'Just updated';
    } else if (hoursDiff < 24) {
      freshnessText = currentLang === 'zh' ? `${Math.floor(hoursDiff)}小时前` : `${Math.floor(hoursDiff)}h ago`;
    } else {
      freshnessText = currentLang === 'zh' ? `${Math.floor(hoursDiff / 24)}天前` : `${Math.floor(hoursDiff / 24)}d ago`;
    }
    freshnessEl.textContent = freshnessText;
    freshnessEl.style.display = 'inline';
  }

  renderLangChart();
  renderTagCategories();
}

const TAG_KEYWORDS = {
  'AI/ML': ['ai', 'machine learning', 'deep learning', 'neural', 'gpt', 'llm', 'transformer', 'pytorch', 'tensorflow', 'nlp', 'computer vision'],
  'Web': ['web', 'react', 'vue', 'angular', 'svelte', 'nextjs', 'nuxt', 'frontend', 'ui', 'css', 'html'],
  'Backend': ['api', 'server', 'backend', 'rest', 'graphql', 'grpc', 'microservice', 'database'],
  'DevOps': ['docker', 'kubernetes', 'ci/cd', 'devops', 'deployment', 'container', 'orchestration'],
  'Tool': ['cli', 'tool', 'utility', 'wrapper', 'sdk', 'library', 'package'],
  'Blockchain': ['blockchain', 'crypto', 'web3', 'ethereum', 'solidity', 'nft'],
  'Mobile': ['mobile', 'ios', 'android', 'react native', 'flutter', 'swift', 'kotlin']
};

function getRepoTags(repo) {
  const tags = [];
  const text = ((repo.description || '') + ' ' + repo.name).toLowerCase();
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) {
      tags.push(tag);
    }
  }
  return tags.slice(0, 2);
}

function renderTagCategories() {
  const container = document.getElementById('tagCategories');
  if (!container) return;

  const tagCounts = {};
  allRepos.forEach(r => {
    const tags = getRepoTags(r);
    tags.forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const sorted = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  container.innerHTML = sorted.map(([tag, count]) => `
    <button class="tag-filter-btn" data-tag="${tag}">
      ${tag} <span class="tag-count">${count}</span>
    </button>
  `).join('');

  container.querySelectorAll('.tag-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;
      const currentSearch = document.getElementById('searchInput').value;
      document.getElementById('searchInput').value = currentSearch ? `${currentSearch} ${tag}` : tag;
      filterAndSort();
    });
  });
}

function renderLangChart() {
  const langCounts = {};
  allRepos.forEach(r => {
    if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
  });

  const sorted = Object.entries(langCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const total = allRepos.length;

  const existingChart = document.getElementById('langChart');
  if (existingChart) existingChart.remove();

  const chartHtml = `
    <div id="langChart" class="lang-chart">
      ${sorted.map(([lang, count]) => {
        const pct = ((count / total) * 100).toFixed(1);
        return `
          <div class="lang-bar-item">
            <span class="lang-bar-label">${lang}</span>
            <div class="lang-bar-track">
              <div class="lang-bar-fill" style="width: ${pct}%"></div>
            </div>
            <span class="lang-bar-pct">${pct}%</span>
          </div>
        `;
      }).join('')}
    </div>
  `;

  const statsBar = document.querySelector('.stats-bar');
  statsBar.insertAdjacentHTML('afterend', chartHtml);
}

const LICENSE_KEYWORDS = {
  'MIT': 'MIT',
  'Apache': 'Apache-2.0',
  'GPL': 'GPL',
  'BSD': 'BSD',
  'LGPL': 'LGPL',
  'ISC': 'ISC',
  'MIT': 'MIT',
  'Unlicense': 'Unlicense',
  'CC0': 'CC0-1.0'
};

function getLicense(repo) {
  const text = ((repo.description || '') + ' ' + repo.name).toUpperCase();
  for (const [license, keyword] of Object.entries(LICENSE_KEYWORDS)) {
    if (text.includes(keyword)) {
      return license;
    }
  }
  return null;
}

function getSparklinePath(starts, maxStars, width = 60, height = 20) {
  if (starts < 100) return '';
  const points = [];
  const days = 30;
  for (let i = 0; i < days; i++) {
    const x = (i / (days - 1)) * width;
    const decay = Math.exp(-i * 0.1);
    const noise = 0.8 + Math.random() * 0.4;
    const y = height - ((decay * starts / maxStars * height * noise));
    points.push(`${x},${Math.max(2, y)}`);
  }
  return `<polyline points="${points.join(' ')}" fill="none" stroke="var(--text-secondary)" stroke-width="1.5" opacity="0.5"/>`;
}

function getActivityLevel(repo) {
  const now = new Date();
  const pushedAt = repo.pushed_at ? new Date(repo.pushed_at) : null;

  if (!pushedAt) {
    return { level: 'never', label: t('activityNever'), color: 'var(--text-muted)' };
  }

  const daysSinceUpdate = Math.floor((now - pushedAt) / (1000 * 60 * 60 * 24));

  if (daysSinceUpdate <= 7) {
    return { level: 'veryActive', label: currentLang === 'zh' ? '7天内' : '7d', color: '#22c55e' };
  } else if (daysSinceUpdate <= 30) {
    return { level: 'active', label: currentLang === 'zh' ? '30天内' : '30d', color: '#84cc16' };
  } else if (daysSinceUpdate <= 90) {
    return { level: 'stale', label: currentLang === 'zh' ? '90天内' : '90d', color: '#f59e0b' };
  } else {
    return { level: 'stale', label: currentLang === 'zh' ? `${daysSinceUpdate}天前` : `${daysSinceUpdate}d`, color: '#ef4444' };
  }
}

function shareToTwitter(repo) {
  const text = encodeURIComponent(`发现宝藏项目: ${repo.name} - ${repo.description || ''}`);
  const url = encodeURIComponent(repo.url);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareToLinkedIn(repo) {
  const url = encodeURIComponent(repo.url);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function shareToCopyLink(repo) {
  navigator.clipboard.writeText(repo.url).then(() => {
    showToast(currentLang === 'zh' ? '已复制链接' : 'Link copied!');
  });
}

function showToast(message) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }, 10);
}

function showShareMenu(repo, btn) {
  const existing = document.getElementById('shareMenu');
  if (existing) existing.remove();

  const menu = document.createElement('div');
  menu.id = 'shareMenu';
  menu.className = 'share-menu';
  menu.innerHTML = `
    <div class="share-menu-item" data-action="twitter">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      Twitter/X
    </div>
    <div class="share-menu-item" data-action="linkedin">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.756v.5C0 3.08.792 4 .792 4h.615V20.45c0 .982.792 1.55 1.556 1.55h18.39c.764 0 1.556-.568 1.556-1.55V2.255c0-.982-.792-1.755-1.556-1.755h-.614V4h.614c1.385 0 2.081 1.016 2.081 2.063v18.43c0 1.047-.696 2.064-2.081 2.064h-.615V4h.615c.695 0 1.133.486 1.133 1.063v.5c0 .982-.438 1.756-1.133 1.756z"/></svg>
      LinkedIn
    </div>
    <div class="share-menu-item" data-action="copy">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      ${currentLang === 'zh' ? '复制链接' : 'Copy Link'}
    </div>
  `;

  const rect = btn.getBoundingClientRect();
  menu.style.top = `${rect.bottom + 8}px`;
  menu.style.left = `${rect.left}px`;

  document.body.appendChild(menu);

  menu.querySelectorAll('.share-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      if (action === 'twitter') shareToTwitter(repo);
      else if (action === 'linkedin') shareToLinkedIn(repo);
      else if (action === 'copy') shareToCopyLink(repo);
      menu.remove();
    });
  });

  setTimeout(() => {
    document.addEventListener('click', function handler(e) {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', handler);
      }
    });
  }, 10);
}

function renderSearchPreview() {
  const searchInput = document.getElementById('searchInput');
  const preview = document.getElementById('searchPreview');

  if (!searchInput || !preview) return;

  const query = searchInput.value.trim().toLowerCase();
  if (query.length < 2) {
    preview.style.display = 'none';
    return;
  }

  const matches = allRepos
    .filter(r =>
      r.name.toLowerCase().includes(query) ||
      (r.description && r.description.toLowerCase().includes(query))
    )
    .slice(0, 6);

  if (matches.length === 0) {
    preview.style.display = 'none';
    return;
  }

  preview.innerHTML = matches.map(r => {
    const icon = LANG_ICONS[r.language] || LANG_ICONS['Unknown'];
    return `
      <div class="preview-item" data-repo="${r.name}">
        <div class="preview-icon">${icon}</div>
        <div class="preview-info">
          <span class="preview-name">${r.name}</span>
          <span class="preview-desc">${(r.description || '').substring(0, 40)}...</span>
        </div>
        <span class="preview-stars">⭐ ${fmtNum(r.stars)}</span>
      </div>
    `;
  }).join('');

  preview.style.display = 'block';

  preview.querySelectorAll('.preview-item').forEach(item => {
    item.addEventListener('click', () => {
      const repoName = item.dataset.repo;
      const repo = allRepos.find(r => r.name === repoName);
      if (repo) {
        searchInput.value = query;
        closeSearchPreview();
        openModal(repo);
      }
    });
  });
}

function closeSearchPreview() {
  const preview = document.getElementById('searchPreview');
  if (preview) preview.style.display = 'none';
}

function showKeyboardHelp() {
  const overlay = document.getElementById('modalOverlay');
  document.getElementById('modalIcon').innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
    </svg>
  `;
  document.getElementById('modalTitle').textContent = t('keyboardHelp');
  document.getElementById('modalAuthor').textContent = '';
  document.getElementById('modalDesc').innerHTML = `
    <div class="keyboard-help">
      <div class="keyboard-section">
        <h4>${currentLang === 'zh' ? '导航' : 'Navigation'}</h4>
        <div class="keyboard-item"><kbd>↑↓←→</kbd> <span>${currentLang === 'zh' ? '选择卡片' : 'Select card'}</span></div>
        <div class="keyboard-item"><kbd>Enter</kbd> <span>${currentLang === 'zh' ? '打开详情' : 'Open details'}</span></div>
        <div class="keyboard-item"><kbd>Esc</kbd> <span>${currentLang === 'zh' ? '关闭弹窗' : 'Close modal'}</span></div>
      </div>
      <div class="keyboard-section">
        <h4>${currentLang === 'zh' ? '操作' : 'Actions'}</h4>
        <div class="keyboard-item"><kbd>Space</kbd> <span>${currentLang === 'zh' ? '收藏/取消' : 'Bookmark/Unbookmark'}</span></div>
        <div class="keyboard-item"><kbd>C</kbd> <span>${currentLang === 'zh' ? '加入对比' : 'Add to compare'}</span></div>
        <div class="keyboard-item"><kbd>/</kbd> <span>${currentLang === 'zh' ? '聚焦搜索' : 'Focus search'}</span></div>
      </div>
      <div class="keyboard-section">
        <h4>${currentLang === 'zh' ? '切换' : 'Toggles'}</h4>
        <div class="keyboard-item"><kbd>T</kbd> <span>${currentLang === 'zh' ? '切换主题' : 'Toggle theme'}</span></div>
        <div class="keyboard-item"><kbd>B</kbd> <span>${currentLang === 'zh' ? '书签视图' : 'Bookmark view'}</span></div>
        <div class="keyboard-item"><kbd>L</kbd> <span>${currentLang === 'zh' ? '切换语言' : 'Toggle language'}</span></div>
      </div>
    </div>
  `;
  document.getElementById('modalStats').innerHTML = '';
  document.getElementById('modalSource').textContent = '';
  document.getElementById('modalGithubLink').style.display = 'none';
  document.getElementById('modalCopyUrl').style.display = 'none';
  document.getElementById('modalBookmark').style.display = 'none';
  document.getElementById('cloneCommands').style.display = 'none';

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function extractLanguages() {
  languages = new Set(allRepos.map(r => r.language).filter(Boolean));
}

function populateLanguageFilter() {
  const select = document.getElementById('languageFilter');
  const allOption = currentLang === 'zh' ? '全部' : 'All';
  select.innerHTML = `<option value="">${allOption}</option>`;

  Array.from(languages).sort().forEach(lang => {
    const opt = document.createElement('option');
    opt.value = lang;
    opt.textContent = `${lang} (${allRepos.filter(r => r.language === lang).length})`;
    select.appendChild(opt);
  });
}

function updateRangeMaxValues() {
  const maxStars = Math.max(...allRepos.map(r => r.stars), 50000);
  const maxForks = Math.max(...allRepos.map(r => r.forks), 5000);
  const maxScore = Math.max(...allRepos.map(r => r.score), 200000);

  document.getElementById('starsRange').max = Math.ceil(maxStars / 1000) * 1000;
  document.getElementById('forksRange').max = Math.ceil(maxForks / 100) * 100;
  document.getElementById('scoreRange').max = Math.ceil(maxScore / 5000) * 5000;
}

function renderRepos(repos) {
  const grid = document.getElementById('repoGrid');

  if (repos.length === 0) {
    grid.innerHTML = `
      <div class="loading">
        <span style="color: var(--text-muted);">${showBookmarksOnly ? t('noBookmarks') : t('noResults')}</span>
      </div>
    `;
    return;
  }

  grid.innerHTML = repos.map((repo, i) => createCard(repo, i)).join('');
}

function renderVirtualRepos() {
  const grid = document.getElementById('repoGrid');
  const repos = filteredRepos;

  if (repos.length === 0) {
    grid.innerHTML = `
      <div class="loading">
        <span style="color: var(--text-muted);">${showBookmarksOnly ? t('noBookmarks') : t('noResults')}</span>
      </div>
    `;
    return;
  }

  const useVirtual = repos.length > 100;
  if (useVirtual) {
    const totalHeight = repos.length * CARD_HEIGHT;
    grid.style.height = `${totalHeight}px`;
    grid.innerHTML = repos.slice(visibleStart, visibleStart + visibleCount + BUFFER).map((repo, i) => createCard(repo, visibleStart + i)).join('');
    grid.style.position = 'relative';
    document.querySelectorAll('.repo-card').forEach((card, i) => {
      card.style.position = 'absolute';
      card.style.top = `${(visibleStart + i) * CARD_HEIGHT}px`;
      card.style.left = '0';
      card.style.right = '0';
    });
  } else {
    grid.style.height = 'auto';
    grid.innerHTML = repos.map((repo, i) => createCard(repo, i)).join('');
  }
}

function handleScroll() {
  if (filteredRepos.length <= 100) return;
  const grid = document.getElementById('repoGrid');
  const rect = grid.getBoundingClientRect();
  const scrollTop = -rect.top;
  const viewportHeight = window.innerHeight;
  const newVisibleStart = Math.max(0, Math.floor(scrollTop / CARD_HEIGHT) - BUFFER);

  if (newVisibleStart !== visibleStart) {
    visibleStart = newVisibleStart;
    const visibleRepos = filteredRepos.slice(visibleStart, visibleStart + visibleCount + BUFFER);
    grid.innerHTML = visibleRepos.map((repo, i) => createCard(repo, visibleStart + i)).join('');
    grid.style.position = 'relative';
    document.querySelectorAll('.repo-card').forEach((card, i) => {
      card.style.position = 'absolute';
      card.style.top = `${(visibleStart + i) * CARD_HEIGHT}px`;
      card.style.left = '0';
      card.style.right = '0';
    });
  }
}

function createCard(repo, index) {
  const [author, name] = repo.name.split('/');
  const icon = LANG_ICONS[repo.language] || LANG_ICONS['Unknown'];
  const isBookmarked = bookmarkedRepos.has(repo.name);
  const isComparing = compareRepos.includes(repo.name);
  const isBatchSelected = batchSelectedRepos.has(repo.name);
  const noDesc = currentLang === 'zh' ? '暂无描述' : 'No description';
  const tags = getRepoTags(repo);
  const license = getLicense(repo);
  const maxStars = Math.max(...allRepos.map(r => r.stars), 1);
  const sparkline = repo.stars > 1000 ? getSparklinePath(repo.stars, maxStars) : '';
  const activity = getActivityLevel(repo);

  return `
    <article class="repo-card ${isBatchSelected ? 'batch-selected' : ''}" style="animation-delay: ${index * 0.025}s" data-repo="${repo.name}">
      ${sparkline ? `<div class="card-sparkline"><svg width="60" height="20" viewBox="0 0 60 20">${sparkline}</svg></div>` : ''}
      <button class="card-batch ${isBatchSelected ? 'active' : ''}" data-repo="${repo.name}" aria-label="Select">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </button>
      <button class="card-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-repo="${repo.name}" aria-label="Bookmark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
      <button class="card-compare ${isComparing ? 'active' : ''}" data-repo="${repo.name}" aria-label="Compare">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      </button>
      <button class="card-share" data-repo="${repo.name}" aria-label="Share">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
      </button>
      <div class="card-header">
        <div class="card-icon">${icon}</div>
        <div class="card-info">
          <h3 class="card-name">${esc(name)}</h3>
          <span class="card-author">${esc(author)}</span>
        </div>
        ${license ? `<span class="card-license">${license}</span>` : ''}
        <span class="card-activity" style="color: ${activity.color}" title="${activity.label}">${activity.level === 'never' ? '○' : activity.level === 'veryActive' ? '●' : activity.level === 'active' ? '◐' : '○'}</span>
      </div>
      <p class="card-desc">${esc(repo.description || noDesc)}</p>
      ${tags.length > 0 ? `<div class="card-tags">${tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>` : ''}
      <div class="card-stats">
        <span class="card-stat stars">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          ${fmtNum(repo.stars)}
        </span>
        <span class="card-stat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/>
            <path d="M18 6v6c0 2-2 4-6 6-4-2-6-4-6-6V6"/>
          </svg>
          ${fmtNum(repo.forks)}
        </span>
        ${repo.language && repo.language !== 'Unknown' ? `
          <span class="card-stat lang">${repo.language}</span>
        ` : ''}
        ${repo.today_stars > 0 ? `
          <span class="card-stat" style="color: var(--text-muted)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            +${fmtNum(repo.today_stars)}
          </span>
        ` : ''}
        <span class="card-stat score">🏆 ${fmtNum(repo.score)}</span>
      </div>
    </article>
  `;
}

function esc(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function fmtNum(num) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
  return num.toString();
}

function fmtDate(str) {
  if (!str) return '-';
  const d = new Date(str);
  return d.toLocaleDateString(currentLang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function filterAndSort() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const lang = document.getElementById('languageFilter').value;
  const sort = document.getElementById('sortFilter').value;
  const minStars = parseInt(document.getElementById('starsRange').value) || 0;
  const minForks = parseInt(document.getElementById('forksRange').value) || 0;
  const minScore = parseInt(document.getElementById('scoreRange').value) || 0;

  filteredRepos = allRepos.filter(r => {
    if (showBookmarksOnly && !bookmarkedRepos.has(r.name)) return false;
    if (search && !r.name.toLowerCase().includes(search) && !r.description?.toLowerCase().includes(search)) return false;
    if (lang && r.language !== lang) return false;
    if (r.stars < minStars) return false;
    if (r.forks < minForks) return false;
    if (r.score < minScore) return false;
    return true;
  });

  filteredRepos.sort((a, b) => {
    switch (sort) {
      case 'stars': return b.stars - a.stars;
      case 'forks': return b.forks - a.forks;
      case 'today': return b.today_stars - a.today_stars;
      case 'score': return b.score - a.score;
      case 'rising': return (b.today_stars / (b.stars || 1)) - (a.today_stars / (a.stars || 1));
      default: return 0;
    }
  });

  document.getElementById('repoCount').textContent = filteredRepos.length;
  visibleStart = 0;
  renderVirtualRepos();
  updateShareUrl();
}

function updateRangeDisplay(rangeId, valId) {
  document.getElementById(valId).textContent = fmtNum(parseInt(document.getElementById(rangeId).value));
}

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('languageFilter').value = '';
  document.getElementById('sortFilter').value = 'score';
  document.getElementById('starsRange').value = 0;
  document.getElementById('forksRange').value = 0;
  document.getElementById('scoreRange').value = 0;
  document.getElementById('starsValue').textContent = '0';
  document.getElementById('forksValue').textContent = '0';
  document.getElementById('scoreValue').textContent = '0';
  filterAndSort();
}

function debounce(fn, d) {
  let t;
  return function(...a) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, a), d);
  };
}

function applyStagger() {
  document.querySelectorAll('.repo-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.02}s`;
  });
}

function exportBookmarks() {
  const bookmarked = allRepos.filter(r => bookmarkedRepos.has(r.name));
  if (bookmarked.length === 0) {
    alert(t('bookmarkEmpty'));
    return;
  }
  const blob = new Blob([JSON.stringify({ repos: bookmarked, exported_at: new Date().toISOString() }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bookmarks-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Event listeners
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('langToggle').addEventListener('click', toggleLanguage);
document.getElementById('searchInput').addEventListener('input', () => {
  renderSearchPreview();
  debounce(filterAndSort, 200)();
});
document.getElementById('languageFilter').addEventListener('change', filterAndSort);
document.getElementById('sortFilter').addEventListener('change', filterAndSort);

['starsRange', 'forksRange', 'scoreRange'].forEach(id => {
  const rangeId = id;
  const valId = id.replace('Range', 'Value');
  document.getElementById(rangeId).addEventListener('input', () => {
    updateRangeDisplay(rangeId, valId);
    filterAndSort();
  });
});

document.getElementById('resetFilters').addEventListener('click', resetFilters);

document.getElementById('bookmarkToggle').addEventListener('click', () => {
  showBookmarksOnly = !showBookmarksOnly;
  const btn = document.getElementById('bookmarkToggle');
  btn.classList.toggle('active', showBookmarksOnly);
  filterAndSort();
});

document.getElementById('exportBookmarks').addEventListener('click', exportBookmarks);
document.getElementById('shareBtn').addEventListener('click', copyShareLink);

document.getElementById('compareBtn').addEventListener('click', openCompareModal);
document.getElementById('clearCompare').addEventListener('click', clearCompare);

document.getElementById('repoGrid').addEventListener('click', (e) => {
  const batchBtn = e.target.closest('.card-batch');
  if (batchBtn) {
    e.stopPropagation();
    const repoName = batchBtn.dataset.repo;
    toggleBatchSelect(repoName);
    return;
  }

  const bookmarkBtn = e.target.closest('.card-bookmark');
  if (bookmarkBtn) {
    e.stopPropagation();
    const repoName = bookmarkBtn.dataset.repo;
    toggleBookmark(repoName);
    return;
  }

  const compareBtn = e.target.closest('.card-compare');
  if (compareBtn) {
    e.stopPropagation();
    const repoName = compareBtn.dataset.repo;
    toggleCompare(repoName);
    return;
  }

  const shareBtn = e.target.closest('.card-share');
  if (shareBtn) {
    e.stopPropagation();
    const repoName = shareBtn.dataset.repo;
    const repo = allRepos.find(r => r.name === repoName);
    if (repo) {
      showShareMenu(repo, shareBtn);
    }
    return;
  }

  const card = e.target.closest('.repo-card');
  if (card) {
    const repoName = card.dataset.repo;
    const repo = allRepos.find(r => r.name === repoName);
    if (repo) {
      openModal(repo);
    }
  }
});

document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modalOverlay')) {
    closeModal();
  }
});

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('modalBookmark').addEventListener('click', () => {
  if (currentModalRepo) {
    toggleBookmark(currentModalRepo.name);
  }
});

document.getElementById('modalCopyUrl').addEventListener('click', () => {
  if (currentModalRepo) {
    navigator.clipboard.writeText(currentModalRepo.url).then(() => {
      const btn = document.getElementById('modalCopyUrl');
      const original = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> ' + t('copied');
      setTimeout(() => { btn.innerHTML = original; }, 1500);
    });
  }
});

document.getElementById('modalCloneHttps').addEventListener('click', () => {
  if (currentModalRepo) {
    const { https } = getCloneCommand(currentModalRepo);
    navigator.clipboard.writeText(https).then(() => {
      const btn = document.getElementById('modalCloneHttps');
      const original = btn.textContent;
      btn.textContent = t('copied');
      setTimeout(() => { btn.textContent = original; }, 1500);
    });
  }
});

document.getElementById('modalCloneSsh').addEventListener('click', () => {
  if (currentModalRepo) {
    const { ssh } = getCloneCommand(currentModalRepo);
    navigator.clipboard.writeText(ssh).then(() => {
      const btn = document.getElementById('modalCloneSsh');
      const original = btn.textContent;
      btn.textContent = t('copied');
      setTimeout(() => { btn.textContent = original; }, 1500);
    });
  }
});

document.getElementById('discoverBtn').addEventListener('click', discoverRandom);
document.getElementById('recommendBtn').addEventListener('click', showRecommendations);
document.getElementById('savePresetBtn').addEventListener('click', saveCurrentAsPreset);
document.getElementById('inspirationModeBtn').addEventListener('click', startInspirationMode);
document.getElementById('keyboardHelpBtn').addEventListener('click', showKeyboardHelp);

document.getElementById('batchBookmarkAll').addEventListener('click', batchBookmarkAll);
document.getElementById('batchExport').addEventListener('click', batchExportSelected);
document.getElementById('batchClear').addEventListener('click', clearBatchSelection);

// Keyboard Navigation
let selectedCardIndex = -1;

function updateCardSelection() {
  const cards = document.querySelectorAll('.repo-card');
  cards.forEach((card, i) => {
    if (i === selectedCardIndex) {
      card.classList.add('selected');
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      card.classList.remove('selected');
    }
  });
}

function getCardsPerRow() {
  const grid = document.getElementById('repoGrid');
  const style = window.getComputedStyle(grid);
  const cols = style.gridTemplateColumns.split(' ').length;
  return cols || 3;
}

document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, select, textarea')) return;

  const cards = document.querySelectorAll('.repo-card');
  const perRow = getCardsPerRow();

  if (e.key === 'Escape') {
    closeModal();
    selectedCardIndex = -1;
    cards.forEach(c => c.classList.remove('selected'));
  }
  if (e.key === '/') {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
  if (e.key === 't' || e.key === 'T') {
    toggleTheme();
  }
  if (e.key === 'b' || e.key === 'B') {
    showBookmarksOnly = !showBookmarksOnly;
    const btn = document.getElementById('bookmarkToggle');
    btn.classList.toggle('active', showBookmarksOnly);
    filterAndSort();
  }
  if (e.key === 'l' || e.key === 'L') {
    toggleLanguage();
  }
  if (e.key === '?' || e.key === 'h' || e.key === 'H') {
    if (!e.target.matches('input, textarea')) {
      showKeyboardHelp();
    }
  }
  if (e.key === 'Enter' && selectedCardIndex >= 0) {
    const repoName = cards[selectedCardIndex]?.dataset.repo;
    if (repoName) {
      const repo = allRepos.find(r => r.name === repoName);
      if (repo) openModal(repo);
    }
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    if (selectedCardIndex < cards.length - 1) {
      selectedCardIndex++;
      updateCardSelection();
    }
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    if (selectedCardIndex > 0) {
      selectedCardIndex--;
      updateCardSelection();
    }
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (selectedCardIndex + perRow < cards.length) {
      selectedCardIndex += perRow;
      updateCardSelection();
    }
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (selectedCardIndex - perRow >= 0) {
      selectedCardIndex -= perRow;
      updateCardSelection();
    }
  }
  if (e.key === ' ' && selectedCardIndex >= 0) {
    e.preventDefault();
    const repoName = cards[selectedCardIndex]?.dataset.repo;
    if (repoName) toggleBookmark(repoName);
  }
  if (e.key === 'c' || e.key === 'C') {
    if (selectedCardIndex >= 0) {
      const repoName = cards[selectedCardIndex]?.dataset.repo;
      if (repoName) toggleCompare(repoName);
    }
  }
});

window.addEventListener('scroll', debounce(handleScroll, 16));

// Share URL functionality
function updateShareUrl() {
  const params = new URLSearchParams();
  const search = document.getElementById('searchInput').value;
  const lang = document.getElementById('languageFilter').value;
  const sort = document.getElementById('sortFilter').value;
  const stars = document.getElementById('starsRange').value;
  const forks = document.getElementById('forksRange').value;
  const score = document.getElementById('scoreRange').value;

  if (search) params.set('q', search);
  if (lang) params.set('lang', lang);
  if (sort !== 'score') params.set('sort', sort);
  if (stars > 0) params.set('stars', stars);
  if (forks > 0) params.set('forks', forks);
  if (score > 0) params.set('score', score);
  if (showBookmarksOnly) params.set('bookmarks', '1');

  const newUrl = params.toString() ? `${location.pathname}?${params.toString()}` : location.pathname;
  history.replaceState(null, '', newUrl);
}

function loadFromUrl() {
  const params = new URLSearchParams(location.search);
  if (params.get('q')) document.getElementById('searchInput').value = params.get('q');
  if (params.get('lang')) document.getElementById('languageFilter').value = params.get('lang');
  if (params.get('sort')) document.getElementById('sortFilter').value = params.get('sort');
  if (params.get('stars')) {
    document.getElementById('starsRange').value = params.get('stars');
    updateRangeDisplay('starsRange', 'starsValue');
  }
  if (params.get('forks')) {
    document.getElementById('forksRange').value = params.get('forks');
    updateRangeDisplay('forksRange', 'forksValue');
  }
  if (params.get('score')) {
    document.getElementById('scoreRange').value = params.get('score');
    updateRangeDisplay('scoreRange', 'scoreValue');
  }
  if (params.get('bookmarks') === '1') {
    showBookmarksOnly = true;
    document.getElementById('bookmarkToggle').classList.add('active');
  }
}

function copyShareLink() {
  const url = location.href;
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.getElementById('shareBtn');
    const original = btn.innerHTML;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> ' + t('copied');
    setTimeout(() => { btn.innerHTML = original; }, 1500);
  });
}

// Comparison functionality
let compareRepos = [];

function toggleCompare(repoName) {
  const idx = compareRepos.indexOf(repoName);
  if (idx > -1) {
    compareRepos.splice(idx, 1);
  } else if (compareRepos.length < 2) {
    compareRepos.push(repoName);
  }
  updateCompareUI();
}

function updateCompareUI() {
  document.querySelectorAll('.card-compare').forEach(btn => {
    const repoName = btn.dataset.repo;
    if (compareRepos.includes(repoName)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const compareBar = document.getElementById('compareBar');
  if (compareRepos.length > 0) {
    compareBar.style.display = 'flex';
    document.getElementById('compareCount').textContent = compareRepos.length;
  } else {
    compareBar.style.display = 'none';
  }
}

function openCompareModal() {
  if (compareRepos.length !== 2) return;

  const repo1 = allRepos.find(r => r.name === compareRepos[0]);
  const repo2 = allRepos.find(r => r.name === compareRepos[1]);
  if (!repo1 || !repo2) return;

  const overlay = document.getElementById('modalOverlay');
  const icon1 = LANG_ICONS[repo1.language] || LANG_ICONS['Unknown'];
  const icon2 = LANG_ICONS[repo2.language] || LANG_ICONS['Unknown'];

  const stars1 = repo1.stars, stars2 = repo2.stars;
  const forks1 = repo1.forks, forks2 = repo2.forks;
  const score1 = repo1.score, score2 = repo2.score;

  const maxStars = Math.max(stars1, stars2);
  const maxForks = Math.max(forks1, forks2);
  const maxScore = Math.max(score1, score2);

  document.getElementById('modalIcon').innerHTML = '';
  document.getElementById('modalTitle').textContent = t('compareTitle') || '项目对比';
  document.getElementById('modalAuthor').textContent = '';
  document.getElementById('modalDesc').innerHTML = `
    <div class="compare-container">
      <div class="compare-repo">
        <div class="compare-icon">${icon1}</div>
        <h3>${repo1.name.split('/')[1]}</h3>
        <p class="compare-author">${repo1.name.split('/')[0]}</p>
        <p class="compare-desc">${repo1.description || '-'}</p>
        <div class="compare-stats">
          <div class="compare-stat">
            <span class="compare-label">Stars</span>
            <div class="compare-bar-wrap">
              <div class="compare-bar-fill" style="width:${(stars1/maxStars)*100}%"></div>
            </div>
            <span class="compare-value">${fmtNum(stars1)}</span>
          </div>
          <div class="compare-stat">
            <span class="compare-label">Forks</span>
            <div class="compare-bar-wrap">
              <div class="compare-bar-fill" style="width:${(forks1/maxForks)*100}%"></div>
            </div>
            <span class="compare-value">${fmtNum(forks1)}</span>
          </div>
          <div class="compare-stat">
            <span class="compare-label">Score</span>
            <div class="compare-bar-wrap">
              <div class="compare-bar-fill" style="width:${(score1/maxScore)*100}%"></div>
            </div>
            <span class="compare-value">${fmtNum(score1)}</span>
          </div>
        </div>
        <a href="${repo1.url}" target="_blank" class="compare-link">${t('openInGithub')}</a>
      </div>
      <div class="compare-vs">VS</div>
      <div class="compare-repo">
        <div class="compare-icon">${icon2}</div>
        <h3>${repo2.name.split('/')[1]}</h3>
        <p class="compare-author">${repo2.name.split('/')[0]}</p>
        <p class="compare-desc">${repo2.description || '-'}</p>
        <div class="compare-stats">
          <div class="compare-stat">
            <span class="compare-label">Stars</span>
            <div class="compare-bar-wrap">
              <div class="compare-bar-fill" style="width:${(stars2/maxStars)*100}%"></div>
            </div>
            <span class="compare-value">${fmtNum(stars2)}</span>
          </div>
          <div class="compare-stat">
            <span class="compare-label">Forks</span>
            <div class="compare-bar-wrap">
              <div class="compare-bar-fill" style="width:${(forks2/maxForks)*100}%"></div>
            </div>
            <span class="compare-value">${fmtNum(forks2)}</span>
          </div>
          <div class="compare-stat">
            <span class="compare-label">Score</span>
            <div class="compare-bar-wrap">
              <div class="compare-bar-fill" style="width:${(score2/maxScore)*100}%"></div>
            </div>
            <span class="compare-value">${fmtNum(score2)}</span>
          </div>
        </div>
        <a href="${repo2.url}" target="_blank" class="compare-link">${t('openInGithub')}</a>
      </div>
    </div>
  `;
  document.getElementById('modalStats').innerHTML = '';
  document.getElementById('modalSource').textContent = '';
  document.getElementById('modalGithubLink').style.display = 'none';
  document.getElementById('modalCopyUrl').style.display = 'none';
  document.getElementById('modalBookmark').style.display = 'none';

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function clearCompare() {
  compareRepos = [];
  updateCompareUI();
}

// Batch Selection
let batchSelectedRepos = new Set();

function toggleBatchSelect(repoName) {
  if (batchSelectedRepos.has(repoName)) {
    batchSelectedRepos.delete(repoName);
  } else {
    batchSelectedRepos.add(repoName);
  }
  updateBatchUI();
}

function updateBatchUI() {
  const batchBar = document.getElementById('batchBar');
  const countEl = document.getElementById('batchCount');

  if (batchSelectedRepos.size > 0) {
    batchBar.style.display = 'flex';
    countEl.textContent = batchSelectedRepos.size;
  } else {
    batchBar.style.display = 'none';
  }

  document.querySelectorAll('.card-batch').forEach(btn => {
    if (batchSelectedRepos.has(btn.dataset.repo)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function batchBookmarkAll() {
  batchSelectedRepos.forEach(name => {
    bookmarkedRepos.add(name);
  });
  saveBookmarks();
  batchSelectedRepos.clear();
  updateBatchUI();
  filterAndSort();
}

function batchExportSelected() {
  const repos = allRepos.filter(r => batchSelectedRepos.has(r.name));
  if (repos.length === 0) return;
  const blob = new Blob([JSON.stringify({ repos, exported_at: new Date().toISOString() }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `selected-repos-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function clearBatchSelection() {
  batchSelectedRepos.clear();
  updateBatchUI();
}

// Smart Recommendations
function getRecommended() {
  if (bookmarkedRepos.size === 0) {
    return [];
  }

  const bookmarked = allRepos.filter(r => bookmarkedRepos.has(r.name));
  if (bookmarked.length === 0) return [];

  const langScores = {};
  const keywordScores = {};

  bookmarked.forEach(r => {
    if (r.language) langScores[r.language] = (langScores[r.language] || 0) + 1;
    if (r.description) {
      const words = r.description.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      words.forEach(w => keywordScores[w] = (keywordScores[w] || 0) + 1);
    }
  });

  const totalLang = Object.values(langScores).reduce((a, b) => a + b, 0);
  const topLangs = Object.entries(langScores).sort((a, b) => b[1] - a[1]).slice(0, 3).map(e => e[0]);

  return allRepos
    .filter(r => !bookmarkedRepos.has(r.name))
    .map(r => {
      let score = 0;
      if (topLangs.includes(r.language)) score += 30;
      if (r.description) {
        const words = r.description.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        words.forEach(w => {
          if (keywordScores[w]) score += keywordScores[w] * 2;
        });
      }
      return { repo: r, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(r => r.repo);
}

function showRecommendations() {
  const recommended = getRecommended();
  if (recommended.length === 0) {
    alert(currentLang === 'zh' ? '先收藏一些项目，我来为你推荐相似的宝藏！' : 'Bookmark some projects first, and I\'ll recommend similar treasures!');
    return;
  }

  const overlay = document.getElementById('modalOverlay');
  document.getElementById('modalIcon').innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  `;
  document.getElementById('modalTitle').textContent = currentLang === 'zh' ? '智能推荐' : 'Smart Recommendations';
  document.getElementById('modalAuthor').textContent = currentLang === 'zh' ? '基于你的收藏' : 'Based on your bookmarks';
  document.getElementById('modalDesc').innerHTML = recommended.map((r, i) => {
    const icon = LANG_ICONS[r.language] || LANG_ICONS['Unknown'];
    return `
      <div class="recommend-item" data-repo="${r.name}">
        <div class="recommend-icon">${icon}</div>
        <div class="recommend-info">
          <h4>${r.name.split('/')[1]}</h4>
          <p>${r.description ? r.description.substring(0, 60) + '...' : '-'}</p>
        </div>
        <div class="recommend-stats">
          <span>⭐ ${fmtNum(r.stars)}</span>
          <span>${r.language || 'Unknown'}</span>
        </div>
      </div>
    `;
  }).join('');
  document.getElementById('modalStats').innerHTML = '';
  document.getElementById('modalSource').textContent = '';
  document.getElementById('modalGithubLink').style.display = 'none';
  document.getElementById('modalCopyUrl').style.display = 'none';
  document.getElementById('modalBookmark').style.display = 'none';

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    document.querySelectorAll('.recommend-item').forEach(item => {
      item.addEventListener('click', () => {
        const repoName = item.dataset.repo;
        const repo = allRepos.find(r => r.name === repoName);
        if (repo) {
          closeModal();
          setTimeout(() => openModal(repo), 100);
        }
      });
    });
  }, 100);
}

// Clone Command
function getCloneCommand(repo) {
  const ssh = `git clone git@github.com:${repo.name}.git`;
  const https = `git clone https://github.com/${repo.name}.git`;
  return { ssh, https };
}

// Random Treasure Discovery
let lastDiscoverTime = 0;
function discoverRandom() {
  const now = Date.now();
  if (now - lastDiscoverTime < 5000) {
    return;
  }
  lastDiscoverTime = now;

  const filtered = filteredRepos.length > 0 ? filteredRepos : allRepos;
  if (filtered.length === 0) return;

  const weights = filtered.map(r => Math.max(1, r.score / 1000));
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < filtered.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      openModal(filtered[i]);
      return;
    }
  }
  openModal(filtered[0]);
}

// Filter Presets
let presets = [];

function loadPresets() {
  try {
    const saved = localStorage.getItem('filterPresets');
    if (saved) presets = JSON.parse(saved);
  } catch (e) {
    presets = [];
  }
}

function savePresets() {
  localStorage.setItem('filterPresets', JSON.stringify(presets));
}

function saveCurrentAsPreset() {
  const name = prompt(currentLang === 'zh' ? '输入预设名称：' : 'Enter preset name:');
  if (!name) return;

  presets.push({
    name,
    search: document.getElementById('searchInput').value,
    lang: document.getElementById('languageFilter').value,
    sort: document.getElementById('sortFilter').value,
    stars: document.getElementById('starsRange').value,
    forks: document.getElementById('forksRange').value,
    score: document.getElementById('scoreRange').value
  });
  savePresets();
  updatePresetsUI();
}

function applyPreset(preset) {
  document.getElementById('searchInput').value = preset.search || '';
  document.getElementById('languageFilter').value = preset.lang || '';
  document.getElementById('sortFilter').value = preset.sort || 'score';
  document.getElementById('starsRange').value = preset.stars || 0;
  document.getElementById('forksRange').value = preset.forks || 0;
  document.getElementById('scoreRange').value = preset.score || 0;
  updateRangeDisplay('starsRange', 'starsValue');
  updateRangeDisplay('forksRange', 'forksValue');
  updateRangeDisplay('scoreRange', 'scoreValue');
  filterAndSort();
}

function deletePreset(index) {
  presets.splice(index, 1);
  savePresets();
  updatePresetsUI();
}

function updatePresetsUI() {
  const container = document.getElementById('presetsContainer');
  if (!container) return;

  container.innerHTML = presets.map((p, i) => `
    <button class="preset-btn" data-index="${i}">
      <span>${p.name}</span>
      <span class="preset-delete" data-index="${i}">×</span>
    </button>
  `).join('');

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('preset-delete')) {
        e.stopPropagation();
        deletePreset(parseInt(e.target.dataset.index));
      } else {
        applyPreset(presets[parseInt(btn.dataset.index)]);
      }
    });
  });
}

// ============================================
// Inspiration Mode - Enterprise Edition
// Features: State persistence, accessibility, performance, UX polish
// ============================================

/**
 * @typedef {Object} InspirationConfig
 * @property {number} autoPlayDelay - Delay between auto-play slides (ms)
 * @property {number} swipeThreshold - Minimum swipe distance to trigger action
 * @property {number} animationDuration - Slide animation duration (ms)
 * @property {boolean} soundEnabled - Enable sound effects
 * @property {boolean} hapticEnabled - Enable haptic feedback on mobile
 * @property {number} maxHistory - Maximum undo history size
 */

/** @type {InspirationConfig} */
const INSPIRATION_CONFIG = {
  autoPlayDelay: 5000,
  swipeThreshold: 80,
  animationDuration: 300,
  soundEnabled: false,
  hapticEnabled: true,
  maxHistory: 50
};

/** @type {Set<string>} */
const seenRepos = new Set();

const InspirationMode = {
  // State
  repos: [],
  index: 0,
  history: [],
  historyIndex: -1,
  isActive: false,
  isAnimating: false,
  isFlipped: false,
  autoPlayInterval: null,
  filterLanguage: '',
  touchStartX: 0,
  touchStartY: 0,
  currentTranslateX: 0,
  focusedElement: null,

  // Storage keys
  STORAGE_SEEN: 'inspiration_seen_repos',
  STORAGE_POSITION: 'inspiration_last_position',

  start(language = '') {
    this.filterLanguage = language;
    this.repos = this.getFilteredRepos();
    
    if (this.repos.length === 0) {
      showToast(currentLang === 'zh' ? '没有找到匹配的项目' : 'No matching projects found');
      return;
    }

    this.loadSeenRepos();
    this.index = this.getLastPosition();
    this.history = [this.index];
    this.historyIndex = 0;
    this.isActive = true;
    this.isFlipped = false;
    this.stopAutoPlay();
    this.preloadAdjacentCards();
    this.render();
    this.bindKeyboard();
    this.saveState();
    
    const modal = document.getElementById('detailModal');
    modal.classList.add('inspiration-modal');
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    this.announce(currentLang === 'zh' 
      ? `灵感模式已启动，共 ${this.repos.length} 个项目`
      : `Inspiration mode started, ${this.repos.length} projects`);
  },

  getFilteredRepos() {
    let repos = [...allRepos];
    if (this.filterLanguage) {
      repos = repos.filter(r => r.language === this.filterLanguage);
    }
    repos = repos.filter(r => !this.isSeen(r.name));
    return repos.sort(() => Math.random() - 0.5);
  },

  isSeen(repoName) {
    return seenRepos.has(repoName);
  },

  markAsSeen(repoName) {
    seenRepos.add(repoName);
    this.persistSeenRepos();
  },

  loadSeenRepos() {
    try {
      const saved = localStorage.getItem(this.STORAGE_SEEN);
      if (saved) {
        JSON.parse(saved).forEach(name => seenRepos.add(name));
      }
    } catch (e) {
      seenRepos.clear();
    }
  },

  persistSeenRepos() {
    try {
      localStorage.setItem(this.STORAGE_SEEN, JSON.stringify([...seenRepos]));
    } catch (e) {}
  },

  getLastPosition() {
    try {
      const saved = localStorage.getItem(this.STORAGE_POSITION);
      if (saved) {
        const pos = JSON.parse(saved);
        if (pos.filterLanguage === this.filterLanguage) {
          return Math.min(pos.index || 0, this.repos.length - 1);
        }
      }
    } catch (e) {}
    return 0;
  },

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_POSITION, JSON.stringify({
        index: this.index,
        filterLanguage: this.filterLanguage
      }));
    } catch (e) {}
  },

  get currentRepo() {
    return this.repos[this.index];
  },

  get progress() {
    return ((this.index + 1) / this.repos.length) * 100;
  },

  get hasNext() {
    return this.index < this.repos.length - 1;
  },

  get hasPrev() {
    return this.index > 0;
  },

  get seenCount() {
    return seenRepos.size;
  },

  next() {
    if (!this.hasNext || this.isAnimating) return;
    this.markAsSeen(this.currentRepo.name);
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(this.index + 1);
    if (this.history.length > INSPIRATION_CONFIG.maxHistory) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
    this.index++;
    this.isFlipped = false;
    this.animateSlide('next');
    this.preloadAdjacentCards();
    this.saveState();
  },

  prev() {
    if (!this.hasPrev || this.isAnimating) return;
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(this.index - 1);
    if (this.history.length > INSPIRATION_CONFIG.maxHistory) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
    this.index--;
    this.isFlipped = false;
    this.animateSlide('prev');
    this.saveState();
  },

  goTo(idx) {
    if (idx < 0 || idx >= this.repos.length || this.isAnimating) return;
    this.markAsSeen(this.repos[idx].name);
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(idx);
    if (this.history.length > INSPIRATION_CONFIG.maxHistory) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
    this.index = idx;
    this.isFlipped = false;
    this.animateSlide(idx > this.index ? 'next' : 'prev');
    this.saveState();
  },

  first() {
    if (this.index !== 0) this.goTo(0);
  },

  last() {
    if (this.index !== this.repos.length - 1) {
      this.goTo(this.repos.length - 1);
    }
  },

  undo() {
    if (this.historyIndex <= 0 || this.isAnimating) return;
    this.historyIndex--;
    this.index = this.history[this.historyIndex];
    this.isFlipped = false;
    this.animateSlide('prev');
    this.saveState();
  },

  redo() {
    if (this.historyIndex >= this.history.length - 1 || this.isAnimating) return;
    this.historyIndex++;
    this.index = this.history[this.historyIndex];
    this.isFlipped = false;
    this.animateSlide('next');
    this.saveState();
  },

  toggleBookmark() {
    if (!this.currentRepo) return;
    toggleBookmark(this.currentRepo.name);
    this.updateBookmarkBtn();
    const isBookmarked = bookmarkedRepos.has(this.currentRepo.name);
    showToast(isBookmarked 
      ? (currentLang === 'zh' ? '已收藏' : 'Bookmarked')
      : (currentLang === 'zh' ? '已取消收藏' : 'Removed bookmark'));
    this.hapticFeedback('medium');
  },

  openInGithub() {
    if (!this.currentRepo) return;
    window.open(this.currentRepo.url, '_blank');
  },

  shareToTwitter() {
    if (!this.currentRepo) return;
    const repo = this.currentRepo;
    const text = currentLang === 'zh'
      ? `发现宝藏项目: ${repo.name} - ${repo.description || ''}`
      : `Discovered treasure: ${repo.name} - ${repo.description || ''}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(repo.url)}`;
    window.open(url, '_blank', 'width=550,height=420');
  },

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
    const cardContent = document.getElementById('inspirationCardContent');
    if (cardContent) {
      cardContent.classList.toggle('flipped', this.isFlipped);
    }
    this.hapticFeedback('light');
  },

  startAutoPlay() {
    if (this.autoPlayInterval) return;
    this.autoPlayInterval = setInterval(() => {
      if (this.hasNext) {
        this.next();
      } else {
        this.stopAutoPlay();
        this.announce(currentLang === 'zh' ? '自动播放已结束' : 'Auto-play finished');
      }
    }, INSPIRATION_CONFIG.autoPlayDelay);
    this.updateAutoPlayBtn();
    this.announce(currentLang === 'zh' ? '自动播放已开启' : 'Auto-play started');
  },

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    this.updateAutoPlayBtn();
  },

  toggleAutoPlay() {
    if (this.autoPlayInterval) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  },

  setFilter(language) {
    this.filterLanguage = language;
    this.repos = this.getFilteredRepos();
    if (this.repos.length === 0) {
      showToast(currentLang === 'zh' ? '该语言没有未浏览的项目' : 'No unread projects in this language');
      this.close();
      return;
    }
    this.index = 0;
    this.history = [0];
    this.historyIndex = 0;
    this.isFlipped = false;
    this.render();
    this.saveState();
    this.announce(currentLang === 'zh' 
      ? `已切换到 ${language || '全部'}，共 ${this.repos.length} 个项目`
      : `Switched to ${language || 'all'}, ${this.repos.length} projects`);
  },

  preloadAdjacentCards() {
    const preloadIndices = [this.index - 1, this.index + 1];
    preloadIndices.forEach(idx => {
      if (idx >= 0 && idx < this.repos.length) {
        const img = new Image();
      }
    });
  },

  animateSlide(direction) {
    this.isAnimating = true;
    const card = document.getElementById('inspirationCard');
    const cardContent = document.getElementById('inspirationCardContent');
    if (!cardContent) return;

    const transformOut = direction === 'next' 
      ? 'translateX(-120%) rotate(-8deg)' 
      : 'translateX(120%) rotate(8deg)';
    
    cardContent.style.transition = `transform ${INSPIRATION_CONFIG.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${INSPIRATION_CONFIG.animationDuration}ms ease`;
    cardContent.style.transform = transformOut;
    cardContent.style.opacity = '0';

    setTimeout(() => {
      this.render();
      this.updateFocus();
      
      cardContent.style.transition = 'none';
      const transformIn = direction === 'next' 
        ? 'translateX(100%)' 
        : 'translateX(-100%)';
      cardContent.style.transform = transformIn;
      cardContent.style.opacity = '0';
      
      requestAnimationFrame(() => {
        cardContent.style.transition = `transform ${INSPIRATION_CONFIG.animationDuration + 50}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${INSPIRATION_CONFIG.animationDuration}ms ease`;
        cardContent.style.transform = 'translateX(0) rotate(0)';
        cardContent.style.opacity = '1';
        this.isAnimating = false;
        this.announce(this.getCurrentAnnouncement());
      });
    }, INSPIRATION_CONFIG.animationDuration);
  },

  getCurrentAnnouncement() {
    const repo = this.currentRepo;
    if (!repo) return '';
    const isBookmarked = bookmarkedRepos.has(repo.name);
    return `${this.index + 1} of ${this.repos.length}: ${repo.name}. Stars: ${fmtNum(repo.stars)}. ${isBookmarked ? 'Bookmarked.' : ''}`;
  },

  announce(message) {
    const liveRegion = document.getElementById('inspirationLiveRegion');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  },

  hapticFeedback(style = 'light') {
    if (!INSPIRATION_CONFIG.hapticEnabled) return;
    if ('vibrate' in navigator) {
      const durations = { light: 10, medium: 20, heavy: 30 };
      navigator.vibrate(durations[style] || 10);
    }
  },

  handleSwipe(deltaX, deltaY) {
    const threshold = INSPIRATION_CONFIG.swipeThreshold;
    const velocity = Math.abs(deltaX) / Math.max(Math.abs(deltaY), 1);
    
    if (velocity < 0.5) return;
    
    if (deltaX > threshold) {
      this.hapticFeedback('light');
      this.prev();
    } else if (deltaX < -threshold) {
      this.hapticFeedback('light');
      this.next();
    }
    
    this.updateSwipeIndicator(0);
  },

  updateSwipeIndicator(deltaX) {
    const indicator = document.getElementById('swipeIndicator');
    if (!indicator) return;
    
    const maxOffset = 100;
    const offset = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
    const opacity = Math.min(Math.abs(deltaX) / maxOffset, 1);
    
    if (deltaX > 20) {
      indicator.innerHTML = '←';
      indicator.style.color = 'var(--accent)';
      indicator.style.opacity = opacity;
    } else if (deltaX < -20) {
      indicator.innerHTML = '→';
      indicator.style.color = 'var(--accent-secondary)';
      indicator.style.opacity = opacity;
    } else {
      indicator.style.opacity = '0';
    }
  },

  updateBookmarkBtn() {
    const btn = document.getElementById('inspirationBookmark');
    if (!btn || !this.currentRepo) return;
    const isBookmarked = bookmarkedRepos.has(this.currentRepo.name);
    btn.classList.toggle('active', isBookmarked);
    btn.querySelector('svg').setAttribute('fill', isBookmarked ? 'currentColor' : 'none');
  },

  updateAutoPlayBtn() {
    const btn = document.getElementById('inspirationAutoPlay');
    if (!btn) return;
    const isPlaying = !!this.autoPlayInterval;
    btn.classList.toggle('playing', isPlaying);
    
    const svg = btn.querySelector('svg');
    if (isPlaying) {
      svg.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    } else {
      svg.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    }
    
    btn.title = isPlaying 
      ? (currentLang === 'zh' ? '暂停自动播放 (P)' : 'Pause auto-play (P)')
      : (currentLang === 'zh' ? '自动播放 (P)' : 'Auto-play (P)');
  },

  updateUndoRedoBtns() {
    const undoBtn = document.getElementById('inspirationUndo');
    const redoBtn = document.getElementById('inspirationRedo');
    if (undoBtn) {
      undoBtn.style.opacity = this.historyIndex > 0 ? '1' : '0.3';
      undoBtn.disabled = this.historyIndex <= 0;
    }
    if (redoBtn) {
      redoBtn.style.opacity = this.historyIndex < this.history.length - 1 ? '1' : '0.3';
      redoBtn.disabled = this.historyIndex >= this.history.length - 1;
    }
  },

  updateFocus() {
    const btn = document.getElementById('inspirationOpen');
    if (btn) {
      btn.focus();
      this.focusedElement = btn;
    }
  },

  showKeyboardHelp() {
    const helpEl = document.getElementById('inspirationHelp');
    if (!helpEl) return;
    
    const shortcuts = [
      { key: '←', label: currentLang === 'zh' ? '上一个' : 'Previous' },
      { key: '→', label: currentLang === 'zh' ? '下一个' : 'Next' },
      { key: 'Space', label: currentLang === 'zh' ? '收藏' : 'Bookmark' },
      { key: 'Enter', label: currentLang === 'zh' ? '打开 GitHub' : 'Open GitHub' },
      { key: 'F', label: currentLang === 'zh' ? '翻转卡片' : 'Flip card' },
      { key: 'T', label: currentLang === 'zh' ? '分享到 X' : 'Share to X' },
      { key: 'P', label: currentLang === 'zh' ? '自动播放' : 'Auto-play' },
      { key: 'Home', label: currentLang === 'zh' ? '第一个' : 'First' },
      { key: 'End', label: currentLang === 'zh' ? '最后一个' : 'Last' },
      { key: 'U', label: currentLang === 'zh' ? '撤销' : 'Undo' },
      { key: 'R', label: currentLang === 'zh' ? '重做' : 'Redo' },
      { key: 'Esc', label: currentLang === 'zh' ? '关闭' : 'Close' }
    ];

    helpEl.innerHTML = `
      <div class="inspiration-help-content">
        <div class="help-title">${currentLang === 'zh' ? '键盘快捷键' : 'Keyboard Shortcuts'}</div>
        <div class="help-grid">
          ${shortcuts.map(s => `
            <div class="help-item">
              <kbd>${s.key}</kbd>
              <span>${s.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    helpEl.classList.add('visible');
    setTimeout(() => helpEl.classList.remove('visible'), 4000);
  },

  render() {
    if (!this.currentRepo) return;

    const repo = this.currentRepo;
    const icon = LANG_ICONS[repo.language] || LANG_ICONS['Unknown'];
    const [author, name] = repo.name.split('/');
    const isBookmarked = bookmarkedRepos.has(repo.name);
    const forkRatio = repo.stars > 0 ? ((repo.forks / repo.stars) * 100).toFixed(1) : '0';
    const isSeen = this.isSeen(repo.name);

    document.getElementById('modalIcon').innerHTML = icon;
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalAuthor').textContent = author;
    document.getElementById('modalDesc').innerHTML = `
      <div class="inspiration-desc">${esc(repo.description || (currentLang === 'zh' ? '暂无描述' : 'No description'))}</div>
    `;

    document.getElementById('modalStats').innerHTML = `
      <div class="modal-stat-item">
        <span class="value">${fmtNum(repo.stars)}</span>
        <span class="label">Stars</span>
      </div>
      <div class="modal-stat-item">
        <span class="value">${fmtNum(repo.forks)}</span>
        <span class="label">Forks</span>
      </div>
      <div class="modal-stat-item">
        <span class="value">${forkRatio}%</span>
        <span class="label">${t('forkRatio')}</span>
      </div>
      <div class="modal-stat-item">
        <span class="value">${fmtNum(repo.score)}</span>
        <span class="label">${t('scoreUnit')}</span>
      </div>
    `;

    document.getElementById('modalSource').textContent = `${t('dataSource')} ${repo.source || 'unknown'}`;
    document.getElementById('modalGithubLink').href = repo.url;
    document.getElementById('modalGithubLink').style.display = 'inline-flex';

    const bookmarkBtn = document.getElementById('modalBookmark');
    bookmarkBtn.style.display = 'flex';
    bookmarkBtn.classList.toggle('bookmarked', isBookmarked);

    document.getElementById('modalLinks').innerHTML = `
      <div class="inspiration-card" id="inspirationCard" role="region" aria-label="${currentLang === 'zh' ? '灵感卡片' : 'Inspiration card'}">
        <div class="inspiration-card-content ${this.isFlipped ? 'flipped' : ''}" id="inspirationCardContent">
          <div class="inspiration-swipe-indicator" id="swipeIndicator" aria-hidden="true"></div>
          
          <div class="inspiration-header">
            <div class="inspiration-lang-filter">
              <select id="inspirationLangSelect" aria-label="${currentLang === 'zh' ? '筛选语言' : 'Filter language'}">
                <option value="">${currentLang === 'zh' ? '全部语言' : 'All Languages'}</option>
                ${Array.from(languages).sort().map(lang => 
                  `<option value="${lang}" ${this.filterLanguage === lang ? 'selected' : ''}>${lang}</option>`
                ).join('')}
              </select>
              ${this.filterLanguage ? `
                <button class="inspiration-filter-clear" id="inspirationFilterClear" 
                  title="${currentLang === 'zh' ? '清除筛选' : 'Clear Filter'}" aria-label="${currentLang === 'zh' ? '清除语言筛选' : 'Clear language filter'}">×</button>
              ` : ''}
            </div>
            <div class="inspiration-seen-indicator ${isSeen ? 'seen' : ''}" aria-label="${isSeen ? (currentLang === 'zh' ? '已浏览' : 'Seen') : (currentLang === 'zh' ? '未浏览' : 'Unseen')}">
              ${isSeen ? '✓' : '•'}
            </div>
          </div>
          
          <div class="inspiration-progress" role="progressbar" aria-valuenow="${this.progress}" aria-valuemin="0" aria-valuemax="100">
            <div class="inspiration-progress-bar" style="width: ${this.progress}%"></div>
          </div>
          
          <div class="inspiration-counter" aria-live="polite">
            <span>${this.index + 1} / ${this.repos.length}</span>
            ${this.filterLanguage ? `<span class="inspiration-filter-tag">${this.filterLanguage}</span>` : ''}
            <span class="inspiration-seen-count">(${this.seenCount} ${currentLang === 'zh' ? '已浏览' : 'seen'})</span>
          </div>
          
          <div class="inspiration-controls">
            <div class="inspiration-nav" role="navigation" aria-label="${currentLang === 'zh' ? '导航' : 'Navigation'}">
              <button class="inspiration-nav-btn" id="inspirationPrev" ${!this.hasPrev ? 'disabled' : ''} 
                aria-label="${currentLang === 'zh' ? '上一个' : 'Previous'}" ${!this.hasPrev ? 'aria-disabled="true"' : ''}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button class="inspiration-nav-btn" id="inspirationNext" ${!this.hasNext ? 'disabled' : ''} 
                aria-label="${currentLang === 'zh' ? '下一个' : 'Next'}" ${!this.hasNext ? 'aria-disabled="true"' : ''}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
            
            <div class="inspiration-actions" role="toolbar" aria-label="${currentLang === 'zh' ? '操作' : 'Actions'}">
              <button class="inspiration-btn" id="inspirationUndo" title="${currentLang === 'zh' ? '撤销 (U)' : 'Undo (U)'}" 
                aria-label="${currentLang === 'zh' ? '撤销' : 'Undo'}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M3 7v6h6"/><path d="M3 13a9 9 0 1 0 3-7.7L3 7"/>
                </svg>
              </button>
              <button class="inspiration-btn skip" id="inspirationSkip" title="${currentLang === 'zh' ? '跳过' : 'Skip'}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
                </svg>
              </button>
              <button class="inspiration-btn bookmark ${isBookmarked ? 'active' : ''}" id="inspirationBookmark" 
                title="${currentLang === 'zh' ? '收藏 (Space)' : 'Bookmark (Space)'}"
                aria-label="${currentLang === 'zh' ? '收藏' : 'Bookmark'}" aria-pressed="${isBookmarked}">
                <svg viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
              <button class="inspiration-btn flip" id="inspirationFlip" title="${currentLang === 'zh' ? '翻转 (F)' : 'Flip (F)'}"
                aria-label="${currentLang === 'zh' ? '翻转卡片查看详情' : 'Flip card for details'}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M1 4v6h6"/><path d="M23 20v-6h-6"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                </svg>
              </button>
              <button class="inspiration-btn open" id="inspirationOpen" title="${currentLang === 'zh' ? '打开 GitHub (Enter)' : 'Open GitHub (Enter)'}"
                aria-label="${currentLang === 'zh' ? '在 GitHub 打开' : 'Open on GitHub'}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </button>
              <button class="inspiration-btn share" id="inspirationShare" title="${currentLang === 'zh' ? '分享 (T)' : 'Share (T)'}"
                aria-label="${currentLang === 'zh' ? '分享到 X' : 'Share to X'}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <polyline points="16 6 12 2 8 6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
              </button>
              <button class="inspiration-btn" id="inspirationAutoPlay" title="${currentLang === 'zh' ? '自动播放 (P)' : 'Auto-play (P)'}"
                aria-label="${currentLang === 'zh' ? '自动播放' : 'Auto-play'}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </button>
              <button class="inspiration-btn" id="inspirationRedo" title="${currentLang === 'zh' ? '重做 (R)' : 'Redo (R)'}"
                aria-label="${currentLang === 'zh' ? '重做' : 'Redo'}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M21 7v6h-6"/><path d="M21 13a9 9 0 1 1-3-7.7L21 7"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="inspiration-help" id="inspirationHelp" role="region" aria-label="${currentLang === 'zh' ? '帮助' : 'Help'}"></div>
        </div>
      </div>
    `;

    document.getElementById('modalBookmark').style.display = 'none';
    document.getElementById('modalCopyUrl').style.display = 'none';
    document.getElementById('cloneCommands').style.display = 'none';

    this.bindEvents();
    this.updateUndoRedoBtns();
    this.updateAutoPlayBtn();
  },

  bindEvents() {
    const delegate = (id, event, handler) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(event, handler);
    };

    delegate('inspirationPrev', 'click', () => this.prev());
    delegate('inspirationNext', 'click', () => this.next());
    delegate('inspirationSkip', 'click', () => this.next());
    delegate('inspirationBookmark', 'click', () => this.toggleBookmark());
    delegate('inspirationOpen', 'click', () => this.openInGithub());
    delegate('inspirationFlip', 'click', () => this.toggleFlip());
    delegate('inspirationShare', 'click', () => this.shareToTwitter());
    delegate('inspirationAutoPlay', 'click', () => this.toggleAutoPlay());
    delegate('inspirationUndo', 'click', () => this.undo());
    delegate('inspirationRedo', 'click', () => this.redo());

    const langSelect = document.getElementById('inspirationLangSelect');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => this.setFilter(e.target.value));
    }

    const filterClear = document.getElementById('inspirationFilterClear');
    if (filterClear) {
      filterClear.addEventListener('click', () => this.setFilter(''));
    }

    const card = document.getElementById('inspirationCard');
    if (card) {
      card.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
      card.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: true });
      card.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: true });
    }
  },

  onTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.currentTranslateX = 0;
  },

  onTouchMove(e) {
    const deltaX = e.touches[0].clientX - this.touchStartX;
    const deltaY = e.touches[0].clientY - this.touchStartY;
    this.currentTranslateX = deltaX;
    this.updateSwipeIndicator(deltaX);

    const cardContent = document.getElementById('inspirationCardContent');
    if (cardContent) {
      const rotation = deltaX * 0.015;
      const scale = 1 - Math.abs(deltaX) * 0.0005;
      cardContent.style.transform = `translateX(${deltaX * 0.25}px) rotate(${rotation}deg) scale(${Math.max(0.95, scale)})`;
    }
  },

  onTouchEnd(e) {
    const deltaX = this.currentTranslateX;
    this.handleSwipe(deltaX, 0);

    const cardContent = document.getElementById('inspirationCardContent');
    if (cardContent) {
      cardContent.style.transform = '';
    }
  },

  bindKeyboard() {
    document.addEventListener('keydown', this.keyboardHandler);
  },

  unbindKeyboard() {
    document.removeEventListener('keydown', this.keyboardHandler);
  },

  keyboardHandler: (e) => {
    if (!this.isActive) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.next();
        break;
      case ' ':
        e.preventDefault();
        this.toggleBookmark();
        break;
      case 'Enter':
        e.preventDefault();
        this.openInGithub();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        this.toggleFlip();
        break;
      case 't':
      case 'T':
        e.preventDefault();
        this.shareToTwitter();
        break;
      case 'p':
      case 'P':
        e.preventDefault();
        this.toggleAutoPlay();
        break;
      case 'u':
      case 'U':
        e.preventDefault();
        this.undo();
        break;
      case 'r':
      case 'R':
        e.preventDefault();
        this.redo();
        break;
      case 'Home':
        e.preventDefault();
        this.first();
        break;
      case 'End':
        e.preventDefault();
        this.last();
        break;
      case '?':
        e.preventDefault();
        this.showKeyboardHelp();
        break;
      case 'Escape':
        e.preventDefault();
        this.close();
        break;
    }
  },

  close() {
    this.isActive = false;
    this.stopAutoPlay();
    this.unbindKeyboard();
    this.markAsSeen(this.currentRepo?.name);
    const modal = document.getElementById('detailModal');
    modal.classList.remove('inspiration-modal');
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
    this.announce(currentLang === 'zh' ? '灵感模式已关闭' : 'Inspiration mode closed');
  }
};

function startInspirationMode(language = '') {
  InspirationMode.start(language);
}

function openInspirationModal() {
  const modal = document.getElementById('detailModal');
  modal.classList.add('inspiration-modal');
}

// Init
initTheme();
initLanguage();
loadBookmarks();
loadPresets();
updatePresetsUI();
loadFromUrl();
loadRepos();