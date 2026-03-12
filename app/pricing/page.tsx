import Link from "next/link";
import { Shield, Check } from "lucide-react";
import PricingCard from "@/components/PricingCard";
import { PLANS } from "@/lib/stripe";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Shield className="w-5 h-5 text-red-400" />
          Spec.cop
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-zinc-400 hover:text-white text-sm">
            Sign in
          </Link>
          <Link
            href="/login"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, honest pricing
          </h1>
          <p className="text-zinc-400 text-lg">
            For teams that want to know exactly how badly they strayed from spec.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PricingCard
            name={PLANS.FREE.name}
            price={PLANS.FREE.price}
            features={[...PLANS.FREE.features]}
            highlighted={false}
            cta="Get Started Free"
            ctaHref="/login"
          />
          <PricingCard
            name={PLANS.PRO.name}
            price={PLANS.PRO.price}
            features={[...PLANS.PRO.features]}
            highlighted={true}
            cta="Start Pro"
            ctaHref="/login"
          />
          <PricingCard
            name={PLANS.TEAM.name}
            price={PLANS.TEAM.price}
            features={[...PLANS.TEAM.features]}
            highlighted={false}
            cta="Start Team"
            ctaHref="/login"
          />
        </div>

        <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Enterprise?</h2>
          <p className="text-zinc-400 mb-6">
            Custom volume pricing, SSO, audit logs, and dedicated support.
            We&apos;ll even help you explain scope creep to your CEO.
          </p>
          <a
            href="mailto:enterprise@speccop.dev"
            className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Contact us
          </a>
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm">
            All plans include a 14-day free trial. No credit card required. Cancel anytime.
            <br />
            We don&apos;t offer refunds for discovering that your team has a scope creep problem.
          </p>
        </div>
      </div>
    </div>
  );
}
