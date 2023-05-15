import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function AddUser(props) {
  console.log(props);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('user.store'));
  };

  return (
    <AdminLayout>
      <Head title="Add User" />
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold">
          Tambah User
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
            <InputLabel htmlFor="email" value="Email" />

            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password" value="Password" />

            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.password_confirmation} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">

            <PrimaryButton className="ml-4" disabled={processing}>
              Save
            </PrimaryButton>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
