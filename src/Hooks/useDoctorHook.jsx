import { create } from "zustand";
import { GetRequest } from "../API/api";
import male from "../assets/male_default_profile.jpg";
import female from "../assets/female_default_profile.jpg";

const DOCTOR_PATH = "doctor";

const styles = [
  {
    id: 1,
    name: "Dr. Mosimo B. Kagwang",
    specialization: "Internal Medicine",
    hospital: "Marupok Center",
    status: "Approved",
    url: male,
  },
  {
    id: 2,
    name: "Dr. Mosimo B. Kagwang",
    specialization: "Internal Medicine",
    hospital: "Marupok Center",
    status: "Pending",
    url: male,
  },
  {
    id: 3,
    name: "Dr. Mosimo B. Kagwang",
    specialization: "Internal Medicine",
    hospital: "Marupok Center",
    status: "Approved",
    url: male,
  },
  {
    id: 4,
    name: "Dr. Mosimo B. Kagwang",
    specialization: "Internal Medicine",
    hospital: "Marupok Center",
    status: "Pending",
    url: female,
  },
  {
    id: 5,
    name: "Dr. Mosimo B. Kagwang",
    specialization: "Internal Medicine",
    hospital: "Marupok Center",
    status: "Approved",
    url: female,
  },
];

const useDoctorHook = create((set) => ({
  doctors: styles,
  search: null,
  setSearch: (value) => set(() => ({ search: value })),
  getDoctors: (token, callBack) => {
    if (localStorage.getItem(DOCTOR_PATH)) {
      set(() => ({ messages: JSON.parse(localStorage.get(DOCTOR_PATH)) }));
      callBack(200, "Success");
      return;
    }

    GetRequest({ url: `${DOCTOR_PATH}` }, token)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        set(() => ({ messages: res.data }));
        localStorage.setItem(DOCTOR_PATH, JSON.stringify(res.data));
        callBack(200, "Success");
      })
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          console.log(err);
          callBack(500, "Something went wrong.");
        }
      });
  },
}));

export default useDoctorHook;
