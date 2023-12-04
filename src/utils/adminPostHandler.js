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

const adminPostHandler = async (query, data, setShow) => {
   try {
      setShow(true);
      const token = getToken();

      if (!token) {
         // Handle the case where the token is not present
         console.error("No administrator token available.");
         window.location.href = "/auth/login";
         return null;
      }

      // console.log(token);
      const response = await axios.post(`${window.api}${query}`, data, {
         headers: {
            "administrator-token": token,
            "Content-Type": "application/json",
         },
      });
      return response.data;
   } catch (error) {
      console.error("Error in adminPostHandler");
      throw error; // You can choose to handle or rethrow the error as needed.
   } finally {
      setShow(false);
   }
};

export default adminPostHandler;
