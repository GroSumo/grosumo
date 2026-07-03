# grosumoERP — website (Next.js 14, TypeScript, Tailwind)

## Run
    npm install
    npm run dev   # http://localhost:3000

## Pages
- /            Home — hero dashboard, suite grid, intelligence rows, offline, services, pricing teaser
- /product     18 modules in 4 groups + "a day with grosumoERP"
- /pricing     Year 1 free / Year 2 discounted / Year 3 standard + FAQ
- /services    Accounting & CA, Legal, Marketing
- /contact     Direct contact + enquiry form (mailto — wire to your backend later)

## Structure
- app/globals.css          design system (dark evergreen theme, buttons, cards, animations)
- components/ui.tsx        Nav, Footer, PageHero (shared)
- components/DashboardMock.tsx  the hero product mock
- components/home.tsx      homepage sections
- components/motion.tsx    Reveal + CountUp helpers

All figures are sample data (labeled on the page). Replace the phone number
placeholder in app/contact/page.tsx.
