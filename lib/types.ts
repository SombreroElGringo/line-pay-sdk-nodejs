import * as http from "http";

export type Request = http.IncomingMessage & { body: any };
export type Response = http.ServerResponse;
export type NextCallback = (err?: Error) => void;

export type ClientConfig = {
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
   * (20 Bytes)
   */
  merchantDeviceType?: string;
  /**
   * Express session options
   */
  sessionOptions?: ExpressSessionConfig;
  [key: string]: string | boolean | ExpressSessionConfig;
};

export type ExpressSessionConfig = {
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

export type MiddlewareConfig = {
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
  [key: string]: string | number;
};

export type Middleware = (
  req: Request,
  res: Response,
  next: NextCallback,
) => void;

export type Headers = {
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

export type Options =
  | OptionsGetPaymentDetails
  | OptionsReservePayment
  | OptionsConfirmPayment
  | OptionsRefundPayment
  | OptionsGetAuthorizationDetails
  | OptionsCapture
  | OptionsVoidAuthorization
  | OptionsPreApprovedPayment
  | OptionsCheckRegKeyStatus
  | OptionsExpireRegKey;

export type OptionsGetPaymentDetails = {
  /**
   * A transaction ID issued by LINE Pay, for payment or refund.
   */
  transactionId?: string | string[];
  /**
   * Merchant Transaction Order ID
   */
  orderId?: string | string[];
  [key: string]: string | string[];
};

export type OptionsReservePayment = {
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
  [key: string]: string | number | boolean | Extras;
};

export type Extras = {
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

/**
 * Friend
 *
 * "addFriends": [{
 *    "type": "LINE_AT",
 *    "idList": ["@aaa", "@bbb"]
 * }]
 */
export type Friend = {
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

export type OptionsConfirmPayment = {
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
   * A transaction ID issued by LINE Pay, for payment or refund.
   */
  transactionId: string;
  [key: string]: string | number;
};

export type OptionsRefundPayment = {
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
  [key: string]: string | number;
};

export type OptionsGetAuthorizationDetails = {
  /**
   * Transaction number issued by LINE Pay
   */
  transactionId?: string | string[];
  /**
   * Order number of Merchant
   */
  orderId?: string | string[];
  [key: string]: string | string[];
};

export type OptionsCapture = {
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
   * Transaction number issued by LINE Pay
   */
  transactionId: string;
  [key: string]: string | number;
};

export type OptionsVoidAuthorization = {
  /**
   * Transaction number issued by LINE Pay
   */
  transactionId: string;
  [key: string]: string;
};

export type OptionsPreApprovedPayment = {
  /**
   * Product name
   * (4000 Bytes)
   */
  productName: string;
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
   * Merchant's order number corresponding to the payment request.
   * A unique number managed by a Merchant.
   * (100 Bytes)
   */
  orderId: string;
  /**
   * Whether to be captured or not
   * - true(Default Value): Authorization and capture are handled at once.
   * - false: Handled Capture process and Called “Capture API” in order to complete a payment.
   */
  capture?: boolean;
  /**
   * Key which is returned from reserve API
   */
  regKey: string;
  [key: string]: string | number | boolean;
};

export type OptionsCheckRegKeyStatus = {
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
  [key: string]: string | boolean;
};

export type OptionsExpireRegKey = {
  /**
   * Key which is returned from reserve API
   */
  regKey: string;
  [key: string]: string;
};

export type Query =
  | QueryGetPaymentDetails
  | QueryGetAuthorizationDetails
  | QueryCheckRegKeyStatus;

export type QueryGetPaymentDetails = {
  /**
   * A transaction ID issued by LINE Pay, for payment or refund.
   */
  transactionId?: string | string[];
  /**
   * Merchant Transaction Order ID
   */
  orderId?: string | string[];
};

export type QueryGetAuthorizationDetails = {
  /**
   * A transaction ID issued by LINE Pay, for payment or refund.
   */
  transactionId?: string | string[];
  /**
   * Merchant Transaction Order ID
   */
  orderId?: string | string[];
};

export type QueryCheckRegKeyStatus = {
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
};
