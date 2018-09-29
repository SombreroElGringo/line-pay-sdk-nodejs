# Middleware

Middleware to start payment flow.

## Type signature

```typescript
class Client {
    middleware(config: MiddlewareConfig): Middleware 
    ...
}
```

The types of MiddlewareConfig & MiddlewareConfig :
```typescript
type MiddlewareConfig = {
  /**
   * Product Name (charset: UTF-8)
   * (4000 Bytes)
   */
  productName: string;
  /**
   * Merchant Transaction Order ID
   */
  orderId: string;
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
   * Merchant's URL that the buyer is redirected to after selecting
   * a payment method and entering the payment password in LINE Pay.
   *
   * - On the redirected URL, Merchant can call Confirm Payment API and complete the payment
   * - LINE Pay passes an additional parameter, "transactionId".
   *
   * (500 Bytes)
   */
  confirmUrl?: string;
};
```

```typescript
type Middleware = (
  req: Request,
  res: Response,
  next: NextCallback,
) => void;
```


## Usage

```js
const app = require('express')();
const uuid = require('uuid/v4');
const line = require('line-pay-sdk');

const client = new line.Client({
    channelId: 'YOUR_LINE_PAY_CHANNEL_ID',
    channelSecret: 'YOUR_LINE_PAY_CHANNEL_SECRET',
})

app.use('/pay', client.middleware({
    productName: 'demo product',
    amount: 1,
    currency: 'JPY',
    orderId: uuid()
}), (req, res, next) => {
    // Now payment should have been completed.
    res.send('Payment has been completed.');
});

app.listen(5000);
```