import axiosClient from "./axiosClient";
const spo2Api = {
  getAll: () => {
    const url = "spo2";
    return axiosClient.get(url);
  },

};
export default spo2Api;