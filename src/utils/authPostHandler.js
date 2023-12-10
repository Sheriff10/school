import axios from "axios";

const logJWT = (who, token) => {
   window.sessionStorage.setItem(`${who}-token`, token);
};

const loginPostHandler = async (query, data, setShow) => {
   try {
      setShow(true);
      const response = await axios.post(`${window.api}${query}`, data);

      const token = response.headers[`${response.data.user}-token`];
      logJWT(response.data.user, token);
      return response.data;
   } catch (error) {
      console.log(error);
      alert("Invalid Credetial");
   } finally {
      setShow(false);
   }
};
export default loginPostHandler;
