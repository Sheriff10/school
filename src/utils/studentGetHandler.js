import axios from "axios";
import { useContext } from "react";

const getToken = () => {
   try {
      const jwtToken = window.sessionStorage.getItem("student-token");
      console.log(jwtToken);
      return jwtToken;
   } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
   }
};

const studentGetHandler = async (query, setShow) => {
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
      const response = await axios.get(`${window.api}${query}`, {
         headers: {
            "student-token": token,
            "Content-Type": "application/json",
         },
      });
      return response.data;
   } catch (error) {
      console.error("Error in studentGetHandler");
      throw error; // You can choose to handle or rethrow the error as needed.
   } finally {
      setShow(false);
   }
};

export default studentGetHandler;
