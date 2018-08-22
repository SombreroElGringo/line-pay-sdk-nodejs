import * as qs from "querystring";
import {
  QueryPayments,
  QueryPaymentsAuthorizations,
  QueryPaymentsPreApprovedPayCheck,
} from "./types";

const apiURL = (baseURL: string, path: string, query?: object) =>
  baseURL + path + (query ? `?${qs.stringify(query)}` : "");

export const payments = (
  baseURL: string,
  transactionId?: string,
  orderId?: string,
) => {
  let query: QueryPayments = {};
  if (transactionId) {
    query.transactionId = transactionId;
  }
  if (orderId) {
    query.orderId = orderId;
  }
  return apiURL(baseURL, `payments`, isEmpty(query) ? null : query);
};

export const paymentsConfirm = (baseURL: string, transactionId: string) =>
  apiURL(baseURL, `payments/${transactionId}/confirm`);

export const paymentsRefund = (baseURL: string, transactionId: string) =>
  apiURL(baseURL, `payments/${transactionId}/refund`);

export const paymentsRequest = (baseURL: string) =>
  apiURL(baseURL, "payments/request");

export const paymentsPreApprovedPayPayment = (
  baseURL: string,
  regKey: string,
) => apiURL(baseURL, `payments/preapprovedPay/${regKey}/payment`);

export const paymentsPreApprovedPayCheck = (
  baseURL: string,
  regKey: string,
  creditCardAuth?: boolean,
) => {
  let query: QueryPaymentsPreApprovedPayCheck = {};
  if (creditCardAuth === true) {
    query.creditCardAuth = true;
  }
  return apiURL(
    baseURL,
    `payments/preapprovedPay/${regKey}/check`,
    isEmpty(query) ? null : query,
  );
};

export const paymentsPreApprovedPayExpire = (baseURL: string, regKey: string) =>
  apiURL(baseURL, `payments/preapprovedPay/${regKey}/expire`);

export const paymentsAuthorizations = (
  baseURL: string,
  transactionId?: string,
  orderId?: string,
) => {
  let query: QueryPaymentsAuthorizations = {};
  if (transactionId) {
    query.transactionId = transactionId;
  }
  if (orderId) {
    query.orderId = orderId;
  }
  return apiURL(
    baseURL,
    `payments/authorizations`,
    isEmpty(query) ? null : query,
  );
};

export const paymentsAuthorizationsVoid = (
  baseURL: string,
  transactionId: string,
) => apiURL(baseURL, `payments/authorizations/${transactionId}/void`);

export const paymentsAuthorizationsCapture = (
  baseURL: string,
  transactionId: string,
) => apiURL(baseURL, `payments/authorizations/${transactionId}/capture`);

function isEmpty(obj: object): boolean {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}
