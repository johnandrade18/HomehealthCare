import axios from "axios";

const ENDPOINT = "http://159.223.115.64:8000/";

export default {
    async login(identificacion, password) {
        const user = {
            identificacion,
            password,
        }
        return await axios.post(`${ENDPOINT}api/auth/login`, user);
    }
}