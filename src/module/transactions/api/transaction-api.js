import api from "src/service/api";

export const getTransactions = () => {
  return api.get(`transactions`);
};

