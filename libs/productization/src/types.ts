export type ProductId =
  | "trading"
  | "kyc"
  | "reports";

export interface Tenant {
  id: string;
  name: string;
}

/**
 * Common configuration for every product.
 */
export interface ProductConfiguration {
  enabled: boolean;
}

/**
 * Trading-specific configuration.
 */
export interface TradingConfiguration
  extends ProductConfiguration {
  watchlist: {
    defaultSize: number;
  };

  otp: {
    inputLength: 4 | 6;
  };

  advancedOrders: {
    enabled: boolean;
  };
}

/**
 * KYC-specific configuration.
 */
export interface KycConfiguration
  extends ProductConfiguration {
  // KYC-specific configuration will go here later.
}

/**
 * Reports-specific configuration.
 */
export interface ReportsConfiguration
  extends ProductConfiguration {
  // Reports-specific configuration will go here later.
}

export interface TenantConfiguration {
  tenant: Tenant;

  products: {
    trading: TradingConfiguration;
    kyc: KycConfiguration;
    reports: ReportsConfiguration;
  };
}