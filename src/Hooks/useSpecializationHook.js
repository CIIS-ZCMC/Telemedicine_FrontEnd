import { create } from "zustand";
import api from "../Services/api";

const SPECIALIZATION_PATH = "specialization";

const useSpecialization = create((set) => ({
  specializations: [],
  search: null,
  setSearch: (value) => set(() => ({ search: value })),
  getSpecialization: (token, callBack) => {
    if (localStorage.getItem(SPECIALIZATION_PATH)) {
      set(() => ({
        specializations: JSON.parse(localStorage.getItem(SPECIALIZATION_PATH)),
      }));
      callBack(200, 'success');
      return;
    }
    api.get(`${SPECIALIZATION_PATH}s`, {cancelToken: token}).then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        set(() => ({ specializations: res.data }));
        localStorage.setItem(SPECIALIZATION_PATH, JSON.stringify(res.data));
        callBack(200, "Success");
      })
      .catch((err) => {
        try{
          const {
            status,
            data: { message },
          } = err.response;
    
          callBack(status, message);
        }catch(err){
          callBack(500, 'Something went wrong.');
        }
      });
  },
  registerSpecialization: (form, callBack) => {
    api.post(SPECIALIZATION_PATH, form)
    .then((res) => {
      const {statusText} = res;

      if(statusText !== 'OK')
      {
        throw new Error('Bad response.', {cause: res});
      }

      return res.data;
    })
    .then(() => callBack(200, 'success'))
    .catch((err) => {
      try{
        const {
          status,
          data: { message },
        } = err.response;
  
        callBack(status, message);
      }catch(err){
        callBack(500, 'Something went wrong.');
      }
    })
  },
  updateSpecialization: (id, form, callBack) => {
    api.post(SPECIALIZATION_PATH, {params: {id: id}}, form)
    .then((res) => {
      const {statusText} = res;

      if(statusText !== 'OK')
      {
        throw new Error('Bad response.', {cause: res});
      }

      return res.data;
    })
    .then(() => callBack(200, 'success'))
    .catch((err) => {
      try{
        const {
          status,
          data: { message },
        } = err.response;
  
        callBack(status, message);
      }catch(err){
        callBack(500, 'Something went wrong.');
      }
    })
  },
  deleteSpecialization: (id, callBack) => {
    api.delete(SPECIALIZATION_PATH, {params: {id: id}},)
    .then((res) => {
      const {statusText} = res;

      if(statusText !== 'OK')
      {
        throw new Error('Bad response.', {cause: res});
      }

      return res.data;
    })
    .then(() => callBack(200, 'success'))
    .catch((err) => {
      try{
        const {
          status,
          data: { message },
        } = err.response;
  
        callBack(status, message);
      }catch(err){
        callBack(500, 'Something went wrong.');
      }
    })
  }
}));

export default useSpecialization;
