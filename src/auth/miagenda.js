import axios from "axios";

const ENDPOINT = "http://159.223.115.64:8000/";

export default {
    async miAgenda() {
       const data = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      return await axios.get(`${ENDPOINT}api/v1/AgendaDomiciliaria`, data);
    }
}