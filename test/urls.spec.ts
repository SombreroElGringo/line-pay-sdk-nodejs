import { equal } from "assert";
import * as URL from "../lib/urls";

const TEST_BASE_URL = "http://localhost:5000/";
const TEST_TRANSACTION_ID = "123";
const TEST_ORDER_ID = "123";
const TEST_REG_KEY = "123";
const TEST_CREDIT_CARD_AUTH = true;

describe("urls", () => {
  it("• middlewareConfirm", () => {
    equal(URL.middlewareConfirm(TEST_BASE_URL), `${TEST_BASE_URL}confirm`);
  });

  it("• payments with query", () => {
    equal(
      URL.payments(TEST_BASE_URL, TEST_TRANSACTION_ID, TEST_ORDER_ID),
      `${TEST_BASE_URL}payments?transactionId=${TEST_TRANSACTION_ID}&orderId=${TEST_ORDER_ID}`,
    );
  });

  it("• payments without query", () => {
    equal(URL.payments(TEST_BASE_URL), `${TEST_BASE_URL}payments`);
  });

  it("• paymentsRequest", () => {
    equal(
      URL.paymentsRequest(TEST_BASE_URL),
      `${TEST_BASE_URL}payments/request`,
    );
  });

  it("• paymentsConfirm", () => {
    equal(
      URL.paymentsConfirm(TEST_BASE_URL, TEST_TRANSACTION_ID),
      `${TEST_BASE_URL}payments/${TEST_TRANSACTION_ID}/confirm`,
    );
  });

  it("• paymentsRefund", () => {
    equal(
      URL.paymentsRefund(TEST_BASE_URL, TEST_TRANSACTION_ID),
      `${TEST_BASE_URL}payments/${TEST_TRANSACTION_ID}/refund`,
    );
  });

  it("• paymentsAuthorizations with query", () => {
    equal(
      URL.paymentsAuthorizations(
        TEST_BASE_URL,
        TEST_TRANSACTION_ID,
        TEST_ORDER_ID,
      ),
      `${TEST_BASE_URL}payments/authorizations?transactionId=${TEST_TRANSACTION_ID}&orderId=${TEST_ORDER_ID}`,
    );
  });

  it("• paymentsAuthorizations without query", () => {
    equal(
      URL.paymentsAuthorizations(TEST_BASE_URL),
      `${TEST_BASE_URL}payments/authorizations`,
    );
  });

  it("• paymentsAuthorizationsCapture", () => {
    equal(
      URL.paymentsAuthorizationsCapture(TEST_BASE_URL, TEST_TRANSACTION_ID),
      `${TEST_BASE_URL}payments/authorizations/${TEST_TRANSACTION_ID}/capture`,
    );
  });

  it("• paymentsAuthorizationsVoid", () => {
    equal(
      URL.paymentsAuthorizationsVoid(TEST_BASE_URL, TEST_TRANSACTION_ID),
      `${TEST_BASE_URL}payments/authorizations/${TEST_TRANSACTION_ID}/void`,
    );
  });

  it("• paymentsPreApprovedPayPayment", () => {
    equal(
      URL.paymentsPreApprovedPayPayment(TEST_BASE_URL, TEST_REG_KEY),
      `${TEST_BASE_URL}payments/preapprovedPay/${TEST_REG_KEY}/payment`,
    );
  });

  it("• paymentsPreApprovedPayCheck with query", () => {
    equal(
      URL.paymentsPreApprovedPayCheck(
        TEST_BASE_URL,
        TEST_REG_KEY,
        TEST_CREDIT_CARD_AUTH,
      ),
      `${TEST_BASE_URL}payments/preapprovedPay/${TEST_REG_KEY}/check?creditCardAuth=true`,
    );
  });

  it("• paymentsPreApprovedPayCheck without query", () => {
    equal(
      URL.paymentsPreApprovedPayCheck(TEST_BASE_URL, TEST_REG_KEY),
      `${TEST_BASE_URL}payments/preapprovedPay/${TEST_REG_KEY}/check`,
    );
  });

  it("• paymentsPreApprovedPayExpire", () => {
    equal(
      URL.paymentsPreApprovedPayExpire(TEST_BASE_URL, TEST_REG_KEY),
      `${TEST_BASE_URL}payments/preapprovedPay/${TEST_REG_KEY}/expire`,
    );
  });
});
