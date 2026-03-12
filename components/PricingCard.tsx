"use client";

import Link from "next/link";
import { Check } from "lucide-react";

interface Props {
  name: string;
  price: number;
  features: string[];
  highlighted: boolean;
  cta: string;
  ctaHref: string;
}

export default function PricingCard({
  name,
  price,
  features,
  highlighted,
  cta,
  ctaHref,
}: Props) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 border ${
        highlighted
          ? "border-red-500 bg-red-950/10"
          : "border-zinc-800 bg-zinc-900"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-black text-white">
            {price === 0 ? "Free" : `$${price}`}
          </span>
          {price > 0 && <span className="text-zinc-400 mb-1">/month</span>}
        </div>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              className={`w-4 h-4 shrink-0 mt-0.5 ${
                highlighted ? "text-red-400" : "text-green-400"
              }`}
            />
            <span className="text-zinc-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={`w-full text-center font-semibold py-3 rounded-xl transition-colors ${
          highlighted
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}
