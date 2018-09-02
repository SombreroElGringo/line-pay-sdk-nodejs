# Reserve Payment

Prior to processing payments with LINE Pay, the Merchant is evaluated if it is a normal Merchant store then 
the information is reserved for payment. When a payment is successfully reserved, the Merchant gets a "transaction Id" 
that is a key value used until the payment is completed or refunded.

## Type signature

```typescript
class Client {
    reservePayment(options: OptionsReservePayment): Promise<any>
    ...
}
```

The type of OptionsReservePayment :
```typescript
type type OptionsReservePayment = {
  /**
   * Product Name (charset: UTF-8)
   * (4000 Bytes)
   */
  productName: string;
  /**
   * Product image URL
   * Image URL to be displayed on the Payment screen
   * Size: 84 x 84 (Image to be displayed only on the Payment screen. Recommended to follow the guidelines)
   * (500 Bytes)
   */
  productImageUrl?: string;
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
   * LINE member ID
   * LINE user mid for making a payment
   * (50 Bytes)
   */
  mid?: string;
  /**
   * One Time Key
   * Result of scanning and reading QR/Bar code information given
   * by LINE Pay app is used as a LINE Pay user’s mid.
   * Valid time is 5 minutes and it will be deleted with reserve at the same time.
   * Supports QR/BarCode above LINE 5.1 Version of LINE Pay app
   * (12 Bytes)
   */
  oneTimeKey?: string;
  /**
   * Merchant's URL that the buyer is redirected to after selecting
   * a payment method and entering the payment password in LINE Pay.
   *
   * - On the redirected URL, Merchant can call Confirm Payment API and complete the payment
   * - LINE Pay passes an additional parameter, "transactionId".
   *
   * (500 Bytes)
   */
  confirmUrl: string;
  /**
   * confirmUrl Type
   * Type of URL that the buyer is redirected to after selecting
   * a payment method and entering the payment password in LINE Pay
   *
   * - CLIENT: A user based URL (default)
   * - SERVER: A server based URL. Users just need to check the payment information
   *   screen in LINE Pay which then notifies the Merchant server that the payment is available.
   */
  confirmUrlType?: "CLIENT" | "SERVER";
  /**
   * When moved to confirmUrl, Check a browser
   *
   * - true: When a browser calling a payment and a browser directing to confirmUrl are not identical,
   *   LINE Pay provides a Guide Page directing to a previous browse.
   * - false(Default Value): Directing to ConfirmUrl without checking a browser
   */
  checkConfirmUrlBrowser?: boolean;
  /**
   * Payment Cancellation page URL
   * - The URL redirected to, from the LINE App Payment page when the LINE Pay user cancels payment
   *   (URL for the Merchant accessing via mobile devices to go to the Merchant's app or website when the payment is canceled)
   * - URL sent by Merchant is used as is
   * - No additional parameters sent by LINE Pay
   *
   * (500 Bytes)
   */
  cancelUrl?: string;
  /**
   * Information to avoid phishing during transition between apps in Android.
   * (4000 Bytes)
   */
  packageName?: string;
  /**
   * Merchant's order number corresponding to the payment request
   *
   * - A unique number managed by a Merchant
   *
   * (100 Bytes)
   */
  orderId: string;
  /**
   * Recipient contact (for Risk Management)
   * (100 Bytes)
   */
  deliveryPlacePhone?: string;
  /**
   * Payment types
   *
   * - NORMAL: Single payment (Default Value)
   * - PREAPPROVED: Preapproved payment
   *
   * (12 Bytes)
   */
  payType?: "NORMAL" | "PREAPPROVED";
  /**
   * Language codes on the payment waiting screen (paymentUrl). Supports a total of six languages.
   *
   * - ja: Japanese
   * - ko: Korean
   * - en: English
   * - zh-Hans: Chinese (Simplified)
   * - zh-Hant: Chinese (Traditional)
   * - th: Thai
   *
   * - Language codes are not mandatory but if not received,
   *   multiple languages are supported based on the accept-language header.
   * - If an unsupported langCd is received, English ("en") is used by default.
   * - BCP-47 format: http://en.wikipedia.org/wiki/IETF_language _tag
   */
  langCd?: string;
  /**
   * Whether to capture or not
   * - true: Payment authorization and capture are handled at once when the Confirm Payment API is called (default).
   * - false: A payment is completed only after it is authorized and then separately captured by calling "Capture API",
   *   when the Confirm Payment API is called
   */
  capture?: boolean;
  /**
   * Extra fields
   */
  extras?: Extras;
};

type Extras = {
  /**
   * Add Friends List
   */
  addFriends?: Friend[];
  /**
   * Branch Name where the payment is requested from (Only 100 letters will be displayed if it's exceeded.)
   * (200 Bytes)
   */
  branchName?: string;
};

type Friend = {
  /**
   * type: Service type
   * - “LINE_AT”: line@
   */
  type: string;
  /**
   * idList: id list(ID List (ID list registered at the LINE@/OA Management menu on Merchant Center))
   */
  idList: string[];
};
```

## Usage

```js
client.reservePayment(options)
    .then(response => console.log(response))
    .catch(error => console.log(error));
```

## Result Code

* 0000: Successful
* 1104: Merchant not found.
* 1105: This Merchant cannot use LINE Pay.
* 1106: Header information error
* 1124: Error in amount (scale).
* 1133: Invalid oneTimeKey.
* 1145: Payment in progress.
* 1172: Existing same orderId
* 1178: Unsupported currency
* 1194: This Merchant cannot use preapproved payment.
* 2101: Parameter error
* 2102: JSON Data format error 
* 9000: Internal error
