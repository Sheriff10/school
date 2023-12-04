import axios from "axios";

const getToken = () => {
   try {
      const jwtToken = window.sessionStorage.getItem("administrator-token");
      console.log(jwtToken);
      return jwtToken;
   } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
   }
};

const adminGetHandler = async (query, setShow) => {
   try {
      setShow(true);

      const token = getToken();

      if (!token) {
         console.error("No administrator token available.");
         window.location.href = "/auth/login";
         return null;
      }

      const response = await axios.get(`${window.api}${query}`, {
         headers: {
            "administrator-token": token,
            "Content-Type": "application/json",
         },
      });

      return response.data;
   } catch (error) {
      console.error("Error in adminGetHandler");
      throw error;
   } finally {
      setShow(false);
   }
};

export default adminGetHandler;
