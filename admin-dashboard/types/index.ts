export interface StockScreenerValuation {
  Symbol: string;
  MarketCap: number;
  MarketCapPercentage: number;
  PERatio: number;
  PSRatio: number;
  PBRatio: number;
  PFCFRatio: number | null; // To handle null values
  Price: number;
  EnterpriseValue: number;
  EVRevenue: number;
  EVEBIT: number;
  EVEBITDA: number;
}

export interface StockScreenerIncomeStatement {
  Symbol: string;
  Revenue: number;
  RevenueGrowth: number;
  GrossProfit: number;
  OperatingIncome: number;
  NetIncome: number;
  EPS_Diluted: number;
}

export interface SectorWeightage {
  Sector: string;
  NumberOfCompanies: number;
  Weightage: number;
  MarketCap: number;
}
