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

export const transactionStatus = {
  1: 'Outstanding',
  2: 'Pending',
  3: 'Paid',
  4: 'Failed',
  5: 'Expired',
  6: 'Completed',
};

export const transactionStatusColor = {
  1: 'info',
  2: 'warning',
  3: 'success',
  4: 'danger',
  5: 'danger',
  6: 'success',
};
