export interface StockScreenerValuation {
  id:number,
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
  id:number,
  Symbol: string;
  Revenue: number;
  RevenueGrowth: number;
  GrossProfit: number;
  OperatingIncome: number;
  NetIncome: number;
  EPS_Diluted: number;
}

export interface SectorWeightage {
  id:number,
  Sector: string;
  NumberOfCompanies: number;
  Weightage: number;
  MarketCap: number;
}
