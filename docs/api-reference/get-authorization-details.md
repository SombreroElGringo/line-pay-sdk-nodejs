# Get Authorization Details

Gets the details authorized with LINE Pay. This API only gets data that is authorized or whose authorization is voided; the one that is already captured can be viewed by using "Get Payment Details API”.

## Type signature

```typescript
class Client {
    getAuthorizationDetails(options: OptionsGetAuthorizationDetails): Promise<any>
    ...
}
```

The type of OptionsGetAuthorizationDetails :
```typescript
type OptionsGetAuthorizationDetails = {
  /**
   * Transaction number issued by LINE Pay
   */
  transactionId?: string | string[];
  /**
   * Order number of Merchant
   */
  orderId?: string | string[];
};
```
* When this API is called, more than one parameter needs to be passed. You can check details of up to 100 transactions.

## Usage

```js
client.getAuthorizationDetails(options)
    .then(response => console.log(response))
    .catch(error => console.log(error));
```

## Result Code

* 0000: Successful
* 1104: Merchant not found.
* 1105: This Merchant cannot use LINE Pay.
* 1106: Header information error
* 1150: Transaction record not found.
* 1177: Exceeded max number of transactions (100) allowed to be retrieved
* 9000: Internal error
