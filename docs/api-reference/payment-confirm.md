# Payment Confirm

This API is used for a Merchant to complete its payment. The Merchant must call Confirm Payment API to actually complete the payment. However, when "capture" parameter is "false" on payment reservation, the payment status becomes AUTHORIZATION, and the payment is completed only after "Capture API" is called.

## Type signature

```typescript
class Client {
    confirmPayment(options: OptionsConfirmPayment): Promise<any>
    ...
}
```

The type of OptionsConfirmPayment :
```typescript
type OptionsConfirmPayment = {
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
   * A transaction ID issued by LINE Pay, for payment or refund.
   */
  transactionId: string;
};
```

## Usage

```js
client.confirmPayment(options)
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
* 1124: Error in amount (scale).
* 1141: Account status error.
* 1142: Insufficient balance remains.
* 1150: No transactions found.
* 1152: Transaction has already been made.
* 1153: Request amount is different from real amount.
* 1159: Omitted request payment information.
* 1169: Payment method and password must be certificated by LINE Pay.
* 1170: User’s account remains have been changed.
* 1172: Existing same orderId.
* 1180: Expired the payment date.
* 1198: Duplicated the request calling API.
* 1199: Internal request error.
* 1280: Temporary error occurred while making payment with credit card
* 1281: Credit card payment error
* 1282: Credit card authorization error
* 1283: The payment has been rejected due to suspected fraud
* 1284: Credit card payment is temporarily not available.
* 1285: Omitted credit card information
* 1286: Incorrect credit card payment information
* 1287: Credit card expiration date has passed.
* 1288: Credit card has insufficient funds.
* 1289: Maximum credit card limite exceeded
* 1290: One-time payment limit exceeded
* 1291: This card has been reported stolen.
* 1292: This card has been suspended.
* 1293: Invalid Card Verification Number (CVN)
* 1294: This card is blacklisted.
* 1295: Invalid credit card number
* 1296: Invalid amount
* 1298: The Credit card payment declined.
* 9000: Internal error
