export const API_LINE_PAY_URL = "https://api-pay.line.me";

export const BETA_API_LINE_PAY_URL = "https://lgw-pay.line-apps-beta.com";

export const SANDBOX_API_LINE_PAY_URL = "https://sandbox-api-pay.line.me";

export const API_VERSION = "v2";

export const CONFIG_REQUIRED_PARAMS = ["channelId", "channelSecret"];

export const MIDDLEWARE_CONFIG_REQUIRED_PARAMS = [
  "productName",
  "amount",
  "currency",
  "orderId",
];

export const GET_PAYMENT_DETAILS_REQUIRED_PARAMS: string[] = [];

export const RESERVE_PAYMENT_REQUIRED_PARAMS = [
  "productName",
  "amount",
  "currency",
  "confirmUrl",
  "orderId",
];

export const CONFIRM_PAYMENT_REQUIRED_PARAMS = [
  "transactionId",
  "amount",
  "currency",
];

export const REFUND_PAYMENT_REQUIRED_PARAMS = ["transactionId"];

export const GET_AUTHORIZATION_DETAILS_REQUIRED_PARAMS: string[] = [];

export const CAPTURE_REQUIRED_PARAMS = ["transactionId", "amount", "currency"];

export const VOID_AUTHORIZATION_REQUIRED_PARAMS = ["transactionId"];

export const PREAPPROVED_PAYMENT_REQUIRED_PARAMS = [
  "productName",
  "amount",
  "currency",
  "orderId",
  "regKey",
];

export const CHECK_REGKEY_STATUS_REQUIRED_PARAMS = ["regKey"];

export const EXPIRE_REGKEY_REQUIRED_PARAMS = ["regKey"];
