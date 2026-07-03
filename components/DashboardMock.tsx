"use client";

const BARS = [42, 58, 47, 66, 54, 78, 62, 84, 70, 92, 76, 88];
const MONTHS = ["J", "A", "S", "O", "N", "D", "J", "F", "M", "A", "M", "J"];

const NAVI = ["Dashboard", "POS", "Sales", "Quotations", "Purchases", "Inventory", "Customers", "Accounts", "Reports"];

const TOP_ITEMS = [
  { n: "Sunflower Oil 1L", v: "₹48,200", pct: 92 },
  { n: "Atta 10kg", v: "₹36,900", pct: 74 },
  { n: "Kurti style #04", v: "₹31,400", pct: 63 },
  { n: "Toor Dal 1kg", v: "₹22,800", pct: 46 }
];

export function DashboardMock() {
  return (
    <div className="relative">
      {/* floating KPI cards */}
      <div className="glass absolute -top-7 right-4 z-10 hidden px-5 py-3.5 text-left lg:block">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-haze">Capital rotation</div>
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="font-mono text-[26px] font-medium text-mint">6.2×</span>
          <span className="text-[11.5px] text-emerald">↑ faster than last year</span>
        </div>
      </div>
      <div className="glass absolute -left-6 bottom-16 z-10 hidden px-5 py-3.5 text-left lg:block">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-haze">Dead stock alert</div>
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="font-mono text-[22px] font-medium text-amber">₹1.8L</span>
          <span className="text-[11.5px] text-haze">idle 90+ days</span>
        </div>
      </div>

      {/* the app */}
      <div className="app-frame text-left">
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-line bg-wash px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-[9px] w-[9px] rounded-full bg-[#E5ECE8]" />
            <span className="h-[9px] w-[9px] rounded-full bg-[#E5ECE8]" />
            <span className="h-[9px] w-[9px] rounded-full bg-[#E5ECE8]" />
          </div>
          <span className="rounded-md bg-white px-3 py-1 font-mono text-[10.5px] text-slate">
            grosumoERP · localhost:3000
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-brand">
            <span className="live-dot h-[7px] w-[7px] rounded-full bg-emerald" /> offline · local
          </span>
        </div>

        <div className="grid md:grid-cols-[168px_1fr]">
          {/* sidebar */}
          <aside className="hidden flex-col bg-deeper py-4 text-[12.5px] text-haze md:flex">
            <div className="mb-3 px-4">
              <div className="text-[13px] font-semibold text-white">Sri Lakshmi Traders</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-haze">Kadapa · FY 26–27</div>
            </div>
            {NAVI.map((n, i) => (
              <div
                key={n}
                className={`px-4 py-[7px] ${i === 0 ? "border-l-2 border-mint bg-white/5 font-medium text-white" : ""}`}
              >
                {n}
              </div>
            ))}
          </aside>

          {/* main */}
          <div className="bg-white p-4 md:p-5">
            {/* stat row */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["Today's sales", "₹34,760", "+12% vs avg", "text-emerald"],
                ["Profit today", "₹6,120", "after purchases", "text-emerald"],
                ["Receivables", "₹56,300", "₹6.5k over 45d", "text-amber"],
                ["Stock value", "₹8.2L", "1,240 items", "text-slate"]
              ].map(([l, v, s, c]) => (
                <div key={l} className="rounded-xl border border-line bg-wash/60 px-3.5 py-3">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate">{l}</div>
                  <div className="mt-0.5 font-mono text-[19px] font-medium text-ink">{v}</div>
                  <div className={`text-[10.5px] ${c}`}>{s}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
              {/* revenue chart */}
              <div className="rounded-xl border border-line p-4">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold">Sales, last 12 months</span>
                  <span className="font-mono text-[10.5px] text-slate">₹ per month</span>
                </div>
                <div className="flex h-[130px] items-end gap-[6px]">
                  {BARS.map((b, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                      <div
                        className="bar-grow w-full rounded-t-[4px]"
                        style={{
                          height: `${b}%`,
                          animationDelay: `${i * 60}ms`,
                          background:
                            i === BARS.length - 1
                              ? "linear-gradient(180deg,#5EEAB4,#12B981)"
                              : "linear-gradient(180deg,#BCE9D6,#8FD6B9)"
                        }}
                      />
                      <span className="font-mono text-[9px] text-slate">{MONTHS[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* top items */}
              <div className="rounded-xl border border-line p-4">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold">Fast movers</span>
                  <span className="font-mono text-[10.5px] text-slate">30 days</span>
                </div>
                <div className="space-y-3">
                  {TOP_ITEMS.map((t) => (
                    <div key={t.n}>
                      <div className="mb-1 flex justify-between text-[12px]">
                        <span className="text-ink/85">{t.n}</span>
                        <span className="font-mono text-slate">{t.v}</span>
                      </div>
                      <div className="h-[6px] w-full overflow-hidden rounded-full bg-wash">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${t.pct}%`, background: "linear-gradient(90deg,#12B981,#5EEAB4)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
