import Link from "next/link";

const tools = [
  {
    title: "Etsy Fee Calculator",
    description: "See exactly how much Etsy takes from each sale — listing fees, transaction fees, payment processing, and your real net profit.",
    href: "/tools/etsy-fee-calculator",
    tag: "Free",
  },
];

const valueProps = [
  {
    title: "Accurate fee breakdowns",
    description: "Every platform fee calculated down to the cent, so you never underestimate costs.",
  },
  {
    title: "Real profit numbers",
    description: "Factor in COGS, shipping, and platform fees to see what you actually take home.",
  },
  {
    title: "Free to use",
    description: "Core calculators are free forever. No signup required.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 pt-20 pb-16">
        <h1 className="text-4xl font-bold tracking-tight leading-tight">
          Know your real profit.
        </h1>
        <p className="text-muted mt-3 text-lg max-w-lg">
          Free calculators and tools that show ecommerce sellers what they actually earn after every fee and cost.
        </p>
        <Link
          href="/tools/etsy-fee-calculator"
          className="inline-block mt-6 bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          Try the Etsy Fee Calculator
        </Link>
      </section>

      {/* Tools */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <h2 className="text-sm font-medium text-muted uppercase tracking-wide mb-4">Tools</h2>
        <div className="grid gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block border border-border rounded-lg p-5 hover:border-accent transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold group-hover:text-accent transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-muted text-sm mt-1">{tool.description}</p>
                </div>
                <span className="text-xs bg-accent-light text-accent px-2 py-0.5 rounded font-medium shrink-0">
                  {tool.tag}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-3xl mx-auto px-4 py-12 border-t border-border">
        <div className="grid sm:grid-cols-3 gap-8">
          {valueProps.map((prop) => (
            <div key={prop.title}>
              <h3 className="font-medium text-sm">{prop.title}</h3>
              <p className="text-muted text-sm mt-1">{prop.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
