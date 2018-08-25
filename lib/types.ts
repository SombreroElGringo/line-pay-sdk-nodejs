export interface Config {
  /**
   * LINE Channel Id
   */
  channelId: string;
  /**
   * LINE Channel Secret
   */
  channelSecret: string;
}

export interface ClientConfig extends Config {
  /**
   *
   */
  isSanbox?: boolean;
  /**
   *
   */
  apiBaseUrl?: string;
  /**
   *
   */
  sessionOptions?: ExpressSessionConfig;
  [key: string]: string | boolean | ExpressSessionConfig;
}

export interface MiddlewareConfig extends Config {
  productName: string;
  orderId: string;
  amount: number;
  currency: "USD" | "JPY" | "TWD" | "THB";
  confirmUrl?: string;
}

export type ExpressSessionConfig = {
  secret?: string;
  resave?: boolean;
  saveUninitialized?: boolean;
};

export type Headers = {
  "X-LINE-ChannelId": string;
  "X-LINE-ChannelSecret": string;
  "Content-Type": "application/json";
};

export type Options = OptionsReserve | OptionsConfirm;

export type OptionsReserve = {
  /**
   * Product name
   */
  productName: string;
  /**
   * Unique id of the order transaction.
   */
  orderId: string;
  /**
   * Payment amount
   */
  amount: number;
  /**
   * Currency following ISO4218
   */
  currency: "USD" | "JPY" | "TWD" | "THB";
  /**
   * URL to transition after the payment approval
   */
  confirmUrl: string;
  /**
   * URL of product image
   */
  productImageUrl?: string;
  /**
   * LINE member ID
   */
  mid?: string;
  /**
   * One time key
   */
  oneTimeKey?: string;
  /**
   * Confirm URL type. Supported values are CLIENT and SERVER.
   */
  confirmUrlType?: "CLIENT" | "SERVER";
  /**
   * If check browser on transitioning to confirm URL
   */
  checkConfirmUrlBrowser?: boolean;
  /**
   * URL to transition after cancellation of payment
   */
  cancelUrl?: string;
  /**
   * String to prevent phising in Android
   */
  packageName?: string;
  /**
   * Contact of payment receiver
   */
  deliveryPlacePhone?: string;
  /**
   * Payment type. Supported values are NORMAL and PREAPPROVED
   */
  payType?: "NORMAL" | "PREAPPROVED";
  /**
   * Language to display payment pending screen
   */
  langCd?: string;
  /**
   * Set true if like to complete payment right after successful of confirm API call
   */
  capture?: boolean;
  [key: string]: string | number | boolean;
};

export type OptionsConfirm = {
  /**
   * Unique id of the order transaction.
   */
  transactionId: string;
  /**
   * Payment amount
   */
  amount: number;
  /**
   * Currency following ISO4218
   */
  currency: "USD" | "JPY" | "TWD" | "THB";
  [key: string]: string | number;
};

export type OptionsConfirmPreApprovedPay = {
  /**
   * Key which is returned from reserve API
   */
  regKey: string;
  /**
   * Product name
   */
  productName: string;
  /**
   * Payment amount
   */
  amount: number;
  /**
   * Currency following ISO4218
   */
  currency: "USD" | "JPY" | "TWD" | "THB";
  /**
   * Unique id of the order transaction.
   */
  orderId: string;
  /**
   * Set true to capture payment simultaneously
   */
  capture: boolean;
  [key: string]: string | number | boolean;
};

export type OptionsCheckPreApprovedPay = {
  /**
   * Key which is returned from reserve API
   */
  regKey: string;
  /**
   * Set true to execute authorization payment in minimum amount by registered credit card
   */
  creditCardAuth?: boolean;
  [key: string]: string | boolean;
};

export type OptionsExpirePreApprovedPay = {
  /**
   * Key which is returned from reserve API
   */
  regKey: string;
  [key: string]: string;
};

export type OptionsVoidAuthorization = {
  /**
   * Unique id of the order transaction.
   */
  transactionId: string;
  [key: string]: string;
};

export type OptionsInquireAuthorization = {
  /**
   * Unique id of the order transaction.
   */
  transactionId: string;
  /**
   * Unique id of the order transaction.
   */
  orderId: string;
  [key: string]: string;
};

export type OptionsCapture = {
  /**
   * Unique id of the order transaction.
   */
  transactionId: string;
  /**
   * Payment amount
   */
  amount: number;
  /**
   * Currency following ISO4218
   */
  currency: "USD" | "JPY" | "TWD" | "THB";
  [key: string]: string | number;
};

export type OptionsInquirePayment = {
  /**
   * Unique id of the order transaction.
   */
  transactionId: string;
  /**
   * Unique id of the order transaction.
   */
  orderId: string;
  [key: string]: string;
};

export type OptionsRefund = {
  /**
   * Unique id of the order transaction.
   */
  transactionId: string;
  /**
   * Amount to refund
   */
  refundAmount: number;
  [key: string]: string | number;
};

export type Query =
  | QueryPayments
  | QueryPaymentsAuthorizations
  | QueryPaymentsPreApprovedPayCheck;

export type QueryPayments = {
  /**
   * Transaction id to inquire.
   */
  transactionId?: string;
  /**
   * Order id to inquire.
   */
  orderId?: string;
};

export type QueryPaymentsAuthorizations = {
  /**
   * Transaction id to inquire.
   */
  transactionId?: string;
  /**
   * Order id to inquire.
   */
  orderId?: string;
};

export type QueryPaymentsPreApprovedPayCheck = {
  /**
   * Credit card authorization
   * Set true to execute authorization payment in minimum amount by registered credit card.
   */
  creditCardAuth?: boolean;
};
