export const transactionType = {
  TOPUP: 1,
  WITHDRAWAL: 2,
  DEDUCTION: 3,
  CASHBACK: 4,
};

export const transactionTypePrefix = {
  [transactionType.TOPUP]: 'TOPUP',
  [transactionType.WITHDRAWAL]: 'WITHDRAWAL',
  [transactionType.DEDUCTION]: 'DEDUCTION',
  [transactionType.CASHBACK]: 'CASHBACK',
};
