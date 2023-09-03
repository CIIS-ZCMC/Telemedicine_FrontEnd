import { create } from "zustand";
import { GetRequest } from "../API/api";

const TransactionLogs = "logs";

const useTransactionLogs = create((set) => ({
  transactions: [],
  search: null,
  setSearch: (value) => set(() => ({ search: value })),
  getHospital: (callBack) => {
    if (localStorage.getItem("transactions")) {
      set(() => ({
        transactions: JSON.parse(localStorage.get("transactions")),
      }));
      callBack(200, "Success");
      return;
    }

    GetRequest({ url: `${TransactionLogs}` })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        set(() => ({ transactions: res.data }));
        localStorage.setItem("transactions", JSON.stringify(res.data));
        callBack(200, "Success");
      })
      .catch((err) => {
        const {
          status,
          data: { message },
        } = err.response;

        callBack(status, message);
      });
  },
}));

export default useTransactionLogs;
