"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** One credential row with a copy-to-clipboard button. */
export default function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (e.g. insecure context) — the value stays visible and selectable.
    }
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-wash px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-faint">{label}</p>
        <p className="truncate font-mono text-[15px] text-ink select-all">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-line bg-white px-3 py-1.5 text-sm font-semibold text-slate transition-colors hover:border-brand hover:text-brandink"
      >
        {copied ? <Check className="size-4 text-emerald" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
