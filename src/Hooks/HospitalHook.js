import { create } from "zustand";
import { GetRequest } from "../API/api";

const Hospital = "hospitals";

const useHospital = create((set) => ({
  hospitals: [],
  getHospital: (callBack) => {
    GetRequest({ url: `${Hospital}` })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        set(() => ({ hospitals: res.data }));

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

export default useHospital;
