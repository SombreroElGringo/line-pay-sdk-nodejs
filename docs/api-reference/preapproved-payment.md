# Preapproved Payment

When the payment type of the Reserve Payment API was set as PREAPPROVED, a regKey is returned with the payment result. Preapproved Payment API uses this regKey to directly complete a payment without using the LINE app.

## Type signature

```typescript
class Client {
    preApprovedPayment(options: OptionsPreApprovedPayment): Promise<any>
    ...
}
```

The type of OptionsPreApprovedPayment :
```typescript
type OptionsPreApprovedPayment = {
  /**
   * Product name
   * (4000 Bytes)
   */
  productName: string;
  /**
   * Payment amount
   */
  amount: number;
  /**
   * Currency following ([ISO 4218](https://ko.wikipedia.org/wiki/ISO_4217))
   * Supported currencies are as follows:
   *
   * - USD
   * - JPY
   * - TWD
   * - THB
   *
   * (3 Bytes)
   */
  currency: "USD" | "JPY" | "TWD" | "THB";
  /**
   * Merchant's order number corresponding to the payment request.
   * A unique number managed by a Merchant.
   * (100 Bytes)
   */
  orderId: string;
  /**
   * Whether to be captured or not
   * - true(Default Value): Authorization and capture are handled at once.
   * - false: Handled Capture process and Called “Capture API” in order to complete a payment.
   */
  capture?: boolean;
  /**
   * Key which is returned from reserve API
   */
  regKey: string;
};
```

## Usage

```js
client.preApprovedPayment(options)
    .then(response => console.log(response))
    .catch(error => console.log(error));
```

## Result Code

* 0000: Successful
* 1101: The purchasing user suspended for transaction.
* 1102: The purchasing user suspended for transaction.
* 1104: Merchant not found.
* 1105: This Merchant cannot use LINE Pay.
* 1106: Header information error
* 1110: Not available credit card.
* 1124: Error in Amount (scale).
* 1141: Account status error.
* 1154: Preapproved payment account not available
* 1172: Existing a transaction with the same order ID.
* 1183: Payment amount must be greater than 0.
* 1190: The regKey does not exist.
* 1193: The regKey expired.
* 1197: Already processing payment with regKey.
* 1198: Duplicated the request calling API.
* 1199: Internal request error.
* 1280: Temporary error while making a payment with credit card
* 1281: Credit card payment error
* 1282: Credit card authorization error
* 1283: The payment has been declined due to suspected fraud.
* 1284: Credit card payment is temporarily not available.
* 1285: Omitted credit card information
* 1286: Incorrect credit card payment information
* 1287: Credit card expiration date has passed.
* 1288: Credit card has insufficient funds.
* 1289: Maximum credit card limit exceeded
* 1290: One-time payment limit exceeded
* 1291: This card has been reported stolen.
* 1292: This card has been suspended.
* 1293: INVALID CARD VERIFICATION NUMBER (CVN)
* 1294: This card is blacklisted.
* 1295: Invalid credit card number
* 1296: Invalid amount
* 1298: The credit card payment declined.
* 9000 : Internal error
### When an error code 1281~287, 1290~1294 occurs, expire the regKey
