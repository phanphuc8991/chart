import axiosClient from "./axiosClient";
const hrApi = {
  getAll: () => {
    const url = "hr";
    return axiosClient.get(url);
  },

};
export default hrApi;