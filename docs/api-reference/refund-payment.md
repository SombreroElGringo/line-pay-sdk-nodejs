# Refund Payment

Requests refund of payments made with LINE Pay. To refund a payment, the LINE Pay user's payment transaction Id must be forwarded. A partial refund is also possible depending on the refund amount.

## Type signature

```typescript
class Client {
    refundPayment(options: OptionsRefundPayment): Promise<any>
    ...
}
```

The type of OptionsRefundPayment :
```typescript
type OptionsRefundPayment = {
  /**
   * Refund amoun
   *
   * - Full refund if this parameter is not passed
   */
  refundAmount?: number;
  /**
   * A transaction ID issued by LINE Pay, for payment or refund.
   */
  transactionId: string;
};
```

## Usage

```js
client.refundPayment(options)
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
* 1124: Payment Amount error
* 1150: Transaction record not found.
* 1155: The transaction Id not eligible for Refund.
* 1163: Exceeded the expiration for Refund.
* 1164: Refund limit exceeded.
* 1165: The transaction has already been refunded.
* 1179: Status can not be processed.
* 1198: Duplicated the request calling API.
* 1199: Internal request error.
* 9000: Internal error
