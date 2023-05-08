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
          <div className="w-full md:w-4/5 grid grid-cols-1 md:grid-cols-2 justify-self-center">
            <div className="text-center md:text-start">
              <h2 className="text-2xl font-bold">Kebun raya ITERA</h2> 
            </div>
            <div className="text-end">
              <span className="text-end invisible md:visible lg:w-0 right-0">
                <Link href={'/'} className="mr-5">Home</Link>
                <Link href={route('data-request.create')}>Date Request</Link>
              </span>
              {/* <button onClick={() => setCollapse(!collapse)} className="text-end visible md:invisible lg:w-0 right-0">
                <i className="pi pi-align-justify" style={{ fontSize: '1.5rem' }}></i>
              </button> */}

              <Toast ref={toast}></Toast>
              <Menu model={items} popup ref={menu} />
              <Button icon="pi pi-bars" className="visible md:invisible lg:w-0 right-0" severity="secondary" onClick={(e) => menu.current.toggle(e)} />
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
