'use strict';
/**
 * Logic smoke-check for web/app.js pure functions.
 *
 * Loads the FULL app source inside a stubbed browser sandbox (node:vm) —
 * no DOM, no network — then calls the pure helpers with sample data and
 * prints exactly one JSON line to stdout. The pytest suite
 * (tests/test_frontend_logic.py) asserts on that JSON, so the frontend's
 * data-transform logic is regression-tested without adding a JS framework.
 *
 * Exit codes: 0 ok · 3 app.js failed to load · 4 probe failed.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function fakeElement() {
  const el = {
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    style: {},
    dataset: {},
    value: '',
    textContent: '',
    innerHTML: '',
    lang: '',
    title: '',
    checked: false,
    addEventListener() {},
    removeEventListener() {},
    appendChild() {},
    removeChild() {},
    remove() {},
    insertAdjacentHTML() {},
    setAttribute() {},
    getAttribute() { return null; },
    getElementById() { return fakeElement(); },
    getElementsByClassName() { return []; },
    getElementsByTagName() { return []; },
    querySelector() { return fakeElement(); },
    querySelectorAll() { return []; },
    closest() { return null; },
    focus() {},
    blur() {},
  };
  return el;
}

const storage = new Map();
const elementById = new Map();
const documentObj = fakeElement();
documentObj.body = fakeElement();
documentObj.documentElement = fakeElement();
documentObj.getElementById = (id) => {
  if (!elementById.has(id)) elementById.set(id, fakeElement());
  return elementById.get(id);
};

const sandbox = {
  console: { log() {}, warn() {}, error() {}, info() {} },
  setTimeout, clearTimeout, setInterval, clearInterval,
  fetch: () => Promise.resolve({
    ok: true, status: 200,
    json: async () => ({ schema_version: 2, total: 0, repos: [], fetched_at: '2026-01-01T00:00:00Z' }),
  }),
  localStorage: {
    getItem: (k) => (storage.has(k) ? storage.get(k) : null),
    setItem: (k, v) => storage.set(k, String(v)),
    removeItem: (k) => storage.delete(k),
    clear: () => storage.clear(),
  },
  location: { search: '', href: 'http://localhost:8000/', pathname: '/', protocol: 'http:', host: 'localhost:8000' },
  history: { pushState() {}, replaceState() {} },
  navigator: { clipboard: { writeText: async () => {} } },
  prompt: () => null,
  alert() {},
  confirm: () => false,
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  URLSearchParams, Date, Math, JSON, Set, Map, Object, Array, Promise,
  Number, String, Boolean, RegExp, Error, isNaN, parseInt, parseFloat,
  encodeURIComponent, decodeURIComponent,
};
sandbox.window = {
  matchMedia: sandbox.matchMedia,
  addEventListener() {},
  removeEventListener() {},
  location: sandbox.location,
  navigator: sandbox.navigator,
  localStorage: sandbox.localStorage,
  open() { return null; },
};
sandbox.document = documentObj;
sandbox.globalThis = sandbox;

const APP_PATH = path.join(__dirname, '..', '..', 'web', 'app.js');
let src;
try {
  src = fs.readFileSync(APP_PATH, 'utf8');
} catch (e) {
  console.error(`cannot read ${APP_PATH}: ${e.message}`);
  process.exit(3);
}

try {
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: 'app.js' });
} catch (e) {
  console.error(`app.js failed to load in sandbox: ${e.message}`);
  process.exit(3);
}

// Top-level init ran synchronously; loadRepos() is async — let its microtasks
// settle before asserting on module state.
const probe = `
  (async () => {
    for (let i = 0; i < 5; i++) await Promise.resolve();
    const now = Date.now();
    const DAY = 86400000;
    const big = getSparklinePath(1000, 1000);
    const points = (big.match(/points="([^"]*)"/) || ['', ''])[1].trim().split(/\\s+/);
    return JSON.stringify({
      sparkline_point_count: big === '' ? 0 : points.length,
      sparkline_is_polyline: big.startsWith('<polyline'),
      sparkline_below_threshold_empty: getSparklinePath(50, 1000) === '',
      license_mit: getLicense({ name: 'foo', description: 'released under the MIT License' }),
      license_apache: getLicense({ name: 'bar', description: 'Apache-2.0 licensed' }),
      license_none: getLicense({ name: 'baz', description: 'no license mentioned here' }),
      activity_fresh: getActivityLevel({ pushed_at: new Date(now - 2 * DAY).toISOString() }).level,
      activity_active: getActivityLevel({ pushed_at: new Date(now - 20 * DAY).toISOString() }).level,
      activity_stale: getActivityLevel({ pushed_at: new Date(now - 200 * DAY).toISOString() }).level,
      activity_never: getActivityLevel({}).level,
      tags: getRepoTags({ name: 'my-llm-app', description: 'A RAG framework with docker deployment' }),
      tags_cap_two: getRepoTags({ name: 'ai-llm-gpt-neural-transformer', description: 'vue react kubernetes docker' }).length <= 2,
      i18n_zh_title: t('title'),
      i18n_fallback: t('__missing_key__'),
      app_loaded: Array.isArray(allRepos),
      modal_href_hostile: (openModal({ name: 'evil/repo', url: 'javascript:alert(1)', stars: 10, forks: 2, score: 1, source: 'test' }),
        document.getElementById('modalGithubLink').href),
      modal_href_benign: (openModal({ name: 'a/b', url: 'https://github.com/a/b', stars: 10, forks: 2, score: 1, source: 'test' }),
        document.getElementById('modalGithubLink').href),
      fmt_num_string_safe: fmtNum('not-a-number'),
    });
  })()
`;

vm.runInContext(probe, sandbox).then(
  (json) => { process.stdout.write(json); },
  (e) => { console.error(`probe failed: ${e.message}`); process.exit(4); },
);
