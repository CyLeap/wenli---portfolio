import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { htbProfile, machines } from "../writeups/machines.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = (process.env.SITE_URL || "https://johnathann.site").replace(/\/$/, "");

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const inlineStyles = `
:root {
  --ink: #080a08;
  --ink-2: #0d100d;
  --panel: #111510;
  --panel-2: #161b16;
  --line: #293126;
  --line-soft: rgba(208, 225, 203, .14);
  --acid: #b7ff2a;
  --acid-2: #9fef00;
  --paper: #edf1e9;
  --silver: #cbd2c8;
  --muted: #929c8f;
  --easy: #3fb950;
  --medium: #d29922;
  --hard: #f85149;
  --pad: clamp(20px, 5vw, 76px);
}
* { box-sizing: border-box; }
html { max-width: 100%; overflow-x: hidden; scroll-behavior: smooth; scrollbar-color: var(--acid) var(--ink); }
body { width: 100%; max-width: 100%; margin: 0; overflow-x: hidden; background: var(--ink); color: var(--paper); font-family: Manrope, Arial, sans-serif; letter-spacing: 0; }
body::before { content: ""; position: fixed; inset: 0; z-index: -2; opacity: .035; pointer-events: none; background-image: linear-gradient(rgba(183,255,42,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(183,255,42,.35) 1px, transparent 1px); background-size: 54px 54px; }
a { color: inherit; text-decoration: none; }
button { color: inherit; font: inherit; }
img { display: block; max-width: 100%; }
::selection { background: var(--acid); color: var(--ink); }
.skip-link { position: fixed; top: 10px; left: 10px; z-index: 100; padding: 10px 14px; background: var(--acid); color: var(--ink); transform: translateY(-150%); }
.skip-link:focus { transform: none; }
.site-header { position: sticky; top: 0; z-index: 50; min-height: 70px; padding: 0 var(--pad); display: flex; align-items: center; gap: 24px; border-bottom: 1px solid var(--line); background: rgba(8,10,8,.93); backdrop-filter: blur(18px); }
.brand { display: inline-flex; align-items: center; gap: 11px; font-weight: 800; }
.brand-mark { width: 34px; aspect-ratio: 1; display: grid; place-items: center; background: var(--acid); color: var(--ink); }
.header-context { color: var(--muted); font: 10px "IBM Plex Mono", monospace; text-transform: uppercase; }
.header-nav { margin-left: auto; display: flex; align-items: center; gap: 10px; }
.header-link { min-height: 38px; padding: 0 13px; display: inline-flex; align-items: center; border: 1px solid var(--line); color: var(--silver); font: 9px "IBM Plex Mono", monospace; text-transform: uppercase; transition: border-color .2s, color .2s, background .2s; }
.header-link:hover, .header-link:focus-visible { color: var(--acid); border-color: var(--acid); outline: none; }
.header-link.primary { color: var(--ink); background: var(--acid); border-color: var(--acid); }
.hero { min-height: min(760px, calc(100svh - 70px)); position: relative; padding: clamp(90px, 13vw, 170px) var(--pad) 70px; display: flex; align-items: flex-end; overflow: hidden; border-bottom: 1px solid var(--line); }
.hero-media { position: absolute; inset: 0; z-index: -1; }
.hero-media img { width: 100%; height: 100%; object-fit: cover; object-position: 70% 25%; filter: grayscale(1) contrast(1.12) brightness(.42); opacity: .58; }
.hero-media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, var(--ink) 8%, rgba(8,10,8,.86) 44%, rgba(8,10,8,.22)), linear-gradient(0deg, var(--ink), transparent 54%); }
.hero-copy { width: min(900px, 100%); position: relative; z-index: 1; }
.breadcrumb, .eyebrow { color: var(--acid); font: 10px "IBM Plex Mono", monospace; text-transform: uppercase; }
.breadcrumb a { color: var(--muted); }
.breadcrumb a:hover { color: var(--acid); }
.hero h1 { margin: 24px 0 12px; font-size: clamp(64px, 12vw, 160px); line-height: .82; letter-spacing: 0; }
.hero-subtitle { margin: 0 0 28px; color: var(--silver); font: clamp(13px, 1.4vw, 18px) "IBM Plex Mono", monospace; text-transform: uppercase; }
.badge-row, .tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
.badge, .tag { padding: 8px 10px; border: 1px solid var(--line); color: var(--silver); font: 9px "IBM Plex Mono", monospace; text-transform: uppercase; }
.badge.easy { border-color: var(--easy); color: var(--easy); }
.badge.retired { border-style: dashed; }
.hero-mark { position: absolute; right: var(--pad); bottom: 60px; width: clamp(120px, 18vw, 250px); aspect-ratio: 1; display: grid; place-items: center; border: 1px solid rgba(183,255,42,.38); color: var(--acid); font: 800 clamp(46px, 8vw, 110px) "IBM Plex Mono", monospace; opacity: .65; }
.overview { padding: 0 var(--pad); border-bottom: 1px solid var(--line); background: var(--ink-2); }
.overview-inner { width: min(1180px, 100%); margin: 0 auto; display: grid; grid-template-columns: 1.35fr .65fr; }
.summary { padding: 42px 42px 42px 0; border-right: 1px solid var(--line); }
.summary p { max-width: 760px; margin: 12px 0 24px; color: var(--silver); font-size: clamp(17px, 2vw, 23px); line-height: 1.65; }
.difficulty { padding: 42px 0 42px 42px; }
.meter { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin-top: 18px; }
.meter i { height: 7px; background: var(--line); }
.meter i.active { background: var(--easy); box-shadow: 0 0 14px rgba(63,185,80,.3); }
.meter-label { margin-top: 11px; display: flex; justify-content: space-between; color: var(--muted); font: 8px "IBM Plex Mono", monospace; text-transform: uppercase; }
.machine-facts { border-bottom: 1px solid var(--line); }
.fact-grid { width: min(1180px, calc(100% - var(--pad) * 2)); margin: 0 auto; display: grid; grid-template-columns: repeat(6, 1fr); }
.fact { min-width: 0; padding: 24px 18px; border-right: 1px solid var(--line); }
.fact:first-child { border-left: 1px solid var(--line); }
.fact dt { color: var(--muted); font: 8px "IBM Plex Mono", monospace; text-transform: uppercase; }
.fact dd { margin: 9px 0 0; overflow-wrap: anywhere; color: var(--paper); font-size: 12px; }
.layout { width: min(1280px, 100%); margin: 0 auto; padding: 80px var(--pad) 120px; display: grid; grid-template-columns: 240px minmax(0, 850px); gap: clamp(45px, 8vw, 110px); justify-content: center; }
.embargo-layout { display: block; padding-top: 80px; }
.embargo-panel { min-height: 470px; padding: clamp(38px, 6vw, 82px); display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: clamp(50px, 8vw, 120px); border-top: 1px solid var(--acid); border-bottom: 1px solid var(--line); background: var(--ink-2); }
.embargo-heading h2 { max-width: 610px; margin: 18px 0 0; font-size: clamp(52px, 7vw, 104px); line-height: .92; }
.embargo-copy { align-self: center; }
.embargo-copy > p { max-width: 680px; margin: 0 0 18px; color: var(--muted); font-size: clamp(16px, 1.5vw, 20px); line-height: 1.8; }
.embargo-facts { margin: 34px 0 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.embargo-fact { min-width: 0; padding: 20px 16px; border-right: 1px solid var(--line); }
.embargo-fact:last-child { border-right: 0; }
.embargo-fact span { display: block; color: var(--muted); font: 8px "IBM Plex Mono", monospace; text-transform: uppercase; }
.embargo-fact strong { display: block; margin-top: 9px; overflow-wrap: anywhere; color: var(--paper); font: 11px "IBM Plex Mono", monospace; text-transform: uppercase; }
.embargo-copy .share { margin-top: 34px; }
.toc { position: sticky; top: 100px; align-self: start; border-top: 1px solid var(--acid); }
.toc-title { padding: 16px 0; color: var(--acid); font: 9px "IBM Plex Mono", monospace; text-transform: uppercase; }
.toc ol { margin: 0; padding: 0; list-style: none; }
.toc a { display: block; padding: 11px 0; border-top: 1px solid var(--line); color: var(--muted); font: 10px "IBM Plex Mono", monospace; transition: color .2s, padding .2s; }
.toc a:hover, .toc a:focus-visible { padding-left: 7px; color: var(--acid); outline: none; }
.author-card { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--line); }
.author-card span { display: block; margin-bottom: 8px; color: var(--muted); font: 8px "IBM Plex Mono", monospace; text-transform: uppercase; }
.author-card strong { color: var(--paper); }
.author-card p { margin: 8px 0 0; color: var(--muted); font-size: 11px; line-height: 1.6; }
.article-section { padding: 0 0 76px; scroll-margin-top: 100px; }
.section-kicker { color: var(--acid); font: 9px "IBM Plex Mono", monospace; }
.article-section h2 { margin: 12px 0 28px; font-size: clamp(34px, 5vw, 60px); line-height: 1; }
.article-section h3 { margin: 34px 0 14px; font-size: 21px; }
.article-section > p, .section-body > p { color: var(--muted); line-height: 1.85; }
.port-table, .tool-table { width: 100%; border-collapse: collapse; margin: 26px 0; font-size: 12px; }
.port-table th, .port-table td, .tool-table th, .tool-table td { padding: 14px; border: 1px solid var(--line); text-align: left; }
.port-table th, .tool-table th { color: var(--acid); background: var(--panel); font: 9px "IBM Plex Mono", monospace; text-transform: uppercase; }
.port-table td:first-child, .tool-table td:first-child { color: var(--silver); font-family: "IBM Plex Mono", monospace; }
.finding-list, .takeaway-list, .step-list { margin: 22px 0; padding: 0; list-style: none; counter-reset: steps; }
.finding-list li, .takeaway-list li, .step-list li { position: relative; padding: 13px 12px 13px 37px; border-top: 1px solid var(--line); color: var(--silver); line-height: 1.65; }
.finding-list li:last-child, .takeaway-list li:last-child, .step-list li:last-child { border-bottom: 1px solid var(--line); }
.finding-list li::before, .takeaway-list li::before { content: ">"; position: absolute; left: 12px; color: var(--acid); font-family: "IBM Plex Mono", monospace; }
.step-list li { counter-increment: steps; }
.step-list li::before { content: counter(steps, decimal-leading-zero); position: absolute; left: 8px; color: var(--acid); font: 9px "IBM Plex Mono", monospace; }
.code-shell { position: relative; margin: 24px 0; border: 1px solid var(--line); border-left: 3px solid var(--acid); background: #0b0e0b; }
.code-bar { min-height: 40px; padding: 0 12px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line); color: var(--muted); font: 8px "IBM Plex Mono", monospace; text-transform: uppercase; }
.copy-code { padding: 6px 8px; border: 1px solid var(--line); background: transparent; color: var(--silver); font: 8px "IBM Plex Mono", monospace; cursor: pointer; }
.copy-code:hover, .copy-code:focus-visible { border-color: var(--acid); color: var(--acid); outline: none; }
pre { margin: 0; padding: 20px; overflow-x: auto; color: var(--paper); font: 11px/1.75 "IBM Plex Mono", Consolas, monospace; tab-size: 2; }
code .comment { color: #6f7b6b; }
code .prompt { color: var(--acid); }
.accuracy-note { margin: 28px 0; padding: 18px; border: 1px solid var(--medium); color: #e2c66f; background: rgba(210,153,34,.06); font-size: 12px; line-height: 1.7; }
.accuracy-note strong { display: block; margin-bottom: 8px; color: var(--medium); font: 9px "IBM Plex Mono", monospace; text-transform: uppercase; }
.spoiler-shell { position: relative; min-height: 260px; margin-top: 24px; border: 1px solid var(--line); background: var(--panel); overflow: hidden; }
.spoiler-content { padding: 26px; filter: blur(8px); user-select: none; transition: filter .35s; }
.spoiler-overlay { position: absolute; inset: 0; z-index: 2; padding: 24px; display: grid; place-items: center; text-align: center; background: rgba(8,10,8,.74); border: 0; cursor: pointer; }
.spoiler-overlay span { max-width: 420px; }
.spoiler-overlay strong { display: block; color: var(--acid); font: 600 13px "IBM Plex Mono", monospace; text-transform: uppercase; }
.spoiler-overlay small { display: block; margin-top: 10px; color: var(--silver); line-height: 1.6; }
.spoiler-shell.revealed .spoiler-content { filter: none; user-select: auto; }
.spoiler-shell.revealed .spoiler-overlay { display: none; }
.flag-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.flag { padding: 24px; border: 1px solid var(--line); background: #0b0e0b; }
.flag span { color: var(--muted); font: 8px "IBM Plex Mono", monospace; text-transform: uppercase; }
.flag strong { display: block; margin: 16px 0 8px; color: var(--acid); font: 22px "IBM Plex Mono", monospace; }
.flag code { color: var(--silver); font: 10px "IBM Plex Mono", monospace; }
.chain { display: flex; flex-wrap: wrap; align-items: stretch; margin: 28px 0 38px; }
.chain-step { position: relative; flex: 1 1 150px; min-height: 92px; padding: 18px 28px 18px 14px; display: flex; align-items: center; border: 1px solid var(--line); border-right: 0; color: var(--silver); font: 9px/1.5 "IBM Plex Mono", monospace; }
.chain-step:last-child { border-right: 1px solid var(--line); color: var(--acid); }
.chain-step:not(:last-child)::after { content: ">"; position: absolute; right: 10px; color: var(--acid); }
.share { padding-top: 36px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px; border-top: 1px solid var(--line); }
.share span { margin-right: auto; color: var(--muted); font: 9px "IBM Plex Mono", monospace; text-transform: uppercase; }
.share a { padding: 11px 13px; border: 1px solid var(--line); color: var(--silver); font: 9px "IBM Plex Mono", monospace; }
.share a:hover { border-color: var(--acid); color: var(--acid); }
.more-writeups { padding: 54px var(--pad); border-top: 1px solid var(--line); background: var(--ink-2); }
.more-inner { width: min(1180px, 100%); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
.more-inner p { margin: 0; color: var(--muted); }
.next-link { text-align: right; }
.next-link span { display: block; color: var(--muted); font: 8px "IBM Plex Mono", monospace; text-transform: uppercase; }
.next-link strong { display: block; margin-top: 7px; color: var(--acid); font-size: 22px; }
footer { min-height: 110px; padding: 30px var(--pad); display: flex; align-items: center; justify-content: space-between; gap: 24px; border-top: 1px solid var(--line); color: var(--muted); font: 9px "IBM Plex Mono", monospace; }
.index-hero { min-height: 560px; }
.index-hero h1 { max-width: 980px; font-size: clamp(56px, 10vw, 140px); }
.writeup-list { width: min(1180px, calc(100% - var(--pad) * 2)); margin: 0 auto; padding: 80px 0 120px; border-top: 1px solid var(--line); }
.writeup-row { display: grid; grid-template-columns: 56px 1fr auto; gap: 24px; align-items: center; padding: 28px 0; border-bottom: 1px solid var(--line); transition: padding .2s, color .2s; }
.writeup-row:hover { padding-left: 12px; color: var(--acid); }
.writeup-row .number { color: var(--acid); font: 9px "IBM Plex Mono", monospace; }
.writeup-row h2 { margin: 0 0 8px; font-size: clamp(25px, 4vw, 42px); }
.writeup-row p { margin: 0; color: var(--muted); font-size: 12px; }
.writeup-meta { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
@media (max-width: 900px) {
  .header-context { display: none; }
  .hero-mark { opacity: .25; }
  .overview-inner, .layout { grid-template-columns: 1fr; }
  .summary { padding-right: 0; border-right: 0; border-bottom: 1px solid var(--line); }
  .difficulty { padding-left: 0; }
  .fact-grid { grid-template-columns: repeat(3, 1fr); }
  .fact:nth-child(4) { border-left: 1px solid var(--line); }
  .toc { position: static; }
  .toc ol { display: grid; grid-template-columns: 1fr 1fr; }
  .toc a { padding-right: 12px; }
  .embargo-panel { grid-template-columns: 1fr; gap: 38px; }
  .embargo-heading h2 { max-width: 760px; }
}
@media (max-width: 620px) {
  .site-header { width: 100%; min-height: 62px; padding: 0 16px; gap: 12px; }
  .brand { flex: none; }
  .header-nav { position: absolute; right: 16px; flex: 0 0 38px; width: 38px; min-width: 38px; }
  .header-nav .header-link:not(.primary) { display: none; }
  .header-link.primary { width: 38px; min-width: 38px; padding: 0; justify-content: center; overflow: hidden; font-size: 0; }
  .header-link.primary::before { content: "<"; font-size: 14px; }
  .hero { width: 100%; min-height: 690px; padding-left: 20px; padding-right: 20px; }
  .hero-copy { width: 100%; min-width: 0; }
  .hero-media img { object-position: 62% 20%; }
  .hero h1 { font-size: clamp(52px, 18vw, 84px); overflow-wrap: anywhere; }
  .hero-mark { display: none; }
  .overview { padding: 0 20px; }
  .overview-inner, .summary, .difficulty { width: 100%; min-width: 0; }
  .summary p, .hero-subtitle, .badge, .tag { overflow-wrap: anywhere; }
  .summary, .difficulty { padding-top: 30px; padding-bottom: 30px; }
  .fact-grid { width: calc(100% - 40px); grid-template-columns: 1fr 1fr; }
  .fact:nth-child(odd) { border-left: 1px solid var(--line); }
  .layout { padding: 60px 20px 90px; }
  .embargo-layout { padding-top: 50px; }
  .embargo-panel { min-height: 0; padding: 34px 0; gap: 30px; }
  .embargo-heading h2 { font-size: clamp(44px, 14vw, 68px); }
  .embargo-copy > p { font-size: 15px; }
  .embargo-facts { grid-template-columns: 1fr; }
  .embargo-fact { border-right: 0; border-bottom: 1px solid var(--line); }
  .embargo-fact:last-child { border-bottom: 0; }
  .toc ol { grid-template-columns: 1fr; }
  .article-section { padding-bottom: 60px; }
  .port-table { display: block; overflow-x: auto; }
  .spoiler-content { padding: 18px; }
  .flag-grid { grid-template-columns: 1fr; }
  .chain { display: grid; grid-template-columns: 1fr; }
  .chain-step, .chain-step:last-child { border-right: 1px solid var(--line); border-bottom: 0; }
  .chain-step:last-child { border-bottom: 1px solid var(--line); }
  .chain-step:not(:last-child)::after { content: "v"; bottom: 6px; right: 14px; top: auto; }
  .more-inner, footer { align-items: flex-start; flex-direction: column; }
  .next-link { text-align: left; }
  .writeup-list { width: calc(100% - 40px); }
  .writeup-row { grid-template-columns: 36px 1fr; }
  .writeup-meta { grid-column: 2; justify-content: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`;

const codeBlock = ([language, label, code]) => `
  <div class="code-shell">
    <div class="code-bar"><span>${escapeHtml(label)} / ${escapeHtml(language)}</span><button class="copy-code" type="button">COPY</button></div>
    <pre><code data-language="${escapeHtml(language)}">${escapeHtml(code)}</code></pre>
  </div>`;

const list = (items, className) => `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

const spoiler = (content, label = "SPOILER - Click to reveal", flag = false) => `
  <div class="spoiler-shell" data-spoiler${flag ? " data-flags" : ""}>
    <div class="spoiler-content">${content}</div>
    <button class="spoiler-overlay" type="button" aria-expanded="false">
      <span><strong>${label}</strong><small>Authorized Hack The Box lab notes for learning purposes only.</small></span>
    </button>
  </div>`;

const articleScript = `
document.querySelectorAll('[data-spoiler]').forEach((shell) => {
  shell.querySelector('.spoiler-overlay').addEventListener('click', () => {
    if (shell.hasAttribute('data-flags') && !window.confirm('Reveal the user and root proof sections?')) return;
    shell.classList.add('revealed');
    shell.querySelector('.spoiler-overlay').setAttribute('aria-expanded', 'true');
  });
});
document.querySelectorAll('.copy-code').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = button.closest('.code-shell').querySelector('code').textContent;
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = 'COPIED';
      setTimeout(() => { button.textContent = 'COPY'; }, 1800);
    } catch { button.textContent = 'SELECT'; }
  });
});
document.querySelectorAll('pre code').forEach((code) => {
  const lines = code.textContent.split('\\n').map((line) => {
    const safe = line.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    if (line.trim().startsWith('#')) return '<span class="comment">' + safe + '</span>';
    return safe.replace(/^(\\$|msf6[^>]*>|debug>)/, '<span class="prompt">$1</span>');
  });
  code.innerHTML = lines.join('\\n');
});
`;

const isRetired = (machine) => machine.status.toLowerCase() === "retired";

function renderEmbargoedMachine(machine) {
  const canonical = `${siteUrl}/writeups/${machine.slug}/`;
  const description = `${machine.name} HTB writeup page by wenli #KH. Detailed lab notes are held until Hack The Box confirms official retirement.`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#080a08" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23b7ff2a'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-size='18'%3E%E6%96%87%3C/text%3E%3C/svg%3E" />
  <title>${escapeHtml(machine.name)} HTB Writeup | wenli Cybersecurity Portfolio</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="author" content="wenli #KH" />
  <meta name="robots" content="noindex, nofollow, noarchive" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(machine.name)} HTB Writeup | wenli Cybersecurity Portfolio" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${siteUrl}/assets/wenli-anime.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>${inlineStyles}</style>
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/" aria-label="wenli portfolio home"><span class="brand-mark">文</span><span>wenli</span></a>
    <span class="header-context">HTB / authorized lab notes</span>
    <nav class="header-nav" aria-label="Writeup navigation"><a class="header-link" href="/writeups/">All writeups</a><a class="header-link primary" href="/" aria-label="Back to portfolio">Back to portfolio</a></nav>
  </header>
  <main>
    <section class="hero">
      <div class="hero-media"><img src="/assets/wenli-anime.png" alt="" /></div>
      <div class="hero-copy"><div class="breadcrumb"><a href="/writeups/">Writeups</a> / ${escapeHtml(machine.slug)}</div><h1>${escapeHtml(machine.name)}</h1><p class="hero-subtitle">Hack The Box machine notes by wenli #KH</p><div class="badge-row"><span class="badge easy">${escapeHtml(machine.status)}</span><span class="badge">${escapeHtml(machine.os)}</span><span class="badge retired">Publication held</span></div></div>
      <div class="hero-mark" aria-hidden="true">${escapeHtml(machine.name.slice(0, 2).toUpperCase())}</div>
    </section>
    <div class="layout embargo-layout">
      <article id="article">
        <section class="article-section embargo-panel">
          <div class="embargo-heading"><span class="section-kicker">PUBLICATION EMBARGO</span><h2>Notes held until retirement.</h2></div>
          <div class="embargo-copy">
            <p>Hack The Box permits public walkthroughs only for officially retired content. Reconnaissance, exploitation steps, credentials, and proof paths will remain private until this machine is confirmed as retired.</p>
            <p>The route is already prepared and will become a complete writeup after retirement.</p>
            <div class="embargo-facts"><div class="embargo-fact"><span>Machine</span><strong>${escapeHtml(machine.name)}</strong></div><div class="embargo-fact"><span>Current status</span><strong>${escapeHtml(machine.status)}</strong></div><div class="embargo-fact"><span>Publication</span><strong>Held</strong></div></div>
            <div class="share"><a class="header-link primary" href="${htbProfile}" target="_blank" rel="noreferrer">View wenli #KH on HTB</a><a class="header-link" href="/writeups/">Browse public writeups</a></div>
          </div>
        </section>
      </article>
    </div>
  </main>
  <footer><span>© 2026 THAY BUNLEAP / WENLI</span><span>AUTHORIZED LAB DOCUMENTATION</span></footer>
  <script type="module" src="/analytics.js"></script>
</body>
</html>`;
}

function renderMachine(machine, index) {
  if (!isRetired(machine)) return renderEmbargoedMachine(machine);

  const canonical = `${siteUrl}/writeups/${machine.slug}/`;
  const description = `Hack The Box ${machine.name} writeup by wenli #KH. ${machine.status} ${machine.os} lab covering ${machine.techniques.join(", ")}.`;
  const keywords = [`HTB ${machine.name}`, "Hack The Box writeup", "wenli", "penetration testing", ...machine.cves, ...machine.techniques].join(", ");
  const next = machines[(index + 1) % machines.length];
  const cveTags = machine.cves.length ? machine.cves : ["No named CVE"];
  const enumerationDetail = `
    ${list(machine.enumeration.findings, "finding-list")}
    ${machine.enumeration.commands.map(codeBlock).join("")}`;
  const footholdDetail = `
    <p>${escapeHtml(machine.foothold.body)}</p>
    ${list(machine.foothold.steps, "step-list")}
    ${machine.foothold.commands.map(codeBlock).join("")}`;
  const postDetail = `
    <p>${escapeHtml(machine.post.body)}</p>
    ${list(machine.post.steps, "step-list")}
    ${machine.post.commands.map(codeBlock).join("")}`;
  const flagsDetail = `
    <div class="flag-grid">
      <div class="flag"><span>User proof</span><strong>••••••••••••••••</strong><code>${escapeHtml(machine.userPath)}</code></div>
      <div class="flag"><span>Root proof</span><strong>••••••••••••••••</strong><code>${escapeHtml(machine.rootPath)}</code></div>
    </div>`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${machine.name} HTB Writeup`,
    description,
    author: { "@type": "Person", name: "wenli", alternateName: "Thay Bunleap", url: htbProfile },
    dateModified: "2026-08-15",
    mainEntityOfPage: canonical,
    image: `${siteUrl}/assets/wenli-anime.png`,
    about: ["Hack The Box", ...machine.techniques, ...machine.cves]
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#080a08" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23b7ff2a'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-size='18'%3E%E6%96%87%3C/text%3E%3C/svg%3E" />
  <title>${escapeHtml(machine.name)} HTB Writeup | wenli Cybersecurity Portfolio</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="keywords" content="${escapeHtml(keywords)}" />
  <meta name="author" content="wenli #KH" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(machine.name)} HTB Writeup | wenli Cybersecurity Portfolio" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${siteUrl}/assets/wenli-anime.png" />
  <meta property="og:site_name" content="wenli Cybersecurity Portfolio" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>${inlineStyles}</style>
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>
</head>
<body>
  <a class="skip-link" href="#article">Skip to writeup</a>
  <header class="site-header">
    <a class="brand" href="/" aria-label="wenli portfolio home"><span class="brand-mark">文</span><span>wenli</span></a>
    <span class="header-context">HTB / authorized lab notes</span>
    <nav class="header-nav" aria-label="Writeup navigation">
      <a class="header-link" href="/writeups/">All writeups</a>
      <a class="header-link primary" href="/" aria-label="Back to portfolio">Back to portfolio</a>
    </nav>
  </header>
  <main>
    <section class="hero">
      <div class="hero-media"><img src="/assets/wenli-anime.png" alt="" /></div>
      <div class="hero-copy">
        <div class="breadcrumb"><a href="/writeups/">Writeups</a> / ${escapeHtml(machine.slug)}</div>
        <h1>${escapeHtml(machine.name)}</h1>
        <p class="hero-subtitle">Hack The Box machine writeup by wenli #KH</p>
        <div class="badge-row">
          <span class="badge easy">${escapeHtml(machine.status)}</span>
          <span class="badge">${escapeHtml(machine.os)}</span>
          ${machine.status.toLowerCase().includes("retired") ? '<span class="badge retired">Retired</span>' : ""}
        </div>
      </div>
      <div class="hero-mark" aria-hidden="true">${escapeHtml(machine.name.slice(0, 2).toUpperCase())}</div>
    </section>
    <section class="overview" aria-label="Writeup overview">
      <div class="overview-inner">
        <div class="summary"><span class="eyebrow">Quick summary / no spoilers</span><p>${escapeHtml(machine.summary)}</p><div class="tag-row">${[...cveTags, ...machine.techniques].map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div></div>
        <div class="difficulty"><span class="eyebrow">Difficulty meter</span><div class="meter" aria-label="Easy difficulty, one of five"><i class="active"></i><i></i><i></i><i></i><i></i></div><div class="meter-label"><span>Easy</span><span>Hard</span></div></div>
      </div>
    </section>
    <section class="machine-facts" aria-label="Machine details">
      <dl class="fact-grid">
        <div class="fact"><dt>Machine</dt><dd>${escapeHtml(machine.name)}</dd></div>
        <div class="fact"><dt>Operating system</dt><dd>${escapeHtml(machine.os)}</dd></div>
        <div class="fact"><dt>Points</dt><dd>${escapeHtml(machine.points)}</dd></div>
        <div class="fact"><dt>Release</dt><dd>${escapeHtml(machine.releaseDate)}</dd></div>
        <div class="fact"><dt>Completed</dt><dd>${escapeHtml(machine.completed)}</dd></div>
        <div class="fact"><dt>Author</dt><dd><a href="${htbProfile}" target="_blank" rel="noreferrer">wenli #KH</a></dd></div>
      </dl>
    </section>
    <div class="layout">
      <aside class="toc" aria-label="Table of contents">
        <div class="toc-title">Table of contents</div>
        <ol>
          <li><a href="#recon">01 / Reconnaissance</a></li>
          <li><a href="#enumeration">02 / Enumeration</a></li>
          <li><a href="#foothold">03 / Exploitation</a></li>
          <li><a href="#post">04 / Post-exploitation</a></li>
          <li><a href="#flags">05 / Root and flags</a></li>
          <li><a href="#chain">06 / Attack chain</a></li>
        </ol>
        <a class="author-card" href="${htbProfile}" target="_blank" rel="noreferrer"><span>HTB operator</span><strong>wenli #KH</strong><p>Cybersecurity student, startup founder, and software builder from Cambodia.</p></a>
      </aside>
      <article id="article">
        <section class="article-section" id="recon">
          <span class="section-kicker">01 / ALWAYS VISIBLE</span><h2>Reconnaissance</h2>
          ${codeBlock(["bash", "Full TCP scan", machine.nmap])}
          <h3>Port summary</h3>
          <table class="port-table"><thead><tr><th>Port</th><th>Service</th><th>Assessment</th></tr></thead><tbody>${machine.ports.map(([port, service, note]) => `<tr><td>${escapeHtml(port)}</td><td>${escapeHtml(service)}</td><td>${escapeHtml(note)}</td></tr>`).join("")}</tbody></table>
          <h3>Initial observations</h3>${list(machine.observations, "finding-list")}
          ${machine.accuracyNote ? `<div class="accuracy-note"><strong>Verification required</strong>${escapeHtml(machine.accuracyNote)}</div>` : ""}
        </section>
        <section class="article-section" id="enumeration">
          <span class="section-kicker">02 / PARTIAL SPOILER</span><h2>Enumeration</h2><p>${escapeHtml(machine.enumeration.body)}</p>
          ${spoiler(enumerationDetail, "SPOILER - Reveal enumeration evidence")}
        </section>
        <section class="article-section" id="foothold">
          <span class="section-kicker">03 / SPOILER</span><h2>Exploitation: foothold</h2>
          ${spoiler(footholdDetail)}
        </section>
        <section class="article-section" id="post">
          <span class="section-kicker">04 / SPOILER</span><h2>Post-exploitation</h2>
          ${spoiler(postDetail)}
        </section>
        <section class="article-section" id="flags">
          <span class="section-kicker">05 / CONFIRMATION REQUIRED</span><h2>Root and flags</h2><p>The proof values remain masked. The paths document where each milestone was collected without publishing reusable flag strings.</p>
          ${spoiler(flagsDetail, "SPOILER - Confirm to reveal proof paths", true)}
        </section>
        <section class="article-section" id="chain">
          <span class="section-kicker">06 / ALWAYS VISIBLE</span><h2>Attack chain summary</h2>
          <div class="chain">${machine.chain.map((step) => `<div class="chain-step">${escapeHtml(step)}</div>`).join("")}</div>
          <h3>Tools used</h3><table class="tool-table"><thead><tr><th>Tool</th><th>Purpose</th></tr></thead><tbody>${machine.tools.map(([tool, use]) => `<tr><td>${escapeHtml(tool)}</td><td>${escapeHtml(use)}</td></tr>`).join("")}</tbody></table>
          <h3>Key takeaways</h3>${list(machine.takeaways, "takeaway-list")}
          <div class="share"><span>Share this writeup</span><a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`${machine.name} HTB Writeup by wenli #KH`)}&url=${encodeURIComponent(canonical)}" target="_blank" rel="noreferrer">X / Twitter</a><a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}" target="_blank" rel="noreferrer">LinkedIn</a></div>
        </section>
      </article>
    </div>
    <section class="more-writeups"><div class="more-inner"><div><span class="eyebrow">Continue the lab notes</span><p>More authorized Hack The Box walkthroughs from the same portfolio.</p></div><a class="next-link" href="/writeups/${next.slug}/"><span>Next writeup</span><strong>${escapeHtml(next.name)} &gt;</strong></a></div></section>
  </main>
  <footer><span>© 2026 THAY BUNLEAP / WENLI</span><span>AUTHORIZED LAB DOCUMENTATION</span></footer>
  <script>${articleScript}</script>
  <script type="module" src="/analytics.js"></script>
</body>
</html>`;
}

function renderIndex() {
  const canonical = `${siteUrl}/writeups/`;
  const publicMachines = machines.filter(isRetired);
  const description = "Hack The Box writeups by wenli #KH, with detailed walkthroughs published only after official machine retirement.";
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "HTB Writeups | wenli Cybersecurity Portfolio",
    url: canonical,
    description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: publicMachines.map((machine, index) => ({ "@type": "ListItem", position: index + 1, name: `${machine.name} HTB Writeup`, url: `${siteUrl}/writeups/${machine.slug}/` }))
    }
  };
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#080a08" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23b7ff2a'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-size='18'%3E%E6%96%87%3C/text%3E%3C/svg%3E" />
  <title>HTB Writeups | wenli Cybersecurity Portfolio</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="keywords" content="Hack The Box writeups, HTB Cambodia, wenli, cybersecurity portfolio, penetration testing labs" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="HTB Writeups | wenli Cybersecurity Portfolio" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${siteUrl}/assets/wenli-anime.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>${inlineStyles}</style>
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>
</head>
<body>
  <header class="site-header"><a class="brand" href="/"><span class="brand-mark">文</span><span>wenli</span></a><span class="header-context">HTB / authorized lab notes</span><nav class="header-nav"><a class="header-link primary" href="/" aria-label="Back to portfolio">Back to portfolio</a></nav></header>
  <main>
    <section class="hero index-hero"><div class="hero-media"><img src="/assets/wenli-anime.png" alt="" /></div><div class="hero-copy"><div class="breadcrumb"><a href="/">Portfolio</a> / writeups</div><h1>HTB Writeups</h1><p class="hero-subtitle">Authorized lab notes by wenli #KH</p><div class="badge-row"><a class="badge easy" href="${htbProfile}" target="_blank" rel="noreferrer">View HTB profile</a><span class="badge">${publicMachines.length} public / ${machines.length - publicMachines.length} held</span><span class="badge">Cambodia / #KH</span></div></div><div class="hero-mark" aria-hidden="true">HTB</div></section>
    <section class="overview"><div class="overview-inner"><div class="summary"><span class="eyebrow">Method over shortcuts</span><p>Clear records of reconnaissance, validation, exploitation, and remediation lessons from legal Hack The Box environments.</p></div><div class="difficulty"><span class="eyebrow">Scope</span><div class="tag-row"><span class="tag">Web</span><span class="tag">Linux</span><span class="tag">API</span><span class="tag">Privilege escalation</span></div></div></div></section>
    <section class="writeup-list" aria-label="Machine writeups">${machines.map((machine, index) => `<a class="writeup-row" href="/writeups/${machine.slug}/"><span class="number">${String(index + 1).padStart(2, "0")}</span><div><h2>${escapeHtml(machine.name)}</h2><p>${isRetired(machine) ? escapeHtml(machine.techniques.join(" / ")) : "Detailed notes publish after official retirement"}</p></div><div class="writeup-meta"><span class="badge easy">${escapeHtml(machine.status)}</span><span class="badge">${isRetired(machine) ? escapeHtml(machine.os) : "Held"}</span></div></a>`).join("")}</section>
  </main>
  <footer><span>© 2026 THAY BUNLEAP / WENLI</span><span>AUTHORIZED LAB DOCUMENTATION</span></footer>
  <script type="module" src="/analytics.js"></script>
</body>
</html>`;
}

for (const [index, machine] of machines.entries()) {
  const output = resolve(root, "writeups", machine.slug, "index.html");
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, renderMachine(machine, index), "utf8");
}

writeFileSync(resolve(root, "writeups", "index.html"), renderIndex(), "utf8");

const sitemapUrls = [siteUrl, `${siteUrl}/writeups/`, ...machines.filter(isRetired).map((machine) => `${siteUrl}/writeups/${machine.slug}/`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url><loc>${url}</loc><lastmod>2026-08-15</lastmod></url>`).join("\n")}
</urlset>\n`;
writeFileSync(resolve(root, "public", "sitemap.xml"), sitemap, "utf8");
writeFileSync(resolve(root, "public", "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, "utf8");

console.log(`Generated ${machines.length} HTB writeups and the writeup index for ${siteUrl}.`);
