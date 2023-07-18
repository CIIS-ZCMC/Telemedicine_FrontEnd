import { create } from "zustand";
import { GetRequest, PostRequest, DeleteRequest } from "../API/api";
import { Auth, User } from "../API/Paths";

const useUser = create((set) => ({
  user: null,
  signIn: (form, callBack) => {
    PostRequest({ url: `${Auth}/signin` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        return res.data;
      })
      .then((res) => {
        const { data } = res;

        sessionStorage.setItem("token", data.token);
        set(() => ({
          user: data,
        }));

        callBack(200, "/");
      })
      .catch((err) => {
        const {
          status,
          data: { message },
        } = err.response;

        callBack(status, message);
      });
  },
  validateToken: async (token, callBack) => {
    GetRequest({ url: User }, token)
      .then((res) => {
        const { statusText } = res;
        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        return res.data;
      })
      .then((res) => {
        const { data } = res;
        set(() => ({ user: data }));
        callBack(200, "/");
      })
      .catch((err) => {
        const {
          status,
          data: { message },
        } = err.response;

        callBack(status, message);
      });
  },
  signUp: (form, callBack) => {
    PostRequest({ url: `${Auth}/signup` }, form)
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
  signOut: (callBack) => {
    DeleteRequest({ url: `${User}/logout` })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        return res.data;
      })
      .then((res) => {
        const { data } = res.data;

        localStorage.clear();
        sessionStorage.removeItem("token");
        set(() => ({
          user: null,
        }));

        callBack(200, data);
      })
      .catch((err) => {
        const {
          status,
          data: { message },
        } = err.response;

        callBack(status, message);
      });
  },
  sendRecoveryCode: (form, callBack) => {
    PostRequest({ url: `${Auth}/recovery` }, form)
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
  validateOTP: (form, callBack) => {
    PostRequest({ url: `${Auth}/recovery-validate` }, form)
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
  newPassword: (form, callBack) => {
    PostRequest({ url: `${Auth}/reset-password` }, form)
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
  registerAccount: (form, callBack) => {
    PostRequest({ url: `${Auth}/account` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        return res.data;
      })
      .then(() => callBack(200, "Registered successfully, Wait for approval."))
      .catch((err) => {
        const {
          status,
          data: { message },
        } = err.response;

        callBack(status, message);
      });
  },
}));

export default useUser;
