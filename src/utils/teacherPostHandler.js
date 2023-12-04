import axios from "axios";

const getToken = () => {
   try {
      const jwtToken = window.sessionStorage.getItem("teacher-token");
      console.log(jwtToken);
      return jwtToken;
   } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
   }
};

const teacherPostHandler = async (query, data, setShow) => {
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
            "teacher-token": token,
            "Content-Type": "application/json",
         },
      });
      return response.data;
   } catch (error) {
      console.error("Error in teacherPostHandler");
      throw error; // You can choose to handle or rethrow the error as needed.
   } finally {
      setShow(false);
   }
};

export default teacherPostHandler;
