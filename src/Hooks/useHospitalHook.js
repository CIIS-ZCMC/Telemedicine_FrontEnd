import { create } from "zustand";
import { GetRequest } from "../API/api";

const Hospital = "hospitals";

const styles = [
  {
    id: 1,
    name: "Marupok Medical Center",
    location: "Sintio katangahan, Barangay Madalas Iwan",
    doctors: 20,
    cases: 20,
    status: "Active",
  },
  {
    id: 2,
    name: "Marupok Medical Center",
    location: "Sintio katangahan, Barangay Madalas Iwan",
    doctors: 20,
    cases: 25,
    status: "Active",
  },
  {
    id: 3,
    name: "Marupok Medical Center",
    location: "Sintio katangahan, Barangay Madalas Iwan",
    doctors: 20,
    cases: 20,
    status: "Active",
  },
  {
    id: 4,
    name: "Marupok Medical Center",
    location: "Sintio katangahan, Barangay Madalas Iwan",
    doctors: 21,
    cases: 20,
    status: "Active",
  },
];

const useHospital = create((set) => ({
  hospitals: styles,
  search: null,
  setSearch: (value) => set(() => ({ search: value })),
  getHospital: (callBack) => {
    if (localStorage.getItem("hospital")) {
      set(() => ({ hospitals: JSON.parse(localStorage.get("hospitals")) }));
      callBack(200, "Success");
      return;
    }

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
}));

export default useHospital;
