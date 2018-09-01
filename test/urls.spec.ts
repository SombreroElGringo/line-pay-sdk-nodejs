import { equal } from "assert";
import * as URL from "../lib/urls";

const TEST_BASE_URL = "http://localhost:5000/";
const TEST_TRANSACTION_ID = "123";
const TEST_ORDER_ID = "123";
const TEST_REG_KEY = "123";
const TEST_CREDIT_CARD_AUTH = true;

describe("urls", () => {
  it("• middlewareConfirm", () => {
    equal(`${TEST_BASE_URL}confirm`, URL.middlewareConfirm(TEST_BASE_URL));
  });

  it("• payments with query", () => {
    equal(
      `${TEST_BASE_URL}payments?transactionId=${TEST_TRANSACTION_ID}&orderId=${TEST_ORDER_ID}`,
      URL.payments(TEST_BASE_URL, TEST_TRANSACTION_ID, TEST_ORDER_ID),
    );
  });

  it("• payments without query", () => {
    equal(`${TEST_BASE_URL}payments`, URL.payments(TEST_BASE_URL));
  });

  it("• paymentsRequest", () => {
    equal(
      `${TEST_BASE_URL}payments/request`,
      URL.paymentsRequest(TEST_BASE_URL),
    );
  });

  it("• paymentsConfirm", () => {
    equal(
      `${TEST_BASE_URL}payments/${TEST_TRANSACTION_ID}/confirm`,
      URL.paymentsConfirm(TEST_BASE_URL, TEST_TRANSACTION_ID),
    );
  });

  it("• paymentsRefund", () => {
    equal(
      `${TEST_BASE_URL}payments/${TEST_TRANSACTION_ID}/refund`,
      URL.paymentsRefund(TEST_BASE_URL, TEST_TRANSACTION_ID),
    );
  });

  it("• paymentsAuthorizations with query", () => {
    equal(
      `${TEST_BASE_URL}payments/authorizations?transactionId=${TEST_TRANSACTION_ID}&orderId=${TEST_ORDER_ID}`,
      URL.paymentsAuthorizations(
        TEST_BASE_URL,
        TEST_TRANSACTION_ID,
        TEST_ORDER_ID,
      ),
    );
  });

  it("• paymentsAuthorizations without query", () => {
    equal(
      `${TEST_BASE_URL}payments/authorizations`,
      URL.paymentsAuthorizations(TEST_BASE_URL),
    );
  });

  it("• paymentsAuthorizationsCapture", () => {
    equal(
      `${TEST_BASE_URL}payments/authorizations/${TEST_TRANSACTION_ID}/capture`,
      URL.paymentsAuthorizationsCapture(TEST_BASE_URL, TEST_TRANSACTION_ID),
    );
  });

  it("• paymentsAuthorizationsVoid", () => {
    equal(
      `${TEST_BASE_URL}payments/authorizations/${TEST_TRANSACTION_ID}/void`,
      URL.paymentsAuthorizationsVoid(TEST_BASE_URL, TEST_TRANSACTION_ID),
    );
  });

  it("• paymentsPreApprovedPayPayment", () => {
    equal(
      `${TEST_BASE_URL}payments/preapprovedPay/${TEST_REG_KEY}/payment`,
      URL.paymentsPreApprovedPayPayment(TEST_BASE_URL, TEST_REG_KEY),
    );
  });

  it("• paymentsPreApprovedPayCheck with query", () => {
    equal(
      `${TEST_BASE_URL}payments/preapprovedPay/${TEST_REG_KEY}/check?creditCardAuth=true`,
      URL.paymentsPreApprovedPayCheck(
        TEST_BASE_URL,
        TEST_REG_KEY,
        TEST_CREDIT_CARD_AUTH,
      ),
    );
  });

  it("• paymentsPreApprovedPayCheck without query", () => {
    equal(
      `${TEST_BASE_URL}payments/preapprovedPay/${TEST_REG_KEY}/check`,
      URL.paymentsPreApprovedPayCheck(TEST_BASE_URL, TEST_REG_KEY),
    );
  });

  it("• paymentsPreApprovedPayExpire", () => {
    equal(
      `${TEST_BASE_URL}payments/preapprovedPay/${TEST_REG_KEY}/expire`,
      URL.paymentsPreApprovedPayExpire(TEST_BASE_URL, TEST_REG_KEY),
    );
  });
});
