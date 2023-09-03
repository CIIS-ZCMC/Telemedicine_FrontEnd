import { create } from "zustand";
import { GetRequest } from "../API/api";

const Chats = "messages";

const useCaseChats = create((set) => ({
  messages: [],
  search: null,
  setSearch: (value) => set(() => ({ search: value })),
  getHospital: (caseId, callBack) => {
    if (localStorage.getItem("messages")) {
      set(() => ({ messages: JSON.parse(localStorage.get("messages")) }));
      callBack(200, "Success");
      return;
    }

    GetRequest({ url: `${Chats}` }, caseId)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        set(() => ({ messages: res.data }));
        localStorage.setItem("messages", JSON.stringify(res.data));
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

export default useCaseChats;
