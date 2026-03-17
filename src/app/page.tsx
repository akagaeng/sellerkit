import Link from "next/link";

const tools = [
  {
    title: "Etsy Fee Calculator",
    description: "Calculate your real profit after all Etsy fees, shipping, and costs.",
    href: "/tools/etsy-fee-calculator",
    tag: "Free",
  },
];

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">
          Know your real profit.
        </h1>
        <p className="text-muted mt-2 text-lg">
          Free calculators and tools for ecommerce sellers.
        </p>
      </div>

      <div className="grid gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block border border-border rounded-lg p-5 hover:border-accent transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold group-hover:text-accent transition-colors">
                  {tool.title}
                </h2>
                <p className="text-muted text-sm mt-1">{tool.description}</p>
              </div>
              <span className="text-xs bg-accent-light text-accent px-2 py-0.5 rounded font-medium">
                {tool.tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
