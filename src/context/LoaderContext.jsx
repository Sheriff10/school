import React, { createContext, useState } from "react";
import { Oval } from "react-loader-spinner";

export const LoaderContext = createContext();

export default function LoaderContextWrap({ children }) {
   const [show, setShow] = useState(false);
   const loaderState = (value) => {
      setShow(value);
   };

   return (
      <LoaderContext.Provider value={loaderState}>
         <div
            className={`${
               !show && "hidden"
            } flex justify-center items-center fixed z-10 top-0 bottom-0 right-0 left-0 backdrop-blur-lg`}
         >
            <div className="wrap">
               <Oval
                  height={80}
                  width={80}
                  color="#3D5EE1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#000"
                  strokeWidth={5}
                  strokeWidthSecondary={5}
               />
            </div>
         </div>
         {children}
      </LoaderContext.Provider>
   );
}
