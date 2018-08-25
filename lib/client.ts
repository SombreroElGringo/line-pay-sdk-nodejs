import { Readable } from "stream";
import { Router } from "express";
import * as session from "express-session";
import { JSONParseError } from "./exceptions";
import { get, post } from "./http";
import * as URL from "./urls";
import * as Types from "./types";
import * as Constants from "./constants";

const router: Router = Router();

function checkJSON(raw: any): any {
  if (typeof raw === "object") {
    return raw;
  } else {
    throw new JSONParseError("Failed to parse response body as JSON", raw);
  }
}

export default class Client {
  public config: Types.ClientConfig;
  public apiBaseUrl: string;
  public headers: Types.Headers;

  /**
   *Creates an instance of Client.
   * @param {ClientConfig} config
   * @memberof Client
   */
  constructor(config: Types.ClientConfig) {
    Constants.CONFIG_REQUIRED_PARAMS.map(param => {
      if (!config[param]) {
        throw new Error(`Required parameter ${param} is missing`);
      }
    });

    const sessionOptions: session.SessionOptions = {
      secret: config.channelSecret,
      resave: !config.sessionOptions
        ? false
        : config.sessionOptions.resave
          ? config.sessionOptions.resave
          : false,
      saveUninitialized: !config.sessionOptions
        ? false
        : config.sessionOptions.saveUninitialized
          ? config.sessionOptions.saveUninitialized
          : false,
    };

    this.config = config;

    if (config.isSanbox) {
      this.apiBaseUrl = Constants.SANDBOX_API_LINE_PAY_URL;
    } else {
      this.apiBaseUrl = config.apiBaseUrl || Constants.API_LINE_PAY_URL;
    }

    this.headers = {
      "X-LINE-ChannelId": config.channelId,
      "X-LINE-ChannelSecret": config.channelSecret,
      "Content-Type": "application/json",
    };

    router.use(session(sessionOptions));
  }

  /**
   * Reserve a payment
   *
   * @param {OptionsReserve} options
   * @returns
   * @memberof Client
   */
  public reserve(options: Types.OptionsReserve) {
    Constants.RESERVE_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsRequest(
      `${this.apiBaseUrl}/${Constants.API_VERSION}/`,
    );

    console.log(apiBaseUrl);

    return post(apiBaseUrl, this.headers, options)
      .then(response => {
        console.log("Reserve response : ", response);
        const body = response.body;
        if (body.returnCode && body.returnCode == "0000") {
          console.log("Reserve paiement...");
          return body;
        } else {
          return Promise.reject(new Error(body));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Confirm a payment
   *
   * @param {OptionsConfirm} options
   * @returns
   * @memberof Client
   */
  public confirm(options: Types.OptionsConfirm) {
    Constants.CONFIRM_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsConfirm(
      `${this.apiBaseUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
    );

    return post(apiBaseUrl, this.headers, {
      amount: options.amount,
      currency: options.currency,
    })
      .then(response => {
        console.log("Confirm response : ", response);
        const body = response.body;
        if (body.returnCode && body.returnCode == "0000") {
          console.log("Payment has been confirmed");
          return body;
        } else {
          return Promise.reject(new Error(body));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Confirm preapproved payment
   *
   * @param {OptionsConfirmPreApprovedPay} options
   * @returns
   * @memberof Client
   */
  public confirmPreapprovedPay(options: Types.OptionsConfirmPreApprovedPay) {
    Constants.CONFIRM_PREAPPROVED_PAY_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsPreApprovedPayPayment(
      `${this.apiBaseUrl}/${Constants.API_VERSION}/`,
      options.regKey,
    );

    console.log(
      `Going to execute preapproved payment of orderId: ${options.orderId}...`,
    );

    return post(apiBaseUrl, this.headers, options)
      .then(response => {
        console.log("Confirm preapproved pay response : ", response);
        const body = response.body;
        if (body.returnCode && body.returnCode == "0000") {
          console.log("Completed executing preapproved payment");
          return body;
        } else {
          return Promise.reject(new Error(body));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Check the availability of preapproved payment
   *
   * @param {OptionsCheckPreApprovedPay} options
   * @returns
   * @memberof Client
   */
  public checkPreapprovedPay(options: Types.OptionsCheckPreApprovedPay) {
    Constants.CHECK_PREAPPROVED_PAY_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const creditCardAuth = options.creditCardAuth ? true : false;

    const apiBaseUrl = URL.paymentsPreApprovedPayCheck(
      `${this.apiBaseUrl}/${Constants.API_VERSION}/`,
      options.regKey,
      creditCardAuth,
    );

    return get(apiBaseUrl, this.headers)
      .then(response => {
        console.log("Check preapproved pay response : ", response);
        if (response.body.returnCode && response.body.returnCode == "0000") {
          console.log(`Completed checking availability`);
          return response.body;
        } else {
          console.log(`Failed to check availability`);
          return Promise.reject(new Error(response.body));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Expire preapproved payment
   *
   * @param {OptionsExpirePreApprovedPay} options
   * @returns
   * @memberof Client
   */
  public expirePreapprovedPay(options: Types.OptionsExpirePreApprovedPay) {
    Constants.EXPIRE_PREAPPROVED_PAY_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsPreApprovedPayExpire(
      `${this.apiBaseUrl}/${Constants.API_VERSION}/`,
      options.regKey,
    );

    console.log(
      `Going to expire of preapproved payment for regKey: ${options.regKey}...`,
    );

    return post(apiBaseUrl, this.headers, options)
      .then(response => {
        console.log("Expire preapproved pay response : ", response);
        const body = response.body;
        if (body.returnCode && body.returnCode == "0000") {
          console.log("Completed expiring preapproved payment");
          return body;
        } else {
          console.log("Failed to expire preapprove payment");
          return Promise.reject(new Error(body));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Void authorized payment
   *
   * @param {OptionsVoidAuthorization} options
   * @returns
   * @memberof Client
   */
  public voidAuthorization(options: Types.OptionsVoidAuthorization) {
    Constants.VOID_AUTHORIZATION_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsAuthorizationsVoid(
      `${this.apiBaseUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
    );

    return post(apiBaseUrl, this.headers, options)
      .then(response => {
        console.log("Void authorization response : ", response);
        const body = response.body;
        if (body.returnCode && body.returnCode == "0000") {
          console.log("Completed void payment");
          return body;
        } else {
          console.log("Failed to void payment");
          return Promise.reject(new Error(body));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Inquire authorization
   *
   * @param {OptionsInquireAuthorization} options
   * @returns
   * @memberof Client
   */
  public inquireAuthorization(options: Types.OptionsInquireAuthorization) {
    Constants.VOID_AUTHORIZATION_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsAuthorizations(
      `${this.apiBaseUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
      options.orderId,
    );

    console.log("Going to inquire authorization...");

    return get(apiBaseUrl, this.headers)
      .then(response => {
        console.log("Inquire authorization response : ", response);
        const body = response.body;
        if (body.returnCode && body.returnCode == "0000") {
          console.log("Completed inquiring authorization");
          return body;
        } else {
          console.log("Failed to inquiring authorization");
          return Promise.reject(new Error(body));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Capture payment
   *
   * @param {OptionsCapture} options
   * @returns
   * @memberof Client
   */
  public capture(options: Types.OptionsCapture) {
    Constants.CAPTURE_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsAuthorizationsCapture(
      `${this.apiBaseUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
    );

    console.log("Going to capture payment...");

    return post(apiBaseUrl, this.headers, {
      amount: options.amount,
      currency: options.currency,
    })
      .then(response => {
        console.log("Capture response : ", response);
        const body = response.body;
        if (body.returnCode && body.returnCode == "0000") {
          console.log("Completed capturing payment");
          return body;
        } else {
          console.log("Failed to capture payment");
          return Promise.reject(new Error(body));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Inquire payment
   *
   * @param {OptionsInquirePayment} options
   * @returns
   * @memberof Client
   */
  public inquirePayment(options: Types.OptionsInquirePayment) {
    Constants.INQUIRE_PAYMENT_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.payments(
      `${this.apiBaseUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
      options.orderId,
    );

    console.log("Going to inquire payment...");

    return get(apiBaseUrl, this.headers)
      .then(response => {
        console.log("Inquire authorization response : ", response);
        const body = response.body;
        if (body.returnCode && body.returnCode == "0000") {
          console.log("Completed inquiring payment");
          return body;
        } else {
          console.log("Failed to inquiring payment");
          return Promise.reject(new Error(body));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Refund payment
   *
   * @param {Types.OptionsRefund} options
   * @returns
   * @memberof Client
   */
  public refund(options: Types.OptionsRefund) {
    Constants.REFUND_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsRefund(
      `${this.apiBaseUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
    );

    console.log("Going to refund payment...");

    return post(apiBaseUrl, this.headers, {
      amount: options.amount,
      currency: options.currency,
    })
      .then(response => {
        console.log("Capture response : ", response);
        const body = response.body;
        if (body.returnCode && body.returnCode == "0000") {
          console.log("Completed refunding payment");
          return body;
        } else {
          console.log("Failed to refund payment");
          return Promise.reject(new Error(body));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
