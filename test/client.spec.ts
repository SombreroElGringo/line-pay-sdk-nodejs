import { ok, equal } from "assert";
import Client from "../lib/client";

const client = new Client({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecret: process.env.LINE_PAY_CHANNEL_SECRET,
  environment: "SANDBOX",
});

const LINE_PAY_ORDER_ID = process.env.LINE_PAY_ORDER_ID;

const SUCCESS_CODE = "0000";
const PARAM_ERROR_CODE = "2101";
const NOT_FOUND_CODE = "1150";
const REGKEY_INVALID_CODE = "1190";
const OMITTED_CODE = "1159";

describe("client", () => {
  describe("constructor", () => {
    it("• constructor should be initiate for sandbox env", () => {
      const testClient = new Client({
        channelId: "123",
        channelSecret: "123",
      });

      equal(testClient.config.environment, "SANDBOX");
      equal(testClient.apiUrl, "https://sandbox-api-pay.line.me");
    });

    it("• constructor should be initiate for beta env", () => {
      const testClient = new Client({
        channelId: "123",
        channelSecret: "123",
        environment: "BETA",
        merchantDeviceType: "test",
      });

      equal(testClient.config.environment, "BETA");
      equal(testClient.apiUrl, "https://lgw-pay.line-apps-beta.com");
      equal(testClient.headers["X-LINE-MerchantDeviceType"], "test");
    });

    it("• constructor should be initiate for production env", () => {
      const testClient = new Client({
        channelId: "123",
        channelSecret: "123",
        environment: "PROD",
      });

      equal(testClient.config.environment, "PROD");
      equal(testClient.apiUrl, "https://api-pay.line.me");
    });
  });

  describe("middleware", () => {});

  describe("getPaymentDetails", () => {
    it("getPaymentDetails should fail with bad orderId", async () => {
      await client
        .getPaymentDetails({ orderId: "0000-0000-0000-0000" })
        .then(response => ok(false))
        .catch(error => {
          equal(error.returnCode, NOT_FOUND_CODE);
        });
    });

    it("getPaymentDetails should success with good orderId", async () => {
      await client
        .getPaymentDetails({ orderId: LINE_PAY_ORDER_ID })
        .then(response => {
          equal(response.returnCode, SUCCESS_CODE);
        });
    });
  });

  describe("reservePayment", () => {
    it("reservePayment should fail with invalid parameter", async () => {
      await client
        .reservePayment({
          productName: "test product",
          amount: 1,
          currency: "JPY",
          confirmUrl: "http://localhost:2000/confirm",
          orderId:
            "1111-2222-3333-44417727272727727272727272727277272727272727727272727277272727272772727272727727272727", // 101 char
          payType: "PREAPPROVED",
        })
        .then(response => ok(false))
        .catch(error => {
          equal(error.returnCode, PARAM_ERROR_CODE);
          equal(error.returnMessage, "Parameter error.");
        });
    });

    it("reservePayment should success", async () => {
      await client
        .reservePayment({
          productName: "test product",
          amount: 1,
          currency: "JPY",
          confirmUrl: "http://localhost:2000/confirm",
          orderId: "1111-2222-3333-4444",
          payType: "PREAPPROVED",
        })
        .then(response => {
          equal(response.returnCode, SUCCESS_CODE);
          equal(response.returnMessage, "Success.");
        });
    });
  });

  describe("confirmPayment", () => {
    it("confirmPayment should fail with invalid parameter", async () => {
      await client
        .confirmPayment({
          amount: 1,
          currency: "JPY",
          transactionId: "2018090200033229800",
        })
        .then(response => ok(false))
        .catch(error => {
          equal(error.returnCode, OMITTED_CODE);
          equal(error.returnMessage, "-");
        });
    });
  });

  describe("refundPayment", () => {
    it("refundPayment should fail with invalid transactionId", async () => {
      await client
        .refundPayment({
          refundAmount: 1,
          transactionId: "2018090200033229800",
        })
        .then(response => ok(false))
        .catch(error => {
          equal(error.returnCode, NOT_FOUND_CODE);
          equal(error.returnMessage, "Transaction record not found.");
        });
    });
  });

  describe("getAuthorizationDetails", () => {
    it("getAuthorizationDetails should fail with invalid orderId", async () => {
      await client
        .getAuthorizationDetails({
          orderId: "0000-0000-0000-0000",
        })
        .then(response => ok(false))
        .catch(error => {
          equal(error.returnCode, NOT_FOUND_CODE);
          equal(error.returnMessage, "Transaction record not found.");
        });
    });
  });

  describe("capture", () => {
    it("capture should fail with invalid parameter", async () => {
      await client
        .capture({
          amount: 1,
          currency: "JPY",
          transactionId: "2018090200033229800",
        })
        .then(response => ok(false))
        .catch(error => {
          equal(error.returnCode, NOT_FOUND_CODE);
          equal(error.returnMessage, "Transaction record not found.");
        });
    });
  });

  describe("voidAuthorization", () => {
    it("voidAuthorization should fail with invalid parameter", async () => {
      await client
        .voidAuthorization({
          transactionId: "2018090200033229800",
        })
        .then(response => ok(false))
        .catch(error => {
          equal(error.returnCode, NOT_FOUND_CODE);
          equal(error.returnMessage, "Transaction record not found.");
        });
    });
  });

  describe("preApprovedPayment", () => {
    it("preApprovedPayment should fail with invalid parameter", async () => {
      await client
        .preApprovedPayment({
          productName: "test product",
          regKey: "123",
          amount: 1,
          currency: "JPY",
          orderId: "0000-0000-0000-0000",
        })
        .then(response => ok(false))
        .catch(error => {
          equal(error.returnCode, REGKEY_INVALID_CODE);
          equal(error.returnMessage, "The regKey does not exist.");
        });
    });
  });

  describe("checkRegKeyStatus", () => {
    it("checkRegKeyStatus should fail with invalid parameter", async () => {
      await client
        .checkRegKeyStatus({
          regKey: "123",
        })
        .then(response => ok(false))
        .catch(error => {
          equal(error.returnCode, REGKEY_INVALID_CODE);
          equal(error.returnMessage, "The regKey does not exist.");
        });
    });
  });

  describe("expireRegKey", () => {
    it("expireRegKey should fail with invalid parameter", async () => {
      await client
        .expireRegKey({
          regKey: "123",
        })
        .then(response => ok(false))
        .catch(error => {
          equal(error.returnCode, REGKEY_INVALID_CODE);
          equal(error.returnMessage, "The regKey does not exist.");
        });
    });
  });
});
