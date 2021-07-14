export const getAmountFromTransaction = t => +t.value / 10 ** +t.tokenDecimal;
