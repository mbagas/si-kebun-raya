import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Image } from 'primereact/image';

export default function Guest({ children }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="invisible md:visible min-h-screen flex flex-col sm:justify-center justify-content-center items-center pt-6 sm:pt-0">
          <h2 className="text-2xl font-bold">SISTEM INFORMASI MANAJEMEN TUMBUHAN KEBUN RAYA ITERA</h2>
          <img className='mx-auto mt-4' src="/logo-kebun.png" alt="Logo" width="500" height="500" />
          
        </div>
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-100">
          <div>
            <Link href="/">
              
              <h2 className="text-2xl font-bold">Login</h2>
            </Link>
          </div>

          <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            {children}
          </div>
        </div>
      </div>
        
    );
}
