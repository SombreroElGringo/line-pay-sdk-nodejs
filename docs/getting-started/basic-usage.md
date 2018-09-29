# Basic Usage

It can be imported with [CommonJS](https://nodejs.org/docs/latest/api/modules.html),
[ES2015 modules](https://babeljs.io/learn-es2015/#ecmascript-2015-features-modules),
and preferably [TypeScript](https://www.typescriptlang.org/).

The library is written in TypeScript and includes TypeScript definitions by
default. Nevertheless, it can surely be used with plain JavaScript too.

``` js
// CommonJS
const line = require('line-pay-sdk');

// ES6 modules or TypeScript
import * as line from 'line-pay-sdk';
```

## Configuration

For the usage of webhook and client, LINE channel access token and secret are
needed. About issuing the token and secret, please refer to [Getting started with the Messaging API](https://developers.line.me/messaging-api/getting-started).

``` js
const config = {
  channelId: 'YOUR_LINE_PAY_CHANNEL_ID',
  channelSecret: 'YOUR_LINE_PAY_CHANNEL_SECRET',
};

new line.Client(config);
```

## Synopsis

Here is a synopsis of echoing webhook server with [Express](https://expressjs.com/):

``` js
const express = require('express');
const line = require('line-pay-sdk');
const uuid = require('uuid/v4');

const config = {
  channelId: 'YOUR_LINE_PAY_CHANNEL_ID',
  channelSecret: 'YOUR_LINE_PAY_CHANNEL_SECRET',
};

const app = express();
// Router configuration to start payment flow
app.use('/pay/reserve', (req, res) => {
    const options = {
        productName: 'Apple',
        amount: 1,
        currency: 'JPY',
        orderId: uuid(),
        confirmUrl: 'http://localhost:5000/pay/confirm',
    }

    line.reservePayment(options).then((response) => {
        let reservation = options;
        reservation.transactionId = response.info.transactionId;

        console.log('Reservation was made.');
        console.log(reservation);

        // Save order information
        cache.put(reservation.transactionId, reservation);

        res.redirect(response.info.paymentUrl.web);
    })
})

app.listen(5000);
```

The full examples with comments can be found in [examples](https://github.com/SombreroElGringo/line-pay-sdk-nodejs/tree/master/examples/).

For the specifications of API, please refer to [API Reference](../api-reference.md).
