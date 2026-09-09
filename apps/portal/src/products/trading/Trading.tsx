import {
  useProductization,
} from "../../../../../libs/productization/src/ProductizationProvider";

export default function Trading() {
  const { configuration } = useProductization();

  const trading = configuration.products.trading;

  return (
    <div>
      <h2>Trading</h2>

      <p>
        This is the Trading product.
      </p>

      <hr />

      <h3>Trading Configuration</h3>

      <p>
        Watchlist default size:{" "}
        {trading.watchlist.defaultSize}
      </p>

      <p>
        OTP input length:{" "}
        {trading.otp.inputLength}
      </p>

      {trading.advancedOrders.enabled && (
        <p>
          Advanced Orders: Enabled
        </p>
      )}
    </div>
  );
}