import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Header() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const navigation = [
      { name: "Product", href: "#" },
      { name: "Features", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Company", href: "#" },
   ];
   const navi = useNavigate();

   return (
      <header className="absolute inset-x-0 top-0 z-50 bg-white text-gray-900 shadow">
         <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
         >
            <div className="flex lg:flex-1">
               <a href="#" className="-m-1.5 p-1.5">
                  {/* <span className="sr-only">Your Company</span>
                  <img
                     className="h-8 w-auto"
                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                     alt=""
                  /> */}
                  <span className="text-gray-900 font-bold text-2xl">
                     PreSchool
                  </span>
               </a>
            </div>
            <div className="flex lg:hidden">
               <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
               >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
               </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
               {navigation.map((item) => (
                  <a
                     key={item.name}
                     href={item.href}
                     className="text-sm font-semibold leading-6 text-gray-900"
                  >
                     {item.name}
                  </a>
               ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
               <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-white btn bg-pri"
                  onClick={() => navi("/auth/login")}
               >
                  Log in <span aria-hidden="true">&rarr;</span>
               </a>
            </div>
         </nav>

         <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
         >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
               <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                     <span className="sr-only">Your Company</span>
                     <span className="text-gray-900 font-bold text-2xl">
                        Block<span className="text-cyan-300">vest</span>
                     </span>
                  </a>
                  <button
                     type="button"
                     className="-m-2.5 rounded-md p-2.5 text-gray-700"
                     onClick={() => setMobileMenuOpen(false)}
                  >
                     <span className="sr-only">Close menu</span>
                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
               </div>
               <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                     <div className="space-y-2 py-6">
                        {navigation.map((item) => (
                           <a
                              key={item.name}
                              href={item.href}
                              className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-gray-50 hover:bg-gray-900"
                           >
                              {item.name}
                           </a>
                        ))}
                     </div>
                     <div className="py-6">
                        <a
                           href="#"
                           className="-mx-3 btn bg-pri  block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                           onClick={() => navi("/auth/login")}
                        >
                           Log in
                        </a>
                     </div>
                  </div>
               </div>
            </Dialog.Panel>
         </Dialog>
      </header>
   );
}
