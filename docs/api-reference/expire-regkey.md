# Expire regKey

Expires the regKey information registered for preapproved payment. Once the API is called, the regKey is no longer used for preapproved payments.

## Type signature

```typescript
class Client {
    expireRegKey(options: OptionsExpireRegKey): Promise<any>
    ...
}
```

The type of OptionsExpireRegKey :
```typescript
type OptionsExpireRegKey = {
  /**
   * Key which is returned from reserve API
   */
  regKey: string;
};
```

## Usage

```js
client.expireRegKey(options)
    .then(response => console.log(response))
    .catch(error => console.log(error));
```

## Result Code

* 0000: Successful
* 1104: Merchant not found.
* 1105: This Merchant cannot use LINE Pay.
* 1106: Header information error
* 1190: The regKey does not exist.
* 1193: The regKey expired.
* 9000: Internal error
