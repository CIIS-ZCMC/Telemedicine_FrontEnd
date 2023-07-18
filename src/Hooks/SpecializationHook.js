import { create } from "zustand";
import { GetRequest } from "../API/api";

const Specialization = "specializations";

const useSpecialization = create((set) => ({
  specializations: [],
  getSpecialization: (callBack) => {
    GetRequest({ url: `${Specialization}` })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        set(() => ({ specializations: res.data }));

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

export default useSpecialization;
