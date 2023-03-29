import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function AddFamili(props) {
  console.log(props);

  const { data, setData, patch, processing, errors, reset } = useForm({
    name: props.famili.name,
    genus: props.famili.genus,
  });

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    patch(route('families.update', props.famili.id));
  };

  return (
    <AdminLayout>
      <Head title="Add famili" />
      <h2 className="text-2xl font-bold">
        Edit famili
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
          <InputLabel htmlFor="genus" value="genus" />

          <TextInput
            id="genus"
            name="genus"
            value={data.genus}
            className="mt-1 block w-full"
            autoComplete="familiname"
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.genus} className="mt-2" />
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
