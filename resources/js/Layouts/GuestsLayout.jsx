import { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import React, { useRef } from 'react';
//import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';

export function GuestsLayout({children}) {
  const [collapse, setCollapse] = useState(false);

  const menu = useRef(null);
  //const router = useRouter();
  const toast = useRef(null);
  const items = [
    {
      label: 'Menu',
      items: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Date Request',
          url: route('data-request.create'),
        }
      ]
    }
  ];
  return (
    <>
      <div className="w-100 bg-slate-100 min-h-screen">
        <div className="w-full px-5 py-2 grid grid-cols-1 border-b-2 border-gray-300 bg-white justify-items-center">
          <div className="w-full md:w-4/5 flex justify-between">
            <div className="text-center md:text-start">
              <div className="flex gap-4 justify-center">
                <div className="">
                  <img src="/logo-kebun.png" style={{
                    width: '3rem',
                    height: 'auto',
                  }} alt="Image" />
                </div>
                <h2 className="text-2xl font-bold inline-block align-middle my-auto">Kebun Raya ITERA</h2>
              </div>
            </div>
            <div className="text-end flex-initial w-16 md:w-auto my-auto">
              <span className="text-end hidden md:block right-0 ">
                <Link href={'/'} className="mr-5">Home</Link>
                <Link href={route('data-request.create')}>Data Request</Link>
              </span>
              {/* <button onClick={() => setCollapse(!collapse)} className="text-end visible md:invisible lg:w-0 right-0">
                <i className="pi pi-align-justify" style={{ fontSize: '1.5rem' }}></i>
              </button> */}

              <span className="block md:hidden lg:w-0 right-0">
                <Toast ref={toast}></Toast>
                <Menu model={items} popup ref={menu} />
                <Button icon="pi pi-bars" size="small" rounded text raised  severity="secondary" onClick={(e) => menu.current.toggle(e)} />
              </span>
            </div>
          </div>
          
        </div>

        <div className="container px-6 lg:mx-auto mt-2 w-full overflow-x-auto">
          {children}
        </div>
    </div>
    </>
  )
}
