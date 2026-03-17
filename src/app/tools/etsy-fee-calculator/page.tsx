"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { ProGate } from "@/components/ProGate";
import { calculateEtsyFees, type EtsyFeeInput, type EtsyFeeBreakdown } from "@/lib/etsy-fees";
import { incrementUsage, remainingUses, FREE_TIER_LIMIT } from "@/lib/usage-tracker";
import { isPro } from "@/lib/pro-check";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function FeeBar({ label, amount, total }: { label: string; amount: number; total: number }) {
  const pct = total > 0 ? (amount / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-40 text-muted shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
        <div
          className="bg-accent h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.max(pct, 1)}%` }}
        />
      </div>
      <span className="w-20 text-right font-mono text-xs">{fmt(amount)}</span>
    </div>
  );
}

export default function EtsyFeeCalculatorPage() {
  const [input, setInput] = useState<EtsyFeeInput>({
    salePrice: 25,
    shippingCharged: 5,
    shippingCost: 3,
    itemCost: 8,
    offsiteAds: false,
    offsiteAdsRate: 0.15,
  });

  const [result, setResult] = useState<EtsyFeeBreakdown | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const pro = typeof window !== "undefined" ? isPro() : false;

  const calculate = useCallback(() => {
    if (!pro) {
      incrementUsage();
      setRemaining(remainingUses());
    }
    setResult(calculateEtsyFees(input));
  }, [input, pro]);

  const update = (field: keyof EtsyFeeInput, value: number | boolean) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const exportCsv = () => {
    if (!result) return;
    const rows = [
      ["Item", "Amount"],
      ["Sale Price", fmt(input.salePrice)],
      ["Shipping Charged", fmt(input.shippingCharged)],
      ["Gross Revenue", fmt(result.grossRevenue)],
      ["Listing Fee", fmt(result.listingFee)],
      ["Transaction Fee (6.5%)", fmt(result.transactionFee)],
      ["Payment Processing Fee", fmt(result.paymentProcessingFee)],
      ["Offsite Ads Fee", fmt(result.offsiteAdsFee)],
      ["Total Fees", fmt(result.totalFees)],
      ["COGS", fmt(input.itemCost)],
      ["Shipping Cost", fmt(input.shippingCost)],
      ["Net Profit", fmt(result.netProfit)],
      ["Profit Margin", `${result.profitMargin}%`],
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "etsy-fee-breakdown.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="Etsy Fee Calculator"
      description="Calculate your real profit after all Etsy fees, shipping costs, and COGS."
    >
      {/* Input Form */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="block">
          <span className="text-sm text-muted">Item Sale Price</span>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={input.salePrice}
              onChange={(e) => update("salePrice", parseFloat(e.target.value) || 0)}
              className="w-full border border-border rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-sm text-muted">Shipping Charged to Buyer</span>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={input.shippingCharged}
              onChange={(e) => update("shippingCharged", parseFloat(e.target.value) || 0)}
              className="w-full border border-border rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-sm text-muted">Actual Shipping Cost (to you)</span>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={input.shippingCost}
              onChange={(e) => update("shippingCost", parseFloat(e.target.value) || 0)}
              className="w-full border border-border rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-sm text-muted">Item Cost (COGS)</span>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={input.itemCost}
              onChange={(e) => update("itemCost", parseFloat(e.target.value) || 0)}
              className="w-full border border-border rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </label>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={input.offsiteAds}
            onChange={(e) => update("offsiteAds", e.target.checked)}
            className="rounded"
          />
          Offsite Ads
        </label>
        {input.offsiteAds && (
          <select
            value={input.offsiteAdsRate}
            onChange={(e) => update("offsiteAdsRate", parseFloat(e.target.value) as 0.15 | 0.12)}
            className="border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-accent"
          >
            <option value={0.15}>15% (under $10k/yr)</option>
            <option value={0.12}>12% ($10k+/yr)</option>
          </select>
        )}
      </div>

      <button
        onClick={calculate}
        className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
      >
        Calculate Fees
      </button>

      {remaining !== null && !pro && (
        <p className="text-xs text-muted mt-2">
          {remaining} / {FREE_TIER_LIMIT} free calculations remaining this month
        </p>
      )}

      {/* Results */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="text-xs text-muted uppercase tracking-wide">Gross Revenue</p>
              <p className="text-xl font-bold mt-1">{fmt(result.grossRevenue)}</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="text-xs text-muted uppercase tracking-wide">Total Fees</p>
              <p className="text-xl font-bold mt-1 text-red-500">{fmt(result.totalFees)}</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="text-xs text-muted uppercase tracking-wide">Net Profit</p>
              <p className={`text-xl font-bold mt-1 ${result.netProfit >= 0 ? "text-green-600" : "text-red-500"}`}>
                {fmt(result.netProfit)}
              </p>
            </div>
          </div>

          {/* Fee Breakdown Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-border">
                  <th className="text-left px-4 py-2.5 font-medium text-muted">Fee Type</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5">Listing Fee</td>
                  <td className="px-4 py-2.5 text-right font-mono">{fmt(result.listingFee)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5">Transaction Fee (6.5%)</td>
                  <td className="px-4 py-2.5 text-right font-mono">{fmt(result.transactionFee)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5">Payment Processing (3% + $0.25)</td>
                  <td className="px-4 py-2.5 text-right font-mono">{fmt(result.paymentProcessingFee)}</td>
                </tr>
                {input.offsiteAds && (
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5">Offsite Ads ({input.offsiteAdsRate * 100}%)</td>
                    <td className="px-4 py-2.5 text-right font-mono">{fmt(result.offsiteAdsFee)}</td>
                  </tr>
                )}
                <tr className="border-b border-border bg-red-50">
                  <td className="px-4 py-2.5 font-medium">Total Etsy Fees</td>
                  <td className="px-4 py-2.5 text-right font-mono font-medium text-red-600">{fmt(result.totalFees)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5">Item Cost (COGS)</td>
                  <td className="px-4 py-2.5 text-right font-mono">{fmt(input.itemCost)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5">Shipping Cost</td>
                  <td className="px-4 py-2.5 text-right font-mono">{fmt(input.shippingCost)}</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-2.5 font-medium">Net Profit</td>
                  <td className={`px-4 py-2.5 text-right font-mono font-medium ${result.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {fmt(result.netProfit)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Profit Margin */}
          <div className="text-center py-3 border border-border rounded-lg">
            <span className="text-muted text-sm">Profit Margin: </span>
            <span className={`font-bold ${result.profitMargin >= 0 ? "text-green-600" : "text-red-500"}`}>
              {result.profitMargin}%
            </span>
          </div>

          {/* Visual Fee Breakdown */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-3">Fee Breakdown</h3>
            <FeeBar label="Listing Fee" amount={result.listingFee} total={result.grossRevenue} />
            <FeeBar label="Transaction Fee" amount={result.transactionFee} total={result.grossRevenue} />
            <FeeBar label="Processing Fee" amount={result.paymentProcessingFee} total={result.grossRevenue} />
            {input.offsiteAds && (
              <FeeBar label="Offsite Ads" amount={result.offsiteAdsFee} total={result.grossRevenue} />
            )}
          </div>

          {/* Pro Feature: CSV Export */}
          <ProGate isPro={pro}>
            <button
              onClick={exportCsv}
              className="border border-border rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              Export as CSV
            </button>
          </ProGate>
        </div>
      )}
    </ToolLayout>
  );
}
