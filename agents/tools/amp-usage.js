#!/usr/bin/env node

// Standalone Amp Toolbox tool: aggregates per-user Amp spend for a team over a date range.
// Works in any repo (no dependency on local index.js).
// Protocol: https://ampcode.com/manual#toolboxes

const fs = require('fs');
const { URL } = require('url');

const action = process.env.TOOLBOX_ACTION || 'describe';

function println(line) {
  process.stdout.write(String(line) + '\n');
}

function showDescription() {
  // Key-value format, one per line
  println('name: amp-usage');
  println('description: Aggregate Amp per-user spend for a team over a date range. Defaults to last 30 days if from/days not specified. Outputs JSON array of { email, totalTokenCostUSD }.');
  println('apiKey: string Amp API key (optional; falls back to AMP_API_KEY/AMP_TOKEN env)');
  println('team: string Team slug (optional; falls back to AMP_WORKSPACE_NAME env)');
  println('from: string Start date YYYY-MM-DD or DD-MMM-YYYY (optional; defaults to 30 days ago)');
  println('days: number Number of days to include (optional; defaults to 30)');
  println('minSpend: number Minimum USD spend filter (optional; defaults to 0.01)');
  println('base: string API base URL (optional; default https://ampcode.com)');
  println('verbose: boolean Enable verbose logs (optional; defaults to false)');
}

function parseStdinKVPairs() {
  const input = fs.readFileSync(0, 'utf-8');
  const params = {};
  for (const rawLine of input.split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    params[key] = value;
  }
  return params;
}

function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}
function fmtYYYYMMDD(d) {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  return `${y}-${pad(m)}-${pad(day)}`;
}
function addUTCDays(date, n) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + n);
  return d;
}
function parseFromDate(s) {
  if (!s) return null;
  const t = s.trim();
  // Accept YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
    const [y, m, d] = t.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  }
  // Accept DD-MMM-YYYY (e.g., 01-JUN-2025), case-insensitive
  if (/^\d{2}-[A-Za-z]{3}-\d{4}$/.test(t)) {
    const [d, mon, y] = t.split('-');
    const MONTHS = {
      JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
      JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
    };
    const mi = MONTHS[mon.toUpperCase()];
    if (mi === undefined) return null;
    return new Date(Date.UTC(Number(y), mi, Number(d)));
  }
  return null;
}

function isTruthy(v) {
  return /^(1|true|yes)$/i.test(String(v || ''));
}

async function execute() {
  const p = parseStdinKVPairs();

  const apiKey = p.apiKey || process.env.AMP_API_KEY || process.env.AMP_TOKEN || '';
  const team = p.team || process.env.AMP_WORKSPACE_NAME || '';

  // Check for required environment variables first
  const envErrors = [];
  if (!apiKey) {
    envErrors.push('Missing AMP API key.');
    envErrors.push('Please export your AMP API key:');
    envErrors.push('  export AMP_API_KEY="your-api-key-here"');
    envErrors.push('Or provide it as a parameter: apiKey: your-api-key-here');
  }

  if (!team) {
    if (envErrors.length > 0) envErrors.push('');
    envErrors.push('Missing team/workspace name.');
    envErrors.push('Please export your AMP workspace name:');
    envErrors.push('  export AMP_WORKSPACE_NAME="your-workspace-name"');
    envErrors.push('Or provide it as a parameter: team: your-team-name');
  }

  if (envErrors.length > 0) {
    envErrors.forEach(msg => console.error(`[amp-usage toolbox] ${msg}`));
    process.exit(1);
  }

  // Default to 30 days ago if from not provided (UTC)
  let from = p.from || '';
  if (!from) {
    const now = new Date();
    const thirtyDaysAgo = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    thirtyDaysAgo.setUTCDate(thirtyDaysAgo.getUTCDate() - 30);
    from = fmtYYYYMMDD(thirtyDaysAgo); // YYYY-MM-DD
  }

  const days = p.days ? Number(p.days) : 30;
  const minSpend = p.minSpend !== undefined ? Number(p.minSpend) : 0.01;
  const base = (p.base && p.base.trim()) || 'https://ampcode.com';
  const verbose = isTruthy(p.verbose);

  const missing = [];
  if (isNaN(days) || days <= 0) missing.push('days');
  if (missing.length) {
    console.error(`[amp-usage toolbox] invalid parameter(s): ${missing.join(', ')}`);
    process.exit(1);
  }

  const fromDate = parseFromDate(from);
  if (!fromDate) {
    console.error('[amp-usage toolbox] invalid from date. Use YYYY-MM-DD or DD-MMM-YYYY (e.g., 01-JUN-2025).');
    process.exit(1);
  }
  const lookback = Math.floor(days);
  const endDate = fmtYYYYMMDD(addUTCDays(fromDate, lookback - 1));
  const startDate = fmtYYYYMMDD(fromDate);

  function log(...m) {
    if (verbose) console.error(`[amp-usage] ${new Date().toISOString()}`, ...m);
  }

  log('Starting with', { base, team, startDate, endDate, lookback, minSpend });

  const url = new URL(`${base.replace(/\/+$/, '')}/api/v1/teams/${encodeURIComponent(team)}/daily-usage`);
  url.searchParams.set('date', endDate);
  url.searchParams.set('lookback', String(lookback));

  const maskedKey = apiKey ? apiKey.slice(0, 4) + '…' + apiKey.slice(-4) : '';
  log('Requesting:', url.toString());
  log('cURL:', [
    'curl -sS',
    `-H "Authorization: Bearer ${maskedKey}"`,
    '--get',
    `--data-urlencode "date=' + endDate + '"`,
    `--data-urlencode "lookback=' + lookback + '"`,
    `"${base.replace(/\/+$/, '')}/api/v1/teams/${encodeURIComponent(team)}/daily-usage"`,
  ].join(' '));

  if (typeof fetch !== 'function') {
    console.error('[amp-usage toolbox] Node 18+ with global fetch is required.');
    process.exit(3);
  }

  let resp;
  try {
    resp = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
  } catch (err) {
    console.error('[amp-usage toolbox] request failed to start:', err && err.message ? err.message : String(err));
    process.exit(2);
  }

  log('Response status:', resp.status, resp.statusText);

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    console.error(`Request failed: ${resp.status} ${resp.statusText}\n${text}`);
    process.exit(2);
  }

  const json = await resp.json();
  const daysData = (json && json.data) || [];
  log('Days received:', daysData.length, 'metadata:', (json && json.metadata) || {});

  // Aggregate per-user spend
  const userTotals = new Map(); // email -> number
  for (const day of daysData) {
    const users = (day && day.users) || [];
    for (const u of users) {
      const email = u.user || u.email || null;
      if (!email) continue;
      const m = u.metrics || {};
      const cost = Number(m.totalTokenCost || 0);
      userTotals.set(email, (userTotals.get(email) || 0) + cost);
    }
  }

  const result = Array.from(userTotals.entries())
    .map(([email, total]) => ({ email, totalTokenCostUSD: Number(total.toFixed(6)) }))
    .filter((r) => r.totalTokenCostUSD >= minSpend)
    .sort((a, b) => b.totalTokenCostUSD - a.totalTokenCostUSD);

  log('Users exceeding minSpend:', result.length);

  console.log(JSON.stringify(result, null, 2));
}

if (action === 'describe') showDescription();
else if (action === 'execute') execute();
else {
  console.error(`[amp-usage toolbox] unknown TOOLBOX_ACTION: ${action}`);
  process.exit(1);
}
