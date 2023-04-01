import api from "src/service/api";

// export const getTransactions = () => {
//   return api.get(`transactions`);
// };

export const getTransactions = (startDate, endDate) => {
  return api.get(`transactions`, { params: { startDate, endDate } });
};

export const getSummarizedTransactions = (startDate, endDate) => {
  return api.get(`transactions-summary`, { params: { startDate, endDate } });
};
