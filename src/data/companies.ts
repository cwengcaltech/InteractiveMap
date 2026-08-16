import { companyProfiles, type CompanyProfile } from "./companyProfiles";
import rawFinancials from "./generated/financials.json";

export type { CompanyProfile };

export interface AnnualFinancial {
  year: number;
  revenue: number;
  net_income: number;
  gross_margin: number;
  operating_margin: number;
  growth_rate: number;
}

export interface QuarterlyFinancial {
  quarter: string;
  revenue: number;
  net_income: number;
  gross_margin: number;
  growth_rate: number;
}

export interface PredictionFinancial {
  year: number;
  revenue_est: number;
  growth_est: number;
  source: string;
}

export interface Financials {
  currency: string;
  unit: string;
  annual: AnnualFinancial[];
  quarterly: QuarterlyFinancial[];
  predictions: PredictionFinancial[];
}

export interface Company extends CompanyProfile {
  financials: Financials;
}

const financialsById = rawFinancials as Record<string, Financials>;

const EMPTY_FINANCIALS: Financials = {
  currency: "USD",
  unit: "billion_usd",
  annual: [],
  quarterly: [],
  predictions: [],
};

export const companies: Company[] = companyProfiles.map((profile) => ({
  ...profile,
  financials: financialsById[profile.id] ?? EMPTY_FINANCIALS,
}));
