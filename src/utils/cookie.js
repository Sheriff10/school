import { useCookies } from "react-cookie";

const setCookie = (token, tokenName) => {
   const [cookies, setCookie] = useCookies([tokenName]);
   setCookie(token);
   return cookies;
};
