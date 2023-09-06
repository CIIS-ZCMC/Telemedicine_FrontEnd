import { create } from "zustand";
import api from "../Services/api";

const PATIENT_PATH = "patient";

const usePatientHook = create((set) => ({
  patients: [],
  ascending: true,
  sort: () => {
    set((state) => ({ ascending: !state.ascending }));
  },
  getPatient: (token, callBack) => {
    if (localStorage.getItem(PATIENT_PATH)) {
      set(() => ({ patients: JSON.parse(localStorage.getItem(PATIENT_PATH)) }));
      callBack(200, "Success");
      return;
    }
    api
      .get(`${PATIENT_PATH}s`, { cancelToken: token })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        set(() => ({ patients: res.data }));
        localStorage.setItem(PATIENT_PATH, JSON.stringify(res.data));

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

export default usePatientHook;
