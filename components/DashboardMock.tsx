import {
  BarChart3,
  BookOpen,
  LayoutDashboard,
  Package,
  Receipt,
  RefreshCw,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import CountUp from "./CountUp";

const sidebar = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Receipt, label: "Billing" },
  { icon: Package, label: "Stock" },
  { icon: ShoppingCart, label: "Purchases" },
  { icon: BookOpen, label: "Accounts" },
  { icon: Users, label: "Customers" },
  { icon: BarChart3, label: "Reports" },
];

const tiles = [
  { label: "Today's sales", value: 48250, delta: "+12% vs yesterday", up: true },
  { label: "Profit today", value: 6920, delta: "14.3% margin", up: true },
  { label: "Receivables", value: 342800, delta: "₹41,200 overdue", up: false },
  { label: "Stock value", value: 1864000, delta: "1,284 items", up: true },
];

const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const monthlySales = [3.2, 3.6, 3.1, 4.0, 4.4, 3.9, 4.8, 5.1, 4.6, 5.4, 5.9, 6.3]; // ₹ lakh

const bills = [
  { no: "INV-2481", party: "Sri Lakshmi Traders", mode: "UPI", amt: "₹12,480" },
  { no: "INV-2480", party: "Walk-in customer", mode: "Cash", amt: "₹1,935" },
  { no: "INV-2479", party: "Ganesh Provisions", mode: "Credit", amt: "₹28,600" },
  { no: "INV-2478", party: "Annapurna Stores", mode: "UPI", amt: "₹7,215" },
];

const modeStyle: Record<string, string> = {
  UPI: "bg-soft text-brand",
  Cash: "bg-wash text-slate",
  Credit: "bg-coral/10 text-coral",
};

export default function DashboardMock() {
  const max = Math.max(...monthlySales);

  return (
    <div className="relative">
      {/* Floating insight cards */}
      <div className="absolute -bottom-8 -left-6 z-10 hidden w-52 rounded-2xl border border-line bg-white p-4 shadow-lift lg:block xl:-left-14">
        <div className="flex items-center gap-2 text-xs font-medium text-slate">
          <RefreshCw className="size-3.5 text-brand" aria-hidden /> Capital rotation
        </div>
        <p className="mt-1.5 font-mono text-2xl font-medium text-ink">
          <CountUp value={6.2} decimals={1} suffix="×" />
        </p>
        <p className="mt-1 text-xs text-emerald">Stock money turned 6.2 times this year</p>
      </div>
      <div className="absolute -right-6 -top-10 z-10 hidden w-56 rounded-2xl border border-line bg-white px-4 py-3 shadow-lift lg:block xl:-right-14">
        <div className="flex items-center gap-2 text-xs font-medium text-slate">
          <span className="size-2 rounded-full bg-coral" aria-hidden /> Dead stock
        </div>
        <p className="mt-1.5 font-mono text-2xl font-medium text-ink">₹1.8L</p>
        <p className="mt-1 text-xs text-coral">Idle 90+ days · 37 items</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift ring-1 ring-brand/5">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-line bg-wash px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#F87171]" />
            <span className="size-2.5 rounded-full bg-[#FBBF24]" />
            <span className="size-2.5 rounded-full bg-[#34D399]" />
          </div>
          <div className="mx-auto w-full max-w-xs rounded-md border border-line bg-white px-3 py-1 text-center font-mono text-[11px] text-faint">
            grosumoERP · Dashboard
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-48 shrink-0 border-r border-line bg-wash/60 p-3 md:block">
            <div className="mb-4 flex items-center gap-2 px-2 pt-1">
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand font-bold text-white">g</span>
              <span className="text-sm font-semibold text-ink">Lakshmi Stores</span>
            </div>
            <ul className="space-y-0.5">
              {sidebar.map(({ icon: Icon, label, active }) => (
                <li
                  key={label}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                    active ? "bg-white font-semibold text-brand shadow-sm" : "text-slate"
                  }`}
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-2 text-[11px] text-slate">
              <Settings className="size-3.5" aria-hidden /> Backup done · 9:00 PM
            </div>
          </aside>

          {/* Main */}
          <div className="min-w-0 flex-1 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-bold tracking-tight text-ink">Good evening 👋</p>
                <p className="text-xs text-faint">Here&apos;s how the shop is doing today</p>
              </div>
              <span className="rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white">+ New bill</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
              {tiles.map(t => (
                <div key={t.label} className="rounded-xl border border-line bg-white p-3 sm:p-4">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-faint">{t.label}</p>
                  <p className="mt-1.5 font-mono text-base font-medium text-ink sm:text-lg">
                    <CountUp value={t.value} prefix="₹" format="inr" />
                  </p>
                  <p className={`mt-1 text-[11px] font-medium ${t.up ? "text-emerald" : "text-coral"}`}>{t.delta}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
              {/* 12-month bar chart */}
              <div className="rounded-xl border border-line bg-white p-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold text-ink">Sales, last 12 months</p>
                  <p className="font-mono text-[11px] text-faint">₹ lakh</p>
                </div>
                <div className="mt-4 flex h-36 items-end gap-1.5 sm:gap-2" role="img" aria-label="Bar chart of monthly sales rising from 3.2 to 6.3 lakh rupees">
                  {monthlySales.map((v, i) => (
                    <div key={months[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                      <div
                        className={`w-full rounded-t-[4px] ${i === monthlySales.length - 1 ? "bg-brand" : "bg-brand/20"}`}
                        style={{ height: `${(v / max) * 100}%` }}
                      />
                      <span className="font-mono text-[9px] text-faint">{months[i].slice(0, 1)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent bills */}
              <div className="rounded-xl border border-line bg-white">
                <p className="border-b border-line px-4 py-3 text-sm font-semibold text-ink">Recent bills</p>
                <ul>
                  {bills.map(b => (
                    <li key={b.no} className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-ink">{b.party}</p>
                        <p className="font-mono text-[10px] text-faint">{b.no}</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${modeStyle[b.mode]}`}>{b.mode}</span>
                      <span className="font-mono text-[13px] text-ink">{b.amt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-faint">Illustrative screen with sample figures.</p>
    </div>
  );
}
