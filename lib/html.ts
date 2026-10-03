export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type EmailRow = [label: string, value: string];

/** Plain-text body: one "Label: value" line per row. */
export function rowsToText(rows: readonly EmailRow[]): string {
  return rows.map(([label, value]) => `${label}: ${value}`).join("\n");
}

/**
 * Minimal, dependency-free transactional email layout. Every interpolated
 * value is escaped, because form fields are attacker-controlled.
 */
export function renderEmail(options: {
  heading: string;
  rows: readonly EmailRow[];
  message?: string;
}): string {
  const rows = options.rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5b6b78;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;color:#0b1118;white-space:pre-line"><strong>${escapeHtml(value)}</strong></td></tr>`,
    )
    .join("");

  const message = options.message
    ? `<p style="margin:20px 0 4px;color:#5b6b78">Message</p><p style="margin:0;white-space:pre-wrap;color:#0b1118">${escapeHtml(options.message)}</p>`
    : "";

  return [
    '<div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px;line-height:1.5;color:#0b1118">',
    `<h2 style="margin:0 0 16px;font-size:18px">${escapeHtml(options.heading)}</h2>`,
    `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table>`,
    message,
    "</div>",
  ].join("");
}
