# Capture

If "capture" is "false" when the Merchant calls the “Reserve Payment API” , the payment is completed only after the Capture API is called.

## Type signature

```typescript
class Client {
    capture(options: OptionsCapture): Promise<any>
    ...
}
```

The type of OptionsCapture :
```typescript
type OptionsCapture = {
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
   * Transaction number issued by LINE Pay
   */
  transactionId: string;
};
```

## Usage

```js
client.capture(options)
    .then(response => console.log(response))
    .catch(error => console.log(error));
```

## Result Code

* 0000: Successful
* 1104: Merchant not found.
* 1105: This Merchant cannot use LINE Pay.
* 1106: Header information error
* 1150: Transaction record not found.
* 1155: Wrong TransactionId
* 1170: User’s account remains have been changed.
* 1172: Existing same orderId.
* 1179: Status can not be processed.
* 1180: Expired the payment date.
* 1183: Payment Amount Error
* 1184: Payment amount exceeds amount requested.
* 1198: Duplicated the request calling API or Called Capture API during processing internal re- authorization. (Re-try in a few minutes)
* 1199: Internal request error.
* 1280: Temporary error occurred while making a payment with credit card
* 1281: Credit card payment error
* 1282: Credit card authorization error
* 1283: The payment has been declined due to suspected fraud.
* 1284: Credit card payment is temporarily not available.
* 1285: Omitted credit card information
* 1286: Incorrect credit card payment information
* 1287: Credit card expiration date has passed.
* 1288: Credit card has insufficient funds.
* 1289: Maximum credit card limit exceeded.
* 1290: One-time payment limit exceeded.
* 1291: This card has been reported stolen.
* 1292: This card has been suspended.
* 1293: INVALID CARD VERIFICATION NUMBER (CVN)
* 1294: This card is blacklisted.
* 1295: Invalid credit card number
* 1296: Invalid amount
* 1298: The credit card payment declined.
* 9000: Internal error
### When an Error code 1199,1280~1298 occurs, the transaction cancels automatically.
