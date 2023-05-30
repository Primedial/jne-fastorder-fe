export const transactionType = {
  TOPUP: 1,
  WITHDRAWAL: 2,
  DEDUCTION: 3,
  CASHBACK: 4,
  BULK_DEDUCTION: 5,
  CANCEL_ORDER: 6,
};

export const transactionTypePrefix = {
  [transactionType.TOPUP]: 'TOPUP',
  [transactionType.CANCEL_ORDER]: 'CANCEL ORDER',
  [transactionType.WITHDRAWAL]: 'WITHDRAWAL',
  [transactionType.DEDUCTION]: 'DEDUCTION',
  [transactionType.BULK_DEDUCTION]: 'DEDUCTION',
  [transactionType.CASHBACK]: 'CASHBACK',
};
