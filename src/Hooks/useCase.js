import { create } from "zustand";
import { GetRequest } from "../API/api";

const Case = "case";

const useCase = create((set) => ({
  activeCases: [],
  archiveCases: [],
  search: "",
  setSearch: (form) => set(() => ({ search: form })),
  initialize: (collection, callBack) => {
    const data = localStorage.getItem(collection);
    if (collection === "active") {
      set(() => ({ activeCases: data }));
      return callBack("Active case collection initilized.");
    }

    set(() => ({ archiveCases: data }));
    callBack("Archive case collection initilized.");
  },
  getCase: (collection, callBack) => {
    GetRequest({ url: `${Case}/${collection}` })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        if (collection === "active") {
          set(() => ({ activeCases: res.data }));
        }

        if (collection === "archive") {
          set(() => ({ archiveCases: res.data }));
        }

        localStorage.setItem(collection, res.data);

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

export default useCase;
