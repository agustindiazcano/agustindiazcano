// Rewrites the block between the AI-USAGE markers in README.md using the same
// telemetry snapshot that powers https://www.agustindiazcano.com/agents-usage
import { readFileSync, writeFileSync } from 'node:fs';

const SOURCE = 'https://raw.githubusercontent.com/agustindiazcano/agustindiazcano.com/main/src/data/claude-usage/current.json';
const README = new URL('../../README.md', import.meta.url);
const START = '<!-- AI-USAGE:START -->';
const END = '<!-- AI-USAGE:END -->';

const res = await fetch(SOURCE);
if (!res.ok) throw new Error(`Could not fetch usage data: HTTP ${res.status}`);
const usage = await res.json();

const agents = [
  { name: 'Claude Code', tokens: usage.claudeTotalTokens, sessions: usage.sessions },
  { name: 'Antigravity', tokens: usage.antigravity?.totalTokens, sessions: usage.antigravity?.sessions },
  { name: 'Codex', tokens: usage.codex?.totalTokens, sessions: usage.codex?.sessions },
  { name: 'Meta Muse', tokens: usage.metamuse?.totalTokens, sessions: usage.metamuse?.sessions },
  { name: 'Grok', tokens: usage.grok?.totalTokens, sessions: usage.grok?.sessions },
  { name: 'Cursor', tokens: usage.cursor?.totalTokens ?? 0, sessions: usage.cursor?.sessions ?? 0 },
];
for (const a of agents) {
  if (!Number.isFinite(a.tokens) || !Number.isFinite(a.sessions)) {
    throw new Error(`Unexpected usage data for ${a.name}: ${JSON.stringify(a)}`);
  }
}

const total = agents.reduce((sum, a) => sum + a.tokens, 0);
const sessions = agents.reduce((sum, a) => sum + a.sessions, 0);
const fmt = (n) => (n >= 1e9 ? `${(n / 1e9).toFixed(2)}B` : `${(n / 1e6).toFixed(1)}M`);
const ranked = [...agents].sort((a, b) => b.tokens - a.tokens);

const rows = ranked.map((a) =>
  a.tokens > 0
    ? `| ${a.name} | ${fmt(a.tokens)} | ${a.sessions} | ${((a.tokens / total) * 100).toFixed(1)}% |`
    : `| ${a.name} | server-side only | ${a.sessions} | n/a |`
);

const block = [
  START,
  `**${fmt(total)} tokens** across **${sessions} sessions** in the last 30 days (${usage.period}), from six AI coding agents. That is about ${Math.round(total / 51e6)} months of a median developer (51M tokens/month) or ${Math.round(total / 380e6)} months of a 90th-percentile developer (380M tokens/month), per the [Jellyfish Q1 2026 study](https://jellyfish.co/blog/is-tokenmaxxing-cost-effective-new-data-from-jellyfish-explains/).`,
  '',
  '| Agent | Tokens | Sessions | Share |',
  '|---|---:|---:|---:|',
  ...rows,
  '',
  'Cursor usage is tracked server-side, so it exposes no local token counters. Updated automatically from the data behind the [AI Usage dashboard](https://www.agustindiazcano.com/agents-usage).',
  END,
].join('\n');

const readme = readFileSync(README, 'utf8');
const start = readme.indexOf(START);
const end = readme.indexOf(END);
if (start === -1 || end === -1 || end < start) throw new Error('AI-USAGE markers not found in README.md');

const next = readme.slice(0, start) + block + readme.slice(end + END.length);
if (next !== readme) writeFileSync(README, next);
console.log(next === readme ? 'README already up to date' : 'README updated');
