import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, useForm } from '@inertiajs/react';
import ReactToPrint from 'react-to-print';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Dropdown } from 'primereact/dropdown';

export default function BukuKebun(props) {
  const [loading, setLoading] = useState(false);

  return (
    <AdminLayout>
      <Head title="Buku Kebun"/>
      <h2 className="text-2xl font-bold">
        Buku Kebun
      </h2>
      <div className="mt-2">
        <div>
          <InputLabel htmlFor="name" value="Pilih Petak" />

          <Dropdown value={data.plotId} optionValue="id" onChange={(e) => setData('plotId', e.value)} options={props.plots} optionLabel="name"
            placeholder="Select a Petak" className="w-full md:w-14rem" />
        </div>
        <div>
          <PrimaryButton>
            Print
          </PrimaryButton>
        </div>
        <div>
          
        </div>
      </div>
    </AdminLayout>
  )
}
