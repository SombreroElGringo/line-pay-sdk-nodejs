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
