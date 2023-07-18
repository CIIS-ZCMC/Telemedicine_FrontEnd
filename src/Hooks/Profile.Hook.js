import { create } from "zustand";
import { DeleteRequest, GetRequest, PutRequest } from "../API/api";

const Message = "message";
const Profile = "profile";

const useProfile = create((set) => ({
  profile: {
    firstname: "Tristan",
    middlename: "Loquillano",
    lastname: "Amit",
    sex: "Male",
    birthday: "February 26, 2021",
    address: "San roque, Zamboanga City",
    contact: "09123271894",
    position: "Doctor",
    hospital: "Alicia District Hospital",
    specialization: "Internal Medicine",
    profile:
      "https://images.theconversation.com/files/304864/original/file-20191203-67028-qfiw3k.jpeg?ixlib=rb-1.1.0&rect=638%2C2%2C795%2C745&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
  },
  myChats: [],
  ascending: true,
  password: null,
  profileInfo: {
    description: "Before submitting check every details first.",
    firstname: null,
    middlename: null,
    lastname: null,
    sex: null,
    birthday: new Date(),
    address: null,
    contact: null,
    position: null,
    hospital: null,
    specialization: null,
  },
  passwordInfo: {
    description: "You're about to change your password.",
    oldPassword: "",
    newPassword: "",
    confirmedPassword: "",
    misMatch: false,
  },
  setProfileInfo: (form, title) => {
    set((state) => ({
      ...state,
      profileInfo: {
        ...state.profileInfo,
        [title]: form,
      },
    }));
  },
  setPasswordInfo: (form, title) => {
    set((state) => ({
      ...state,
      passwordInfo: {
        ...state.passwordInfo,
        [title]: form,
      },
    }));
  },
  setPassword: (form) => {
    set(() => ({ password: form }));
  },
  getProfile: (id, callBack) => {
    GetRequest({ url: `${Profile}/${id}` })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        const { data } = res;

        set(() => ({ profile: data }));

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
  updateProfile: (form, callBack) => {
    PutRequest({ url: `${Profile}-my-profile` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        const { data } = res;

        set(() => ({ profile: data }));

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
  updatePicture: (id, form, callBack) => {
    PutRequest({ url: `${Profile}/${id}` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        const { data } = res;

        set((state) => (state.profile = data));

        callBack(200, "Success.");
      })
      .catch((err) => {
        const {
          status,
          data: { message },
        } = err.response;

        callBack(status, message);
      });
  },
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
  deactivateAccount: (form, callBack) => {
    PutRequest({ url: `${Profile}-deactivate` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then(() => callBack(200, "Success"))
      .catch((err) => {
        const {
          status,
          data: { message },
        } = err.response;

        callBack(status, message);
      });
  },
  deleteAccount: (form, callBack) => {
    DeleteRequest({ url: `${Profile}-delete` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then(() => callBack(200, "Success"))
      .catch((err) => {
        const {
          status,
          data: { message },
        } = err.response;

        callBack(status, message);
      });
  },
  updatePassword: (form, callBack) => {
    PutRequest({ url: `${Profile}-new-password` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => callBack(200, res.data))
      .catch((err) => {
        const {
          status,
          data: { message },
        } = err.response;

        callBack(status, message);
      });
  },
}));

export default useProfile;
