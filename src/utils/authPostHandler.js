import axios from "axios";

const logJWT = (who, token) => {
   window.sessionStorage.setItem(`${who}-token`, token)
}

const loginPostHandler = async (query, data) => {
   const response = await axios.post(`${window.api}${query}`, data);

   const token = response.headers[`${response.data.user}-token`];
   logJWT(response.data.user, token)
   return response.data;
};
export default loginPostHandler;
