// AUTO-GENERATED for tenant "abc" — do not edit by hand
// Generated at: 2026-09-10T10:05:40.352Z
import type { TenantConfiguration } from '../../../../libs/productization/src/types';

export const tenantConfiguration: TenantConfiguration = {
  "tenant": {
    "id": "abc",
    "name": "ABC Securities"
  },
  "products": {
    "trading": {
      "enabled": true,
      "watchlist": {
        "defaultSize": 8
      },
      "otp": {
        "inputLength": 6
      },
      "advancedOrders": {
        "enabled": true
      }
    },
    "kyc": {
      "enabled": true
    },
    "reports": {
      "enabled": false
    }
  }
};
