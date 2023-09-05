import { create } from "zustand";
import { GetRequest } from "../Services/api";

const Message = "message";

const useMyChat = create((set) => ({
  myChats: [],
  ascending: true,
  getMyChats: (callBack) => {
    GetRequest({ url: `${Message}-my-chats` })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        set((state) => (state.myChats = res.data));
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
  sort: () => {
    set((state) => ({ ascending: !state.ascending }));
  },
}));

export default useMyChat;
