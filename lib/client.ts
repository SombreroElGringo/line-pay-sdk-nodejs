import { Router } from "express";
import * as session from "express-session";
import { get, post } from "./http";
import * as URL from "./urls";
import * as Types from "./types";
import * as Constants from "./constants";

const router: Router = Router();

export default class Client {
  public config: Types.ClientConfig;
  public apiUrl: string;
  public headers: Types.Headers;

  /**
   * Creates an instance of Client.
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

    if (config.environment === "PROD") {
      this.apiUrl = Constants.API_LINE_PAY_URL;
    } else if (config.environment === "BETA") {
      this.apiUrl = Constants.BETA_API_LINE_PAY_URL;
    } else {
      config.environment = "SANDBOX";
      this.apiUrl = Constants.SANDBOX_API_LINE_PAY_URL;
    }

    this.config = config;

    this.headers = {
      "X-LINE-ChannelId": config.channelId,
      "X-LINE-ChannelSecret": config.channelSecret,
      "X-LINE-MerchantDeviceType": config.merchantDeviceType
        ? config.merchantDeviceType
        : "",
      "Content-Type": "application/json",
    };

    router.use(session(sessionOptions));
  }

  /**
   * Middleware to start payment flow.
   * @param {Types.MiddlewareConfig} config
   * @returns {Promise<any>}
   * @memberof Client
   */
  public middleware(config: Types.MiddlewareConfig): Types.Middleware {
    router.get("/", (req, res, next) => {
      Constants.MIDDLEWARE_CONFIG_REQUIRED_PARAMS.map(param => {
        if (!config[param]) {
          throw new Error(`Required param ${param} is missing`);
        }
      });

      config.confirmUrl =
        config.confirmUrl ||
        URL.middlewareConfirm(`https://${req.hostname}${req.baseUrl}/`);

      req.session.productName = config.productName;
      req.session.orderId = config.orderId;
      req.session.amount = config.amount;
      req.session.currency = config.currency;
      req.session.confirmUrl = config.confirmUrl;

      const options = (config as any) as Types.OptionsReservePayment;

      this.reservePayment(options)
        .then(response => {
          req.session.transactionId = response.info.transactionId;
          return res.redirect(response.info.paymentUrl.web);
        })
        .catch(error => {
          return res.status(400).json(error);
        });
    });

    router.get("/confirm", (req, res, next) => {
      if (!req.query || !req.query.transactionId) {
        return res.status(400).send("Transaction id not found.");
      }

      let options = (config as any) as Types.OptionsConfirmPayment;
      options.transactionId = req.query.transactionId;

      this.confirmPayment(options)
        .then(response => {
          next();
        })
        .catch(error => {
          return res.status(500).json(error);
        });
    });

    return router;
  }

  /**
   * Get Payment Details API
   *
   * Gets the details of payments made with LINE Pay.
   * This API only gets the payments that have been captured.
   *
   * @param {Types.OptionsGetPaymentDetails} options
   * @returns {Promise<any>}
   * @memberof Client
   */
  public getPaymentDetails(
    options: Types.OptionsGetPaymentDetails,
  ): Promise<any> {
    Constants.GET_PAYMENT_DETAILS_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });
    const apiBaseUrl = URL.payments(
      `${this.apiUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
      options.orderId,
    );
    return get(apiBaseUrl, this.headers)
      .then(response => {
        const body = response;
        if (body.returnCode && body.returnCode == "0000") {
          return body;
        } else {
          return Promise.reject(body);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  /**
   * Reserve Payment API
   *
   * Prior to processing payments with LINE Pay,
   * the Merchant is evaluated if it is a normal Merchant store
   * then the information is reserved for payment. When a payment is successfully reserved,
   * the Merchant gets a "transaction Id" that is a key value used until the payment is completed or refunded.
   *
   * @param {OptionsReservePayment} options
   * @returns {Promise<any>}
   * @memberof Client
   */
  public reservePayment(options: Types.OptionsReservePayment): Promise<any> {
    Constants.RESERVE_PAYMENT_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsRequest(
      `${this.apiUrl}/${Constants.API_VERSION}/`,
    );

    options.confirmUrlType = options.confirmUrlType
      ? options.confirmUrlType
      : "CLIENT";
    options.checkConfirmUrlBrowser = options.checkConfirmUrlBrowser
      ? options.checkConfirmUrlBrowser
      : false;
    options.payType = options.payType ? options.payType : "NORMAL";
    options.capture = options.capture ? options.capture : true;

    return post(apiBaseUrl, this.headers, options)
      .then(response => {
        const body = response;
        if (body.returnCode && body.returnCode == "0000") {
          return body;
        } else {
          return Promise.reject(body);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  /**
   * Payment Confirm API
   *
   * This API is used for a Merchant to complete its payment.
   * The Merchant must call Confirm Payment API to actually complete the payment.
   * However, when "capture" parameter is "false" on payment reservation,
   * the payment status becomes AUTHORIZATION, and the payment is completed only after "Capture API" is called.
   *
   * @param {OptionsConfirmPayment} options
   * @returns {Promise<any>}
   * @memberof Client
   */
  public confirmPayment(options: Types.OptionsConfirmPayment): Promise<any> {
    Constants.CONFIRM_PAYMENT_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsConfirm(
      `${this.apiUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
    );

    return post(apiBaseUrl, this.headers, {
      amount: options.amount,
      currency: options.currency,
    })
      .then(response => {
        const body = response;
        if (body.returnCode && body.returnCode == "0000") {
          return body;
        } else {
          return Promise.reject(body);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  /**
   * Refund Payment API
   *
   * Requests refund of payments made with LINE Pay. To refund a payment,
   * the LINE Pay user's payment transaction Id must be forwarded.
   * A partial refund is also possible depending on the refund amount.
   *
   * @param {Types.OptionsRefundPayment} options
   * @returns {Promise<any>}
   * @memberof Client
   */
  public refundPayment(options: Types.OptionsRefundPayment): Promise<any> {
    Constants.REFUND_PAYMENT_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsRefund(
      `${this.apiUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
    );

    const data = options.refundAmount
      ? { refundAmount: options.refundAmount }
      : {};

    return post(apiBaseUrl, this.headers, data)
      .then(response => {
        const body = response;
        if (body.returnCode && body.returnCode == "0000") {
          return body;
        } else {
          return Promise.reject(body);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  /**
   * Get Authorization Details API
   *
   * Gets the details authorized with LINE Pay.
   * This API only gets data that is authorized or whose authorization is voided;
   * the one that is already captured can be viewed by using "Get Payment Details API”.
   *
   * @param {OptionsGetAuthorizationDetails} options
   * @returns {Promise<any>}
   * @memberof Client
   */
  public getAuthorizationDetails(
    options: Types.OptionsGetAuthorizationDetails,
  ): Promise<any> {
    Constants.GET_AUTHORIZATION_DETAILS_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsAuthorizations(
      `${this.apiUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
      options.orderId,
    );

    return get(apiBaseUrl, this.headers)
      .then(response => {
        const body = response;
        if (body.returnCode && body.returnCode == "0000") {
          return body;
        } else {
          return Promise.reject(body);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  /**
   * Capture API
   *
   * If "capture" is "false" when the Merchant calls the “Reserve Payment API” ,
   * the payment is completed only after the Capture API is called.
   *
   * @param {OptionsCapture} options
   * @returns {Promise<any>}
   * @memberof Client
   */
  public capture(options: Types.OptionsCapture): Promise<any> {
    Constants.CAPTURE_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsAuthorizationsCapture(
      `${this.apiUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
    );

    return post(apiBaseUrl, this.headers, {
      amount: options.amount,
      currency: options.currency,
    })
      .then(response => {
        const body = response;
        if (body.returnCode && body.returnCode == "0000") {
          return body;
        } else {
          return Promise.reject(body);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  /**
   * Void Authorization API
   *
   * Voids a previously authorized payment.
   * A payment that has been already captured can be refunded by using the “Refund Payment API”
   *
   * @param {OptionsVoidAuthorization} options
   * @returns {Promise<any>}
   * @memberof Client
   */
  public voidAuthorization(
    options: Types.OptionsVoidAuthorization,
  ): Promise<any> {
    Constants.VOID_AUTHORIZATION_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsAuthorizationsVoid(
      `${this.apiUrl}/${Constants.API_VERSION}/`,
      options.transactionId,
    );

    return post(apiBaseUrl, this.headers, {})
      .then(response => {
        const body = response;
        if (body.returnCode && body.returnCode == "0000") {
          return body;
        } else {
          return Promise.reject(body);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  /**
   * Preapproved Payment API
   *
   * When the payment type of the Reserve Payment API was set as PREAPPROVED,
   * a regKey is returned with the payment result.
   * Preapproved Payment API uses this regKey to directly complete a payment without using the LINE app.
   *
   * @param {OptionsPreApprovedPayment} options
   * @returns {Promise<any>}
   * @memberof Client
   */
  public preApprovedPayment(
    options: Types.OptionsPreApprovedPayment,
  ): Promise<any> {
    Constants.PREAPPROVED_PAYMENT_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsPreApprovedPayPayment(
      `${this.apiUrl}/${Constants.API_VERSION}/`,
      options.regKey,
    );

    options.capture = options.capture ? options.capture : true;

    return post(apiBaseUrl, this.headers, {
      productName: options.productName,
      amount: options.amount,
      currency: options.currency,
      orderId: options.orderId,
      capture: options.capture,
    })
      .then(response => {
        const body = response;
        if (body.returnCode && body.returnCode == "0000") {
          return body;
        } else {
          return Promise.reject(body);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  /**
   * Check regKey Status API
   *
   * Checks if regKey is available before using the preapproved payment API.
   *
   * @param {OptionsCheckRegKeyStatus} options
   * @returns {Promise<any>}
   * @memberof Client
   */
  public checkRegKeyStatus(
    options: Types.OptionsCheckRegKeyStatus,
  ): Promise<any> {
    Constants.CHECK_REGKEY_STATUS_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const creditCardAuth = options.creditCardAuth ? true : false;

    const apiBaseUrl = URL.paymentsPreApprovedPayCheck(
      `${this.apiUrl}/${Constants.API_VERSION}/`,
      options.regKey,
      creditCardAuth,
    );

    return get(apiBaseUrl, this.headers)
      .then(response => {
        const body = response;
        if (body.returnCode && body.returnCode == "0000") {
          return body;
        } else {
          return Promise.reject(body);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  /**
   * Expire regKey API
   *
   * Expires the regKey information registered for preapproved payment.
   * Once the API is called, the regKey is no longer used for preapproved payments.
   *
   * @param {OptionsExpireRegKey} options
   * @returns {Promise<any>}
   * @memberof Client
   */
  public expireRegKey(options: Types.OptionsExpireRegKey): Promise<any> {
    Constants.EXPIRE_REGKEY_REQUIRED_PARAMS.map(param => {
      if (!options[param]) {
        throw new Error(`Required param ${param} is missing`);
      }
    });

    const apiBaseUrl = URL.paymentsPreApprovedPayExpire(
      `${this.apiUrl}/${Constants.API_VERSION}/`,
      options.regKey,
    );

    return post(apiBaseUrl, this.headers, {})
      .then(response => {
        const body = response;
        if (body.returnCode && body.returnCode == "0000") {
          return body;
        } else {
          return Promise.reject(body);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
