import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';

import { useState } from "react";

export default function AddSpecies(props) {
  console.log(props.families);
  const [selectedFamili, setSelectedFamili] = useState(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    collectionNumber: '',
    accessNumber: '',
    collectorNumber: '',
    name: '',
    genus: '',
    localName: '',
    familyId: '',
    plotId: '',
    plantingDate: '',
    collectionOrigin: '',
    amountInNurseries: 0,
    amountInField: 0,
    total: 0,
    plantingCoordinate: '',
    image: '',
    description: '',
    benefit: '',
    wayToCollect: '',
    userId: '',
  });

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('species.store'));
  };

  const plotList = props.plots.map((item) => ({
    ...item,
    optionName: item.name + ' - ' + item.child_name,
  }))

  console.log(data);
  return (
    <AdminLayout dataRequestCount={props.dataRequestCount}>
      <Head title="Add Species" />
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow ">
        <h2 className="text-2xl font-bold">
          Tambah Species
        </h2>
        <form onSubmit={submit}>
          <div className="mt-4">
            <InputLabel htmlFor="collectionNumber" value="Nomor Koleksi" />

            <TextInput
              id="collectionNumber"
              name="collectionNumber"
              value={data.collectionNumber}
              className="mt-1 block w-full"
              autoComplete="collectionNumber"
              isFocused={true}
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.collectionNumber} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="accessNumber" value="Nomor Akses" />

            <TextInput
              id="accessNumber"
              name="accessNumber"
              value={data.accessNumber}
              className="mt-1 block w-full"
              autoComplete="accessNumber"
              isFocused={true}
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.accessNumber} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="collectorNumber" value="Nomor Kolektor" />

            <TextInput
              id="collectorNumber"
              name="collectorNumber"
              value={data.collectorNumber}
              className="mt-1 block w-full"
              autoComplete="collectorNumber"
              isFocused={true}
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.collectorNumber} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Genus" />

            <TextInput
              id="genus"
              name="genus"
              value={data.genus}
              className="mt-1 block w-full"
              autoComplete="username"
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.name} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Nama Spesies" />

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
            <InputLabel htmlFor="localName" value="Nama Lokal Spesies" />

            <TextInput
              id="localName"
              name="localName"
              value={data.localName}
              className="mt-1 block w-full"
              autoComplete="localName"
              isFocused={true}
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.localName} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="familyId" value="Famili" />

            <Dropdown value={data.familyId} optionValue="id" onChange={(e) => setData('familyId', e.value)} options={props.families} optionLabel="name"
              placeholder="Select a Famili" className="w-full md:w-14rem" />

            <InputError message={errors.familyId} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="plotId" value="Petak" />

            <Dropdown value={data.plotId} optionValue="id" onChange={(e) => setData('plotId', e.value)} options={plotList} optionLabel="optionName"
              placeholder="Select a Petak" className="w-full md:w-14rem" />

            <InputError message={errors.plotId} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="plantingDate" value="Tanggal Tanam" />

            {/* <Calendar value={data.plantingDate} onChange={(e) => setData('plantingDate', new Date('Y-m-d H:i:s',e.value))} dateFormat="yy-mm-dd" /> */}
            <Calendar value={new Date(data.plantingDate)} onChange={(e) => setData('plantingDate', e.value)} dateFormat="yy-mm-dd" />

            <InputError message={errors.name} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="collectionOrigin" value="Asal Koleksi" />

            <TextInput
              id="collectionOrigin"
              name="collectionOrigin"
              value={data.collectionOrigin}
              className="mt-1 block w-full"
              autoComplete="collectionOrigin"
              isFocused={true}
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.collectionOrigin} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="amountInNurseries" value="Jumlah di Pembibitan" />

            <InputNumber name="amountInNurseries" value={data.amountInNurseries} onValueChange={handleOnChange} />

            <InputError message={errors.amountInNurseries} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="amountInField" value="Jumlah di Lapangan" />

            <InputNumber name="amountInField" value={data.amountInField} onValueChange={handleOnChange} />

            <InputError message={errors.amountInField} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="total" value="Total" />

            <InputNumber name="total" value={data.total = data.amountInNurseries + data.amountInField} disabled onValueChange={handleOnChange} />

            <InputError message={errors.total} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="plantingCoordinate" value="Lokasi Koordinat Tanam" />

            <TextInput
              id="plantingCoordinate"
              name="plantingCoordinate"
              value={data.plantingCoordinate}
              className="mt-1 block w-full"
              autoComplete="plantingCoordinate"
              isFocused={true}
              onChange={handleOnChange}
              required
            />

            <InputError message={errors.plantingCoordinate} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="image" value="Gambar Tanaman" />

            <input
              type="file"
              className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
              label="File"
              name="file"
              onChange={(e) => {
                setData("image", e.target.files[0]);
              }
              }
              accept="image/*"
            />

            <InputError message={errors.image} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="description" value="Deskripsi" />

            <InputTextarea name="description" autoResize value={data.description} onChange={handleOnChange} rows={5} cols={90} />

            <InputError message={errors.description} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="benefit" value="Manfaat" />

            <InputTextarea name="benefit" autoResize value={data.benefit} onChange={handleOnChange} rows={5} cols={90} />

            <InputError message={errors.benefit} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="wayToCollect" value="Cara Mendapatkan" />

            <Dropdown value={data.wayToCollect} optionValue="name" onChange={(e) => setData('wayToCollect', e.value)} options={[{ name: 'hibah' }, { name: 'eksplorasi' }, { name: 'pertukaran' }]} optionLabel="name"
              placeholder="Select Cara Mendapatkan" className="w-full md:w-14rem" />

            <InputError message={errors.wayToCollect} className="mt-2" />
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
