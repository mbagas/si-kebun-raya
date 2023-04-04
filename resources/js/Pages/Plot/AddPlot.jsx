import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function AddPlot(props) {
  console.log(props);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    latitude: '',
    longitude: '',
  });

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('plots.store'));
  };

  return (
    <AdminLayout>
      <Head title="Add Petak" />
      <h2 className="text-2xl font-bold">
        Tambah Petak
      </h2>
      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="latitude" value="latitude" />

          <TextInput
            id="latitude"
            name="latitude"
            value={data.latitude}
            className="mt-1 block w-full"
            autoComplete="latitude"
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.latitude} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="longitude" value="longitude" />

          <TextInput
            id="longitude"
            name="longitude"
            value={data.longitude}
            className="mt-1 block w-full"
            autoComplete="longitude"
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.longitude} className="mt-2" />
        </div>


        <div className="flex items-center justify-end mt-4">

          <PrimaryButton className="ml-4" disabled={processing}>
            Save
          </PrimaryButton>
        </div>
      </form>
    </AdminLayout>
  )
}