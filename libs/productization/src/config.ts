import type {
  TenantConfiguration,
} from "./types";

export const tenantConfigurations: Record<
  string,
  TenantConfiguration
> = {
  abc: {
    tenant: {
      id: "abc",
      name: "ABC Securities",
    },

    products: {
      trading: {
        enabled: true,

        watchlist: {
          defaultSize: 8,
        },

        otp: {
          inputLength: 6,
        },

        advancedOrders: {
          enabled: true,
        },
      },

      kyc: {
        enabled: true,
      },

      reports: {
        enabled: false,
      },
    },
  },

  xyz: {
    tenant: {
      id: "xyz",
      name: "XYZ Capital",
    },

    products: {
      trading: {
        enabled: true,

        watchlist: {
          defaultSize: 10,
        },

        otp: {
          inputLength: 4,
        },

        advancedOrders: {
          enabled: false,
        },
      },

      kyc: {
        enabled: false,
      },

      reports: {
        enabled: true,
      },
    },
  },
};