import { create } from "zustand";
import api from "../Services/api";

const HOSPITAL_PATH = "hospital";

const useHospital = create((set) => ({
  hospitals: [],
  search: null,
  setSearch: (value) => set(() => ({ search: value })),
  getHospital: (token, callBack) => {
    if (localStorage.getItem(HOSPITAL_PATH)) {
      set(() => ({ hospitals: JSON.parse(localStorage.get(HOSPITAL_PATH)) }));
      callBack(200, "Success");
      return;
    }

    api
      .get(`${HOSPITAL_PATH}s`, { cancelToken: token })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        set(() => ({ hospitals: res.data }));
        localStorage.setItem("hospitals", JSON.stringify(res.data));
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
  registerHospital: (form, callBack) => {
    api
      .post(HOSPITAL_PATH, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then(() => callBack(200, "Success"))
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
  updateHospital: (id, form, callBack) => {
    api
      .put(HOSPITAL_PATH, { params: { id: id }, data: form })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then(() => callBack(200, "Success"))
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
  deleteHospital: (id, callBack) => {
    api
      .delete(HOSPITAL_PATH, { params: { id: id } })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then(() => callBack(200, "Success"))
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
}));

export default useHospital;
