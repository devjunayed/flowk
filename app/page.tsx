import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#060f0c] text-[#e1f5ee] font-sans overflow-x-hidden">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">

        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(93,202,165,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(93,202,165,0.04)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_100%)]" />

        {/* Glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-150 h-100 bg-[radial-gradient(ellipse,rgba(15,110,86,0.25)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-xl text-center animate-[fadeUp_0.7s_ease_both]">

          <div className="inline-block px-4 py-1 rounded-full border border-[#5DCAA5]/30 bg-[#5DCAA5]/10 text-[12px] uppercase tracking-wider text-[#5DCAA5] mb-6">
            Personal finance · Built for clarity
          </div>

          <h1 className="text-[clamp(2.6rem,6vw,4.2rem)] font-bold leading-tight tracking-tight mb-5">
            Know exactly<br />where you stand.
          </h1>

          <p className="text-sm md:text-base text-[#e1f5ee]/50 max-w-md mx-auto mb-8 leading-relaxed">
            Track income, expenses, and debts in one place.
            Flowk shows you two honest numbers — what you have
            and what's truly yours.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/register" className="px-7 py-3 rounded-lg bg-[#0F6E56] text-[#9FE1CB] font-semibold border border-[#5DCAA5]/30 hover:bg-[#1D9E75] hover:text-white transition">
              Start for free
            </Link>
            <Link href="/login" className="text-sm text-white/50 hover:text-white transition">
              Sign in →
            </Link>
          </div>

          {/* Balance Preview */}
          <div className="inline-flex flex-col md:flex-row backdrop-blur-md bg-[#0d1f18]/80 border border-[#5DCAA5]/20 rounded-2xl overflow-hidden">

            <div className="flex flex-col items-start px-6 py-5">
              <span className="text-[11px] uppercase tracking-widest text-white/40">Available balance</span>
              <span className="text-2xl font-bold text-[#5DCAA5]">৳ 42,500</span>
              <span className="text-xs text-white/40">What you can spend today</span>
            </div>

            <div className="hidden md:block w-px bg-[#5DCAA5]/20 my-4" />

            <div className="flex flex-col items-start px-6 py-5">
              <span className="text-[11px] uppercase tracking-widest text-white/40">True balance</span>
              <span className="text-2xl font-bold text-white/50">৳ 32,500</span>
              <span className="text-xs text-white/40">What's actually yours</span>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">

        <p className="text-[11px] uppercase tracking-widest text-[#5DCAA5] mb-2">
          What's inside
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mb-12">
          Everything your finances need
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-xl bg-[#0d1f18]/60 border border-[#5DCAA5]/10 hover:border-[#5DCAA5]/30 hover:bg-[#0d1f18]/90 transition text-left">
              <div className="text-xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">

        <p className="text-[11px] uppercase tracking-widest text-[#5DCAA5] mb-2">
          The difference
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          Two balances. Full clarity.
        </h2>

        <div className="grid gap-5 md:grid-cols-3 text-left">
          {howItems.map((item, i) => (
            <div key={i} className="p-6 rounded-xl border border-[#5DCAA5]/10 bg-[#5DCAA5]/5">
              <div className="text-xs font-bold tracking-widest text-[#5DCAA5]/70 mb-2">
                {`0${i + 1}`}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mb-16 max-w-lg px-6 py-12 text-center rounded-2xl border border-[#5DCAA5]/20 bg-[#0F6E56]/10">
        <h2 className="text-2xl font-bold mb-2">Finance, clearly.</h2>
        <p className="text-white/50 text-sm mb-6">
          Free to use. No credit card required.
        </p>
        <Link href="/register" className="px-8 py-3 rounded-lg bg-[#0F6E56] hover:bg-[#1D9E75] transition font-semibold">
          Create your account
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#5DCAA5]/10 px-6 py-6 max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2 font-bold">
          <span>Flowk</span>
        </div>
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Flowk. Built with Next.js & Prisma.
        </p>
      </footer>
    </main>
  )
}

const features = [
  { icon: '💰', title: 'Income tracking', desc: 'Salary, freelance, business — log every source with categories and notes.' },
  { icon: '📊', title: 'Expense management', desc: 'Full category breakdown. Tag expenses to specific debts for complete traceability.' },
  { icon: '🔗', title: 'Debt traceability', desc: 'See exactly how borrowed money was spent. Know what you owe and to whom.' },
  { icon: '📅', title: 'Monthly summaries', desc: 'Auto-generated overview every month. Export to PDF in one click.' },
  { icon: '📈', title: 'Yearly insights', desc: '12-month chart with filter tabs: income, expenses, savings, debt activity.' },
  { icon: '🌙', title: 'Dark & light mode', desc: 'Your eyes, your choice. Theme preference saved to your profile.' },
]

const howItems = [
  {
    title: 'Available balance',
    desc: 'Income + borrowed money − expenses. What you can actually spend right now.',
  },
  {
    title: 'True balance',
    desc: 'Income − expenses − outstanding debt. Your real net worth.',
  },
  {
    title: 'Debt traceability',
    desc: 'Tag expenses to debts and track exactly how borrowed money was used.',
  },
]