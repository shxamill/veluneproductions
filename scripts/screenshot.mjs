// Full-page screenshots + basic checks using the locally installed Chrome over
// the DevTools Protocol. No npm dependencies (Node >= 22 has global WebSocket).
//
//   node scripts/screenshot.mjs <url> [--widths=1440,768,390] [--label=home] [--reduced-motion] [--wait=2500]
//
// Saves to "temporary screenshots/<label>-<width>[-n].png" (never overwrites) and
// prints: horizontal overflow, console errors, failed requests, media requests.
import { spawn } from 'node:child_process';
import { mkdirSync, existsSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(3).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);
const url = process.argv[2];
if (!url || !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(url)) {
  console.error('Usage: node scripts/screenshot.mjs http://localhost:4321/ [--widths=1440,768,390] [--label=name]');
  process.exit(1);
}
const widths = String(args.widths ?? '1440,768,390').split(',').map(Number);
const label = args.label ?? (new URL(url).pathname.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home');
const wait = Number(args.wait ?? 2500);
const heightFor = (w) => (w >= 1200 ? 900 : w >= 700 ? 1024 : 844);
const outDir = 'temporary screenshots';
mkdirSync(outDir, { recursive: true });

const chromeBin = ['google-chrome-stable', 'google-chrome', 'chromium', 'chromium-browser'].find((b) =>
  ['/usr/bin', '/usr/local/bin'].some((d) => existsSync(join(d, b))),
);
if (!chromeBin) throw new Error('No Chrome/Chromium found');

const port = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(join(tmpdir(), 'velune-shot-'));
const chrome = spawn(chromeBin, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required', 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(150);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    target = list.find((t) => t.type === 'page');
  } catch {}
}
if (!target) throw new Error('Chrome did not start');

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0;
const pending = new Map();
const listeners = [];
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  else listeners.forEach((fn) => fn(msg));
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const n = ++id;
  pending.set(n, (m) => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)));
  ws.send(JSON.stringify({ id: n, method, params }));
});

const consoleErrors = [];
const failed = [];
const media = [];
const mediaIds = new Map();
const mediaBytes = new Map();
listeners.push((m) => {
  if (m.method === 'Runtime.exceptionThrown') consoleErrors.push(m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text);
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') consoleErrors.push(m.params.entry.text + ' ' + (m.params.entry.url ?? ''));
  if (m.method === 'Network.loadingFinished' && mediaIds.has(m.params.requestId)) { const u = mediaIds.get(m.params.requestId); mediaBytes.set(u, (mediaBytes.get(u) ?? 0) + m.params.encodedDataLength); }
  if (m.method === 'Network.loadingFailed' && !m.params.canceled) failed.push(m.params.errorText + ' ' + (m.params.requestId));
  if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) failed.push(`${m.params.response.status} ${m.params.response.url}`);
  if (m.method === 'Network.requestWillBeSent' && /\.(mp4|webm)(\?|$)/.test(m.params.request.url)) { const u = m.params.request.url.replace(/^https?:\/\/[^/]+/, ''); media.push(u); mediaIds.set(m.params.requestId, u); }
});

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
if (args['reduced-motion']) {
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
}

for (const width of widths) {
  const height = heightFor(width);
  media.length = 0;
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 700 });
  await send('Page.navigate', { url });
  await sleep(wait);
  // Scroll through once so lazy images load, then back to top.
  // Scroll through once (to trigger observers), then force lazy images to load
  // and decode so the full-page capture shows them.
  await send('Runtime.evaluate', {
    awaitPromise: true,
    expression: `(async()=>{
      for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,120))}
      document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager');
      await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));
      scrollTo(0,0);
    })()`,
  });
  await sleep(1000);
  const { result } = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      height: document.documentElement.scrollHeight,
      wide: [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(); return r.right > innerWidth + 1 && getComputedStyle(el).position !== 'fixed'; }).slice(0,5).map(el => el.tagName + '.' + el.className),
      video: (() => { const v = document.querySelector('[data-reel-video]'); return v ? { src: v.currentSrc.replace(location.origin,''), paused: v.paused, live: v.closest('[data-reel]').classList.contains('is-live') } : null })()
    })`,
  });
  const info = result.value;
  const h = Math.min(info.height, 16000);
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 700 });
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: h, scale: 1 } });
  let file = join(outDir, `${label}-${width}.png`);
  for (let n = 2; existsSync(file); n++) file = join(outDir, `${label}-${width}-${n}.png`);
  writeFileSync(file, Buffer.from(shot.data, 'base64'));
  console.log(`\n${file}  (${width}x${height}, page ${info.height}px)`);
  console.log(`  overflow-x: ${info.scrollWidth > info.innerWidth ? `YES (${info.scrollWidth}px) ${info.wide.join(', ')}` : 'none'}`);
  if (info.video) console.log(`  hero video: ${JSON.stringify(info.video)}`);
  console.log(`  media requested: ${[...new Set(media)].map((u) => `${u} (${mediaBytes.has(u) ? Math.round(mediaBytes.get(u) / 1024) + ' KB transferred' : 'still streaming'})`).join(', ') || 'none'}`);
  mediaBytes.clear();
}
console.log(`\nconsole errors: ${consoleErrors.length ? '\n  ' + [...new Set(consoleErrors)].join('\n  ') : 'none'}`);
console.log(`failed requests: ${failed.length ? '\n  ' + [...new Set(failed)].join('\n  ') : 'none'}`);

ws.close();
chrome.kill();
