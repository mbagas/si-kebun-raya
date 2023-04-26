import { GuestsLayout } from "@/Layouts/GuestsLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { useState, useRef } from "react";
import { Toast } from 'primereact/toast';

export default function AddDataRequest(props) {
  const toast = useRef(null);
  const { data, get, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    institute: '',
    familyId: '',
    speciesId: '',
    reason: '',
    token: '',
    filterBy: 'famili'
  });
  console.log(props);

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    console.log(data);
    post(route('data-request.store'), {
      onFinish: () => {
        reset();
        toast.current.show({ severity: 'success', summary: 'Data Request Submitted', detail: 'Token akan dikirim melalui email.' });
      }
    });
  }
  return (
    <GuestsLayout>
      <div className="grid grid-rows justify-items-center gap-y-10">
        <div>
          <h2 className="text-2xl font-semibold">
            Data Request
          </h2>
        </div>
        <div className="grid grid-rows-2 gap-y-4 ">
          <div>
            <InputLabel htmlFor="genus" value="Masukan token untuk mengunduh data" />
            <TextInput
              id="token"
              name="token"
              value={data.token}
              className="mt-1 block w-96"
              autoComplete="Masukan token untuk mengunduh data"
              isFocused={true}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <PrimaryButton className="ml-4" disabled={''}>
              Get Data
            </PrimaryButton>
          </div>
        </div>

        
        <div>
          <div>
            <h2 className="text-xl">
              Isi data berikut untuk melakukan permintaan data.
            </h2>
            <label>
              Setelah permintaan divalidasi, token akan dikirimkan melalui email.
            </label>
          </div>
          <form onSubmit={submit}>
            <Toast ref={toast} />
            <div className="mt-4">
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
              <InputLabel htmlFor="name" value="Email" />

              <TextInput
                id="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="email"
                isFocused={true}
                onChange={handleOnChange}
                type="email"
                required
              />

              <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="name" value="Institusi" />

              <TextInput
                id="institute"
                name="institute"
                value={data.institute}
                className="mt-1 block w-full"
                autoComplete="institute"
                isFocused={true}
                onChange={handleOnChange}
                required
              />

              <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="name" value="Filter By" />

              <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center">
                  <RadioButton inputId="filterBy1" name="filterBy" value="famili" onChange={(e) => setData('filterBy',e.value)} checked={data.filterBy === 'famili'} />
                  <label htmlFor="filterBy1" className="ml-2">Famili</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="filterBy2" name="filterBy" value="species" onChange={(e) => setData('filterBy', e.value)} checked={data.filterBy === 'species'} />
                  <label htmlFor="filterBy2" className="ml-2">Species</label>
                </div>
              </div>
            </div>
            <div className="mt-4"> 
              <InputLabel htmlFor="familyId" value="Famili" />

              <Dropdown value={data.familyId} optionValue="id" onChange={(e) => setData('familyId', e.value)} options={props.families} optionLabel="name"
                placeholder="Select a Famili" filter className="w-full md:w-14rem" />

              <InputError message={errors.familyId} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="familyId" value="Spesies" />

              <MultiSelect value={data.speciesId} optionValue="id" onChange={(e) => setData('speciesId', e.value)} options={props.species} optionLabel="name"
                placeholder="Select Species" filter display="chip"  maxSelectedLabels={3} className="w-full md:w-14rem" />
              
              <InputError message={errors.familyId} className="mt-2" />
            </div>
            <div>
              <InputLabel htmlFor="reason" value="Alasan" />

              <InputTextarea name="reason" autoResize value={data.reason} onChange={handleOnChange} rows={5} cols={90} />

              <InputError message={errors.reason} className="mt-2" />
            </div>
            <div className="flex items-center justify-end mt-4 mb-10">

              <PrimaryButton className="ml-4" disabled={processing}>
                Submit
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </GuestsLayout>
  )
}
