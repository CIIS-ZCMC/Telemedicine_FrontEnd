import { create } from "zustand";
import api from "../Services/api";

const DOCTOR_PATH = "doctor";

const useDoctorHook = create((set) => ({
  doctors: [],
  search: null,
  setSearch: (value) => set(() => ({ search: value })),
  getDoctors: (token, callBack) => {
    if (localStorage.getItem(DOCTOR_PATH)) {
      set(() => ({ doctors: JSON.parse(localStorage.getItem(DOCTOR_PATH)) }));
      callBack(200, "Success");
      return;
    }
    api
      .get(`users`, { cancelToken: token })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        set(() => ({ doctors: res.data }));
        localStorage.setItem(DOCTOR_PATH, JSON.stringify(res.data));

        callBack(200, "success");
      })
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, err);
        }
      });
  },
}));

export default useDoctorHook;
