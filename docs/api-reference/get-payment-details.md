# Get Payment Details

Gets the details of payments made with LINE Pay. This API only gets the payments that have been captured.

## Type signature

```typescript
class Client {
    getPaymentDetails(options: OptionsGetPaymentDetails): Promise<any>
    ...
}
```

The type of OptionsGetPaymentDetails :
```typescript
type OptionsGetPaymentDetails = {
  /**
   * A transaction ID issued by LINE Pay, for payment or refund.
   */
  transactionId?: string | string[];
  /**
   * Merchant Transaction Order ID
   */
  orderId?: string | string[];
};
```
* When the API is called, more than one parameter needs to be passed. You can check details of up to 100 transactions.

## Usage

```js
client.getPaymentDetails(options)
    .then(response => console.log(response))
    .catch(error => console.log(error));
```

## Result Code

* 0000: Successful
* 1104: Merchant not found.
* 1105: This Merchant cannot use LINE Pay.
* 1106: Header information error
* 1150: Transaction record not found.
* 1177: Exceeding max number(100) of transactions allowed to retrieve
* 9000 : Internal error
