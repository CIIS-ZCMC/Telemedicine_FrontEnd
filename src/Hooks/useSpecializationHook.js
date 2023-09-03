import { create } from "zustand";
import { GetRequest } from "../API/api";

const Specialization = "specialization";

const styles = [
  {
    id: 1,
    name: "Internal Medicine",
    description: "Internal Medicine is something something etc...",
    date: "2023-08-21",
    status: "Active",
  },
  {
    id: 2,
    name: "Internal Medicine",
    description: "Internal Medicine is something something etc...",
    date: "2023-08-21",
    status: "Active",
  },
  {
    id: 3,
    name: "Internal Medicine",
    description: "Internal Medicine is something something etc...",
    date: "2023-08-21",
    status: "In-Active",
  },
  {
    id: 4,
    name: "Internal Medicine",
    description: "Internal Medicine is something something etc...",
    date: "2023-08-21",
    status: "Active",
  },
  {
    id: 5,
    name: "Internal Medicine",
    description: "Internal Medicine is something something etc...",
    date: "2023-08-21",
    status: "Active",
  },
  {
    id: 6,
    name: "Internal Medicine",
    description: "Internal Medicine is something something etc...",
    date: "2023-08-21",
    status: "In-Active",
  },
  {
    id: 7,
    name: "Internal Medicine",
    description: "Internal Medicine is something something etc...",
    date: "2023-08-21",
    status: "Active",
  },
];

const useSpecialization = create((set) => ({
  specializations: styles,
  search: null,
  setSearch: (value) => set(() => ({ search: value })),
  getSpecialization: (callBack) => {
    if (localStorage.getItem("specialization")) {
      set(() => ({
        specializations: JSON.parse(localStorage.getItem("specialization")),
      }));
      return;
    }
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
        localStorage.setItem("specialization", JSON.stringify(res.data));
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
