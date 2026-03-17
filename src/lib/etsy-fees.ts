export interface EtsyFeeInput {
  salePrice: number;
  shippingCharged: number;
  shippingCost: number;
  itemCost: number;
  offsiteAds: boolean;
  offsiteAdsRate: 0.15 | 0.12;
}

export interface EtsyFeeBreakdown {
  listingFee: number;
  transactionFee: number;
  paymentProcessingFee: number;
  offsiteAdsFee: number;
  totalFees: number;
  totalCosts: number;
  grossRevenue: number;
  netProfit: number;
  profitMargin: number;
}

export function calculateEtsyFees(input: EtsyFeeInput): EtsyFeeBreakdown {
  const { salePrice, shippingCharged, shippingCost, itemCost, offsiteAds, offsiteAdsRate } = input;

  const grossRevenue = salePrice + shippingCharged;

  // Etsy listing fee: $0.20 per listing
  const listingFee = 0.2;

  // Transaction fee: 6.5% of (item price + shipping charged to buyer)
  const transactionFee = round(grossRevenue * 0.065);

  // Payment processing fee: 3% + $0.25
  const paymentProcessingFee = round(grossRevenue * 0.03 + 0.25);

  // Offsite ads fee: 15% (or 12% for high-volume sellers) of item price
  const offsiteAdsFee = offsiteAds ? round(salePrice * offsiteAdsRate) : 0;

  const totalFees = round(listingFee + transactionFee + paymentProcessingFee + offsiteAdsFee);
  const totalCosts = round(itemCost + shippingCost);
  const netProfit = round(grossRevenue - totalFees - totalCosts);
  const profitMargin = grossRevenue > 0 ? round((netProfit / grossRevenue) * 100) : 0;

  return {
    listingFee,
    transactionFee,
    paymentProcessingFee,
    offsiteAdsFee,
    totalFees,
    totalCosts,
    grossRevenue,
    netProfit,
    profitMargin,
  };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
