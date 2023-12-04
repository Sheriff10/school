import React from "react";
import Menu from "../../components/Menu";

export default function Message() {
   return (
      <Menu>
         <div className="container">
            <div className="col-lg-5 mx-auto">
               <div className="wrap p-4 rounded-lg bg-white my-5">
                  <div className="heading mb-3">
                     <span className="text-xl font-bold">
                        Unable to Atteend class
                     </span>{" "}
                     <br />
                     <span className="text-sm text-gray-400">
                        21 Sept. 2004
                     </span>
                  </div>
                  <div className="message leading-8">
                     <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ea beatae delectus placeat! Repudiandae labore
                        quis facilis adipisci, possimus culpa quam aut obcaecati
                        quaerat ducimus nihil excepturi optio odit sapiente
                        corporis?
                     </span>
                  </div>

                  <div className="text-wrap mt-3 bg-grey p-3">Sent by User: <span className="text-pri text-sm font-bold">39dh3jiw39</span></div>
               </div>
            </div>
         </div>
      </Menu>
   );
}
