import type { HostConfig } from '../scripts/host-config';

/**
 * FAST KILL (2026-09-04): outbound Hermes notify senders hard-disabled.
 * Re-enable by setting NOTIFY_SENDERS_DISABLED to false after flood is resolved.
 */
export const NOTIFY_SENDERS_DISABLED = true;

export type NotifySendResult =
  | { sent: false; skipped: true; reason: 'disabled' }
  | { sent: false; error: string }
  | { sent: true };

function notifySkipped(): NotifySendResult {
  return { sent: false, skipped: true, reason: 'disabled' };
}

/** Telegram (@Tolowa_bot) — GSM: motion-telegram-bot-token (via TELEGRAM_BOT_TOKEN env). */
export async function sendTelegramNotify(
  _message: string,
  _options?: { chatId?: string },
): Promise<NotifySendResult> {
  if (NOTIFY_SENDERS_DISABLED) return notifySkipped();
  return { sent: false, error: 'sendTelegramNotify: re-enable NOTIFY_SENDERS_DISABLED first' };
}

/** ntfy publish — GSM: motion-ntfy-hermes-out-topic (via NTFY_HOME_CHANNEL env). */
export async function sendNtfyNotify(
  _message: string,
  _options?: { title?: string; priority?: string },
): Promise<NotifySendResult> {
  if (NOTIFY_SENDERS_DISABLED) return notifySkipped();
  return { sent: false, error: 'sendNtfyNotify: re-enable NOTIFY_SENDERS_DISABLED first' };
}

/** `hermes send -t <target>` CLI path (telegram / ntfy / other Hermes platforms). */
export async function hermesSend(
  _target: string,
  _message: string,
): Promise<NotifySendResult> {
  if (NOTIFY_SENDERS_DISABLED) return notifySkipped();
  return { sent: false, error: 'hermesSend: re-enable NOTIFY_SENDERS_DISABLED first' };
}

/** Healthchecks.io dead-man ping — GSM: motion-hermes-heartbeat-ping-url (via env). */
export async function sendHermesHeartbeatPing(): Promise<NotifySendResult> {
  if (NOTIFY_SENDERS_DISABLED) return notifySkipped();
  return { sent: false, error: 'sendHermesHeartbeatPing: re-enable NOTIFY_SENDERS_DISABLED first' };
}

/** Unified notify entry — all channels hard-stopped while NOTIFY_SENDERS_DISABLED is true. */
export async function notify(
  _channel: 'telegram' | 'ntfy' | 'hermes',
  _message: string,
  _options?: Record<string, unknown>,
): Promise<NotifySendResult> {
  if (NOTIFY_SENDERS_DISABLED) return notifySkipped();
  return { sent: false, error: 'notify: re-enable NOTIFY_SENDERS_DISABLED first' };
}

const hermes: HostConfig = {
  name: 'hermes',
  displayName: 'Hermes',
  cliCommand: 'hermes',
  cliAliases: [],

  globalRoot: '.hermes/skills/gstack',
  localSkillRoot: '.hermes/skills/gstack',
  hostSubdir: '.hermes',
  usesEnvVars: true,

  frontmatter: {
    mode: 'allowlist',
    keepFields: ['name', 'description'],
    descriptionLimit: null,
  },

  generation: {
    generateMetadata: false,
    skipSkills: ['codex'],
    includeSkills: [],
  },

  pathRewrites: [
    { from: '~/.claude/skills/gstack', to: '~/.hermes/skills/gstack' },
    { from: '.claude/skills/gstack', to: '.hermes/skills/gstack' },
    { from: '.claude/skills', to: '.hermes/skills' },
    { from: 'CLAUDE.md', to: 'AGENTS.md' },
  ],
  toolRewrites: {
    'use the Bash tool': 'use the terminal tool',
    'use the Write tool': 'use the patch tool',
    'use the Read tool': 'use the read_file tool',
    'use the Edit tool': 'use the patch tool',
    'use the Agent tool': 'use delegate_task',
    'use the Grep tool': 'search for',
    'use the Glob tool': 'find files matching',
    'the Bash tool': 'the terminal tool',
    'the Read tool': 'the read_file tool',
    'the Write tool': 'the patch tool',
    'the Edit tool': 'the patch tool',
  },

  suppressedResolvers: [
    'DESIGN_OUTSIDE_VOICES',
    'ADVERSARIAL_STEP',
    'CODEX_SECOND_OPINION',
    'CODEX_PLAN_REVIEW',
    'REVIEW_ARMY',
    // GBRAIN_CONTEXT_LOAD and GBRAIN_SAVE_RESULTS are NOT suppressed.
    // The resolvers handle GBrain-not-installed gracefully ("proceed without brain context").
    // If Hermes has GBrain as a mod, brain features activate automatically.
  ],

  runtimeRoot: {
    globalSymlinks: ['bin', 'browse/dist', 'browse/bin', 'gstack-upgrade', 'ETHOS.md'],
    globalFiles: {
      'review': ['checklist.md', 'TODOS-format.md'],
    },
  },

  install: {
    prefixable: false,
    linkingStrategy: 'symlink-generated',
  },

  coAuthorTrailer: 'Co-Authored-By: Hermes Agent <agent@nousresearch.com>',
  learningsMode: 'basic',
};

export default hermes;
