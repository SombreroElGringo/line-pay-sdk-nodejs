# Void Authorization

Voids a previously authorized payment. A payment that has been already captured can be refunded by using the “Refund Payment API”

## Type signature

```typescript
class Client {
    voidAuthorization(options: OptionsVoidAuthorization): Promise<any>
    ...
}
```

The type of OptionsVoidAuthorization :
```typescript
type OptionsVoidAuthorization = {
  /**
   * Transaction number issued by LINE Pay
   */
  transactionId: string;
};
```

## Usage

```js
client.voidAuthorization(options)
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
* 1150: Transaction record not found.
* 1155: Wrong TransactionId
* 1165: Voided Transaction
* 1170: User’s account remains have been changed.
* 1198: Duplicated the request calling API.
* 1199: Internal request error.
* 1900: Temporary Error. Please, try again later.
* 1903: Temporary Error. Please, try again later.
* 1999: It does not match the requested information. (When re-trying a request)
* 9000: Internal error
### When an Error code 1900,1903,1999 occurs, allowing re-try.
