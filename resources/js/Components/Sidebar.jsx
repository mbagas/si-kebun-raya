import { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import { Image } from 'primereact/image';
export default function Sidebar({ children, ...props }) {
  const [open, setOpen] = useState(false);
  const [collapse, setCollapse] = useState(true);
  console.log('data request count : ', props.dataRequestCount)
  return (
    <>
      <div className="w-screen px-5 py-2 flex justify-between border-b-2 border-gray-300">
        <div className="flex gap-4">
          <div className="">
            <img src="/logo-kebun.png" style={{
              width: '3rem',
              height: 'auto',
              }} alt="Image" />
          </div>
          <h2 className="text-2xl font-bold inline-block align-middle my-auto">Kebun Raya ITERA</h2> 
        </div>
        <div className="text-end my-auto ">
          <button onClick={() => setCollapse(!collapse)} className="visible lg:invisible lg:w-0 right-0">
            <i className="pi pi-align-justify" style={{ fontSize: '1.5rem' }}></i>
          </button>
        </div>
      </div>


      <div className="flex bg-slate-50">

        <div className={`  ${collapse ? "invisible w-0 p-0" : "visible  p-3"} sticky lg:visible lg:w-60 flex flex-col h-100 min-h-screen bg-gray-800 shadow duration-300`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-start p-2">
              <h2 className="text-xl font-bold text-white">
                Dashboard
              </h2>
            </div>
            {/* <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button
                                type="submit"
                                className="p-2 focus:outline-none focus:ring"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
                        />
                    </div> */}
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="rounded-sm">
                  <Link
                    href={route('dashboard')}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="https://icons8.com/icon/102074/oak-tree"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span className="text-gray-100">Home</span>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link
                    href={route('user.index')}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <i className="pi pi-user" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                    <span className="text-gray-100">Master Data User</span>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link
                    href={route('species.index')}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <i className="pi pi-flag" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                    <span className="text-gray-100">Master Data Spesies</span>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link
                    href={route('families.index')}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <i className="pi pi-book" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                    <span className="text-gray-100">Master Data Famili</span>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link
                    href={route('plots.index')}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <i className="pi pi-map" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                    <span className="text-gray-100">Master Data Petak</span>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link
                    href={route('data-request.index')}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <i className="pi pi-send" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                    <span className="text-gray-100">Permintaan Data</span>
                    {
                      props.dataRequestCount > 0 && (
                        <>
                          <span className="flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform bg-red-600 rounded-full">{props.dataRequestCount}</span>
                        </>
                      )
                    }
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link
                    href={route('buku_kebun')}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <i className="pi pi-file" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                    <span className="text-gray-100">Buku Kebun</span>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link
                    method="post"
                    href={route('logout')}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="text-gray-100">
                      Logout
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        

        <div className="container px-6 pb-6 lg:mx-auto w-full pt-8 w-screen overflow-x-auto">
          {children}
          {/* <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total users
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            12,00
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Profit
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            $ 450k
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Orders
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            20k
                        </div>
                    </div>
                </div> */}
        </div>
      </div>
    </>
  );
}
