import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';

export default function DetailDataRequest(props) {
  const [loading, setLoading] = useState(false);
  console.log(props);
  return (
    <AdminLayout>
      <Head title="Detail Data Request" />
      <h2 className="text-2xl font-bold">
        Detail Permintaan Data
      </h2>
      <div>
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <label className="font-medium text-sm text-gray-700">
              Nama :
            </label>
          </div>
          <div>
            <label className="font-medium text-sm text-gray-700">
              {props.dataRequest.name}
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <label className="font-medium text-sm text-gray-700">
              Email :
            </label>
          </div>
          <div>
            <label className="font-medium text-sm text-gray-700">
              {props.dataRequest.email}
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <label className="font-medium text-sm text-gray-700">
              Institusi :
            </label>
          </div>
          <div>
            <label className="font-medium text-sm text-gray-700">
              {props.dataRequest.institute}
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <label className="font-medium text-sm text-gray-700">
              Famili :
            </label>
          </div>
          <div>
            <label className="font-medium text-sm text-gray-700">
              {props.dataRequest.famili.name}
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <label className="font-medium text-sm text-gray-700">
              Spesies :
            </label>
          </div>
          <div>
            <label className="font-medium text-sm text-gray-700">
              {props.dataRequest.species.famili.genus} {props.dataRequest.species.name}
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <label className="font-medium text-sm text-gray-700">
              Alasan :
            </label>
          </div>
          <div>
            <label className="font-medium text-sm text-gray-700">
              {props.dataRequest.reason}
            </label>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
