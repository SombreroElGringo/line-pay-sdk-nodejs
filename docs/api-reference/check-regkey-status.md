# Check regKey Status

Checks if regKey is available before using the preapproved payment API.

## Type signature

```typescript
class Client {
    checkRegKeyStatus(options: OptionsCheckRegKeyStatus): Promise<any>
    ...
}
```

The type of OptionsCheckRegKeyStatus :
```typescript
type OptionsCheckRegKeyStatus = {
  /**
   * Check Authorization for Credit Card minimum amount saved in regKey
   *
   * true:
   * - Check Validity Data within LINE Pay
   * - Authorize a Credit Card minimum Amount
   * - Allow to activate a function of authorizing a Minimum amount in Merchant Information,
   *   it is required an inspection from LINE PAY Administrator.
   *
   * false(Default Value) :
   * - Check Validity data within LINE Pay
   */
  creditCardAuth?: boolean;
  /**
   * Key which is returned from reserve API
   */
  regKey: string;
};
```

## Usage

```js
client.checkRegKeyStatus(options)
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
* 1141: Can not authorize a credit card saved in regKey
* 1154: Preapproved payment account not available
* 1190: The regKey does not exist.
* 1193: The regKey expired.
