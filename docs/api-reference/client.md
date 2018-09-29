# Client

A client instance provides functions for LINE Pay APIs, so that you do not need to worry about HTTP requests and can focus on data. For type signatures of the methods.

## Type signature

```typescript
class Client {
    public config: ClientConfig;
    public apiUrl: string;
    public headers: Headers;

    constructor(config: ClientConfig)

    middleware(config: MiddlewareConfig): Middleware 

    getPaymentDetails(options: OptionsGetPaymentDetails): Promise<any>
    reservePayment(options: OptionsReservePayment): Promise<any>
    confirmPayment(options: OptionsConfirmPayment): Promise<any>
    refundPayment(options: OptionsRefundPayment): Promise<any>
    getAuthorizationDetails(options: OptionsGetAuthorizationDetails): Promise<any>
    capture(options: OptionsCapture): Promise<any>
    voidAuthorization(options: OptionsVoidAuthorization): Promise<any>
    preApprovedPayment(options: OptionsPreApprovedPayment): Promise<any>
    checkRegKeyStatus(options: OptionsCheckRegKeyStatus): Promise<any>
    expireRegKey(options: OptionsExpireRegKey): Promise<any>
}
```

The types of ClientConfig & Headers :
```typescript
type ClientConfig = {
  /**
   * Payment Integration Information - Channel ID
   */
  channelId: string;
  /**
   * Payment Integration Information - Channel Secret Key
   */
  channelSecret: string;
  /**
   *  Environments:
   *
   * - PROD: https://api-pay.line.me  => Real Service Environment
   * - BETA: https://lgw-pay.line-apps-beta.com => Testing environment that is available only in the LINE office network
   * - SANDBOX(Default Value): https://sandbox-api-pay.line.me => Environment for integration testing
   */
  environment?: "PROD" | "BETA" | "SANDBOX";
  /**
   * Offline Support - Device Type
   * Add it to defining it in the header
   * (20 Bytes)
   */
  merchantDeviceType?: string;
  /**
   * Express session options
   */
  sessionOptions?: ExpressSessionConfig;
};

type ExpressSessionConfig = {
  /**
   * This is the secret used to sign the session ID cookie.
   * False by default.
   */
  secret?: string;
  /**
   * Forces the session to be saved back to the session store,
   * even if the session was never modified during the request.
   * False by default.
   */
  resave?: boolean;
  /**
   * Forces a session that is "uninitialized" to be saved to the store.
   * False by default.
   */
  saveUninitialized?: boolean;
};
```

```typescript
type Headers = {
  "Content-Type": "application/json";
  /**
   * Payment Integration Information - Channel ID
   * (10 Bytes)
   */
  "X-LINE-ChannelId": string;
  /**
   * Payment Integration Information - Channel Secret Key
   * (32 Bytes)
   */
  "X-LINE-ChannelSecret": string;
  /**
   * Offline Support - Device Type
   * (20 Bytes)
   */
  "X-LINE-MerchantDeviceType"?: string;
};
```

## Usage

The `Client` class is provided by the main module.
To create a client instance in CommonJS:
```js
// CommonJS
const line = require('line-pay-sdk');

const client = new line.Client({
    channelId: 'YOUR_LINE_PAY_CHANNEL_ID',
    channelSecret: 'YOUR_LINE_PAY_CHANNEL_SECRET',
})

...

client.reservePayment(options)
    .then(response => console.log(response))
    .catch(error => console.log(error));
```

To create a client instance in `ES6` or `Typescript`:

```typescript
// ES6 modules or TypeScript
import { Client } from "line-pay-sdk";

const client: Client = new Client({
    channelId: "YOUR_LINE_PAY_CHANNEL_ID",
    channelSecret: "YOUR_LINE_PAY_CHANNEL_SECRET",
});

...

client.reservePayment(options)
    .then(response => console.log(response))
    .catch(error => console.log(error));
```
