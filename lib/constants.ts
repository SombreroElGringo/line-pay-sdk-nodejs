export const SANDBOX_API_LINE_PAY_URL = "https://sandbox-api-pay.line.me";

export const API_LINE_PAY_URL = "https://api-pay.line.me";

export const API_VERSION = "v2";

export const CONFIG_REQUIRED_PARAMS = ["channelId", "channelSecret"];

export const CONFIRM_REQUIRED_PARAMS = ["transactionId", "amount", "currency"];

export const RESERVE_REQUIRED_PARAMS = [
  "productName",
  "amount",
  "currency",
  "confirmUrl",
  "orderId",
];

export const CONFIRM_PREAPPROVED_PAY_REQUIRED_PARAMS = [
  "regKey",
  "productName",
  "amount",
  "currency",
  "orderId",
];

export const CHECK_PREAPPROVED_PAY_REQUIRED_PARAMS = ["regKey"];

export const EXPIRE_PREAPPROVED_PAY_REQUIRED_PARAMS = ["regKey"];

export const VOID_AUTHORIZATION_REQUIRED_PARAMS = ["transactionId"];

export const INQUIRE_AUTHORIZATION_REQUIRED_PARAMS = [
  "transactionId",
  "orderId",
];

export const CAPTURE_REQUIRED_PARAMS = ["transactionId", "amount", "currency"];

export const INQUIRE_PAYMENT_REQUIRED_PARAMS = [
  "transactionId",
  "amount",
  "currency",
];

export const REFUND_REQUIRED_PARAMS = ["transactionId"];
